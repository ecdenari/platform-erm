#nullable disable
using System.ComponentModel.DataAnnotations;
namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MonthsOfYear
    {
        [Key]
        public int MonthId { get; set; }
        public string MonthName { get; set; }
    }
}
