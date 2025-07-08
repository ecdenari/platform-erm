import React, { useState } from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens, platformStyles } from '../../../../styles/enterpriseTokens'
import { 
  MoreVertical, Edit2, Trash2, Eye, Plus,
  Search, ChevronDown, Filter, Download,
  CheckSquare, Building2, MapPin, Calendar
} from 'lucide-react'

// Combined Aspire UI aesthetics with ServiceTitan's dense data approach
export interface PropertyListAspireServiceTitanProps {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onBulkSelect?: (propertyIds: number[]) => void
}

export const PropertyListAspireServiceTitan: React.FC<PropertyListAspireServiceTitanProps> = ({
  properties,
  loading = false,
  onPropertyClick,
  onEdit,
  onDelete,
  onBulkSelect
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const styles = platformStyles.serviceTitan
  const aspireGreen = '#52C41A'

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(properties.map(p => p.id))
      setSelectedIds(allIds)
      onBulkSelect?.(Array.from(allIds))
    } else {
      setSelectedIds(new Set())
      onBulkSelect?.([])
    }
  }

  const handleSelectOne = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedIds)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedIds(newSelected)
    onBulkSelect?.(Array.from(newSelected))
  }

  // Filter properties based on search
  const filteredProperties = properties.filter(property => {
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      property.name.toLowerCase().includes(searchLower) ||
      property.companyName?.toLowerCase().includes(searchLower) ||
      property.address?.city?.toLowerCase().includes(searchLower) ||
      property.id.toString().includes(searchLower)
    )
  })

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.Active:
        return 'bg-green-100 text-green-800'
      case PropertyStatus.Inactive:
        return 'bg-gray-100 text-gray-800'
      case PropertyStatus.Pending:
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPropertyFinancials = (property: Property) => ({
    monthlyRecurring: Math.floor(Math.random() * 50000) + 10000,
    contractValue: Math.floor(Math.random() * 500000) + 100000,
    lastInvoice: `${Math.floor(Math.random() * 30) + 1} days ago`,
    activeWorkOrders: Math.floor(Math.random() * 5) + 1
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-xs text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        Loading properties...
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Building2 className="h-12 w-12 text-gray-300 mb-3" />
        <p className="text-sm">No properties found</p>
        <p className="text-xs text-gray-400 mt-1">Add your first property to get started</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Aspire-style Header Bar */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-80"
              />
            </div>
            
            {/* Filters */}
            <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="inline h-4 w-4 mr-1" />
              Filters
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* ServiceTitan-style Selected Count */}
            {selectedIds.size > 0 && (
              <>
                <span className="text-sm text-gray-600">{selectedIds.size} selected</span>
                <button className="text-sm text-blue-600 hover:text-blue-700">Bulk Edit</button>
                <span className="text-gray-400">|</span>
              </>
            )}
            
            {/* Aspire-style Action Buttons */}
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              BULK ACTIONS
              <ChevronDown className="inline h-4 w-4 ml-1" />
            </button>
            
            <button
              className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90"
              style={{ backgroundColor: aspireGreen }}
            >
              <Plus className="inline h-4 w-4 mr-1" />
              NEW PROPERTY
            </button>
          </div>
        </div>
      </div>

      {/* ServiceTitan Dense Table with Aspire Styling */}
      <div className={styles.table.container}>
        <table className="w-full">
          <thead className={styles.table.header}>
            <tr>
              <th className={`${styles.table.headerCell} w-8`}>
                <input
                  type="checkbox"
                  className="h-3 w-3"
                  checked={selectedIds.size === filteredProperties.length && filteredProperties.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className={`${styles.table.headerCell} text-left`}>Property</th>
              <th className={`${styles.table.headerCell} text-left`}>Company</th>
              <th className={`${styles.table.headerCell} text-left`}>Location</th>
              <th className={`${styles.table.headerCell} text-center`}>Type</th>
              <th className={`${styles.table.headerCell} text-center`}>Status</th>
              <th className={`${styles.table.headerCell} text-right`}>Monthly Revenue</th>
              <th className={`${styles.table.headerCell} text-center`}>Work Orders</th>
              <th className={`${styles.table.headerCell} text-center`}>Last Service</th>
              <th className={styles.table.actionCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property, index) => {
              const financials = getPropertyFinancials(property)
              const isHovered = hoveredRow === property.id
              const isSelected = selectedIds.has(property.id)
              
              return (
                <tr
                  key={property.id}
                  className={`
                    ${styles.table.row} group
                    ${index % 2 === 0 ? '' : 'bg-gray-25'}
                    ${isHovered ? 'bg-blue-50' : ''}
                    ${isSelected ? 'bg-blue-50' : ''}
                  `}
                  onMouseEnter={() => setHoveredRow(property.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className={`${styles.table.cell} text-center`}>
                    <input
                      type="checkbox"
                      className="h-3 w-3"
                      checked={isSelected}
                      onChange={(e) => handleSelectOne(property.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className={`${styles.table.cell}`}>
                    <div 
                      className="cursor-pointer"
                      onClick={() => onPropertyClick?.(property)}
                    >
                      <div className="font-medium text-gray-900 text-xs">
                        {property.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {property.id} • {property.squareFootage?.toLocaleString() || 'N/A'} sq ft
                      </div>
                    </div>
                  </td>
                  <td className={`${styles.table.cell}`}>
                    <div className="text-xs text-gray-900">{property.companyName}</div>
                  </td>
                  <td className={`${styles.table.cell}`}>
                    <div className="text-xs">
                      <div className="text-gray-900 flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                        {property.address?.city}, {property.address?.state}
                      </div>
                      <div className="text-gray-500">
                        {property.address?.zipCode}
                      </div>
                    </div>
                  </td>
                  <td className={`${styles.table.cell} text-center`}>
                    <span className="text-xs text-gray-600">{property.propertyType}</span>
                  </td>
                  <td className={`${styles.table.cell} text-center`}>
                    <span className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded ${getStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className={`${styles.table.cell} text-right`}>
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">
                        ${financials.monthlyRecurring.toLocaleString()}
                      </div>
                      <div className="text-gray-500">per month</div>
                    </div>
                  </td>
                  <td className={`${styles.table.cell} text-center`}>
                    <div className="flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-900">{financials.activeWorkOrders}</span>
                      <span className="text-xs text-gray-500 ml-1">active</span>
                    </div>
                  </td>
                  <td className={`${styles.table.cell} text-center`}>
                    <div className="flex items-center justify-center">
                      <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-600">{financials.lastInvoice}</span>
                    </div>
                  </td>
                  <td className={styles.table.actionCell}>
                    <div className="flex items-center justify-end space-x-1">
                      <div className={`flex items-center space-x-1 transition-opacity ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onPropertyClick?.(property)
                          }}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title="View"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onEdit(property)
                            }}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Edit"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onDelete(property)
                            }}
                            className="p-1 text-gray-500 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title="More actions"
                      >
                        <MoreVertical className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}