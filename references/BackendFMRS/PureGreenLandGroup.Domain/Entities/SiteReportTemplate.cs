using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities
{
    public class SiteReportTemplate
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = default!;
        
        [MaxLength(1000)]
        public string? Description { get; set; }
        
        [Required]
        public string Sections { get; set; } = default!; // JSON string storing template sections
        
        [Required]
        public bool IsActive { get; set; } = true;
        
        [Required]
        public int CreatedByUserID { get; set; }
        
        [MaxLength(255)]
        public string CreatedByUserName { get; set; } = default!;
        
        [Required]
        public DateTime CreatedDate { get; set; }
        
        public int? ModifiedByUserID { get; set; }
        
        [MaxLength(255)]
        public string? ModifiedByUserName { get; set; }
        
        public DateTime? ModifiedDate { get; set; }
        
        [Required]
        public int Version { get; set; } = 1;
        
        // Navigation properties
        public virtual ICollection<SiteReport> SiteReports { get; set; } = new List<SiteReport>();
    }
}