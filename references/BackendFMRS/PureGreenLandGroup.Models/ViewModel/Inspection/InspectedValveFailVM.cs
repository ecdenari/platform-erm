namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class InspectedValveFailVM
    {
        public int Id { get; set; }
        public int ZoneIssuesInspectionId { get; set; }
        public int ManufacturerId { get; set; }
        public int ValveSizeId { get; set; }
        public bool IsValveIssue { get; set; }
        public bool IsDecoderIssue { get; set; }
        public bool IsSolenoidIssue { get; set; }
        public int DecoderModelId { get; set; }
    }
}
