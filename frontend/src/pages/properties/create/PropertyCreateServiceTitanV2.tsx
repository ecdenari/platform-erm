import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enterpriseTokens, platformStyles } from '../../../styles/enterpriseTokens'
import { PropertyType, PropertyStatus } from '../../../modules/properties/types'
import { Building2, MapPin, Settings, Users } from 'lucide-react'

type TabType = 'basic' | 'location' | 'company' | 'settings'

export const PropertyCreateServiceTitanV2: React.FC = () => {
  const navigate = useNavigate()
  const styles = platformStyles.serviceTitan
  const [activeTab, setActiveTab] = useState<TabType>('basic')
  
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    propertyType: PropertyType.Commercial,
    status: PropertyStatus.Active,
    propertyCode: '',
    
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
    mapBoundaries: '',
    
    // Company & Contacts
    companyId: 0,
    primaryContactId: 0,
    billingContactId: 0,
    operationsContactId: 0,
    emergencyContactId: 0,
    
    // Settings
    services: {
      maintenance: false,
      construction: false,
      snow: false,
      irrigation: false,
      enhancement: false,
      pest: false,
      arbor: false
    },
    billingSettings: {
      billingCycle: 'monthly',
      paymentTerms: 'net30',
      poRequired: false,
      taxExempt: false
    },
    operationalSettings: {
      preferredServiceDay: '',
      serviceWindow: '',
      blackoutDates: '',
      specialInstructions: '',
      equipmentRestrictions: ''
    },
    accessInfo: {
      gateCode: '',
      keyLocation: '',
      contactOnSite: false,
      parkingInstructions: ''
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting:', formData)
    navigate('/properties')
  }

  const tabs = [
    { key: 'basic' as TabType, label: 'Basic Info', icon: Building2, shortcut: '1' },
    { key: 'location' as TabType, label: 'Location', icon: MapPin, shortcut: '2' },
    { key: 'company' as TabType, label: 'Company', icon: Users, shortcut: '3' },
    { key: 'settings' as TabType, label: 'Settings', icon: Settings, shortcut: '4' }
  ]

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey) {
        const tabIndex = parseInt(e.key) - 1
        if (tabIndex >= 0 && tabIndex < tabs.length) {
          setActiveTab(tabs[tabIndex].key)
        }
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                autoFocus
              />
            </div>
            
            <div>
              <label className={styles.form.label}>Property Code</label>
              <input
                type="text"
                value={formData.propertyCode}
                onChange={(e) => setFormData({ ...formData, propertyCode: e.target.value })}
                className={styles.form.input}
                placeholder="PROP-001"
              />
            </div>
            
            <div>
              <label className={styles.form.label}>Property Type</label>
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
        )
        
      case 'location':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="col-span-2 md:col-span-2">
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
              
              <div>
                <label className={styles.form.label}>ZIP Code</label>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className={styles.form.label}>Service Zone</label>
                <select
                  value={formData.serviceZone}
                  onChange={(e) => setFormData({ ...formData, serviceZone: e.target.value })}
                  className={styles.form.input}
                >
                  <option value="">Select Zone</option>
                  <option value="north">North Region</option>
                  <option value="south">South Region</option>
                  <option value="east">East Region</option>
                  <option value="west">West Region</option>
                  <option value="central">Central</option>
                </select>
              </div>
              
              <div>
                <label className={styles.form.label}>Latitude</label>
                <input
                  type="number"
                  value={formData.latitude || ''}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || null })}
                  className={styles.form.input}
                  placeholder="39.7392"
                  step="0.0001"
                />
              </div>
              
              <div>
                <label className={styles.form.label}>Longitude</label>
                <input
                  type="number"
                  value={formData.longitude || ''}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || null })}
                  className={styles.form.input}
                  placeholder="-104.9903"
                  step="0.0001"
                />
              </div>
            </div>
            
            <div>
              <label className={styles.form.label}>Map Boundaries</label>
              <textarea
                value={formData.mapBoundaries}
                onChange={(e) => setFormData({ ...formData, mapBoundaries: e.target.value })}
                className={styles.form.input}
                rows={2}
                placeholder="Property boundary coordinates or description"
              />
            </div>
          </div>
        )
        
      case 'company':
        return (
          <div className="space-y-3">
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
                <option value={4}>Summit Office Properties</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className={styles.form.label}>Primary Contact</label>
                <select
                  value={formData.primaryContactId}
                  onChange={(e) => setFormData({ ...formData, primaryContactId: parseInt(e.target.value) })}
                  className={styles.form.input}
                >
                  <option value={0}>Select Contact</option>
                  <option value={1}>John Smith - Property Manager</option>
                  <option value={2}>Jane Doe - Facilities Director</option>
                  <option value={3}>Bob Johnson - Owner</option>
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
                  <option value={4}>Accounts Payable Dept</option>
                  <option value={5}>Sarah Finance - CFO</option>
                </select>
              </div>
              
              <div>
                <label className={styles.form.label}>Operations Contact</label>
                <select
                  value={formData.operationsContactId}
                  onChange={(e) => setFormData({ ...formData, operationsContactId: parseInt(e.target.value) })}
                  className={styles.form.input}
                >
                  <option value={0}>Same as Primary</option>
                  <option value={6}>Mike Operations - Facilities</option>
                  <option value={7}>Lisa Maintenance - Supervisor</option>
                </select>
              </div>
              
              <div>
                <label className={styles.form.label}>Emergency Contact</label>
                <select
                  value={formData.emergencyContactId}
                  onChange={(e) => setFormData({ ...formData, emergencyContactId: parseInt(e.target.value) })}
                  className={styles.form.input}
                >
                  <option value={0}>Same as Primary</option>
                  <option value={8}>24/7 Security Desk</option>
                  <option value={9}>Emergency Hotline</option>
                </select>
              </div>
            </div>
          </div>
        )
        
      case 'settings':
        return (
          <div className="space-y-4">
            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Enabled Services
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
                {Object.entries({
                  maintenance: 'Landscape Maintenance',
                  construction: 'Construction',
                  snow: 'Snow Removal',
                  irrigation: 'Irrigation',
                  enhancement: 'Enhancement',
                  pest: 'Pest Control',
                  arbor: 'Tree Care'
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
            
            {/* Billing Settings */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Billing Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className={styles.form.label}>Billing Cycle</label>
                  <select
                    value={formData.billingSettings.billingCycle}
                    onChange={(e) => setFormData({
                      ...formData,
                      billingSettings: { ...formData.billingSettings, billingCycle: e.target.value }
                    })}
                    className={styles.form.input}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                    <option value="per-service">Per Service</option>
                  </select>
                </div>
                
                <div>
                  <label className={styles.form.label}>Payment Terms</label>
                  <select
                    value={formData.billingSettings.paymentTerms}
                    onChange={(e) => setFormData({
                      ...formData,
                      billingSettings: { ...formData.billingSettings, paymentTerms: e.target.value }
                    })}
                    className={styles.form.input}
                  >
                    <option value="net30">Net 30</option>
                    <option value="net15">Net 15</option>
                    <option value="net45">Net 45</option>
                    <option value="due-on-receipt">Due on Receipt</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.billingSettings.poRequired}
                      onChange={(e) => setFormData({
                        ...formData,
                        billingSettings: { ...formData.billingSettings, poRequired: e.target.checked }
                      })}
                      className="h-3 w-3 text-blue-600 rounded border-gray-300"
                    />
                    <span className="text-xs text-gray-700">PO Required</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.billingSettings.taxExempt}
                      onChange={(e) => setFormData({
                        ...formData,
                        billingSettings: { ...formData.billingSettings, taxExempt: e.target.checked }
                      })}
                      className="h-3 w-3 text-blue-600 rounded border-gray-300"
                    />
                    <span className="text-xs text-gray-700">Tax Exempt</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Operational Settings */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Operational Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={styles.form.label}>Preferred Service Day</label>
                  <select
                    value={formData.operationalSettings.preferredServiceDay}
                    onChange={(e) => setFormData({
                      ...formData,
                      operationalSettings: { ...formData.operationalSettings, preferredServiceDay: e.target.value }
                    })}
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
                  <label className={styles.form.label}>Service Window</label>
                  <select
                    value={formData.operationalSettings.serviceWindow}
                    onChange={(e) => setFormData({
                      ...formData,
                      operationalSettings: { ...formData.operationalSettings, serviceWindow: e.target.value }
                    })}
                    className={styles.form.input}
                  >
                    <option value="">Any Time</option>
                    <option value="morning">Morning (6am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-6pm)</option>
                    <option value="business-hours">Business Hours Only</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Access Info */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Access Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={styles.form.label}>Gate Code</label>
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
                  <label className={styles.form.label}>Key Location</label>
                  <input
                    type="text"
                    value={formData.accessInfo.keyLocation}
                    onChange={(e) => setFormData({
                      ...formData,
                      accessInfo: { ...formData.accessInfo, keyLocation: e.target.value }
                    })}
                    className={styles.form.input}
                    placeholder="Lock box on gate"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className={styles.form.label}>Parking Instructions</label>
                  <input
                    type="text"
                    value={formData.accessInfo.parkingInstructions}
                    onChange={(e) => setFormData({
                      ...formData,
                      accessInfo: { ...formData.accessInfo, parkingInstructions: e.target.value }
                    })}
                    className={styles.form.input}
                    placeholder="Park in visitor spots near building B"
                  />
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Create Property</h1>
              <p className="text-xs text-gray-500">Complete all required fields to add a new property</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Alt+1-4 for tabs</span>
              <button
                type="button"
                onClick={() => navigate('/properties')}
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

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4">
          <nav className="flex space-x-0 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex items-center px-4 py-2 text-xs font-medium border-b-2 transition-colors
                  ${activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="h-3 w-3 mr-1.5" />
                {tab.label}
                <span className="ml-2 text-xs text-gray-400">Alt+{tab.shortcut}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="max-w-screen-xl mx-auto p-4">
        <div className={`${styles.form.section} min-h-[400px]`}>
          {renderTabContent()}
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.key}>
                <span 
                  className={activeTab === tab.key ? 'text-blue-600 font-medium' : ''}
                >
                  {index + 1}. {tab.label}
                </span>
                {index < tabs.length - 1 && <span>›</span>}
              </React.Fragment>
            ))}
          </div>
          <div>
            <span className="text-gray-600">Measurements will be captured during takeoff</span>
          </div>
        </div>
      </form>
    </div>
  )
}