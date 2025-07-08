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