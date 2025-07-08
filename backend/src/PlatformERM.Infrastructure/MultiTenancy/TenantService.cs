using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PlatformERM.Infrastructure.Common.Interfaces;
using PlatformERM.Infrastructure.Persistence;

namespace PlatformERM.Infrastructure.MultiTenancy;

public class TenantContextService : ITenantContextService
{
    private readonly IServiceProvider _serviceProvider;
    private string _currentTenant = "demo"; // Default tenant for development

    public TenantService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public string CurrentTenant => _currentTenant;

    public async Task SetTenantAsync(string tenantId)
    {
        if (await IsTenantValidAsync(tenantId))
        {
            _currentTenant = tenantId;
        }
        else
        {
            throw new UnauthorizedAccessException($"Invalid tenant: {tenantId}");
        }
    }

    public async Task SetTenantBySubdomainAsync(string subdomain)
    {
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        var tenant = await context.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Subdomain == subdomain && t.IsActive);

        if (tenant != null)
        {
            _currentTenant = tenant.Id;
        }
        else
        {
            throw new UnauthorizedAccessException($"Invalid subdomain: {subdomain}");
        }
    }

    public async Task<bool> IsTenantValidAsync(string tenantId)
    {
        // Always allow "demo" tenant for development
        if (tenantId == "demo")
        {
            return true;
        }
        
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        return await context.Tenants
            .AsNoTracking()
            .AnyAsync(t => t.Id == tenantId && t.IsActive);
    }
}