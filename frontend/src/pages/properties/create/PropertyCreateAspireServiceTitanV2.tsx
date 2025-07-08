import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enterpriseTokens, platformStyles } from '../../../styles/enterpriseTokens'
import { PropertyType, PropertyStatus } from '../../../modules/properties/types'
import { 
  Building, Users, Phone, Mail, Calendar, Clock, DollarSign,
  Shield, Key, Truck, AlertCircle, CheckCircle, FileText,
  Settings, Tag, Briefcase, Home, Factory, ShoppingBag,
  MapPin, Navigation, Trees, Snowflake, Droplets, Construction,
  ChevronRight, Layers, Database, CreditCard, Wrench
} from 'lucide-react'

type SectionType = 'hierarchy' | 'property' | 'location' | 'contacts' | 'services' | 'contract' | 'access' | 'budget'

interface Section {
  key: SectionType
  label: string
  icon: React.ElementType
  description: string
}

export const PropertyCreateAspireServiceTitanV2: React.FC = () => {
  const navigate = useNavigate()
  const styles = platformStyles.aspire
  const [activeSection, setActiveSection] = useState<SectionType>('hierarchy')
  
  const [formData, setFormData] = useState({
    // Company & Hierarchy
    companyId: 0,
    divisionId: 0,
    branchId: 0,
    portfolioId: 0,
    
    // Basic Information
    name: '',
    propertyType: PropertyType.Commercial,
    status: PropertyStatus.Active,
    propertyCode: '',
    externalId: '',
    
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
    region: '',
    
    // Contacts
    primaryContactId: 0,
    billingContactId: 0,
    propertyManagerId: 0,
    escalationContactId: 0,
    authorizedContacts: [] as number[],
    
    // Services
    services: {
      maintenance: false,
      construction: false,
      snow: false,
      irrigation: false,
      enhancement: false,
      pest: false,
      arbor: false,
      porter: false
    },
    serviceDetails: {
      maintenanceFrequency: 'weekly',
      snowTrigger: '2-inches',
      snowPriority: 'standard',
      irrigationSchedule: 'smart',
      porterDays: [] as string[]
    },
    
    // Contract
    contractInfo: {
      contractNumber: '',
      contractType: 'annual',
      startDate: '',
      endDate: '',
      autoRenew: true,
      renewalTerms: '12-months',
      terms: 'Net 30',
      poRequired: false,
      poNumber: '',
      taxExempt: false,
      taxExemptNumber: '',
      insuranceRequired: true,
      insuranceAmount: '2000000'
    },
    
    // Access
    accessInfo: {
      gateCode: '',
      lockboxCode: '',
      alarmCode: '',
      accessHours: '24/7',
      afterHoursContact: '',
      requiresEscort: false,
      checkInRequired: false,
      checkInLocation: '',
      badgeRequired: false,
      orientationRequired: false,
      safetyRequirements: [] as string[],
      equipmentRestrictions: '',
      parkingInstructions: ''
    },
    
    // Budget
    budgetInfo: {
      annualBudget: '',
      monthlyBudget: '',
      budgetCycle: 'calendar',
      approvalLimits: {
        automatic: '',
        managerApproval: '',
        ownerApproval: ''
      },
      budgetAlerts: {
        warningThreshold: '80',
        criticalThreshold: '95'
      },
      preferredVendors: [] as string[],
      restrictedVendors: [] as string[]
    }
  })

  const sections: Section[] = [
    {
      key: 'hierarchy',
      label: 'Company Hierarchy',
      icon: Layers,
      description: 'Company, division, and branch assignment'
    },
    {
      key: 'property',
      label: 'Property Details',
      icon: Building,
      description: 'Basic property information and classification'
    },
    {
      key: 'location',
      label: 'Location',
      icon: MapPin,
      description: 'Address and service zone configuration'
    },
    {
      key: 'contacts',
      label: 'Contacts',
      icon: Users,
      description: 'Primary, billing, and authorized contacts'
    },
    {
      key: 'services',
      label: 'Services',
      icon: Wrench,
      description: 'Service requirements and specifications'
    },
    {
      key: 'contract',
      label: 'Contract',
      icon: FileText,
      description: 'Contract terms and billing setup'
    },
    {
      key: 'access',
      label: 'Access & Security',
      icon: Shield,
      description: 'Access codes and safety requirements'
    },
    {
      key: 'budget',
      label: 'Budget',
      icon: CreditCard,
      description: 'Budget limits and approval workflow'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting:', formData)
    navigate('/properties')
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'hierarchy':
        return (
          <div className="space-y-6">
            {/* Company Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Assignment</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  Select the company this property belongs to. The hierarchy determines billing, reporting, and access permissions.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.companyId}
                    onChange={(e) => setFormData({ ...formData, companyId: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={0}>Select Company</option>
                    <option value={1}>ABC Property Management</option>
                    <option value={2}>Greenwood Commercial LLC</option>
                    <option value={3}>Summit Office Properties</option>
                    <option value={4}>Metropolitan Real Estate Group</option>
                  </select>
                </div>
                
                {formData.companyId > 0 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                        <select
                          value={formData.divisionId}
                          onChange={(e) => setFormData({ ...formData, divisionId: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={0}>Select Division</option>
                          <option value={1}>Commercial Properties</option>
                          <option value={2}>Retail Properties</option>
                          <option value={3}>Industrial</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                        <select
                          value={formData.branchId}
                          onChange={(e) => setFormData({ ...formData, branchId: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={0}>Select Branch</option>
                          <option value={1}>Denver Metro</option>
                          <option value={2}>Fort Collins</option>
                          <option value={3}>Colorado Springs</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                      <select
                        value={formData.portfolioId}
                        onChange={(e) => setFormData({ ...formData, portfolioId: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={0}>No Portfolio Assignment</option>
                        <option value={1}>Downtown Office Buildings</option>
                        <option value={2}>Suburban Shopping Centers</option>
                        <option value={3}>Class A Properties</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Hierarchy Preview */}
            {formData.companyId > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Hierarchy Preview</h4>
                <div className="text-sm text-gray-700">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    ABC Property Management
                  </div>
                  {formData.divisionId > 0 && (
                    <div className="flex items-center ml-6 mt-1">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      Commercial Properties Division
                    </div>
                  )}
                  {formData.branchId > 0 && (
                    <div className="flex items-center ml-12 mt-1">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      Denver Metro Branch
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
        
      case 'property':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Greenwood Office Park"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Code</label>
                  <input
                    type="text"
                    value={formData.propertyCode}
                    onChange={(e) => setFormData({ ...formData, propertyCode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., GOP-001"
                  />
                  <p className="text-xs text-gray-500 mt-1">Internal reference code</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">External ID</label>
                  <input
                    type="text"
                    value={formData.externalId}
                    onChange={(e) => setFormData({ ...formData, externalId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Customer's ID"
                  />
                  <p className="text-xs text-gray-500 mt-1">Customer's reference number</p>
                </div>
              </div>
              
              {/* Property Type Grid */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: PropertyType.Commercial, label: 'Commercial', icon: Building, desc: 'Office buildings, retail' },
                    { type: PropertyType.Residential, label: 'HOA/Condo', icon: Home, desc: 'Residential communities' },
                    { type: PropertyType.Industrial, label: 'Industrial', icon: Factory, desc: 'Warehouses, factories' },
                    { type: PropertyType.Mixed, label: 'Municipal', icon: ShoppingBag, desc: 'Government properties' },
                    { type: PropertyType.Vacant, label: 'Retail', icon: Tag, desc: 'Shopping centers' },
                    { type: 'institutional', label: 'Institutional', icon: Building, desc: 'Schools, hospitals' }
                  ].map(({ type, label, icon: Icon, desc }) => (
                    <label
                      key={type}
                      className={`
                        relative p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${formData.propertyType === type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={type}
                        checked={formData.propertyType === type}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <Icon className={`h-8 w-8 mx-auto mb-2 ${
                          formData.propertyType === type ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <div className={`font-medium ${
                          formData.propertyType === type ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex space-x-4">
                  {[
                    { value: PropertyStatus.Active, label: 'Active', color: 'blue' },
                    { value: PropertyStatus.Inactive, label: 'Inactive', color: 'gray' },
                    { value: PropertyStatus.Pending, label: 'Pending', color: 'yellow' }
                  ].map(status => (
                    <label
                      key={status.value}
                      className="flex items-center"
                    >
                      <input
                        type="radio"
                        value={status.value}
                        checked={formData.status === status.value}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className={`ml-2 text-sm font-medium text-${status.color}-700`}>
                        {status.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
        
      case 'location':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Location</h3>
              
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Main Street"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Suite/Unit</label>
                    <input
                      type="text"
                      value={formData.address.suite}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address, suite: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Suite 100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address, zipCode: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="80202"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address, city: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="CO"
                      maxLength={2}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Zone</label>
                    <select
                      value={formData.serviceZone}
                      onChange={(e) => setFormData({ ...formData, serviceZone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Region</option>
                      <option value="denver-metro">Denver Metro</option>
                      <option value="northern-co">Northern Colorado</option>
                      <option value="southern-co">Southern Colorado</option>
                    </select>
                  </div>
                </div>
                
                {/* Map Integration */}
                <div className="mt-6">
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">Interactive Map</p>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Set Location on Map
                      </button>
                    </div>
                  </div>
                  
                  {formData.latitude && formData.longitude && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">GPS Coordinates</p>
                          <p className="text-sm text-blue-700 font-mono">
                            {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                          </p>
                        </div>
                        <Navigation className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
        
      case 'contacts':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Contacts</h3>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  Assign contacts for different roles. These contacts will receive communications and have access to property information based on their role.
                </p>
              </div>
              
              <div className="space-y-6">
                {/* Primary Contact */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    Primary Contact
                  </h4>
                  <div className="space-y-3">
                    <select
                      value={formData.primaryContactId}
                      onChange={(e) => setFormData({ ...formData, primaryContactId: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Select Primary Contact</option>
                      <option value={1}>John Smith - Property Manager</option>
                      <option value={2}>Jane Doe - Facilities Director</option>
                      <option value={3}>Mike Johnson - Operations Manager</option>
                    </select>
                    <button
                      type="button"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      + Create New Contact
                    </button>
                  </div>
                </div>
                
                {/* Billing Contact */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                    Billing Contact
                  </h4>
                  <div className="space-y-3">
                    <select
                      value={formData.billingContactId}
                      onChange={(e) => setFormData({ ...formData, billingContactId: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Same as Primary Contact</option>
                      <option value={4}>Accounts Payable Department</option>
                      <option value={5}>Sarah Williams - Accounting</option>
                    </select>
                  </div>
                </div>
                
                {/* Additional Roles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Property Manager</h4>
                    <select
                      value={formData.propertyManagerId}
                      onChange={(e) => setFormData({ ...formData, propertyManagerId: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Not Assigned</option>
                      <option value={6}>Robert Brown</option>
                      <option value={7}>Lisa Anderson</option>
                    </select>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Escalation Contact</h4>
                    <select
                      value={formData.escalationContactId}
                      onChange={(e) => setFormData({ ...formData, escalationContactId: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Not Assigned</option>
                      <option value={8}>Regional Manager</option>
                      <option value={9}>VP of Operations</option>
                    </select>
                  </div>
                </div>
                
                {/* Authorized Contacts */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Authorized Contacts</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Additional contacts who can approve work and receive notifications
                  </p>
                  <div className="space-y-2">
                    {formData.authorizedContacts.length === 0 ? (
                      <p className="text-sm text-gray-500 py-2">No authorized contacts added</p>
                    ) : (
                      formData.authorizedContacts.map(contactId => (
                        <div key={contactId} className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm">Contact {contactId}</span>
                          <button
                            type="button"
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                    <button
                      type="button"
                      className="w-full py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                    >
                      + Add Authorized Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        
      case 'services':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Requirements</h3>
              
              <div className="space-y-4">
                {/* Service Selection Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'maintenance', label: 'Landscape Maintenance', icon: Trees, color: 'blue', desc: 'Regular mowing, trimming, and landscape care' },
                    { key: 'construction', label: 'Construction', icon: Construction, color: 'orange', desc: 'Installation, renovation, and enhancements' },
                    { key: 'snow', label: 'Snow Removal', icon: Snowflake, color: 'blue', desc: 'Snow plowing, salting, and ice management' },
                    { key: 'irrigation', label: 'Irrigation', icon: Droplets, color: 'cyan', desc: 'Sprinkler system maintenance and repair' },
                    { key: 'enhancement', label: 'Enhancement', icon: Trees, color: 'purple', desc: 'Seasonal color and property improvements' },
                    { key: 'pest', label: 'Pest Control', icon: Shield, color: 'red', desc: 'Integrated pest management services' },
                    { key: 'arbor', label: 'Tree Care', icon: Trees, color: 'blue', desc: 'Tree trimming, removal, and health' },
                    { key: 'porter', label: 'Porter Service', icon: Truck, color: 'gray', desc: 'Daily cleaning and trash removal' }
                  ].map(service => (
                    <label
                      key={service.key}
                      className={`
                        relative p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${formData.services[service.key as keyof typeof formData.services]
                          ? `border-${service.color}-500 bg-${service.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services[service.key as keyof typeof formData.services]}
                        onChange={(e) => setFormData({
                          ...formData,
                          services: { ...formData.services, [service.key]: e.target.checked }
                        })}
                        className="sr-only"
                      />
                      <div className="flex items-start">
                        <service.icon className={`h-5 w-5 mr-3 mt-0.5 ${
                          formData.services[service.key as keyof typeof formData.services]
                            ? `text-${service.color}-600`
                            : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className={`font-medium ${
                            formData.services[service.key as keyof typeof formData.services]
                              ? 'text-gray-900'
                              : 'text-gray-700'
                          }`}>
                            {service.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{service.desc}</div>
                        </div>
                      </div>
                      {formData.services[service.key as keyof typeof formData.services] && (
                        <CheckCircle className={`absolute top-3 right-3 h-5 w-5 text-${service.color}-600`} />
                      )}
                    </label>
                  ))}
                </div>
                
                {/* Service Details */}
                {Object.values(formData.services).some(v => v) && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900">Service Specifications</h4>
                    
                    {formData.services.maintenance && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h5 className="text-sm font-medium text-blue-900 mb-3">Maintenance Service</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">Frequency</label>
                            <select
                              value={formData.serviceDetails.maintenanceFrequency}
                              onChange={(e) => setFormData({
                                ...formData,
                                serviceDetails: { ...formData.serviceDetails, maintenanceFrequency: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 text-sm border border-blue-300 bg-white rounded-md"
                            >
                              <option value="weekly">Weekly (52 visits/year)</option>
                              <option value="bi-weekly">Bi-Weekly (26 visits/year)</option>
                              <option value="monthly">Monthly (12 visits/year)</option>
                              <option value="custom">Custom Schedule</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">Start Month</label>
                            <select className="w-full px-3 py-1.5 text-sm border border-blue-300 bg-white rounded-md">
                              <option>Year Round</option>
                              <option>March</option>
                              <option>April</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formData.services.snow && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h5 className="text-sm font-medium text-blue-900 mb-3">Snow Removal Service</h5>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">Trigger Depth</label>
                            <select
                              value={formData.serviceDetails.snowTrigger}
                              onChange={(e) => setFormData({
                                ...formData,
                                serviceDetails: { ...formData.serviceDetails, snowTrigger: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 text-sm border border-blue-300 bg-white rounded-md"
                            >
                              <option value="zero-tolerance">Zero Tolerance</option>
                              <option value="1-inch">1 inch</option>
                              <option value="2-inches">2 inches</option>
                              <option value="3-inches">3 inches</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">Priority Level</label>
                            <select
                              value={formData.serviceDetails.snowPriority}
                              onChange={(e) => setFormData({
                                ...formData,
                                serviceDetails: { ...formData.serviceDetails, snowPriority: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 text-sm border border-blue-300 bg-white rounded-md"
                            >
                              <option value="critical">Critical (First Route)</option>
                              <option value="high">High Priority</option>
                              <option value="standard">Standard</option>
                              <option value="low">Low Priority</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">De-icing</label>
                            <select className="w-full px-3 py-1.5 text-sm border border-blue-300 bg-white rounded-md">
                              <option>Pre-treat & Post-treat</option>
                              <option>Post-treat Only</option>
                              <option>As Needed</option>
                              <option>None</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formData.services.porter && (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h5 className="text-sm font-medium text-gray-900 mb-3">Porter Service</h5>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">Service Days</label>
                          <div className="grid grid-cols-7 gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                              <label
                                key={day}
                                className={`
                                  flex items-center justify-center p-2 rounded border cursor-pointer
                                  ${formData.serviceDetails.porterDays.includes(day)
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 hover:border-gray-400'
                                  }
                                `}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.serviceDetails.porterDays.includes(day)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFormData({
                                        ...formData,
                                        serviceDetails: {
                                          ...formData.serviceDetails,
                                          porterDays: [...formData.serviceDetails.porterDays, day]
                                        }
                                      })
                                    } else {
                                      setFormData({
                                        ...formData,
                                        serviceDetails: {
                                          ...formData.serviceDetails,
                                          porterDays: formData.serviceDetails.porterDays.filter(d => d !== day)
                                        }
                                      })
                                    }
                                  }}
                                  className="sr-only"
                                />
                                <span className="text-xs font-medium">{day}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
        
      case 'contract':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Information</h3>
              
              <div className="space-y-6">
                {/* Contract Details */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Contract Terms</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contract Number</label>
                      <input
                        type="text"
                        value={formData.contractInfo.contractNumber}
                        onChange={(e) => setFormData({
                          ...formData,
                          contractInfo: { ...formData.contractInfo, contractNumber: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., CTR-2024-001"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                      <select
                        value={formData.contractInfo.contractType}
                        onChange={(e) => setFormData({
                          ...formData,
                          contractInfo: { ...formData.contractInfo, contractType: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="annual">Annual Contract</option>
                        <option value="multi-year">Multi-Year</option>
                        <option value="seasonal">Seasonal</option>
                        <option value="month-to-month">Month-to-Month</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={formData.contractInfo.startDate}
                        onChange={(e) => setFormData({
                          ...formData,
                          contractInfo: { ...formData.contractInfo, startDate: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={formData.contractInfo.endDate}
                        onChange={(e) => setFormData({
                          ...formData,
                          contractInfo: { ...formData.contractInfo, endDate: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.contractInfo.autoRenew}
                        onChange={(e) => setFormData({
                          ...formData,
                          contractInfo: { ...formData.contractInfo, autoRenew: e.target.checked }
                        })}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                      />
                      <span className="text-sm text-gray-700">Auto-renew contract</span>
                    </label>
                    
                    {formData.contractInfo.autoRenew && (
                      <div className="ml-7">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Terms</label>
                        <select
                          value={formData.contractInfo.renewalTerms}
                          onChange={(e) => setFormData({
                            ...formData,
                            contractInfo: { ...formData.contractInfo, renewalTerms: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="12-months">12 Month Renewal</option>
                          <option value="24-months">24 Month Renewal</option>
                          <option value="36-months">36 Month Renewal</option>
                          <option value="same-terms">Same as Current Terms</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Billing Settings */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Billing Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                      <select
                        value={formData.contractInfo.terms}
                        onChange={(e) => setFormData({
                          ...formData,
                          contractInfo: { ...formData.contractInfo, terms: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Net 30">Net 30</option>
                        <option value="Net 15">Net 15</option>
                        <option value="Net 45">Net 45</option>
                        <option value="Net 60">Net 60</option>
                        <option value="Due on Receipt">Due on Receipt</option>
                      </select>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.contractInfo.poRequired}
                          onChange={(e) => setFormData({
                            ...formData,
                            contractInfo: { ...formData.contractInfo, poRequired: e.target.checked }
                          })}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                        />
                        <span className="text-sm text-gray-700">Purchase Order Required</span>
                      </label>
                      
                      {formData.contractInfo.poRequired && (
                        <input
                          type="text"
                          value={formData.contractInfo.poNumber}
                          onChange={(e) => setFormData({
                            ...formData,
                            contractInfo: { ...formData.contractInfo, poNumber: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="PO Number"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.contractInfo.taxExempt}
                        onChange={(e) => setFormData({
                          ...formData,
                          contractInfo: { ...formData.contractInfo, taxExempt: e.target.checked }
                        })}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                      />
                      <span className="text-sm text-gray-700">Tax Exempt</span>
                    </label>
                    
                    {formData.contractInfo.taxExempt && (
                      <div className="ml-7">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Exempt Number</label>
                        <input
                          type="text"
                          value={formData.contractInfo.taxExemptNumber}
                          onChange={(e) => setFormData({
                            ...formData,
                            contractInfo: { ...formData.contractInfo, taxExemptNumber: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter tax exempt certificate number"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Insurance Requirements */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Insurance Requirements</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.contractInfo.insuranceRequired}
                        onChange={(e) => setFormData({
                          ...formData,
                          contractInfo: { ...formData.contractInfo, insuranceRequired: e.target.checked }
                        })}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                      />
                      <span className="text-sm text-gray-700">Additional Insured Required</span>
                    </label>
                    
                    {formData.contractInfo.insuranceRequired && (
                      <div className="ml-7">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Coverage Amount</label>
                        <select
                          value={formData.contractInfo.insuranceAmount}
                          onChange={(e) => setFormData({
                            ...formData,
                            contractInfo: { ...formData.contractInfo, insuranceAmount: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="1000000">$1,000,000</option>
                          <option value="2000000">$2,000,000</option>
                          <option value="5000000">$5,000,000</option>
                          <option value="10000000">$10,000,000</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        
      case 'access':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Access & Security Information</h3>
              
              <div className="space-y-6">
                {/* Access Codes */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Key className="h-4 w-4 mr-2 text-blue-600" />
                    Access Codes
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gate Code</label>
                      <input
                        type="text"
                        value={formData.accessInfo.gateCode}
                        onChange={(e) => setFormData({
                          ...formData,
                          accessInfo: { ...formData.accessInfo, gateCode: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="#1234"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lockbox Code</label>
                      <input
                        type="text"
                        value={formData.accessInfo.lockboxCode}
                        onChange={(e) => setFormData({
                          ...formData,
                          accessInfo: { ...formData.accessInfo, lockboxCode: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="5678"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alarm Code</label>
                      <input
                        type="text"
                        value={formData.accessInfo.alarmCode}
                        onChange={(e) => setFormData({
                          ...formData,
                          accessInfo: { ...formData.accessInfo, alarmCode: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="****"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Access Hours & Requirements */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    Access Requirements
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Access Hours</label>
                        <select
                          value={formData.accessInfo.accessHours}
                          onChange={(e) => setFormData({
                            ...formData,
                            accessInfo: { ...formData.accessInfo, accessHours: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="24/7">24/7 Access</option>
                          <option value="business">Business Hours Only (M-F 8-5)</option>
                          <option value="extended">Extended Hours (M-F 6-6)</option>
                          <option value="custom">Custom Schedule</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">After Hours Contact</label>
                        <input
                          type="text"
                          value={formData.accessInfo.afterHoursContact}
                          onChange={(e) => setFormData({
                            ...formData,
                            accessInfo: { ...formData.accessInfo, afterHoursContact: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="Security: (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.accessInfo.requiresEscort}
                          onChange={(e) => setFormData({
                            ...formData,
                            accessInfo: { ...formData.accessInfo, requiresEscort: e.target.checked }
                          })}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                        />
                        <span className="text-sm text-gray-700">Escort Required</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.accessInfo.checkInRequired}
                          onChange={(e) => setFormData({
                            ...formData,
                            accessInfo: { ...formData.accessInfo, checkInRequired: e.target.checked }
                          })}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                        />
                        <span className="text-sm text-gray-700">Check-in Required</span>
                      </label>
                      
                      {formData.accessInfo.checkInRequired && (
                        <div className="ml-7">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Location</label>
                          <input
                            type="text"
                            value={formData.accessInfo.checkInLocation}
                            onChange={(e) => setFormData({
                              ...formData,
                              accessInfo: { ...formData.accessInfo, checkInLocation: e.target.value }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Main lobby security desk"
                          />
                        </div>
                      )}
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.accessInfo.badgeRequired}
                          onChange={(e) => setFormData({
                            ...formData,
                            accessInfo: { ...formData.accessInfo, badgeRequired: e.target.checked }
                          })}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                        />
                        <span className="text-sm text-gray-700">Badge/ID Required</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.accessInfo.orientationRequired}
                          onChange={(e) => setFormData({
                            ...formData,
                            accessInfo: { ...formData.accessInfo, orientationRequired: e.target.checked }
                          })}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
                        />
                        <span className="text-sm text-gray-700">Safety Orientation Required</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Safety Requirements */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-600" />
                    Safety Requirements
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      'Hard Hat',
                      'Safety Vest',
                      'Steel Toe Boots',
                      'Safety Glasses',
                      'Hearing Protection',
                      'Fall Protection',
                      'High Vis Clothing',
                      'Drug Testing',
                      'Background Check'
                    ].map(req => (
                      <label key={req} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.accessInfo.safetyRequirements.includes(req)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                accessInfo: {
                                  ...formData.accessInfo,
                                  safetyRequirements: [...formData.accessInfo.safetyRequirements, req]
                                }
                              })
                            } else {
                              setFormData({
                                ...formData,
                                accessInfo: {
                                  ...formData.accessInfo,
                                  safetyRequirements: formData.accessInfo.safetyRequirements.filter(r => r !== req)
                                }
                              })
                            }
                          }}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                        />
                        <span className="text-sm text-gray-700">{req}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Equipment & Parking */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-blue-600" />
                    Equipment & Parking
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Restrictions</label>
                      <select
                        value={formData.accessInfo.equipmentRestrictions}
                        onChange={(e) => setFormData({
                          ...formData,
                          accessInfo: { ...formData.accessInfo, equipmentRestrictions: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">No Restrictions</option>
                        <option value="small-only">Small Equipment Only</option>
                        <option value="no-large-mowers">No Large Mowers (60"+)</option>
                        <option value="no-heavy">No Heavy Equipment</option>
                        <option value="hand-tools">Hand Tools Only</option>
                        <option value="electric">Electric Equipment Only</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parking Instructions</label>
                      <textarea
                        value={formData.accessInfo.parkingInstructions}
                        onChange={(e) => setFormData({
                          ...formData,
                          accessInfo: { ...formData.accessInfo, parkingInstructions: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="e.g., Park in visitor spots near building B. Trucks can use loading dock area."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        
      case 'budget':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget & Approval Settings</h3>
              
              <div className="space-y-6">
                {/* Budget Overview */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                    Budget Allocation
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Budget</label>
                      <input
                        type="text"
                        value={formData.budgetInfo.annualBudget}
                        onChange={(e) => setFormData({
                          ...formData,
                          budgetInfo: { ...formData.budgetInfo, annualBudget: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="$50,000"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget</label>
                      <input
                        type="text"
                        value={formData.budgetInfo.monthlyBudget}
                        onChange={(e) => setFormData({
                          ...formData,
                          budgetInfo: { ...formData.budgetInfo, monthlyBudget: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="$4,200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget Cycle</label>
                      <select
                        value={formData.budgetInfo.budgetCycle}
                        onChange={(e) => setFormData({
                          ...formData,
                          budgetInfo: { ...formData.budgetInfo, budgetCycle: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="calendar">Calendar Year</option>
                        <option value="fiscal">Fiscal Year</option>
                        <option value="contract">Contract Year</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Approval Limits */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Approval Hierarchy</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">Automatic Approval</label>
                      <input
                        type="text"
                        value={formData.budgetInfo.approvalLimits.automatic}
                        onChange={(e) => setFormData({
                          ...formData,
                          budgetInfo: {
                            ...formData.budgetInfo,
                            approvalLimits: { ...formData.budgetInfo.approvalLimits, automatic: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Up to $500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">Manager Approval Required</label>
                      <input
                        type="text"
                        value={formData.budgetInfo.approvalLimits.managerApproval}
                        onChange={(e) => setFormData({
                          ...formData,
                          budgetInfo: {
                            ...formData.budgetInfo,
                            approvalLimits: { ...formData.budgetInfo.approvalLimits, managerApproval: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="$501 - $2,500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">Owner Approval Required</label>
                      <input
                        type="text"
                        value={formData.budgetInfo.approvalLimits.ownerApproval}
                        onChange={(e) => setFormData({
                          ...formData,
                          budgetInfo: {
                            ...formData.budgetInfo,
                            approvalLimits: { ...formData.budgetInfo.approvalLimits, ownerApproval: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Over $2,500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Budget Alerts */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Budget Alerts
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warning Threshold</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={formData.budgetInfo.budgetAlerts.warningThreshold}
                          onChange={(e) => setFormData({
                            ...formData,
                            budgetInfo: {
                              ...formData.budgetInfo,
                              budgetAlerts: { ...formData.budgetInfo.budgetAlerts, warningThreshold: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="80"
                        />
                        <span className="ml-2 text-gray-700">%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Alert when budget reaches this percentage</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Critical Threshold</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={formData.budgetInfo.budgetAlerts.criticalThreshold}
                          onChange={(e) => setFormData({
                            ...formData,
                            budgetInfo: {
                              ...formData.budgetInfo,
                              budgetAlerts: { ...formData.budgetInfo.budgetAlerts, criticalThreshold: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="95"
                        />
                        <span className="ml-2 text-gray-700">%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Require approval for all work</p>
                    </div>
                  </div>
                </div>
                
                {/* Vendor Preferences */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Vendor Management</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Vendors</label>
                      <div className="space-y-2">
                        {formData.budgetInfo.preferredVendors.length === 0 ? (
                          <p className="text-sm text-gray-500">No preferred vendors specified</p>
                        ) : (
                          formData.budgetInfo.preferredVendors.map((vendor, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">{vendor}</span>
                              <button type="button" className="text-sm text-red-600 hover:text-red-700">
                                Remove
                              </button>
                            </div>
                          ))
                        )}
                        <button
                          type="button"
                          className="w-full py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                        >
                          + Add Preferred Vendor
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Restricted Vendors</label>
                      <div className="space-y-2">
                        {formData.budgetInfo.restrictedVendors.length === 0 ? (
                          <p className="text-sm text-gray-500">No vendor restrictions</p>
                        ) : (
                          formData.budgetInfo.restrictedVendors.map((vendor, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded">
                              <span className="text-sm">{vendor}</span>
                              <button type="button" className="text-sm text-red-600 hover:text-red-700">
                                Remove
                              </button>
                            </div>
                          ))
                        )}
                        <button
                          type="button"
                          className="w-full py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                        >
                          + Add Restricted Vendor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Clean White */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Property</h1>
              <p className="text-gray-600 text-sm mt-1">Complete all sections to create a new property record</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Section Navigation */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Property Setup
            </h2>
            <nav className="space-y-1">
              {sections.map((section, index) => {
                const Icon = section.icon
                const isActive = activeSection === section.key
                const isCompleted = false // You can implement completion logic
                
                return (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`
                      w-full flex items-center px-3 py-2 text-sm rounded-lg transition-all
                      ${isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className="flex items-center flex-1">
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-lg mr-3
                        ${isActive ? 'bg-blue-200' : 'bg-gray-100'}
                      `}>
                        <Icon className={`h-4 w-4 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center">
                          <span>{section.label}</span>
                          {isCompleted && (
                            <CheckCircle className="h-4 w-4 text-blue-600 ml-2" />
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>
          
          {/* Progress Indicator */}
          <div className="px-4 pb-4 mt-auto">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Progress</span>
                <span className="text-xs font-medium text-gray-700">2 of 8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto">
            {renderSectionContent()}
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.key === activeSection)
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].key)
                  }
                }}
                disabled={activeSection === sections[0].key}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md
                  ${activeSection === sections[0].key
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Save Draft
                </button>
                
                {activeSection === sections[sections.length - 1].key ? (
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Create Property
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.key === activeSection)
                      if (currentIndex < sections.length - 1) {
                        setActiveSection(sections[currentIndex + 1].key)
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}