import React from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens, platformStyles } from '../../../../styles/enterpriseTokens'

export interface PropertyListServiceTitanProps {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onBulkSelect?: (propertyIds: number[]) => void
}

export const PropertyListServiceTitan: React.FC<PropertyListServiceTitanProps> = ({
  properties,
  loading = false,
  onPropertyClick,
  onEdit,
  onDelete,
  onBulkSelect
}) => {
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set())
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

  const getStatusBadge = (status: PropertyStatus) => {
    const colors = {
      [PropertyStatus.Active]: 'bg-green-100 text-green-800',
      [PropertyStatus.Inactive]: 'bg-gray-100 text-gray-800',
      [PropertyStatus.Pending]: 'bg-blue-100 text-blue-800',
      [PropertyStatus.Sold]: 'bg-purple-100 text-purple-800',
      [PropertyStatus.Archived]: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getTypeAbbr = (type: PropertyType) => {
    const abbr = {
      [PropertyType.Commercial]: 'COM',
      [PropertyType.Residential]: 'RES',
      [PropertyType.Industrial]: 'IND',
      [PropertyType.Mixed]: 'MIX',
      [PropertyType.Vacant]: 'VAC'
    }
    return abbr[type] || 'OTH'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-xs text-gray-500">
        Loading...
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-xs text-gray-500">
        No properties found
      </div>
    )
  }

  return (
    <div className={styles.table.container}>
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
            <th className={`${styles.table.headerCell} text-left`}>ID</th>
            <th className={`${styles.table.headerCell} text-left`}>Name</th>
            <th className={`${styles.table.headerCell} text-center`}>Type</th>
            <th className={`${styles.table.headerCell} text-left`}>Company</th>
            <th className={`${styles.table.headerCell} text-left`}>Address</th>
            <th className={`${styles.table.headerCell} text-center`}>Status</th>
            <th className={`${styles.table.headerCell} text-right`}>Sq Ft</th>
            <th className={`${styles.table.headerCell} text-right`}>Acres</th>
            <th className={styles.table.actionCell}></th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr
              key={property.id}
              className={`${styles.table.row} ${index % 2 === 0 ? '' : 'bg-gray-25'}`}
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
              <td className={`${styles.table.cell} font-mono`}>
                #{property.id}
              </td>
              <td
                className={`${styles.table.cell} font-medium cursor-pointer hover:text-blue-600`}
                onClick={() => onPropertyClick?.(property)}
              >
                <div className="truncate max-w-xs" title={property.name}>
                  {property.name}
                </div>
              </td>
              <td className={`${styles.table.cell} text-center`}>
                <span className="font-mono text-xs text-gray-600">
                  {getTypeAbbr(property.propertyType)}
                </span>
              </td>
              <td className={styles.table.cell}>
                <div className="truncate max-w-xs" title={property.companyName}>
                  {property.companyName}
                </div>
              </td>
              <td className={styles.table.cell}>
                <div className="truncate max-w-xs" title={property.fullAddress}>
                  {property.fullAddress}
                </div>
              </td>
              <td className={`${styles.table.cell} text-center`}>
                <span className={`inline-flex px-1 py-0.5 text-xs font-medium rounded ${getStatusBadge(property.status)}`}>
                  {property.status.substring(0, 3).toUpperCase()}
                </span>
              </td>
              <td className={`${styles.table.cell} text-right font-mono`}>
                {property.squareFootage?.toLocaleString() || '-'}
              </td>
              <td className={`${styles.table.cell} text-right font-mono`}>
                {property.acreageSize || '-'}
              </td>
              <td className={styles.table.actionCell}>
                <div className="opacity-0 group-hover:opacity-100 flex items-center justify-end space-x-1">
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(property)
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                      title="Edit"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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