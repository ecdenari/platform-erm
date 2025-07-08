# Shared Resources

This directory contains resources shared between frontend and backend to ensure consistency across the Platform-ERM system.

## Directory Structure

```
shared/
├── types/              # TypeScript interfaces shared between frontend/backend
├── api-contracts/      # OpenAPI/Swagger specifications
└── README.md          # This file
```

## Purpose

The shared directory solves several multi-agent coordination challenges:

1. **Single Source of Truth**: API contracts defined once, used by both agents
2. **Type Safety**: TypeScript interfaces generated from backend DTOs
3. **Reduced Conflicts**: Centralized location prevents duplicate definitions
4. **Better Coordination**: Both agents can see and update contracts

## Usage

### For API Contracts

When creating new API endpoints:

1. Agent 2 creates OpenAPI spec in `/shared/api-contracts/`
2. Both agents can generate types from the spec
3. Changes are visible to both frontend and backend

### For Shared Types

Types that both frontend and backend need:

1. Common enums (PropertyType, WorkOrderStatus, etc.)
2. Shared interfaces (Address, GeoLocation, etc.)
3. Validation rules and constraints

## Workflow

1. Use integration branches when creating new contracts:
   ```bash
   git checkout -b integration/[feature]-api-contracts
   ```

2. Both agents work on the same branch:
   - Agent 2: Define OpenAPI spec
   - Agent 1: Review and suggest changes
   - Both: Generate types for their platforms

3. Merge to develop when contracts are stable

## Type Generation

### From Backend to Frontend

```bash
# TODO: Add NSwag or similar tool configuration
# This will generate TypeScript from C# DTOs
```

### From OpenAPI to TypeScript

```bash
# TODO: Add openapi-typescript configuration
# This will generate types from OpenAPI specs
```

## Best Practices

1. **Always coordinate** on new API contracts
2. **Use semantic versioning** for API changes
3. **Document breaking changes** clearly
4. **Test generated types** before merging
5. **Keep types minimal** - only share what's truly common

## Common Types

See `/shared/types/common.types.ts` for types used across the system.