import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLayout from '../layout/PageLayout'
import SubNav, { SubNavItem } from '../layout/SubNav'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { 
  Plus, 
  List, 
  Map, 
  BarChart3, 
  Settings 
} from 'lucide-react'

// Sub-navigation items for Properties module
const propertySubNavItems: SubNavItem[] = [
  {
    name: 'All Properties',
    href: '/properties',
    icon: List,
    count: 24,
    description: 'View all properties'
  },
  {
    name: 'Map View',
    href: '/properties/map',
    icon: Map,
    description: 'Properties on map'
  },
  {
    name: 'Reports',
    href: '/properties/reports',
    icon: BarChart3,
    description: 'Property analytics'
  },
  {
    name: 'Settings',
    href: '/properties/settings',
    icon: Settings,
    description: 'Property configuration'
  },
]

// Sub-components
const PropertiesList: React.FC = () => {
  const breadcrumbs = useBreadcrumbs()
  
  const actions = (
    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
      <Plus className="h-4 w-4 mr-2" />
      Add Property
    </button>
  )

  return (
    <PageLayout
      title="Properties"
      description="Manage your property portfolio with location tracking and property details."
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Properties List</h3>
          <p className="text-gray-600">
            Properties list view will be implemented here. This will include property management, 
            location tracking, and property details.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

const PropertiesMap: React.FC = () => {
  const breadcrumbs = useBreadcrumbs()

  return (
    <PageLayout
      title="Properties Map"
      description="View properties on an interactive map."
      breadcrumbs={breadcrumbs}
    >
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Properties Map</h3>
          <p className="text-gray-600">
            Interactive map with property locations would be displayed here.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

const PropertiesReports: React.FC = () => {
  const breadcrumbs = useBreadcrumbs()

  return (
    <PageLayout
      title="Property Reports"
      description="Analytics and reports for your properties."
      breadcrumbs={breadcrumbs}
    >
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Property Reports</h3>
          <p className="text-gray-600">
            Property analytics and reports would be displayed here.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

const PropertiesSettings: React.FC = () => {
  const breadcrumbs = useBreadcrumbs()

  return (
    <PageLayout
      title="Property Settings"
      description="Configure property-related settings."
      breadcrumbs={breadcrumbs}
    >
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Property Settings</h3>
          <p className="text-gray-600">
            Property configuration options would be displayed here.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

const Properties: React.FC = () => {
  return (
    <>
      {/* Secondary navigation */}
      <SubNav 
        items={propertySubNavItems} 
        title="Properties"
      />
      
      {/* Main content - SubNav positioning is handled globally */}
      <Routes>
        <Route path="/" element={<PropertiesList />} />
        <Route path="/map" element={<PropertiesMap />} />
        <Route path="/reports" element={<PropertiesReports />} />
        <Route path="/settings" element={<PropertiesSettings />} />
      </Routes>
    </>
  )
}

export default Properties