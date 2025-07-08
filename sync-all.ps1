# Platform-ERM Complete Sync Script
# Syncs both environment files and database

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("backup", "restore")]
    [string]$Action
)

$ErrorActionPreference = "Stop"

# Determine action based on parameter or prompt
if (-not $Action) {
    Write-Host "=== Platform-ERM Complete Sync ===" -ForegroundColor Cyan
    Write-Host "What would you like to do?" -ForegroundColor Yellow
    Write-Host "1. Backup (end of work day)" -ForegroundColor White
    Write-Host "2. Restore (start of work day)" -ForegroundColor White
    
    $choice = Read-Host "Enter choice (1 or 2)"
    $Action = if ($choice -eq "1") { "backup" } else { "restore" }
}

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

if ($Action -eq "backup") {
    Write-Host "`n=== Running Backup Process ===" -ForegroundColor Cyan
    
    # Environment files are already in OneDrive, just show status
    Write-Host "✓ Environment files auto-sync via OneDrive" -ForegroundColor Green
    
    # Backup database
    Write-Host "`nBacking up database..." -ForegroundColor Yellow
    & "$scriptPath\backup-db.ps1"
    
    Write-Host "`n✓ Backup complete! Wait for OneDrive to sync." -ForegroundColor Green
    
} else {
    Write-Host "`n=== Running Restore Process ===" -ForegroundColor Cyan
    
    # First sync environment files
    Write-Host "Syncing environment files..." -ForegroundColor Yellow
    & "$scriptPath\sync-env.ps1"
    
    # Then restore database
    Write-Host "`nRestoring database..." -ForegroundColor Yellow
    & "$scriptPath\restore-db.ps1"
    
    Write-Host "`n✓ Restore complete! You can start development." -ForegroundColor Green
    Write-Host "Run: cd backend/src/PlatformERM.API && dotnet run" -ForegroundColor Gray
    Write-Host "Run: cd frontend && npm run dev" -ForegroundColor Gray
}

Write-Host ""