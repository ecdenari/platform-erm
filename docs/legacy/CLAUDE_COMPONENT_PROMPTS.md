# Claude Code Component Prompt Templates

## CRM Module Prompts

### 1. CRM Module Foundation
```
Create the CRM module following the architecture in SCAFFOLD.md and rules in CLAUDE.md.

Backend requirements:
- Entities: Lead, Opportunity, Activity, Pipeline, PipelineStage
- All entities must inherit from BaseEntity with TenantId
- Services for pipeline management and lead conversion
- Internal API controllers with full CRUD
- Public API with read-only access to opportunities

Frontend requirements:
- Module structure at frontend/src/modules/crm/
- Pipeline kanban board with drag-and-drop
- Lead and opportunity forms with validation
- Activity timeline component
- Use React Query for state management

Reference the module structure from references/FrontendFMRS/src/modules/ but remember this is standalone data, not pulled from Aspire.
```

### 2. Contact Hierarchy System
```
Implement the hierarchical contact system that is a key differentiator from Aspire.

Requirements:
- Contact entity with ContactType enum (Owner, Manager, Billing, Operational, etc.)
- Property-Contact relationship with role-based assignments
- Project-specific billing contact overrides
- Contact inheritance from Company → Property → Project levels

Database schema:
- Contacts table with TenantId
- PropertyContacts junction table with Role field
- ProjectContactOverrides for billing exceptions

API endpoints needed:
- GET /api/internal/properties/{id}/contacts (grouped by role)
- POST /api/internal/properties/{id}/contacts
- GET /api/internal/contacts/search

This solves Aspire's limitation of lumping all contacts together.
```

### 3. Sales Pipeline Customization
```
Build a customizable sales pipeline system superior to Aspire/LMN.

Features needed:
- Dynamic pipeline stages per service type (Maintenance, Construction, Enhancement)
- Branching workflows with conditional stages
- Automated stage transitions based on rules
- Probability and value tracking per stage
- Season-adjusted close date predictions

Include:
- Pipeline template management
- Drag-and-drop stage reordering
- Custom fields per stage
- Required actions before stage advancement

Frontend: Build with React DnD or similar for smooth drag-drop experience.
```

## Scheduling Module Prompts

### 4. Crew Scheduling System
```
Create the scheduling module addressing Aspire's limitations (no square footage on maps, poor efficiency tracking).

Backend needs:
- Entities: Crew, Schedule, Route, ServiceArea (with PostGIS geometry)
- WorkOrder entity linked to Property (with service area square footage)
- Efficient route optimization using PostGIS functions

Key features:
- Display property square footage on scheduling map
- Calculate crew efficiency (sqft/hour, properties/day)
- Weather-dependent scheduling with rain day management
- Real-time GPS tracking integration ready

Frontend:
- Calendar view with drag-drop (use FullCalendar or similar)
- Map view showing routes and property sizes
- Crew capacity indicators
- Mobile-responsive for field access

Reference references/FrontendFMRS for UI patterns but build scheduling from scratch.
```

### 5. Route Optimization Engine
```
Implement smart route optimization for crew scheduling.

Requirements:
- Use PostGIS for geographic calculations
- Consider:
  - Property locations and service areas
  - Crew home base locations  
  - Traffic patterns by time of day
  - Service time windows
  - Equipment requirements

API endpoints:
- POST /api/internal/routes/optimize
- GET /api/internal/routes/{date}/crew/{crewId}
- PUT /api/internal/routes/{id}/reorder

Include visual route builder with:
- Drag to reorder stops
- Show drive time between stops
- Display total route time and distance
- Color coding by service type
```

## Equipment Module Prompts

### 6. Equipment Lifecycle Management
```
Build comprehensive equipment tracking missing from most landscape ERPs.

Entities needed:
- Equipment (with TenantId)
- EquipmentType (mowers, trucks, trailers, etc.)
- MaintenanceSchedule
- MaintenanceRecord
- EquipmentAssignment (to crews)

Features:
- Hour tracking (integrate with work orders)
- Maintenance due alerts
- Cost tracking (repairs, fuel, depreciation)
- QR code generation for quick mobile access
- Equipment history timeline

Public API should include:
- GET /api/public/equipment (limited fields)
- Webhook for maintenance due events
```

## Finance Module Prompts

### 7. Budget Builder
```
Create Excel-like budget builder for landscape companies.

Requirements:
- Multi-division budget support
- Monthly/quarterly/annual views
- Revenue and expense categories specific to landscape
- Budget vs actual comparison (actuals can come via API)
- Export to Excel and PDF

Database:
- Budget templates by service line
- Historical data for projections
- Seasonal adjustment factors
- Labor and material cost tracking

This replaces manual Excel processes with a collaborative platform.
```

### 8. Job Costing with Real-Time Updates
```
Implement real-time job costing that LMN lacks.

Requirements:
- Live labor cost calculation as crews clock in/out
- Material cost tracking with purchase integration
- Equipment hour allocation to jobs
- Overhead allocation models
- Margin analysis by job/property/service type

Dashboard needs:
- Real-time profitability gauge
- Alerts for jobs going over budget
- Historical margin trends
- Drill-down from summary to detail

This is a major differentiator - LMN only has manual entry.
```

## Integration Prompts

### 9. Webhook System
```
Build a webhook system for external integrations.

Requirements:
- Webhook registration via public API
- Event types: property.created, contact.updated, workorder.completed, etc.
- Retry logic with exponential backoff
- Event history and logs
- HMAC signature verification

Database:
- Webhooks table with URL, events, secret
- WebhookDeliveries table for history
- Tenant-scoped webhook limits

API:
- POST /api/public/webhooks
- DELETE /api/public/webhooks/{id}
- GET /api/public/webhooks/deliveries
```

### 10. Public API SDK Generator
```
Create TypeScript/C# SDK generators for the public API.

Requirements:
- Parse Swagger/OpenAPI spec
- Generate strongly-typed clients
- Include authentication helpers
- Provide usage examples
- Auto-generate from build pipeline

Output structure:
- npm package: @platform-erm/client
- NuGet package: PlatformERM.Client
- Python package: platform-erm-client

Include docs for common integrations.
```

## Mobile-First Components

### 11. Progressive Web App Shell
```
Create PWA foundation for mobile field access.

Requirements:
- Service worker for offline capability  
- IndexedDB for local data storage
- Background sync for offline changes
- Push notifications support
- App-like installation

Focus areas:
- Time clock functionality
- Work order completion
- Inspection checklists
- Photo uploads with queue

Reference references/FrontendFMRS UI patterns but optimize for mobile-first.
```
##Prompt Example

Following SCAFFOLD.md architecture and CLAUDE.md rules, create the CRM module foundation. 
Reference the module pattern from references/FrontendFMRS/src/modules/ but remember 
Platform-ERM owns all data - no external dependencies.

## Usage Tips

1. **Always reference**: SCAFFOLD.md for architecture, CLAUDE.md for rules
2. **Check references folder**: But remember - no Aspire dependencies!
3. **Build incrementally**: Start with entities → services → controllers → UI
4. **Test multi-tenancy**: Every feature must respect tenant boundaries
5. **Document APIs**: Especially public endpoints

Remember: Platform-ERM is standalone - we're not integrating with Aspire, we're replacing the need for multiple systems!