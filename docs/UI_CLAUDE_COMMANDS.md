# Claude UI Commands for Platform-ERM

## Overview

This document defines custom commands for generating consistent UI components based on our three-platform inspiration framework (ServiceTitan, LMN, Aspire). These commands ensure that all generated components follow our design system and iteration methodology.

## Core Commands

### `/ui-component [name]`

Generates three variants of a UI component following our iteration framework.

**Syntax**: `/ui-component PropertyCard`

**Output**: Creates three files in `src/components/iterations/[name]/`:
- `[Name]ServiceTitan.tsx` - Dense, efficient variant
- `[Name]LMN.tsx` - Landscape-focused variant  
- `[Name]Aspire.tsx` - Commercial hierarchy variant
- `[Name]Lab.tsx` - Comparison/testing component

**Example Usage**:
```
/ui-component DataTable
```

**Generated Structure**:
```
src/components/iterations/DataTable/
├── DataTableServiceTitan.tsx
├── DataTableLMN.tsx
├── DataTableAspire.tsx
├── DataTableLab.tsx
├── types.ts
└── index.ts
```

### `/ui-layout [section]`

Creates or modifies layout components while preserving existing structure.

**Syntax**: `/ui-layout SubNavigation`

**Preserves**:
- Existing sidebar functionality
- Current topbar implementation
- LayoutDemo.tsx structure
- All existing routing

**Extends**:
- Layout tokens and foundations
- Responsive behavior
- Multi-tenant theming

### `/ui-workorder`

Generates work order management components following Aspire's hierarchy model.

**Creates**:
- WorkOrderCard with status indicators
- WorkTicketList with parent-child relationships
- WorkOrderForm with hierarchical sections
- Unique ID generation and display patterns

**Features**:
- Work Order → Work Tickets two-tier system
- Granular cost tracking at ticket level
- Commercial B2B workflow patterns
- Status progression workflows

### `/ui-tabs [entity]`

Generates tab navigation components for entity detail views following the three-platform framework.

**Syntax**: `/ui-tabs Property`

**Critical Rule**: Tabs are for different views of the SAME entity, not different entity types.

**Output**: Creates tab navigation variants in `src/components/iterations/[Entity]Tabs/`:
- `[Entity]TabsServiceTitan.tsx` - Compact, dense tabs with badges
- `[Entity]TabsLMN.tsx` - Icon-based tabs with status indicators
- `[Entity]TabsAspire.tsx` - Professional business tabs with hierarchy
- `[Entity]TabsLab.tsx` - Comparison testing component

**Example Usage**:
```
/ui-tabs Property
/ui-tabs WorkOrder
/ui-tabs Contact
```

**Generates tabs like**:
- Property: Overview | Details | Work Tickets | History | Documents
- WorkOrder: Overview | Work Tickets | Resources | Invoicing | Communication
- Contact: Information | History | Notes | Properties | Communications

### `/ui-review`

Validates components against our three-platform standards and navigation hierarchy.

**Checks**:
- ServiceTitan density standards
- LMN landscape workflow integration
- Aspire commercial hierarchy
- Platform-ERM design system compliance
- Three-level navigation hierarchy compliance
- Tab vs SubNav usage correctness
- Multi-tenant compatibility
- Accessibility requirements

## Command Implementation

### Tab Navigation Template

When using `/ui-tabs`, each variant follows this structure:

