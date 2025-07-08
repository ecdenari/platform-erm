namespace PureGreenLandGroup.Models.ViewModel.SiteManagement
{
    public class SiteReportIssueVM
    {
        public int Id { get; set; }
        public int ReportId { get; set; }
        public int? SectionId { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string IssueType { get; set; } = default!;
        public string Severity { get; set; } = default!;
        public string Status { get; set; } = default!;
        public string? Priority { get; set; }
        public string GPSLatitude { get; set; } = default!;
        public string GPSLongitude { get; set; } = default!;
        public string? GPSAccuracy { get; set; }
        public string? Resolution { get; set; }
        public string? ActionRequired { get; set; }
        public DateTime? TargetResolutionDate { get; set; }
        public DateTime? ActualResolutionDate { get; set; }
        public decimal? EstimatedCost { get; set; }
        public decimal? ActualCost { get; set; }
        public int? AssignedToUserID { get; set; }
        public string? AssignedToUserName { get; set; }
        public DateTime? AssignedDate { get; set; }
        public string ReportedByUserName { get; set; } = default!;
        public DateTime ReportedDate { get; set; }
        public string? ResolvedByUserName { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public bool RequiresFollowUp { get; set; }
        public DateTime? FollowUpDate { get; set; }
        public string? FollowUpNotes { get; set; }
        public string? WorkOrderNumber { get; set; }
        public string? ExternalTicketNumber { get; set; }
        
        // Additional context
        public string? SectionName { get; set; }
        public int PhotoCount { get; set; }
        public List<SiteReportPhotoVM> Photos { get; set; } = new();
    }

    public class SiteReportIssueListVM
    {
        public int Id { get; set; }
        public int ReportId { get; set; }
        public string Title { get; set; } = default!;
        public string IssueType { get; set; } = default!;
        public string Severity { get; set; } = default!;
        public string Status { get; set; } = default!;
        public string? Priority { get; set; }
        public string GPSLatitude { get; set; } = default!;
        public string GPSLongitude { get; set; } = default!;
        public DateTime? TargetResolutionDate { get; set; }
        public string? AssignedToUserName { get; set; }
        public string ReportedByUserName { get; set; } = default!;
        public DateTime ReportedDate { get; set; }
        public bool RequiresFollowUp { get; set; }
        
        // Report context
        public string ReportTitle { get; set; } = default!;
        public string PropertyName { get; set; } = default!;
        public int PhotoCount { get; set; }
    }

    public class CreateSiteReportIssueVM
    {
        public int ReportId { get; set; }
        public int? SectionId { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string IssueType { get; set; } = default!;
        public string Severity { get; set; } = "Medium";
        public string? Priority { get; set; }
        public string GPSLatitude { get; set; } = default!;
        public string GPSLongitude { get; set; } = default!;
        public string? GPSAccuracy { get; set; }
        public string? ActionRequired { get; set; }
        public DateTime? TargetResolutionDate { get; set; }
        public decimal? EstimatedCost { get; set; }
        public int? AssignedToUserID { get; set; }
        public bool RequiresFollowUp { get; set; }
        public DateTime? FollowUpDate { get; set; }
        public string? FollowUpNotes { get; set; }
        public string? WorkOrderNumber { get; set; }
        public string? ExternalTicketNumber { get; set; }
    }

    public class UpdateSiteReportIssueVM
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string IssueType { get; set; } = default!;
        public string Severity { get; set; } = default!;
        public string Status { get; set; } = default!;
        public string? Priority { get; set; }
        public string? Resolution { get; set; }
        public string? ActionRequired { get; set; }
        public DateTime? TargetResolutionDate { get; set; }
        public DateTime? ActualResolutionDate { get; set; }
        public decimal? EstimatedCost { get; set; }
        public decimal? ActualCost { get; set; }
        public int? AssignedToUserID { get; set; }
        public bool RequiresFollowUp { get; set; }
        public DateTime? FollowUpDate { get; set; }
        public string? FollowUpNotes { get; set; }
        public string? WorkOrderNumber { get; set; }
        public string? ExternalTicketNumber { get; set; }
    }

    public class SiteReportIssueFilterVM
    {
        public int? ReportId { get; set; }
        public string? Status { get; set; }
        public string? IssueType { get; set; }
        public string? Severity { get; set; }
        public int? AssignedToUserID { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? RequiresFollowUp { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SortBy { get; set; } = "ReportedDate";
        public string? SortDirection { get; set; } = "desc";
    }
}