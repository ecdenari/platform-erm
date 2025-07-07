# Extending Property Detail Pages

The property detail page is designed as a central hub that can be extended by any module in the Fieldpoint platform. This document explains how to add your module's functionality to property detail pages.

## Architecture Overview

The property detail page provides:
- Property overview information (always visible)
- Tabbed navigation for module-specific content
- Consistent breadcrumb navigation
- Shared property context via React Router outlets

## Adding Your Module's Tab

### 1. Create Your Tab Component

Create a component in your module that will be displayed as a tab:

```tsx
// src/modules/irrigation/tabs/PropertyIrrigation.tsx
import { useOutletContext } from 'react-router-dom'
import { PropertyWithReports } from '@/hooks/api/useSiteManagement'

interface PropertyContext {
  property: PropertyWithReports
}

export default function PropertyIrrigation() {
  const { property } = useOutletContext<PropertyContext>()
  
  return (
    <div>
      <h3>Irrigation Equipment for {property.propertyName}</h3>
      {/* Your irrigation-specific content here */}
    </div>
  )
}
```

### 2. Update Property Tabs Configuration

Add your tab to the PROPERTY_TABS array in `PropertyDetailLayout.tsx`:

```tsx
export const PROPERTY_TABS: PropertyTab[] = [
  { path: '', label: 'Overview', exact: true },
  { path: '/site-reports', label: 'Site Reports' },
  { path: '/customer-reports', label: 'Customer Reports' },
  { path: '/schedule', label: 'Report Schedule' },
  
  // Add your module's tab
  { path: '/irrigation', label: 'Irrigation' },
  { path: '/equipment', label: 'Equipment' },
  { path: '/maintenance', label: 'Maintenance' },
]
```

### 3. Add Routes

Update the routing in `routes.tsx` to include your tab:

```tsx
{
  path: "properties/:id",
  element: <PropertyDetailLayout />,
  children: [
    { index: true, element: <PropertyOverview /> },
    { path: "site-reports", element: <PropertySiteReports /> },
    { path: "customer-reports", element: <PropertyCustomerReports /> },
    { path: "schedule", element: <PropertyReportSchedule /> },
    
    // Add your module's route
    { path: "irrigation", element: <PropertyIrrigation /> },
    { path: "equipment", element: <PropertyEquipment /> },
  ],
}
```

## Best Practices

### 1. Use Property Context

Always get the property data from the outlet context:

```tsx
const { property } = useOutletContext<PropertyContext>()
```

### 2. Module-Specific Data

Fetch your module's data using the property ID:

```tsx
const { data: controllers } = useControllersByProperty(property.propertyID)
```

### 3. Consistent UI

Follow the established patterns for cards, tables, and actions:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Your Module Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
</Card>
```

### 4. Loading States

Handle loading and empty states consistently:

```tsx
if (isLoading) {
  return <div>Loading...</div>
}

if (!data || data.length === 0) {
  return (
    <div className="text-center py-12">
      <p>No data found</p>
    </div>
  )
}
```

## Example: Equipment Module Integration

Here's a complete example of how the Equipment module would add its functionality:

```tsx
// src/modules/equipment/tabs/PropertyEquipment.tsx
import { useOutletContext } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { PropertyWithReports } from '@/hooks/api/useSiteManagement'
import { useEquipmentByProperty } from '@/hooks/api/useEquipment'

interface PropertyContext {
  property: PropertyWithReports
}

export default function PropertyEquipment() {
  const { property } = useOutletContext<PropertyContext>()
  const { data: equipment, isLoading } = useEquipmentByProperty(property.propertyID)
  
  if (isLoading) {
    return <div>Loading equipment...</div>
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipment at {property.propertyName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {equipment?.map(item => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.type}</p>
                <p className="text-sm mt-2">Status: {item.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

## Benefits of This Architecture

1. **Centralized Property Context**: All modules share the same property data
2. **Consistent Navigation**: Users always know where they are
3. **Module Independence**: Each module manages its own tab content
4. **Easy Extension**: New modules can be added without modifying core files
5. **Performance**: Only loads module data when tab is active

## Future Enhancements

- Dynamic tab registration via context providers
- Permission-based tab visibility
- Tab badges with counts (e.g., "Equipment (5)")
- Module-specific quick actions in property overview
- Cross-module data sharing via property context