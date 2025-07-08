import { Link, useLocation, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { usePropertiesWithReports } from '@/hooks/api/useSiteManagement'

interface BreadcrumbItem {
  label: string
  path?: string
}

export default function Breadcrumb() {
  const location = useLocation()
  const params = useParams()
  const { data: properties } = usePropertiesWithReports()
  
  const breadcrumbItems = generateBreadcrumbs(location.pathname, params, properties)

  if (breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <nav className="flex items-center text-sm text-gray-600">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.path ? (
            <Link 
              to={item.path} 
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  )
}

function generateBreadcrumbs(
  pathname: string, 
  params: any, 
  properties?: any[]
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  // Handle different route patterns
  if (segments[0] === 'site-management') {
    breadcrumbs.push({
      label: 'Site Management',
      path: '/site-management'
    })

    if (segments[1] === 'properties') {
      if (segments[2]) {
        // Property detail page
        const propertyId = segments[2]
        const property = properties?.find(p => 
          (p.propertyID || p.id)?.toString() === propertyId
        )
        
        breadcrumbs.push({
          label: 'Properties',
          path: '/site-management/properties'
        })
        
        breadcrumbs.push({
          label: property?.propertyName || `Property ${propertyId}`,
          path: `/site-management/properties/${propertyId}`
        })

        // Property sub-pages
        if (segments[3]) {
          const subPageLabels: Record<string, string> = {
            'site-reports': 'Site Reports',
            'customer-reports': 'Customer Reports',
            'schedule': 'Schedule'
          }
          
          if (segments[3] === 'site-reports' && segments[4] === 'create') {
            breadcrumbs.push({
              label: 'Site Reports',
              path: `/site-management/properties/${propertyId}/site-reports`
            })
            breadcrumbs.push({
              label: segments[5] ? 'Create from Template' : 'Create Report'
            })
          } else if (subPageLabels[segments[3]]) {
            breadcrumbs.push({
              label: subPageLabels[segments[3]]
            })
          }
        }
      } else {
        // Properties list
        breadcrumbs.push({
          label: 'Properties'
        })
      }
    } else if (segments[1] === 'site-reports') {
      breadcrumbs.push({
        label: 'Site Reports'
      })
    } else if (segments[1] === 'customer-reports') {
      breadcrumbs.push({
        label: 'Customer Reports'
      })
    } else if (segments[1] === 'templates') {
      breadcrumbs.push({
        label: 'Templates'
      })
    }
  } else if (segments[0] === 'irrigation') {
    breadcrumbs.push({
      label: 'Irrigation',
      path: '/irrigation'
    })

    const irrigationPages: Record<string, string> = {
      'controllers': 'Controllers',
      'properties': 'Properties',
      'inspection': 'Inspection',
      'reports': 'Reports'
    }

    if (segments[1] && irrigationPages[segments[1]]) {
      breadcrumbs.push({
        label: irrigationPages[segments[1]]
      })
    }
  } else if (segments[0] === 'admin') {
    breadcrumbs.push({
      label: 'Administration',
      path: '/admin'
    })

    const adminPages: Record<string, string> = {
      'users': 'Users',
      'roles': 'Roles',
      'company-settings': 'Company Settings',
      'site-management': 'Site Management Settings'
    }

    if (segments[1] && adminPages[segments[1]]) {
      breadcrumbs.push({
        label: adminPages[segments[1]]
      })
    }
  } else if (segments[0] === 'dashboard') {
    breadcrumbs.push({
      label: 'Dashboard'
    })
  } else if (segments[0] === 'profile') {
    breadcrumbs.push({
      label: 'Profile',
      path: '/profile'
    })

    const profilePages: Record<string, string> = {
      'security': 'Security',
      'preferences': 'Preferences'
    }

    if (segments[1] && profilePages[segments[1]]) {
      breadcrumbs.push({
        label: profilePages[segments[1]]
      })
    }
  }

  return breadcrumbs
}