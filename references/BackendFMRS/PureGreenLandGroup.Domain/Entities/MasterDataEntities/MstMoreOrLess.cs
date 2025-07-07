#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstMoreOrLess
    {
        [Key]
        public int Id { get; set; }
        public string MoreOrLessPercentage { get; set; }
    }
}
