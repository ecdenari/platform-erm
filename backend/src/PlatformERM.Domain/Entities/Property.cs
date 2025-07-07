using PlatformERM.Domain.Common;
using PlatformERM.Domain.ValueObjects;

namespace PlatformERM.Domain.Entities;

public class Property : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Address? Address { get; set; }
    public decimal? SquareFootage { get; set; }
    public decimal? AcreageSize { get; set; }
    public PropertyType PropertyType { get; set; } = PropertyType.Residential;
    public PropertyStatus Status { get; set; } = PropertyStatus.Active;
    public string? Notes { get; set; }
    
    // Foreign keys
    public int CompanyId { get; set; }
    
    // Navigation properties
    public virtual Company Company { get; set; } = null!;
    public virtual ICollection<PropertyContact> PropertyContacts { get; set; } = new List<PropertyContact>();
    public virtual ICollection<WorkOrder> WorkOrders { get; set; } = new List<WorkOrder>();
    
    // Computed properties
    public string FullAddress => Address?.GetFullAddress() ?? string.Empty;
    public (double? Latitude, double? Longitude) Coordinates => Address?.GetCoordinates() ?? (null, null);
}

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