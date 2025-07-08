using PlatformERM.Domain.Entities;

namespace PlatformERM.Application.Common.Interfaces;

public interface ITenantRepository
{
    Task<IEnumerable<Tenant>> GetAllAsync();
    Task<Tenant?> GetByIdAsync(int id);
    Task<Tenant?> GetByIdentifierAsync(string identifier);
    Task<Tenant?> GetBySubdomainAsync(string subdomain);
    Task<Tenant> CreateAsync(Tenant tenant);
    Task<Tenant> UpdateAsync(Tenant tenant);
    Task<bool> ExistsAsync(int id);
    Task<bool> IdentifierExistsAsync(string identifier);
    Task<bool> SubdomainExistsAsync(string subdomain);
}