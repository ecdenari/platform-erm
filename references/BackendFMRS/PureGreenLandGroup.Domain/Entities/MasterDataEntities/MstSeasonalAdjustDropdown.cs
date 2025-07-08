#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstSeasonalAdjustDropdown
    {
        [Key]
        public int Id { get; set; }
        public int Value { get; set; }
        public bool IsActive { get; set; }

    }
}
