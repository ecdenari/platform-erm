import React, { useState } from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens, platformStyles } from '../../../../styles/enterpriseTokens'
import { 
  MoreVertical, Edit2, Trash2, Eye, Copy, 
  DollarSign, Calendar, Users, CheckSquare,
  TrendingUp, AlertCircle, Clock, Building2
} from 'lucide-react'

export interface PropertyListServiceTitanV2Props {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onBulkSelect?: (propertyIds: number[]) => void
}

export const PropertyListServiceTitanV2: React.FC<PropertyListServiceTitanV2Props> = ({
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
  const styles = platformStyles.serviceTitan

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
        return <Users className="h-3 w-3 text-gray-500" />
      default:
        return null
    }
  }

  // Mock data for expanded view
  const getPropertyMetrics = (property: Property) => ({
    monthlyRevenue: Math.floor(Math.random() * 50000) + 10000,
    activeWorkOrders: Math.floor(Math.random() * 10),
    lastService: `${Math.floor(Math.random() * 7) + 1} days ago`,
    contractValue: Math.floor(Math.random() * 500000) + 100000,
    serviceTypes: ['Maintenance', 'Snow', 'Irrigation'].slice(0, Math.floor(Math.random() * 3) + 1)
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
      <div className={styles.table.container}>
        {/* Header Actions Bar */}
        <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">
              {selectedIds.size > 0 ? `${selectedIds.size} selected` : `${properties.length} properties`}
            </span>
            {selectedIds.size > 0 && (
              <>
                <span className="text-gray-400">|</span>
                <button className="text-xs text-blue-600 hover:text-blue-700">Bulk Edit</button>
                <button className="text-xs text-red-600 hover:text-red-700">Delete</button>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-xs text-gray-600 hover:text-gray-900">Export</button>
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
                  checked={selectedIds.size === properties.length && properties.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className={`${styles.table.headerCell} w-10`}></th>
              <th className={`${styles.table.headerCell} text-left`}>
                <div className="flex items-center space-x-1">
                  <span>Property</span>
                  <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </th>
              <th className={`${styles.table.headerCell} text-left`}>Company</th>
              <th className={`${styles.table.headerCell} text-left`}>Location</th>
              <th className={`${styles.table.headerCell} text-center`}>Status</th>
              <th className={`${styles.table.headerCell} text-right`}>Monthly Rev</th>
              <th className={`${styles.table.headerCell} text-center`}>Work Orders</th>
              <th className={`${styles.table.headerCell} text-center`}>Last Service</th>
              <th className={styles.table.actionCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => {
              const metrics = getPropertyMetrics(property)
              const isExpanded = expandedRows.has(property.id)
              const isHovered = hoveredRow === property.id
              
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
                        checked={selectedIds.has(property.id)}
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
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{metrics.lastService}</span>
                      </div>
                    </td>
                    <td className={styles.table.actionCell}>
                      <div className="flex items-center justify-end space-x-1">
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
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="More actions"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </button>
                        </div>
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
                            <h4 className="font-medium text-gray-700 mb-2">Service Information</h4>
                            <div className="space-y-1">
                              <div className="text-gray-500">Active Services:</div>
                              <div className="flex flex-wrap gap-1">
                                {metrics.serviceTypes.map(service => (
                                  <span key={service} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                    {service}
                                  </span>
                                ))}
                              </div>
                              <div className="text-gray-500 mt-2">Next Service:</div>
                              <div className="font-medium">Tomorrow, 8:00 AM</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
                            <div className="space-y-1">
                              <button className="w-full text-left px-2 py-1 text-gray-700 hover:bg-white rounded">
                                View Work History
                              </button>
                              <button className="w-full text-left px-2 py-1 text-gray-700 hover:bg-white rounded">
                                Create Work Order
                              </button>
                              <button className="w-full text-left px-2 py-1 text-gray-700 hover:bg-white rounded">
                                View Contracts
                              </button>
                              <button className="w-full text-left px-2 py-1 text-gray-700 hover:bg-white rounded">
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
    </div>
  )
}