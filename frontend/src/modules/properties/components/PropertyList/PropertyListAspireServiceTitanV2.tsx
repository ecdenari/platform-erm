import React, { useState } from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens, platformStyles } from '../../../../styles/enterpriseTokens'
import { 
  Plus, Search, ChevronDown, ChevronRight, Eye,
  Edit2, Trash2, MoreVertical, CheckCircle2,
  Building2, MapPin, DollarSign, Calendar,
  TrendingUp, AlertCircle, Download, Filter,
  X, Grid3x3, List, SlidersHorizontal
} from 'lucide-react'

// Enhanced combined variant with expandable rows and financial metrics
export interface PropertyListAspireServiceTitanV2Props {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onBulkSelect?: (propertyIds: number[]) => void
}

export const PropertyListAspireServiceTitanV2: React.FC<PropertyListAspireServiceTitanV2Props> = ({
  properties,
  loading = false,
  onPropertyClick,
  onEdit,
  onDelete,
  onBulkSelect
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Array<{id: string, label: string, value: string}>>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
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

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows)
    if (expandedRows.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const addFilter = (id: string, label: string, value: string) => {
    setActiveFilters([...activeFilters, { id, label, value }])
  }

  const removeFilter = (id: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== id))
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

  const getStatusIcon = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.Active:
        return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case PropertyStatus.Inactive:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />
      case PropertyStatus.Pending:
        return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      default:
        return <div className="w-2 h-2 bg-gray-300 rounded-full" />
    }
  }

  const getPropertyTypeIcon = (type: PropertyType) => {
    switch (type) {
      case PropertyType.Commercial:
        return <Building2 className="h-3 w-3 text-gray-500" />
      case PropertyType.Residential:
        return <Building2 className="h-3 w-3 text-gray-500" />
      default:
        return null
    }
  }

  // Mock metrics for expanded view
  const getPropertyMetrics = (property: Property) => ({
    monthlyRevenue: Math.floor(Math.random() * 50000) + 10000,
    activeWorkOrders: Math.floor(Math.random() * 10),
    lastService: `${Math.floor(Math.random() * 7) + 1} days ago`,
    contractValue: Math.floor(Math.random() * 500000) + 100000,
    serviceTypes: ['Maintenance', 'Snow', 'Irrigation'].slice(0, Math.floor(Math.random() * 3) + 1),
    accountManager: 'Sarah Johnson',
    fieldManager: 'Mike Williams'
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
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Aspire-style Toolbar */}
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
            
            {/* View Toggle */}
            <div className="flex items-center bg-white border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                title="Grid view"
              >
                <Grid3x3 className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                title="List view"
              >
                <List className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            
            {/* Filters Button */}
            <button className="p-2 bg-white border border-gray-300 rounded-md">
              <SlidersHorizontal className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Selected Actions */}
            {selectedIds.size > 0 && (
              <>
                <span className="text-sm text-gray-600">{selectedIds.size} selected</span>
                <button className="text-sm text-blue-600 hover:text-blue-700">Bulk Edit</button>
                <span className="text-gray-400">|</span>
              </>
            )}
            
            {/* Action Buttons */}
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="inline h-4 w-4 mr-1" />
              Export
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
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-gray-600">Filters:</span>
            {activeFilters.map(filter => (
              <div
                key={filter.id}
                className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full text-sm"
              >
                <span className="text-gray-700">{filter.label}: {filter.value}</span>
                <button
                  onClick={() => removeFilter(filter.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Enhanced ServiceTitan Table with Aspire Elements */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className={styles.table.container}>
            {/* Header Actions Bar */}
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">
                  {filteredProperties.length} properties
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-xs text-gray-600 hover:text-gray-900">Columns</button>
              </div>
            </div>

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
                  <th className={`${styles.table.headerCell} w-10`}></th>
                  <th className={`${styles.table.headerCell} text-left`}>Property</th>
                  <th className={`${styles.table.headerCell} text-left`}>Company</th>
                  <th className={`${styles.table.headerCell} text-left`}>Location</th>
                  <th className={`${styles.table.headerCell} text-center`}>Status</th>
                  <th className={`${styles.table.headerCell} text-right`}>Monthly Rev</th>
                  <th className={`${styles.table.headerCell} text-center`}>Work Orders</th>
                  <th className={`${styles.table.headerCell} text-center`}>Last Service</th>
                  <th className={`${styles.table.headerCell} text-center`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property, index) => {
                  const metrics = getPropertyMetrics(property)
                  const isExpanded = expandedRows.has(property.id)
                  const isHovered = hoveredRow === property.id
                  const isSelected = selectedIds.has(property.id)
                  
                  return (
                    <React.Fragment key={property.id}>
                      <tr
                        className={`
                          ${styles.table.row} group
                          ${index % 2 === 0 ? '' : 'bg-gray-25'}
                          ${isHovered ? 'bg-blue-50' : ''}
                          ${isExpanded ? 'bg-blue-50 border-b-0' : ''}
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
                        <td className={`${styles.table.cell} text-center`}>
                          {getStatusIcon(property.status)}
                        </td>
                        <td className={`${styles.table.cell}`}>
                          <div 
                            className="cursor-pointer"
                            onClick={() => onPropertyClick?.(property)}
                          >
                            <div className="flex items-center space-x-2">
                              {getPropertyTypeIcon(property.propertyType)}
                              <div>
                                <div className="font-medium text-gray-900 text-xs">
                                  {property.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {property.id} • {property.propertyType}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={`${styles.table.cell}`}>
                          <div className="text-xs text-gray-900">{property.companyName}</div>
                        </td>
                        <td className={`${styles.table.cell}`}>
                          <div className="text-xs">
                            <div className="text-gray-900">{property.address?.city}, {property.address?.state}</div>
                            <div className="text-gray-500">{property.address?.zipCode}</div>
                          </div>
                        </td>
                        <td className={`${styles.table.cell} text-center`}>
                          <span className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded ${
                            property.status === PropertyStatus.Active ? 'bg-green-100 text-green-800' :
                            property.status === PropertyStatus.Inactive ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {property.status}
                          </span>
                        </td>
                        <td className={`${styles.table.cell} text-right`}>
                          <div className="text-xs">
                            <div className="font-medium text-gray-900">
                              ${metrics.monthlyRevenue.toLocaleString()}
                            </div>
                            <div className="text-gray-500">per month</div>
                          </div>
                        </td>
                        <td className={`${styles.table.cell} text-center`}>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-xs font-medium text-gray-900">{metrics.activeWorkOrders}</span>
                            <span className="text-xs text-gray-500">active</span>
                          </div>
                        </td>
                        <td className={`${styles.table.cell} text-center`}>
                          <div className="flex items-center justify-center space-x-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{metrics.lastService}</span>
                          </div>
                        </td>
                        <td className={`${styles.table.cell} text-center`}>
                          <div className="flex items-center justify-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleRowExpansion(property.id)
                              }}
                              className={`p-1 rounded transition-opacity ${
                                isHovered || isExpanded ? 'opacity-100' : 'opacity-0'
                              }`}
                              title={isExpanded ? 'Collapse' : 'Expand'}
                            >
                              <svg className={`h-3 w-3 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
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
                      
                      {/* Expanded Row */}
                      {isExpanded && (
                        <tr className="bg-blue-50 border-b border-gray-200">
                          <td colSpan={10} className="px-6 py-4">
                            <div className="grid grid-cols-4 gap-6 text-xs">
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Property Details</h4>
                                <dl className="space-y-1">
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Square Footage:</dt>
                                    <dd className="font-medium">{property.squareFootage?.toLocaleString() || 'N/A'} sq ft</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Acreage:</dt>
                                    <dd className="font-medium">{property.acreageSize || 'N/A'} acres</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Created:</dt>
                                    <dd className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</dd>
                                  </div>
                                </dl>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Financial Overview</h4>
                                <dl className="space-y-1">
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Contract Value:</dt>
                                    <dd className="font-medium text-green-600">${metrics.contractValue.toLocaleString()}</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">YTD Revenue:</dt>
                                    <dd className="font-medium">${(metrics.monthlyRevenue * 8).toLocaleString()}</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Growth:</dt>
                                    <dd className="font-medium text-green-600">+12%</dd>
                                  </div>
                                </dl>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Management</h4>
                                <dl className="space-y-1">
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Account Manager:</dt>
                                    <dd className="font-medium">{metrics.accountManager}</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt className="text-gray-500">Field Manager:</dt>
                                    <dd className="font-medium">{metrics.fieldManager}</dd>
                                  </div>
                                  <div className="text-gray-500 mt-2">Active Services:</div>
                                  <div className="flex flex-wrap gap-1">
                                    {metrics.serviceTypes.map(service => (
                                      <span key={service} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                        {service}
                                      </span>
                                    ))}
                                  </div>
                                </dl>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
                                <div className="space-y-1">
                                  <button 
                                    className="w-full text-left px-3 py-2 text-sm font-medium text-white rounded hover:opacity-90"
                                    style={{ backgroundColor: aspireGreen }}
                                  >
                                    Create Work Order
                                  </button>
                                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                                    View Contracts
                                  </button>
                                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                                    Generate Report
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              {filteredProperties.length} results
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}