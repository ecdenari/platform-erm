using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class InspectedZoneBrokenMain
    {
        [Key]
        public int Id { get; set; }

        // Foreign key property
        public int ZoneIssuesInspectionId { get; set; }
        public string? Value { get; set; }

        // Navigation property
        [ForeignKey("ZoneIssuesInspectionId")]
        public virtual ZoneIssuesInspection ZoneIssuesInspection { get; set; }
    }
}
