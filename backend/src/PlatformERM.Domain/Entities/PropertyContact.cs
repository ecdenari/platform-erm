using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities;

public class PropertyContact : BaseEntity
{
    public int PropertyId { get; set; }
    public int ContactId { get; set; }
    public ContactRole Role { get; set; } = ContactRole.General;
    public bool IsPrimary { get; set; } = false;
    public string? Notes { get; set; }
    
    // Navigation properties
    public virtual Property Property { get; set; } = null!;
    public virtual Contact Contact { get; set; } = null!;
}

public enum ContactRole
{
    General,
    PropertyManager,
    Owner,
    Tenant,
    MaintenanceContact,
    BillingContact,
    EmergencyContact,
    Supervisor,
    Contractor
}