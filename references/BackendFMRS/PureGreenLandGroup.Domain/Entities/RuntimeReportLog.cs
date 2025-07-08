#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class RuntimeReportLog
    {
        [Key]
        public int Id { get; set; }

       // Foreign key property
        public int PropertyId { get; set; }

        // Foreign key property
        public int ControllerId { get; set; }

        public TimeSpan TotalRuntime { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property
        [ForeignKey("PropertyId")]
        public virtual Properties Properties { get; set; }

        // Navigation property
        [ForeignKey("ControllerId")]
        public virtual Controllers Controllers { get; set; }



    }
}
