#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class SeasionalAdjust
    {
        [Key]
        public int Id { get; set; }

        // Foreign key property
        public int ControllerId { get; set; }
        public int MonthId { get; set; }
        public int ProgramA { get; set; }
        public int ProgramB { get; set; }
        public int ProgramC { get; set; }
        public int ProgramD { get; set; }

        // Navigation property
        [ForeignKey("ControllerId")]
        public virtual Controllers Controllers { get; set; }
    }
}
