import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { User, Shield, Settings } from 'lucide-react'
import PageContainer from '@/layout/PageContainer'
import PageHeader from '@/components/PageHeader'
import { useAuth } from '@/hooks/useAuth'

const tabs = [
  {
    id: 'personal',
    label: 'Personal Information',
    icon: User,
    path: '/profile',
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    path: '/profile/security',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Settings,
    path: '/profile/preferences',
  },
]

export default function ProfileLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (location.pathname === '/profile') return 'personal'
    if (location.pathname.includes('/security')) return 'security'
    if (location.pathname.includes('/preferences')) return 'preferences'
    return 'personal'
  }

  const activeTab = getActiveTab()

  const handleTabChange = (tabPath: string) => {
    navigate(tabPath)
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Profile Settings"
        description="Manage your personal information, security settings, and preferences"
      />
      
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Profile settings tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.path)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${isActive
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </PageContainer>
  )
}