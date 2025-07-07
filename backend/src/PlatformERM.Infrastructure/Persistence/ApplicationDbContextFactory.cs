using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using PlatformERM.Application.Common.Interfaces;

namespace PlatformERM.Infrastructure.Persistence;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        
        // Use a connection string for design-time
        var connectionString = "Host=localhost;Database=platform_erm_dev;Username=postgres;Password=postgres";
        optionsBuilder.UseNpgsql(connectionString);

        // Create a design-time tenant service
        var designTimeTenantService = new DesignTimeTenantService();
        
        return new ApplicationDbContext(optionsBuilder.Options, designTimeTenantService);
    }
}

// Design-time implementation of ITenantService
public class DesignTimeTenantService : ITenantService
{
    public string CurrentTenant => "design-time";

    public Task SetTenantAsync(string tenantId)
    {
        return Task.CompletedTask;
    }

    public Task SetTenantBySubdomainAsync(string subdomain)
    {
        return Task.CompletedTask;
    }

    public Task<bool> IsTenantValidAsync(string tenantId)
    {
        return Task.FromResult(true);
    }
}