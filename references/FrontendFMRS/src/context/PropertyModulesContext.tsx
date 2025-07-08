import { createContext, useContext, ReactNode } from 'react'

export interface PropertyModuleTab {
  id: string
  label: string
  path: string // relative path under property/:id/
  component: React.ComponentType<{ propertyId: string }>
  module: string // module that registered this tab
  permissions?: string[] // optional permissions required to view this tab
  badge?: () => number | undefined // optional function to get badge count
  order?: number // optional order for tab display
}

interface PropertyModulesContextType {
  tabs: PropertyModuleTab[]
  registerTab: (tab: PropertyModuleTab) => void
  unregisterTab: (tabId: string) => void
}

const PropertyModulesContext = createContext<PropertyModulesContextType | undefined>(undefined)

export function usePropertyModules() {
  const context = useContext(PropertyModulesContext)
  if (!context) {
    throw new Error('usePropertyModules must be used within PropertyModulesProvider')
  }
  return context
}

interface PropertyModulesProviderProps {
  children: ReactNode
}

// Global registry for property tabs from different modules
const propertyTabRegistry: PropertyModuleTab[] = []

export function PropertyModulesProvider({ children }: PropertyModulesProviderProps) {
  const registerTab = (tab: PropertyModuleTab) => {
    // Check if tab already exists
    const existingIndex = propertyTabRegistry.findIndex(t => t.id === tab.id)
    if (existingIndex >= 0) {
      // Update existing tab
      propertyTabRegistry[existingIndex] = tab
    } else {
      // Add new tab
      propertyTabRegistry.push(tab)
    }
    // Sort tabs by order
    propertyTabRegistry.sort((a, b) => (a.order || 999) - (b.order || 999))
  }

  const unregisterTab = (tabId: string) => {
    const index = propertyTabRegistry.findIndex(t => t.id === tabId)
    if (index >= 0) {
      propertyTabRegistry.splice(index, 1)
    }
  }

  return (
    <PropertyModulesContext.Provider value={{ tabs: propertyTabRegistry, registerTab, unregisterTab }}>
      {children}
    </PropertyModulesContext.Provider>
  )
}

// Module registration helpers
export function registerSiteManagementTabs() {
  const context = usePropertyModules()
  
  // Register Site Reports tab
  context.registerTab({
    id: 'site-reports',
    label: 'Site Reports',
    path: 'site-reports',
    component: () => null, // Will be replaced with actual component
    module: 'site-management',
    order: 1,
    badge: () => undefined // TODO: Get actual count from API
  })
  
  // Register Customer Reports tab
  context.registerTab({
    id: 'customer-reports',
    label: 'Customer Reports',
    path: 'customer-reports',
    component: () => null, // Will be replaced with actual component
    module: 'site-management',
    order: 2,
    badge: () => undefined // TODO: Get actual count from API
  })
  
  // Register Schedule tab (future)
  context.registerTab({
    id: 'schedule',
    label: 'Report Schedule',
    path: 'schedule',
    component: () => null, // Will be replaced with actual component
    module: 'site-management',
    order: 3
  })
}

// Example: How other modules would register their tabs
export function registerIrrigationTabs() {
  const context = usePropertyModules()
  
  context.registerTab({
    id: 'irrigation-controllers',
    label: 'Controllers',
    path: 'controllers',
    component: () => null, // Will be replaced with actual component
    module: 'irrigation',
    order: 10,
    badge: () => undefined // TODO: Get controller count
  })
  
  context.registerTab({
    id: 'irrigation-zones',
    label: 'Zones',
    path: 'zones',
    component: () => null, // Will be replaced with actual component
    module: 'irrigation',
    order: 11
  })
}

export function registerEquipmentTabs() {
  const context = usePropertyModules()
  
  context.registerTab({
    id: 'equipment-assets',
    label: 'Equipment',
    path: 'equipment',
    component: () => null, // Will be replaced with actual component
    module: 'equipment',
    order: 20,
    badge: () => undefined // TODO: Get equipment count
  })
}