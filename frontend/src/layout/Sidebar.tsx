import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from '../contexts/SidebarContext'
import { useTenant } from '../hooks/useTenant'
import { tokens } from '../styles/tokens'
import { 
  Home, 
  MapPin, 
  Building2, 
  Users, 
  ClipboardList,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
    description: 'Overview and analytics'
  },
  {
    name: 'Properties',
    href: '/properties',
    icon: MapPin,
    description: 'Property management'
  },
  {
    name: 'Companies',
    href: '/companies',
    icon: Building2,
    description: 'Company profiles'
  },
  {
    name: 'Contacts',
    href: '/contacts',
    icon: Users,
    description: 'Contact management'
  },
  {
    name: 'Work Orders',
    href: '/workorders',
    icon: ClipboardList,
    description: 'Job scheduling and tracking'
  },
]

const Sidebar: React.FC = () => {
  const { collapsed, toggle } = useSidebar()
  const { tenant } = useTenant()
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <aside
      className="fixed left-0 z-40 border-r transition-all duration-300 ease-in-out"
      style={{
        top: tokens.layout.topbarHeight,
        bottom: 0,
        width: collapsed 
          ? tokens.layout.sidebarWidth.collapsed 
          : tokens.layout.sidebarWidth.expanded,
        backgroundColor: tokens.colors.layout.sidebarBg,
        borderColor: tokens.colors.layout.sidebarBorder,
      }}
    >
      <div className="flex h-full flex-col">
        {/* Collapse toggle button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-zinc-800 hover:text-white transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 pb-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const active = isActive(item.href)
              const Icon = item.icon

              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      group flex items-center rounded-md px-3 py-3 text-sm font-medium transition-colors duration-150
                      ${active
                        ? 'bg-primary-700 text-white'
                        : 'text-slate-300 hover:bg-zinc-800 hover:text-white'
                      }
                    `}
                    title={collapsed ? `${item.name} - ${item.description}` : undefined}
                  >
                    <Icon
                      className={`
                        h-5 w-5 flex-shrink-0
                        ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                        ${collapsed ? '' : 'mr-3'}
                      `}
                    />
                    {!collapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Tenant branding at bottom */}
        {!collapsed && tenant && (
          <div className="border-t border-zinc-800 p-4">
            <div className="flex items-center">
              <div 
                className="h-8 w-8 rounded-md flex items-center justify-center text-white text-sm font-semibold"
                style={{ backgroundColor: tenant.branding.primaryColor }}
              >
                {tenant.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {tenant.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {tenant.subdomain}.platform-erm.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar