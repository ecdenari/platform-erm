using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class SiteReport
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int PropertyID { get; set; } // Foreign key to Aspire Property
        
        public int? TemplateId { get; set; } // Optional - reports can use templates or be freeform
        
        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = default!;
        
        [MaxLength(1000)]
        public string? Description { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, InReview, Complete, Archived
        
        [Required]
        public DateTime ReportDate { get; set; }
        
        [Required]
        public int CreatedByUserID { get; set; }
        
        [MaxLength(255)]
        public string CreatedByUserName { get; set; } = default!;
        
        [Required]
        public DateTime CreatedDate { get; set; }
        
        public int? CompletedByUserID { get; set; }
        
        [MaxLength(255)]
        public string? CompletedByUserName { get; set; }
        
        public DateTime? CompletedDate { get; set; }
        
        public int? ModifiedByUserID { get; set; }
        
        [MaxLength(255)]
        public string? ModifiedByUserName { get; set; }
        
        public DateTime? ModifiedDate { get; set; }
        
        [MaxLength(1000)]
        public string? Notes { get; set; }
        
        // GPS Location (if report has a specific location within property)
        public string? GPSLatitude { get; set; }
        public string? GPSLongitude { get; set; }
        
        // Weather/Environmental conditions
        [MaxLength(100)]
        public string? WeatherConditions { get; set; }
        
        [MaxLength(50)]
        public string? Temperature { get; set; }
        
        // Overall scores (calculated from sections)
        public decimal? OverallScore { get; set; }
        public decimal? MaxPossibleScore { get; set; }
        
        // Navigation properties
        [ForeignKey("PropertyID")]
        public virtual Properties Property { get; set; } = default!;
        
        [ForeignKey("TemplateId")]
        public virtual SiteReportTemplate? Template { get; set; }
        
        public virtual ICollection<SiteReportSection> Sections { get; set; } = new List<SiteReportSection>();
        public virtual ICollection<SiteReportPhoto> Photos { get; set; } = new List<SiteReportPhoto>();
        public virtual ICollection<SiteReportIssue> Issues { get; set; } = new List<SiteReportIssue>();
    }
}