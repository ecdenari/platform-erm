#nullable disable
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class ProgramRunTime
    {
        [Key]
        public int Id { get; set; }
        public string Value { get; set; }
        public bool IsActive { get; set; }

    }
}
