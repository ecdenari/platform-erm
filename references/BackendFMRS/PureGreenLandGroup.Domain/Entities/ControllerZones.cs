using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class ControllerZones
    {
        [Key]
        public int Id { get; set; }

        // Foreign key property
        public int? ControllerId { get; set; }
        public string? ZoneLocationName { get; set; }
        public string? Description { get; set; }
        public string? ProgramA { get; set; }
        public string? ProgramB { get; set; }
        public string? ProgramC { get; set; }
        public string? ProgramD { get; set; }
        public int? ValveSizeId { get; set; }
        public int? ManufacturerId { get; set; }
        public int? FlowRate { get; set; }
        public int? SprinkleTypeId { get; set; }
        public int? PlantTypeId { get; set; }
        public int? SoilTypeId { get; set; }
        //public int? SlopeId { get; set; }
        //public int? MoreLessId { get; set; }
        public bool IsDeleted { get; set; }

        // Navigation property
        [ForeignKey("ControllerId")]
        public virtual Controllers Controllers { get; set; }

        // Navigation property
        [ForeignKey("ManufacturerId")]
        public virtual MstManufacturer MstManufacturer { get; set; }
    }
}
