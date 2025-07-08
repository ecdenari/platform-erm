using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.SiteManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SiteReportPhotoController : ControllerBase
    {
        private readonly ISiteReportPhotoService _photoService;
        private readonly IWebHostEnvironment _environment;

        public SiteReportPhotoController(ISiteReportPhotoService photoService, IWebHostEnvironment environment)
        {
            _photoService = photoService;
            _environment = environment;
        }

        /// <summary>
        /// Upload photo(s) for a site report
        /// </summary>
        [HttpPost("upload/{reportId}")]
        public async Task<ActionResult<List<PhotoUploadResponseVM>>> UploadPhotos(int reportId, [FromForm] IFormFileCollection files, [FromForm] string? metadata)
        {
            try
            {
                if (files == null || files.Count == 0)
                {
                    return BadRequest("No files uploaded");
                }

                var responses = new List<PhotoUploadResponseVM>();

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var response = await _photoService.UploadPhotoAsync(reportId, file, metadata);
                        responses.Add(response);
                    }
                }

                return Ok(responses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Upload photo for a specific section
        /// </summary>
        [HttpPost("upload/{reportId}/section/{sectionId}")]
        public async Task<ActionResult<List<PhotoUploadResponseVM>>> UploadSectionPhotos(int reportId, int sectionId, [FromForm] IFormFileCollection files, [FromForm] string? metadata)
        {
            try
            {
                if (files == null || files.Count == 0)
                {
                    return BadRequest("No files uploaded");
                }

                var responses = new List<PhotoUploadResponseVM>();

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var response = await _photoService.UploadSectionPhotoAsync(reportId, sectionId, file, metadata);
                        responses.Add(response);
                    }
                }

                return Ok(responses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get photos for a site report
        /// </summary>
        [HttpGet("report/{reportId}")]
        public async Task<ActionResult<List<SiteReportPhotoVM>>> GetReportPhotos(int reportId)
        {
            try
            {
                var photos = await _photoService.GetPhotosByReportIdAsync(reportId);
                return Ok(photos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get photos for a specific section
        /// </summary>
        [HttpGet("section/{sectionId}")]
        public async Task<ActionResult<List<SiteReportPhotoVM>>> GetSectionPhotos(int sectionId)
        {
            try
            {
                var photos = await _photoService.GetPhotosBySectionIdAsync(sectionId);
                return Ok(photos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get photo by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<SiteReportPhotoVM>> GetPhoto(int id)
        {
            try
            {
                var photo = await _photoService.GetPhotoByIdAsync(id);
                if (photo == null)
                {
                    return NotFound($"Photo with ID {id} not found");
                }
                return Ok(photo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Update photo metadata
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<SiteReportPhotoVM>> UpdatePhoto(int id, [FromBody] UpdateSiteReportPhotoVM updatePhoto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != updatePhoto.Id)
                {
                    return BadRequest("ID mismatch");
                }

                var photo = await _photoService.UpdatePhotoAsync(updatePhoto);
                if (photo == null)
                {
                    return NotFound($"Photo with ID {id} not found");
                }

                return Ok(photo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Delete a photo
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePhoto(int id)
        {
            try
            {
                var result = await _photoService.DeletePhotoAsync(id);
                if (!result)
                {
                    return NotFound($"Photo with ID {id} not found");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Update photo order
        /// </summary>
        [HttpPatch("reorder")]
        public async Task<ActionResult> ReorderPhotos([FromBody] List<int> photoIds)
        {
            try
            {
                var result = await _photoService.ReorderPhotosAsync(photoIds);
                if (!result)
                {
                    return BadRequest("Failed to reorder photos");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get photo file
        /// </summary>
        [HttpGet("{id}/file")]
        [AllowAnonymous] // Allow anonymous access for photo viewing
        public async Task<ActionResult> GetPhotoFile(int id)
        {
            try
            {
                var photo = await _photoService.GetPhotoByIdAsync(id);
                if (photo == null)
                {
                    return NotFound();
                }

                var filePath = Path.Combine(_environment.WebRootPath, photo.FilePath.TrimStart('/'));
                
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound("Photo file not found");
                }

                var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
                var mimeType = photo.MimeType ?? "application/octet-stream";
                
                return File(fileBytes, mimeType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}