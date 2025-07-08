using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class CompanySettings
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CompanyId { get; set; }

        // Branding Settings
        [StringLength(500)]
        public string? PrimaryLogoPath { get; set; }

        [StringLength(500)]
        public string? LoginLogoPath { get; set; }

        [StringLength(500)]
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

        // Document Settings (JSON for flexibility)
        [Column(TypeName = "nvarchar(max)")]
        public string? DocumentTemplateSettings { get; set; }

        // Audit
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int UpdatedByUserId { get; set; }

        // Navigation properties
        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; } = null!;
    }
}