namespace PureGreenLandGroup.Models.ViewModel.SiteManagement
{
    public class SiteReportSectionVM
    {
        public int Id { get; set; }
        public int ReportId { get; set; }
        public string SectionName { get; set; } = default!;
        public string? SectionType { get; set; }
        public decimal? Score { get; set; }
        public decimal? MaxScore { get; set; }
        public string? ScoreType { get; set; }
        public string? ScoreLabel { get; set; }
        public string? Notes { get; set; }
        public string? Recommendations { get; set; }
        public string? Priority { get; set; }
        public string Status { get; set; } = default!;
        public int SectionOrder { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        
        public int PhotoCount { get; set; }
        public List<SiteReportPhotoVM> Photos { get; set; } = new();
    }

    public class CreateSiteReportSectionVM
    {
        public int ReportId { get; set; }
        public string SectionName { get; set; } = default!;
        public string? SectionType { get; set; }
        public decimal? Score { get; set; }
        public decimal? MaxScore { get; set; }
        public string? ScoreType { get; set; }
        public string? ScoreLabel { get; set; }
        public string? Notes { get; set; }
        public string? Recommendations { get; set; }
        public string? Priority { get; set; }
        public string Status { get; set; } = "Pending";
        public int SectionOrder { get; set; }
    }

    public class UpdateSiteReportSectionVM
    {
        public int Id { get; set; }
        public string SectionName { get; set; } = default!;
        public string? SectionType { get; set; }
        public decimal? Score { get; set; }
        public decimal? MaxScore { get; set; }
        public string? ScoreType { get; set; }
        public string? ScoreLabel { get; set; }
        public string? Notes { get; set; }
        public string? Recommendations { get; set; }
        public string? Priority { get; set; }
        public string Status { get; set; } = default!;
        public int SectionOrder { get; set; }
    }
}