namespace PureGreenLandGroup.Domain.Entities.SchedulerEntities
{
    public class SchedulerExceptions
    {
        public int Id { get; set; }
        public string? Message { get; set; }
        public string? StackTrace { get; set; }
        public string? Source { get; set; }
        public DateTime DateTime { get; set; }
    }
}
