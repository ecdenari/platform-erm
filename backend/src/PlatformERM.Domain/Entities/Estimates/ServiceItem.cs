using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities.Estimates;

/// <summary>
/// Junction entity linking services to their component items
/// Defines default quantities and production rates for service estimation
/// </summary>
public class ServiceItem : BaseEntity
{
    public string ServiceCatalogId { get; set; } = string.Empty;
    public string ItemCatalogId { get; set; } = string.Empty;
    
    public decimal Quantity { get; set; } = 1;
    public string Unit { get; set; } = string.Empty; // "hours", "sq ft", "each"
    public decimal? ProductionRate { get; set; } // Optional override of item production rate
    public int SortOrder { get; set; } = 0;
    public bool IsOptional { get; set; } = false;
    
    // Cost overrides (optional - uses item catalog if not specified)
    public decimal? UnitCost { get; set; }
    public decimal? UnitPrice { get; set; }
    
    // Navigation properties
    public virtual ServiceCatalog ServiceCatalog { get; set; } = null!;
    public virtual ItemCatalog ItemCatalog { get; set; } = null!;
}