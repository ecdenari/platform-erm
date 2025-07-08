using AutoMapper;
using Microsoft.AspNetCore.Http;
using PlatformERM.Application.Common.Interfaces;
using PlatformERM.Domain.Entities;
using PlatformERM.Shared.DTOs.Tenants;

namespace PlatformERM.Application.Services;

public class TenantService : ITenantService
{
    private readonly ITenantRepository _tenantRepository;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TenantService(
        ITenantRepository tenantRepository, 
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor)
    {
        _tenantRepository = tenantRepository;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<IEnumerable<TenantDto>> GetAllAsync()
    {
        var tenants = await _tenantRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<TenantDto>>(tenants);
    }

    public async Task<TenantDto?> GetByIdAsync(int id)
    {
        var tenant = await _tenantRepository.GetByIdAsync(id);
        return tenant == null ? null : _mapper.Map<TenantDto>(tenant);
    }

    public async Task<TenantDto?> GetByIdentifierAsync(string identifier)
    {
        var tenant = await _tenantRepository.GetByIdentifierAsync(identifier);
        return tenant == null ? null : _mapper.Map<TenantDto>(tenant);
    }

    public async Task<TenantDto?> GetCurrentAsync()
    {
        // Try to get tenant ID from header
        var tenantIdHeader = _httpContextAccessor.HttpContext?.Request.Headers["X-Tenant-Id"].FirstOrDefault();
        if (int.TryParse(tenantIdHeader, out var tenantId))
        {
            return await GetByIdAsync(tenantId);
        }

        // Try to get from subdomain or other context
        // For now, return null
        return null;
    }

    public async Task<TenantDto> CreateAsync(CreateTenantDto createDto)
    {
        // Check if identifier already exists
        if (await _tenantRepository.IdentifierExistsAsync(createDto.Identifier))
        {
            throw new ArgumentException($"Tenant with identifier '{createDto.Identifier}' already exists.");
        }

        // Check if subdomain already exists
        if (await _tenantRepository.SubdomainExistsAsync(createDto.Subdomain))
        {
            throw new ArgumentException($"Tenant with subdomain '{createDto.Subdomain}' already exists.");
        }

        var tenant = _mapper.Map<Tenant>(createDto);
        tenant.CreatedAt = DateTime.UtcNow;

        var created = await _tenantRepository.CreateAsync(tenant);
        return _mapper.Map<TenantDto>(created);
    }

    public async Task<TenantDto> UpdateAsync(int id, UpdateTenantDto updateDto)
    {
        var tenant = await _tenantRepository.GetByIdAsync(id);
        if (tenant == null)
        {
            throw new ArgumentException($"Tenant with ID {id} not found.");
        }

        _mapper.Map(updateDto, tenant);
        tenant.UpdatedAt = DateTime.UtcNow;

        var updated = await _tenantRepository.UpdateAsync(tenant);
        return _mapper.Map<TenantDto>(updated);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _tenantRepository.ExistsAsync(id);
    }
}