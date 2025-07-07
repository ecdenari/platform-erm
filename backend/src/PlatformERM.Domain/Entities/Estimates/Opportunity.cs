using PlatformERM.Domain.Common;
using PlatformERM.Domain.Entities.Properties;
using PlatformERM.Domain.Enums;

namespace PlatformERM.Domain.Entities.Estimates;

/// <summary>
/// Opportunity entity representing potential business/projects
/// Links to Property and generates Estimates
/// Aspire workflow: Property → Opportunity → Contract → Work Tickets
/// </summary>
public class Opportunity : BaseEntity
{
    public string PropertyId { get; set; } = string.Empty;
    
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public OpportunityStage Stage { get; set; } = OpportunityStage.Lead;
    public OpportunitySource Source { get; set; } = OpportunitySource.Referral;
    
    // Important dates
    public DateTime? ProposalDate { get; set; }
    public DateTime? CloseDate { get; set; }
    public DateTime? FollowUpDate { get; set; }
    
    // Financial information
    public decimal EstimatedValue { get; set; } = 0;
    public decimal Probability { get; set; } = 50; // Percentage 0-100
    
    // Sales information
    public string? SalespersonId { get; set; } // Reference to user/employee
    public string? LeadSource { get; set; }
    public string Notes { get; set; } = string.Empty;
    
    // Project details
    public DateTime? DesiredStartDate { get; set; }
    public DateTime? DesiredCompletionDate { get; set; }
    public string ProjectScope { get; set; } = string.Empty;
    
    // Status tracking
    public bool IsActive { get; set; } = true;
    public DateTime? WonDate { get; set; }
    public DateTime? LostDate { get; set; }
    public string? LostReason { get; set; }
    
    // Navigation properties
    public virtual Property Property { get; set; } = null!;
    public virtual ICollection<Estimate> Estimates { get; set; } = new List<Estimate>();
}