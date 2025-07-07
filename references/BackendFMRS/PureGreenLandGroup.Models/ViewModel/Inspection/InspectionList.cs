namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class InspectionList
    {
        public int InspectionId { get; set; }
        public string? InspectionName { get; set; }
        public int ControllerId { get; set; }
        public string? ControllerName { get; set; }
        public int PropertyId { get; set; }
        public string? PropertyName { get; set; }

        public DateTime InspectionDate { get; set; }
        public bool IsInspectionDraft { get; set; }
        public bool IsInspectionCompleted { get; set; }
        public string? Inspector { get; set; }

    }
}
