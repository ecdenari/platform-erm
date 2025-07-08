import { Menu, Transition } from '@headlessui/react'
import { ChevronDown, LogOut, User, Settings, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useCompanySettings } from '@/hooks/api/useCompanySettings'

function Topbar() {
  const { user, logout, isPlatformAdmin, canAccessModule } = useAuth()
  const { data: companySettings } = useCompanySettings()
  
  // Get company logo
  const logoSrc = companySettings?.data?.primaryLogoPath 
    ? `${import.meta.env.VITE_API_BASE_URL}${companySettings.data.primaryLogoPath}`
    : '/puregreen-logo.png'
  
  // Get user initials from authenticated user
  const getUserInitials = () => {
    if (!user) return 'U'
    const firstName = user.firstName || ''
    const lastName = user.lastName || ''
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || user.email[0].toUpperCase()
  }
  
  const userInitials = getUserInitials()
  
  // For topbar, show first name only, fallback to email if no first name
  const topbarDisplayName = user?.firstName || user?.email || 'User'
  
  // For dropdown, show full name
  const fullDisplayName = user ? `${user.firstName} ${user.lastName}`.trim() || user.email : 'User'

  return (
    <header className="z-40 h-16 w-full bg-slate-50 border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      <Link to="/" className="flex items-center">
        <img 
          src={logoSrc} 
          alt={companySettings?.data?.name || "Fieldpoint"} 
          className="h-8 max-w-[200px] object-contain"
          onError={(e) => { e.currentTarget.src = "/puregreen-logo.png" }}
        />
      </Link>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-0">
          <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
            {userInitials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-slate-900">{topbarDisplayName}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 transition-transform ui-open:rotate-180" />
        </Menu.Button>
        
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-64 bg-white shadow-lg border border-slate-200 rounded-lg divide-y divide-slate-100 focus:outline-none z-50">
            {/* User Info Section */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {userInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{fullDisplayName}</div>
                  <div className="text-sm text-slate-500">{user?.email}</div>
                  <div className="text-xs text-green-600 font-medium">{user?.role}</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link 
                    to="/profile" 
                    className={`${active ? 'bg-slate-50' : ''} group flex items-center px-4 py-2 text-sm text-slate-700 transition-colors`}
                  >
                    <User className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-500" />
                    Profile Settings
                  </Link>
                )}
              </Menu.Item>
              
              {canAccessModule('admin') && (
                <Menu.Item>
                  {({ active }) => (
                    <Link 
                      to="/admin" 
                      className={`${active ? 'bg-slate-50' : ''} group flex items-center px-4 py-2 text-sm text-slate-700 transition-colors`}
                    >
                      <Shield className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-500" />
                      Admin Panel
                    </Link>
                  )}
                </Menu.Item>
              )}
              
              {isPlatformAdmin() && (
                <Menu.Item>
                  {({ active }) => (
                    <Link 
                      to="/admin/settings" 
                      className={`${active ? 'bg-slate-50' : ''} group flex items-center px-4 py-2 text-sm text-slate-700 transition-colors`}
                    >
                      <Settings className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-500" />
                      Platform Settings
                    </Link>
                  )}
                </Menu.Item>
              )}
            </div>

            {/* Logout Section */}
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button 
                    onClick={logout}
                    className={`${active ? 'bg-red-50 text-red-700' : 'text-slate-700'} group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                  >
                    <LogOut className={`mr-3 h-4 w-4 ${active ? 'text-red-500' : 'text-slate-400'} group-hover:text-red-500`} />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  )
}

export default Topbar