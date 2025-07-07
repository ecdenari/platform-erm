using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class SiteReportSection
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int ReportId { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string SectionName { get; set; } = default!;
        
        [MaxLength(100)]
        public string? SectionType { get; set; } // e.g., "Turf", "Irrigation", "Landscape", "Maintenance"
        
        // Scoring - flexible to support different scoring types
        public decimal? Score { get; set; }
        public decimal? MaxScore { get; set; }
        
        [MaxLength(50)]
        public string? ScoreType { get; set; } // "Numerical", "PassFail", "Percentage", "None"
        
        [MaxLength(50)]
        public string? ScoreLabel { get; set; } // "Pass", "Fail", "Good", "Poor", etc.
        
        [MaxLength(2000)]
        public string? Notes { get; set; }
        
        [MaxLength(2000)]
        public string? Recommendations { get; set; }
        
        // Importance/Priority
        [MaxLength(50)]
        public string? Priority { get; set; } // "Critical", "High", "Medium", "Low"
        
        // Section status
        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // "Pending", "InProgress", "Complete", "RequiresAttention"
        
        // Order for display
        public int SectionOrder { get; set; }
        
        [Required]
        public DateTime CreatedDate { get; set; }
        
        public DateTime? ModifiedDate { get; set; }
        
        // Navigation properties
        [ForeignKey("ReportId")]
        public virtual SiteReport Report { get; set; } = default!;
        
        public virtual ICollection<SiteReportPhoto> Photos { get; set; } = new List<SiteReportPhoto>();
    }
}