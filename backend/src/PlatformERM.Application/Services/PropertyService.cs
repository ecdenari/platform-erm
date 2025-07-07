using AutoMapper;
using PlatformERM.Application.Common.Interfaces;
using PlatformERM.Domain.Entities;
using PlatformERM.Domain.ValueObjects;
using PlatformERM.Shared.DTOs.Properties;
using DomainPropertyType = PlatformERM.Domain.Entities.PropertyType;
using DomainPropertyStatus = PlatformERM.Domain.Entities.PropertyStatus;
using DtoPropertyType = PlatformERM.Shared.DTOs.Properties.PropertyType;
using DtoPropertyStatus = PlatformERM.Shared.DTOs.Properties.PropertyStatus;

namespace PlatformERM.Application.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IMapper _mapper;

    public PropertyService(IPropertyRepository propertyRepository, IMapper mapper)
    {
        _propertyRepository = propertyRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PropertyDto>> GetAllAsync()
    {
        var properties = await _propertyRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<PropertyDto>>(properties);
    }

    public async Task<PropertyDto?> GetByIdAsync(int id)
    {
        var property = await _propertyRepository.GetByIdAsync(id);
        return property != null ? _mapper.Map<PropertyDto>(property) : null;
    }

    public async Task<PropertyDetailDto?> GetByIdWithDetailsAsync(int id)
    {
        var property = await _propertyRepository.GetByIdWithDetailsAsync(id);
        return property != null ? _mapper.Map<PropertyDetailDto>(property) : null;
    }

    public async Task<IEnumerable<PropertyDto>> GetByCompanyIdAsync(int companyId)
    {
        var properties = await _propertyRepository.GetByCompanyIdAsync(companyId);
        return _mapper.Map<IEnumerable<PropertyDto>>(properties);
    }

    public async Task<IEnumerable<PropertyDto>> GetByLocationAsync(double latitude, double longitude, double radiusKm)
    {
        var properties = await _propertyRepository.GetByLocationAsync(latitude, longitude, radiusKm);
        return _mapper.Map<IEnumerable<PropertyDto>>(properties);
    }

    public async Task<PropertyDto> CreateAsync(CreatePropertyDto createDto)
    {
        var property = new Property
        {
            Name = createDto.Name,
            Description = createDto.Description,
            CompanyId = createDto.CompanyId,
            PropertyType = (DomainPropertyType)createDto.PropertyType,
            Status = (DomainPropertyStatus)createDto.Status,
            SquareFootage = createDto.SquareFootage,
            AcreageSize = createDto.AcreageSize,
            Notes = createDto.Notes
        };

        // Create address if provided
        if (createDto.Address != null)
        {
            property.Address = Address.Create(
                createDto.Address.Street,
                createDto.Address.City,
                createDto.Address.State,
                createDto.Address.ZipCode,
                createDto.Address.Suite,
                createDto.Address.Country ?? "US",
                createDto.Address.Latitude,
                createDto.Address.Longitude
            );
        }

        var createdProperty = await _propertyRepository.AddAsync(property);
        return _mapper.Map<PropertyDto>(createdProperty);
    }

    public async Task<PropertyDto> UpdateAsync(int id, UpdatePropertyDto updateDto)
    {
        var property = await _propertyRepository.GetByIdAsync(id);
        if (property == null)
            throw new ArgumentException($"Property with ID {id} not found");

        // Update basic properties
        property.Name = updateDto.Name;
        property.Description = updateDto.Description;
        property.PropertyType = (DomainPropertyType)updateDto.PropertyType;
        property.Status = (DomainPropertyStatus)updateDto.Status;
        property.SquareFootage = updateDto.SquareFootage;
        property.AcreageSize = updateDto.AcreageSize;
        property.Notes = updateDto.Notes;
        property.UpdatedAt = DateTime.UtcNow;

        // Update address if provided
        if (updateDto.Address != null)
        {
            property.Address = Address.Create(
                updateDto.Address.Street,
                updateDto.Address.City,
                updateDto.Address.State,
                updateDto.Address.ZipCode,
                updateDto.Address.Suite,
                updateDto.Address.Country ?? "US",
                updateDto.Address.Latitude,
                updateDto.Address.Longitude
            );
        }

        var updatedProperty = await _propertyRepository.UpdateAsync(property);
        return _mapper.Map<PropertyDto>(updatedProperty);
    }

    public async Task DeleteAsync(int id)
    {
        if (!await _propertyRepository.ExistsAsync(id))
            throw new ArgumentException($"Property with ID {id} not found");

        await _propertyRepository.DeleteAsync(id);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _propertyRepository.ExistsAsync(id);
    }

    public async Task<PagedResult<PropertyDto>> GetPagedAsync(int pageNumber, int pageSize, string? search = null, string? sortBy = null, bool sortDescending = false)
    {
        var properties = await _propertyRepository.GetPagedAsync(pageNumber, pageSize, search, sortBy, sortDescending);
        var totalCount = await _propertyRepository.CountAsync();

        return new PagedResult<PropertyDto>
        {
            Items = _mapper.Map<IEnumerable<PropertyDto>>(properties),
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<IEnumerable<PublicPropertyDto>> GetPublicPropertiesAsync(int limit, int offset)
    {
        var properties = await _propertyRepository.GetPagedAsync(
            offset / limit + 1, 
            limit, 
            null, 
            "name", 
            false
        );
        
        return _mapper.Map<IEnumerable<PublicPropertyDto>>(properties);
    }
}