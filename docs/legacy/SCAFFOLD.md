# Platform-ERM Standalone Multi-Tenant Scaffolding Guide

## Project Overview
Building a standalone Landscape ERP platform as a multi-tenant SaaS solution. Platform-ERM will be the source of truth for all data (properties, contacts, etc.) and will expose APIs for external integrations.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Platform-ERM System                       │
├─────────────────────────────────────────────────────────────┤
│  Internal API Layer (Full CRUD)                              │
│  - Complete access to all platform features                  │
│  - Used by Platform-ERM frontend                            │
│  - Swagger UI for internal development                       │
├─────────────────────────────────────────────────────────────┤
│  Public API Layer (Controlled Access)                        │
│  - Limited endpoints for external systems                    │
│  - API key authentication                                    │
│  - Separate Swagger documentation                            │
├─────────────────────────────────────────────────────────────┤
│  Multi-Tenant Database (PostgreSQL)                          │
│  - Tenant isolation at database level                        │
│  - Shared schema with TenantId discrimination               │
└─────────────────────────────────────────────────────────────┘
```

## Repository Structure

```
platform-erm/
├── backend/                    # .NET Core 8 API (Visual Studio)
│   ├── src/
│   │   ├── PlatformERM.API/
│   │   │   ├── Controllers/
│   │   │   │   ├── Internal/   # Full access controllers
│   │   │   │   └── Public/     # Limited public API
│   │   │   ├── Middleware/
│   │   │   │   └── TenantResolutionMiddleware.cs
│   │   │   └── Program.cs
│   │   ├── PlatformERM.Application/
│   │   │   ├── Common/
│   │   │   │   └── Interfaces/
│   │   │   │       └── ITenantService.cs
│   │   │   └── Services/
│   │   ├── PlatformERM.Domain/
│   │   │   ├── Common/
│   │   │   │   └── BaseEntity.cs  # Includes TenantId
│   │   │   └── Entities/
│   │   ├── PlatformERM.Infrastructure/
│   │   │   ├── Persistence/
│   │   │   │   ├── ApplicationDbContext.cs
│   │   │   │   └── Interceptors/
│   │   │   │       └── TenantSaveChangesInterceptor.cs
│   │   │   └── MultiTenancy/
│   │   └── PlatformERM.PublicAPI/
│   │       ├── Controllers/
│   │       ├── Models/
│   │       └── Authentication/
│   └── tests/
├── frontend/                   # React 18 + Vite (Cursor)
│   ├── src/
│   │   ├── api/
│   │   │   ├── internal/      # Internal API client
│   │   │   └── types/         # TypeScript definitions
│   │   ├── modules/
│   │   ├── contexts/
│   │   │   └── TenantContext.tsx
│   │   └── hooks/
│   │       └── useTenant.ts
│   └── public/
└── docs/
    ├── api/
    │   ├── internal-api.md
    │   └── public-api.md
    └── deployment/
```

## Multi-Tenant Backend Setup

### 1. Base Entity with Tenant Support
```csharp
// PlatformERM.Domain/Common/BaseEntity.cs
public abstract class BaseEntity
{
    public int Id { get; set; }
    public string TenantId { get; set; } // Required for all entities
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string CreatedBy { get; set; }
    public string UpdatedBy { get; set; }
}

// PlatformERM.Domain/Common/ITenantEntity.cs
public interface ITenantEntity
{
    string TenantId { get; set; }
}
```

### 2. Multi-Tenant DbContext
```csharp
// PlatformERM.Infrastructure/Persistence/ApplicationDbContext.cs
public class ApplicationDbContext : DbContext
{
    private readonly ITenantService _tenantService;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        ITenantService tenantService) : base(options)
    {
        _tenantService = tenantService;
    }

    public DbSet<Company> Companies { get; set; }
    public DbSet<Property> Properties { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Tenant> Tenants { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply global query filter for tenant isolation
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ITenantEntity).IsAssignableFrom(entityType.ClrType))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .AddQueryFilter<ITenantEntity>(e => e.TenantId == _tenantService.CurrentTenant);
            }
        }

        // Configure tenant entity
        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Id).ValueGeneratedNever(); // Use provided ID
            entity.HasIndex(t => t.Subdomain).IsUnique();
            entity.HasIndex(t => t.ApiKey).IsUnique();
        });
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<ITenantEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.TenantId = _tenantService.CurrentTenant;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
```

### 3. Tenant Resolution Middleware
```csharp
// PlatformERM.API/Middleware/TenantResolutionMiddleware.cs
public class TenantResolutionMiddleware
{
    private readonly RequestDelegate _next;

