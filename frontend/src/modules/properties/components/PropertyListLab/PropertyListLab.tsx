import React, { useState } from 'react'
import { PropertyListServiceTitan } from '../PropertyList/PropertyListServiceTitan'
import { PropertyListLMN } from '../PropertyList/PropertyListLMN'
import { PropertyListAspire } from '../PropertyList/PropertyListAspire'
import { useProperties } from '../../hooks'
import { Property } from '../../types'

type PlatformVariant = 'servicetitan' | 'lmn' | 'aspire' | 'compare'

export const PropertyListLab: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<PlatformVariant>('compare')
  const { data, isLoading } = useProperties({ pageSize: 20 })
  
  const properties = data?.items || []

  const handlePropertyClick = (property: Property) => {
    console.log('Property clicked:', property)
  }

  const handleEdit = (property: Property) => {
    console.log('Edit property:', property)
  }

  const handleDelete = (property: Property) => {
    console.log('Delete property:', property)
  }

  const handleBulkSelect = (propertyIds: number[]) => {
    console.log('Bulk select:', propertyIds)
  }

  const handleNavigate = (property: Property) => {
    console.log('Navigate to property:', property)
  }

  const handleScheduleService = (property: Property) => {
    console.log('Schedule service for property:', property)
  }

  const handleViewWorkOrders = (property: Property) => {
    console.log('View work orders for property:', property)
  }

  const handleCreateWorkOrder = (property: Property) => {
    console.log('Create work order for property:', property)
  }

  const renderVariant = (variant: PlatformVariant) => {
    switch (variant) {
      case 'servicetitan':
        return (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                ServiceTitan Variant - Maximum Density
              </h3>
            </div>
            <div className="p-4">
              <PropertyListServiceTitan
                properties={properties}
                loading={isLoading}
                onPropertyClick={handlePropertyClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBulkSelect={handleBulkSelect}
              />
            </div>
          </div>
        )
      
      case 'lmn':
        return (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-green-50 px-4 py-2 border-b border-green-200">
              <h3 className="text-sm font-semibold text-green-800">
                LMN Variant - Landscape Features
              </h3>
            </div>
            <div className="p-4 bg-gray-50">
              <PropertyListLMN
                properties={properties}
                loading={isLoading}
                onPropertyClick={handlePropertyClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onNavigate={handleNavigate}
                onScheduleService={handleScheduleService}
              />
            </div>
          </div>
        )
      
      case 'aspire':
        return (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-300">
              <h3 className="text-sm font-semibold text-slate-700">
                Aspire Variant - Commercial Hierarchy
              </h3>
            </div>
            <div className="p-4">
              <PropertyListAspire
                properties={properties}
                loading={isLoading}
                onPropertyClick={handlePropertyClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewWorkOrders={handleViewWorkOrders}
                onCreateWorkOrder={handleCreateWorkOrder}
                groupByCompany={true}
              />
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Property List Component Lab
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedVariant('compare')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedVariant === 'compare'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Compare All
              </button>
              <button
                onClick={() => setSelectedVariant('servicetitan')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedVariant === 'servicetitan'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ServiceTitan
              </button>
              <button
                onClick={() => setSelectedVariant('lmn')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedVariant === 'lmn'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                LMN
              </button>
              <button
                onClick={() => setSelectedVariant('aspire')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedVariant === 'aspire'
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Aspire
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedVariant === 'compare' ? (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Platform Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">ServiceTitan</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Maximum density (30px rows)</li>
                    <li>• Bulk selection</li>
                    <li>• Hover actions</li>
                    <li>• Professional grays</li>
                    <li>• 12+ rows visible</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-green-700 mb-2">LMN</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Card-based layout</li>
                    <li>• GPS/navigation buttons</li>
                    <li>• Service scheduling</li>
                    <li>• Visual property types</li>
                    <li>• Field-friendly spacing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-slate-700 mb-2">Aspire</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Company grouping</li>
                    <li>• Work order integration</li>
                    <li>• Contract values</li>
                    <li>• B2B aesthetic</li>
                    <li>• Hierarchical display</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {renderVariant('servicetitan')}
              {renderVariant('lmn')}
              {renderVariant('aspire')}
            </div>
          </div>
        ) : (
          <div>{renderVariant(selectedVariant)}</div>
        )}
      </div>
    </div>
  )
}