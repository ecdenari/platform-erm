namespace PureGreenLandGroup.Models.ViewModel.Properties
{
    public class PropertiesListVM
    {
        public int Id { get; set; }
        public string? PropertyName { get; set; }
        public string? Address { get; set; }
        public int ControllerCount { get; set; }
        public long Faults { get; set; }
        public long TotalInspectionIssues { get; set; }
        public bool IsActive { get; set; }
        
        // Additional properties for Site Management module
        public string? PropertyStatusName { get; set; }
        public string? PropertyType { get; set; }
        public string? BranchName { get; set; }
        public string? AccountOwnerContactName { get; set; }
        public string? ProductionManagerContactName { get; set; }
    }
}
