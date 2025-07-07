import { Link, useLocation, useParams } from 'react-router-dom'
import { 
  BarChart3, 
  Building2, 
  FileText, 
  Users, 
  Layout,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  badge?: string
}

interface SecondarySidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
  className?: string
}

export default function SecondarySidebar({ 
  isCollapsed = false, 
  onToggle,
  className = ''
}: SecondarySidebarProps) {
  const location = useLocation()
  const params = useParams()
  
  // Determine current module context
  const currentModule = getCurrentModule(location.pathname)
  
  // Get navigation items based on context
  const navigationItems = getNavigationItems(currentModule, params)
  
  // Don't render if no navigation items or not in a module that needs secondary nav
  if (!navigationItems.length || !shouldShowSecondarySidebar(location.pathname)) {
    return null
  }

  return (
    <aside className={`
      w-48
      bg-white border-r border-gray-200
      transition-all duration-300 ease-in-out
      flex flex-col
      h-screen
      relative
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide leading-tight">
          {getContextTitle(currentModule, params)}
        </h2>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = isItemActive(item.path, location.pathname)
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex-shrink-0 text-gray-400">
                  {item.icon}
                </div>
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

// Helper functions
function getCurrentModule(pathname: string): string {
  if (pathname.startsWith('/site-management')) return 'site-management'
  if (pathname.startsWith('/irrigation')) return 'irrigation'
  if (pathname.startsWith('/admin')) return 'admin'
  return ''
}

function shouldShowSecondarySidebar(pathname: string): boolean {
  const modulesWithSecondaryNav = ['site-management', 'irrigation', 'admin']
  return modulesWithSecondaryNav.some(module => pathname.startsWith(`/${module}`))
}

function getContextTitle(module: string, params: any): string {
  switch (module) {
    case 'site-management':
      if (params.id) {
        return 'Property'
      }
      return 'Site Management'
    case 'irrigation':
      return 'Irrigation'
    case 'admin':
      return 'Administration'
    default:
      return ''
  }
}

function getNavigationItems(module: string, params: any): NavigationItem[] {
  switch (module) {
    case 'site-management':
      if (params.id) {
        // Property context navigation
        return [
          {
            id: 'overview',
            label: 'Overview',
            icon: <BarChart3 size={16} />,
            path: `/site-management/properties/${params.id}`
          },
          {
            id: 'site-reports',
            label: 'Site Reports',
            icon: <FileText size={16} />,
            path: `/site-management/properties/${params.id}/site-reports`
          },
          {
            id: 'customer-reports',
            label: 'Customer Reports',
            icon: <Users size={16} />,
            path: `/site-management/properties/${params.id}/customer-reports`
          },
          {
            id: 'schedule',
            label: 'Schedule',
            icon: <Calendar size={16} />,
            path: `/site-management/properties/${params.id}/schedule`
          }
        ]
      } else {
        // Site Management module navigation
        return [
          {
            id: 'overview',
            label: 'Overview',
            icon: <BarChart3 size={16} />,
            path: '/site-management'
          },
          {
            id: 'properties',
            label: 'Properties',
            icon: <Building2 size={16} />,
            path: '/site-management/properties'
          },
          {
            id: 'site-reports',
            label: 'Site Reports',
            icon: <FileText size={16} />,
            path: '/site-management/site-reports'
          },
          {
            id: 'customer-reports',
            label: 'Customer Reports',
            icon: <Users size={16} />,
            path: '/site-management/customer-reports'
          },
          {
            id: 'templates',
            label: 'Templates',
            icon: <Layout size={16} />,
            path: '/site-management/templates'
          }
        ]
      }

    case 'irrigation':
      return [
        {
          id: 'overview',
          label: 'Overview',
          icon: <BarChart3 size={16} />,
          path: '/irrigation'
        },
        {
          id: 'controllers',
          label: 'Controllers',
          icon: <FileText size={16} />,
          path: '/irrigation/controllers'
        },
        {
          id: 'properties',
          label: 'Properties',
          icon: <Building2 size={16} />,
          path: '/irrigation/properties'
        },
        {
          id: 'inspection',
          label: 'Inspection',
          icon: <FileText size={16} />,
          path: '/irrigation/inspection'
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: <FileText size={16} />,
          path: '/irrigation/reports'
        }
      ]

    case 'admin':
      return [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: <BarChart3 size={16} />,
          path: '/admin'
        },
        {
          id: 'users',
          label: 'Users',
          icon: <Users size={16} />,
          path: '/admin/users'
        },
        {
          id: 'roles',
          label: 'Roles',
          icon: <FileText size={16} />,
          path: '/admin/roles'
        },
        {
          id: 'company',
          label: 'Company Settings',
          icon: <Building2 size={16} />,
          path: '/admin/company-settings'
        },
        {
          id: 'site-management',
          label: 'Site Management',
          icon: <FileText size={16} />,
          path: '/admin/site-management'
        }
      ]

    default:
      return []
  }
}

function isItemActive(itemPath: string, currentPath: string): boolean {
  // Exact match only - no prefix matching
  return itemPath === currentPath
}