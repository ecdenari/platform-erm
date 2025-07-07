# Properties Module Feature Plan

## Overview and Objectives

### Business Problem
**Aspire's Contact Management Limitations** (Major Pain Point #1):
- Lumps employees and customer contacts together in one module
- No hierarchical contact structure for commercial properties
- Cannot set project-specific billing contacts (property-level only)
- Poor organization for companies with multiple properties

### Platform-ERM Solution
Create a **superior hierarchical contact management system** that:
- Separates employees from customer contacts completely
- Implements Property → Company → Contact hierarchy
- Supports project-specific billing contact overrides
- Provides commercial B2B client management

### Success Metrics
- ✅ **90% user preference** over Aspire's contact management
- ✅ **75% reduction** in contact lookup time
- ✅ **100% accurate** project billing contact routing
- ✅ **Zero confusion** between employee and customer contacts

## Technical Approach

### Backend Foundation (COMPLETED ✅)
Based on completion log, the backend is fully implemented:
- **Multi-tenant Properties entity** with PostGIS spatial support
- **Hierarchical contact relationships** (Property → Company → Contact)
- **Internal/Public API controllers** with proper authentication
- **Database migrations** completed successfully

### Frontend Implementation (CURRENT PHASE)
Build enterprise-grade React components using our three-platform strategy:

#### Token System Integration
- **Base tokens** (`tokens.ts`) - Professional blue theme foundation
- **Enterprise tokens** (`enterpriseTokens.ts`) - Dense layouts and platform styles
- **Three-platform variants** - ServiceTitan (dense), LMN (landscape), Aspire (hierarchy)

#### UI Components Required
1. **Property List Component** (Dense data table)
   - ServiceTitan variant: Maximum information density, 12+ rows visible
   - LMN variant: Landscape-specific features (GPS, service types)
   - Aspire variant: Commercial hierarchy with Work Order counts

2. **Property Form Component** (Modern card design)
   - Multi-section layout using enterprise spacing tokens
   - Address input with PostGIS spatial data integration
   - Hierarchical contact assignment interfaces

3. **Property Detail Component** (Card-based layout)
   - **Tab Navigation**: Overview | Details | Contacts | Work Orders | History
   - **Critical Rule**: Tabs show different views of SAME property entity
   - Contact hierarchy display with role-based organization

## Entity Relationships

### Database Schema (Implemented)
```
Property (BaseEntity with TenantId)
├── Company (Commercial client)
├── PropertyContacts (Junction table)
│   ├── Property Manager Contact
│   ├── Billing Contact
│   ├── Operational Contact
│   └── Owner Contact
├── Address (PostGIS GEOGRAPHY type)
└── Work Orders (Future integration)
```

### Contact Hierarchy Rules
- **Property Level**: Default contacts for standard operations
- **Project Level**: Override contacts for specific work orders/contracts
- **Role-Based**: Different contacts for billing, operations, emergencies
- **Commercial Focus**: Multiple stakeholders per property (vs residential single contact)

## API Endpoints

### Internal API (Full CRUD)
- `GET /api/internal/properties` - List with filtering, pagination
- `GET /api/internal/properties/{id}` - Property details with contacts
- `POST /api/internal/properties` - Create with contact assignments
- `PUT /api/internal/properties/{id}` - Update property and relationships
- `DELETE /api/internal/properties/{id}` - Soft delete with audit trail

### Public API (Limited Access)
- `GET /api/public/properties` - Basic property information for external systems
- `GET /api/public/properties/{id}` - Public property details (limited fields)

### Contact Management Integration
- Property contact assignment/reassignment
- Contact role management (billing, operations, etc.)
- Project-specific contact override workflows

## UI Components Development

### Component Architecture
Using our established design system patterns:

#### 1. PropertyList Component
**Three-Platform Variants**:

```typescript
// ServiceTitan Style - Maximum density
const PropertyListServiceTitan = {
  layout: 'Dense data table, 12+ rows visible',
  styles: enterpriseTokens.components.dataTable,
  features: [
    'Compact 30px row height',
    'Hover actions in rightmost column',
    'Sortable columns with minimal indicators',
    'Bulk selection with header checkbox'
  ]
}

// LMN Style - Landscape features
const PropertyListLMN = {
  layout: 'Comfortable spacing with visual indicators',
  features: [
    'Property type color coding',
    'Service area grouping',
    'GPS coordinates quick-copy',
    'Weather zone indicators'
  ]
}

// Aspire Style - Commercial hierarchy
const PropertyListAspire = {
  layout: 'Professional B2B with relationship context',
  features: [
    'Company grouping with expand/collapse',
    'Active Work Order counts',
    'Commercial property type indicators',
    'Contract value summaries'
  ]
}
```

#### 2. PropertyForm Component
**Enterprise Form Layout**:
- **Section Cards**: Basic Info | Address | Contacts | Service Settings
- **Responsive Grid**: 1 column mobile, 2 columns tablet, 3 columns desktop
- **Field Validation**: Real-time validation with enterprise error styling
- **Contact Assignment**: Multi-select with role assignment

