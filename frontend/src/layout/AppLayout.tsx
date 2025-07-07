import React from 'react'
import { useSidebar } from '../contexts/SidebarContext'
import { useSubNav } from '../contexts/SubNavContext'
import { tokens } from '../styles/tokens'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { collapsed } = useSidebar()
  const { hasSubNav } = useSubNav()

  const getContentStyles = () => {
    const mainSidebarWidth = collapsed 
      ? tokens.layout.sidebarWidth.collapsed 
      : tokens.layout.sidebarWidth.expanded
    
    const leftOffset = hasSubNav 
      ? `calc(${mainSidebarWidth} + ${tokens.layout.secondarySidebarWidth})`
      : mainSidebarWidth
    
    return {
      position: 'fixed' as const,
      top: tokens.layout.topbarHeight,
      left: leftOffset,
      right: '0px',
      bottom: '0px',
      overflowY: 'auto' as const,
      backgroundColor: '#f9fafb', // gray-50
    }
  }

  return (
    <>
      {/* Fixed Topbar */}
      <Topbar />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main
        className="transition-all duration-300 ease-in-out"
        style={getContentStyles()}
      >
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </>
  )
}

export default AppLayout