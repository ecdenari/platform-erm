using Microsoft.AspNetCore.Mvc;
using PlatformERM.Application.Common.Interfaces;
using PlatformERM.Application.Common.Models;
using PlatformERM.Shared.DTOs.Properties;

namespace PlatformERM.API.Controllers.Internal;

[ApiController]
[Route("api/internal/[controller]")]
[ApiExplorerSettings(GroupName = "internal")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;

    public PropertiesController(IPropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    /// <summary>
    /// Get all properties for the current tenant
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<PropertyDto>), 200)]
    public async Task<ActionResult<IEnumerable<PropertyDto>>> GetAll()
    {
        var properties = await _propertyService.GetAllAsync();
        return Ok(properties);
    }

    /// <summary>
    /// Get a specific property by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PropertyDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<PropertyDto>> GetById(int id)
    {
        var property = await _propertyService.GetByIdAsync(id);
        if (property == null)
            return NotFound();

        return Ok(property);
    }

    /// <summary>
    /// Get a property with full details including contacts and work orders
    /// </summary>
    [HttpGet("{id}/details")]
    [ProducesResponseType(typeof(PropertyDetailDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<PropertyDetailDto>> GetByIdWithDetails(int id)
    {
        var property = await _propertyService.GetByIdWithDetailsAsync(id);
        if (property == null)
            return NotFound();

        return Ok(property);
    }

    /// <summary>
    /// Get properties by company ID
    /// </summary>
    [HttpGet("company/{companyId}")]
    [ProducesResponseType(typeof(IEnumerable<PropertyDto>), 200)]
    public async Task<ActionResult<IEnumerable<PropertyDto>>> GetByCompanyId(int companyId)
    {
        var properties = await _propertyService.GetByCompanyIdAsync(companyId);
        return Ok(properties);
    }

    /// <summary>
    /// Search properties by location within a radius
    /// </summary>
    [HttpGet("search/location")]
    [ProducesResponseType(typeof(IEnumerable<PropertyDto>), 200)]
    public async Task<ActionResult<IEnumerable<PropertyDto>>> GetByLocation(
        [FromQuery] double latitude,
        [FromQuery] double longitude,
        [FromQuery] double radiusKm = 10)
    {
        var properties = await _propertyService.GetByLocationAsync(latitude, longitude, radiusKm);
        return Ok(properties);
    }

    /// <summary>
    /// Get paginated properties with search and sorting
    /// </summary>
    [HttpGet("paged")]
    [ProducesResponseType(typeof(PagedResult<PropertyDto>), 200)]
    public async Task<ActionResult<PagedResult<PropertyDto>>> GetPaged(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? search = null,
        [FromQuery] string? sortBy = null,
        [FromQuery] bool sortDescending = false)
    {
        var result = await _propertyService.GetPagedAsync(pageNumber, pageSize, search, sortBy, sortDescending);
        return Ok(result);
    }

    /// <summary>
    /// Create a new property
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(PropertyDto), 201)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<PropertyDto>> Create(CreatePropertyDto createDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var property = await _propertyService.CreateAsync(createDto);
        return CreatedAtAction(nameof(GetById), new { id = property.Id }, property);
    }

    /// <summary>
    /// Update an existing property
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(PropertyDto), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<PropertyDto>> Update(int id, UpdatePropertyDto updateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var property = await _propertyService.UpdateAsync(id, updateDto);
            return Ok(property);
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    /// <summary>
    /// Delete a property (soft delete)
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _propertyService.DeleteAsync(id);
            return NoContent();
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    /// <summary>
    /// Check if a property exists
    /// </summary>
    [HttpGet("{id}/exists")]
    [ProducesResponseType(typeof(bool), 200)]
    public async Task<ActionResult<bool>> Exists(int id)
    {
        var exists = await _propertyService.ExistsAsync(id);
        return Ok(exists);
    }
}