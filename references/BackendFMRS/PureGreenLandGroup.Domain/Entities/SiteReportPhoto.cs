using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class SiteReportPhoto
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int ReportId { get; set; }
        
        public int? SectionId { get; set; } // Optional - photos can be general or section-specific
        
        [Required]
        [MaxLength(500)]
        public string FileName { get; set; } = default!;
        
        [Required]
        [MaxLength(1000)]
        public string FilePath { get; set; } = default!;
        
        [MaxLength(100)]
        public string? FileSize { get; set; } // e.g., "2.5MB"
        
        [MaxLength(50)]
        public string? MimeType { get; set; } // e.g., "image/jpeg"
        
        [MaxLength(500)]
        public string? Caption { get; set; }
        
        [MaxLength(1000)]
        public string? Description { get; set; }
        
        // GPS Location where photo was taken
        public string? GPSLatitude { get; set; }
        public string? GPSLongitude { get; set; }
        public string? GPSAccuracy { get; set; } // GPS accuracy in meters
        
        // Photo metadata
        public DateTime? PhotoTakenDate { get; set; }
        
        [MaxLength(100)]
        public string? DeviceInfo { get; set; } // Camera/device info
        
        // Photo categorization
        [MaxLength(100)]
        public string? PhotoType { get; set; } // "Before", "After", "Issue", "General", "Progress"
        
        [MaxLength(50)]
        public string? IssueType { get; set; } // "Damage", "Maintenance", "Safety", "Quality"
        
        // Photo annotations
        [MaxLength(2000)]
        public string? Annotations { get; set; } // JSON string for photo markup/annotations
        
        [Required]
        public int UploadedByUserID { get; set; }
        
        [MaxLength(255)]
        public string UploadedByUserName { get; set; } = default!;
        
        [Required]
        public DateTime UploadedDate { get; set; }
        
        public DateTime? ModifiedDate { get; set; }
        
        // Display order within section/report
        public int PhotoOrder { get; set; }
        
        [Required]
        public bool IsActive { get; set; } = true;
        
        // Navigation properties
        [ForeignKey("ReportId")]
        public virtual SiteReport Report { get; set; } = default!;
        
        [ForeignKey("SectionId")]
        public virtual SiteReportSection? Section { get; set; }
    }
}