using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities.WorkOrders;

/// <summary>
/// Time entry for tracking labor hours on work tickets
/// Enables detailed labor cost tracking and crew productivity analysis
/// </summary>
public class WorkTicketTimeEntry : BaseEntity
{
    public string WorkTicketId { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty; // Worker who performed the labor
    
    public DateTime Date { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public decimal Hours { get; set; } = 0;
    
    // Labor classification
    public string LaborCategory { get; set; } = string.Empty; // "Foreman", "Landscaper", "Equipment Operator"
    public decimal HourlyRate { get; set; } = 0;
    public decimal TotalCost { get; set; } = 0;
    
    // Work details
    public string WorkDescription { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    
    // Productivity tracking
    public decimal? QuantityCompleted { get; set; } // Units completed during this time
    public string? ProductivityUnit { get; set; } // "sq ft", "linear ft", "each"
    public decimal? ProductivityRate { get; set; } // Units per hour achieved
    
    // Break tracking
    public decimal BreakHours { get; set; } = 0;
    public decimal BillableHours { get; set; } = 0;
    
    // Equipment usage
    public string? EquipmentUsed { get; set; }
    public decimal EquipmentHours { get; set; } = 0;
    public decimal EquipmentCost { get; set; } = 0;
    
    // Approval workflow
    public bool IsApproved { get; set; } = false;
    public DateTime? ApprovedDate { get; set; }
    public string? ApprovedById { get; set; }
    
    // Navigation properties
    public virtual WorkTicket WorkTicket { get; set; } = null!;
}