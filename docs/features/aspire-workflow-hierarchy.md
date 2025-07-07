# Aspire Workflow Hierarchy Implementation

## Overview

Platform-ERM implements the superior Aspire workflow hierarchy that provides granular control and cost tracking compared to LMN's single-tier system. This document defines the complete business process workflow and technical implementation.

**Reference Source**: https://github.com/ecdenari/software-references/aspire/

## Confirmed Workflow Hierarchy

```
Property → Opportunity → Contract/Project → Work Tickets
                ↓
            Estimate Creation
                ↓
          Service → Work Ticket Generation
```

### Business Process Flow

#### 1. Admin Setup Phase

**Service Catalog Management**
- Admins create standardized services (Lawn Maintenance, Tree Removal, Irrigation Install, etc.)
- Each service contains predefined items and production rates
- Services are reusable across multiple estimates

**Items Catalog Management**
- **Materials**: Physical items (mulch, fertilizer, plants, pipes)
- **Labor**: Hourly rates by crew type (foreman, landscaper, irrigation tech)
- **Kits**: Bundled items with production rates (sprinkler head kit, planting kit)
- **Subcontractor Services**: External services with markup

#### 2. Estimate Creation Process

**Property Selection**
- Select existing property or create new property record
- Property contains client contact information and site details

**Opportunity Creation**
- Create opportunity linked to property
- Define project scope and timeline
- Set opportunity stage (Lead, Qualified, Proposal, etc.)

**Service-Based Estimating**
- Add services from catalog to estimate
- Each service automatically includes its predefined items
- Adjust quantities and rates as needed
- Services maintain cost structure: Materials + Labor + Equipment + Markup

**Cost Calculation**
- Item-level costing rolls up to service level
- Service-level costs roll up to estimate total
- Profit margins calculated at each level

#### 3. Work Generation Process

**Contract/Project Creation**
- Convert approved estimate to contract/project
- Inherit all estimate details and pricing
- Set project start date and milestones

**Automatic Work Ticket Generation**
- Each service in the contract generates corresponding work ticket
- Work tickets inherit service scope, items, and costs
- Maintain traceability from ticket back to original service

**Resource Allocation**
- Assign crews and equipment to work tickets
- Schedule work tickets based on dependencies
- Track progress and actual costs vs estimates

## Technical Implementation

### Database Schema Extensions

Building on existing Platform-ERM entities, add these new entities:

```csharp
// Service Catalog Entities
public class ServiceCatalog : BaseEntity
{
    public string Name { get; set; } // "Lawn Maintenance Weekly"
    public string Description { get; set; }
    public string Category { get; set; } // "Maintenance", "Construction", "Irrigation"
    public decimal DefaultMarkupPercentage { get; set; }
    public List<ServiceItem> DefaultItems { get; set; }
    public bool IsActive { get; set; }
}

public class ServiceItem : BaseEntity
{
    public string ServiceCatalogId { get; set; }
    public ServiceCatalog ServiceCatalog { get; set; }
    
    public string ItemCatalogId { get; set; }
    public ItemCatalog ItemCatalog { get; set; }
    
    public decimal Quantity { get; set; }
    public string Unit { get; set; } // "hours", "sq ft", "each"
    public decimal ProductionRate { get; set; } // sq ft per hour, etc.
}

// Item Catalog Entities
public class ItemCatalog : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public ItemType Type { get; set; } // Material, Labor, Equipment, Subcontractor
    public string Unit { get; set; }
    public decimal Cost { get; set; }
    public decimal SellPrice { get; set; }
    public bool IsKit { get; set; }
    public List<KitItem> KitItems { get; set; }
}

public class KitItem : BaseEntity
{
    public string KitId { get; set; }
    public ItemCatalog Kit { get; set; }
    
    public string ComponentItemId { get; set; }
    public ItemCatalog ComponentItem { get; set; }
    
    public decimal Quantity { get; set; }
}

// Opportunity and Estimate Entities
public class Opportunity : BaseEntity
{
    public string PropertyId { get; set; }
    public Property Property { get; set; }
    
    public string Name { get; set; }
    public string Description { get; set; }
    public OpportunityStage Stage { get; set; }
    public DateTime? ProposalDate { get; set; }
    public DateTime? CloseDate { get; set; }
    public decimal EstimatedValue { get; set; }
    public decimal Probability { get; set; }
    
    public List<Estimate> Estimates { get; set; }
}

public class Estimate : BaseEntity
{
    public string OpportunityId { get; set; }
    public Opportunity Opportunity { get; set; }
    
    public string Name { get; set; }
    public EstimateStatus Status { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public decimal TotalAmount { get; set; }
    
    public List<EstimateService> Services { get; set; }
}

public class EstimateService : BaseEntity
{
    public string EstimateId { get; set; }
    public Estimate Estimate { get; set; }
    
    public string ServiceCatalogId { get; set; }
    public ServiceCatalog ServiceCatalog { get; set; }
    
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
    
    public List<EstimateServiceItem> Items { get; set; }
}

public class EstimateServiceItem : BaseEntity
{
    public string EstimateServiceId { get; set; }
    public EstimateService EstimateService { get; set; }
    
    public string ItemCatalogId { get; set; }
    public ItemCatalog ItemCatalog { get; set; }
    
    public decimal Quantity { get; set; }
    public decimal UnitCost { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalCost { get; set; }
    public decimal TotalPrice { get; set; }
}

// Contract/Project Entities (extends existing Work Order)
public class Contract : BaseEntity
{
    public string EstimateId { get; set; }
    public Estimate Estimate { get; set; }
    
    public string PropertyId { get; set; }
    public Property Property { get; set; }
    
    public string ContractNumber { get; set; } // CONT-2024-001
    public ContractStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? CompletionDate { get; set; }
    public decimal ContractValue { get; set; }
    
    public List<WorkTicket> WorkTickets { get; set; }
}

// Enhanced Work Ticket (builds on existing Work Order)
public class WorkTicket : BaseEntity
{
    public string ContractId { get; set; }
    public Contract Contract { get; set; }
    
    public string EstimateServiceId { get; set; }
    public EstimateService EstimateService { get; set; }
    
    public string TicketNumber { get; set; } // WT-CONT-001-01
    public string Title { get; set; }
    public string Description { get; set; }
    public WorkTicketStatus Status { get; set; }
    
    public DateTime? ScheduledDate { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? CompletionDate { get; set; }
    
    public decimal EstimatedCost { get; set; }
    public decimal ActualCost { get; set; }
    public decimal EstimatedHours { get; set; }
    public decimal ActualHours { get; set; }
    
    public List<WorkTicketItem> Items { get; set; }
    public List<WorkTicketTimeEntry> TimeEntries { get; set; }
}

public class WorkTicketItem : BaseEntity
{
    public string WorkTicketId { get; set; }
    public WorkTicket WorkTicket { get; set; }
    
    public string ItemCatalogId { get; set; }
    public ItemCatalog ItemCatalog { get; set; }
    
    public decimal EstimatedQuantity { get; set; }
    public decimal ActualQuantity { get; set; }
    public decimal UnitCost { get; set; }
    public decimal TotalCost { get; set; }
}

// Enums
public enum ItemType
{
    Material,
    Labor,
    Equipment,
    Subcontractor
}

public enum OpportunityStage
{
    Lead,
    Qualified,
    Proposal,
    Negotiation,
    Closed_Won,
    Closed_Lost
}

public enum EstimateStatus
{
    Draft,
    Pending_Review,
    Approved,
    Rejected,
    Converted_To_Contract
}

public enum ContractStatus
{
    Active,
    In_Progress,
    Completed,
    Cancelled,
    On_Hold
}

public enum WorkTicketStatus
{
    Scheduled,
    In_Progress,
    Completed,
    Cancelled,
    On_Hold
}
```

