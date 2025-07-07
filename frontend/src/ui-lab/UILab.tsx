import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface UILabProps {}

type Platform = 'servicetitan' | 'lmn' | 'aspire' | 'all'

const UILab: React.FC<UILabProps> = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all')
  const [selectedComponent, setSelectedComponent] = useState<string>('overview')

  const availableComponents = [
    { id: 'overview', name: 'Overview', description: 'Platform comparison overview' },
    { id: 'data-table', name: 'Data Table', description: 'Dense data display patterns' },
    { id: 'property-card', name: 'Property Card', description: 'Property information cards' },
    { id: 'work-order', name: 'Work Order', description: 'Work order hierarchy components' },
    { id: 'form-layout', name: 'Form Layout', description: 'Form design patterns' },
  ]

  const platformInfo = {
    servicetitan: {
      name: 'ServiceTitan',
      description: 'Dense, efficient, HVAC-style professionalism',
      color: '#0066cc',
      features: ['Maximum information density', 'Hover actions', 'Professional grays', 'Compact spacing']
    },
    lmn: {
      name: 'LMN',
      description: 'Landscape workflows without consumer elements',
      color: '#10b981',
      features: ['GPS integration', 'Weather awareness', 'Equipment tracking', 'Seasonal planning']
    },
    aspire: {
      name: 'Aspire',
      description: 'Commercial landscaping, Work Order hierarchy',
      color: '#1e293b',
      features: ['Work Orders → Work Tickets', 'Commercial B2B', 'Detailed costing', 'Client workflows']
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Platform-ERM UI Lab</h1>
              <p className="text-sm text-gray-600">
                Compare ServiceTitan, LMN, and Aspire inspired component variants
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Back to App
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
              <nav className="space-y-1">
                {availableComponents.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setSelectedComponent(component.id)}
                    className={`
                      w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${selectedComponent === component.id
                        ? 'bg-primary-100 text-primary-700 border-l-2 border-primary-500'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className="font-medium">{component.name}</div>
                    <div className="text-xs text-gray-500">{component.description}</div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Platform Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-4">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Platform View</h3>
              <div className="space-y-2">
                {(['all', 'servicetitan', 'lmn', 'aspire'] as Platform[]).map((platform) => (
                  <label key={platform} className="flex items-center">
                    <input
                      type="radio"
                      value={platform}
                      checked={selectedPlatform === platform}
                      onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {platform === 'all' ? 'Compare All' : platformInfo[platform as keyof typeof platformInfo]?.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {selectedComponent === 'overview' ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Inspiration Framework</h2>
                  <p className="text-gray-600 mb-6">
                    Platform-ERM components are designed with inspiration from three leading platforms in the landscape and service industries.
                    Each component is created in three variants to explore different approaches to user experience and workflow optimization.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(platformInfo).map(([key, platform]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div 
                            className="w-4 h-4 rounded-full mr-3"
                            style={{ backgroundColor: platform.color }}
                          />
                          <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{platform.description}</p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          {platform.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-blue-900 mb-2">How to Use the UI Lab</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>1. Select a component from the sidebar to view its variants</li>
                    <li>2. Choose "Compare All" to see all three platform approaches side-by-side</li>
                    <li>3. Or select a specific platform to focus on that approach</li>
                    <li>4. Document your observations and preferences for final component design</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-yellow-900 mb-2">Coming Soon</h3>
                  <p className="text-sm text-yellow-800">
                    Component variants will be displayed here as they are developed. Each component will show 
                    realistic Platform-ERM data to help evaluate which patterns work best for our commercial 
                    landscape management workflows.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {availableComponents.find(c => c.id === selectedComponent)?.name} Components
                </h2>
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">🚧</div>
                  <p className="text-lg font-medium mb-2">Component variants coming soon</p>
                  <p className="text-sm">
                    This component will show {availableComponents.find(c => c.id === selectedComponent)?.name.toLowerCase()} 
                    variants inspired by ServiceTitan, LMN, and Aspire when implemented.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UILab