import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enterpriseTokens, platformStyles } from '../../../styles/enterpriseTokens'
import { PropertyType, PropertyStatus } from '../../../modules/properties/types'
import { MapPin, Navigation, Trees, Snowflake, Droplets, Construction, Info } from 'lucide-react'

export const PropertyCreateLMNV1: React.FC = () => {
  const navigate = useNavigate()
  const styles = platformStyles.lmn
  
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
    
    // Landscape Specific
    landscapeDetails: {
      propertySize: '',
      turfArea: '',
      bedArea: '',
      hardscapeArea: '',
      irrigationZones: 0,
      primaryGrassType: '',
      sunExposure: '',
      soilType: ''
    },
    
    // Access & Equipment
    accessInfo: {
      gateCode: '',
      equipmentRestrictions: '',
      slopeInfo: '',
      powerAccess: false,
      waterAccess: false,
      storageOnSite: false
    }
  })

  const [mapPinLocation, setMapPinLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [drawingBoundary, setDrawingBoundary] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting:', formData)
    navigate('/properties')
  }

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Simulated map click - in real app would use actual map library
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Convert to fake lat/lng
    const lat = 39.7392 - (y / rect.height) * 0.1
    const lng = -104.9903 + (x / rect.width) * 0.1
    
    setMapPinLocation({ lat, lng })
    setFormData({
      ...formData,
      latitude: lat,
      longitude: lng
    })
  }

  const serviceIcons = {
    maintenance: Trees,
    construction: Construction,
    snow: Snowflake,
    irrigation: Droplets,
    enhancement: Trees
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-screen-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Create New Property</h1>
              <p className="text-sm text-gray-600">Add a commercial landscape property to your portfolio</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Create Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Split Layout */}
      <div className="max-w-screen-2xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Side - Map */}
          <div className={`${styles.form.section} h-full`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Property Location</h3>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setDrawingBoundary(!drawingBoundary)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    drawingBoundary 
                      ? 'bg-green-100 text-green-700 border-green-300' 
                      : 'bg-white text-gray-700 border-gray-300'
                  } border`}
                >
                  {drawingBoundary ? 'Drawing Mode' : 'Draw Boundary'}
                </button>
                <button
                  type="button"
                  className="p-1 text-gray-600 hover:text-gray-900"
                  title="Center map"
                >
                  <Navigation className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div 
              className="relative bg-gray-100 rounded-lg h-96 cursor-crosshair overflow-hidden"
              onClick={handleMapClick}
            >
              {/* Simulated map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
                <div className="absolute inset-0 opacity-20">
                  {/* Grid lines */}
                  {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}>
                      <div 
                        className="absolute border-l border-gray-400" 
                        style={{ left: `${i * 10}%`, top: 0, bottom: 0 }}
                      />
                      <div 
                        className="absolute border-t border-gray-400" 
                        style={{ top: `${i * 10}%`, left: 0, right: 0 }}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* Map pin */}
              {mapPinLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${((mapPinLocation.lng + 104.9903) / 0.1) * 100}%`,
                    top: `${((39.7392 - mapPinLocation.lat) / 0.1) * 100}%`
                  }}
                >
                  <MapPin className="h-8 w-8 text-red-600 drop-shadow-lg" fill="currentColor" />
                </div>
              )}
              
              {/* Instructions overlay */}
              {!mapPinLocation && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center">
                    <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to drop a pin at the property location</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Map Tools */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Zone
                </label>
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
                  <option value="downtown">Downtown</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Travel Time from Base
                </label>
                <input
                  type="text"
                  placeholder="Auto-calculated"
                  className={styles.form.input}
                  disabled
                />
              </div>
            </div>
            
            {/* GPS Coordinates */}
            {mapPinLocation && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">GPS Coordinates</p>
                    <p className="text-sm font-mono">
                      {mapPinLocation.lat.toFixed(4)}, {mapPinLocation.lng.toFixed(4)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Form */}
          <div className="space-y-4">
            {/* Basic Information */}
            <div className={styles.form.section}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                      className={styles.form.input}
                    >
                      <option value={PropertyType.Commercial}>Commercial</option>
                      <option value={PropertyType.Residential}>HOA</option>
                      <option value={PropertyType.Industrial}>Industrial</option>
                      <option value={PropertyType.Mixed}>Municipal</option>
                      <option value={PropertyType.Vacant}>Vacant Land</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.companyId}
                      onChange={(e) => setFormData({ ...formData, companyId: parseInt(e.target.value) })}
                      className={styles.form.input}
                    >
                      <option value={0}>Select Company</option>
                      <option value={1}>ABC Property Management</option>
                      <option value={2}>Greenwood Commercial</option>
                      <option value={3}>Summit Properties</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className={styles.form.section}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
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
              </div>
            </div>

            {/* Services */}
            <div className={styles.form.section}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Services</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries({
                  maintenance: { label: 'Landscape Maintenance', color: 'green' },
                  construction: { label: 'Construction', color: 'orange' },
                  snow: { label: 'Snow Removal', color: 'blue' },
                  irrigation: { label: 'Irrigation', color: 'cyan' },
                  enhancement: { label: 'Enhancement', color: 'purple' }
                }).map(([key, config]) => {
                  const Icon = serviceIcons[key as keyof typeof serviceIcons]
                  const isSelected = formData.services[key as keyof typeof formData.services]
                  
                  return (
                    <label
                      key={key}
                      className={`
                        flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
                        ${isSelected 
                          ? `border-${config.color}-500 bg-${config.color}-50` 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => setFormData({
                          ...formData,
                          services: { ...formData.services, [key]: e.target.checked }
                        })}
                        className="sr-only"
                      />
                      <Icon className={`h-5 w-5 mr-3 ${isSelected ? `text-${config.color}-600` : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                        {config.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Access & Equipment */}
            <div className={styles.form.section}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Access & Equipment</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gate Code
                    </label>
                    <input
                      type="text"
                      value={formData.accessInfo.gateCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessInfo: { ...formData.accessInfo, gateCode: e.target.value }
                      })}
                      className={styles.form.input}
                      placeholder="#1234"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment Restrictions
                    </label>
                    <select
                      value={formData.accessInfo.equipmentRestrictions}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessInfo: { ...formData.accessInfo, equipmentRestrictions: e.target.value }
                      })}
                      className={styles.form.input}
                    >
                      <option value="">None</option>
                      <option value="small-only">Small Equipment Only</option>
                      <option value="no-large-mowers">No Large Mowers</option>
                      <option value="hand-tools">Hand Tools Only</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Features
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.accessInfo.powerAccess}
                        onChange={(e) => setFormData({
                          ...formData,
                          accessInfo: { ...formData.accessInfo, powerAccess: e.target.checked }
                        })}
                        className="h-4 w-4 text-green-600 rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700">Power access available</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.accessInfo.waterAccess}
                        onChange={(e) => setFormData({
                          ...formData,
                          accessInfo: { ...formData.accessInfo, waterAccess: e.target.checked }
                        })}
                        className="h-4 w-4 text-green-600 rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700">Water access available</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.accessInfo.storageOnSite}
                        onChange={(e) => setFormData({
                          ...formData,
                          accessInfo: { ...formData.accessInfo, storageOnSite: e.target.checked }
                        })}
                        className="h-4 w-4 text-green-600 rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700">Storage available on-site</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Note about measurements */}
            <div className="p-4 bg-blue-50 rounded-lg flex items-start">
              <Info className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium">Property Measurements</p>
                <p className="text-sm text-blue-700 mt-1">
                  Detailed measurements (square footage, acreage, turf areas) will be captured 
                  during the takeoff process when creating opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}