    public TenantResolutionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, ITenantService tenantService)
    {
        // Resolution strategy 1: Subdomain
        var host = context.Request.Host.Value;
        var subdomain = host.Split('.')[0];
        
        // Resolution strategy 2: Header (for API calls)
        if (context.Request.Headers.TryGetValue("X-Tenant-Id", out var tenantId))
        {
            await tenantService.SetTenantAsync(tenantId);
        }
        // Resolution strategy 3: JWT claim
        else if (context.User.Identity.IsAuthenticated)
        {
            var tenantClaim = context.User.FindFirst("tenant_id")?.Value;
            if (!string.IsNullOrEmpty(tenantClaim))
            {
                await tenantService.SetTenantAsync(tenantClaim);
            }
        }
        // Resolution strategy 4: Subdomain
        else if (!string.IsNullOrEmpty(subdomain) && subdomain != "app")
        {
            await tenantService.SetTenantBySubdomainAsync(subdomain);
        }

        await _next(context);
    }
}
```

### 4. Dual Swagger Configuration
```csharp
// PlatformERM.API/Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add Swagger with multiple documents
builder.Services.AddSwaggerGen(c =>
{
    // Internal API documentation
    c.SwaggerDoc("internal", new OpenApiInfo
    {
        Title = "Platform-ERM Internal API",
        Version = "v1",
        Description = "Complete API for Platform-ERM frontend"
    });

    // Public API documentation
    c.SwaggerDoc("public", new OpenApiInfo
    {
        Title = "Platform-ERM Public API",
        Version = "v1",
        Description = "Public API for external integrations"
    });

    // Add security definitions
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "API Key for external access",
        Name = "X-API-Key",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    // Configure which controllers belong to which document
    c.DocInclusionPredicate((docName, apiDesc) =>
    {
        if (docName == "internal")
            return apiDesc.RelativePath.StartsWith("api/internal");
        if (docName == "public")
            return apiDesc.RelativePath.StartsWith("api/public");
        return false;
    });
});

var app = builder.Build();

// Configure Swagger UI
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/internal/swagger.json", "Internal API");
    c.SwaggerEndpoint("/swagger/public/swagger.json", "Public API");
    c.RoutePrefix = "swagger";
});
```

### 5. Controller Organization
```csharp
// PlatformERM.API/Controllers/Internal/PropertiesController.cs
[ApiController]
[Route("api/internal/[controller]")]
[Authorize]
[ApiExplorerSettings(GroupName = "internal")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;
    private readonly ITenantService _tenantService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PropertyDto>>> GetAll()
    {
        // Automatically filtered by tenant via global query filter
        var properties = await _propertyService.GetAllAsync();
        return Ok(properties);
    }

    [HttpPost]
    public async Task<ActionResult<PropertyDto>> Create(CreatePropertyDto dto)
    {
        // TenantId automatically set via SaveChangesAsync override
        var property = await _propertyService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = property.Id }, property);
    }
}

// PlatformERM.API/Controllers/Public/PublicPropertiesController.cs
[ApiController]
[Route("api/public/properties")]
[ApiKeyAuth] // Custom attribute for API key authentication
[ApiExplorerSettings(GroupName = "public")]
public class PublicPropertiesController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(200)]
    [ProducesResponseType(401)]
    public async Task<ActionResult<IEnumerable<PublicPropertyDto>>> GetProperties(
        [FromQuery] int? limit = 100,
        [FromQuery] int? offset = 0)
    {
        // Limited data exposure for external systems
        var properties = await _propertyService.GetPublicPropertiesAsync(limit.Value, offset.Value);
        return Ok(properties);
    }
}
```

### 6. API Key Authentication for Public API
```csharp
// PlatformERM.PublicAPI/Authentication/ApiKeyAuthAttribute.cs
public class ApiKeyAuthAttribute : ServiceFilterAttribute
{
    public ApiKeyAuthAttribute() : base(typeof(ApiKeyAuthFilter)) { }
}

public class ApiKeyAuthFilter : IAuthorizationFilter
{
    private readonly IApiKeyService _apiKeyService;

    public ApiKeyAuthFilter(IApiKeyService apiKeyService)
    {
        _apiKeyService = apiKeyService;
    }

