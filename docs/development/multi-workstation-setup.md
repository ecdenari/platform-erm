# Multi-Workstation Development Setup

## Overview

This guide enables seamless development across home and work computers using OneDrive for secure environment file synchronization.

## OneDrive Environment File Strategy

### Setup Structure

Create this structure in your OneDrive:
```
C:\Users\Evan\OneDrive\PlatformERM-Secure\
├── .env                           # Root environment variables
├── backend/
│   ├── .env                       # Backend environment (Azure PostgreSQL connection)
│   └── appsettings.Development.json
├── frontend/
│   └── .env                       # Frontend environment
└── sync-env.ps1                   # PowerShell sync script
```

### Environment Files Content

**C:\Users\Evan\OneDrive\PlatformERM-Secure\.env**:
```bash
# Root environment variables
PROJECT_NAME=platform-erm
ENVIRONMENT=development
```

**C:\Users\Evan\OneDrive\PlatformERM-Secure\backend\.env**:
```bash
# Azure PostgreSQL Connection
DATABASE_CONNECTION="Host=your-server.postgres.database.azure.com;Database=platform_erm;Username=your-username;Password=your-password;SSL Mode=Require;Trust Server Certificate=true"

# API Settings
JWT_SECRET=your-jwt-secret-here
API_KEY_SALT=your-api-key-salt-here

# Development Ports
ASPNETCORE_URLS=https://localhost:59818;http://localhost:59819
```

**C:\Users\Evan\OneDrive\PlatformERM-Secure\frontend\.env**:
```bash
# API Endpoints
VITE_API_URL=http://localhost:5000/api
VITE_INTERNAL_API_URL=http://localhost:5000/api/internal
VITE_PUBLIC_API_URL=http://localhost:5000/api/public

# Feature Flags
VITE_ENABLE_MOCK_DATA=false
```

## Sync Scripts

### PowerShell Script (Windows)

Create `/sync-env.ps1` in your repo:

```powershell
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
```

### Bash Script (WSL/Linux)

Create `/sync-env.sh` in your repo:

```bash
#!/bin/bash
# sync-env.sh
# Syncs environment files from OneDrive to local development

ONEDRIVE_BASE="/mnt/c/Users/Evan/OneDrive/PlatformERM-Secure"
PROJECT_ROOT="$(dirname "$0")"

echo -e "\033[32mSyncing environment files from OneDrive...\033[0m"

# Create backup
timestamp=$(date +%Y%m%d-%H%M%S)
backup_dir="$PROJECT_ROOT/.env-backup-$timestamp"

if [ -f "$PROJECT_ROOT/.env" ] || [ -f "$PROJECT_ROOT/backend/.env" ] || [ -f "$PROJECT_ROOT/frontend/.env" ]; then
    echo -e "\033[33mBacking up existing env files to $backup_dir\033[0m"
    mkdir -p "$backup_dir"
    
    [ -f "$PROJECT_ROOT/.env" ] && cp "$PROJECT_ROOT/.env" "$backup_dir/"
    [ -f "$PROJECT_ROOT/backend/.env" ] && cp "$PROJECT_ROOT/backend/.env" "$backup_dir/backend-.env"
    [ -f "$PROJECT_ROOT/frontend/.env" ] && cp "$PROJECT_ROOT/frontend/.env" "$backup_dir/frontend-.env"
fi

# Copy files from OneDrive
cp "$ONEDRIVE_BASE/.env" "$PROJECT_ROOT/.env" && echo -e "\033[32m✓ Copied root .env\033[0m"
cp "$ONEDRIVE_BASE/backend/.env" "$PROJECT_ROOT/backend/.env" && echo -e "\033[32m✓ Copied backend .env\033[0m"
cp "$ONEDRIVE_BASE/frontend/.env" "$PROJECT_ROOT/frontend/.env" && echo -e "\033[32m✓ Copied frontend .env\033[0m"

if [ -f "$ONEDRIVE_BASE/backend/appsettings.Development.json" ]; then
    cp "$ONEDRIVE_BASE/backend/appsettings.Development.json" "$PROJECT_ROOT/backend/src/PlatformERM.API/appsettings.Development.json"
    echo -e "\033[32m✓ Copied appsettings.Development.json\033[0m"
fi

echo -e "\n\033[32mEnvironment sync complete!\033[0m"
echo -e "\033[36mAzure PostgreSQL connection and all secrets are now available.\033[0m"

# Make script executable
chmod +x "$PROJECT_ROOT/sync-env.sh"
```

## Updated .gitignore

```gitignore
# Visual Studio source control
*.vspscc
*.vssscc
*.pubxml.user

# HTTP request files
*.http

# Logs
logs/
*.log

# Environment files (stored in OneDrive instead)
.env
.env.*
backend/.env
frontend/.env
appsettings.Development.json

# Backup directories from sync
.env-backup-*

# Keep sync scripts
!sync-env.ps1
!sync-env.sh
```

## Workflow for Each Workstation

### Initial Setup (Both Computers)

1. **Clone repository**:
   ```bash
   git clone https://github.com/ecdenari/platform-erm.git
   cd platform-erm
   ```

2. **Run sync script**:
   ```powershell
   # Windows PowerShell
   .\sync-env.ps1
   
   # Or WSL/Git Bash
   ./sync-env.sh
   ```

3. **Verify connection**:
   ```bash
   cd backend
   dotnet run
   # Should connect to Azure PostgreSQL
   ```

### Daily Development Workflow

1. **Start of day**:
   ```bash
   git pull origin develop
   ./sync-env.sh  # Or .\sync-env.ps1
   ```

2. **If environment changes are needed**:
   - Edit files in `C:\Users\Evan\OneDrive\PlatformERM-Secure\`
   - Run sync script on both machines
   - Changes automatically sync via OneDrive

## Azure PostgreSQL Setup

1. **Create Azure PostgreSQL**:
   - Use Azure Portal or CLI
   - Enable "Allow Azure services" 
   - Add both home and work IP addresses to firewall

2. **Connection String Format**:
   ```
   Host=your-server.postgres.database.azure.com;
   Database=platform_erm;
   Username=yourusername@your-server;
   Password=yourpassword;
   SSL Mode=Require;
   Trust Server Certificate=true
   ```

3. **pgAdmin Setup**:
   - Install pgAdmin on both machines
   - Use same connection settings
   - Save password in pgAdmin for convenience

## Benefits of This Approach

1. **Simple**: No complex encryption tools needed
2. **Automatic**: OneDrive handles sync between computers
3. **Secure**: Sensitive files never in Git
4. **Flexible**: Easy to update environments
5. **Backup**: OneDrive provides version history

## Important Notes

- **Never commit** .env files to Git
- **Keep OneDrive folder private** - don't share with others
- **Session files** (.claude/sessions/) remain in Git for context sharing
- **Run sync script** after pulling latest code on each machine

This setup ensures both workstations have identical development environments while keeping secrets secure and out of version control.