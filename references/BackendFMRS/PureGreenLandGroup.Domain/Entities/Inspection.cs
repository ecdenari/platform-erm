using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities
{
    public class Inspection
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Type { get; set; }
        public string? PriorEquipment { get; set; }
        public string? Compliant { get; set; }
        public string? RainSensor { get; set; }
        public string? WaterPressure { get; set; }
        public string? WaterPressureUnit { get; set; }
        public int ControllerId { get; set; }
        public DateTime InspectionDate { get; set; }
        public DateTime InspectionModifiedDate { get; set; }
        public int UserId { get; set; }
        public bool IsInspectionDraft { get; set; }
        public bool IsInspectionCompleted { get; set; }
        public bool IsActive { get; set; }
        public string? Comment { get; set; }
    }
}