    public async void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!context.HttpContext.Request.Headers.TryGetValue("X-API-Key", out var apiKey))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var tenant = await _apiKeyService.ValidateApiKeyAsync(apiKey);
        if (tenant == null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        // Set tenant context for this request
        context.HttpContext.Items["TenantId"] = tenant.Id;
    }
}
```

## Frontend Multi-Tenant Setup

### 1. Tenant Context
```typescript
// frontend/src/contexts/TenantContext.tsx
interface TenantInfo {
  id: string;
  name: string;
  subdomain: string;
  features: string[];
  branding: {
    primaryColor: string;
    logo: string;
  };
}

const TenantContext = createContext<{
  tenant: TenantInfo | null;
  loading: boolean;
}>({ tenant: null, loading: true });

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Resolve tenant from subdomain or auth token
    const resolveTenant = async () => {
      try {
        const response = await api.get('/tenant/current');
        setTenant(response.data);
      } finally {
        setLoading(false);
      }
    };
    resolveTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, loading }}>
      {children}
    </TenantContext.Provider>
  );
};
```

### 2. API Client with Tenant Headers
```typescript
// frontend/src/api/client.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add tenant header to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add tenant header if needed (for development/testing)
  const tenantId = localStorage.getItem('tenantId');
  if (tenantId && import.meta.env.DEV) {
    config.headers['X-Tenant-Id'] = tenantId;
  }
  
  return config;
});

export default api;
```

## Database Schema for Multi-Tenant

```sql
-- Tenants table (master table, not tenant-scoped)
CREATE TABLE tenants (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    api_key UUID UNIQUE DEFAULT gen_random_uuid(),
    plan VARCHAR(50) DEFAULT 'starter',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    settings JSONB DEFAULT '{}'::jsonb
);

-- All other tables include tenant_id
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Composite index for performance
    INDEX idx_companies_tenant (tenant_id)
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenants(id),
    company_id INTEGER NOT NULL REFERENCES companies(id),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    location GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_properties_tenant (tenant_id),
    INDEX idx_properties_location USING GIST(location)
);

-- Row Level Security (optional additional security layer)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON properties
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::text);
```

## External Integration Strategy

### Public API Endpoints
```csharp
// Controlled endpoints for external systems
public class PublicApiEndpoints
{
    // Properties
    GET    /api/public/properties
    GET    /api/public/properties/{id}
    POST   /api/public/properties/search
    
    // Contacts  
    GET    /api/public/contacts
    GET    /api/public/contacts/{id}
    
    // Work Orders (read-only)
    GET    /api/public/workorders
    GET    /api/public/workorders/{id}
    
    // Webhooks
    POST   /api/public/webhooks/register
    DELETE /api/public/webhooks/{id}
}
```

### Integration with Fieldpoint-FMRS
Since Fieldpoint-FMRS pulls data from Aspire, and Platform-ERM is standalone:
- Platform-ERM maintains its own property/contact data
- No dependency on Aspire or Fieldpoint for core data
- Can optionally sync data TO other systems via webhooks
- External systems integrate with Platform-ERM, not the reverse

## Development & Testing

### Tenant Switching for Development
```csharp
// Add development middleware for easy tenant switching
if (app.Environment.IsDevelopment())
{
    app.MapGet("/dev/switch-tenant/{tenantId}", (string tenantId) =>
    {
        // Set cookie or header for tenant switching
        return Results.Ok($"Switched to tenant: {tenantId}");
    });
}
```

### Seed Data for Multi-Tenant Testing
```csharp
public class TenantSeedData
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        var tenants = new[]
        {
            new Tenant 
            { 
                Id = "demo", 
                Name = "Demo Company", 
                Subdomain = "demo",
                Plan = "enterprise" 
            },
            new Tenant 
            { 
                Id = "test1", 
                Name = "Test Landscape Co", 
                Subdomain = "testlandscape",
                Plan = "professional" 
            }
        };

        context.Tenants.AddRange(tenants);
        await context.SaveChangesAsync();
    }
}
```

## Security Considerations

1. **Tenant Isolation**: 
   - Global query filters ensure data isolation
   - API keys are tenant-specific
   - JWT tokens include tenant claims

2. **Public API Security**:
   - Rate limiting per API key
   - IP whitelisting option
   - Audit logging for all public API calls

3. **Data Access**:
   - No cross-tenant data access
   - Tenant admin cannot see other tenants
   - Super admin access requires separate authentication

## Next Steps

1. **Initialize the project** with multi-tenant support from day one
2. **Create tenant onboarding flow** for self-service signup
3. **Implement API key management UI** for tenants
4. **Build public API documentation** site
5. **Set up webhook system** for real-time integrations

This architecture ensures Platform-ERM is truly standalone while providing controlled access for external integrations!