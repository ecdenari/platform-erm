import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enterpriseTokens, platformStyles } from '../../../styles/enterpriseTokens'
import { PropertyType, PropertyStatus } from '../../../modules/properties/types'
import { 
  Building2, Users, FileText, DollarSign, Calendar,
  ChevronRight, Briefcase, Phone, Mail, MapPin,
  AlertCircle, CheckCircle, Clock, TrendingUp
} from 'lucide-react'

interface RelatedProperty {
  id: number
  name: string
  address: string
  status: string
  contractValue: number
  lastService: string
}

export const PropertyCreateAspireV1: React.FC = () => {
  const navigate = useNavigate()
  const styles = platformStyles.aspire
  
  const [formData, setFormData] = useState({
    // Company Context (Primary)
    companyId: 0,
    contractTemplateId: 0,
    masterAgreementId: 0,
    
    // Property Information
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
    
    // Commercial Details
    billingStructure: 'monthly',
    paymentTerms: 'net30',
    poRequired: true,
    taxExempt: false,
    insuranceRequired: true,
    
    // Contacts (Commercial Hierarchy)
    contacts: {
      decisionMaker: 0,
      propertyManager: 0,
      accountsPayable: 0,
      onSiteContact: 0,
      emergencyContact: 0
    },
    
    // Service Configuration
    services: {
      maintenance: false,
      construction: false,
      snow: false,
      irrigation: false,
      enhancement: false
    },
    
    // Approval Workflow
    approvalRequired: true,
    approvers: [] as number[],
    budgetThreshold: 5000,
    
    // Integration
    erpCustomerId: '',
    glCode: ''
  })

  // Mock data for company context
  const mockCompany = {
    id: 1,
    name: 'ABC Commercial Properties LLC',
    type: 'Property Management Company',
    totalProperties: 24,
    activeContracts: 18,
    annualValue: 1250000,
    yearEstablished: 2005,
    contacts: [
      { id: 1, name: 'John Smith', title: 'VP of Operations', email: 'jsmith@abc.com', phone: '(555) 123-4567' },
      { id: 2, name: 'Sarah Johnson', title: 'Regional Manager', email: 'sjohnson@abc.com', phone: '(555) 234-5678' },
      { id: 3, name: 'Mike Williams', title: 'Facilities Director', email: 'mwilliams@abc.com', phone: '(555) 345-6789' }
    ]
  }

  const relatedProperties: RelatedProperty[] = [
    { id: 1, name: 'ABC Tower North', address: '100 Main St', status: 'Active', contractValue: 125000, lastService: '2 days ago' },
    { id: 2, name: 'ABC Plaza', address: '200 Commerce Way', status: 'Active', contractValue: 98000, lastService: '1 week ago' },
    { id: 3, name: 'ABC Business Center', address: '300 Enterprise Dr', status: 'Active', contractValue: 156000, lastService: '3 days ago' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting:', formData)
    navigate('/properties')
  }

  const handleCompanyChange = (companyId: number) => {
    setFormData({ ...formData, companyId })
    // In real app, would load company data and related properties
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/properties')}
                className="text-slate-600 hover:text-slate-900"
              >
                ← Back
              </button>
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-slate-400" />
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">New Commercial Property</h1>
                  <p className="text-sm text-slate-600">Add property to client portfolio</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800"
              >
                Create Property
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-screen-xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Company Context & Related Properties */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Selection */}
            <div className={styles.card.container}>
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-slate-400" />
                  Company Context
                </h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Select Company <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.companyId}
                    onChange={(e) => handleCompanyChange(parseInt(e.target.value))}
                    className={styles.form.input}
                  >
                    <option value={0}>Choose a company...</option>
                    <option value={1}>ABC Commercial Properties LLC</option>
                    <option value={2}>XYZ Property Management</option>
                    <option value={3}>Summit Office Group</option>
                  </select>
                </div>
                
                {formData.companyId > 0 && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="text-xs text-slate-600 mb-2">Company Overview</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-500">Type:</span>
                          <span className="ml-1 font-medium">{mockCompany.type}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Properties:</span>
                          <span className="ml-1 font-medium">{mockCompany.totalProperties}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Annual Value:</span>
                          <span className="ml-1 font-medium">${(mockCompany.annualValue / 1000000).toFixed(1)}M</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Since:</span>
                          <span className="ml-1 font-medium">{mockCompany.yearEstablished}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Contract Template
                      </label>
                      <select
                        value={formData.contractTemplateId}
                        onChange={(e) => setFormData({ ...formData, contractTemplateId: parseInt(e.target.value) })}
                        className={styles.form.input}
                      >
                        <option value={0}>Select template...</option>
                        <option value={1}>ABC Standard Commercial</option>
                        <option value={2}>ABC Premium Service</option>
                        <option value={3}>Custom Agreement</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Properties */}
            {formData.companyId > 0 && (
              <div className={styles.card.container}>
                <div className="p-4 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center justify-between">
                    <span className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-slate-400" />
                      Portfolio Properties
                    </span>
                    <span className="text-xs font-normal text-slate-500">{relatedProperties.length} active</span>
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {relatedProperties.map(property => (
                    <div key={property.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{property.name}</div>
                          <div className="text-xs text-slate-500">{property.address}</div>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          {property.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>${(property.contractValue / 1000).toFixed(0)}k/year</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {property.lastService}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-100">
                  <button
                    type="button"
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    View full portfolio →
                  </button>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            {formData.companyId > 0 && (
              <div className={styles.card.container}>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-slate-400" />
                    Client Insights
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">Payment History</span>
                      <div className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs font-medium text-green-700">Excellent</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">Avg Response Time</span>
                      <span className="text-xs font-medium">&lt; 24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">Growth Rate</span>
                      <span className="text-xs font-medium text-green-700">+15% YoY</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Information */}
            <div className={styles.card.container}>
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">Property Information</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Property Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.form.input}
                      placeholder="e.g., ABC Tower South"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Property Code
                    </label>
                    <input
                      type="text"
                      value={formData.propertyCode}
                      onChange={(e) => setFormData({ ...formData, propertyCode: e.target.value })}
                      className={styles.form.input}
                      placeholder="ABC-SOUTH-001"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                      className={styles.form.input}
                    >
                      <option value={PropertyType.Commercial}>Office Building</option>
                      <option value={PropertyType.Residential}>Multi-Family</option>
                      <option value={PropertyType.Industrial}>Industrial</option>
                      <option value={PropertyType.Mixed}>Retail Center</option>
                      <option value={PropertyType.Vacant}>Medical Facility</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                      className={styles.form.input}
                    >
                      <option value={PropertyStatus.Active}>Active</option>
                      <option value={PropertyStatus.Pending}>Pending Contract</option>
                      <option value={PropertyStatus.Inactive}>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className={styles.card.container}>
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                  Location Details
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
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
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Suite/Unit</label>
                      <input
                        type="text"
                        value={formData.address.suite}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          address: { ...formData.address, suite: e.target.value }
                        })}
                        className={styles.form.input}
                        placeholder="Suite 200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
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
                      <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
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
                      <label className="block text-sm font-medium text-slate-700 mb-1">ZIP</label>
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
            </div>

            {/* Commercial Contacts */}
            <div className={styles.card.container}>
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-slate-400" />
                  Contact Hierarchy
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Decision Maker
                    </label>
                    <select
                      value={formData.contacts.decisionMaker}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: { ...formData.contacts, decisionMaker: parseInt(e.target.value) }
                      })}
                      className={styles.form.input}
                    >
                      <option value={0}>Select contact...</option>
                      {mockCompany.contacts.map(contact => (
                        <option key={contact.id} value={contact.id}>
                          {contact.name} - {contact.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Property Manager
                    </label>
                    <select
                      value={formData.contacts.propertyManager}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: { ...formData.contacts, propertyManager: parseInt(e.target.value) }
                      })}
                      className={styles.form.input}
                    >
                      <option value={0}>Select contact...</option>
                      {mockCompany.contacts.map(contact => (
                        <option key={contact.id} value={contact.id}>
                          {contact.name} - {contact.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Accounts Payable
                    </label>
                    <select
                      value={formData.contacts.accountsPayable}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: { ...formData.contacts, accountsPayable: parseInt(e.target.value) }
                      })}
                      className={styles.form.input}
                    >
                      <option value={0}>Select contact...</option>
                      <option value={4}>AP Department</option>
                      <option value={5}>Finance Team</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      On-Site Contact
                    </label>
                    <select
                      value={formData.contacts.onSiteContact}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: { ...formData.contacts, onSiteContact: parseInt(e.target.value) }
                      })}
                      className={styles.form.input}
                    >
                      <option value={0}>Select contact...</option>
                      <option value={6}>Building Manager</option>
                      <option value={7}>Maintenance Supervisor</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Settings */}
            <div className={styles.card.container}>
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-slate-400" />
                  Commercial Settings
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Billing Structure
                    </label>
                    <select
                      value={formData.billingStructure}
                      onChange={(e) => setFormData({ ...formData, billingStructure: e.target.value })}
                      className={styles.form.input}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annual">Annual</option>
                      <option value="per-service">Per Service</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Payment Terms
                    </label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                      className={styles.form.input}
                    >
                      <option value="net30">Net 30</option>
                      <option value="net15">Net 15</option>
                      <option value="net45">Net 45</option>
                      <option value="net60">Net 60</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Budget Threshold
                    </label>
                    <input
                      type="number"
                      value={formData.budgetThreshold}
                      onChange={(e) => setFormData({ ...formData, budgetThreshold: parseInt(e.target.value) })}
                      className={styles.form.input}
                      placeholder="5000"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.poRequired}
                      onChange={(e) => setFormData({ ...formData, poRequired: e.target.checked })}
                      className="h-4 w-4 text-slate-600 rounded border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-700">PO Required</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.taxExempt}
                      onChange={(e) => setFormData({ ...formData, taxExempt: e.target.checked })}
                      className="h-4 w-4 text-slate-600 rounded border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-700">Tax Exempt</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.insuranceRequired}
                      onChange={(e) => setFormData({ ...formData, insuranceRequired: e.target.checked })}
                      className="h-4 w-4 text-slate-600 rounded border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-700">Insurance Required</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.approvalRequired}
                      onChange={(e) => setFormData({ ...formData, approvalRequired: e.target.checked })}
                      className="h-4 w-4 text-slate-600 rounded border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-700">Approval Workflow</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Services - Simple checkboxes */}
            <div className={styles.card.container}>
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">Services</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries({
                    maintenance: 'Landscape Maintenance',
                    construction: 'Construction',
                    snow: 'Snow Removal',
                    irrigation: 'Irrigation',
                    enhancement: 'Enhancement'
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.services[key as keyof typeof formData.services]}
                        onChange={(e) => setFormData({
                          ...formData,
                          services: { ...formData.services, [key]: e.target.checked }
                        })}
                        className="h-4 w-4 text-slate-600 rounded border-slate-300"
                      />
                      <span className="ml-2 text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <AlertCircle className="h-4 w-4" />
                <span>Property measurements will be defined during opportunity/takeoff creation</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
                >
                  Create & Add Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}