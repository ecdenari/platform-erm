using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class CreateInspectionViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Title is required!")]
        public string? Title { get; set; }
        public int Type { get; set; }
        public string? PriorEquipment { get; set; }
        public string? Compliant { get; set; }
        public string? RainSensor { get; set; }
        public string? WaterPressure { get; set; }
        public string? WaterPressureUnit { get; set; }
        public int ControllerId { get; set; }
        public DateTime? InspectionDate { get; set; }
        public DateTime? InspectionModifiedDate { get; set; }
        public int UserId { get; set; }
        public bool IsInspectionDraft { get; set; }
        public bool IsInspectionCompleted { get; set; }
        public bool IsActive { get; set; }
        public string? Comment { get; set; }

        public IList<ZoneIssuesInspectionViewModel>? ZoneIssuesInspectionViewModel { get; set; }
    }
}
