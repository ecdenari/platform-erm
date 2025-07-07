namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class InspectedZoneImagesViewModel
    {
        public int Id { get; set; }
        public int ZoneIssuesInspectionId { get; set; }
        public string? ImagePath { get; set; }
        public string? ImageCaption { get; set; }
        public int ImageIssueStatus { get; set; }
        public string? ImageName { get; set; }
        public string? ImageSrcPath { get; set; }
    }
}
