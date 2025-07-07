namespace PlatformERM.Domain.Enums;

/// <summary>
/// Enums for the Aspire workflow hierarchy
/// Property → Opportunity → Contract → Work Tickets
/// </summary>

public enum ItemType
{
    Material = 1,
    Labor = 2,
    Equipment = 3,
    Subcontractor = 4
}

public enum OpportunityStage
{
    Lead = 1,
    Qualified = 2,
    Proposal = 3,
    Negotiation = 4,
    Closed_Won = 5,
    Closed_Lost = 6,
    On_Hold = 7
}

public enum OpportunitySource
{
    Referral = 1,
    Website = 2,
    Phone_Call = 3,
    Walk_In = 4,
    Email = 5,
    Social_Media = 6,
    Advertisement = 7,
    Trade_Show = 8,
    Existing_Customer = 9,
    Cold_Call = 10
}

public enum EstimateStatus
{
    Draft = 1,
    Pending_Review = 2,
    Approved = 3,
    Presented = 4,
    Accepted = 5,
    Rejected = 6,
    Expired = 7,
    Converted_To_Contract = 8
}

public enum ContractStatus
{
    Active = 1,
    In_Progress = 2,
    Completed = 3,
    Cancelled = 4,
    On_Hold = 5,
    Pending_Payment = 6,
    Closed = 7
}

public enum WorkTicketStatus
{
    Scheduled = 1,
    Ready_To_Start = 2,
    In_Progress = 3,
    Paused = 4,
    Pending_Materials = 5,
    Pending_Approval = 6,
    Completed = 7,
    Cancelled = 8,
    On_Hold = 9,
    Inspection_Required = 10,
    Rework_Required = 11
}

public enum PaymentTerms
{
    Due_On_Receipt = 1,
    Net_15 = 2,
    Net_30 = 3,
    Net_45 = 4,
    Net_60 = 5,
    COD = 6,
    Advance_Payment = 7,
    Progress_Payments = 8
}

public enum Priority
{
    Low = 1,
    Medium = 2,
    High = 3,
    Urgent = 4,
    Emergency = 5
}