using PlatformERM.Domain.Entities;
using PlatformERM.Shared.DTOs.Properties;

namespace PlatformERM.Application.Common.Interfaces;

public interface IPropertyService
{
    Task<IEnumerable<PropertyDto>> GetAllAsync();
    Task<PropertyDto?> GetByIdAsync(int id);
    Task<PropertyDetailDto?> GetByIdWithDetailsAsync(int id);
    Task<IEnumerable<PropertyDto>> GetByCompanyIdAsync(int companyId);
    Task<IEnumerable<PropertyDto>> GetByLocationAsync(double latitude, double longitude, double radiusKm);
    Task<PropertyDto> CreateAsync(CreatePropertyDto createDto);
    Task<PropertyDto> UpdateAsync(int id, UpdatePropertyDto updateDto);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<PagedResult<PropertyDto>> GetPagedAsync(int pageNumber, int pageSize, string? search = null, string? sortBy = null, bool sortDescending = false);
    Task<IEnumerable<PublicPropertyDto>> GetPublicPropertiesAsync(int limit, int offset);
}

public class PagedResult<T>
{
    public IEnumerable<T> Items { get; set; } = new List<T>();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasPrevious => PageNumber > 1;
    public bool HasNext => PageNumber < TotalPages;
}