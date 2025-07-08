# Platform-ERM Database Backup Script
# Run this at the end of your work session

$ErrorActionPreference = "Stop"

# Configuration
$OneDriveBase = "$env:USERPROFILE\OneDrive\PlatformERM-Secure"
$BackupFile = "$OneDriveBase\database\platformerm_backup.sql"
$BackupDir = Split-Path $BackupFile -Parent

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

Write-Host "=== Platform-ERM Database Backup ===" -ForegroundColor Cyan
Write-Host "Backing up database to OneDrive..." -ForegroundColor Yellow

# Create backup directory if it doesn't exist
if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Write-Host "Created backup directory: $BackupDir" -ForegroundColor Green
}

# Create timestamp for backup
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$timestampFile = "$OneDriveBase\database\backup_timestamp.txt"

try {
    # Set PGPASSWORD environment variable for pg_dump
    $env:PGPASSWORD = if ($env:DB_PASSWORD) { $env:DB_PASSWORD } else { Read-Host "Enter PostgreSQL password" -AsSecureString | ConvertFrom-SecureString -AsPlainText }
    
    # Run pg_dump
    Write-Host "Running backup..." -ForegroundColor Yellow
    $backupCmd = "pg_dump -h $dbHost -p $dbPort -U $dbUser -d $dbName -f `"$BackupFile`" --verbose --no-owner --no-acl"
    
    Invoke-Expression $backupCmd
    
    if ($LASTEXITCODE -eq 0) {
        # Save timestamp
        "$timestamp - Backup from $env:COMPUTERNAME" | Out-File $timestampFile
        
        # Get file size
        $fileSize = (Get-Item $BackupFile).Length / 1MB
        
        Write-Host "✓ Backup completed successfully!" -ForegroundColor Green
        Write-Host "  Location: $BackupFile" -ForegroundColor Gray
        Write-Host "  Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Gray
        Write-Host "  Timestamp: $timestamp" -ForegroundColor Gray
        
        # Also create a versioned backup (keep last 3)
        $versionedBackup = "$OneDriveBase\database\platformerm_$timestamp.sql"
        Copy-Item $BackupFile $versionedBackup
        
        # Clean up old versioned backups (keep only last 3)
        Get-ChildItem "$OneDriveBase\database\platformerm_*.sql" | 
            Sort-Object LastWriteTime -Descending | 
            Select-Object -Skip 3 | 
            Remove-Item -Force
            
        Write-Host "✓ Versioned backup created (keeping last 3)" -ForegroundColor Green
    } else {
        throw "pg_dump failed with exit code $LASTEXITCODE"
    }
} catch {
    Write-Host "✗ Backup failed: $_" -ForegroundColor Red
    exit 1
} finally {
    # Clear password from environment
    Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
}

Write-Host "`n=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Wait for OneDrive to sync (check system tray)" -ForegroundColor White
Write-Host "2. On your other computer, run: .\restore-db.ps1" -ForegroundColor White
Write-Host ""