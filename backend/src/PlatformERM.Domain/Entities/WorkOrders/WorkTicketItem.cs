using PlatformERM.Domain.Common;
using PlatformERM.Domain.Entities.Estimates;

namespace PlatformERM.Domain.Entities.WorkOrders;

/// <summary>
/// Individual item/material/labor used in a work ticket
/// Tracks estimated vs actual quantities and costs for granular profitability analysis
/// </summary>
public class WorkTicketItem : BaseEntity
{
    public string WorkTicketId { get; set; } = string.Empty;
    public string ItemCatalogId { get; set; } = string.Empty;
    
    public string Name { get; set; } = string.Empty; // Can override catalog name
    public string Description { get; set; } = string.Empty;
    public int SortOrder { get; set; } = 0;
    
    // Estimated quantities (from estimate)
    public decimal EstimatedQuantity { get; set; } = 0;
    public decimal EstimatedUnitCost { get; set; } = 0;
    public decimal EstimatedTotalCost { get; set; } = 0;
    
    // Actual quantities (tracked during work)
    public decimal ActualQuantity { get; set; } = 0;
    public decimal ActualUnitCost { get; set; } = 0;
    public decimal ActualTotalCost { get; set; } = 0;
    
    // Units and measurements
    public string Unit { get; set; } = string.Empty;
    
    // Usage tracking
    public DateTime? UsedDate { get; set; }
    public string? UsedById { get; set; } // User who used/applied the item
    public string UsageNotes { get; set; } = string.Empty;
    
    // Variance tracking
    public decimal QuantityVariance => ActualQuantity - EstimatedQuantity;
    public decimal CostVariance => ActualTotalCost - EstimatedTotalCost;
    public decimal QuantityVariancePercentage => EstimatedQuantity != 0 ? (QuantityVariance / EstimatedQuantity) * 100 : 0;
    public decimal CostVariancePercentage => EstimatedTotalCost != 0 ? (CostVariance / EstimatedTotalCost) * 100 : 0;
    
    // Procurement information
    public bool OrderRequired { get; set; } = false;
    public bool OrderPlaced { get; set; } = false;
    public DateTime? OrderDate { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string? Vendor { get; set; }
    public string? PurchaseOrderNumber { get; set; }
    
    // Navigation properties
    public virtual WorkTicket WorkTicket { get; set; } = null!;
    public virtual ItemCatalog ItemCatalog { get; set; } = null!;
}