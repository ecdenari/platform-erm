import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from '../contexts/SidebarContext'
import { useSubNav } from '../contexts/SubNavContext'
import { tokens } from '../styles/tokens'

export interface SubNavItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
  description?: string
}

interface SubNavProps {
  items: SubNavItem[]
  title?: string
  className?: string
}

const SubNav: React.FC<SubNavProps> = ({ items, title, className = '' }) => {
  const location = useLocation()
  const { collapsed } = useSidebar()
  const { setHasSubNav } = useSubNav()

  // Register SubNav presence with context
  useEffect(() => {
    setHasSubNav(true)
    return () => setHasSubNav(false)
  }, [])

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  // Don't render if no items
  if (items.length === 0) {
    return null
  }

  return (
    <aside
      className={`fixed z-30 border-r transition-all duration-300 ${className}`}
      style={{
        top: tokens.layout.topbarHeight,
        bottom: 0,
        left: collapsed 
          ? tokens.layout.sidebarWidth.collapsed 
          : tokens.layout.sidebarWidth.expanded, // Position after main sidebar
        width: tokens.layout.secondarySidebarWidth,
        backgroundColor: tokens.colors.layout.secondarySidebarBg,
        borderColor: tokens.colors.layout.secondarySidebarBorder,
      }}
    >
      <div className="flex h-full flex-col">
        {/* Title */}
        {title && (
          <div className="border-b border-gray-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
          </div>
        )}

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isActive(item.href)
              const Icon = item.icon

              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150
                      ${active
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-gray-900'
                      }
                    `}
                    title={item.description}
                  >
                    <div className="flex items-center min-w-0">
                      {Icon && (
                        <Icon
                          className={`
                            h-4 w-4 flex-shrink-0 mr-3
                            ${active ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}
                          `}
                        />
                      )}
                      <span className="truncate">{item.name}</span>
                    </div>
                    
                    {/* Count badge */}
                    {typeof item.count === 'number' && (
                      <span
                        className={`
                          ml-2 px-2 py-0.5 text-xs rounded-full
                          ${active
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                          }
                        `}
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default SubNav