# API Contracts

This directory contains OpenAPI/Swagger specifications for Platform-ERM APIs.

## File Organization

```
api-contracts/
├── internal/           # Internal API specs (full CRUD)
│   ├── properties.yaml
│   ├── contacts.yaml
│   └── workorders.yaml
├── public/            # Public API specs (limited access)
│   └── v1/
│       └── properties.yaml
└── README.md         # This file
```

## Usage

### Creating New API Contracts

1. Use integration branch:
   ```bash
   git checkout -b integration/[feature]-api-contracts
   ```

2. Create OpenAPI spec following the template
3. Validate the spec
4. Generate types for both frontend and backend
5. Test the generated types

### OpenAPI Template

```yaml
openapi: 3.0.0
info:
  title: Platform-ERM [Module] API
  version: 1.0.0
  description: [Module description]

servers:
  - url: https://localhost:59818/api/internal
    description: Development server

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - bearerAuth: []

paths:
  /[resource]:
    get:
      summary: Get all [resources]
      operationId: get[Resources]
      parameters:
        - $ref: '#/components/parameters/TenantId'
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/[Resource]ListResponse'
```

## Type Generation

### Generate TypeScript from OpenAPI

```bash
# Install tool (one time)
npm install -g openapi-typescript

# Generate types
openapi-typescript ./shared/api-contracts/internal/properties.yaml -o ./frontend/src/types/generated/properties.ts
```

### Generate C# from OpenAPI

```bash
# Using NSwag Studio or CLI
# Configuration will be added
```

## Coordination Workflow

1. **Agent 2** creates initial OpenAPI spec based on backend implementation
2. **Agent 1** reviews and suggests frontend-friendly changes
3. Both agents generate types for their platforms
4. Integration testing validates the contract
5. Merge to develop when stable

## Best Practices

1. **Version your APIs** - Use `/v1/`, `/v2/` for public APIs
2. **Document everything** - All parameters, responses, errors
3. **Use common schemas** - Reference shared components
4. **Test generated code** - Ensure types work in practice
5. **Plan for breaking changes** - Version bump when needed