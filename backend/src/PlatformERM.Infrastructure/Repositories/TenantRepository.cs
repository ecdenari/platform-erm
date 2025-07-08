using Microsoft.EntityFrameworkCore;
using PlatformERM.Application.Common.Interfaces;
using PlatformERM.Domain.Entities;
using PlatformERM.Infrastructure.Persistence;

namespace PlatformERM.Infrastructure.Repositories;

public class TenantRepository : ITenantRepository
{
    private readonly ApplicationDbContext _context;

    public TenantRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Tenant>> GetAllAsync()
    {
        return await _context.Tenants
            .OrderBy(t => t.Name)
            .ToListAsync();
    }

    public async Task<Tenant?> GetByIdAsync(int id)
    {
        return await _context.Tenants
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Tenant?> GetByIdentifierAsync(string identifier)
    {
        return await _context.Tenants
            .FirstOrDefaultAsync(t => t.Identifier == identifier);
    }

    public async Task<Tenant?> GetBySubdomainAsync(string subdomain)
    {
        return await _context.Tenants
            .FirstOrDefaultAsync(t => t.Subdomain == subdomain);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Tenants
            .AnyAsync(t => t.Id == id);
    }

    public async Task<bool> IdentifierExistsAsync(string identifier)
    {
        return await _context.Tenants
            .AnyAsync(t => t.Identifier == identifier);
    }

    public async Task<bool> SubdomainExistsAsync(string subdomain)
    {
        return await _context.Tenants
            .AnyAsync(t => t.Subdomain == subdomain);
    }

    public async Task<Tenant> CreateAsync(Tenant tenant)
    {
        _context.Tenants.Add(tenant);
        await _context.SaveChangesAsync();
        return tenant;
    }

    public async Task<Tenant> UpdateAsync(Tenant tenant)
    {
        _context.Tenants.Update(tenant);
        await _context.SaveChangesAsync();
        return tenant;
    }

    public async Task DeleteAsync(int id)
    {
        var tenant = await GetByIdAsync(id);
        if (tenant != null)
        {
            _context.Tenants.Remove(tenant);
            await _context.SaveChangesAsync();
        }
    }
}