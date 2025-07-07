// src/components/Sidebar.tsx
import { NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  LayoutDashboard,
  Droplet,
  BarChart,
  Tractor,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  FileBarChart,
  Building2,
  Map as MapIcon,
} from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useSidebar } from '@/context/SidebarContext'

type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const topLevelModules: Record<string, NavItem> = {
  'site-management': { name: 'Site Management', href: '/site-management', icon: LayoutDashboard },
  sales: { name: 'Sales', href: '/sales', icon: BarChart },
  equipment: { name: 'Equipment', href: '/equipment', icon: Tractor },
  irrigation: { name: 'Irrigation', href: '/irrigation', icon: Droplet },
  properties: { name: 'Properties', href: '/properties', icon: Building2 },
}

const subNavItems: Record<string, NavItem[]> = {
  'site-management': [
    { name: 'Overview', href: '/site-management', icon: LayoutDashboard },
    { name: 'Site Reports', href: '/site-management/site-reports', icon: ClipboardList },
    { name: 'Customer Reports', href: '/site-management/customer-reports', icon: FileBarChart },
  ],
  irrigation: [
    { name: 'Overview', href: '/irrigation', icon: Droplet },
    { name: 'Controllers', href: '/irrigation/controllers', icon: Droplet },
    { name: 'Properties', href: '/irrigation/properties', icon: Droplet },
    { name: 'Inspection', href: '/irrigation/inspection', icon: Droplet },
    { name: 'Reports', href: '/irrigation/reports', icon: Droplet },
  ],
}

export function Sidebar() {
  const location = useLocation()
  const { collapsed, toggle } = useSidebar()
  const currentTop = location.pathname.split('/')[1]
  const subItems: NavItem[] = subNavItems[currentTop] || []

  return (
    <Tooltip.Provider delayDuration={100}>
      <aside
        className={`${
          collapsed ? 'w-16' : 'w-60'
        } bg-zinc-900 text-slate-100 fixed top-16 bottom-0 left-0 flex flex-col transition-all duration-300 z-50 overflow-hidden`}
      >
        {/* Collapse Button */}
        <div className="flex justify-end px-2 py-3">
          <button onClick={toggle} className="text-slate-300 hover:text-slate-100">
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex flex-col flex-grow overflow-hidden">
          <nav className="flex flex-col px-2 gap-1 overflow-hidden">
            {/* Dashboard Link */}
            <SidebarItem
              to="/dashboard"
              icon={Home}
              name="Dashboard"
              active={location.pathname === '/dashboard'}
              collapsed={collapsed}
              isMain
            />

            <div className="border-t border-slate-700/50 my-3" />

            {/* Top-Level Modules */}
            {Object.values(topLevelModules).map(({ name, href, icon }) => {
              const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`)
              return (
                <SidebarItem
                  key={href}
                  to={href}
                  icon={icon}
                  name={name}
                  active={isActive}
                  collapsed={collapsed}
                  isMain
                />
              )
            })}

            {/* Subnav */}
            {subItems.length > 0 && (
              <div className="mt-3 border-t border-slate-700/50 pt-2 space-y-1">
                {subItems.map(({ name, href, icon }) => {
                  const isTopLevelOverview = href === `/${currentTop}`
                  const isActive = isTopLevelOverview
                    ? location.pathname === href
                    : location.pathname === href || location.pathname.startsWith(`${href}/`)

                  return (
                    <SidebarItem
                      key={href}
                      to={href}
                      icon={icon}
                      name={name}
                      active={isActive}
                      collapsed={collapsed}
                      isMain={false}
                    />
                  )
                })}
              </div>
            )}
          </nav>

          {/* Footer Branding */}
          <div className="mt-auto px-2 py-4 text-xs text-slate-400 text-center">
            <div
              className={`transition-opacity duration-300 ${
                collapsed ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Powered by Fieldpoint
            </div>
          </div>
        </div>
      </aside>
    </Tooltip.Provider>
  )
}

function SidebarItem({
  to,
  icon: Icon,
  name,
  active,
  collapsed,
  isMain,
}: {
  to: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  name: string
  active: boolean
  collapsed: boolean
  isMain: boolean
}) {
  const link = (
    <NavLink
      to={to}
      className={`relative flex items-center ${
        isMain ? 'py-2.5 text-[15px] font-medium' : 'py-1.5 text-sm'
      } px-3 rounded-[5px] transition-colors duration-300 ${
        active
          ? isMain
            ? 'bg-green-700 text-white'
            : 'border-l-2 border-green-600 bg-zinc-700/60 text-white pl-3'
          : 'text-slate-300 hover:bg-zinc-800 hover:text-slate-100'
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <Icon className={`${isMain ? 'w-5 h-5' : 'w-4 h-4'}`} />
      </div>

      {/* Label wrapper */}
      <div
        className={`
          absolute left-12
          transition-all duration-300 ease-in-out
          ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
        `}
        style={{
          pointerEvents: collapsed ? 'none' : 'auto',
          transitionDelay: collapsed ? '0ms' : '75ms',
        }}
      >
        <span className="whitespace-nowrap">{name}</span>
      </div>
    </NavLink>
  )

  return collapsed ? (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{link}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          align="center"
          className="px-2 py-1 rounded-md bg-zinc-900 text-slate-100 text-sm shadow-md z-50"
        >
          {name}
          <Tooltip.Arrow className="fill-zinc-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  ) : (
    link
  )
}
