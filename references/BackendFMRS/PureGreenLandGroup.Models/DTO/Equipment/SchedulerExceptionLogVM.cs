namespace PureGreenLandGroup.Models.DTO.Equipment
{
    public class SchedulerExceptionLogVM
    {
        public string? Message { get; set; }    
        public string? StackTrace { get; set; }
        public string? Source { get; set; }
        public DateTime DateTime { get; set; }
    }
}
