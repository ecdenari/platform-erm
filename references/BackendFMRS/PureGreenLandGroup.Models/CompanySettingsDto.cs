using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models
{
    public class CompanySettingsDto
    {
        // Company Information
        [Required]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Phone { get; set; }

        [StringLength(255)]
        [EmailAddress]
        public string? Email { get; set; }

        [StringLength(500)]
        public string? Website { get; set; }

        public CompanyAddressDto? Address { get; set; }

        // Branding Settings
        public string? PrimaryLogoPath { get; set; }
        public string? LoginLogoPath { get; set; }
        public string? DocumentLogoPath { get; set; }

        [StringLength(7)] // #RRGGBB format
        public string? PrimaryColor { get; set; } = "#10b981";

        // Communication Settings
        [StringLength(255)]
        [EmailAddress]
        public string? SupportEmail { get; set; }

        [StringLength(255)]
        [EmailAddress]
        public string? NotificationEmail { get; set; }

        // Security Settings
        [Range(30, 1440)] // 30 minutes to 24 hours
        public int SessionTimeoutMinutes { get; set; } = 480; // 8 hours

        [Range(6, 50)]
        public int PasswordMinLength { get; set; } = 8;

        public bool RequireTwoFactor { get; set; } = false;

        // Document Settings
        public object? DocumentTemplateSettings { get; set; }
    }

    public class CompanyAddressDto
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zip { get; set; }
        public string? Country { get; set; } = "United States";
    }

    public class UpdateCompanySettingsRequest
    {
        [Required]
        public CompanySettingsDto Settings { get; set; } = new();
    }

    public class CompanySettingsResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public CompanySettingsDto? Data { get; set; }
    }
}