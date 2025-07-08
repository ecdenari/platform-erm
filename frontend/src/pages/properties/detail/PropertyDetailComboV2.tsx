import React, { useState } from 'react'
import { PropertyDetail } from '../../../modules/properties/types'

interface PropertyDetailComboV2Props {
  property: PropertyDetail
  onEdit?: () => void
  onDelete?: () => void
}

type TabType = 'dashboard' | 'details' | 'workorders' | 'financials' | 'schedule' | 'documents'

export const PropertyDetailComboV2: React.FC<PropertyDetailComboV2Props> = ({ 
  property,
  onEdit,
  onDelete 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [expandedSection, setExpandedSection] = useState<string | null>('metrics')

  const tabs: { key: TabType; label: string; icon?: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'details', label: 'Details', icon: '📋' },
    { key: 'workorders', label: 'Work Orders', icon: '🔧' },
    { key: 'financials', label: 'Financials', icon: '💰' },
    { key: 'schedule', label: 'Schedule', icon: '📅' },
    { key: 'documents', label: 'Documents', icon: '📁' },
  ]

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            {/* Metrics Dashboard - ServiceTitan Ultra-Dense with Aspire Green */}
            <div className={`bg-white border border-gray-200 rounded-sm transition-all ${
              expandedSection === 'metrics' ? '' : 'cursor-pointer hover:shadow-sm'
            }`}>
              <div 
                onClick={() => toggleSection('metrics')}
                className="px-3 py-2 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-between"
              >
                <h3 className="text-xs font-bold text-gray-900 uppercase">Performance Metrics</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  {expandedSection === 'metrics' ? '−' : '+'}
                </button>
              </div>
              {expandedSection === 'metrics' && (
                <div className="p-3">
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                      <div className="text-lg font-bold text-green-600">$124.5K</div>
                      <div className="text-xs text-gray-600">Total Revenue</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="text-lg font-bold text-blue-600">247</div>
                      <div className="text-xs text-gray-600">Total Jobs</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
                      <div className="text-lg font-bold text-yellow-600">12</div>
                      <div className="text-xs text-gray-600">Active Jobs</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded border border-purple-200">
                      <div className="text-lg font-bold text-purple-600">98.5%</div>
                      <div className="text-xs text-gray-600">On-Time Rate</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded border border-gray-200">
                      <div className="text-lg font-bold text-gray-800">4.9</div>
                      <div className="text-xs text-gray-600">Avg Rating</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                      <div className="text-lg font-bold text-red-600">2</div>
                      <div className="text-xs text-gray-600">Open Issues</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                    Revenue Trend Chart (Last 12 Months)
                  </div>
                </div>
              )}
            </div>

            {/* Property Information Grid - Aspire Style Form Layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-xs font-bold text-gray-900 uppercase">Property Information</h3>
                </div>
                <div className="p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-gray-500">Property Type</label>
                      <p className="font-medium text-gray-900">{property.propertyType}</p>
                    </div>
                    <div>
                      <label className="text-gray-500">Status</label>
                      <p>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {property.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-gray-500">Square Footage</label>
                      <p className="font-medium text-gray-900">
                        {property.squareFootage ? property.squareFootage.toLocaleString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-gray-500">Acreage</label>
                      <p className="font-medium text-gray-900">
                        {property.acreageSize ? property.acreageSize + ' acres' : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-gray-500">Property ID</label>
                      <p className="font-mono font-medium text-gray-900">
                        PROP-{property.id.toString().padStart(5, '0')}
                      </p>
                    </div>
                    <div>
                      <label className="text-gray-500">Created Date</label>
                      <p className="font-medium text-gray-900">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <label className="text-xs text-gray-500">Full Address</label>
                    <p className="text-xs font-medium text-gray-900">{property.fullAddress}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-xs font-bold text-gray-900 uppercase">Account & Billing</h3>
                </div>
                <div className="p-3 space-y-2">
                  <div className="pb-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">{property.company.name}</div>
                    <div className="text-xs text-gray-500">Customer since 2019</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-gray-500">Current Balance</label>
                      <p className="font-medium text-green-600">$2,450.00</p>
                    </div>
                    <div>
                      <label className="text-gray-500">Past Due</label>
                      <p className="font-medium text-red-600">$420.00</p>
                    </div>
                    <div>
                      <label className="text-gray-500">Payment Terms</label>
                      <p className="font-medium text-gray-900">Net 30</p>
                    </div>
                    <div>
                      <label className="text-gray-500">Tax Rate</label>
                      <p className="font-medium text-gray-900">7.5%</p>
                    </div>
                  </div>
                  <div className="pt-2 flex space-x-2">
                    <button className="flex-1 px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                      Create Invoice
                    </button>
                    <button className="flex-1 px-2 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                      View Statement
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Work Orders - Dense Table */}
            <div className="bg-white border border-gray-200 rounded-sm">
              <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-900 uppercase">Active Work Orders</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Showing 5 of 12</span>
                  <button className="px-2 py-0.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                    + New
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-50 text-xs uppercase">
                    <tr>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">WO#</th>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">Type</th>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">Title</th>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">Status</th>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">Scheduled</th>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">Tech</th>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">Priority</th>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">Amount</th>
                      <th className="px-2 py-1 text-left text-gray-500 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-2 py-1 font-mono text-blue-600">WO-{(4567 + i).toString()}</td>
                        <td className="px-2 py-1">Maintenance</td>
                        <td className="px-2 py-1 text-gray-900">Weekly Service</td>
                        <td className="px-2 py-1">
                          <span className={`px-1 py-0.5 rounded text-xs ${
                            i === 0 ? 'bg-yellow-100 text-yellow-800' :
                            i === 1 ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {i === 0 ? 'Scheduled' : i === 1 ? 'In Progress' : 'Completed'}
                          </span>
                        </td>
                        <td className="px-2 py-1 text-gray-600">
                          {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </td>
                        <td className="px-2 py-1 text-gray-600">J.Smith</td>
                        <td className="px-2 py-1">
                          <span className={`px-1 py-0.5 rounded text-xs ${
                            i === 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {i === 0 ? 'High' : 'Normal'}
                          </span>
                        </td>
                        <td className="px-2 py-1 font-medium">$450</td>
                        <td className="px-2 py-1">
                          <button className="text-blue-600 hover:text-blue-700">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-sm cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">📞</span>
                  <span className="text-xs text-gray-500">→</span>
                </div>
                <h4 className="text-xs font-semibold text-gray-900">Contacts</h4>
                <p className="text-xs text-gray-500">{property.propertyContacts?.length || 0} contacts</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-sm cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">📄</span>
                  <span className="text-xs text-gray-500">→</span>
                </div>
                <h4 className="text-xs font-semibold text-gray-900">Documents</h4>
                <p className="text-xs text-gray-500">23 files</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-sm cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">📷</span>
                  <span className="text-xs text-gray-500">→</span>
                </div>
                <h4 className="text-xs font-semibold text-gray-900">Photos</h4>
                <p className="text-xs text-gray-500">156 photos</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-sm cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">📋</span>
                  <span className="text-xs text-gray-500">→</span>
                </div>
                <h4 className="text-xs font-semibold text-gray-900">Notes</h4>
                <p className="text-xs text-gray-500">View all notes</p>
              </div>
            </div>
          </div>
        )

      case 'details':
        return (
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900">Property Details</h3>
            </div>
            <div className="p-4">
              <form className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Property Name</label>
                  <input
                    type="text"
                    value={property.name}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Property Type</label>
                  <select 
                    value={property.propertyType}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={property.status}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Square Footage</label>
                  <input
                    type="number"
                    value={property.squareFootage || ''}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Acreage</label>
                  <input
                    type="number"
                    value={property.acreageSize || ''}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                  <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500">
                    <option>{property.company.name}</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={property.address?.street}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={property.address?.city}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={property.address?.state}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={property.address?.zipCode}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={property.notes || ''}
                    rows={3}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </form>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white border border-gray-200 rounded-sm p-8">
            <p className="text-sm text-gray-500 text-center">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon...
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Ultra-Compact Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-bold text-white">{property.name}</h1>
              <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded">
                {property.propertyType}
              </span>
              <span className={`px-2 py-0.5 text-xs rounded ${
                property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {property.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/20">
                📞 Call
              </button>
              <button className="px-2 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/20">
                📧 Email
              </button>
              <button className="px-2 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/20">
                📍 Map
              </button>
              <div className="w-px h-4 bg-white/30"></div>
              <button
                onClick={onEdit}
                className="px-3 py-1 bg-white text-green-600 text-xs font-medium rounded hover:bg-gray-100"
              >
                Edit
              </button>
              <button className="px-2 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/20">
                ⋮
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-1 text-xs text-gray-600 bg-gray-50">
          <span>{property.fullAddress}</span>
          <span className="mx-2">•</span>
          <span>ID: PROP-{property.id.toString().padStart(5, '0')}</span>
          <span className="mx-2">•</span>
          <span>Account: {property.company.name}</span>
          <span className="mx-2">•</span>
          <span>Last Visit: 5/6/2025</span>
          <span className="mx-2">•</span>
          <span className="text-green-600 font-medium">Next Visit: Tomorrow 8:00 AM</span>
        </div>
      </div>

      {/* Tabs with Icons */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-green-600 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {renderTabContent()}
      </div>
    </div>
  )
}