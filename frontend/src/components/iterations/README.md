# Component Iterations Directory

This directory contains three-platform inspired component variants for Platform-ERM.

## Structure

Each component gets its own subdirectory with three variants:

```
ComponentName/
├── ComponentNameServiceTitan.tsx    # Dense, efficient variant
├── ComponentNameLMN.tsx             # Landscape workflow variant
├── ComponentNameAspire.tsx          # Commercial hierarchy variant
├── ComponentNameLab.tsx             # Comparison testing component
├── types.ts                         # Shared TypeScript interfaces
├── index.ts                         # Export all variants
└── README.md                        # Component-specific documentation
```

## Usage

### Creating New Component Iterations

Use the `/ui-component` command or follow this pattern:

```typescript
// 1. Define shared types
interface ComponentProps {
  data: ComponentData[];
  onAction?: (id: string, action: string) => void;
  variant?: 'servicetitan' | 'lmn' | 'aspire';
}

// 2. Create three variants following platform patterns
// ServiceTitan: Maximum density, minimal padding
// LMN: Comfortable spacing, landscape-specific features
// Aspire: Commercial hierarchy, B2B workflows

// 3. Create lab component for comparison testing
// 4. Export all variants from index.ts
```

### Component Naming Convention

- **ServiceTitan variant**: Focus on density and efficiency
- **LMN variant**: Focus on landscape workflows and field use
- **Aspire variant**: Focus on commercial hierarchy and B2B context

### Design Guidelines

1. **ServiceTitan Variant**:
   - Compact spacing (2-8px padding)
   - Small text (11-13px)
   - Professional grays
   - Maximum information density
   - Hover actions for efficiency

2. **LMN Variant**:
   - Comfortable spacing (8-16px padding)
   - Clear typography (14-16px)
   - Landscape-appropriate colors
   - GPS/weather integration ready
   - Field-worker friendly

3. **Aspire Variant**:
   - Professional spacing (12-16px padding)
   - Clean typography (13-15px)
   - Commercial color palette
   - Hierarchy indicators
   - B2B workflow support

## Testing Components

Use the UI Lab to compare variants side-by-side:

```typescript
// Navigate to /ui-lab in your application
// Select component type to compare
// View all three variants with sample data
// Document which patterns work best
```

## Integration Process

1. **Develop all three variants**
2. **Test with realistic Platform-ERM data**
3. **Gather feedback from team/users**
4. **Combine best features from multiple variants**
5. **Create final component in ../ui/ directory**
6. **Document decision rationale**

## Current Components

- [ ] PropertyCard
- [ ] DataTable
- [ ] WorkOrderCard
- [ ] PropertyForm
- [ ] WorkOrderForm
- [ ] ResourceScheduler
- [ ] StatusIndicator
- [ ] ActionMenu

Add new components to this list as they are created.