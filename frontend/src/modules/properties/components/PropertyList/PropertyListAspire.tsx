import React from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens, platformStyles } from '../../../../styles/enterpriseTokens'

export interface PropertyListAspireProps {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onViewWorkOrders?: (property: Property) => void
  onCreateWorkOrder?: (property: Property) => void
  groupByCompany?: boolean
}

interface GroupedProperties {
  [companyId: number]: {
    companyName: string
    properties: Property[]
  }
}

export const PropertyListAspire: React.FC<PropertyListAspireProps> = ({
  properties,
  loading = false,
  onPropertyClick,
  onEdit,
  onDelete,
  onViewWorkOrders,
  onCreateWorkOrder,
  groupByCompany = true
}) => {
  const styles = platformStyles.aspire
  const [expandedCompanies, setExpandedCompanies] = React.useState<Set<number>>(new Set())

  const groupPropertiesByCompany = (): GroupedProperties => {
    return properties.reduce((acc, property) => {
      if (!acc[property.companyId]) {
        acc[property.companyId] = {
          companyName: property.companyName,
          properties: []
        }
      }
      acc[property.companyId].properties.push(property)
      return acc
    }, {} as GroupedProperties)
  }

  const toggleCompany = (companyId: number) => {
    const newExpanded = new Set(expandedCompanies)
    if (newExpanded.has(companyId)) {
      newExpanded.delete(companyId)
    } else {
      newExpanded.add(companyId)
    }
    setExpandedCompanies(newExpanded)
  }

  const getStatusColor = (status: PropertyStatus) => {
    const colors = {
      [PropertyStatus.Active]: 'text-green-700 bg-green-50 border-green-200',
      [PropertyStatus.Inactive]: 'text-gray-700 bg-gray-50 border-gray-200',
      [PropertyStatus.Pending]: 'text-blue-700 bg-blue-50 border-blue-200',
      [PropertyStatus.Sold]: 'text-purple-700 bg-purple-50 border-purple-200',
      [PropertyStatus.Archived]: 'text-red-700 bg-red-50 border-red-200'
    }
    return colors[status] || 'text-gray-700 bg-gray-50 border-gray-200'
  }

  const getPropertyTypeLabel = (type: PropertyType) => {
    return type.toUpperCase()
  }

  const renderProperty = (property: Property, isGrouped: boolean = false) => (
    <div
      key={property.id}
      className={`${styles.card.container} ${isGrouped ? 'ml-8 border-l-4 border-slate-200' : ''}`}
    >
      <div className={styles.card.header}>
        <div>
          <h3 className={styles.card.title}>
            <button
              onClick={() => onPropertyClick?.(property)}
              className="hover:text-blue-600 transition-colors"
            >
              {property.name}
            </button>
          </h3>
          <div className="text-sm text-slate-600 mt-1">
            {!isGrouped && <span className="font-medium">{property.companyName} • </span>}
            <span>{property.fullAddress}</span>
          </div>
        </div>
        
        <div className={styles.card.idSection}>
          <div className="text-right">
            <div className="font-mono text-xs text-slate-500">PROP-{property.id.toString().padStart(5, '0')}</div>
            <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium mt-1 ${getStatusColor(property.status)}`}>
              {property.status}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card.details}>
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Type</div>
          <div className="font-medium text-sm">{getPropertyTypeLabel(property.propertyType)}</div>
        </div>
        
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Size</div>
          <div className="font-medium text-sm">
            {property.squareFootage ? `${property.squareFootage.toLocaleString()} sq ft` : '-'}
            {property.acreageSize && ` / ${property.acreageSize} acres`}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Work Orders</div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm">12 Active</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onViewWorkOrders?.(property)
              }}
              className="text-blue-600 hover:text-blue-700 text-xs"
            >
              View
            </button>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Contract Value</div>
          <div className="font-medium text-sm">$24,500/yr</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onCreateWorkOrder?.(property)
          }}
          className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Work Order
        </button>
        
        <div className="flex items-center space-x-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(property)
              }}
              className="text-slate-600 hover:text-slate-900 p-1"
              title="Edit Property"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(property)
              }}
              className="text-slate-600 hover:text-red-600 p-1"
              title="Delete Property"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Loading properties...</div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <svg className="w-16 h-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <p className="text-slate-500 text-lg">No properties found</p>
        <p className="text-sm text-slate-400 mt-1">Create your first commercial property to get started</p>
      </div>
    )
  }

  if (groupByCompany) {
    const grouped = groupPropertiesByCompany()
    
    return (
      <div className="space-y-4">
        {Object.entries(grouped).map(([companyId, group]) => {
          const isExpanded = expandedCompanies.has(parseInt(companyId))
          const propertyCount = group.properties.length
          
          return (
            <div key={companyId} className="border border-slate-200 rounded-md overflow-hidden">
              <button
                onClick={() => toggleCompany(parseInt(companyId))}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4 mr-2 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium text-slate-900">{group.companyName}</span>
                  <span className="ml-2 text-sm text-slate-500">({propertyCount} {propertyCount === 1 ? 'property' : 'properties'})</span>
                </div>
                <div className="text-sm text-slate-600">
                  Total Contract Value: $142,500/yr
                </div>
              </button>
              
              {isExpanded && (
                <div className="p-4 space-y-4 bg-gray-25">
                  {group.properties.map(property => renderProperty(property, true))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {properties.map(property => renderProperty(property))}
    </div>
  )
}