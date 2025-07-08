import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProperty, useProperties } from '../../../modules/properties/hooks'
import { PropertyDetailServiceTitanV1 } from './PropertyDetailServiceTitanV1'
import { PropertyDetailServiceTitanV2 } from './PropertyDetailServiceTitanV2'
import { PropertyDetailAspireV1 } from './PropertyDetailAspireV1'
import { PropertyDetailAspireV2 } from './PropertyDetailAspireV2'
import { PropertyDetailComboV1 } from './PropertyDetailComboV1'
import { PropertyDetailComboV2 } from './PropertyDetailComboV2'

type VariationType = 'servicetitan-v1' | 'servicetitan-v2' | 'aspire-v1' | 'aspire-v2' | 'combo-v1' | 'combo-v2'

export const PropertyDetailLab: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | undefined>(id ? parseInt(id) : undefined)
  const { data: properties, isLoading: propertiesLoading } = useProperties({ pageSize: 10 })
  const { data: property, isLoading: propertyLoading, error } = useProperty(selectedPropertyId || 0)
  const [selectedVariation, setSelectedVariation] = useState<VariationType>('servicetitan-v1')

  // If no ID provided and we have properties, use the first one
  useEffect(() => {
    if (!selectedPropertyId && properties?.items?.length > 0) {
      setSelectedPropertyId(properties.items[0].id)
    }
  }, [selectedPropertyId, properties])

  const variations = [
    { key: 'servicetitan-v1' as VariationType, label: 'ServiceTitan V1', description: 'Ultra-dense professional layout' },
    { key: 'servicetitan-v2' as VariationType, label: 'ServiceTitan V2', description: 'Enhanced metrics and timeline view' },
    { key: 'aspire-v1' as VariationType, label: 'Aspire V1', description: 'Green theme with opportunities focus' },
    { key: 'aspire-v2' as VariationType, label: 'Aspire V2', description: 'Form-based editing layout' },
    { key: 'combo-v1' as VariationType, label: 'Combo V1', description: 'Aspire colors with ServiceTitan density' },
    { key: 'combo-v2' as VariationType, label: 'Combo V2', description: 'Dashboard-focused hybrid approach' },
  ]

  // Show loading while fetching properties list
  if (propertiesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Show message if no properties exist
  if (properties?.items?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create some properties first to test the detail page variations.
          </p>
          <button
            onClick={() => navigate('/properties/new')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Property
          </button>
        </div>
      </div>
    )
  }

  // Show property selector if no property selected and we have properties
  if (!selectedPropertyId && properties?.items?.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select a Property</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {properties.items.map((prop) => (
              <button
                key={prop.id}
                onClick={() => setSelectedPropertyId(prop.id)}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left"
              >
                <h3 className="font-medium text-gray-900">{prop.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{prop.companyName}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {prop.address?.city}, {prop.address?.state}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Show loading while fetching selected property
  if (propertyLoading && selectedPropertyId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Show error if property not found
  if (error || (selectedPropertyId && !property && !propertyLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  if (!selectedPropertyId || !property) {
    return null // This will be handled by the property selector above
  }

  const handleEdit = () => {
    navigate(`/properties/${selectedPropertyId}/edit`)
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${property.name}"?`)) {
      // Delete logic would go here
      navigate('/properties')
    }
  }

  const renderVariation = () => {
    switch (selectedVariation) {
      case 'servicetitan-v1':
        return <PropertyDetailServiceTitanV1 property={property} onEdit={handleEdit} onDelete={handleDelete} />
      case 'servicetitan-v2':
        return <PropertyDetailServiceTitanV2 property={property} onEdit={handleEdit} onDelete={handleDelete} />
      case 'aspire-v1':
        return <PropertyDetailAspireV1 property={property} onEdit={handleEdit} onDelete={handleDelete} />
      case 'aspire-v2':
        return <PropertyDetailAspireV2 property={property} onEdit={handleEdit} onDelete={handleDelete} />
      case 'combo-v1':
        return <PropertyDetailComboV1 property={property} onEdit={handleEdit} onDelete={handleDelete} />
      case 'combo-v2':
        return <PropertyDetailComboV2 property={property} onEdit={handleEdit} onDelete={handleDelete} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Lab Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Property Detail Lab</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Testing different property detail page variations
                  </p>
                </div>
                {properties?.items && properties.items.length > 1 && (
                  <select
                    value={selectedPropertyId || ''}
                    onChange={(e) => setSelectedPropertyId(Number(e.target.value))}
                    className="ml-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {properties.items.map((prop) => (
                      <option key={prop.id} value={prop.id}>
                        {prop.name} - {prop.companyName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button
                onClick={() => navigate('/properties')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back to Properties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Variation Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-6 gap-4">
            {variations.map((variation) => (
              <button
                key={variation.key}
                onClick={() => setSelectedVariation(variation.key)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedVariation === variation.key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-sm font-medium text-gray-900">{variation.label}</div>
                <div className="text-xs text-gray-500 mt-1">{variation.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Variation Display */}
      <div className="flex-1">
        {renderVariation()}
      </div>
    </div>
  )
}