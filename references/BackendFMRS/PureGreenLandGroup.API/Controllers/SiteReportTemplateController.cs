using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.SiteManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SiteReportTemplateController : ControllerBase
    {
        private readonly ISiteReportTemplateService _siteReportTemplateService;

        public SiteReportTemplateController(ISiteReportTemplateService siteReportTemplateService)
        {
            _siteReportTemplateService = siteReportTemplateService;
        }

        /// <summary>
        /// Get all site report templates
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<SiteReportTemplateListVM>>> GetTemplates()
        {
            try
            {
                var templates = await _siteReportTemplateService.GetAllTemplatesAsync();
                return Ok(templates);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get site report template by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<SiteReportTemplateVM>> GetTemplate(int id)
        {
            try
            {
                var template = await _siteReportTemplateService.GetTemplateByIdAsync(id);
                if (template == null)
                {
                    return NotFound($"Template with ID {id} not found");
                }
                return Ok(template);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Create a new site report template
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<SiteReportTemplateVM>> CreateTemplate([FromBody] CreateSiteReportTemplateVM createTemplate)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var template = await _siteReportTemplateService.CreateTemplateAsync(createTemplate);
                return CreatedAtAction(nameof(GetTemplate), new { id = template.Id }, template);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Update an existing site report template
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<SiteReportTemplateVM>> UpdateTemplate(int id, [FromBody] UpdateSiteReportTemplateVM updateTemplate)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != updateTemplate.Id)
                {
                    return BadRequest("ID mismatch");
                }

                var template = await _siteReportTemplateService.UpdateTemplateAsync(updateTemplate);
                if (template == null)
                {
                    return NotFound($"Template with ID {id} not found");
                }

                return Ok(template);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Delete a site report template
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTemplate(int id)
        {
            try
            {
                var result = await _siteReportTemplateService.DeleteTemplateAsync(id);
                if (!result)
                {
                    return NotFound($"Template with ID {id} not found");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Toggle template active status
        /// </summary>
        [HttpPatch("{id}/toggle-status")]
        public async Task<ActionResult> ToggleTemplateStatus(int id)
        {
            try
            {
                var result = await _siteReportTemplateService.ToggleTemplateStatusAsync(id);
                if (!result)
                {
                    return NotFound($"Template with ID {id} not found");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get active templates only
        /// </summary>
        [HttpGet("active")]
        public async Task<ActionResult<List<SiteReportTemplateListVM>>> GetActiveTemplates()
        {
            try
            {
                var templates = await _siteReportTemplateService.GetActiveTemplatesAsync();
                return Ok(templates);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}