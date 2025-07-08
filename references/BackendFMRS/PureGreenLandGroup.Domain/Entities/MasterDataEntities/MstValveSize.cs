#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstValveSize
    {
        [Key]
        public int Id { get; set; }
        public string ValveSizenames { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
