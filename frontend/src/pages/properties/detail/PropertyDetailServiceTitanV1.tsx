import React, { useState } from 'react'
import { PropertyDetail } from '../../../modules/properties/types'

interface PropertyDetailServiceTitanV1Props {
  property: PropertyDetail
  onEdit?: () => void
  onDelete?: () => void
}

type TabType = 'overview' | 'details' | 'contacts' | 'workorders' | 'history' | 'documents' | 'financials' | 'equipment'

export const PropertyDetailServiceTitanV1: React.FC<PropertyDetailServiceTitanV1Props> = ({ 
  property,
  onEdit,
  onDelete 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const tabs: { key: TabType; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'details', label: 'Details' },
    { key: 'contacts', label: 'Contacts', count: property.propertyContacts?.length },
    { key: 'workorders', label: 'Jobs', count: property.workOrders?.length },
    { key: 'history', label: 'History', count: 23 },
    { key: 'documents', label: 'Documents', count: 8 },
    { key: 'financials', label: 'Financials' },
    { key: 'equipment', label: 'Equipment', count: 12 },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-12 gap-4">
            {/* Left Column - 8 cols */}
            <div className="col-span-8 space-y-4">
              {/* Property Details Card - Ultra Dense */}
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Property Information</h3>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-1 font-medium text-gray-900">{property.propertyType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className={`ml-1 px-1.5 py-0.5 rounded text-xs font-medium ${
                        property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">ID:</span>
                      <span className="ml-1 font-mono font-medium text-gray-900">PROP-{property.id.toString().padStart(5, '0')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Sq Ft:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {property.squareFootage ? property.squareFootage.toLocaleString() : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Acreage:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {property.acreageSize ? property.acreageSize + ' acres' : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {property.description && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-600">{property.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Jobs - Dense Table */}
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Active Jobs</h3>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    View All Jobs →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Job #</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Scheduled</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Technician</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {property.workOrders?.slice(0, 5).map((wo) => (
                        <tr key={wo.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 whitespace-nowrap text-xs font-mono text-blue-600">
                            JOB-{wo.id.toString().padStart(6, '0')}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-900">{wo.title}</td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                              wo.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              wo.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {wo.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                            {wo.scheduledDate ? new Date(wo.scheduledDate).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">J. Smith</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">$1,250</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Service History Summary */}
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Service History Summary</h3>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="border-r border-gray-200">
                      <div className="text-2xl font-bold text-gray-900">47</div>
                      <div className="text-xs text-gray-500">Total Jobs</div>
                    </div>
                    <div className="border-r border-gray-200">
                      <div className="text-2xl font-bold text-green-600">42</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div className="border-r border-gray-200">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-xs text-gray-500">In Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">$24.5K</div>
                      <div className="text-xs text-gray-500">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 4 cols */}
            <div className="col-span-4 space-y-4">
              {/* Company Card - Compact */}
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Company</h3>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium text-gray-900">{property.company.name}</div>
                  {property.company.phone && (
                    <div className="text-xs text-gray-600 mt-1">{property.company.phone}</div>
                  )}
                  {property.company.email && (
                    <div className="text-xs text-gray-600">{property.company.email}</div>
                  )}
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">
                    View Company Details →
                  </button>
                </div>
              </div>

              {/* Location Card with Mini Map */}
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Location</h3>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-900">
                    <div>{property.address?.street}</div>
                    {property.address?.suite && <div>{property.address.suite}</div>}
                    <div>
                      {property.address?.city}, {property.address?.state} {property.address?.zipCode}
                    </div>
                  </div>
                  <div className="mt-2 h-32 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                    Map Preview
                  </div>
                  {property.latitude && property.longitude && (
                    <button
                      onClick={() => window.open(`https://maps.google.com/?q=${property.latitude},${property.longitude}`, '_blank')}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2"
                    >
                      Open in Google Maps →
                    </button>
                  )}
                </div>
              </div>

              {/* Key Contacts - Compact List */}
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Key Contacts</h3>
                  <span className="text-xs text-gray-500">{property.propertyContacts?.length || 0} total</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {property.propertyContacts?.filter(pc => pc.isPrimary).slice(0, 3).map((pc) => (
                    <div key={pc.id} className="p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {pc.contact.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {pc.role.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Primary
                        </span>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {pc.contact.phone && (
                          <div className="text-xs text-gray-600">{pc.contact.phone}</div>
                        )}
                        {pc.contact.email && (
                          <div className="text-xs text-gray-600 truncate">{pc.contact.email}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {property.propertyContacts && property.propertyContacts.length > 3 && (
                    <div className="p-3 text-center">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        View All Contacts →
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-2 space-y-1">
                  <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded">
                    → Create New Job
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded">
                    → Schedule Service
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded">
                    → Generate Invoice
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded">
                    → Add Contact
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded">
                    → Upload Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'details':
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Property Details</h3>
                </div>
                <div className="p-4">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                    <div className="col-span-2">
                      <dt className="text-gray-500">Description</dt>
                      <dd className="mt-1 text-gray-900">{property.description || 'No description provided'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Property ID</dt>
                      <dd className="mt-1 font-mono text-gray-900">PROP-{property.id.toString().padStart(5, '0')}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Type</dt>
                      <dd className="mt-1 text-gray-900">{property.propertyType}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Status</dt>
                      <dd className="mt-1">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                          property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {property.status}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Square Footage</dt>
                      <dd className="mt-1 text-gray-900">
                        {property.squareFootage ? property.squareFootage.toLocaleString() + ' sq ft' : 'N/A'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Acreage</dt>
                      <dd className="mt-1 text-gray-900">
                        {property.acreageSize ? property.acreageSize + ' acres' : 'N/A'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Created Date</dt>
                      <dd className="mt-1 text-gray-900">{new Date(property.createdAt).toLocaleDateString()}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Last Updated</dt>
                      <dd className="mt-1 text-gray-900">
                        {property.updatedAt ? new Date(property.updatedAt).toLocaleDateString() : 'Never'}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-gray-500">Full Address</dt>
                      <dd className="mt-1 text-gray-900">{property.fullAddress}</dd>
                    </div>
                    {property.latitude && property.longitude && (
                      <>
                        <div>
                          <dt className="text-gray-500">Latitude</dt>
                          <dd className="mt-1 font-mono text-gray-900">{property.latitude.toFixed(6)}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Longitude</dt>
                          <dd className="mt-1 font-mono text-gray-900">{property.longitude.toFixed(6)}</dd>
                        </div>
                      </>
                    )}
                    <div className="col-span-2">
                      <dt className="text-gray-500">Notes</dt>
                      <dd className="mt-1 text-gray-900 whitespace-pre-wrap">
                        {property.notes || 'No notes'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="col-span-4">
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Additional Information</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Custom Fields</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Gate Code</span>
                        <span className="text-gray-900">1234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Parking Instructions</span>
                        <span className="text-gray-900">Use visitor spots</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Access Notes</span>
                        <span className="text-gray-900">Call manager first</span>
                      </div>
                    </div>
                  </div>
                </div>
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
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{property.name}</h1>
                <p className="text-xs text-gray-500">
                  {property.fullAddress} • {property.propertyType} • PROP-{property.id.toString().padStart(5, '0')}
                </p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {property.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onEdit}
                className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                More Actions
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1 border border-red-300 rounded text-xs font-medium text-red-700 bg-white hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4">
          <nav className="-mb-px flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-xs ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`ml-1.5 py-0.5 px-1.5 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-600'
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
      <div className="p-4">
        {renderTabContent()}
      </div>
    </div>
  )
}