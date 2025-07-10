using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlatformERM.Infrastructure.Persistence;

namespace PlatformERM.API.Controllers.Internal;

[ApiController]
[Route("api/internal/[controller]")]
[ApiExplorerSettings(GroupName = "internal")]
public class CompaniesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CompaniesController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Get all companies for the current tenant
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<object>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var companies = await _context.Companies
            .Where(c => !c.IsDeleted)
            .OrderBy(c => c.Name)
            .Select(c => new
            {
                c.Id,
                c.TenantId,
                c.Name,
                c.Description,
                c.Address,
                c.Phone,
                c.Email,
                c.Website,
                c.IsDeleted,
                c.CreatedAt,
                c.UpdatedAt,
                c.CreatedBy,
                c.UpdatedBy
            })
            .ToListAsync();

        return Ok(companies);
    }

    /// <summary>
    /// Get a specific company by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(object), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById(int id)
    {
        var company = await _context.Companies
            .Where(c => c.Id == id)
            .Select(c => new
            {
                c.Id,
                c.TenantId,
                c.Name,
                c.Description,
                c.Address,
                c.Phone,
                c.Email,
                c.Website,
                c.IsDeleted,
                c.CreatedAt,
                c.UpdatedAt,
                c.CreatedBy,
                c.UpdatedBy
            })
            .FirstOrDefaultAsync();

        if (company == null)
            return NotFound();

        return Ok(company);
    }
}