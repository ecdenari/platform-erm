import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Settings, LogOut, HelpCircle, Menu, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface TopBarProps {
  onMobileMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export default function TopBar({ onMobileMenuToggle, isMobileMenuOpen }: TopBarProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  
  // Get real user data from auth context
  const { user, logout, hasModuleAdminAccess } = useAuth()

  const handleProfileToggle = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleLogout = () => {
    logout()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileDropdownOpen])

  // Check if user has admin access
  const hasAdminAccess = user ? hasModuleAdminAccess('admin', 'read') : false

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'Guest'
    return `${user.firstName} ${user.lastName}`.trim() || user.email
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'G'
    const firstName = user.firstName || ''
    const lastName = user.lastName || ''
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.email.charAt(0).toUpperCase()
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-12 flex items-center justify-between px-4 z-50">
      {/* Mobile: Hamburger + Centered Logo */}
      <div className="md:hidden flex items-center justify-between w-full">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          title={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src={user?.company?.logoUrl || "/puregreen-logo.png"} 
            alt={`${user?.company?.name || "PureGreen"} Logo`}
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Empty space for balance */}
        <div className="w-10"></div>
      </div>

      {/* Desktop: Logo Left + Profile Right */}
      <div className="hidden md:flex items-center justify-between w-full px-2">
        {/* Desktop Logo */}
        <div className="flex items-center h-full py-2">
          <img 
            src={user?.company?.logoUrl || "/puregreen-logo.png"} 
            alt={`${user?.company?.name || "PureGreen"} Logo`}
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Desktop Profile and Help */}
        <div className="flex items-center gap-3">
          {/* Help/Knowledge Base Placeholder */}
          <button
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Help & Support (Coming Soon)"
          >
            <HelpCircle size={18} />
          </button>

          {/* Profile Section */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={handleProfileToggle}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {/* User Avatar */}
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {getUserInitials()}
                </span>
              </div>
              
              <div className="text-left">
                <p className="truncate font-medium">{getUserDisplayName()}</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* Profile/Settings Option */}
                <Link
                  to="/profile"
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} />
                  <span>Profile & Settings</span>
                </Link>

                {/* Admin Option (if user has admin access) */}
                {hasAdminAccess && (
                  <Link
                    to="/admin"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} />
                    <span>Administration</span>
                  </Link>
                )}

                {/* Divider */}
                <div className="my-1 border-t border-gray-100" />

                {/* Logout Option */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}