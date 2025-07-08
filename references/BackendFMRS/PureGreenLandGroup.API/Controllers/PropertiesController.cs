using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Models.DTO.Properties;
using PureGreenLandGroup.Models.ViewModel.Properties;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
//    [Authorize]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertiesService _propertiesService;
        private readonly IConfiguration _configuration;
        public PropertiesController(IPropertiesService propertiesService, IConfiguration configuration)
        {
            _propertiesService = propertiesService;
            _configuration = configuration;
        }


        ///for getting properties list
        [HttpGet("GetIrrigationProperties")]
        public async Task<List<PropertiesListVM>> GetIrrigationProperties()
        {
            try
            {
                var properties = await _propertiesService.ListAllIrrigationProperties(_configuration);
                return properties;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetPropertyStatistics")]
        public async Task<PropertyCountsVM> GetPropertyStatistics()
        {
            try
            {
                return await _propertiesService.GetPropertyCounts();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetLatestProperties")]
        public async Task<bool> GetLatestProperties()
        {
            try
            {
                return await _propertiesService.GetLatestProperties();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("SwitchPropertyStatus")]
        public async Task<bool> SwitchPropertyStatus(int id, bool propertyStatus)
        {
            return await _propertiesService.SwitchPropertyStatus(id, propertyStatus);
        }

        /// <summary>
        /// Get properties relevant for Site Management module (Active and Maintenance divisions + Customer properties)
        /// </summary>
        [HttpGet("GetSiteManagementProperties")]
        public async Task<List<PropertiesListVM>> GetSiteManagementProperties()
        {
            try
            {
                var properties = await _propertiesService.ListSiteManagementProperties(_configuration);
                return properties;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Assign a default site report template to a property
        /// </summary>
        [HttpPost("AssignDefaultTemplate")]
        public async Task<IActionResult> AssignDefaultTemplate(int propertyId, int templateId)
        {
            try
            {
                var result = await _propertiesService.AssignDefaultTemplate(propertyId, templateId);
                if (result)
                {
                    return Ok(new { message = "Template assigned successfully" });
                }
                return BadRequest(new { message = "Failed to assign template" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Remove default site report template from a property
        /// </summary>
        [HttpDelete("RemoveDefaultTemplate")]
        public async Task<IActionResult> RemoveDefaultTemplate(int propertyId)
        {
            try
            {
                var result = await _propertiesService.RemoveDefaultTemplate(propertyId);
                if (result)
                {
                    return Ok(new { message = "Template removed successfully" });
                }
                return BadRequest(new { message = "Failed to remove template" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get the default template assigned to a property
        /// </summary>
        [HttpGet("GetDefaultTemplate/{propertyId}")]
        public async Task<IActionResult> GetDefaultTemplate(int propertyId)
        {
            try
            {
                var template = await _propertiesService.GetDefaultTemplate(propertyId);
                return Ok(template);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

    }
}
