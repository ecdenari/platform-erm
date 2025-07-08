import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enterpriseTokens, platformStyles } from '../../../styles/enterpriseTokens'
import { PropertyType, PropertyStatus } from '../../../modules/properties/types'
import { 
  MapPin, Navigation, Trees, Snowflake, Droplets, Construction, 
  Building, Users, Phone, Mail, Calendar, Clock, DollarSign,
  Shield, Key, Truck, AlertCircle, CheckCircle, FileText,
  Settings, Tag, Briefcase, Home, Factory, ShoppingBag
} from 'lucide-react'

export const PropertyCreateAspireServiceTitanV1: React.FC = () => {
  const navigate = useNavigate()
  const styles = platformStyles.aspire // Using Aspire styling (neutral colors)
  
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    propertyType: PropertyType.Commercial,
    status: PropertyStatus.Active,
    propertyCode: '',
    
    // Company & Hierarchy
    companyId: 0,
    divisionId: 0,
    branchId: 0,
    
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
    
    // Contacts
    primaryContactId: 0,
    billingContactId: 0,
    propertyManagerId: 0,
    authorizedContacts: [] as number[],
    
    // Service Settings
    services: {
      maintenance: false,
      construction: false,
      snow: false,
      irrigation: false,
      enhancement: false
    },
    
    // Contract & Billing
    contractInfo: {
      contractNumber: '',
      startDate: '',
      endDate: '',
      autoRenew: true,
      terms: 'Net 30',
      poRequired: false,
      taxExempt: false,
      taxExemptNumber: ''
    },
    
    // Access & Security
    accessInfo: {
      gateCode: '',
      lockboxCode: '',
      alarmCode: '',
      accessHours: '24/7',
      requiresEscort: false,
      checkInRequired: false,
      safetyRequirements: [] as string[],
      equipmentRestrictions: ''
    },
    
    // Property Details
    propertyDetails: {
      yearBuilt: '',
      totalAcres: '',
      buildingSqFt: '',
      parkingSpaces: '',
      occupancyType: '',
      propertyUse: '',
      managementCompany: ''
    },
    
    // Budget & Billing
    budgetInfo: {
      annualBudget: '',
      monthlyBudget: '',
      approvalLimits: {
        automatic: '',
        managerApproval: '',
        ownerApproval: ''
      },
      preferredVendors: [] as string[]
    },
    
    // Special Instructions
    specialInstructions: {
      generalNotes: '',
      serviceNotes: '',
      billingNotes: '',
      emergencyProcedures: ''
    }
  })

  const [activeSection, setActiveSection] = useState<string>('company')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting:', formData)
    navigate('/properties')
  }

  const propertyTypeIcons = {
    [PropertyType.Commercial]: Building,
    [PropertyType.Residential]: Home,
    [PropertyType.Industrial]: Factory,
    [PropertyType.Mixed]: ShoppingBag,
    [PropertyType.Vacant]: Tag
  }

  const serviceIcons = {
    maintenance: Trees,
    construction: Construction,
    snow: Snowflake,
    irrigation: Droplets,
    enhancement: Trees
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Clean White with ServiceTitan Density */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">New Property</h1>
              <p className="text-gray-600 text-sm mt-1">Create a new commercial property record</p>
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

      {/* Main Content - Dense ServiceTitan-style Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Company & Basic Info */}
          <div className="col-span-4 space-y-4">
            {/* Company Hierarchy */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                  Company & Hierarchy
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.companyId}
                    onChange={(e) => setFormData({ ...formData, companyId: parseInt(e.target.value) })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={0}>Select Company</option>
                    <option value={1}>ABC Property Management</option>
                    <option value={2}>Greenwood Commercial LLC</option>
                    <option value={3}>Summit Office Properties</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Division</label>
                    <select
                      value={formData.divisionId}
                      onChange={(e) => setFormData({ ...formData, divisionId: parseInt(e.target.value) })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Select Division</option>
                      <option value={1}>Northeast</option>
                      <option value={2}>Southeast</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Branch</label>
                    <select
                      value={formData.branchId}
                      onChange={(e) => setFormData({ ...formData, branchId: parseInt(e.target.value) })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Select Branch</option>
                      <option value={1}>Denver Metro</option>
                      <option value={2}>Fort Collins</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <Building className="h-4 w-4 mr-2 text-blue-600" />
                  Property Information
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Property Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Greenwood Office Park"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Property Code</label>
                    <input
                      type="text"
                      value={formData.propertyCode}
                      onChange={(e) => setFormData({ ...formData, propertyCode: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., GOP-001"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={PropertyStatus.Active}>Active</option>
                      <option value={PropertyStatus.Inactive}>Inactive</option>
                      <option value={PropertyStatus.Pending}>Pending</option>
                    </select>
                  </div>
                </div>
                
                {/* Property Type Visual Selector */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Property Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(propertyTypeIcons).map(([type, Icon]) => (
                      <label
                        key={type}
                        className={`
                          relative flex flex-col items-center p-3 rounded-md border-2 cursor-pointer transition-all
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
                        <Icon className={`h-5 w-5 mb-1 ${
                          formData.propertyType === type ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <span className={`text-xs ${
                          formData.propertyType === type ? 'text-blue-700 font-medium' : 'text-gray-600'
                        }`}>
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  Contacts
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Primary Contact <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.primaryContactId}
                    onChange={(e) => setFormData({ ...formData, primaryContactId: parseInt(e.target.value) })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Select Contact</option>
                    <option value={1}>John Smith - Property Manager</option>
                    <option value={2}>Jane Doe - Facilities Director</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Billing Contact</label>
                  <select
                    value={formData.billingContactId}
                    onChange={(e) => setFormData({ ...formData, billingContactId: parseInt(e.target.value) })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Same as Primary</option>
                    <option value={3}>Accounts Payable</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Property Manager</label>
                  <select
                    value={formData.propertyManagerId}
                    onChange={(e) => setFormData({ ...formData, propertyManagerId: parseInt(e.target.value) })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Select Manager</option>
                    <option value={1}>Mike Johnson</option>
                    <option value={2}>Sarah Williams</option>
                  </select>
                </div>
                
                <button
                  type="button"
                  className="w-full px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  + Add Authorized Contacts
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column - Location & Services */}
          <div className="col-span-4 space-y-4">
            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  Location & Address
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, street: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Main Street"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Suite/Unit</label>
                  <input
                    type="text"
                    value={formData.address.suite}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, suite: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Suite 100"
                  />
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-span-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address, city: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Denver"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address, state: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="CO"
                      maxLength={2}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">ZIP</label>
                    <input
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address, zipCode: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="80202"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Service Zone</label>
                  <select
                    value={formData.serviceZone}
                    onChange={(e) => setFormData({ ...formData, serviceZone: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Zone</option>
                    <option value="north">North Region</option>
                    <option value="south">South Region</option>
                    <option value="central">Central</option>
                  </select>
                </div>
                
                {/* Map Preview */}
                <div className="mt-3 bg-gray-100 rounded-md h-32 flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Map Preview</p>
                    <button type="button" className="mt-1 text-xs text-blue-600 hover:text-blue-700">
                      Set GPS Location
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-blue-600" />
                  Services Required
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {Object.entries({
                    maintenance: { label: 'Landscape Maintenance', desc: 'Weekly/Bi-weekly service' },
                    construction: { label: 'Construction', desc: 'Installation & renovation' },
                    snow: { label: 'Snow Removal', desc: 'Winter services' },
                    irrigation: { label: 'Irrigation', desc: 'System management' },
                    enhancement: { label: 'Enhancement', desc: 'Seasonal improvements' }
                  }).map(([key, config]) => {
                    const Icon = serviceIcons[key as keyof typeof serviceIcons]
                    const isSelected = formData.services[key as keyof typeof formData.services]
                    
                    return (
                      <label
                        key={key}
                        className={`
                          flex items-center p-3 rounded-md border cursor-pointer transition-all
                          ${isSelected 
                            ? 'border-blue-500 bg-blue-50' 
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
                        <Icon className={`h-5 w-5 mr-3 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                            {config.label}
                          </span>
                          <p className="text-xs text-gray-500">{config.desc}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  Property Details
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Year Built</label>
                    <input
                      type="text"
                      value={formData.propertyDetails.yearBuilt}
                      onChange={(e) => setFormData({
                        ...formData,
                        propertyDetails: { ...formData.propertyDetails, yearBuilt: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 2005"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Total Acres</label>
                    <input
                      type="text"
                      value={formData.propertyDetails.totalAcres}
                      onChange={(e) => setFormData({
                        ...formData,
                        propertyDetails: { ...formData.propertyDetails, totalAcres: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 5.5"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Building Sq Ft</label>
                    <input
                      type="text"
                      value={formData.propertyDetails.buildingSqFt}
                      onChange={(e) => setFormData({
                        ...formData,
                        propertyDetails: { ...formData.propertyDetails, buildingSqFt: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 50,000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Parking Spaces</label>
                    <input
                      type="text"
                      value={formData.propertyDetails.parkingSpaces}
                      onChange={(e) => setFormData({
                        ...formData,
                        propertyDetails: { ...formData.propertyDetails, parkingSpaces: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Management Company</label>
                  <input
                    type="text"
                    value={formData.propertyDetails.managementCompany}
                    onChange={(e) => setFormData({
                      ...formData,
                      propertyDetails: { ...formData.propertyDetails, managementCompany: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., ABC Property Management"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contract, Access & Budget */}
          <div className="col-span-4 space-y-4">
            {/* Contract & Billing */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  Contract & Billing
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Contract Number</label>
                    <input
                      type="text"
                      value={formData.contractInfo.contractNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        contractInfo: { ...formData.contractInfo, contractNumber: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., CTR-2024-001"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Payment Terms</label>
                    <select
                      value={formData.contractInfo.terms}
                      onChange={(e) => setFormData({
                        ...formData,
                        contractInfo: { ...formData.contractInfo, terms: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Net 30">Net 30</option>
                      <option value="Net 15">Net 15</option>
                      <option value="Due on Receipt">Due on Receipt</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={formData.contractInfo.startDate}
                      onChange={(e) => setFormData({
                        ...formData,
                        contractInfo: { ...formData.contractInfo, startDate: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={formData.contractInfo.endDate}
                      onChange={(e) => setFormData({
                        ...formData,
                        contractInfo: { ...formData.contractInfo, endDate: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contractInfo.autoRenew}
                      onChange={(e) => setFormData({
                        ...formData,
                        contractInfo: { ...formData.contractInfo, autoRenew: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                    />
                    <span className="text-sm text-gray-700">Auto-renew contract</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contractInfo.poRequired}
                      onChange={(e) => setFormData({
                        ...formData,
                        contractInfo: { ...formData.contractInfo, poRequired: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                    />
                    <span className="text-sm text-gray-700">Purchase Order required</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contractInfo.taxExempt}
                      onChange={(e) => setFormData({
                        ...formData,
                        contractInfo: { ...formData.contractInfo, taxExempt: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                    />
                    <span className="text-sm text-gray-700">Tax exempt</span>
                  </label>
                </div>
                
                {formData.contractInfo.taxExempt && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tax Exempt Number</label>
                    <input
                      type="text"
                      value={formData.contractInfo.taxExemptNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        contractInfo: { ...formData.contractInfo, taxExemptNumber: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter tax exempt number"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Access & Security */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                  Access & Security
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Gate Code</label>
                    <input
                      type="text"
                      value={formData.accessInfo.gateCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessInfo: { ...formData.accessInfo, gateCode: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="#1234"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Lockbox Code</label>
                    <input
                      type="text"
                      value={formData.accessInfo.lockboxCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessInfo: { ...formData.accessInfo, lockboxCode: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="5678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Alarm Code</label>
                    <input
                      type="text"
                      value={formData.accessInfo.alarmCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessInfo: { ...formData.accessInfo, alarmCode: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="****"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Access Hours</label>
                  <select
                    value={formData.accessInfo.accessHours}
                    onChange={(e) => setFormData({
                      ...formData,
                      accessInfo: { ...formData.accessInfo, accessHours: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="24/7">24/7 Access</option>
                    <option value="business">Business Hours Only</option>
                    <option value="custom">Custom Schedule</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Equipment Restrictions</label>
                  <select
                    value={formData.accessInfo.equipmentRestrictions}
                    onChange={(e) => setFormData({
                      ...formData,
                      accessInfo: { ...formData.accessInfo, equipmentRestrictions: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">None</option>
                    <option value="small-only">Small Equipment Only</option>
                    <option value="no-large-mowers">No Large Mowers</option>
                    <option value="hand-tools">Hand Tools Only</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.accessInfo.requiresEscort}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessInfo: { ...formData.accessInfo, requiresEscort: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                    />
                    <span className="text-sm text-gray-700">Requires escort</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.accessInfo.checkInRequired}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessInfo: { ...formData.accessInfo, checkInRequired: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                    />
                    <span className="text-sm text-gray-700">Check-in required</span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Safety Requirements</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Hard Hat', 'Safety Vest', 'Steel Toe Boots', 'Eye Protection', 'Hearing Protection', 'Fall Protection'].map(req => (
                      <label key={req} className="flex items-center text-sm">
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
                        <span className="text-gray-700">{req}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                  Budget & Approval Limits
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Annual Budget</label>
                    <input
                      type="text"
                      value={formData.budgetInfo.annualBudget}
                      onChange={(e) => setFormData({
                        ...formData,
                        budgetInfo: { ...formData.budgetInfo, annualBudget: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="$50,000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Monthly Budget</label>
                    <input
                      type="text"
                      value={formData.budgetInfo.monthlyBudget}
                      onChange={(e) => setFormData({
                        ...formData,
                        budgetInfo: { ...formData.budgetInfo, monthlyBudget: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="$4,200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Approval Limits</label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3">
                      <label className="text-xs text-gray-600">Automatic Approval</label>
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
                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Up to $500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <label className="text-xs text-gray-600">Manager Approval</label>
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
                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="$501 - $2,500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <label className="text-xs text-gray-600">Owner Approval</label>
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
                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Over $2,500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Special Instructions
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">General Notes</label>
                  <textarea
                    value={formData.specialInstructions.generalNotes}
                    onChange={(e) => setFormData({
                      ...formData,
                      specialInstructions: { ...formData.specialInstructions, generalNotes: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Any general instructions or notes..."
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Service Notes</label>
                  <textarea
                    value={formData.specialInstructions.serviceNotes}
                    onChange={(e) => setFormData({
                      ...formData,
                      specialInstructions: { ...formData.specialInstructions, serviceNotes: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Service-specific instructions..."
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Billing Notes</label>
                  <textarea
                    value={formData.specialInstructions.billingNotes}
                    onChange={(e) => setFormData({
                      ...formData,
                      specialInstructions: { ...formData.specialInstructions, billingNotes: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Billing or invoicing instructions..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}