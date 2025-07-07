# sync-env.ps1
# Syncs environment files from OneDrive to local development

$OneDriveBase = "$env:USERPROFILE\OneDrive\PlatformERM-Secure"
$ProjectRoot = $PSScriptRoot

Write-Host "Syncing environment files from OneDrive..." -ForegroundColor Green

# Create backup of existing files
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = "$ProjectRoot\.env-backup-$timestamp"

if (Test-Path "$ProjectRoot\.env" -or Test-Path "$ProjectRoot\backend\.env" -or Test-Path "$ProjectRoot\frontend\.env") {
    Write-Host "Backing up existing env files to $backupDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    
    if (Test-Path "$ProjectRoot\.env") {
        Copy-Item "$ProjectRoot\.env" "$backupDir\.env"
    }
    if (Test-Path "$ProjectRoot\backend\.env") {
        Copy-Item "$ProjectRoot\backend\.env" "$backupDir\backend-.env"
    }
    if (Test-Path "$ProjectRoot\frontend\.env") {
        Copy-Item "$ProjectRoot\frontend\.env" "$backupDir\frontend-.env"
    }
}

# Copy files from OneDrive
try {
    Copy-Item "$OneDriveBase\.env" "$ProjectRoot\.env" -Force
    Write-Host "✓ Copied root .env" -ForegroundColor Green
    
    Copy-Item "$OneDriveBase\backend\.env" "$ProjectRoot\backend\.env" -Force
    Write-Host "✓ Copied backend .env" -ForegroundColor Green
    
    Copy-Item "$OneDriveBase\frontend\.env" "$ProjectRoot\frontend\.env" -Force
    Write-Host "✓ Copied frontend .env" -ForegroundColor Green
    
    if (Test-Path "$OneDriveBase\backend\appsettings.Development.json") {
        Copy-Item "$OneDriveBase\backend\appsettings.Development.json" "$ProjectRoot\backend\src\PlatformERM.API\appsettings.Development.json" -Force
        Write-Host "✓ Copied appsettings.Development.json" -ForegroundColor Green
    }
    
    Write-Host "`nEnvironment sync complete!" -ForegroundColor Green
    Write-Host "Azure PostgreSQL connection and all secrets are now available." -ForegroundColor Cyan
} catch {
    Write-Host "Error syncing files: $_" -ForegroundColor Red
    Write-Host "Restoring from backup..." -ForegroundColor Yellow
    
    if (Test-Path $backupDir) {
        Copy-Item "$backupDir\*" "$ProjectRoot\" -Recurse -Force
    }
}