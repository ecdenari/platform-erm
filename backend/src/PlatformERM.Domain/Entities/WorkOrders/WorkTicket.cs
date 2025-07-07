using PlatformERM.Domain.Common;
using PlatformERM.Domain.Entities.Estimates;
using PlatformERM.Domain.Enums;

namespace PlatformERM.Domain.Entities.WorkOrders;

/// <summary>
/// Work Ticket entity - granular work items within a contract
/// Generated from EstimateService items when contract is created
/// Superior to single-tier work orders: enables service-level cost tracking
/// </summary>
public class WorkTicket : BaseEntity
{
    public string ContractId { get; set; } = string.Empty;
    public string? EstimateServiceId { get; set; } // Source service from estimate
    
    public string TicketNumber { get; set; } = string.Empty; // WT-CONT-001-01
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public WorkTicketStatus Status { get; set; } = WorkTicketStatus.Scheduled;
    public Priority Priority { get; set; } = Priority.Medium;
    
    // Scheduling
    public DateTime? ScheduledDate { get; set; }
    public DateTime? ScheduledStartTime { get; set; }
    public DateTime? ScheduledEndTime { get; set; }
    public decimal EstimatedDuration { get; set; } = 0; // Hours
    
    // Actual execution
    public DateTime? ActualStartDate { get; set; }
    public DateTime? ActualStartTime { get; set; }
    public DateTime? ActualEndDate { get; set; }
    public DateTime? ActualEndTime { get; set; }
    public decimal ActualDuration { get; set; } = 0; // Hours
    
    // Cost tracking (rolls up to contract)
    public decimal EstimatedCost { get; set; } = 0;
    public decimal ActualCost { get; set; } = 0;
    public decimal EstimatedHours { get; set; } = 0;
    public decimal ActualHours { get; set; } = 0;
    
    // Billing (if work ticket is billable separately)
    public bool IsBillable { get; set; } = true;
    public decimal BillableAmount { get; set; } = 0;
    public bool IsBilled { get; set; } = false;
    public DateTime? BilledDate { get; set; }
    
    // Work details
    public string ServiceCategory { get; set; } = string.Empty;
    public string WorkInstructions { get; set; } = string.Empty;
    public string SpecialInstructions { get; set; } = string.Empty;
    public string SafetyNotes { get; set; } = string.Empty;
    
    // Crew assignment
    public string? CrewLeaderId { get; set; } // User assigned as crew leader
    public string? AssignedTeamId { get; set; } // Team/crew assigned
    public int EstimatedCrewSize { get; set; } = 1;
    public int ActualCrewSize { get; set; } = 0;
    
    // Equipment and materials
    public bool RequiresEquipment { get; set; } = false;
    public string EquipmentNotes { get; set; } = string.Empty;
    public bool MaterialsOrdered { get; set; } = false;
    public DateTime? MaterialsOrderedDate { get; set; }
    
    // Quality and completion
    public bool RequiresInspection { get; set; } = false;
    public bool InspectionPassed { get; set; } = false;
    public DateTime? InspectionDate { get; set; }
    public string? InspectedById { get; set; }
    public string InspectionNotes { get; set; } = string.Empty;
    
    // Client communication
    public bool RequiresClientApproval { get; set; } = false;
    public bool ClientNotificationSent { get; set; } = false;
    public DateTime? ClientNotificationDate { get; set; }
    public bool ClientApprovalReceived { get; set; } = false;
    public DateTime? ClientApprovalDate { get; set; }
    
    // Progress tracking
    public decimal PercentComplete { get; set; } = 0;
    public string ProgressNotes { get; set; } = string.Empty;
    public DateTime? LastProgressUpdate { get; set; }
    
    // Completion information
    public string? CompletedById { get; set; } // User who marked as complete
    public string CompletionNotes { get; set; } = string.Empty;
    public bool CustomerSignoffRequired { get; set; } = false;
    public bool CustomerSignoffReceived { get; set; } = false;
    public DateTime? CustomerSignoffDate { get; set; }
    
    // Navigation properties
    public virtual Contract Contract { get; set; } = null!;
    public virtual EstimateService? EstimateService { get; set; }
    public virtual ICollection<WorkTicketItem> Items { get; set; } = new List<WorkTicketItem>();
    public virtual ICollection<WorkTicketTimeEntry> TimeEntries { get; set; } = new List<WorkTicketTimeEntry>();
    public virtual ICollection<WorkTicketNote> Notes { get; set; } = new List<WorkTicketNote>();
    public virtual ICollection<WorkTicketPhoto> Photos { get; set; } = new List<WorkTicketPhoto>();
}