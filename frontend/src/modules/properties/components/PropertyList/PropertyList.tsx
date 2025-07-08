import React from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens } from '../../../../styles/enterpriseTokens'

export interface PropertyListProps {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  loading = false,
  onPropertyClick,
  onEdit,
  onDelete
}) => {
  const getStatusColor = (status: PropertyStatus) => {
    const colors = enterpriseTokens.colors.status
    switch (status) {
      case PropertyStatus.Active:
        return colors.completed
      case PropertyStatus.Inactive:
        return colors.draft
      case PropertyStatus.Pending:
        return colors.scheduled
      case PropertyStatus.Sold:
        return colors.onHold
      case PropertyStatus.Archived:
        return colors.cancelled
      default:
        return colors.draft
    }
  }

  const getPropertyTypeIcon = (type: PropertyType) => {
    switch (type) {
      case PropertyType.Commercial:
        return '🏢'
      case PropertyType.Residential:
        return '🏠'
      case PropertyType.Industrial:
        return '🏭'
      case PropertyType.Mixed:
        return '🏘️'
      case PropertyType.Vacant:
        return '🌳'
      default:
        return '📍'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading properties...</div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No properties found</div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {properties.map((property) => (
            <tr
              key={property.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onPropertyClick?.(property)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {property.name}
                </div>
                {property.description && (
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {property.description}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="mr-2">{getPropertyTypeIcon(property.propertyType)}</span>
                  <span className="text-sm text-gray-900">
                    {property.propertyType}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{property.companyName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{property.fullAddress}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  style={{
                    backgroundColor: `${getStatusColor(property.status)}20`,
                    color: getStatusColor(property.status)
                  }}
                >
                  {property.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {property.squareFootage && (
                  <div>{property.squareFootage.toLocaleString()} sq ft</div>
                )}
                {property.acreageSize && (
                  <div>{property.acreageSize} acres</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(property)
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(property)
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}