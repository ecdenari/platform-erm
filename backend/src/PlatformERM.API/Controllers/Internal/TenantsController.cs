using Microsoft.AspNetCore.Mvc;
using PlatformERM.Application.Common.Interfaces;
using PlatformERM.Shared.DTOs.Tenants;

namespace PlatformERM.API.Controllers.Internal;

[ApiController]
[Route("api/internal/[controller]")]
[ApiExplorerSettings(GroupName = "internal")]
public class TenantsController : ControllerBase
{
    private readonly ITenantService _tenantService;

    public TenantsController(ITenantService tenantService)
    {
        _tenantService = tenantService;
    }

    /// <summary>
    /// Get all tenants
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<TenantDto>), 200)]
    public async Task<ActionResult<IEnumerable<TenantDto>>> GetAll()
    {
        var tenants = await _tenantService.GetAllAsync();
        return Ok(tenants);
    }

    /// <summary>
    /// Get a specific tenant by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(TenantDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<TenantDto>> GetById(int id)
    {
        var tenant = await _tenantService.GetByIdAsync(id);
        if (tenant == null)
            return NotFound();

        return Ok(tenant);
    }

    /// <summary>
    /// Get the current tenant based on the request context
    /// </summary>
    [HttpGet("current")]
    [ProducesResponseType(typeof(TenantDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<TenantDto>> GetCurrent()
    {
        var tenant = await _tenantService.GetCurrentAsync();
        if (tenant == null)
            return NotFound("Unable to determine current tenant");

        return Ok(tenant);
    }

    /// <summary>
    /// Get a tenant by identifier
    /// </summary>
    [HttpGet("by-identifier/{identifier}")]
    [ProducesResponseType(typeof(TenantDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<TenantDto>> GetByIdentifier(string identifier)
    {
        var tenant = await _tenantService.GetByIdentifierAsync(identifier);
        if (tenant == null)
            return NotFound();

        return Ok(tenant);
    }

    /// <summary>
    /// Create a new tenant
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(TenantDto), 201)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<TenantDto>> Create(CreateTenantDto createDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var tenant = await _tenantService.CreateAsync(createDto);
            return CreatedAtAction(nameof(GetById), new { id = tenant.Id }, tenant);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Update an existing tenant
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(TenantDto), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<TenantDto>> Update(int id, UpdateTenantDto updateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var tenant = await _tenantService.UpdateAsync(id, updateDto);
            return Ok(tenant);
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}