using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Infrastructure.DbConn;
using System.Linq;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/basic-properties")]
    [ApiController]
    public class BasicPropertiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BasicPropertiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBasicProperties()
        {
            var properties = _context.Properties.Select(p => new
            {
                p.Id,
                p.PropertyName,
                p.PropertyAddressLine1,
                p.PropertyAddressCity,
                p.PropertyAddressStateProvinceCode,
                p.PropertyAddressZipCode
            }).ToList();

            return Ok(properties);
        }
    }
} 