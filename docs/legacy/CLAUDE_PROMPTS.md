# Claude Code Prompt for Platform-ERM Scaffolding

## Initial Setup Prompt

```
I need to scaffold a new multi-tenant SaaS platform called Platform-ERM. Please create the initial folder structure and base files following the architecture in SCAFFOLD.md.

Create the following structure:

1. Backend (.NET Core 8):
- Solution file: PlatformERM.sln
- Projects: API, Application, Domain, Infrastructure, Services, Models, Utility
- Multi-tenant base classes with TenantId support
- Dual Swagger setup (internal/public APIs)
- JWT authentication configuration

2. Frontend (React + Vite):
- Vite React TypeScript template
- Folder structure for modules, components, api, contexts
- Multi-tenant context setup
- Base layout components

3. References folder:
- Create empty folders for BackendFMRS and FrontendFMRS

Please follow Clean Architecture patterns and include:
- .gitignore for both .NET and React
- README.md with setup instructions
- docker-compose.yml for PostgreSQL
- .env.example files

Reference the detailed specifications in SCAFFOLD.md for implementation details.
```

## Follow-up Prompts for Specific Components

### 1. Multi-Tenant Database Context
```
Using the Fieldpoint reference in references/BackendFMRS, create the ApplicationDbContext with:
- Multi-tenant global query filters
- Base entity with TenantId
- Tenant resolution middleware
- SaveChangesAsync override for automatic TenantId injection
Follow the patterns in SCAFFOLD.md section "Multi-Tenant Backend Setup"
```

### 2. Authentication Setup
```
Implement JWT authentication by adapting the Fieldpoint authentication pattern from references/BackendFMRS:
- JWT configuration in Program.cs
- Authentication controller
- User entity with tenant relationship
- Role-based authorization
Ensure all tokens include tenant claims
```

### 3. Frontend Module Structure
```
Create the base module structure following Fieldpoint's pattern in references/FrontendFMRS:
- Module configuration system
- Lazy loading setup
- Protected route wrapper
- Tenant-aware API client
- Base layout with sidebar and topbar
```

### 4. API Controller Templates
```
Create example controllers for both internal and public APIs:
- Internal: Full CRUD for Properties entity
- Public: Read-only endpoints with pagination
- API key authentication attribute
- Proper Swagger grouping
Include DTOs and service interfaces
```

## Repository Structure After Scaffolding

```
platform-erm/
├── SCAFFOLD.md                 # Your scaffolding guide
├── README.md                   # Project setup instructions
├── .gitignore                  # Git ignore rules
├── docker-compose.yml          # Local PostgreSQL setup
├── backend/
│   ├── PlatformERM.sln
│   ├── src/
│   │   ├── PlatformERM.API/
│   │   ├── PlatformERM.Application/
│   │   ├── PlatformERM.Domain/
│   │   ├── PlatformERM.Infrastructure/
│   │   ├── PlatformERM.Shared/
│   └── tests/
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── .env.example
│   ├── src/
│   └── public/
├── references/                 # Reference codebases
│   ├── BackendFMRS/           # Copy Fieldpoint backend here
│   └── FrontendFMRS/          # Copy Fieldpoint frontend here
└── docs/
    ├── api/
    └── deployment/
```

## Tips for Using Claude Code

1. **Start with the main prompt** to create the structure
2. **Copy your Fieldpoint code** to references/ folder
3. **Use follow-up prompts** for specific components
4. **Reference SCAFFOLD.md** in your prompts for consistency
5. **Point to specific files** in references/ when adapting patterns

Example: "Look at references/BackendFMRS/PureGreenLandGroup.API/Program.cs and adapt the JWT setup for our multi-tenant needs"
