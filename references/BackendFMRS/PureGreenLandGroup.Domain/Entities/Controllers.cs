using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class Controllers
    {
        [Key]
        public int Id { get; set; }
        public string? ControllerName { get; set; }

        // Foreign key property
        public int PropertyId { get; set; }

        public int ManufacturerId { get; set; }
        public int ModelId { get; set; }
        public int WaterSourceId { get; set; }
        public string? Location { get; set; }
        public string? Notes { get; set; }
        public long Faults { get; set; }
        public long TotalInspectionIssues { get; set; }
        public bool IsRainSensor { get; set; }
       // public bool IsRainSesnorFunctioning { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        // Navigation property
        [ForeignKey("PropertyId")]
        public virtual Properties Property { get; set; }

        public int ControllerType { get; set; } //either conventional or 2 wire system
    }
}
