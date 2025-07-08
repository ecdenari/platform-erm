using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.SiteManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SiteReportController : ControllerBase
    {
        private readonly ISiteReportService _siteReportService;

        public SiteReportController(ISiteReportService siteReportService)
        {
            _siteReportService = siteReportService;
        }

        /// <summary>
        /// Get all site reports with filtering
        /// </summary>
        [HttpPost("search")]
        public async Task<ActionResult<List<SiteReportListVM>>> GetReports([FromBody] SiteReportFilterVM filter)
        {
            try
            {
                var reports = await _siteReportService.GetReportsAsync(filter);
                return Ok(reports);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get site report by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<SiteReportVM>> GetReport(int id)
        {
            try
            {
                var report = await _siteReportService.GetReportByIdAsync(id);
                if (report == null)
                {
                    return NotFound($"Report with ID {id} not found");
                }
                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get site reports by property ID
        /// </summary>
        [HttpGet("property/{propertyId}")]
        public async Task<ActionResult<List<SiteReportListVM>>> GetReportsByProperty(int propertyId)
        {
            try
            {
                var reports = await _siteReportService.GetReportsByPropertyIdAsync(propertyId);
                return Ok(reports);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Create a new site report
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<SiteReportVM>> CreateReport([FromBody] CreateSiteReportVM createReport)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var report = await _siteReportService.CreateReportAsync(createReport);
                return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Create a new site report from a template
        /// </summary>
        [HttpPost("from-template")]
        public async Task<ActionResult<SiteReportVM>> CreateReportFromTemplate([FromBody] CreateReportFromTemplateVM request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createReport = new CreateSiteReportVM
                {
                    PropertyID = request.PropertyID,
                    TemplateId = request.TemplateId,
                    Title = request.Title,
                    Description = request.Description,
                    ReportDate = request.ReportDate ?? DateTime.Today,
                    Notes = request.Notes,
                    GPSLatitude = request.GPSLatitude,
                    GPSLongitude = request.GPSLongitude,
                    WeatherConditions = request.WeatherConditions,
                    Temperature = request.Temperature
                };

                var report = await _siteReportService.CreateReportAsync(createReport);
                return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Update an existing site report
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<SiteReportVM>> UpdateReport(int id, [FromBody] UpdateSiteReportVM updateReport)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != updateReport.Id)
                {
                    return BadRequest("ID mismatch");
                }

                var report = await _siteReportService.UpdateReportAsync(updateReport);
                if (report == null)
                {
                    return NotFound($"Report with ID {id} not found");
                }

                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Delete a site report
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReport(int id)
        {
            try
            {
                var result = await _siteReportService.DeleteReportAsync(id);
                if (!result)
                {
                    return NotFound($"Report with ID {id} not found");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Update report status
        /// </summary>
        [HttpPatch("{id}/status")]
        public async Task<ActionResult> UpdateReportStatus(int id, [FromBody] string status)
        {
            try
            {
                var result = await _siteReportService.UpdateReportStatusAsync(id, status);
                if (!result)
                {
                    return NotFound($"Report with ID {id} not found");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Complete a report
        /// </summary>
        [HttpPatch("{id}/complete")]
        public async Task<ActionResult> CompleteReport(int id)
        {
            try
            {
                var result = await _siteReportService.CompleteReportAsync(id);
                if (!result)
                {
                    return NotFound($"Report with ID {id} not found or cannot be completed");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get report statistics
        /// </summary>
        [HttpGet("statistics")]
        public async Task<ActionResult> GetReportStatistics()
        {
            try
            {
                var statistics = await _siteReportService.GetReportStatisticsAsync();
                return Ok(statistics);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get reports by user
        /// </summary>
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<SiteReportListVM>>> GetReportsByUser(int userId)
        {
            try
            {
                var reports = await _siteReportService.GetReportsByUserIdAsync(userId);
                return Ok(reports);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}