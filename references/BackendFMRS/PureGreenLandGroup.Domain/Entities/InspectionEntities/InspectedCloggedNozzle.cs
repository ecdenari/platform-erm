#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities.InspectionEntities
{
    public class InspectedCloggedNozzle
    {
        [Key]
        public int Id { get; set; }

        // Foreign key property
        public int ZoneIssuesInspectionId { get; set; }

        public int MrpNozzle { get; set; }
        public int VanNozzle { get; set; }

        // Navigation property
        [ForeignKey("ZoneIssuesInspectionId")]
        public virtual ZoneIssuesInspection ZoneIssuesInspection { get; set; }
    }
}
