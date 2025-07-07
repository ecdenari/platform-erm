using Microsoft.EntityFrameworkCore;
using PlatformERM.Application.Common.Interfaces;
using PlatformERM.Domain.Entities;
using PlatformERM.Infrastructure.Persistence;

namespace PlatformERM.Infrastructure.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly ApplicationDbContext _context;

    public PropertyRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Property>> GetAllAsync()
    {
        return await _context.Properties
            .Include(p => p.Company)
            .OrderBy(p => p.Name)
            .ToListAsync();
    }

    public async Task<Property?> GetByIdAsync(int id)
    {
        return await _context.Properties
            .Include(p => p.Company)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Property?> GetByIdWithDetailsAsync(int id)
    {
        return await _context.Properties
            .Include(p => p.Company)
            .Include(p => p.PropertyContacts)
                .ThenInclude(pc => pc.Contact)
            .Include(p => p.WorkOrders)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Property>> GetByCompanyIdAsync(int companyId)
    {
        return await _context.Properties
            .Include(p => p.Company)
            .Where(p => p.CompanyId == companyId)
            .OrderBy(p => p.Name)
            .ToListAsync();
    }

    public async Task<IEnumerable<Property>> GetByLocationAsync(double latitude, double longitude, double radiusKm)
    {
        return await _context.Properties
            .Include(p => p.Company)
            .Where(p => p.Address != null && 
                       p.Address.Latitude != null && 
                       p.Address.Longitude != null &&
                       // Simple distance calculation (approximate)
                       Math.Abs(p.Address.Latitude.Value - latitude) <= radiusKm * 0.009 &&
                       Math.Abs(p.Address.Longitude.Value - longitude) <= radiusKm * 0.009)
            .OrderBy(p => 
                Math.Abs(p.Address!.Latitude!.Value - latitude) + 
                Math.Abs(p.Address!.Longitude!.Value - longitude))
            .ToListAsync();
    }

    public async Task<Property> AddAsync(Property property)
    {
        _context.Properties.Add(property);
        await _context.SaveChangesAsync();
        return property;
    }

    public async Task<Property> UpdateAsync(Property property)
    {
        _context.Properties.Update(property);
        await _context.SaveChangesAsync();
        return property;
    }

    public async Task DeleteAsync(int id)
    {
        var property = await _context.Properties.FindAsync(id);
        if (property != null)
        {
            // Soft delete
            property.IsDeleted = true;
            property.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Properties.AnyAsync(p => p.Id == id);
    }

    public async Task<int> CountAsync()
    {
        return await _context.Properties.CountAsync();
    }

    public async Task<IEnumerable<Property>> GetPagedAsync(int pageNumber, int pageSize, string? search = null, string? sortBy = null, bool sortDescending = false)
    {
        var query = _context.Properties
            .Include(p => p.Company)
            .AsQueryable();

        // Apply search filter
        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(p => 
                p.Name.Contains(search) ||
                p.Company.Name.Contains(search) ||
                (p.Address != null && 
                 (p.Address.Street.Contains(search) ||
                  p.Address.City.Contains(search) ||
                  p.Address.State.Contains(search))));
        }

        // Apply sorting
        query = sortBy?.ToLower() switch
        {
            "name" => sortDescending ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name),
            "company" => sortDescending ? query.OrderByDescending(p => p.Company.Name) : query.OrderBy(p => p.Company.Name),
            "status" => sortDescending ? query.OrderByDescending(p => p.Status) : query.OrderBy(p => p.Status),
            "type" => sortDescending ? query.OrderByDescending(p => p.PropertyType) : query.OrderBy(p => p.PropertyType),
            "createdat" => sortDescending ? query.OrderByDescending(p => p.CreatedAt) : query.OrderBy(p => p.CreatedAt),
            _ => query.OrderBy(p => p.Name)
        };

        return await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
}