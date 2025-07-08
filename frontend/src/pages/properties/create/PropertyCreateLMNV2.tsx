import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enterpriseTokens, platformStyles } from '../../../styles/enterpriseTokens'
import { PropertyType, PropertyStatus } from '../../../modules/properties/types'
import { 
  Trees, Construction, Snowflake, Droplets, Flower, 
  Bug, TreePine, Camera, Calendar, Sun, Cloud, 
  CloudRain, Wind, Thermometer, ChevronRight, Check
} from 'lucide-react'

type StepType = 'service' | 'property' | 'location' | 'environment' | 'review'

interface ServiceConfig {
  maintenance: {
    frequency: string
    season: string
    crewSize: string
  }
  construction: {
    projectType: string
    timeline: string
  }
  snow: {
    trigger: string
    priority: string
    deicing: boolean
  }
  irrigation: {
    systemType: string
    zones: number
    schedule: string
  }
  enhancement: {
    seasonalColor: boolean
    annualRefresh: boolean
  }
}

export const PropertyCreateLMNV2: React.FC = () => {
  const navigate = useNavigate()
  const styles = platformStyles.lmn
  const [currentStep, setCurrentStep] = useState<StepType>('service')
  
  const [formData, setFormData] = useState({
    // Services (Step 1)
    services: {
      maintenance: false,
      construction: false,
      snow: false,
      irrigation: false,
      enhancement: false,
      pest: false,
      arbor: false
    },
    
    serviceConfig: {
      maintenance: {
        frequency: 'weekly',
        season: 'year-round',
        crewSize: '2-3'
      },
      construction: {
        projectType: '',
        timeline: ''
      },
      snow: {
        trigger: '2-inches',
        priority: 'standard',
        deicing: true
      },
      irrigation: {
        systemType: 'sprinkler',
        zones: 0,
        schedule: 'smart'
      },
      enhancement: {
        seasonalColor: true,
        annualRefresh: true
      }
    } as ServiceConfig,
    
    // Property Info (Step 2)
    name: '',
    propertyType: PropertyType.Commercial,
    status: PropertyStatus.Active,
    companyId: 0,
    
    // Location (Step 3)
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
    
    // Environment (Step 4)
    environment: {
      sunExposure: '',
      windExposure: '',
      elevation: '',
      soilType: '',
      drainageQuality: '',
      existingPlants: [] as string[],
      challenges: [] as string[]
    },
    
    // Photos
    photos: [] as File[]
  })

  const steps = [
    { key: 'service' as StepType, label: 'Services', icon: Trees },
    { key: 'property' as StepType, label: 'Property', icon: Construction },
    { key: 'location' as StepType, label: 'Location', icon: Snowflake },
    { key: 'environment' as StepType, label: 'Environment', icon: Sun },
    { key: 'review' as StepType, label: 'Review', icon: Check }
  ]

  const handleNext = () => {
    const stepIndex = steps.findIndex(s => s.key === currentStep)
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].key)
    }
  }

  const handlePrevious = () => {
    const stepIndex = steps.findIndex(s => s.key === currentStep)
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].key)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting:', formData)
    navigate('/properties')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'service':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                What services does this property need?
              </h2>
              <p className="text-gray-600">
                Select all services and we'll customize the form for your needs
              </p>
            </div>
            
            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'maintenance', label: 'Landscape Maintenance', icon: Trees, color: 'green', description: 'Regular mowing, trimming, and care' },
                { key: 'construction', label: 'Construction', icon: Construction, color: 'orange', description: 'New installations and renovations' },
                { key: 'snow', label: 'Snow Removal', icon: Snowflake, color: 'blue', description: 'Winter snow and ice management' },
                { key: 'irrigation', label: 'Irrigation', icon: Droplets, color: 'cyan', description: 'Sprinkler system management' },
                { key: 'enhancement', label: 'Enhancement', icon: Flower, color: 'pink', description: 'Seasonal color and improvements' },
                { key: 'pest', label: 'Pest Control', icon: Bug, color: 'red', description: 'Integrated pest management' },
                { key: 'arbor', label: 'Tree Care', icon: TreePine, color: 'green', description: 'Tree trimming and health' }
              ].map(service => {
                const Icon = service.icon
                const isSelected = formData.services[service.key as keyof typeof formData.services]
                
                return (
                  <label
                    key={service.key}
                    className={`
                      relative p-6 rounded-xl border-2 cursor-pointer transition-all
                      ${isSelected 
                        ? `border-${service.color}-500 bg-${service.color}-50 shadow-lg transform scale-[1.02]` 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => setFormData({
                        ...formData,
                        services: { ...formData.services, [service.key]: e.target.checked }
                      })}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                        isSelected ? `bg-${service.color}-100` : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-8 w-8 ${isSelected ? `text-${service.color}-600` : 'text-gray-400'}`} />
                      </div>
                      <h3 className={`font-semibold mb-1 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                        {service.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className={`absolute top-3 right-3 w-6 h-6 bg-${service.color}-500 rounded-full flex items-center justify-center`}>
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </label>
                )
              })}
            </div>
            
            {/* Service Configuration (shown when services are selected) */}
            {Object.entries(formData.services).some(([_, selected]) => selected) && (
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Quick Configuration</h3>
                
                {formData.services.maintenance && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-3">Maintenance Settings</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-green-700 mb-1">Frequency</label>
                        <select
                          value={formData.serviceConfig.maintenance.frequency}
                          onChange={(e) => setFormData({
                            ...formData,
                            serviceConfig: {
                              ...formData.serviceConfig,
                              maintenance: { ...formData.serviceConfig.maintenance, frequency: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-green-300 rounded-md text-sm"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="bi-weekly">Bi-Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-green-700 mb-1">Season</label>
                        <select
                          value={formData.serviceConfig.maintenance.season}
                          onChange={(e) => setFormData({
                            ...formData,
                            serviceConfig: {
                              ...formData.serviceConfig,
                              maintenance: { ...formData.serviceConfig.maintenance, season: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-green-300 rounded-md text-sm"
                        >
                          <option value="year-round">Year Round</option>
                          <option value="growing-season">Growing Season</option>
                          <option value="custom">Custom Schedule</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-green-700 mb-1">Crew Size</label>
                        <select
                          value={formData.serviceConfig.maintenance.crewSize}
                          onChange={(e) => setFormData({
                            ...formData,
                            serviceConfig: {
                              ...formData.serviceConfig,
                              maintenance: { ...formData.serviceConfig.maintenance, crewSize: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-green-300 rounded-md text-sm"
                        >
                          <option value="1-2">1-2 People</option>
                          <option value="2-3">2-3 People</option>
                          <option value="3-4">3-4 People</option>
                          <option value="4+">4+ People</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.services.snow && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-3">Snow Removal Settings</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-blue-700 mb-1">Trigger Depth</label>
                        <select
                          value={formData.serviceConfig.snow.trigger}
                          onChange={(e) => setFormData({
                            ...formData,
                            serviceConfig: {
                              ...formData.serviceConfig,
                              snow: { ...formData.serviceConfig.snow, trigger: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md text-sm"
                        >
                          <option value="zero-tolerance">Zero Tolerance</option>
                          <option value="1-inch">1 Inch</option>
                          <option value="2-inches">2 Inches</option>
                          <option value="3-inches">3 Inches</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-blue-700 mb-1">Priority</label>
                        <select
                          value={formData.serviceConfig.snow.priority}
                          onChange={(e) => setFormData({
                            ...formData,
                            serviceConfig: {
                              ...formData.serviceConfig,
                              snow: { ...formData.serviceConfig.snow, priority: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md text-sm"
                        >
                          <option value="high">High Priority</option>
                          <option value="standard">Standard</option>
                          <option value="low">Low Priority</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.serviceConfig.snow.deicing}
                            onChange={(e) => setFormData({
                              ...formData,
                              serviceConfig: {
                                ...formData.serviceConfig,
                                snow: { ...formData.serviceConfig.snow, deicing: e.target.checked }
                              }
                            })}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                          />
                          <span className="text-sm text-blue-700">Include De-icing</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
        
      case 'property':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Tell us about the property
              </h2>
              <p className="text-gray-600">
                Basic information to identify and categorize this location
              </p>
            </div>
            
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
                    <option value={PropertyType.Commercial}>Commercial Office</option>
                    <option value={PropertyType.Residential}>HOA/Residential</option>
                    <option value={PropertyType.Industrial}>Industrial</option>
                    <option value={PropertyType.Mixed}>Municipal</option>
                    <option value={PropertyType.Vacant}>Retail/Shopping</option>
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
                    <option value={2}>Greenwood Commercial LLC</option>
                    <option value={3}>Summit Office Properties</option>
                  </select>
                </div>
              </div>
              
              {/* Visual property type selector */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Property Characteristics
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'High Traffic', icon: '🚶' },
                    { label: 'Gated', icon: '🚪' },
                    { label: 'Multi-Building', icon: '🏢' },
                    { label: 'Waterfront', icon: '🌊' },
                    { label: 'Historic', icon: '🏛️' },
                    { label: 'LEED Certified', icon: '🌿' },
                    { label: '24/7 Access', icon: '🕐' },
                    { label: 'High Security', icon: '🔒' }
                  ].map(char => (
                    <label
                      key={char.label}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input type="checkbox" className="sr-only" />
                      <span className="text-2xl mr-2">{char.icon}</span>
                      <span className="text-sm">{char.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
        
      case 'location':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Where is the property located?
              </h2>
              <p className="text-gray-600">
                We'll use this to optimize routing and assign the right crews
              </p>
            </div>
            
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
                  <option value="north">North Region</option>
                  <option value="south">South Region</option>
                  <option value="east">East Region</option>
                  <option value="west">West Region</option>
                  <option value="central">Central</option>
                </select>
              </div>
              
              {/* Map placeholder */}
              <div className="mt-6 bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Snowflake className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Map view will appear here</p>
                  <button type="button" className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                    Drop pin on map
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        
      case 'environment':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Environmental Conditions
              </h2>
              <p className="text-gray-600">
                Help us plan the right approach for this property's unique conditions
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Sun Exposure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sun Exposure
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: 'full-sun', label: 'Full Sun', icon: Sun, description: '6+ hours' },
                    { value: 'partial-sun', label: 'Partial Sun', icon: Cloud, description: '3-6 hours' },
                    { value: 'partial-shade', label: 'Partial Shade', icon: CloudRain, description: '1-3 hours' },
                    { value: 'full-shade', label: 'Full Shade', icon: Cloud, description: '<1 hour' }
                  ].map(option => (
                    <label
                      key={option.value}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer text-center transition-all
                        ${formData.environment.sunExposure === option.value
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={formData.environment.sunExposure === option.value}
                        onChange={(e) => setFormData({
                          ...formData,
                          environment: { ...formData.environment, sunExposure: e.target.value }
                        })}
                        className="sr-only"
                      />
                      <option.icon className={`h-8 w-8 mx-auto mb-2 ${
                        formData.environment.sunExposure === option.value
                          ? 'text-yellow-600'
                          : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Wind Exposure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Wind Exposure
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'sheltered', label: 'Sheltered', description: 'Protected by buildings/trees' },
                    { value: 'moderate', label: 'Moderate', description: 'Some wind protection' },
                    { value: 'exposed', label: 'Exposed', description: 'Open to prevailing winds' }
                  ].map(option => (
                    <label
                      key={option.value}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${formData.environment.windExposure === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={formData.environment.windExposure === option.value}
                        onChange={(e) => setFormData({
                          ...formData,
                          environment: { ...formData.environment, windExposure: e.target.value }
                        })}
                        className="sr-only"
                      />
                      <Wind className={`h-6 w-6 mb-2 ${
                        formData.environment.windExposure === option.value
                          ? 'text-blue-600'
                          : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Challenges */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Site Challenges (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Steep slopes',
                    'Poor drainage',
                    'Salt exposure',
                    'Heavy foot traffic',
                    'Pet areas',
                    'Parking lot runoff',
                    'Reflected heat',
                    'Limited access'
                  ].map(challenge => (
                    <label
                      key={challenge}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.environment.challenges.includes(challenge)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              environment: {
                                ...formData.environment,
                                challenges: [...formData.environment.challenges, challenge]
                              }
                            })
                          } else {
                            setFormData({
                              ...formData,
                              environment: {
                                ...formData.environment,
                                challenges: formData.environment.challenges.filter(c => c !== challenge)
                              }
                            })
                          }
                        }}
                        className="h-4 w-4 text-green-600 rounded border-gray-300 mr-3"
                      />
                      <span className="text-sm">{challenge}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Property Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drop photos here or click to upload
                  </p>
                  <p className="text-xs text-gray-500">
                    Photos help crews identify the property and understand site conditions
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFormData({
                          ...formData,
                          photos: [...formData.photos, ...Array.from(e.target.files)]
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )
        
      case 'review':
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Review Property Details
              </h2>
              <p className="text-gray-600">
                Confirm everything looks correct before creating the property
              </p>
            </div>
            
            {/* Summary Cards */}
            <div className="space-y-4">
              <div className={styles.form.section}>
                <h3 className="font-medium text-gray-900 mb-3">Property Information</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Name</dt>
                    <dd className="font-medium">{formData.name || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Type</dt>
                    <dd className="font-medium">{formData.propertyType}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Address</dt>
                    <dd className="font-medium">
                      {formData.address.street}, {formData.address.city}, {formData.address.state} {formData.address.zipCode}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Service Zone</dt>
                    <dd className="font-medium">{formData.serviceZone || 'Not assigned'}</dd>
                  </div>
                </dl>
              </div>
              
              <div className={styles.form.section}>
                <h3 className="font-medium text-gray-900 mb-3">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(formData.services)
                    .filter(([_, enabled]) => enabled)
                    .map(([service, _]) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {service.charAt(0).toUpperCase() + service.slice(1)}
                      </span>
                    ))
                  }
                </div>
              </div>
              
              <div className={styles.form.section}>
                <h3 className="font-medium text-gray-900 mb-3">Environmental Conditions</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Sun Exposure</dt>
                    <dd className="font-medium">
                      {formData.environment.sunExposure?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Wind Exposure</dt>
                    <dd className="font-medium">
                      {formData.environment.windExposure?.charAt(0).toUpperCase() + formData.environment.windExposure?.slice(1) || 'Not specified'}
                    </dd>
                  </div>
                </dl>
                {formData.environment.challenges.length > 0 && (
                  <div className="mt-3">
                    <dt className="text-sm text-gray-500 mb-1">Site Challenges</dt>
                    <dd className="flex flex-wrap gap-1">
                      {formData.environment.challenges.map(challenge => (
                        <span key={challenge} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                          {challenge}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </div>
              
              {/* Call to Action */}
              <div className="mt-8 p-6 bg-green-50 rounded-lg text-center">
                <Check className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ready to create this property?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  You can always edit these details later or add more information like photos and specific measurements.
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back to Edit
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Create Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">New Property Setup</h1>
                <p className="text-sm text-gray-600">Service-focused property configuration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.key === currentStep
              const isCompleted = steps.findIndex(s => s.key === currentStep) > index
              
              return (
                <React.Fragment key={step.key}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.key)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-green-100 text-green-700' 
                        : isCompleted
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isActive 
                        ? 'bg-green-600 text-white' 
                        : isCompleted
                        ? 'bg-green-200 text-green-700'
                        : 'bg-gray-200 text-gray-500'
                      }
                    `}>
                      {isCompleted && !isActive ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className="font-medium">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-gray-300" />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="max-w-screen-xl mx-auto p-4 py-8">
        {renderStepContent()}
        
        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 'service'}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg
              ${currentStep === 'service'
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            Previous
          </button>
          
          {currentStep !== 'review' && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Next Step
            </button>
          )}
        </div>
      </form>
    </div>
  )
}