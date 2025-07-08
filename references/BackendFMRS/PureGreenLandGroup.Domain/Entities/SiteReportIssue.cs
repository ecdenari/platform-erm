using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class SiteReportIssue
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int ReportId { get; set; }
        
        public int? SectionId { get; set; } // Optional - issues can be general or section-specific
        
        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = default!;
        
        [Required]
        [MaxLength(2000)]
        public string Description { get; set; } = default!;
        
        [Required]
        [MaxLength(50)]
        public string IssueType { get; set; } = default!; // "Damage", "Maintenance", "Safety", "Quality", "Irrigation", "Landscape"
        
        [Required]
        [MaxLength(50)]
        public string Severity { get; set; } = "Medium"; // "Critical", "High", "Medium", "Low"
        
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Open"; // "Open", "InProgress", "Resolved", "Closed", "Deferred"
        
        [MaxLength(50)]
        public string? Priority { get; set; } // "Urgent", "High", "Medium", "Low"
        
        // GPS Location of the issue
        [Required]
        public string GPSLatitude { get; set; } = default!;
        
        [Required]
        public string GPSLongitude { get; set; } = default!;
        
        public string? GPSAccuracy { get; set; }
        
        // Issue resolution
        [MaxLength(2000)]
        public string? Resolution { get; set; }
        
        [MaxLength(2000)]
        public string? ActionRequired { get; set; }
        
        public DateTime? TargetResolutionDate { get; set; }
        
        public DateTime? ActualResolutionDate { get; set; }
        
        // Cost estimates
        public decimal? EstimatedCost { get; set; }
        public decimal? ActualCost { get; set; }
        
        // Assignment
        public int? AssignedToUserID { get; set; }
        
        [MaxLength(255)]
        public string? AssignedToUserName { get; set; }
        
        public DateTime? AssignedDate { get; set; }
        
        // Issue tracking
        [Required]
        public int ReportedByUserID { get; set; }
        
        [MaxLength(255)]
        public string ReportedByUserName { get; set; } = default!;
        
        [Required]
        public DateTime ReportedDate { get; set; }
        
        public int? ResolvedByUserID { get; set; }
        
        [MaxLength(255)]
        public string? ResolvedByUserName { get; set; }
        
        public DateTime? ResolvedDate { get; set; }
        
        public DateTime? ModifiedDate { get; set; }
        
        // Follow-up requirements
        public bool RequiresFollowUp { get; set; } = false;
        public DateTime? FollowUpDate { get; set; }
        
        [MaxLength(1000)]
        public string? FollowUpNotes { get; set; }
        
        // External references
        [MaxLength(100)]
        public string? WorkOrderNumber { get; set; }
        
        [MaxLength(100)]
        public string? ExternalTicketNumber { get; set; }
        
        // Navigation properties
        [ForeignKey("ReportId")]
        public virtual SiteReport Report { get; set; } = default!;
        
        [ForeignKey("SectionId")]
        public virtual SiteReportSection? Section { get; set; }
        
        public virtual ICollection<SiteReportPhoto> Photos { get; set; } = new List<SiteReportPhoto>();
    }
}