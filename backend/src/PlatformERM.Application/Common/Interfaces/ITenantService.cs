using PlatformERM.Shared.DTOs.Tenants;

namespace PlatformERM.Application.Common.Interfaces;

public interface ITenantService
{
    Task<IEnumerable<TenantDto>> GetAllAsync();
    Task<TenantDto?> GetByIdAsync(int id);
    Task<TenantDto?> GetByIdentifierAsync(string identifier);
    Task<TenantDto?> GetCurrentAsync(); // Get tenant from current context
    Task<TenantDto> CreateAsync(CreateTenantDto createDto);
    Task<TenantDto> UpdateAsync(int id, UpdateTenantDto updateDto);
    Task<bool> ExistsAsync(int id);
}