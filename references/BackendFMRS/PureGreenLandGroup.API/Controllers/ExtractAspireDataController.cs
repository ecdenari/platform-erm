using PureGreenLandGroup.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtractAspireDataController : ControllerBase
    {
        private readonly IAspireService _aspireService;
        public ExtractAspireDataController(IAspireService aspireService)
        {
            _aspireService = aspireService;
        }

        [HttpPost("ImportApplicationUser")]
        public async Task<IActionResult> ImportApplicationUser(IFormFile usersFile)
        {
            try
            {
                var response = await _aspireService.SaveApplicationUser(usersFile);
                return Ok(response);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("ImportProperties")]
        public async Task<IActionResult> FetchProperties()
        {
            try
            {
                var response = await _aspireService.SaveProperties();
                return Ok(response);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("ImportBranches")]
        public async Task<IActionResult> FetchBranches()
        {
            try
            {
                var response = await _aspireService.SaveBranches();
                return Ok(response);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // [HttpGet("ImportPropertyStatuses")]
        // public async Task<IActionResult> FetchPropertyStatuses()
        // var response = await _aspireService.SavePropertyStatuses();

        // [HttpGet("ImportPropertyTypes")]
        // public async Task<IActionResult> FetchPropertyTypes()
        // var response = await _aspireService.SavePropertyTypes();
    }
}
