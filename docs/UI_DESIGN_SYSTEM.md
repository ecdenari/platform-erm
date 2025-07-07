# Platform-ERM Enterprise UI Design System

## Overview

This design system extends the existing Platform-ERM foundations to create a professional, enterprise-grade SaaS interface inspired by best practices from ServiceTitan, LMN, and Aspire. It builds upon our current tokens and foundations while elevating the design to meet commercial landscaping industry standards.

## Core Design Principles

### 1. Enterprise Density (ServiceTitan Inspired)
- **Information Density**: Maximum data visibility with minimal scrolling
- **Professional Aesthetic**: Clean, technical appearance that conveys reliability
- **Efficiency First**: Every pixel serves a purpose, no wasted space

### 2. Landscape-Specific Features (LMN Best Practices)
- **Industry Workflows**: Design patterns that match landscape business operations
- **Avoid Consumer Elements**: No mobile-first patterns, focus on desktop power users
- **Commercial Focus**: B2B aesthetic throughout, avoiding residential/consumer patterns

### 3. Work Order Hierarchy (Aspire Model)
- **Two-Tier System**: Work Orders → Work Tickets with unique identifiers
- **Job Costing Granularity**: Track costs at the Work Ticket level
- **Clear Visual Hierarchy**: Distinguish between order and ticket levels

## Extended Design Tokens

Building on existing `tokens.ts`, add these enterprise-specific tokens:

```typescript
// Enterprise density tokens
export const enterpriseTokens = {
  ...tokens,
  
  // Enhanced spacing for data-dense interfaces
  spacing: {
    ...tokens.spacing,
    // Tighter spacing for tables and lists
    dense: {
      xs: '0.125rem',  // 2px
      sm: '0.25rem',   // 4px
      md: '0.375rem',  // 6px
      lg: '0.5rem',    // 8px
    },
    // Comfortable spacing for forms
    comfortable: {
      sm: '0.5rem',    // 8px
      md: '0.75rem',   // 12px
      lg: '1rem',      // 16px
      xl: '1.25rem',   // 20px
    }
  },

  // Professional color enhancements
  colors: {
    ...tokens.colors,
    // Status colors for work orders
    status: {
      draft: '#6B7280',      // gray-500
      scheduled: '#3B82F6',  // blue-500
      inProgress: '#F59E0B', // amber-500
      completed: '#10B981',  // emerald-500
      cancelled: '#EF4444',  // red-500
      onHold: '#8B5CF6',    // violet-500
    },
    // Commercial landscape specific
    landscape: {
      maintenance: '#059669',  // emerald-600
      construction: '#DC2626', // red-600
      irrigation: '#2563EB',   // blue-600
      enhancement: '#7C3AED',  // violet-600
      snow: '#64748B',        // slate-500
    }
  },

  // Typography for data density
  typography: {
    ...tokens.typography,
    // Compact sizes for tables
    compact: {
      xs: '0.6875rem',   // 11px
      sm: '0.75rem',     // 12px
      base: '0.8125rem', // 13px
      lg: '0.875rem',    // 14px
    },
    // Table-specific line heights
    lineHeight: {
      ...tokens.typography.lineHeight,
      dense: '1.2',
      table: '1.35',
    }
  },

  // Component-specific tokens
  components: {
    // Data table styling
    dataTable: {
      headerHeight: '2.5rem',     // 40px
      rowHeight: '2.25rem',       // 36px
      rowHeightCompact: '1.875rem', // 30px
      cellPadding: '0.5rem',      // 8px
      borderColor: '#E5E7EB',     // gray-200
    },
    // Work order cards
    workOrderCard: {
      minHeight: '4rem',          // 64px
      padding: '0.75rem',         // 12px
      statusBarWidth: '4px',
      idTagHeight: '1.5rem',      // 24px
    },
    // Form styling
    form: {
      fieldHeight: '2.25rem',     // 36px
      labelGap: '0.375rem',       // 6px
      sectionGap: '1.5rem',       // 24px
      compactFieldHeight: '1.875rem', // 30px
    }
  }
}
```

## Component Patterns

### 1. Data Tables (ServiceTitan Style)

