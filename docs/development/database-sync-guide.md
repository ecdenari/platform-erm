# Database Sync Guide

This guide explains how to sync your PostgreSQL database between home and work computers using OneDrive.

## Prerequisites

1. PostgreSQL installed on both computers
2. OneDrive configured and syncing
3. PowerShell (comes with Windows)
4. `pg_dump` and `psql` in your PATH (installed with PostgreSQL)

## How It Works

The scripts work alongside your `.env` file sync:
- `sync-env.ps1` - Syncs environment files
- `backup-db.ps1` - Backs up database to OneDrive
- `restore-db.ps1` - Restores database from OneDrive

## Daily Workflow

### End of Work Day (Current Computer)
```powershell
# 1. First, backup your database
.\backup-db.ps1

# 2. Wait for OneDrive to sync (check system tray icon)
# 3. Shut down your development servers
```

### Start of Work Day (Other Computer)
```powershell
# 1. First, sync environment files
.\sync-env.ps1

# 2. Then restore the database
.\restore-db.ps1

# 3. Start your development servers
cd backend/src/PlatformERM.API && dotnet run
# In another terminal:
cd frontend && npm run dev
```

## What Gets Backed Up

- Complete PostgreSQL database dump
- All tables, data, and constraints
- PostGIS extensions and spatial data
- Stored in: `C:\Users\[YourName]\OneDrive\PlatformERM-Secure\database\`

## Features

1. **Automatic Backups**: Keeps last 3 versioned backups
2. **Timestamp Tracking**: Shows when and where backup was created
3. **PostGIS Support**: Automatically re-enables PostGIS after restore
4. **Password Handling**: Uses `.env` file or prompts securely
5. **Safety Checks**: Confirms before overwriting local database

## Troubleshooting

### "pg_dump: command not found"
Add PostgreSQL bin directory to your PATH:
```powershell
$env:Path += ";C:\Program Files\PostgreSQL\15\bin"
```

### "No backup file found"
1. Check OneDrive sync status
2. Verify the backup was created on other computer
3. Check the file exists at: `%USERPROFILE%\OneDrive\PlatformERM-Secure\database\`

### "Permission denied"
Run PowerShell as Administrator or ensure your user has database permissions

### Database Connection Issues
The scripts use these environment variables from `.env`:
- `DB_HOST` (default: localhost)
- `DB_PORT` (default: 5432)
- `DB_NAME` (default: platformerm)
- `DB_USER` (default: postgres)
- `DB_PASSWORD` (will prompt if not set)

## Alternative: Independent Databases

If syncing becomes problematic, you can maintain independent databases:
1. Use same schema (via EF Core migrations)
2. Use different test data per location
3. Only sync code via Git

## Security Note

The database backup contains all your development data. OneDrive encrypts files in transit and at rest, but consider:
- Don't use production data in development
- Use test/sample data only
- The `PlatformERM-Secure` folder should not be shared