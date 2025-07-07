using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities;

public class Contact : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? MobilePhone { get; set; }
    public string? Title { get; set; }
    public string? Department { get; set; }
    public string ContactType { get; set; } = "General";
    public bool IsPrimary { get; set; } = false;
    public string? Notes { get; set; }
    
    // Foreign keys
    public int? CompanyId { get; set; }
    
    // Navigation properties
    public virtual Company? Company { get; set; }
    
    // Computed property
    public string FullName => $"{FirstName} {LastName}".Trim();
}