#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstSoilType
    {
        [Key]
        public int Id { get; set; }
        public string SoilType { get; set; }
        public bool IsActive { get; set; }

    }
}
