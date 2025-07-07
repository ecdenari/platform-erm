#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstSlope
    {
        [Key]
        public int Id { get; set; }
        public string Slope { get; set; } 
    }
}
