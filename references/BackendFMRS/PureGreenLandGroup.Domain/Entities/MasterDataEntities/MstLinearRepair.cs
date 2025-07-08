using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstLinearRepair
    {
        [Key]
        public int Id { get; set; }
        public string LinearRepairValue { get; set; }
    }
}
