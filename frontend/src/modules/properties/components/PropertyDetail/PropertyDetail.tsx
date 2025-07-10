import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PropertyDetail as PropertyDetailType, ContactRole } from '../../types'
import { useProperty, useDeleteProperty } from '../../hooks'
import { enterpriseTokens } from '../../../../styles/enterpriseTokens'

type TabType = 'overview' | 'details' | 'contacts' | 'workorders' | 'history' | 'documents'

interface PropertyDetailProps {
  propertyId?: number
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ propertyId: propId }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const propertyId = propId || (id ? parseInt(id) : undefined)
  
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const { data: property, isLoading, error } = useProperty(propertyId!)
  const deletePropertyMutation = useDeleteProperty()

  if (!propertyId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No property ID provided</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Property not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The property you're looking for doesn't exist or you don't have access to it.
          </p>
          <button
            onClick={() => navigate('/properties')}
            className="mt-4 text-blue-600 hover:text-blue-500"
          >
            Back to properties
          </button>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    navigate(`/properties/${propertyId}/edit`)
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${property.name}"?`)) {
      try {
        await deletePropertyMutation.mutateAsync(propertyId)
        navigate('/properties')
      } catch (error) {
        console.error('Failed to delete property:', error)
      }
    }
  }

  const tabs: { key: TabType; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'details', label: 'Details' },
    { key: 'contacts', label: 'Contacts', count: property.propertyContacts?.length },
    { key: 'workorders', label: 'Work Orders', count: property.workOrders?.length },
    { key: 'history', label: 'History' },
    { key: 'documents', label: 'Documents' },
  ]

  const getPrimaryContact = (role: ContactRole) => {
    return property.propertyContacts?.find(pc => pc.role === role && pc.isPrimary)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Property Information</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{property.propertyType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Square Footage</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {property.squareFootage ? property.squareFootage.toLocaleString() + ' sq ft' : 'N/A'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Acreage</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {property.acreageSize ? property.acreageSize + ' acres' : 'N/A'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Key Contacts</h3>
                <div className="space-y-3">
                  {getPrimaryContact(ContactRole.PropertyManager) && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {getPrimaryContact(ContactRole.PropertyManager)!.contact.fullName}
                        </p>
                        <p className="text-xs text-gray-500">Property Manager</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-gray-900">{getPrimaryContact(ContactRole.PropertyManager)!.contact.phone}</p>
                        <p className="text-gray-500">{getPrimaryContact(ContactRole.PropertyManager)!.contact.email}</p>
                      </div>
                    </div>
                  )}
                  {getPrimaryContact(ContactRole.BillingContact) && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {getPrimaryContact(ContactRole.BillingContact)!.contact.fullName}
                        </p>
                        <p className="text-xs text-gray-500">Billing Contact</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-gray-900">{getPrimaryContact(ContactRole.BillingContact)!.contact.phone}</p>
                        <p className="text-gray-500">{getPrimaryContact(ContactRole.BillingContact)!.contact.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Work Orders</h3>
                {property.workOrders && property.workOrders.length > 0 ? (
                  <div className="space-y-2">
                    {property.workOrders.slice(0, 5).map((wo) => (
                      <div key={wo.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{wo.title}</p>
                          <p className="text-xs text-gray-500">
                            {wo.scheduledDate ? new Date(wo.scheduledDate).toLocaleDateString() : 'Not scheduled'}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          wo.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          wo.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {wo.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No work orders yet</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company</h3>
                <div>
                  <p className="text-sm font-medium text-gray-900">{property.companyName || 'No company assigned'}</p>
                  {property.company && (
                    <>
                      {property.company.phone && (
                        <p className="text-sm text-gray-500 mt-1">{property.company.phone}</p>
                      )}
                      {property.company.email && (
                        <p className="text-sm text-gray-500">{property.company.email}</p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-900">{property.address?.street}</p>
                  {property.address?.suite && (
                    <p className="text-sm text-gray-900">{property.address.suite}</p>
                  )}
                  <p className="text-sm text-gray-900">
                    {property.address?.city}, {property.address?.state} {property.address?.zipCode}
                  </p>
                  {property.latitude && property.longitude && (
                    <button
                      onClick={() => window.open(`https://maps.google.com/?q=${property.latitude},${property.longitude}`, '_blank')}
                      className="text-sm text-blue-600 hover:text-blue-500 mt-2"
                    >
                      View on map →
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate(`/work-orders/new?propertyId=${propertyId}`)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Create Work Order
                  </button>
                  <button
                    onClick={() => navigate(`/properties/${propertyId}/schedule`)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Schedule Service
                  </button>
                  <button
                    onClick={() => navigate(`/properties/${propertyId}/invoice`)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Generate Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'details':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Property Details</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900">{property.description || 'No description provided'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Property ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">PROP-{property.id.toString().padStart(5, '0')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(property.createdAt).toLocaleDateString()}
                </dd>
              </div>
              {property.updatedAt && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(property.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {property.notes || 'No notes'}
                </dd>
              </div>
            </dl>
          </div>
        )

      case 'contacts':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Property Contacts</h3>
                <button
                  onClick={() => navigate(`/properties/${propertyId}/contacts/add`)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Add Contact
                </button>
              </div>
            </div>
            <div className="p-6">
              {property.propertyContacts && property.propertyContacts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.propertyContacts.map((pc) => (
                    <div key={pc.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{pc.contact.fullName}</p>
                          <p className="text-xs text-gray-500">{pc.role.replace(/([A-Z])/g, ' $1').trim()}</p>
                          {pc.isPrimary && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                              Primary
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        {pc.contact.title && (
                          <p className="text-sm text-gray-600">{pc.contact.title}</p>
                        )}
                        {pc.contact.email && (
                          <p className="text-sm text-gray-600">{pc.contact.email}</p>
                        )}
                        {pc.contact.phone && (
                          <p className="text-sm text-gray-600">{pc.contact.phone}</p>
                        )}
                        {pc.notes && (
                          <p className="text-sm text-gray-500 italic mt-2">{pc.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No contacts assigned to this property</p>
              )}
            </div>
          </div>
        )

      case 'workorders':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Work Orders</h3>
                <button
                  onClick={() => navigate(`/work-orders/new?propertyId=${propertyId}`)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Create Work Order
                </button>
              </div>
            </div>
            <div className="p-6">
              {property.workOrders && property.workOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Scheduled
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {property.workOrders.map((wo) => (
                        <tr key={wo.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {wo.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              wo.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              wo.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {wo.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {wo.scheduledDate ? new Date(wo.scheduledDate).toLocaleDateString() : 'Not scheduled'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(wo.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => navigate(`/work-orders/${wo.id}`)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No work orders for this property</p>
              )}
            </div>
          </div>
        )

      case 'history':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Property History</h3>
            <p className="text-sm text-gray-500">History tracking coming soon...</p>
          </div>
        )

      case 'documents':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
            <p className="text-sm text-gray-500">Document management coming soon...</p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <nav className="flex items-center text-sm">
                  <button
                    onClick={() => navigate('/properties')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Properties
                  </button>
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-900">{property.name}</span>
                </nav>
                <h1 className="mt-2 text-2xl font-semibold text-gray-900">{property.name}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  {property.fullAddress} • {property.propertyType}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {renderTabContent()}
      </div>
    </div>
  )
}