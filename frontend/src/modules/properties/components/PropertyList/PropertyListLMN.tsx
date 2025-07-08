import React from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens, platformStyles } from '../../../../styles/enterpriseTokens'

export interface PropertyListLMNProps {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onNavigate?: (property: Property) => void
  onScheduleService?: (property: Property) => void
}

export const PropertyListLMN: React.FC<PropertyListLMNProps> = ({
  properties,
  loading = false,
  onPropertyClick,
  onEdit,
  onDelete,
  onNavigate,
  onScheduleService
}) => {
  const styles = platformStyles.lmn

  const getPropertyTypeColor = (type: PropertyType) => {
    const colors = {
      [PropertyType.Commercial]: 'from-blue-400 to-blue-600',
      [PropertyType.Residential]: 'from-green-400 to-green-600',
      [PropertyType.Industrial]: 'from-gray-400 to-gray-600',
      [PropertyType.Mixed]: 'from-purple-400 to-purple-600',
      [PropertyType.Vacant]: 'from-emerald-400 to-emerald-600'
    }
    return colors[type] || 'from-gray-400 to-gray-600'
  }

  const getStatusBadge = (status: PropertyStatus) => {
    const badges = {
      [PropertyStatus.Active]: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' },
      [PropertyStatus.Inactive]: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '⊘' },
      [PropertyStatus.Pending]: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '⏳' },
      [PropertyStatus.Sold]: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🏷️' },
      [PropertyStatus.Archived]: { bg: 'bg-red-100', text: 'text-red-800', icon: '📁' }
    }
    return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: '•' }
  }

  const getServiceTags = (property: Property) => {
    const tags = []
    if (property.propertyType === PropertyType.Commercial) {
      tags.push({ name: 'Weekly Mow', color: 'bg-green-100 text-green-800' })
      tags.push({ name: 'Irrigation', color: 'bg-blue-100 text-blue-800' })
    }
    if (property.propertyType === PropertyType.Residential) {
      tags.push({ name: 'Bi-weekly', color: 'bg-emerald-100 text-emerald-800' })
    }
    if (property.acreageSize && property.acreageSize > 5) {
      tags.push({ name: 'Large Property', color: 'bg-orange-100 text-orange-800' })
    }
    return tags
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <span className="text-gray-600">Loading properties...</span>
        </div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <p className="text-gray-500">No properties found</p>
        <p className="text-sm text-gray-400 mt-1">Add your first property to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => {
        const statusBadge = getStatusBadge(property.status)
        const serviceTags = getServiceTags(property)
        
        return (
          <div
            key={property.id}
            className={`${styles.card.container} group`}
            onClick={() => onPropertyClick?.(property)}
          >
            <div className={`${styles.card.header} bg-gradient-to-br ${getPropertyTypeColor(property.propertyType)}`}>
              <div className="absolute top-2 left-2">
                <span className="bg-white bg-opacity-90 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                  {property.propertyType}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`${statusBadge.bg} ${statusBadge.text} text-xs font-semibold px-2 py-1 rounded flex items-center`}>
                  <span className="mr-1">{statusBadge.icon}</span>
                  {property.status}
                </span>
              </div>
              {property.latitude && property.longitude && (
                <div className="absolute bottom-2 right-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onNavigate?.(property)
                    }}
                    className="bg-white bg-opacity-90 text-gray-700 p-1 rounded hover:bg-opacity-100 transition-all"
                    title="Navigate to property"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className={styles.card.content}>
              <h3 className={styles.card.title}>{property.name}</h3>
              
              <div className="text-sm text-gray-600 mb-2">{property.companyName}</div>
              
              <div className="flex items-start space-x-1 text-xs text-gray-500 mb-3">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="line-clamp-2">{property.fullAddress}</span>
              </div>
              
              <div className={styles.card.tags}>
                {serviceTags.map((tag, index) => (
                  <span key={index} className={`${tag.color} text-xs px-2 py-1 rounded-full`}>
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                {property.squareFootage && (
                  <div>
                    <span className="text-gray-500">Size:</span>
                    <span className="ml-1 font-medium">{property.squareFootage.toLocaleString()} sq ft</span>
                  </div>
                )}
                {property.acreageSize && (
                  <div>
                    <span className="text-gray-500">Land:</span>
                    <span className="ml-1 font-medium">{property.acreageSize} acres</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onScheduleService?.(property)
                  }}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule
                </button>
                
                <div className="flex items-center space-x-2">
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(property)
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                      title="Edit"
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
                      className="text-gray-600 hover:text-red-600 p-1"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}