```typescript
// ServiceTitan tab variant - ultra-compact
interface ServiceTitanTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: TabDefinition[];
  entityId?: string;
}

const ServiceTitanTabs: React.FC<ServiceTitanTabsProps> = ({
  activeTab,
  onTabChange,
  tabs,
  entityId
}) => {
  return (
    <div className="border-b border-gray-300 bg-white">
      <nav className="flex space-x-0 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-3 py-2 text-xs font-medium border-b-2 transition-colors
              ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent hover:border-gray-300 text-gray-600'
              }
            `}
          >
            {tab.label}
            {tab.count && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

// LMN tab variant - icons and status
const LMNTabs: React.FC<LMNTabsProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-white border-b border-green-200 px-4">
      <nav className="flex space-x-1 -mb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-transparent hover:bg-green-50 text-gray-600'
                }
              `}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {tab.label}
              {tab.status && (
                <div 
                  className="ml-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: tab.status.color }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Aspire tab variant - professional hierarchy
const AspireTabs: React.FC<AspireTabsProps> = ({ activeTab, onTabChange, tabs, entityType, entityId }) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <nav className="flex space-x-6 px-6 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center py-4 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab.id
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }
            `}
          >
            {entityType && entityId && (
              <span className="mr-2 text-xs text-slate-400 font-mono">
                {entityType}-{entityId}
              </span>
            )}
            {tab.label}
            {tab.count && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
```

### Navigation Hierarchy Validation

Every tab component must validate proper hierarchy usage:

```typescript
// Tab validation helper
const validateTabUsage = (tabs: TabDefinition[], context: 'entity-detail' | 'module-list') => {
  if (context === 'entity-detail') {
    // Tabs should show different views of the SAME entity
    const validEntityTabs = ['overview', 'details', 'history', 'documents', 'notes'];
    // Validate tabs are for same entity views
  } else {
    throw new Error('Tabs should only be used for entity detail views. Use SubNav for module navigation.');
  }
};
```

### Component Generation Template

When using `/ui-component`, each variant follows this structure:

```typescript
// ServiceTitan variant template
import React from 'react';
import { enterpriseTokens } from '../../../styles/enterpriseTokens';

interface ServiceTitan[ComponentName]Props {
  // Dense, data-focused props
  data: [ComponentName]Data[];
  onAction?: (id: string, action: string) => void;
  compact?: boolean;
}

const ServiceTitan[ComponentName]: React.FC<ServiceTitan[ComponentName]Props> = ({
  data,
  onAction,
  compact = false
}) => {
  const styles = {
    // ServiceTitan-inspired styling
    container: 'bg-white border border-gray-300 rounded-sm',
    // Maximum information density
    // Minimal padding and margins
    // Professional gray palette
  };

  return (
    <div className={styles.container}>
      {/* Dense, efficient layout */}
    </div>
  );
};

export default ServiceTitan[ComponentName];
```

### Screenshot Analysis Workflow

When creating components, reference screenshots using this workflow:

1. **Analyze ServiceTitan screenshots**:
   - Measure spacing and density
   - Note interaction patterns
   - Document color usage
   - Identify efficiency features

2. **Study LMN screenshots**:
   - Extract landscape-specific workflows
   - Identify field-worker focused features
   - Note GPS/location integration
   - Avoid consumer-oriented patterns

3. **Review Aspire screenshots**:
   - Document Work Order hierarchy
   - Note commercial B2B patterns
   - Study client management features
   - Analyze cost tracking methods

### Auto-Documentation

Each component generation includes:

```typescript
// Auto-generated documentation comment
/**
 * [ComponentName] - Platform-ERM Component
 * 
 * Variants:
 * - ServiceTitan: Dense, efficient, maximum information display
 * - LMN: Landscape workflows, field-worker focused
 * - Aspire: Commercial hierarchy, Work Order management
 * 
 * Design Decision Log:
 * - [Date]: Initial creation based on [screenshots referenced]
 * - [Date]: Refinements after user testing
 * 
 * Screenshot References:
 * - ServiceTitan: [specific screenshots analyzed]
 * - LMN: [specific screenshots analyzed]  
 * - Aspire: [specific screenshots analyzed]
 * 
 * @see docs/COMPONENT_ITERATIONS.md
 * @see https://github.com/ecdenari/software-references
 */
```

## Command Specifications

### 1. Component Properties

All generated components must include:

```typescript
// Base props interface
interface BaseComponentProps {
  className?: string;
  testId?: string;
  variant?: 'servicetitan' | 'lmn' | 'aspire';
  tenantTheme?: TenantTheme;
}

// Data props specific to component type
interface ComponentDataProps {
  // Component-specific data structure
}

// Interaction props
interface ComponentInteractionProps {
  onClick?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onSelect?: (items: any[]) => void;
}
```

### 2. Styling Standards

Each variant must follow these styling guidelines:

```typescript
// ServiceTitan variant
const serviceTitanStyles = {
  // Dense spacing
  padding: enterpriseTokens.spacing.dense,
  // Professional grays
  colors: enterpriseTokens.colors.gray,
  // Compact typography
  typography: enterpriseTokens.typography.compact,
  // Minimal borders
  borders: '1px solid ' + enterpriseTokens.colors.gray[300],
};

// LMN variant  
const lmnStyles = {
  // Comfortable spacing for field use
  padding: enterpriseTokens.spacing.comfortable,
  // Landscape industry colors
  colors: enterpriseTokens.colors.landscape,
  // Clear, readable typography
  typography: enterpriseTokens.typography.fontSize,
  // Rounded, friendly borders
  borders: 'rounded-lg border-2',
};

// Aspire variant
const aspireStyles = {
  // Professional business spacing
  padding: enterpriseTokens.spacing,
  // Commercial status colors
  colors: enterpriseTokens.colors.status,
  // Clean, hierarchical typography
  typography: enterpriseTokens.typography,
  // Clean, structured borders
  borders: 'rounded-md border',
};
```

### 3. Testing Requirements

Each component generation includes test files:

```typescript
// [ComponentName].test.tsx
describe('[ComponentName] Variants', () => {
  describe('ServiceTitan variant', () => {
    it('displays maximum information density', () => {});
    it('handles large datasets efficiently', () => {});
    it('provides quick actions on hover', () => {});
  });

  describe('LMN variant', () => {
    it('integrates landscape workflows', () => {});
    it('displays field-appropriate information', () => {});
    it('handles GPS/location data', () => {});
  });

  describe('Aspire variant', () => {
    it('shows Work Order hierarchy', () => {});
    it('displays commercial client context', () => {});
    it('handles cost tracking data', () => {});
  });
});
```

## Usage Guidelines

### 1. Before Creating Components

1. **Review reference screenshots** from ecdenari/software-references
2. **Check existing components** for similar patterns
3. **Validate against design system** requirements
4. **Consider multi-tenant implications**

### 2. During Development

1. **Generate all three variants** simultaneously
2. **Test with realistic data** from Platform-ERM
3. **Validate responsive behavior** on different screen sizes
4. **Check accessibility** with screen readers

### 3. After Creation

1. **Document design decisions** in component comments
2. **Update component library** index files
3. **Create Storybook stories** for each variant
4. **Add to UI lab** for comparison testing

## Integration with Existing System

These commands integrate with our current structure:

```
frontend/src/
├── components/
│   ├── iterations/          # Generated variant components
│   ├── ui/                  # Final selected components
│   └── layout/              # Existing layout (preserved)
├── styles/
│   ├── tokens.ts           # Existing tokens (extended)
│   ├── foundations.ts      # Existing foundations (extended)
│   └── enterpriseTokens.ts # New enterprise extensions
└── pages/
    └── ui-lab/             # Component comparison interface
```

## Command Execution Examples

### Example 1: Create Property Management Components
```bash
/ui-component PropertyCard
/ui-component PropertyTable  
/ui-component PropertyForm
/ui-layout PropertyModule
```

### Example 2: Build Work Order System
```bash
/ui-workorder
/ui-component WorkOrderCard
/ui-component WorkTicketList
/ui-component ResourceScheduler
```

### Example 3: Review and Validate
```bash
/ui-review PropertyCard
/ui-review WorkOrderSystem
```

These commands ensure consistent, high-quality UI components that leverage the best practices from ServiceTitan, LMN, and Aspire while maintaining Platform-ERM's design system integrity and multi-tenant architecture.