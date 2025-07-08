#nullable disable
using System.ComponentModel.DataAnnotations;
namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstFlowRate
    {
        [Key]
        public int Id { get; set; }
        public string FlowRateNames { get; set; }
    }
}
