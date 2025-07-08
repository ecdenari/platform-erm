namespace PureGreenLandGroup.Models.DTO.SP_Models
{
    public class ControllerListVM
    {
        public int Id { get; set; }
        public string? ControllerName { get; set; }
        public int ZoneCount { get; set; }
        public string? PropertyName { get; set; }
        public string? Address { get; set; }
        public string? ModelName { get; set; }
        public string? ManufacturerName { get; set; }
        public bool IsRainSensor { get; set; }
        public int FaultCount { get; set; }
        public int TotalInspectionIssues { get; set; }
    }
}
