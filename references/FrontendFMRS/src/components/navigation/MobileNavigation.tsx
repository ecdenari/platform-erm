import { Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  FileText, 
  Droplets,
  Building2,
  Users,
  Layout,
  Calendar,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
}

interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
}

const primaryModules = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 size={20} />,
    path: '/dashboard'
  },
  {
    id: 'site-management',
    label: 'Site Management',
    icon: <FileText size={20} />,
    path: '/site-management'
  },
  {
    id: 'irrigation',
    label: 'Irrigation',
    icon: <Droplets size={20} />,
    path: '/irrigation'
  }
]

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const location = useLocation()
  const { logout } = useAuth()

  if (!isOpen) return null

  const handleLogout = () => {
    logout()
  }

  const isItemActive = (itemPath: string): boolean => {
    if (itemPath === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard'
    }
    return location.pathname === itemPath || location.pathname.startsWith(itemPath + '/')
  }

  const getSecondaryNavItems = (): NavigationItem[] => {
    if (location.pathname.startsWith('/site-management')) {
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

    if (location.pathname.startsWith('/irrigation')) {
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
    }

    return []
  }

  const secondaryNavItems = getSecondaryNavItems()

  return (
    <>
      {/* Mobile Menu */}
      <div className="md:hidden fixed inset-0 z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full pt-12">
          {/* Mobile Menu Header with Close Button */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-900">Navigation</h1>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Primary Navigation */}
          <div className="px-4 py-4">
            <div className="space-y-1">
              {primaryModules.map((module) => {
                const isActive = isItemActive(module.path)
                
                return (
                  <Link
                    key={module.id}
                    to={module.path}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium
                      transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex-shrink-0">
                      {module.icon}
                    </div>
                    <span>{module.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Secondary Navigation */}
          {secondaryNavItems.length > 0 && (
            <div className="px-4 py-4 border-t border-gray-200">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {location.pathname.startsWith('/site-management') ? 'Site Management' : 'Irrigation'}
              </h2>
              <div className="space-y-1">
                {secondaryNavItems.map((item) => {
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                        transition-colors duration-200
                        ${isActive 
                          ? 'bg-green-50 text-green-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex-shrink-0">
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Logout */}
          <div className="mt-auto px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}