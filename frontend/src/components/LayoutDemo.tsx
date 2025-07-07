import React from 'react'
import { useSidebar } from '../contexts/SidebarContext'
import { useTenant } from '../hooks/useTenant'

const LayoutDemo: React.FC = () => {
  const { collapsed, toggle } = useSidebar()
  const { tenant } = useTenant()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Layout System Demo</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Sidebar State</h3>
            <p className="text-sm text-gray-600 mb-2">
              Current state: <span className="font-medium">{collapsed ? 'Collapsed' : 'Expanded'}</span>
            </p>
            <button 
              onClick={toggle}
              className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
            >
              Toggle Sidebar
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Tenant Info</h3>
            <p className="text-sm text-gray-600">
              Name: <span className="font-medium">{tenant?.name || 'Not loaded'}</span>
            </p>
            <p className="text-sm text-gray-600">
              Subdomain: <span className="font-medium">{tenant?.subdomain || 'Not loaded'}</span>
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Layout Features</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>✅ Fixed topbar with tenant branding</li>
            <li>✅ Collapsible sidebar with persistent state</li>
            <li>✅ Secondary navigation (SubNav) on properties page</li>
            <li>✅ Responsive content margins</li>
            <li>✅ Breadcrumb navigation</li>
            <li>✅ Page layout with actions</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Test Navigation</h3>
          <p className="text-sm text-blue-700 mb-3">
            Navigate to the Properties page to see the secondary navigation (SubNav) in action.
            The SubNav should appear on the left side (between main sidebar and content) with module-specific navigation items.
          </p>
          <div className="space-x-2">
            <a 
              href="/properties" 
              className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Go to Properties
            </a>
            <a 
              href="/properties/map" 
              className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Properties Map
            </a>
            <a 
              href="/properties/reports" 
              className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Properties Reports
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutDemo