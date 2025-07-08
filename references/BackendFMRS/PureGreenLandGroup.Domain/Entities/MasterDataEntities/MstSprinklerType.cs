#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstSprinklerType
    {
        [Key]
        public int Id { get; set; }
        public string SprinklerTypeName { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
