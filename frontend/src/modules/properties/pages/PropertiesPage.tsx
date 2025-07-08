import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PropertyListAspire } from '../components'
import { useProperties, useDeleteProperty } from '../hooks'
import { PropertyFilters, Property } from '../types'
import { enterpriseTokens } from '../../../styles/enterpriseTokens'

export const PropertiesPage: React.FC = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<PropertyFilters>({
    pageNumber: 1,
    pageSize: 20,
    sortBy: 'name',
    sortOrder: 'asc'
  })

  const { data, isLoading, error } = useProperties(filters)
  const deletePropertyMutation = useDeleteProperty()

  const handlePropertyClick = (property: Property) => {
    navigate(`/properties/${property.id}`)
  }

  const handleEdit = (property: Property) => {
    navigate(`/properties/${property.id}/edit`)
  }

  const handleDelete = async (property: Property) => {
    if (window.confirm(`Are you sure you want to delete "${property.name}"?`)) {
      try {
        await deletePropertyMutation.mutateAsync(property.id)
      } catch (error) {
        console.error('Failed to delete property:', error)
      }
    }
  }

  const handleViewWorkOrders = (property: Property) => {
    navigate(`/properties/${property.id}/work-orders`)
  }

  const handleCreateWorkOrder = (property: Property) => {
    navigate(`/work-orders/new?propertyId=${property.id}`)
  }

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search, pageNumber: 1 }))
  }

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, pageNumber: 1 }))
  }

  const handlePageChange = (pageNumber: number) => {
    setFilters(prev => ({ ...prev, pageNumber }))
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading properties</h3>
          <p className="mt-1 text-sm text-gray-500">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your commercial properties and client locations
              </p>
            </div>
            <button
              onClick={() => navigate('/properties/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Property
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search properties..."
                  value={filters.search || ''}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  id="propertyType"
                  value={filters.propertyType || ''}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                >
                  <option value="">All Types</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Vacant">Vacant</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={filters.status || ''}
                  onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  value={filters.sortBy || 'name'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                >
                  <option value="name">Name</option>
                  <option value="createdAt">Date Created</option>
                  <option value="status">Status</option>
                  <option value="propertyType">Type</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <PropertyListAspire
            properties={data?.items || []}
            loading={isLoading}
            onPropertyClick={handlePropertyClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewWorkOrders={handleViewWorkOrders}
            onCreateWorkOrder={handleCreateWorkOrder}
            groupByCompany={true}
          />
          
          {data && data.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((filters.pageNumber! - 1) * filters.pageSize!) + 1} to{' '}
                  {Math.min(filters.pageNumber! * filters.pageSize!, data.totalCount)} of{' '}
                  {data.totalCount} properties
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(filters.pageNumber! - 1)}
                    disabled={filters.pageNumber === 1}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm">
                    Page {filters.pageNumber} of {data.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(filters.pageNumber! + 1)}
                    disabled={filters.pageNumber === data.totalPages}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}