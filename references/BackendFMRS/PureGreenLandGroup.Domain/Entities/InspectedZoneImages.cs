#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PureGreenLandGroup.Domain.Entities
{
    public class InspectedZoneImages
    {
        [Key]
        public int Id { get; set; }

        // Foreign key property
        public int ZoneIssuesInspectionId { get; set; }
        public string ImagePath { get; set; }
        public string ImageCaption { get; set; }
        public int ImageIssueStatus { get; set; }

        // Navigation property
        [ForeignKey("ZoneIssuesInspectionId")]
        public virtual ZoneIssuesInspection ZoneIssuesInspection { get; set; }
    }
}
