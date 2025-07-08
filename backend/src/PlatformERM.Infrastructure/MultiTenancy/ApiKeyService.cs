using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PlatformERM.Application.Common.Interfaces;
using PlatformERM.Domain.Entities;
using PlatformERM.Infrastructure.Persistence;

namespace PlatformERM.Infrastructure.MultiTenancy;

public class ApiKeyService : IApiKeyService
{
    private readonly IServiceProvider _serviceProvider;

    public ApiKeyService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task<Tenant?> ValidateApiKeyAsync(string apiKey)
    {
        using var scope = _serviceProvider.CreateScope();
        using var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        return await context.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.ApiKey == apiKey && t.IsActive);
    }

    public async Task<string> GenerateApiKeyAsync(string tenantId)
    {
        using var scope = _serviceProvider.CreateScope();
        using var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Identifier == tenantId);
        if (tenant == null)
        {
            throw new ArgumentException($"Tenant {tenantId} not found");
        }

        var newApiKey = Guid.NewGuid().ToString();
        tenant.ApiKey = newApiKey;
        await context.SaveChangesAsync();

        return newApiKey;
    }

    public async Task RevokeApiKeyAsync(string tenantId)
    {
        using var scope = _serviceProvider.CreateScope();
        using var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Identifier == tenantId);
        if (tenant == null)
        {
            throw new ArgumentException($"Tenant {tenantId} not found");
        }

        tenant.ApiKey = string.Empty;
        await context.SaveChangesAsync();
    }
}