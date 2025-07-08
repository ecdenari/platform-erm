namespace PlatformERM.Infrastructure.Common.Interfaces;

public interface ITenantContextService
{
    string CurrentTenant { get; }
    Task SetTenantAsync(string tenantId);
    Task SetTenantBySubdomainAsync(string subdomain);
    Task<bool> IsTenantValidAsync(string tenantId);
}