```typescript
// Dense data table with hover states and row actions
export const dataTableStyles = {
  container: 'bg-white rounded-lg shadow-sm border border-gray-200',
  header: 'bg-gray-50 border-b border-gray-200',
  headerCell: 'px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider',
  row: 'border-b border-gray-100 hover:bg-gray-50 transition-colors',
  cell: 'px-3 py-2 text-sm text-gray-900',
  // Compact variant
  compactCell: 'px-2 py-1.5 text-xs text-gray-900',
  // Actions column
  actionsCell: 'px-2 py-1 text-right',
  // Status badges
  statusBadge: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
}
```

### 2. Work Order Cards (Aspire Pattern)

```typescript
// Work order card with status indicator and unique ID
export const workOrderCardStyles = {
  container: 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
  statusBar: 'absolute left-0 top-0 bottom-0 w-1', // Color based on status
  content: 'pl-3 pr-4 py-3',
  header: 'flex items-center justify-between mb-2',
  idTag: 'inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-xs font-mono',
  title: 'text-sm font-medium text-gray-900 truncate',
  metadata: 'flex items-center gap-4 text-xs text-gray-500',
  // Work ticket sub-items
  ticketList: 'mt-2 space-y-1 pl-4 border-l-2 border-gray-200',
  ticketItem: 'text-xs text-gray-700 hover:text-gray-900',
}
```

### 3. Tab Navigation Patterns

**Critical Design Principle**: Tabs are ONLY for different views of the SAME entity.

#### Tab Navigation Specifications

```typescript
// Tab navigation structure - Three platform variants
export const tabNavigationStyles = {
  // ServiceTitan: Ultra-compact tabs with data badges
  serviceTitan: {
    container: 'border-b border-gray-300 bg-white',
    tabList: 'flex space-x-0 -mb-px',
    tab: 'px-3 py-2 text-xs font-medium border-b-2 border-transparent hover:border-gray-300',
    tabActive: 'px-3 py-2 text-xs font-medium border-b-2 border-blue-500 text-blue-600',
    tabBadge: 'ml-1 px-1.5 py-0.5 text-xs bg-gray-100 rounded-full',
    height: '32px', // Minimal vertical space
  },
  
  // LMN: Icon-based tabs with status indicators
  lmn: {
    container: 'bg-white border-b border-green-200 px-4',
    tabList: 'flex space-x-1 -mb-px',
    tab: 'flex items-center px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 border-transparent hover:bg-green-50',
    tabActive: 'flex items-center px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 border-green-500 bg-green-50 text-green-700',
    tabIcon: 'mr-2 h-4 w-4',
    statusDot: 'ml-2 h-2 w-2 rounded-full',
    height: '48px', // Comfortable spacing
  },
  
  // Aspire: Professional business tabs with entity context
  aspire: {
    container: 'bg-white border-b border-slate-200',
    tabList: 'flex space-x-6 px-6 -mb-px',
    tab: 'flex items-center py-4 text-sm font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300',
    tabActive: 'flex items-center py-4 text-sm font-medium border-b-2 border-slate-900 text-slate-900',
    entityContext: 'mr-2 text-xs text-slate-400 font-mono',
    tabCount: 'ml-2 px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded',
    height: '56px', // Professional spacing
  }
}
```

#### Navigation Hierarchy Rules

✅ **Correct Tab Usage** (different views of same entity):
- Property #12345: Overview | Details | Work Tickets | History | Documents
- Work Order WO-001: Overview | Work Tickets | Resources | Invoicing | Communication
- Contact John Doe: Information | History | Notes | Properties | Communications

❌ **Incorrect Tab Usage** (different entities - use SubNav instead):
- Properties vs Work Orders vs Contacts (use Primary Sidebar)
- Property List vs Property Map vs Property Reports (use SubNav)
- Active Orders vs Completed Orders vs Scheduled Orders (use SubNav)

### 4. Form Layouts (Commercial Focus)

```typescript
// Professional form styling for data entry
export const formStyles = {
  // Section-based layout
  section: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4',
  sectionTitle: 'text-sm font-semibold text-gray-900 mb-3',
  
  // Grid-based field layout
  fieldGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  fieldGroup: 'space-y-1',
  label: 'block text-xs font-medium text-gray-700',
  input: 'block w-full px-3 py-1.5 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500',
  
  // Compact variant for dense forms
  compactInput: 'block w-full px-2 py-1 text-xs border-gray-300 rounded',
  
  // Read-only display
  readOnlyField: 'block w-full px-3 py-1.5 text-sm bg-gray-50 border-gray-200 rounded-md text-gray-700',
}
```

### 5. Navigation Enhancements

**Three-Level Navigation Hierarchy**: Primary Sidebar → SubNav → Page Tabs

