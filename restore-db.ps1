# Platform-ERM Database Restore Script
# Run this at the start of your work session on a different computer

$ErrorActionPreference = "Stop"

# Configuration
$OneDriveBase = "$env:USERPROFILE\OneDrive\PlatformERM-Secure"
$BackupFile = "$OneDriveBase\database\platformerm_backup.sql"
$TimestampFile = "$OneDriveBase\database\backup_timestamp.txt"

# Load database connection info from .env
$envPath = Join-Path $PSScriptRoot ".env"
if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
}

# Parse connection string or use defaults
$dbHost = if ($env:DB_HOST) { $env:DB_HOST } else { "localhost" }
$dbPort = if ($env:DB_PORT) { $env:DB_PORT } else { "5432" }
$dbName = if ($env:DB_NAME) { $env:DB_NAME } else { "platformerm" }
$dbUser = if ($env:DB_USER) { $env:DB_USER } else { "postgres" }

Write-Host "=== Platform-ERM Database Restore ===" -ForegroundColor Cyan

# Check if backup exists
if (!(Test-Path $BackupFile)) {
    Write-Host "✗ No backup file found at: $BackupFile" -ForegroundColor Red
    Write-Host "  Make sure OneDrive has synced from your other computer" -ForegroundColor Yellow
    exit 1
}

# Show backup info
if (Test-Path $TimestampFile) {
    $backupInfo = Get-Content $TimestampFile
    Write-Host "Found backup: $backupInfo" -ForegroundColor Green
}

$fileSize = (Get-Item $BackupFile).Length / 1MB
$lastModified = (Get-Item $BackupFile).LastWriteTime
Write-Host "Backup size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Gray
Write-Host "Last modified: $lastModified" -ForegroundColor Gray

# Confirm restore
Write-Host "`n⚠️  WARNING: This will replace your local database!" -ForegroundColor Yellow
$confirm = Read-Host "Do you want to restore from this backup? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Restore cancelled." -ForegroundColor Yellow
    exit 0
}

try {
    # Set PGPASSWORD environment variable
    $env:PGPASSWORD = if ($env:DB_PASSWORD) { $env:DB_PASSWORD } else { Read-Host "Enter PostgreSQL password" -AsSecureString | ConvertFrom-SecureString -AsPlainText }
    
    Write-Host "`nPreparing database..." -ForegroundColor Yellow
    
    # Drop existing connections to the database
    $dropConnSql = @"
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = '$dbName'
  AND pid <> pg_backend_pid();
"@
    
    $dropConnCmd = "psql -h $dbHost -p $dbPort -U $dbUser -d postgres -c `"$dropConnSql`""
    Invoke-Expression $dropConnCmd 2>$null
    
    # Drop and recreate database
    Write-Host "Recreating database..." -ForegroundColor Yellow
    $dropCmd = "psql -h $dbHost -p $dbPort -U $dbUser -d postgres -c `"DROP DATABASE IF EXISTS $dbName`""
    Invoke-Expression $dropCmd
    
    $createCmd = "psql -h $dbHost -p $dbPort -U $dbUser -d postgres -c `"CREATE DATABASE $dbName`""
    Invoke-Expression $createCmd
    
    # Enable PostGIS extension
    Write-Host "Enabling PostGIS extension..." -ForegroundColor Yellow
    $postgisCmd = "psql -h $dbHost -p $dbPort -U $dbUser -d $dbName -c `"CREATE EXTENSION IF NOT EXISTS postgis`""
    Invoke-Expression $postgisCmd
    
    # Restore the backup
    Write-Host "Restoring backup..." -ForegroundColor Yellow
    $restoreCmd = "psql -h $dbHost -p $dbPort -U $dbUser -d $dbName -f `"$BackupFile`""
    
    Invoke-Expression $restoreCmd
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database restored successfully!" -ForegroundColor Green
        
        # Update local timestamp file
        $localTimestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
        "$localTimestamp - Restored on $env:COMPUTERNAME" | Out-File "$PSScriptRoot\.last-restore.txt"
        
        Write-Host "`n=== Next Steps ===" -ForegroundColor Cyan
        Write-Host "1. Run: .\sync-env.ps1 (to get latest .env files)" -ForegroundColor White
        Write-Host "2. Start your development servers" -ForegroundColor White
        Write-Host "3. When done working, run: .\backup-db.ps1" -ForegroundColor White
    } else {
        throw "psql restore failed with exit code $LASTEXITCODE"
    }
} catch {
    Write-Host "✗ Restore failed: $_" -ForegroundColor Red
    exit 1
} finally {
    # Clear password from environment
    Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
}

Write-Host ""