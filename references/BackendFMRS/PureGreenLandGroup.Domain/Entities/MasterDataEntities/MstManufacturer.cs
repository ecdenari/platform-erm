#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstManufacturer
    {
        [Key]
        public int Id { get; set; }
        public string ManufacturerName { get; set; }
        public bool IsActive { get; set; }
    }
}
