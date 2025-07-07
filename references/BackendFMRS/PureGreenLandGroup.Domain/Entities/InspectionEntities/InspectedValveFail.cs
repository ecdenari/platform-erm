#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using PureGreenLandGroup.Domain.Entities.MasterDataEntities;

namespace PureGreenLandGroup.Domain.Entities.InspectionEntities
{
    public class InspectedValveFail
    {
        [Key]
        public int Id { get; set; }

        // Foreign key property
        public int ZoneIssuesInspectionId { get; set; }

        // Foreign key property
        public int ManufacturerId { get; set; }

        // Foreign key property
        public int ValveSizeId { get; set; }
        public bool IsValveIssue { get; set; }
        public bool IsDecoderIssue { get; set; }
        public bool IsSolenoidIssue { get; set; }
        public int DecoderModelId { get; set; }

        // Navigation property
        [ForeignKey("ManufacturerId")]
        public virtual MstManufacturer MstManufacturer { get; set; }

        // Navigation property
        [ForeignKey("ValveSizeId")]
        public virtual MstValveSize MstValveSize { get; set; }

        // Navigation property
        [ForeignKey("ZoneIssuesInspectionId")]
        public virtual ZoneIssuesInspection ZoneIssuesInspection { get; set; }
    }
}
