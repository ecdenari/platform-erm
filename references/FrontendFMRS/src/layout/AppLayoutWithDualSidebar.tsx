import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import PrimarySidebar from '@/components/navigation/PrimarySidebar'
import SecondarySidebar from '@/components/navigation/SecondarySidebar'
import Breadcrumb from '@/components/navigation/Breadcrumb'
import TopBar from '@/components/navigation/TopBar'
import MobileNavigation from '@/components/navigation/MobileNavigation'

export default function AppLayoutWithDualSidebar() {
  const [isPrimaryCollapsed, setIsPrimaryCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Calculate content margin based on sidebar states
  const getContentMargin = () => {
    // On mobile, don't apply margin since sidebars are overlays
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 0
    }
    
    const primaryWidth = isPrimaryCollapsed ? 64 : 240 // 16 or 60 in px (4px = 1 Tailwind unit)
    const secondaryWidth = shouldShowSecondarySidebar(location.pathname) ? 192 : 0 // w-48 = 192px
    return primaryWidth + secondaryWidth
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <TopBar 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Primary Sidebar - Hidden on Mobile */}
      <div className="hidden md:block">
        <PrimarySidebar 
          isCollapsed={isPrimaryCollapsed}
          onToggle={() => setIsPrimaryCollapsed(!isPrimaryCollapsed)}
          className="top-12" // Account for topbar height
        />
      </div>

      {/* Secondary Sidebar - Hidden on Mobile */}
      {shouldShowSecondarySidebar(location.pathname) && (
        <div 
          className="hidden md:block fixed transition-all duration-300 ease-in-out z-30"
          style={{ 
            left: isPrimaryCollapsed ? '64px' : '240px',
            top: '48px', // Only account for topbar height
            height: 'calc(100vh - 48px)'
          }}
        >
          <SecondarySidebar />
        </div>
      )}

      {/* Main Content Area */}
      <main 
        className="transition-all duration-300 ease-in-out bg-gray-50"
        style={{ 
          marginLeft: `${getContentMargin()}px`,
          marginTop: '48px', // Only account for topbar height
          minHeight: 'calc(100vh - 48px)'
        }}
      >
        {/* Page Header with Breadcrumbs - Reduced height for information density */}
        <header className="bg-white border-b border-gray-200 px-4 py-1.5 h-8 flex items-center">
          <Breadcrumb />
        </header>

        {/* Page Content - Reduced padding for information density */}
        <div className="p-4 max-w-full overflow-x-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

// Helper function to determine if secondary sidebar should be shown
function shouldShowSecondarySidebar(pathname: string): boolean {
  const modulesWithSecondaryNav = ['site-management', 'irrigation', 'admin']
  return modulesWithSecondaryNav.some(module => pathname.startsWith(`/${module}`))
}