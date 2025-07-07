using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities.Estimates;

/// <summary>
/// Service catalog entity for standardized landscaping services
/// Builds on existing Platform-ERM architecture with tenant support
/// Aspire-inspired: Services contain predefined items and production rates
/// </summary>
public class ServiceCatalog : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // "Maintenance", "Construction", "Irrigation"
    public decimal DefaultMarkupPercentage { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; } = 0;
    
    // Service unit information
    public string Unit { get; set; } = string.Empty; // "sq ft", "linear ft", "each", "hour"
    public decimal DefaultQuantity { get; set; } = 1;
    
    // Cost structure
    public decimal BaseCost { get; set; } = 0;
    public decimal BasePrice { get; set; } = 0;
    
    // Navigation properties
    public virtual ICollection<ServiceItem> DefaultItems { get; set; } = new List<ServiceItem>();
    public virtual ICollection<EstimateService> EstimateServices { get; set; } = new List<EstimateService>();
}