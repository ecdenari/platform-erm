import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Property, PropertyType, PropertyStatus, CreateProperty, UpdateProperty } from '../../types'
import { useCreateProperty, useUpdateProperty } from '../../hooks'
import { enterpriseTokens } from '../../../../styles/enterpriseTokens'

interface PropertyFormProps {
  property?: Property
  onSuccess?: () => void
  onCancel?: () => void
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ 
  property, 
  onSuccess, 
  onCancel 
}) => {
  const navigate = useNavigate()
  const createPropertyMutation = useCreateProperty()
  const updatePropertyMutation = useUpdateProperty()
  const isEditing = !!property

  const [formData, setFormData] = useState<CreateProperty | UpdateProperty>({
    name: property?.name || '',
    propertyType: property?.propertyType || PropertyType.Commercial,
    status: property?.status || PropertyStatus.Active,
    companyId: property?.companyId || 0,
    description: property?.description || '',
    notes: property?.notes || '',
    squareFootage: property?.squareFootage || undefined,
    acreageSize: property?.acreageSize || undefined,
    address: {
      street: property?.address?.street || '',
      suite: property?.address?.suite || '',
      city: property?.address?.city || '',
      state: property?.address?.state || '',
      zipCode: property?.address?.zipCode || '',
      country: property?.address?.country || 'USA'
    }
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeSection, setActiveSection] = useState<'basic' | 'address' | 'details' | 'contacts'>('basic')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Property name is required'
    }
    
    if (!formData.companyId || formData.companyId === 0) {
      newErrors.companyId = 'Company is required'
    }
    
    if (!formData.address?.street.trim()) {
      newErrors['address.street'] = 'Street address is required'
    }
    
    if (!formData.address?.city.trim()) {
      newErrors['address.city'] = 'City is required'
    }
    
    if (!formData.address?.state.trim()) {
      newErrors['address.state'] = 'State is required'
    }
    
    if (!formData.address?.zipCode.trim()) {
      newErrors['address.zipCode'] = 'Zip code is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      if (isEditing) {
        await updatePropertyMutation.mutateAsync({
          id: property.id,
          data: formData as UpdateProperty
        })
      } else {
        await createPropertyMutation.mutateAsync(formData as CreateProperty)
      }
      
      if (onSuccess) {
        onSuccess()
      } else {
        navigate('/properties')
      }
    } catch (error) {
      console.error('Failed to save property:', error)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      navigate('/properties')
    }
  }

  const sections = [
    { key: 'basic', label: 'Basic Information' },
    { key: 'address', label: 'Address' },
    { key: 'details', label: 'Property Details' },
    { key: 'contacts', label: 'Contacts' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Edit Property' : 'New Property'}
            </h2>
          </div>

          <div className="flex border-b border-gray-200">
            {sections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveSection(section.key as any)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === section.key
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeSection === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter property name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="propertyType"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    >
                      <option value={PropertyType.Commercial}>Commercial</option>
                      <option value={PropertyType.Residential}>Residential</option>
                      <option value={PropertyType.Industrial}>Industrial</option>
                      <option value={PropertyType.Mixed}>Mixed</option>
                      <option value={PropertyType.Vacant}>Vacant</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    >
                      <option value={PropertyStatus.Active}>Active</option>
                      <option value={PropertyStatus.Inactive}>Inactive</option>
                      <option value={PropertyStatus.Pending}>Pending</option>
                      <option value={PropertyStatus.Sold}>Sold</option>
                      <option value={PropertyStatus.Archived}>Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="companyId"
                    value={formData.companyId}
                    onChange={(e) => setFormData({ ...formData, companyId: parseInt(e.target.value) })}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm ${
                      errors.companyId ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value={0}>Select a company</option>
                    <option value={1}>ABC Property Management</option>
                    <option value={2}>Greenwood Properties LLC</option>
                    <option value={3}>Industrial Management Corp</option>
                    <option value={4}>Future Developments Inc</option>
                  </select>
                  {errors.companyId && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyId}</p>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'address' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="street"
                    value={formData.address?.street || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address!, street: e.target.value } 
                    })}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm ${
                      errors['address.street'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors['address.street'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['address.street']}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="suite" className="block text-sm font-medium text-gray-700 mb-1">
                    Suite/Unit (Optional)
                  </label>
                  <input
                    type="text"
                    id="suite"
                    value={formData.address?.suite || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address!, suite: e.target.value } 
                    })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    placeholder="Suite 100"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.address?.city || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address!, city: e.target.value } 
                      })}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm ${
                        errors['address.city'] ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Denver"
                    />
                    {errors['address.city'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['address.city']}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={formData.address?.state || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address!, state: e.target.value } 
                      })}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm ${
                        errors['address.state'] ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="CO"
                      maxLength={2}
                    />
                    {errors['address.state'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['address.state']}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={formData.address?.zipCode || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address!, zipCode: e.target.value } 
                      })}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm ${
                        errors['address.zipCode'] ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="80202"
                    />
                    {errors['address.zipCode'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['address.zipCode']}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-1">
                      Square Footage
                    </label>
                    <input
                      type="number"
                      id="squareFootage"
                      value={formData.squareFootage || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        squareFootage: e.target.value ? parseInt(e.target.value) : undefined 
                      })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="acreageSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Acreage
                    </label>
                    <input
                      type="number"
                      id="acreageSize"
                      value={formData.acreageSize || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        acreageSize: e.target.value ? parseFloat(e.target.value) : undefined 
                      })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                      placeholder="0.0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    placeholder="Enter property description..."
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Internal Notes
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    placeholder="Internal notes about this property..."
                  />
                </div>
              </div>
            )}

            {activeSection === 'contacts' && (
              <div className="space-y-6">
                <p className="text-sm text-gray-500">
                  Contact management will be implemented in the next phase. 
                  You can assign contacts after creating the property.
                </p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPropertyMutation.isLoading || updatePropertyMutation.isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createPropertyMutation.isLoading || updatePropertyMutation.isLoading
                ? 'Saving...'
                : isEditing
                ? 'Update Property'
                : 'Create Property'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}