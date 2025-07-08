import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { useSidebar } from '@/context/SidebarContext'

export default function AppLayout() {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="fixed top-0 left-0 right-0 z-40">
        <Topbar />
      </div>

      <div className="flex pt-16 min-h-screen">
        <Sidebar />
        <main
          className={`transition-all duration-300 flex-1 ${
            collapsed ? 'ml-16' : 'ml-60'
          } p-4`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
