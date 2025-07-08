import React, { useState } from 'react'
import { PropertyDetail } from '../../../modules/properties/types'

interface PropertyDetailAspireV1Props {
  property: PropertyDetail
  onEdit?: () => void
  onDelete?: () => void
}

type TabType = 'opportunities' | 'contacts' | 'property-issues' | 'availability' | 'notification-log'

export const PropertyDetailAspireV1: React.FC<PropertyDetailAspireV1Props> = ({ 
  property,
  onEdit,
  onDelete 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('opportunities')

  const tabs = [
    { key: 'opportunities' as TabType, label: 'Opportunities' },
    { key: 'contacts' as TabType, label: 'Contacts' },
    { key: 'property-issues' as TabType, label: 'Property Issues' },
    { key: 'availability' as TabType, label: 'Availability' },
    { key: 'notification-log' as TabType, label: 'Notification Log' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'opportunities':
        return (
          <div className="bg-white rounded">
            <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  + NEW OPPORTUNITY
                </button>
                <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  ✓ SAVE
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>All Projects</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Division</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opp #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opportunity Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opp Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estimated $</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">GROUP</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900">$791,208</td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900">80%</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">DIVISION 1</td>
                    <td className="px-6 py-3 text-sm text-gray-900">430</td>
                    <td className="px-6 py-3 text-sm text-gray-900">2023</td>
                    <td className="px-6 py-3 text-sm text-blue-600">Arcadia - Entrance Monument</td>
                    <td className="px-6 py-3 text-sm text-gray-900">Won</td>
                    <td className="px-6 py-3 text-sm text-gray-900">Complete</td>
                    <td className="px-6 py-3 text-sm text-gray-900">New Sale</td>
                    <td className="px-6 py-3 text-sm text-gray-900">$3,562</td>
                    <td className="px-6 py-3 text-sm text-gray-900">100%</td>
                    <td className="px-6 py-3 text-sm text-gray-900">10/04/23</td>
                    <td className="px-6 py-3 text-sm text-gray-900">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900" colSpan={7}>Totals</td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900">$791,208</td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900">80%</td>
                    <td className="px-6 py-3 text-sm text-gray-900" colSpan={2}></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">Construction (2)</td>
                    <td className="px-6 py-3 text-sm text-gray-900" colSpan={10}>
                      <div className="flex items-center space-x-2">
                        <span>$7,250</span>
                        <span className="text-gray-400">•</span>
                        <span>100%</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">Won (2)</td>
                    <td className="px-6 py-3 text-sm text-gray-900" colSpan={10}>
                      <div className="flex items-center space-x-2">
                        <span>$7,250</span>
                        <span className="text-gray-400">•</span>
                        <span>100%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'contacts':
        return (
          <div className="bg-white rounded">
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                {property.propertyContacts?.map((pc) => (
                  <div key={pc.id} className="border border-gray-200 rounded p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{pc.contact.fullName}</h3>
                        <p className="text-sm text-gray-600">{pc.contact.title || pc.role.replace(/([A-Z])/g, ' $1').trim()}</p>
                      </div>
                      {pc.isPrimary && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      {pc.contact.email && (
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <span className="ml-2 text-gray-900">{pc.contact.email}</span>
                        </div>
                      )}
                      {pc.contact.phone && (
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <span className="ml-2 text-gray-900">{pc.contact.phone}</span>
                        </div>
                      )}
                      {pc.notes && (
                        <div>
                          <span className="text-gray-500">Notes:</span>
                          <span className="ml-2 text-gray-900">{pc.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'availability':
        return (
          <div className="bg-white rounded p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
            <p className="text-sm text-gray-600 mb-4">This property is available for service during the following times:</p>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <div key={day} className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700 w-24">{day}</span>
                  <span className="text-sm text-gray-900">8:00 AM - 5:00 PM</span>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-green-600 hover:text-green-700 font-medium">
              + Add Availability
            </button>
          </div>
        )

      default:
        return (
          <div className="bg-white rounded p-8">
            <p className="text-sm text-gray-500 text-center">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} content coming soon...
            </p>
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
                {property.status}
              </span>
            </div>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              ✏ SAVE
            </button>
          </div>
        </div>
      </div>

      {/* Property Info Bar */}
      <div className="bg-white border-y border-gray-200">
        <div className="px-6 py-3">
          <div className="grid grid-cols-6 gap-6 text-sm">
            <div>
              <span className="text-gray-500">Account Owner:</span>
              <span className="ml-2 font-medium text-gray-900">{property.company.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Primary Contact:</span>
              <span className="ml-2 font-medium text-gray-900">
                {property.propertyContacts?.find(pc => pc.isPrimary && pc.role === 'PropertyManager')?.contact.fullName || 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Account Balance:</span>
              <span className="ml-2 font-medium text-gray-900">$420.00</span>
            </div>
            <div>
              <span className="text-gray-500">Previous Visit:</span>
              <span className="ml-2 font-medium text-gray-900">5/6/2025</span>
            </div>
            <div>
              <span className="text-gray-500">Next Visit:</span>
              <span className="ml-2 font-medium text-gray-900">-</span>
            </div>
            <div>
              <span className="text-gray-500">Previous Site Audit:</span>
              <span className="ml-2 font-medium text-gray-900">None</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white px-6 py-3 flex items-center space-x-2">
        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
          Property Notes
        </button>
        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
          Operation Notes
        </button>
        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
          Snow Notes
        </button>
        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
          Collection Notes
        </button>
      </div>

      {/* Additional Info Bar */}
      <div className="bg-gray-50 px-6 py-2 text-sm">
        <div className="flex items-center space-x-6">
          <span>
            Original Scope - <a href="#" className="text-blue-600 hover:underline">https://pi-youraspire.com/public/sections/8a061679-1861-415a-bc78-6dd6ed1ee996</a>
          </span>
          <span>Addendum / Scope - <a href="#" className="text-blue-600 hover:underline">https://pi-youraspire.com/public/sections/67cb74c8-21bf-4c1c-9fa5-1638bc963246</a></span>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white px-6 py-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Property Map</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500">Map Preview</span>
            </div>
          </div>
          <div className="w-96">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Attachments</h3>
            <div className="space-y-2">
              <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                <span>📄</span>
                <span>UPLOAD</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                <span>📷</span>
                <span>VIEW ALL (36)</span>
              </button>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Or Drag Files
            </div>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded p-4 text-center text-sm text-gray-500">
              Drop files here
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-t border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-4">
        {renderTabContent()}
      </div>
    </div>
  )
}