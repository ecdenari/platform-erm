#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstWaterSource
    {
        [Key]
        public int Id { get; set; }
        public string WaterSourceName { get; set; }
    }
}
