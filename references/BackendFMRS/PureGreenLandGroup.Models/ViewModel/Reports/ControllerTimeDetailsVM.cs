namespace PureGreenLandGroup.Models.ViewModel.Reports
{
    public class ControllerTimeDetailsVM
    {
        public int Id { get; set; }
        public string? ControllerName { get; set; }
        public string? PropertyName { get; set; }
        public string? Address { get; set; }
        public string? ModelName { get; set; }
        public string? ManufacturerName { get; set; }
        public string? ProgramTimer1 { get; set; }
        public int TotalRuntimeInMinutes { get; set; }
        public int TotalWeeklyRuntime { get; set; }
    }
}
