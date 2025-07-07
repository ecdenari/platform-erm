using PlatformERM.Domain.Common;
using PlatformERM.Domain.Enums;

namespace PlatformERM.Domain.Entities.Estimates;

/// <summary>
/// Estimate entity for project pricing and scope definition
/// Contains services which generate work tickets when converted to contract
/// </summary>
public class Estimate : BaseEntity
{
    public string OpportunityId { get; set; } = string.Empty;
    
    public string Name { get; set; } = string.Empty;
    public string EstimateNumber { get; set; } = string.Empty; // EST-2024-001
    public EstimateStatus Status { get; set; } = EstimateStatus.Draft;
    
    // Dates
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime? PresentedDate { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public DateTime? ExpirationDate { get; set; }
    
    // Financial totals (calculated from services)
    public decimal SubtotalAmount { get; set; } = 0;
    public decimal TaxAmount { get; set; } = 0;
    public decimal TotalAmount { get; set; } = 0;
    public decimal DiscountAmount { get; set; } = 0;
    public decimal DiscountPercentage { get; set; } = 0;
    
    // Project information
    public string ProjectDescription { get; set; } = string.Empty;
    public string Terms { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    
    // Approval workflow
    public string? ApprovedById { get; set; } // User who approved
    public string? RejectedById { get; set; } // User who rejected
    public string? RejectionReason { get; set; }
    
    // Contract generation
    public bool IsConvertedToContract { get; set; } = false;
    public DateTime? ConvertedToContractDate { get; set; }
    public string? ContractId { get; set; } // Reference to generated contract
    
    // Navigation properties
    public virtual Opportunity Opportunity { get; set; } = null!;
    public virtual ICollection<EstimateService> Services { get; set; } = new List<EstimateService>();
}