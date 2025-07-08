import React, { useState } from 'react'
import { Property, PropertyStatus, PropertyType } from '../../types'
import { enterpriseTokens, platformStyles } from '../../../../styles/enterpriseTokens'
import { 
  Building2, MapPin, ChevronDown, X, Plus,
  Grid3x3, List, SlidersHorizontal, ChevronRight,
  Search, Download, Upload, Eye
} from 'lucide-react'

export interface PropertyListAspireV1Props {
  properties: Property[]
  loading?: boolean
  onPropertyClick?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onCreateOpportunity?: (property: Property) => void
  onViewContracts?: (property: Property) => void
}

export const PropertyListAspireV1: React.FC<PropertyListAspireV1Props> = ({
  properties,
  loading = false,
  onPropertyClick,
  onEdit,
  onDelete,
  onCreateOpportunity,
  onViewContracts
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [activeFilters, setActiveFilters] = useState<Array<{id: string, label: string, value: string}>>([])
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Customer', 'Maintenance']))
  const [searchQuery, setSearchQuery] = useState('')
  
  // Aspire green color
  const aspireGreen = '#52C41A'

  // Group properties by status for Aspire-style grouping
  const propertiesByStatus = properties.reduce((acc, property) => {
    const group = property.status === PropertyStatus.Active ? 'Customer' : 'Maintenance'
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(property)
    return acc
  }, {} as Record<string, Property[]>)

  // Filter properties based on search
  const filteredProperties = properties.filter(property => {
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      property.name.toLowerCase().includes(searchLower) ||
      property.companyName?.toLowerCase().includes(searchLower) ||
      property.address?.city?.toLowerCase().includes(searchLower)
    )
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(filteredProperties.map(p => p.id))
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

  const addFilter = (id: string, label: string, value: string) => {
    setActiveFilters([...activeFilters, { id, label, value }])
  }

  const removeFilter = (id: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== id))
  }

  const toggleGroupExpansion = (group: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(group)) {
      newExpanded.delete(group)
    } else {
      newExpanded.add(group)
    }
    setExpandedGroups(newExpanded)
  }

  // Mock financial data
  const getPropertyFinancials = (property: Property) => ({
    monthlyRecurring: Math.floor(Math.random() * 50000) + 10000,
    contractValue: Math.floor(Math.random() * 500000) + 100000,
    activeOpportunities: Math.floor(Math.random() * 5),
    lastInvoice: `${Math.floor(Math.random() * 30) + 1} days ago`,
    paymentStatus: Math.random() > 0.8 ? 'overdue' : 'current'
  })

  // Mock data for additional fields
  const getPropertyDetails = (property: Property) => ({
    contact: `John Smith`,
    accountManager: `Sarah Johnson`,
    fieldManager: `Mike Williams`
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-sm text-slate-600">Loading properties...</p>
        </div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Building2 className="h-16 w-16 text-slate-300 mb-4" />
        <p className="text-lg text-slate-600 mb-2">No properties found</p>
        <p className="text-sm text-slate-500">Add your first commercial property to get started</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button className="px-6 py-3 text-sm font-medium text-gray-900 border-b-2 border-green-500">
            Properties
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
            Companies
          </button>
        </div>
      </div>
      
      {/* Toolbar */}
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
            
            {/* Property List Dropdown */}
            <select className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm">
              <option>MT | Property List</option>
              <option>All Properties</option>
              <option>Active Properties</option>
            </select>
            
            {/* Filters Button */}
            <button className="p-2 bg-white border border-gray-300 rounded-md">
              <SlidersHorizontal className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Bulk Actions */}
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              BULK ACTIONS
              <ChevronDown className="inline h-4 w-4 ml-1" />
            </button>
            
            {/* New Property Button */}
            <button
              className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90"
              style={{ backgroundColor: aspireGreen }}
            >
              <Plus className="inline h-4 w-4 mr-1" />
              NEW PROPERTY
            </button>
            
            {/* Save Button */}
            <button
              className="px-6 py-2 text-sm font-medium text-white rounded-md hover:opacity-90"
              style={{ backgroundColor: aspireGreen }}
            >
              SAVE
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

      {/* Main Content Area */}
      <div className="p-4">
        {/* Grouped Properties Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {['Customer', 'Maintenance'].map(group => {
            const groupProperties = filteredProperties.filter(p => {
              const propertyGroup = p.status === PropertyStatus.Active ? 'Customer' : 'Maintenance'
              return propertyGroup === group
            })
            const isExpanded = expandedGroups.has(group)
            
            if (groupProperties.length === 0) return null
            
            return (
              <div key={group} className="border-b border-gray-200 last:border-b-0">
                {/* Group Header */}
                <div 
                  className="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleGroupExpansion(group)}
                >
                  <div className="flex items-center">
                    <ChevronRight className={`h-4 w-4 text-gray-400 mr-2 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    <span className="text-sm font-medium text-gray-900">
                      {group} ({groupProperties.length})
                    </span>
                  </div>
                </div>
                
                {/* Properties Table */}
                {isExpanded && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-y border-gray-200">
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
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {groupProperties.map((property, index) => {
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
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            {filteredProperties.length} results
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Page 1 of 1</span>
          </div>
        </div>
      </div>

    </div>
  )
}