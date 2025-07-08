# Aspire Configuration Update Guide

## Overview
This guide provides instructions for updating the configuration to support the new Aspire GET endpoints for Branches, PropertyStatuses, and PropertyTypes.

## Required Configuration Updates

### 1. Update appsettings.json

Add the following configuration sections to your `appsettings.json` file:

```json
{
  "YourAspire_Credentials": {
    "ClientId": "your-client-id",
    "Secret": "your-secret"
  },
  "YourAspire_API_Url": {
    "Authentication": "https://cloud-api.youraspire.com/Authentication",
    "Fetch_Properties": "https://cloud-api.youraspire.com/Properties",
    "Fetch_Branches": "https://cloud-api.youraspire.com/Branches",
    "Fetch_PropertyStatuses": "https://cloud-api.youraspire.com/PropertyStatuses",
    "Fetch_PropertyTypes": "https://cloud-api.youraspire.com/PropertyTypes"
  }
}
```

### 2. Database Setup

Execute the following SQL scripts in your database:

1. `SQL/Branches.sql` - Creates the Branches table
2. `SQL/PropertyStatuses.sql` - Creates the PropertyStatuses table  
3. `SQL/PropertyTypes.sql` - Creates the PropertyTypes table

### 3. API Endpoints

The following new API endpoints are now available:

- `GET /api/ExtractAspireData/ImportBranches` - Syncs Branches from Aspire
- `GET /api/ExtractAspireData/ImportPropertyStatuses` - Syncs PropertyStatuses from Aspire
- `GET /api/ExtractAspireData/ImportPropertyTypes` - Syncs PropertyTypes from Aspire

### 4. Dependencies

Ensure the following dependencies are registered in your DI container:

- `IAspireService` → `AspireService`
- `AutoMapper` with `AutoMapperProfile`

### 5. Testing

Test each endpoint by making GET requests to:

```
https://your-api-domain/api/ExtractAspireData/ImportBranches
https://your-api-domain/api/ExtractAspireData/ImportPropertyStatuses
https://your-api-domain/api/ExtractAspireData/ImportPropertyTypes
```

Each endpoint should return "success" if the sync operation completes successfully.

## Notes

- All endpoints follow the same authentication pattern using Bearer tokens
- Data is synced using the Unit of Work pattern with Entity Framework Core
- AutoMapper handles the conversion between DTOs and domain entities
- Error handling follows the existing pattern with try-catch blocks 