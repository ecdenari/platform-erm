using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities.Estimates;

/// <summary>
/// Service line item within an estimate
/// Each service will generate a corresponding work ticket when estimate is converted to contract
/// </summary>
public class EstimateService : BaseEntity
{
    public string EstimateId { get; set; } = string.Empty;
    public string? ServiceCatalogId { get; set; } // Optional - can be custom service
    
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int SortOrder { get; set; } = 0;
    
    // Quantity and pricing
    public decimal Quantity { get; set; } = 1;
    public string Unit { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; } = 0;
    public decimal TotalPrice { get; set; } = 0;
    
    // Cost information (for profitability analysis)
    public decimal TotalCost { get; set; } = 0;
    public decimal MarkupPercentage { get; set; } = 0;
    
    // Service details
    public string? ServiceCategory { get; set; }
    public DateTime? TargetStartDate { get; set; }
    public DateTime? TargetCompletionDate { get; set; }
    public decimal? EstimatedHours { get; set; }
    
    // Work ticket generation
    public bool GeneratesWorkTicket { get; set; } = true;
    public string? WorkTicketTemplate { get; set; } // Instructions for work ticket
    public string? SpecialInstructions { get; set; }
    
    // Navigation properties
    public virtual Estimate Estimate { get; set; } = null!;
    public virtual ServiceCatalog? ServiceCatalog { get; set; }
    public virtual ICollection<EstimateServiceItem> Items { get; set; } = new List<EstimateServiceItem>();
}