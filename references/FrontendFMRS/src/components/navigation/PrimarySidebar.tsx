import { Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  FileText, 
  Droplets,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react'
import { useState } from 'react'

interface SidebarModule {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  hasSubNavigation: boolean
}

const modules: SidebarModule[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 size={20} />,
    path: '/dashboard',
    hasSubNavigation: false
  },
  {
    id: 'site-management',
    label: 'Site Management',
    icon: <FileText size={20} />,
    path: '/site-management',
    hasSubNavigation: true
  },
  {
    id: 'irrigation',
    label: 'Irrigation',
    icon: <Droplets size={20} />,
    path: '/irrigation',
    hasSubNavigation: true
  }
]

interface PrimarySidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
  className?: string
}

export default function PrimarySidebar({ 
  isCollapsed = false, 
  onToggle,
  className = ''
}: PrimarySidebarProps) {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isModuleActive = (module: SidebarModule) => {
    if (module.path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard'
    }
    // Exact path matching for better precision
    if (location.pathname === module.path) {
      return true
    }
    // Only match if path starts with module path followed by /
    return location.pathname.startsWith(module.path + '/')
  }

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={handleMobileToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 z-40
        ${isCollapsed ? 'w-16' : 'w-60'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-gray-800 text-white
        transition-all duration-300 ease-in-out
        flex flex-col
        ${className.includes('top-') ? 'h-[calc(100vh-48px)]' : 'h-screen'}
        ${className}
      `}>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {modules.map((module) => {
              const isActive = isModuleActive(module)
              
              return (
                <Link
                  key={module.id}
                  to={module.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? module.label : undefined}
                >
                  <div className="flex-shrink-0">
                    {module.icon}
                  </div>
                  {!isCollapsed && (
                    <span className="truncate">{module.label}</span>
                  )}
                  {!isCollapsed && module.hasSubNavigation && (
                    <div className="ml-auto">
                      <div className={`
                        w-2 h-2 rounded-full 
                        ${isActive ? 'bg-blue-300' : 'bg-gray-500'}
                      `} />
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Sidebar Toggle Button - Bottom Inside */}
        {onToggle && (
          <div className="hidden md:block p-3">
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeft size={14} className={`transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

      </aside>
    </>
  )
}