Building on existing navigation, add these patterns:

```typescript
// Module-specific navigation (secondary sidebar/SubNav)
export const moduleNavStyles = {
  container: 'w-48 bg-white border-r border-gray-200',
  section: 'p-2',
  sectionTitle: 'px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider',
  item: 'block px-3 py-1.5 text-sm text-gray-700 rounded hover:bg-gray-100',
  itemActive: 'block px-3 py-1.5 text-sm text-primary-700 bg-primary-50 rounded font-medium',
  divider: 'my-2 border-t border-gray-200',
}

// CRITICAL: SubNav is for different features within a module
// Examples:
// - Properties SubNav: Property List | Property Map | Property Reports
// - Work Orders SubNav: Active Orders | Scheduling Board | Order History
```

## Screen Layouts

### 1. List View (Properties, Work Orders, etc.)

```
┌─────────────────────────────────────────────────────────────┐
│ Page Header                                                  │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────┬─────────────────────────────────────────────┐ │
│ │ Filters   │ Search Bar                        Actions ▼ │ │
│ └───────────┴─────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Data Table with Hover Actions                           │ │
│ │ ┌─────┬────────────┬──────────┬──────────┬──────────┐  │ │
│ │ │ ID  │ Name       │ Status   │ Updated  │ Actions  │  │ │
│ │ ├─────┼────────────┼──────────┼──────────┼──────────┤  │ │
│ │ │ ... │ ...        │ ...      │ ...      │ ⋮        │  │ │
│ │ └─────┴────────────┴──────────┴──────────┴──────────┘  │ │
│ └─────────────────────────────────────────────────────────┘ │
│ Pagination                                                   │
└─────────────────────────────────────────────────────────────┘
```

### 2. Detail View (Property, Work Order)

**Three-Level Navigation**: Primary Sidebar → SubNav → Page Tabs

```
┌─────────────────────────────────────────────────────────────┐
│ Breadcrumb > Navigation > Path                              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Header with Entity ID, Status Badge, and Actions       │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Page Tabs: Overview | Details | Work Tickets | History │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Tab Content Area                                        │ │
│ │ ┌─────────────────┬─────────────────┬─────────────────┐ │ │
│ │ │ Section Card    │ Section Card    │ Section Card    │ │ │
│ │ │ - Basic Info    │ - Location      │ - Related Items │ │ │
│ │ │ - Contact Info  │ - Address       │ - Work Orders   │ │ │
│ │ └─────────────────┴─────────────────┴─────────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Critical**: Tabs show different views of the SAME entity (Property #12345), not different entity types.

## Mobile Considerations

While focusing on desktop power users, ensure responsive behavior:

1. **Tablet (768px-1024px)**: Maintain full functionality with adjusted spacing
2. **Mobile (< 768px)**: Simplified layout for field workers checking information
3. **Never compromise desktop experience for mobile**: Desktop is primary

## Theme Customization

Support multi-tenant theming while maintaining professional standards:

```typescript
export const generateTenantTheme = (primaryColor: string) => {
  // Generate color variations
  const primary = generateColorScale(primaryColor);
  
  return {
    ...enterpriseTokens,
    colors: {
      ...enterpriseTokens.colors,
      primary,
      // Override specific UI elements
      interactive: {
        ...enterpriseTokens.colors.interactive,
        hover: `${primaryColor}08`,
        focus: `${primaryColor}20`,
        active: `${primaryColor}30`,
      }
    }
  };
};
```

## Accessibility Standards

1. **WCAG 2.1 AA Compliance**: All color contrasts meet standards
2. **Keyboard Navigation**: Full keyboard support for all interactions
3. **Screen Reader Support**: Proper ARIA labels and landmarks
4. **Focus Indicators**: Clear, visible focus states

## Performance Guidelines

1. **Virtualization**: Use for tables with > 100 rows
2. **Lazy Loading**: Load modules and heavy components on demand
3. **Optimistic Updates**: Immediate UI feedback for user actions
4. **Debounced Search**: 300ms delay on search inputs

## Implementation Priority

1. **Phase 1**: Extend existing tokens and foundations
2. **Phase 2**: Create reusable table and form components
3. **Phase 3**: Build work order specific components
4. **Phase 4**: Implement theme customization system

This design system provides the foundation for building a professional, enterprise-grade landscape management platform that combines the best practices from ServiceTitan's density, LMN's landscape features, and Aspire's work order hierarchy.