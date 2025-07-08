using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class DraftIrrigationSettings
    {
        [Key]
        public int Id { get; set; }

        // Foreign key property
        public int ZoneIssuesInspectionId { get; set; }
        public string? ZoneDescription { get; set; }
        public int? SprinkleTypeId { get; set; }
        public int? ValveSizeId { get; set; }
        public int? PlantTypeId { get; set; }
        public int? SoilTypeId { get; set; }

        // Navigation property
        [ForeignKey("ZoneIssuesInspectionId")]
        public virtual ZoneIssuesInspection ZoneIssuesInspection { get; set; }
    }
}
