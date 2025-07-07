#nullable disable
using System.ComponentModel.DataAnnotations;
namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstPlantType
    {
        [Key]
        public int Id { get; set; }
        public string PlantType { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
