import React, { useState } from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens, platformStyles } from '../../../../styles/enterpriseTokens'
import { 
  Search, ChevronDown, Eye, Plus
} from 'lucide-react'

export interface PropertyListAspireV2Props {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onBulkSelect?: (propertyIds: number[]) => void
}

export const PropertyListAspireV2: React.FC<PropertyListAspireV2Props> = ({
  properties,
  loading = false,
  onPropertyClick,
  onEdit,
  onDelete,
  onBulkSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
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
    const searchLower = searchQuery.toLowerCase()
    return (
      property.name.toLowerCase().includes(searchLower) ||
      property.companyName?.toLowerCase().includes(searchLower) ||
      property.address?.city?.toLowerCase().includes(searchLower) ||
      property.address?.state?.toLowerCase().includes(searchLower) ||
      property.id.toString().includes(searchLower)
    )
  })

  // Mock additional data
  const getPropertyDetails = (property: Property) => ({
    contact: `John Smith`,
    accountManager: `Sarah Johnson`,
    fieldManager: `Mike Williams`
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
    <div className="w-full bg-white">
      {/* Simple Clean Table */}
      <div className="">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Property Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Address</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">City</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Account Manager</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Field Manager</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Property Type</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property, index) => {
              const details = getPropertyDetails(property)
              const isSelected = selectedIds.has(property.id)
              
              return (
                <tr 
                  key={property.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  style={{ height: '45px' }}
                  onClick={() => onPropertyClick?.(property)}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectOne(property.id, e.target.checked)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{property.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{property.companyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{details.contact}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{property.address?.street}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{property.address?.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{property.address?.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{details.accountManager}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{details.fieldManager}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{property.status}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{property.propertyType}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onPropertyClick?.(property)
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Eye className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-600">No properties found</p>
          </div>
        )}
      </div>
    </div>
  )
}