import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { BreadcrumbItem } from '../components/ui/Breadcrumbs'

// Helper function to generate breadcrumbs based on current route
export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation()

  return useMemo(() => {
    const pathnames = location.pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Always start with Dashboard
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/',
    })

    // Build breadcrumbs based on path segments
    let currentPath = ''
    
    for (let i = 0; i < pathnames.length; i++) {
      const segment = pathnames[i]
      currentPath += `/${segment}`
      
      // Map route segments to readable labels
      const label = getSegmentLabel(segment, i, pathnames)
      
      if (label) {
        breadcrumbs.push({
          label,
          href: currentPath,
          current: i === pathnames.length - 1,
        })
      }
    }

    return breadcrumbs
  }, [location.pathname])
}

// Helper function to map route segments to readable labels
function getSegmentLabel(segment: string, index: number, pathnames: string[]): string | null {
  // Main module mappings
  const moduleMap: Record<string, string> = {
    'properties': 'Properties',
    'companies': 'Companies',
    'contacts': 'Contacts',
    'workorders': 'Work Orders',
    'settings': 'Settings',
    'admin': 'Administration',
    'profile': 'Profile',
  }

  // Action mappings
  const actionMap: Record<string, string> = {
    'new': 'New',
    'create': 'Create',
    'edit': 'Edit',
    'view': 'View',
    'details': 'Details',
    'settings': 'Settings',
  }

  // Check if it's a main module
  if (moduleMap[segment]) {
    return moduleMap[segment]
  }

  // Check if it's an action
  if (actionMap[segment]) {
    return actionMap[segment]
  }

  // Check if it's a numeric ID (probably an entity ID)
  if (/^\d+$/.test(segment)) {
    // Try to determine the entity type from the previous segment
    const previousSegment = index > 0 ? pathnames[index - 1] : null
    
    if (previousSegment) {
      const entityMap: Record<string, string> = {
        'properties': 'Property',
        'companies': 'Company',
        'contacts': 'Contact',
        'workorders': 'Work Order',
      }
      
      if (entityMap[previousSegment]) {
        return `${entityMap[previousSegment]} #${segment}`
      }
    }
    
    return `Item #${segment}`
  }

  // For unknown segments, capitalize first letter
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

// Hook for module-specific breadcrumbs
export const useModuleBreadcrumbs = (moduleName: string, additionalItems: BreadcrumbItem[] = []): BreadcrumbItem[] => {
  const baseBreadcrumbs = useBreadcrumbs()
  
  return useMemo(() => {
    return [...baseBreadcrumbs, ...additionalItems]
  }, [baseBreadcrumbs, additionalItems])
}