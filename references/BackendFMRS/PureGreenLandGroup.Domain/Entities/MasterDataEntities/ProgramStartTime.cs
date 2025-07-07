#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class ProgramStartTime
    {
        [Key]
        public int Id { get; set; }
        public string Value { get; set; }
    }
}
