import React, { useState } from 'react'
import { PropertyDetail } from '../../../modules/properties/types'

interface PropertyDetailAspireV2Props {
  property: PropertyDetail
  onEdit?: () => void
  onDelete?: () => void
}

type TabType = 'property-notes' | 'operations-notes' | 'snow-operation-notes' | 'collection-notes' | 'availability'

export const PropertyDetailAspireV2: React.FC<PropertyDetailAspireV2Props> = ({ 
  property,
  onEdit,
  onDelete 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('property-notes')
  const [isEditing, setIsEditing] = useState(false)

  const tabs = [
    { key: 'property-notes' as TabType, label: 'Property Notes' },
    { key: 'operations-notes' as TabType, label: 'Operations Notes' },
    { key: 'snow-operation-notes' as TabType, label: 'Snow Operation Notes' },
    { key: 'collection-notes' as TabType, label: 'Collection Notes' },
    { key: 'availability' as TabType, label: 'Availability' },
  ]

  const renderForm = () => (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Name *
          </label>
          <input
            type="text"
            value={property.name}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Name Abbreviation
          </label>
          <input
            type="text"
            value={property.name.substring(0, 10)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Branch *
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>Myrtle Beach</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Status *
          </label>
          <select 
            value={property.status}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="Active">Customer</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Owner *
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>{property.company.name}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            OPS Manager
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>Tommy McKnight</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Group
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>Pulte</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>Select tags...</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Users
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>Select One</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type *
          </label>
          <select 
            value={property.propertyType}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="Maintenance">Maintenance</option>
            <option value="Commercial">Commercial</option>
            <option value="Residential">Residential</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              value={property.address?.street}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="pt-7">
            <input type="checkbox" id="separate-invoices" className="mr-2" />
            <label htmlFor="separate-invoices" className="text-sm text-gray-700">
              Separate Invoices
            </label>
          </div>
          <div className="pt-7">
            <input type="checkbox" id="paperless-invoices" className="mr-2" defaultChecked />
            <label htmlFor="paperless-invoices" className="text-sm text-gray-700">
              Paperless Invoices
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <input
            type="text"
            value={property.address?.suite}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax Jurisdiction *
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>No Tax</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Terms *
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>Net 30</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={property.address?.city}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Locality
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option value="">Select...</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <select 
            value={property.address?.state}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="SC">South Carolina</option>
            <option value="NC">North Carolina</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zip
          </label>
          <input
            type="text"
            value={property.address?.zipCode}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="text"
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lead Source
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option value="">Select...</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry *
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>HOA</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Budget
          </label>
          <input
            type="text"
            placeholder="$0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Competitor
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option value="">Select...</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GEO Perimeter
          </label>
          <input
            type="text"
            placeholder="0.0"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sequence Number
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Takeoff Override
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>Select One</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Integration Identifier
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'property-notes':
        return (
          <div className="bg-white rounded p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Notes
              </label>
              <div className="border border-gray-300 rounded p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="text-xs">Paragraph</span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="text-xs">Calibri</span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="text-xs">10pt</span>
                  </button>
                  <div className="flex items-center space-x-1 ml-2">
                    <button className="p-1 hover:bg-gray-100 rounded font-bold">B</button>
                    <button className="p-1 hover:bg-gray-100 rounded italic">I</button>
                    <button className="p-1 hover:bg-gray-100 rounded underline">U</button>
                    <button className="p-1 hover:bg-gray-100 rounded line-through">S</button>
                  </div>
                </div>
                <textarea
                  className="w-full h-32 p-2 border-0 focus:outline-none resize-none"
                  placeholder="Enter collection notes..."
                  defaultValue={property.notes}
                />
              </div>
            </div>
          </div>
        )

      case 'availability':
        return (
          <div className="bg-white rounded p-6">
            <p className="text-sm text-gray-600 mb-4">This property is available for service during the following times:</p>
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">DAY</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">START</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">END</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="py-4">
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                      ⊕ Add to Availability
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      default:
        return (
          <div className="bg-white rounded p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/-/g, ' ')}
              </label>
              <div className="border border-gray-300 rounded p-3">
                <textarea
                  className="w-full h-32 p-2 border-0 focus:outline-none resize-none"
                  placeholder={`Enter ${activeTab.replace(/-/g, ' ')}...`}
                />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
              <span className="text-gray-600">{property.fullAddress}</span>
              <span className={`px-2 py-1 rounded text-sm font-medium ${
                property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {property.status === 'Active' ? 'Active' : property.status}
              </span>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              ✏ SAVE
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-4">
        <div className="bg-white rounded shadow-sm">
          {/* Form Section */}
          <div className="p-6 border-b border-gray-200">
            {renderForm()}
          </div>

          {/* Map and Availability Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Property Map</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">Map Preview</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Availability</h3>
                <div className="bg-gray-50 rounded p-4">
                  <p className="text-sm text-gray-600">This property is available for service during the following times:</p>
                  <table className="mt-2 w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="py-1">DAY</th>
                        <th className="py-1">START</th>
                        <th className="py-1">END</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2" colSpan={3}>
                          <button className="text-green-600 hover:text-green-700">
                            ⊕ Add to Availability
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 px-4 text-sm font-medium ${
                    activeTab === tab.key
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}