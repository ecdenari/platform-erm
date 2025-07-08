using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.API.Models;
using PureGreenLandGroup.Models;
using PureGreenLandGroup.Services;
using System.Security.Claims;

namespace PureGreenLandGroup.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanySettingsController : ControllerBase
    {
        private readonly ICompanySettingsService _companySettingsService;
        private readonly IWebHostEnvironment _environment;

        public CompanySettingsController(ICompanySettingsService companySettingsService, IWebHostEnvironment environment)
        {
            _companySettingsService = companySettingsService;
            _environment = environment;
        }

        /// <summary>
        /// Get company settings for the current user's company
        /// </summary>
        [HttpGet]
        [AllowAnonymous] // Allow public access for logos on login page
        public async Task<ActionResult<CompanySettingsResponse>> GetCompanySettings()
        {
            try
            {
                // For now, we'll use the default company (single-tenant approach)
                // Later this can be extended to multi-tenant by getting company from user claims
                var company = await _companySettingsService.GetOrCreateDefaultCompanyAsync();
                var settings = await _companySettingsService.GetCompanySettingsAsync(company.Id);

                if (settings == null)
                {
                    return Ok(new CompanySettingsResponse
                    {
                        Success = false,
                        Message = "Company settings not found"
                    });
                }

                return Ok(new CompanySettingsResponse
                {
                    Success = true,
                    Message = "Company settings retrieved successfully",
                    Data = settings
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CompanySettingsResponse
                {
                    Success = false,
                    Message = $"Error retrieving company settings: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Update company settings (Admin only)
        /// </summary>
        [HttpPut]
        [Authorize(Roles = "Admin")] // Only admins can update company settings
        public async Task<ActionResult<CompanySettingsResponse>> UpdateCompanySettings([FromBody] UpdateCompanySettingsRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new CompanySettingsResponse
                    {
                        Success = false,
                        Message = "Invalid request data"
                    });
                }

                // Get current user ID from claims
                var userIdClaim = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid");
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized(new CompanySettingsResponse
                    {
                        Success = false,
                        Message = "User ID not found in token"
                    });
                }

                // Get or create default company
                var company = await _companySettingsService.GetOrCreateDefaultCompanyAsync();

                // Update settings
                var updatedSettings = await _companySettingsService.UpdateCompanySettingsAsync(
                    company.Id, 
                    request.Settings, 
                    userId);

                return Ok(new CompanySettingsResponse
                {
                    Success = true,
                    Message = "Company settings updated successfully",
                    Data = updatedSettings
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CompanySettingsResponse
                {
                    Success = false,
                    Message = $"Error updating company settings: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Upload company logo (Admin only)
        /// </summary>
        [HttpPost("upload-logo")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<LogoUploadResponse>> UploadLogo([FromForm] LogoUploadRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new LogoUploadResponse
                    {
                        Success = false,
                        Message = "Invalid request data"
                    });
                }

                // Validate logo type
                var validLogoTypes = new[] { "primary", "login", "document" };
                if (!validLogoTypes.Contains(request.LogoType.ToLower()))
                {
                    return BadRequest(new LogoUploadResponse
                    {
                        Success = false,
                        Message = "Invalid logo type. Must be 'primary', 'login', or 'document'"
                    });
                }

                // Get default company
                var company = await _companySettingsService.GetOrCreateDefaultCompanyAsync();

                // Save logo file
                using var fileStream = request.File.OpenReadStream();
                var logoPath = await _companySettingsService.SaveLogoFileAsync(
                    fileStream,
                    request.File.FileName,
                    request.LogoType.ToLower(), 
                    company.Id,
                    _environment.WebRootPath);

                // Get current user ID from claims
                var userIdClaim = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid");
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    userId = 1; // Default admin user
                }

                // Update the appropriate logo path in company settings
                var currentSettings = await _companySettingsService.GetCompanySettingsAsync(company.Id);
                if (currentSettings == null)
                {
                    // Initialize with default settings if none exist
                    currentSettings = new CompanySettingsDto
                    {
                        Name = company.Name,
                        Email = company.Email,
                        Phone = company.Phone,
                        Website = company.Website,
                        SessionTimeoutMinutes = 480,
                        PasswordMinLength = 8,
                        RequireTwoFactor = false,
                        PrimaryColor = "#10b981"
                    };
                }

                // Update the specific logo path based on type
                switch (request.LogoType.ToLower())
                {
                    case "primary":
                        currentSettings.PrimaryLogoPath = logoPath;
                        break;
                    case "login":
                        currentSettings.LoginLogoPath = logoPath;
                        break;
                    case "document":
                        currentSettings.DocumentLogoPath = logoPath;
                        break;
                }

                // Save the updated settings
                await _companySettingsService.UpdateCompanySettingsAsync(company.Id, currentSettings, userId);

                return Ok(new LogoUploadResponse
                {
                    Success = true,
                    Message = "Logo uploaded successfully",
                    LogoPath = logoPath
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new LogoUploadResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new LogoUploadResponse
                {
                    Success = false,
                    Message = $"Error uploading logo: {ex.Message}"
                });
            }
        }
    }
}