namespace PureGreenLandGroup.Models.ViewModel.SiteManagement
{
    public class SiteReportTemplateVM
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public string Sections { get; set; } = default!; // JSON string
        public bool IsActive { get; set; }
        public int CreatedByUserID { get; set; }
        public string CreatedByUserName { get; set; } = default!;
        public DateTime CreatedDate { get; set; }
        public int? ModifiedByUserID { get; set; }
        public string? ModifiedByUserName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int Version { get; set; }
    }

    public class CreateSiteReportTemplateVM
    {
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public string Sections { get; set; } = default!; // JSON string
        public bool IsActive { get; set; } = true;
    }

    public class UpdateSiteReportTemplateVM
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public string Sections { get; set; } = default!; // JSON string
        public bool IsActive { get; set; }
    }

    public class SiteReportTemplateListVM
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public bool IsActive { get; set; }
        public string CreatedByUserName { get; set; } = default!;
        public DateTime CreatedDate { get; set; }
        public int Version { get; set; }
        public int ReportsCount { get; set; } // Number of reports using this template
    }
}