import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enterpriseTokens, platformStyles } from '../../../styles/enterpriseTokens'
import { PropertyType, PropertyStatus } from '../../../modules/properties/types'
import { 
  Zap, Plus, ArrowRight, Building2, MapPin,
  FileText, Users, TrendingUp, Clock, CheckCircle2,
  AlertCircle, Sparkles, Target, DollarSign
} from 'lucide-react'

export const PropertyCreateAspireV2: React.FC = () => {
  const navigate = useNavigate()
  const styles = platformStyles.aspire
  
  const [formData, setFormData] = useState({
    // Minimal Required Fields
    name: '',
    companyId: 0,
    
    // Address (Required for identification)
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    
    // Quick Settings
    propertyType: PropertyType.Commercial,
    primaryContactId: 0,
    
    // Opportunity Creation
    createOpportunity: true,
    opportunityType: 'new-contract',
    takeoffTemplateId: 0
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  // Mock data
  const recentProperties = [
    { id: 1, name: 'Summit Office Park', company: 'ABC Properties', created: '2 days ago' },
    { id: 2, name: 'Greenwood Plaza', company: 'XYZ Management', created: '1 week ago' },
    { id: 3, name: 'Downtown Tower', company: 'Summit Group', created: '2 weeks ago' }
  ]

  const opportunityTemplates = [
    { id: 1, name: 'Standard Commercial Maintenance', type: 'maintenance', estimatedValue: '$50k-100k' },
    { id: 2, name: 'Full Service Package', type: 'full-service', estimatedValue: '$100k-250k' },
    { id: 3, name: 'Snow Removal Contract', type: 'snow', estimatedValue: '$25k-50k' },
    { id: 4, name: 'Enhancement Project', type: 'enhancement', estimatedValue: '$10k-25k' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating property with opportunity:', formData)
    
    if (formData.createOpportunity) {
      // Would navigate to opportunity creation with property context
      navigate(`/opportunities/new?propertyId=new`)
    } else {
      navigate('/properties')
    }
  }

  const handleQuickCreate = () => {
    // Validate minimal fields
    if (!formData.name || !formData.companyId || !formData.address.street) {
      alert('Please fill in required fields')
      return
    }
    handleSubmit(new Event('submit') as any)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Streamlined Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Quick Property Setup</h1>
                <p className="text-sm text-slate-600 mt-0.5">
                  Create property and start opportunity in one flow
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/properties')}
              className="text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-screen-lg mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Form - Minimal Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Essential Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                  Essential Information Only
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Detailed measurements and specifications will be captured during takeoff
                </p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Property Name & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Property Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Summit Office Park"
                      autoFocus
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.companyId}
                      onChange={(e) => setFormData({ ...formData, companyId: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value={0}>Select company...</option>
                      <option value={1}>ABC Commercial Properties</option>
                      <option value={2}>XYZ Property Management</option>
                      <option value={3}>Summit Office Group</option>
                    </select>
                  </div>
                </div>

                {/* Address - Simplified */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        address: { ...formData.address, street: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Street address"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          address: { ...formData.address, city: e.target.value }
                        })}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={formData.address.state}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          address: { ...formData.address, state: e.target.value }
                        })}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="State"
                        maxLength={2}
                      />
                      <input
                        type="text"
                        value={formData.address.zipCode}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          address: { ...formData.address, zipCode: e.target.value }
                        })}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="ZIP"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value={PropertyType.Commercial}>Commercial</option>
                      <option value={PropertyType.Residential}>Multi-Family</option>
                      <option value={PropertyType.Industrial}>Industrial</option>
                      <option value={PropertyType.Mixed}>Retail</option>
                      <option value={PropertyType.Vacant}>Municipal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Primary Contact
                    </label>
                    <select
                      value={formData.primaryContactId}
                      onChange={(e) => setFormData({ ...formData, primaryContactId: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value={0}>Select contact...</option>
                      <option value={1}>John Smith - Property Manager</option>
                      <option value={2}>Sarah Johnson - Facilities</option>
                      <option value={3}>Mike Williams - Operations</option>
                    </select>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-sm text-slate-600 hover:text-slate-900 flex items-center"
                  >
                    {showAdvanced ? 'Hide' : 'Show'} additional options
                    <ArrowRight className={`h-4 w-4 ml-1 transform transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showAdvanced && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">
                        Additional fields like billing settings, service preferences, and access information 
                        can be configured later or during opportunity creation.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Opportunity Creation */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-500" />
                  Create Opportunity
                </h2>
              </div>
              
              <div className="p-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.createOpportunity}
                    onChange={(e) => setFormData({ ...formData, createOpportunity: e.target.checked })}
                    className="h-5 w-5 text-purple-600 rounded border-slate-300 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">
                      Start opportunity immediately after property creation
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Begin the sales process with customizable takeoff templates
                    </div>
                  </div>
                </label>
                
                {formData.createOpportunity && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Opportunity Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'new-contract', label: 'New Contract', icon: FileText },
                          { value: 'expansion', label: 'Expansion', icon: TrendingUp }
                        ].map(type => (
                          <label
                            key={type.value}
                            className={`
                              flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                              ${formData.opportunityType === type.value
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-slate-200 hover:border-slate-300'
                              }
                            `}
                          >
                            <input
                              type="radio"
                              value={type.value}
                              checked={formData.opportunityType === type.value}
                              onChange={(e) => setFormData({ ...formData, opportunityType: e.target.value })}
                              className="sr-only"
                            />
                            <type.icon className={`h-5 w-5 mr-3 ${
                              formData.opportunityType === type.value ? 'text-purple-600' : 'text-slate-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              formData.opportunityType === type.value ? 'text-slate-900' : 'text-slate-700'
                            }`}>
                              {type.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Takeoff Template
                      </label>
                      <select
                        value={formData.takeoffTemplateId}
                        onChange={(e) => setFormData({ ...formData, takeoffTemplateId: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value={0}>Choose template...</option>
                        {opportunityTemplates.map(template => (
                          <option key={template.id} value={template.id}>
                            {template.name} ({template.estimatedValue})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <AlertCircle className="h-4 w-4" />
                <span>All measurements will be captured during takeoff</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/properties')}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleQuickCreate}
                  className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 shadow-sm"
                >
                  {formData.createOpportunity ? 'Create & Start Opportunity' : 'Create Property'}
                  <ArrowRight className="inline h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-slate-400" />
                Time Savers
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Average setup time</span>
                  <span className="text-sm font-medium text-green-600">&lt; 1 minute</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Fields required</span>
                  <span className="text-sm font-medium">4 only</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Auto-filled from company</span>
                  <span className="text-sm font-medium">8 fields</span>
                </div>
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">Recently Created</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {recentProperties.map(property => (
                  <div key={property.id} className="px-6 py-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{property.name}</div>
                        <div className="text-xs text-slate-500">{property.company}</div>
                      </div>
                      <div className="text-xs text-slate-500">{property.created}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-slate-100">
                <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                  View all properties →
                </button>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Why Minimal Fields?
              </h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    Measurements captured during professional takeoff
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    Service details defined per opportunity
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    Faster property creation workflow
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    Flexible customization per project
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Quick Tips
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 font-medium">1.</span>
                  <p>Select company first to auto-populate contacts and settings</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 font-medium">2.</span>
                  <p>Use opportunity templates for consistent pricing</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 font-medium">3.</span>
                  <p>Detailed specs come later in the takeoff process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}