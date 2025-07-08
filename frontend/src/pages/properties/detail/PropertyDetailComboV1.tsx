import React, { useState } from 'react'
import { PropertyDetail } from '../../../modules/properties/types'

interface PropertyDetailComboV1Props {
  property: PropertyDetail
  onEdit?: () => void
  onDelete?: () => void
}

type TabType = 'overview' | 'jobs' | 'contacts' | 'opportunities' | 'documents' | 'availability' | 'history'

export const PropertyDetailComboV1: React.FC<PropertyDetailComboV1Props> = ({ 
  property,
  onEdit,
  onDelete 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const tabs: { key: TabType; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'jobs', label: 'Jobs', count: property.workOrders?.length },
    { key: 'contacts', label: 'Contacts', count: property.propertyContacts?.length },
    { key: 'opportunities', label: 'Opportunities', count: 8 },
    { key: 'documents', label: 'Documents', count: 12 },
    { key: 'availability', label: 'Availability' },
    { key: 'history', label: 'History' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-12 gap-4">
            {/* Main Content - 8 cols */}
            <div className="col-span-8 space-y-4">
              {/* Property Quick Stats - ServiceTitan Style with Aspire Colors */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Property Overview</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">$24.5K</div>
                      <div className="text-xs text-gray-500">YTD Revenue</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-gray-900">47</div>
                      <div className="text-xs text-gray-500">Total Jobs</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">98%</div>
                      <div className="text-xs text-gray-500">On-Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-yellow-600">4.8</div>
                      <div className="text-xs text-gray-500">Avg Rating</div>
                    </div>
                  </div>
                  
                  {/* Property Details Grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Property Type:</span>
                      <span className="font-medium text-gray-900">{property.propertyType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Status:</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Square Footage:</span>
                      <span className="font-medium text-gray-900">
                        {property.squareFootage ? property.squareFootage.toLocaleString() + ' sq ft' : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Acreage:</span>
                      <span className="font-medium text-gray-900">
                        {property.acreageSize ? property.acreageSize + ' acres' : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Jobs - Aspire Style Table */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Active Work Orders</h3>
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    + NEW JOB
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Job #</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Scheduled</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Technician</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {property.workOrders?.slice(0, 5).map((wo) => (
                        <tr key={wo.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm font-mono text-blue-600">
                            WO-{wo.id.toString().padStart(6, '0')}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">{wo.title}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              wo.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              wo.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {wo.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600">
                            {wo.scheduledDate ? new Date(wo.scheduledDate).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600">J. Smith</td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">$1,250</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes Section - Aspire Style */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Property Notes</h3>
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 mb-3">
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                      Property Notes
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                      Operation Notes
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                      Snow Notes
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                      Collection Notes
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                    {property.notes || 'No notes available'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 4 cols */}
            <div className="col-span-4 space-y-4">
              {/* Company Info - ServiceTitan Compact Style */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Account Information</h3>
                </div>
                <div className="p-3 space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{property.company.name}</div>
                    <div className="text-xs text-gray-500">Customer since 2019</div>
                  </div>
                  <div className="text-xs space-y-1">
                    {property.company.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone:</span>
                        <span className="text-gray-900">{property.company.phone}</span>
                      </div>
                    )}
                    {property.company.email && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="text-gray-900 truncate ml-2">{property.company.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Balance:</span>
                      <span className="font-medium text-gray-900">$420.00</span>
                    </div>
                  </div>
                  <button className="w-full text-xs text-green-600 hover:text-green-700 font-medium py-1">
                    View Full Account →
                  </button>
                </div>
              </div>

              {/* Location with Map */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Location</h3>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-900 space-y-0.5">
                    <div>{property.address?.street}</div>
                    {property.address?.suite && <div>{property.address.suite}</div>}
                    <div>
                      {property.address?.city}, {property.address?.state} {property.address?.zipCode}
                    </div>
                  </div>
                  <div className="mt-2 h-32 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                    Map Preview
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button className="text-xs text-green-600 hover:text-green-700 font-medium py-1">
                      Get Directions
                    </button>
                    <button className="text-xs text-green-600 hover:text-green-700 font-medium py-1">
                      View on Map
                    </button>
                  </div>
                </div>
              </div>

              {/* Primary Contacts - Hybrid Style */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Primary Contacts</h3>
                  <span className="text-xs text-gray-500">{property.propertyContacts?.length || 0}</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {property.propertyContacts?.filter(pc => pc.isPrimary).slice(0, 2).map((pc) => (
                    <div key={pc.id} className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{pc.contact.fullName}</div>
                          <div className="text-xs text-gray-500">
                            {pc.role.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                          Primary
                        </span>
                      </div>
                      <div className="mt-1 text-xs space-y-0.5">
                        {pc.contact.phone && <div className="text-gray-600">{pc.contact.phone}</div>}
                        {pc.contact.email && <div className="text-gray-600 truncate">{pc.contact.email}</div>}
                      </div>
                    </div>
                  ))}
                  <div className="p-3 text-center">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View All Contacts →
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions - ServiceTitan Dense Style */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-2 grid grid-cols-2 gap-1">
                  <button className="px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded text-left">
                    📋 Create Job
                  </button>
                  <button className="px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded text-left">
                    📅 Schedule
                  </button>
                  <button className="px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded text-left">
                    💰 Invoice
                  </button>
                  <button className="px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded text-left">
                    📄 Estimate
                  </button>
                  <button className="px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded text-left">
                    👤 Add Contact
                  </button>
                  <button className="px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded text-left">
                    📎 Upload File
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'opportunities':
        return (
          <div className="bg-white border border-gray-200 rounded">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Opportunities</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                  + NEW OPPORTUNITY
                </button>
                <select className="text-xs border border-gray-200 rounded px-2 py-1">
                  <option>All Opportunities</option>
                  <option>Active</option>
                  <option>Won</option>
                  <option>Lost</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Opp #</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Expected Close</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm font-mono text-blue-600">OPP-00{i}234</td>
                      <td className="px-4 py-2 text-sm text-gray-900">Landscape Enhancement {i}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">Enhancement</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          i === 1 ? 'bg-green-100 text-green-800' :
                          i === 2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {i === 1 ? 'Won' : i === 2 ? 'Proposal' : 'Qualifying'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">{i === 1 ? '100%' : i === 2 ? '80%' : '50%'}</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">${(5000 * i).toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white border border-gray-200 rounded p-8">
            <p className="text-sm text-gray-500 text-center">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon...
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Hybrid Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{property.name}</h1>
                <p className="text-sm text-gray-600">
                  {property.fullAddress} • {property.propertyType}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {property.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onEdit}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Edit Property
              </button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                More Actions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar - Neutral Style */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-6">
              <span>
                <span className="text-gray-600">Property ID:</span>
                <span className="ml-1 font-medium">PROP-{property.id.toString().padStart(5, '0')}</span>
              </span>
              <span>
                <span className="text-gray-600">Account:</span>
                <span className="ml-1 font-medium">{property.company.name}</span>
              </span>
              <span>
                <span className="text-gray-600">Created:</span>
                <span className="ml-1 font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>
                <span className="text-gray-600">Last Visit:</span>
                <span className="ml-1 font-medium">5/6/2025</span>
              </span>
              <span>
                <span className="text-gray-600">Next Visit:</span>
                <span className="ml-1 font-medium text-green-600">Tomorrow</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - ServiceTitan Style */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6">
          <nav className="flex space-x-6">
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
                {tab.count !== undefined && (
                  <span className={`ml-1.5 py-0.5 px-1.5 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  )
}