import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PropertyForm } from '../components'
import { useProperty } from '../hooks'

export const PropertyEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const propertyId = id ? parseInt(id) : undefined
  
  const { data: property, isLoading, error } = useProperty(propertyId!)

  const handleSuccess = () => {
    navigate(`/properties/${propertyId}`)
  }

  const handleCancel = () => {
    navigate(`/properties/${propertyId}`)
  }

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="flex items-center text-sm">
            <button
              onClick={() => navigate('/properties')}
              className="text-gray-500 hover:text-gray-700"
            >
              Properties
            </button>
            <span className="mx-2 text-gray-400">/</span>
            <button
              onClick={() => navigate(`/properties/${propertyId}`)}
              className="text-gray-500 hover:text-gray-700"
            >
              {property.name}
            </button>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Edit</span>
          </nav>
          <h1 className="mt-2 text-2xl font-semibold text-gray-900">Edit Property</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update property information
          </p>
        </div>

        <PropertyForm 
          property={property}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}