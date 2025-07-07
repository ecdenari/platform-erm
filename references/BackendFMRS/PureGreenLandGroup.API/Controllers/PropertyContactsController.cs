using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Services.IServices;
using System.Threading.Tasks;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyContactsController : ControllerBase
    {
        private readonly IPropertiesService _propertiesService;

        public PropertyContactsController(IPropertiesService propertiesService)
        {
            _propertiesService = propertiesService;
        }

        [HttpGet("GetPropertyContactsByPropertyId")]
        public async Task<IActionResult> GetContactsByPropertyId([FromQuery] int propertyId)
        {
            var contacts = await _propertiesService.GetContactsByPropertyId(propertyId);
            return Ok(contacts);
        }
    }
} 