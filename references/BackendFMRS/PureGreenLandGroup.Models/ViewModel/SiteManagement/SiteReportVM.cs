namespace PureGreenLandGroup.Models.ViewModel.SiteManagement
{
    public class SiteReportVM
    {
        public int Id { get; set; }
        public int PropertyID { get; set; }
        public int? TemplateId { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public string Status { get; set; } = default!;
        public DateTime ReportDate { get; set; }
        public int CreatedByUserID { get; set; }
        public string CreatedByUserName { get; set; } = default!;
        public DateTime CreatedDate { get; set; }
        public int? CompletedByUserID { get; set; }
        public string? CompletedByUserName { get; set; }
        public DateTime? CompletedDate { get; set; }
        public string? Notes { get; set; }
        public string? GPSLatitude { get; set; }
        public string? GPSLongitude { get; set; }
        public string? WeatherConditions { get; set; }
        public string? Temperature { get; set; }
        public decimal? OverallScore { get; set; }
        public decimal? MaxPossibleScore { get; set; }
        
        // Related data
        public string PropertyName { get; set; } = default!;
        public string PropertyAddress { get; set; } = default!;
        public string? TemplateName { get; set; }
        public int SectionCount { get; set; }
        public int PhotoCount { get; set; }
        public int IssueCount { get; set; }
        public List<SiteReportSectionVM> Sections { get; set; } = new();
        public List<SiteReportPhotoVM> Photos { get; set; } = new();
        public List<SiteReportIssueVM> Issues { get; set; } = new();
    }

    public class SiteReportListVM
    {
        public int Id { get; set; }
        public int PropertyID { get; set; }
        public string Title { get; set; } = default!;
        public string Status { get; set; } = default!;
        public DateTime ReportDate { get; set; }
        public string CreatedByUserName { get; set; } = default!;
        public DateTime CreatedDate { get; set; }
        public string? CompletedByUserName { get; set; }
        public DateTime? CompletedDate { get; set; }
        public decimal? OverallScore { get; set; }
        public decimal? MaxPossibleScore { get; set; }
        
        // Property info
        public string PropertyName { get; set; } = default!;
        public string PropertyAddress { get; set; } = default!;
        
        // Counts
        public int SectionCount { get; set; }
        public int PhotoCount { get; set; }
        public int IssueCount { get; set; }
    }

    public class CreateSiteReportVM
    {
        public int PropertyID { get; set; }
        public int? TemplateId { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public DateTime ReportDate { get; set; }
        public string? Notes { get; set; }
        public string? GPSLatitude { get; set; }
        public string? GPSLongitude { get; set; }
        public string? WeatherConditions { get; set; }
        public string? Temperature { get; set; }
    }

    public class UpdateSiteReportVM
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public string Status { get; set; } = default!;
        public DateTime ReportDate { get; set; }
        public string? Notes { get; set; }
        public string? GPSLatitude { get; set; }
        public string? GPSLongitude { get; set; }
        public string? WeatherConditions { get; set; }
        public string? Temperature { get; set; }
        public decimal? OverallScore { get; set; }
        public decimal? MaxPossibleScore { get; set; }
    }

    public class CreateReportFromTemplateVM
    {
        public int PropertyID { get; set; }
        public int TemplateId { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public DateTime? ReportDate { get; set; }
        public string? Notes { get; set; }
        public string? GPSLatitude { get; set; }
        public string? GPSLongitude { get; set; }
        public string? WeatherConditions { get; set; }
        public string? Temperature { get; set; }
    }

    public class SiteReportFilterVM
    {
        public int? PropertyID { get; set; }
        public string? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? CreatedByUserID { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SortBy { get; set; } = "ReportDate";
        public string? SortDirection { get; set; } = "desc";
    }
}