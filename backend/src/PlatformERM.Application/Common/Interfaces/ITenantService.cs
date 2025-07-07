namespace PlatformERM.Application.Common.Interfaces;

public interface ITenantService
{
    string CurrentTenant { get; }
    Task SetTenantAsync(string tenantId);
    Task SetTenantBySubdomainAsync(string subdomain);
    Task<bool> IsTenantValidAsync(string tenantId);
}