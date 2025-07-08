import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enterpriseTokens, platformStyles } from '../../../styles/enterpriseTokens'
import { PropertyType, PropertyStatus } from '../../../modules/properties/types'
import { MapPin, Building2, Phone, Mail, DollarSign } from 'lucide-react'

export const PropertyCreateServiceTitanV1: React.FC = () => {
  const navigate = useNavigate()
  const styles = platformStyles.serviceTitan
  
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    propertyType: PropertyType.Commercial,
    status: PropertyStatus.Active,
    
    // Location
    address: {
      street: '',
      suite: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    latitude: null as number | null,
    longitude: null as number | null,
    serviceZone: '',
    
    // Company & Contacts
    companyId: 0,
    primaryContactId: 0,
    billingContactId: 0,
    
    // Service Settings
    services: {
      maintenance: false,
      construction: false,
      snow: false,
      irrigation: false,
      enhancement: false
    },
    
    // Quick Settings
    accessNotes: '',
    gateCode: '',
    preferredServiceDay: '',
    blackoutDates: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validation would go here
    console.log('Submitting:', formData)
    // API call would go here
    navigate('/properties')
  }

  const handleCancel = () => {
    navigate('/properties')
  }

  // ServiceTitan V1: Maximum density, everything on one screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-screen-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-semibold text-gray-900">Create Property</h1>
              <span className="text-xs text-gray-500">Commercial Landscape Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-sm hover:bg-blue-700"
              >
                Create Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dense Form Layout - 3 columns */}
      <form onSubmit={handleSubmit} className="max-w-screen-2xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          
          {/* Column 1: Basic Information */}
          <div className={styles.form.section}>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Basic Information
            </h3>
            
            <div className="space-y-2">
              <div>
                <label className={styles.form.label}>
                  Property Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.form.input}
                  placeholder="e.g., Greenwood Office Park"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={styles.form.label}>Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                    className={styles.form.input}
                  >
                    <option value={PropertyType.Commercial}>Commercial</option>
                    <option value={PropertyType.Residential}>HOA</option>
                    <option value={PropertyType.Industrial}>Industrial</option>
                    <option value={PropertyType.Mixed}>Municipal</option>
                    <option value={PropertyType.Vacant}>Vacant</option>
                  </select>
                </div>
                
                <div>
                  <label className={styles.form.label}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                    className={styles.form.input}
                  >
                    <option value={PropertyStatus.Active}>Active</option>
                    <option value={PropertyStatus.Pending}>Pending</option>
                    <option value={PropertyStatus.Inactive}>Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={styles.form.label}>
                  Company <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.companyId}
                  onChange={(e) => setFormData({ ...formData, companyId: parseInt(e.target.value) })}
                  className={styles.form.input}
                >
                  <option value={0}>Select Company</option>
                  <option value={1}>ABC Property Management</option>
                  <option value={2}>Greenwood Commercial LLC</option>
                  <option value={3}>Municipal Services Corp</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={styles.form.label}>Primary Contact</label>
                  <select
                    value={formData.primaryContactId}
                    onChange={(e) => setFormData({ ...formData, primaryContactId: parseInt(e.target.value) })}
                    className={styles.form.input}
                  >
                    <option value={0}>Select Contact</option>
                    <option value={1}>John Smith</option>
                    <option value={2}>Jane Doe</option>
                  </select>
                </div>
                
                <div>
                  <label className={styles.form.label}>Billing Contact</label>
                  <select
                    value={formData.billingContactId}
                    onChange={(e) => setFormData({ ...formData, billingContactId: parseInt(e.target.value) })}
                    className={styles.form.input}
                  >
                    <option value={0}>Same as Primary</option>
                    <option value={3}>Accounts Payable</option>
                    <option value={4}>Finance Dept</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Location Information */}
          <div className={styles.form.section}>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Location Information
            </h3>
            
            <div className="space-y-2">
              <div>
                <label className={styles.form.label}>
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, street: e.target.value }
                  })}
                  className={styles.form.input}
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className={styles.form.label}>Suite/Unit</label>
                <input
                  type="text"
                  value={formData.address.suite}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, suite: e.target.value }
                  })}
                  className={styles.form.input}
                  placeholder="Suite 100"
                />
              </div>

              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-2">
                  <label className={styles.form.label}>City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, city: e.target.value }
                    })}
                    className={styles.form.input}
                    placeholder="Denver"
                  />
                </div>
                
                <div>
                  <label className={styles.form.label}>State</label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, state: e.target.value }
                    })}
                    className={styles.form.input}
                    placeholder="CO"
                    maxLength={2}
                  />
                </div>
                
                <div className="col-span-2">
                  <label className={styles.form.label}>ZIP</label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, zipCode: e.target.value }
                    })}
                    className={styles.form.input}
                    placeholder="80202"
                  />
                </div>
              </div>

              <div>
                <label className={styles.form.label}>Service Zone</label>
                <select
                  value={formData.serviceZone}
                  onChange={(e) => setFormData({ ...formData, serviceZone: e.target.value })}
                  className={styles.form.input}
                >
                  <option value="">Select Zone</option>
                  <option value="north">North Denver</option>
                  <option value="south">South Denver</option>
                  <option value="east">East Denver</option>
                  <option value="west">West Denver</option>
                </select>
              </div>

              <div>
                <label className={styles.form.label}>Access Notes</label>
                <textarea
                  value={formData.accessNotes}
                  onChange={(e) => setFormData({ ...formData, accessNotes: e.target.value })}
                  className={styles.form.input}
                  rows={2}
                  placeholder="Gate codes, parking instructions, etc."
                />
              </div>

              <div>
                <label className={styles.form.label}>Gate Code</label>
                <input
                  type="text"
                  value={formData.gateCode}
                  onChange={(e) => setFormData({ ...formData, gateCode: e.target.value })}
                  className={styles.form.input}
                  placeholder="#1234"
                />
              </div>
            </div>
          </div>

          {/* Column 3: Service Settings */}
          <div className={styles.form.section}>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Service Configuration
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className={styles.form.label}>Enabled Services</label>
                <div className="space-y-1 mt-1">
                  {Object.entries({
                    maintenance: 'Landscape Maintenance',
                    construction: 'Construction',
                    snow: 'Snow Removal',
                    irrigation: 'Irrigation',
                    enhancement: 'Enhancement'
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center space-x-2 py-1">
                      <input
                        type="checkbox"
                        checked={formData.services[key as keyof typeof formData.services]}
                        onChange={(e) => setFormData({
                          ...formData,
                          services: { ...formData.services, [key]: e.target.checked }
                        })}
                        className="h-3 w-3 text-blue-600 rounded border-gray-300"
                      />
                      <span className="text-xs text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={styles.form.label}>Preferred Service Day</label>
                <select
                  value={formData.preferredServiceDay}
                  onChange={(e) => setFormData({ ...formData, preferredServiceDay: e.target.value })}
                  className={styles.form.input}
                >
                  <option value="">No Preference</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                </select>
              </div>

              <div>
                <label className={styles.form.label}>Blackout Dates</label>
                <textarea
                  value={formData.blackoutDates}
                  onChange={(e) => setFormData({ ...formData, blackoutDates: e.target.value })}
                  className={styles.form.input}
                  rows={2}
                  placeholder="Dates when service should not be performed"
                />
              </div>

              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Quick Actions</p>
                <div className="space-y-1">
                  <button
                    type="button"
                    className="w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 rounded-sm"
                  >
                    Copy from existing property
                  </button>
                  <button
                    type="button"
                    className="w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 rounded-sm"
                  >
                    Import from template
                  </button>
                  <button
                    type="button"
                    className="w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 rounded-sm"
                  >
                    Validate address
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Measurement Details</p>
                <p className="text-xs text-gray-600 italic">
                  Property measurements (sq ft, acres) will be captured during takeoff creation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-3 p-2 bg-gray-100 border border-gray-300 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <span>Fields marked with <span className="text-red-500">*</span> are required</span>
              <span>•</span>
              <span>Auto-save: Disabled</span>
              <span>•</span>
              <span>Form validation: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Save as draft
              </button>
              <span className="text-gray-400">|</span>
              <button
                type="button"
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                Create & add another
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}