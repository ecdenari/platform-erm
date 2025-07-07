import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTenant } from '../hooks/useTenant'
import { tokens } from '../styles/tokens'
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Building2
} from 'lucide-react'

// Mock user data - in real app this would come from auth context
const mockUser = {
  name: 'John Doe',
  email: 'john@demo.com',
  role: 'Admin',
  initials: 'JD'
}

const Topbar: React.FC = () => {
  const { tenant } = useTenant()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked')
    setUserMenuOpen(false)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        height: tokens.layout.topbarHeight,
        backgroundColor: tokens.colors.layout.topbarBg,
        borderColor: tokens.colors.layout.topbarBorder,
        boxShadow: tokens.colors.layout.topbarShadow,
      }}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Logo and branding */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
            {tenant?.branding.logo ? (
              <img
                src={tenant.branding.logo}
                alt={`${tenant.name} logo`}
                className="h-8 w-auto"
              />
            ) : (
              <div 
                className="h-8 w-8 rounded-md flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: tenant?.branding.primaryColor || tokens.colors.primary[600] }}
              >
                {tenant?.name.substring(0, 2).toUpperCase() || 'PE'}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900">
                Platform-ERM
              </span>
              {tenant && (
                <span className="text-xs text-gray-500">
                  {tenant.name}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
          >
            {/* User avatar */}
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
              {mockUser.initials}
            </div>
            
            {/* User info */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {mockUser.name}
              </p>
              <p className="text-xs text-gray-500">
                {mockUser.role}
              </p>
            </div>

            <ChevronDown 
              className={`h-4 w-4 text-gray-500 transition-transform ${
                userMenuOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {/* Dropdown menu */}
          {userMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setUserMenuOpen(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                <div className="py-1">
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {mockUser.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {mockUser.email}
                    </p>
                  </div>

                  {/* Menu items */}
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>

                  {/* Tenant management - only for admins */}
                  {mockUser.role === 'Admin' && (
                    <Link
                      to="/admin/tenant"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Building2 className="mr-3 h-4 w-4" />
                      Tenant Settings
                    </Link>
                  )}

                  <div className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar