import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLayout from '../layout/PageLayout'
import SubNav, { SubNavItem } from '../layout/SubNav'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { PropertiesPage } from './properties/pages/PropertiesPage'
import { PropertyDetailPage } from './properties/pages/PropertyDetailPage'
import { PropertyListLab } from './properties/components/PropertyListLab'
import { 
  List, 
  Map, 
  BarChart3, 
  Settings,
  Beaker 
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
    name: 'Component Lab',
    href: '/properties/lab',
    icon: Beaker,
    description: 'Test component variants'
  },
  {
    name: 'Settings',
    href: '/properties/settings',
    icon: Settings,
    description: 'Property configuration'
  },
]

// Sub-components wrapper for consistent layout
const PropertiesList: React.FC = () => {
  return <PropertiesPage />
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
        <Route path="/:id" element={<PropertyDetailPage />} />
        <Route path="/map" element={<PropertiesMap />} />
        <Route path="/reports" element={<PropertiesReports />} />
        <Route path="/lab" element={<PropertyListLab />} />
        <Route path="/settings" element={<PropertiesSettings />} />
      </Routes>
    </>
  )
}

export default Properties