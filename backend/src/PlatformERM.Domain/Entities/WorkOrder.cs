using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities;

public class WorkOrder : BaseEntity
{
    public string WorkOrderNumber { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Status { get; set; } = "New";
    public string Priority { get; set; } = "Medium";
    public DateTime? ScheduledDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public decimal? EstimatedCost { get; set; }
    public decimal? ActualCost { get; set; }
    public string? Notes { get; set; }
    
    // Foreign keys
    public int PropertyId { get; set; }
    public int? AssignedToContactId { get; set; }
    
    // Navigation properties
    public virtual Property Property { get; set; } = null!;
    public virtual Contact? AssignedToContact { get; set; }
}