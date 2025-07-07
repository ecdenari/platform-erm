using PlatformERM.Domain.Common;
using PlatformERM.Domain.Entities.Properties;
using PlatformERM.Domain.Entities.Estimates;
using PlatformERM.Domain.Enums;

namespace PlatformERM.Domain.Entities.WorkOrders;

/// <summary>
/// Contract entity representing approved work to be performed
/// Generated from approved estimates and contains work tickets
/// Aspire hierarchy: Contract → Work Tickets (vs single-tier Work Orders)
/// </summary>
public class Contract : BaseEntity
{
    public string? EstimateId { get; set; } // Source estimate
    public string PropertyId { get; set; } = string.Empty;
    
    public string ContractNumber { get; set; } = string.Empty; // CONT-2024-001
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ContractStatus Status { get; set; } = ContractStatus.Active;
    
    // Contract dates
    public DateTime ContractDate { get; set; } = DateTime.UtcNow;
    public DateTime StartDate { get; set; }
    public DateTime? CompletionDate { get; set; }
    public DateTime? ActualCompletionDate { get; set; }
    
    // Financial information
    public decimal ContractValue { get; set; } = 0;
    public decimal TaxAmount { get; set; } = 0;
    public decimal TotalValue { get; set; } = 0;
    
    // Payment information
    public PaymentTerms PaymentTerms { get; set; } = PaymentTerms.Net30;
    public decimal DownPaymentAmount { get; set; } = 0;
    public decimal DownPaymentPercentage { get; set; } = 0;
    public bool DownPaymentReceived { get; set; } = false;
    public DateTime? DownPaymentReceivedDate { get; set; }
    
    // Project management
    public string? ProjectManagerId { get; set; } // User responsible for project
    public string? SalespersonId { get; set; } // Original salesperson
    public Priority Priority { get; set; } = Priority.Medium;
    
    // Contract terms
    public string Terms { get; set; } = string.Empty;
    public string SpecialInstructions { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    
    // Progress tracking
    public decimal PercentComplete { get; set; } = 0;
    public decimal EstimatedHours { get; set; } = 0;
    public decimal ActualHours { get; set; } = 0;
    public decimal EstimatedCost { get; set; } = 0;
    public decimal ActualCost { get; set; } = 0;
    
    // Change orders
    public decimal ChangeOrderAmount { get; set; } = 0;
    public int ChangeOrderCount { get; set; } = 0;
    
    // Navigation properties
    public virtual Estimate? Estimate { get; set; }
    public virtual Property Property { get; set; } = null!;
    public virtual ICollection<WorkTicket> WorkTickets { get; set; } = new List<WorkTicket>();
    public virtual ICollection<ContractChangeOrder> ChangeOrders { get; set; } = new List<ContractChangeOrder>();
}