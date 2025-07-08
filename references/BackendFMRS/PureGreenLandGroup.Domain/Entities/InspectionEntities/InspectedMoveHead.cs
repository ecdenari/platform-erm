#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities.InspectionEntities
{
    public class InspectedMoveHead
    {
        [Key]
        public int Id { get; set; }

        // Foreign key property
        public int ZoneIssuesInspectionId { get; set; }

        public int MoveHeadId { get; set; }//only two value are there for move head [Move<3, Move>3]

        // Navigation property
        [ForeignKey("ZoneIssuesInspectionId")]
        public virtual ZoneIssuesInspection ZoneIssuesInspection { get; set; }
    }
}