## UI Component Integration

### Using Existing Design System

All new components follow our established three-platform iteration framework:

#### Tab Navigation Hierarchy

**Contract Detail View Tabs** (Aspire style):
```
Contract CONT-2024-001: Overview | Work Tickets | Schedule | Invoicing | Client Communication
```

**Work Ticket Detail View Tabs**:
```
Work Ticket WT-001-01: Overview | Items | Time Tracking | Photos | Notes
```

#### Component Extensions

**Existing Components to Extend**:
- Property cards → Add opportunity indicators
- Work Order components → Enhance for work ticket hierarchy
- Form layouts → Extend for estimate creation

**New Components to Create**:
- Service catalog management
- Estimate builder with service selection
- Contract/work ticket hierarchy display
- Cost rollup dashboards

### Navigation Structure

Following our three-level hierarchy:

```
Primary Sidebar: Estimates | Contracts | Work Tickets | Catalogs
├── Estimates SubNav: Active Estimates | Estimate Templates | Archived
├── Contracts SubNav: Active Contracts | Contract Schedule | Completed
├── Work Tickets SubNav: Today's Tickets | Scheduled | Completed
└── Catalogs SubNav: Service Catalog | Item Catalog | Price Lists
```

## Cost Tracking Implementation

### Rollup Structure

```
Work Ticket Items (Actual Costs)
        ↓
Work Ticket Totals
        ↓
Contract Totals
        ↓
Property/Client Profitability
```

### Profitability Analysis

- **Estimate vs Actual**: Track variance at all levels
- **Service Profitability**: Compare service estimates to actual costs
- **Property ROI**: Track total profitability per property
- **Crew Efficiency**: Analyze actual vs estimated hours

## Implementation Phases

### Phase 1: Core Workflow (Weeks 1-2)
- Database schema implementation
- Basic service and item catalog management
- Estimate creation workflow
- Contract generation from estimates

### Phase 2: Work Ticket Generation (Weeks 3-4)
- Automatic work ticket creation from services
- Work ticket scheduling and assignment
- Time tracking and cost capture
- Basic reporting

### Phase 3: Advanced Features (Weeks 5-6)
- Advanced cost rollup and profitability analysis
- Crew scheduling optimization
- Client communication workflows
- Mobile work ticket completion

### Phase 4: Optimization (Weeks 7-8)
- Performance optimization for large datasets
- Advanced reporting and analytics
- Integration with accounting systems
- Mobile app enhancements

## Advantages Over LMN Single-Tier System

1. **Granular Cost Tracking**: Service → Work Ticket breakdown vs single job costing
2. **Service Reusability**: Standardized services across estimates
3. **Profitability Analysis**: Track margins at service and ticket level
4. **Resource Planning**: Better crew and equipment allocation
5. **Client Transparency**: Detailed breakdown of services and costs
6. **Scalability**: Handle complex multi-service projects efficiently

This hierarchy provides the foundation for a superior commercial landscape management system that addresses the complexity of real-world landscaping projects while maintaining the professional, enterprise-grade user experience defined by our design system.