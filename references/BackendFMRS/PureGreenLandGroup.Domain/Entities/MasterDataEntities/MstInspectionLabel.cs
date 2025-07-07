#nullable disable
using System.ComponentModel.DataAnnotations;
namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstInspectionLabel
    {
        [Key]
        public int Id { get; set; }
        public string LabelName { get; set; }
    }
}
