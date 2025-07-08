#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstBrokenLateralDropdown
    {
        [Key]
        public int Id { get; set; }
        public string Value { get; set; }
        public bool IsBrokenLateralValue { get; set; }
    }
}
