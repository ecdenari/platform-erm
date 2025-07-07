using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities.Estimates;

/// <summary>
/// Individual item within an estimate service
/// Tracks materials, labor, equipment, and subcontractor costs
/// </summary>
public class EstimateServiceItem : BaseEntity
{
    public string EstimateServiceId { get; set; } = string.Empty;
    public string ItemCatalogId { get; set; } = string.Empty;
    
    public string Name { get; set; } = string.Empty; // Can override item catalog name
    public string Description { get; set; } = string.Empty;
    public int SortOrder { get; set; } = 0;
    
    // Quantity and units
    public decimal Quantity { get; set; } = 1;
    public string Unit { get; set; } = string.Empty;
    
    // Cost information
    public decimal UnitCost { get; set; } = 0;
    public decimal TotalCost { get; set; } = 0;
    
    // Pricing information
    public decimal UnitPrice { get; set; } = 0;
    public decimal TotalPrice { get; set; } = 0;
    public decimal MarkupPercentage { get; set; } = 0;
    
    // Production information
    public decimal? ProductionRate { get; set; } // Units per hour
    public decimal? EstimatedHours { get; set; } // Calculated from quantity and production rate
    
    // Flags
    public bool IsOptional { get; set; } = false;
    public bool IsUserAdded { get; set; } = false; // True if manually added vs from service catalog
    
    // Navigation properties
    public virtual EstimateService EstimateService { get; set; } = null!;
    public virtual ItemCatalog ItemCatalog { get; set; } = null!;
}