#### 3. PropertyDetail Component
**Tab Navigation Pattern** (Critical - follows our hierarchy rules):
```
Property #12345: Overview | Details | Contacts | Work Orders | History
```

**Tab Content Structure**:
- **Overview**: Key metrics, recent activity, quick actions
- **Details**: Complete property information, address, service areas
- **Contacts**: Hierarchical contact display with role management
- **Work Orders**: Associated work orders/contracts (future integration)
- **History**: Audit trail, changes, notes

### Navigation Integration

#### Three-Level Hierarchy Implementation
```
Primary Sidebar: "Properties" (module-level)
├── SubNav: "Property List" | "Property Map" | "Property Reports" (feature-level)
└── Page Tabs: "Overview" | "Details" | "Contacts" | "Work Orders" | "History" (view-level)
```

**Navigation Rules Enforcement**:
- ✅ Tabs: Different views of same property entity
- ❌ Tabs: Different entity types (use SubNav for Property List vs Property Map)

## Progress Tracking

### Phase 1: Foundation Components (Week 1)
- [ ] Update Tailwind config with enterprise tokens
- [ ] Create base Property card components (3 variants)
- [ ] Implement Property list with dense data table
- [ ] Set up module navigation structure

### Phase 2: Detail Views (Week 2)
- [ ] Build Property detail page with tab navigation
- [ ] Implement hierarchical contact display
- [ ] Create Property form with multi-section layout
- [ ] Add contact assignment workflows

### Phase 3: Integration & Polish (Week 3)
- [ ] Connect components to existing backend APIs
- [ ] Implement real-time validation and error handling
- [ ] Add loading states and error boundaries
- [ ] Mobile responsive testing and refinement

### Phase 4: Validation (Week 4)
- [ ] User testing with realistic data
- [ ] Performance optimization for large property lists
- [ ] Accessibility compliance verification
- [ ] Documentation and handoff preparation

## Testing Checklist

### Functional Testing
- [ ] **Multi-tenant isolation**: Properties only show for correct tenant
- [ ] **Contact hierarchy**: Property → Company → Contact relationships work
- [ ] **Spatial data**: PostGIS location data displays correctly
- [ ] **Role assignments**: Contact roles (billing, operational) function properly

### UI/UX Testing
- [ ] **Three-platform variants**: All variants render correctly
- [ ] **Responsive design**: Works on desktop, tablet, mobile
- [ ] **Navigation hierarchy**: Primary → SubNav → Tabs structure
- [ ] **Tab usage**: Only used for same entity views

### Performance Testing
- [ ] **Large datasets**: 1000+ properties load within 2 seconds
- [ ] **Real-time updates**: Form validation responds within 100ms
- [ ] **Mobile performance**: Acceptable performance on older devices

### Accessibility Testing
- [ ] **Keyboard navigation**: Full functionality without mouse
- [ ] **Screen reader**: Proper ARIA labels and announcements
- [ ] **Color contrast**: WCAG 2.1 AA compliance
- [ ] **Focus indicators**: Clear focus states throughout

## Integration Points

### With Existing Systems
- **Work Orders**: Properties will link to work orders/contracts (future phase)
- **Scheduling**: Property location data for route optimization
- **Invoicing**: Property billing contact hierarchy
- **Reporting**: Property-based performance analytics

### With External Systems (Public API)
- **CRM Integration**: External systems can sync property data
- **Mapping Services**: GPS coordinates for route planning
- **Accounting Software**: Property groupings for financial reporting

## Business Value Validation

### Immediate Benefits
- **Contact Clarity**: Clear separation of employees vs customers
- **Billing Accuracy**: Correct contacts receive invoices every time
- **Commercial Support**: Proper multi-stakeholder property management
- **Time Savings**: Faster contact lookup and assignment

### Long-term Impact
- **Scalability**: System supports complex commercial property portfolios
- **Integration Ready**: Foundation for CRM and work order connections
- **User Adoption**: Superior UX drives platform adoption
- **Competitive Advantage**: Clear differentiation from Aspire limitations

## Risk Mitigation

### Technical Risks
- **Performance**: Use virtualization for large property lists
- **Complexity**: Keep contact hierarchy intuitive with clear visual design
- **Integration**: Ensure clean API design for future work order integration

### User Adoption Risks
- **Training**: Provide clear migration path from existing contact management
- **Change Management**: Highlight benefits over current system limitations
- **Gradual Rollout**: Phase implementation to reduce disruption

## Success Definition

### Phase 1 Success (Foundation)
- All three component variants render correctly with sample data
- Navigation hierarchy works according to established rules
- Multi-tenant data isolation confirmed

### Phase 2 Success (Functionality)
- Complete property CRUD operations through UI
- Contact hierarchy assignment works reliably
- Form validation and error handling functions properly

### Phase 3 Success (Validation)
- User preference over Aspire contact management demonstrated
- Performance metrics met (load times, responsiveness)
- Zero critical bugs in core workflows

### Phase 4 Success (Business Impact)
- Measurable reduction in contact lookup time
- Improved billing accuracy through correct contact routing
- Foundation ready for work order and scheduling integration

This Properties module will establish the foundation for Platform-ERM's superior contact management while proving the enterprise design system's effectiveness for commercial landscape management workflows.