using PlatformERM.Domain.Entities;

namespace PlatformERM.Application.Common.Interfaces;

public interface IPropertyRepository
{
    Task<IEnumerable<Property>> GetAllAsync();
    Task<Property?> GetByIdAsync(int id);
    Task<Property?> GetByIdWithDetailsAsync(int id);
    Task<IEnumerable<Property>> GetByCompanyIdAsync(int companyId);
    Task<IEnumerable<Property>> GetByLocationAsync(double latitude, double longitude, double radiusKm);
    Task<Property> AddAsync(Property property);
    Task<Property> UpdateAsync(Property property);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<int> CountAsync();
    Task<IEnumerable<Property>> GetPagedAsync(int pageNumber, int pageSize, string? search = null, string? sortBy = null, bool sortDescending = false);
}