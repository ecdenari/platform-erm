using PlatformERM.Domain.Common;
using PlatformERM.Domain.Enums;

namespace PlatformERM.Domain.Entities.Estimates;

/// <summary>
/// Item catalog entity for materials, labor, equipment, and subcontractor services
/// Supports kit functionality with bundled items and production rates
/// </summary>
public class ItemCatalog : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty; // Stock keeping unit
    public ItemType Type { get; set; }
    public string Unit { get; set; } = string.Empty; // "each", "sq ft", "hour", "yard"
    public decimal Cost { get; set; } = 0;
    public decimal SellPrice { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public bool IsKit { get; set; } = false;
    
    // Labor-specific fields
    public decimal? LaborRate { get; set; } // Hourly rate for labor items
    public string? LaborCategory { get; set; } // "Foreman", "Landscaper", "Irrigation Tech"
    
    // Material-specific fields
    public string? Vendor { get; set; }
    public string? VendorSKU { get; set; }
    public decimal? MinimumOrderQuantity { get; set; }
    
    // Equipment-specific fields
    public decimal? HourlyRate { get; set; }
    public decimal? DailyRate { get; set; }
    
    // Kit production rates
    public decimal? ProductionRate { get; set; } // Units per hour
    public string? ProductionUnit { get; set; } // What unit the production rate applies to
    
    // Navigation properties
    public virtual ICollection<KitItem> KitItems { get; set; } = new List<KitItem>(); // If this is a kit
    public virtual ICollection<KitItem> ComponentOf { get; set; } = new List<KitItem>(); // Kits this item is part of
    public virtual ICollection<ServiceItem> ServiceItems { get; set; } = new List<ServiceItem>();
    public virtual ICollection<EstimateServiceItem> EstimateServiceItems { get; set; } = new List<EstimateServiceItem>();
}