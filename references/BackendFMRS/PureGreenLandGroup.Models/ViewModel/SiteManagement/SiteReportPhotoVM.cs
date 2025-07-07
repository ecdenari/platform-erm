namespace PureGreenLandGroup.Models.ViewModel.SiteManagement
{
    public class SiteReportPhotoVM
    {
        public int Id { get; set; }
        public int ReportId { get; set; }
        public int? SectionId { get; set; }
        public string FileName { get; set; } = default!;
        public string FilePath { get; set; } = default!;
        public string? FileSize { get; set; }
        public string? MimeType { get; set; }
        public string? Caption { get; set; }
        public string? Description { get; set; }
        public string? GPSLatitude { get; set; }
        public string? GPSLongitude { get; set; }
        public string? GPSAccuracy { get; set; }
        public DateTime? PhotoTakenDate { get; set; }
        public string? DeviceInfo { get; set; }
        public string? PhotoType { get; set; }
        public string? IssueType { get; set; }
        public string? Annotations { get; set; }
        public string UploadedByUserName { get; set; } = default!;
        public DateTime UploadedDate { get; set; }
        public int PhotoOrder { get; set; }
        public bool IsActive { get; set; }
        
        // Additional context
        public string? SectionName { get; set; }
        public string PhotoUrl { get; set; } = default!; // Full URL for display
    }

    public class CreateSiteReportPhotoVM
    {
        public int ReportId { get; set; }
        public int? SectionId { get; set; }
        public string FileName { get; set; } = default!;
        public string? Caption { get; set; }
        public string? Description { get; set; }
        public string? GPSLatitude { get; set; }
        public string? GPSLongitude { get; set; }
        public string? GPSAccuracy { get; set; }
        public DateTime? PhotoTakenDate { get; set; }
        public string? DeviceInfo { get; set; }
        public string? PhotoType { get; set; }
        public string? IssueType { get; set; }
        public string? Annotations { get; set; }
        public int PhotoOrder { get; set; }
    }

    public class UpdateSiteReportPhotoVM
    {
        public int Id { get; set; }
        public string? Caption { get; set; }
        public string? Description { get; set; }
        public string? PhotoType { get; set; }
        public string? IssueType { get; set; }
        public string? Annotations { get; set; }
        public int PhotoOrder { get; set; }
        public bool IsActive { get; set; }
    }

    public class PhotoUploadResponseVM
    {
        public int Id { get; set; }
        public string FileName { get; set; } = default!;
        public string FilePath { get; set; } = default!;
        public string PhotoUrl { get; set; } = default!;
        public string? FileSize { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}