# Platform-ERM Feature Dependencies

## Overview

This document tracks feature dependencies and relationships across Platform-ERM modules. It serves as a central reference for understanding how features interconnect and which work must be completed before other features can begin.

## Current Feature Relationships

### Properties Module (Agent 1 - IN PROGRESS)
**Status**: Frontend development phase
**Agent**: Agent 1 (Properties Frontend Specialist)

**Depends On:**
- ✅ Backend Properties API (Agent 2 - COMPLETE)
- ✅ Contact hierarchy system (Agent 2 - COMPLETE)
- ✅ Enterprise token system (COMPLETE)
- ✅ Three-level navigation structure (COMPLETE)

**Enables:**
- ⏳ Work Order UI integration (property selection in work orders)
- ⏳ Mobile property management (Agent 3)
- ⏳ CRM pipeline frontend (property-based sales tracking)
- ⏳ Job costing property allocation

**Current Work**: Building three-platform component variants (ServiceTitan, LMN, Aspire)

---

### Purchase Order System (PLANNED - Priority #1)
**Status**: Design complete, awaiting Properties UI completion
**Agent**: Agent 2 (Backend & Systems Specialist)

**Depends On:**
- 🔄 Properties module UI completion (Agent 1) - for property/job selection
- ✅ Work ticket generation system (COMPLETE)
- ✅ Multi-strategy PO design (COMPLETE)
- ✅ Multi-tenant architecture (COMPLETE)

**Enables:**
- ⏳ Mobile PO approval workflows (Agent 3)
- ⏳ Real-time job costing integration
- ⏳ Vendor management frontend
- ⏳ Material tracking and inventory

**Business Impact**: Solves Aspire's #1 limitation - "Purchase Receipts" single-strategy constraint

---

### Real-Time Job Costing (PLANNED - Priority #2)
**Status**: Waiting for Purchase Order system
**Agent**: Agent 2 (Backend) + Agent 1 (Frontend dashboards)

**Depends On:**
- ⏳ Purchase Order system completion
- 🔄 Properties module completion (for cost allocation UI)
- ⏳ Work ticket time tracking
- ⏳ Equipment tracking integration

**Enables:**
- ⏳ Live profitability dashboards (Agent 1)
- ⏳ Mobile cost tracking (Agent 3)
- ⏳ Estimate vs actual reporting
- ⏳ Budget alerts and notifications

**Business Impact**: Major competitive advantage over LMN's manual-entry job costing

---

### Work Order Management (PLANNED - Priority #3)
**Status**: Aspire workflow implemented, needs UI
**Agent**: Agent 1 (Frontend) + Agent 2 (API enhancements)

**Depends On:**
- 🔄 Properties module completion
- ✅ Work Order → Work Ticket hierarchy (COMPLETE)
- ✅ Aspire workflow components (COMPLETE)
- ⏳ Scheduling engine integration

**Enables:**
- ⏳ Mobile work order completion (Agent 3)
- ⏳ Route optimization
- ⏳ Customer portal access
- ⏳ Automated invoicing

---

### Mobile PWA Features (FUTURE)
**Status**: Planned for after core modules complete
**Agent**: Agent 3 (Mobile & Integration Specialist)

**Depends On:**
- 🔄 Properties module completion (Agent 1)
- ⏳ Purchase Order system (Agent 2)
- ⏳ Work ticket completion workflows
- ⏳ Offline data sync architecture

**Enables:**
- ⏳ Field crew productivity features
- ⏳ Offline-first capabilities
- ⏳ GPS time tracking integration
- ⏳ Photo and document capture

---

## Cross-Feature Integration Points

### API Contracts (Coordination Required)

#### Properties ↔ Work Orders
- Property selection in work order creation
- Service address inheritance
- Contact hierarchy access
- Work history by property

#### Purchase Orders ↔ Work Tickets
- Cost allocation to specific work tickets
- Material tracking and usage
- Budget vs actual tracking
- Vendor assignment by job

#### Job Costing ↔ All Modules
- Real-time cost aggregation from:
  - Purchase orders (materials)
  - Work tickets (labor)
  - Equipment tracking (equipment costs)
  - Overhead allocation (property-based)

### Shared TypeScript Interfaces
- **Contact Hierarchy**: Used by Properties, Work Orders, Invoicing
- **Tenant Context**: Required by all modules for multi-tenant isolation
- **Cost Tracking**: Shared between Purchase Orders, Job Costing, Equipment
- **Address/Location**: Properties, Work Orders, Route Planning

### Database Relationships
- **Properties** → Work Orders, Contacts, Opportunities
- **Work Orders** → Work Tickets → Purchase Orders, Time Entries
- **Contacts** → Properties, Companies, Communications
- **Purchase Orders** → Vendors, Work Tickets, Inventory

---

## Implementation Sequence

### Phase 1: Foundation (COMPLETE)
1. ✅ Multi-tenant architecture
2. ✅ Properties backend API
3. ✅ Contact hierarchy system
4. ✅ Authentication/authorization
5. ✅ Enterprise design tokens

### Phase 2: Core Modules (CURRENT)
1. 🔄 Properties frontend (Agent 1)
2. ⏳ Purchase Order system (Agent 2)
3. ⏳ Basic job costing (Agent 2)
4. ⏳ Work Order UI (Agent 1)

### Phase 3: Advanced Features
1. ⏳ Mobile PWA (Agent 3)
2. ⏳ Real-time dashboards
3. ⏳ Integration APIs
4. ⏳ Reporting engine

### Phase 4: Optimization
1. ⏳ Performance tuning
2. ⏳ Advanced workflows
3. ⏳ AI/ML features
4. ⏳ Third-party integrations

---

## Dependency Legend
- ✅ **COMPLETE**: Fully implemented and tested
- 🔄 **IN PROGRESS**: Currently being developed
- ⏳ **PLANNED**: Scheduled for future development
- ❌ **BLOCKED**: Cannot proceed due to dependencies

---

## Coordination Requirements

### Before Starting New Features
1. Check this document for dependencies
2. Verify all prerequisites are complete or in progress
3. Create coordination issue if cross-agent work needed
4. Update this document when starting new features

### When Completing Features
1. Mark feature as COMPLETE in this document
2. Update any features that were waiting on yours
3. Notify agents who can now proceed with dependent work
4. Update completion-log.md with details

This living document ensures all agents understand feature dependencies and can coordinate effectively on Platform-ERM development.