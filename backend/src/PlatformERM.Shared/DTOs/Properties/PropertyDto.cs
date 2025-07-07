
namespace PlatformERM.Shared.DTOs.Properties;

public enum PropertyType
{
    Residential,
    Commercial,
    Industrial,
    Mixed,
    Vacant
}

public enum PropertyStatus
{
    Active,
    Inactive,
    Pending,
    Sold,
    Archived
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

public class PropertyDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public AddressDto? Address { get; set; }
    public decimal? SquareFootage { get; set; }
    public decimal? AcreageSize { get; set; }
    public PropertyType PropertyType { get; set; } = PropertyType.Residential;
    public PropertyStatus Status { get; set; } = PropertyStatus.Active;
    public string? Notes { get; set; }
    public int CompanyId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string FullAddress { get; set; } = string.Empty;
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}

public class PropertyDetailDto : PropertyDto
{
    public List<PropertyContactDto> PropertyContacts { get; set; } = new();
    public List<WorkOrderSummaryDto> WorkOrders { get; set; } = new();
    public CompanyDto Company { get; set; } = new();
}

public class CreatePropertyDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public CreateAddressDto? Address { get; set; }
    public decimal? SquareFootage { get; set; }
    public decimal? AcreageSize { get; set; }
    public PropertyType PropertyType { get; set; } = PropertyType.Residential;
    public PropertyStatus Status { get; set; } = PropertyStatus.Active;
    public string? Notes { get; set; }
    public int CompanyId { get; set; }
}

public class UpdatePropertyDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public CreateAddressDto? Address { get; set; }
    public decimal? SquareFootage { get; set; }
    public decimal? AcreageSize { get; set; }
    public PropertyType PropertyType { get; set; } = PropertyType.Residential;
    public PropertyStatus Status { get; set; } = PropertyStatus.Active;
    public string? Notes { get; set; }
}

public class PublicPropertyDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public AddressDto? Address { get; set; }
    public PropertyType PropertyType { get; set; } = PropertyType.Residential;
    public PropertyStatus Status { get; set; } = PropertyStatus.Active;
    public string CompanyName { get; set; } = string.Empty;
    public string FullAddress { get; set; } = string.Empty;
}

public class PropertyContactDto
{
    public int Id { get; set; }
    public int PropertyId { get; set; }
    public int ContactId { get; set; }
    public ContactRole Role { get; set; } = ContactRole.General;
    public bool IsPrimary { get; set; }
    public string? Notes { get; set; }
    public ContactSummaryDto Contact { get; set; } = new();
}

public class ContactSummaryDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Title { get; set; }
}

public class WorkOrderSummaryDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? ScheduledDate { get; set; }
}

public class CompanyDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
}