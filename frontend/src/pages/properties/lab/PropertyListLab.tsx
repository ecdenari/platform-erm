import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Monitor, Smartphone, Tablet, Grid, List, 
  ChevronLeft, ChevronRight, Maximize2, X,
  Eye, EyeOff, Settings, Download, Share2,
  Palette, Layout, Zap, Map, Workflow, Building,
  BarChart, Database, Table2, MapPinned, Target
} from 'lucide-react'
import { 
  PropertyListServiceTitan,
  PropertyListServiceTitanV2,
  PropertyListAspireServiceTitan,
  PropertyListAspireServiceTitanV2,
  PropertyListAspireV1,
  PropertyListAspireV2
} from '../../../modules/properties/components/PropertyList'
import { Property, PropertyStatus, PropertyType } from '../../../modules/properties/types'

type ViewMode = 'single' | 'split' | 'grid'
type DeviceMode = 'desktop' | 'tablet' | 'mobile'
type VariantKey = 'servicetitan-v1' | 'servicetitan-v2' | 'aspire-st-v1' | 'aspire-st-v2' | 'aspire-v1' | 'aspire-v2'

interface Variant {
  key: VariantKey
  name: string
  platform: string
  version: string
  description: string
  icon: React.ElementType
  color: string
  component: React.ComponentType<any>
  characteristics: string[]
}

export const PropertyListLab: React.FC = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [selectedVariants, setSelectedVariants] = useState<VariantKey[]>(['servicetitan-v1', 'aspire-st-v1'])
  const [showControls, setShowControls] = useState(true)
  const [fullscreenVariant, setFullscreenVariant] = useState<VariantKey | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [propertyCount, setPropertyCount] = useState(25)

  // Generate mock properties
  const mockProperties: Property[] = Array.from({ length: propertyCount }, (_, i) => ({
    id: i + 1,
    name: [
      'Summit Office Park',
      'Greenwood Plaza',
      'Downtown Tower',
      'Riverside Business Center',
      'Tech Hub Campus',
      'Medical Plaza',
      'Industrial Complex A',
      'Retail Shopping Center',
      'Municipal Building',
      'University Commons'
    ][i % 10] + (i >= 10 ? ` ${Math.floor(i / 10) + 1}` : ''),
    companyName: [
      'ABC Commercial Properties',
      'XYZ Property Management',
      'Summit Office Group',
      'Elite Properties LLC',
      'Metro Real Estate'
    ][i % 5],
    address: {
      street: `${1000 + i * 100} ${['Main', 'Oak', 'Elm', 'Park', 'First'][i % 5]} Street`,
      city: ['Denver', 'Boulder', 'Aurora', 'Lakewood', 'Westminster'][i % 5],
      state: 'CO',
      zipCode: `${80200 + (i % 100)}`.padStart(5, '0')
    },
    propertyType: [
      PropertyType.Commercial,
      PropertyType.Residential,
      PropertyType.Industrial,
      PropertyType.Mixed,
      PropertyType.Vacant
    ][i % 5],
    status: [
      PropertyStatus.Active,
      PropertyStatus.Active,
      PropertyStatus.Active,
      PropertyStatus.Inactive,
      PropertyStatus.Pending
    ][i % 5],
    squareFootage: (Math.floor(Math.random() * 50) + 10) * 1000,
    acreageSize: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
    primaryContactId: Math.floor(Math.random() * 10) + 1,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))

  const variants: Variant[] = [
    {
      key: 'servicetitan-v1',
      name: 'ServiceTitan V1',
      platform: 'ServiceTitan',
      version: 'Classic Dense Table',
      description: 'Ultra-dense table with maximum information per row',
      icon: Table2,
      color: 'blue',
      component: PropertyListServiceTitan,
      characteristics: ['Dense table', 'Compact rows', 'Hover actions', 'Professional']
    },
    {
      key: 'servicetitan-v2',
      name: 'ServiceTitan V2',
      platform: 'ServiceTitan',
      version: 'Enhanced Table',
      description: 'Expandable rows with inline financial metrics',
      icon: Database,
      color: 'blue',
      component: PropertyListServiceTitanV2,
      characteristics: ['Expandable rows', 'Financial focus', 'Bulk operations', 'Quick stats']
    },
    {
      key: 'aspire-st-v1',
      name: 'Aspire/ServiceTitan V1',
      platform: 'Combined',
      version: 'Dense Table + Aspire UI',
      description: 'ServiceTitan density with Aspire green accents and toolbar',
      icon: Grid,
      color: 'green',
      component: PropertyListAspireServiceTitan,
      characteristics: ['Aspire toolbar', 'Dense table', 'Green accents', 'Search & filters']
    },
    {
      key: 'aspire-st-v2',
      name: 'Aspire/ServiceTitan V2',
      platform: 'Combined',
      version: 'Enhanced Expandable',
      description: 'Expandable rows with financial metrics and Aspire styling',
      icon: Database,
      color: 'green',
      component: PropertyListAspireServiceTitanV2,
      characteristics: ['Expandable rows', 'Filter pills', 'Financial data', 'Management info']
    },
    {
      key: 'aspire-v1',
      name: 'Aspire V1',
      platform: 'Aspire',
      version: 'Company Hierarchy',
      description: 'Company-grouped view with commercial focus',
      icon: Building,
      color: 'purple',
      component: PropertyListAspireV1,
      characteristics: ['Company groups', 'Financial summary', 'Contract focus', 'Professional']
    },
    {
      key: 'aspire-v2',
      name: 'Aspire V2',
      platform: 'Aspire',
      version: 'Opportunity Pipeline',
      description: 'Opportunity-focused cards with quick actions',
      icon: Target,
      color: 'purple',
      component: PropertyListAspireV2,
      characteristics: ['Opportunity metrics', 'Quick actions', 'Renewal tracking', 'Modern cards']
    }
  ]

  const getDeviceClasses = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-3xl mx-auto'
      default:
        return 'w-full'
    }
  }

  const handleVariantToggle = (variantKey: VariantKey) => {
    if (viewMode === 'single') {
      setSelectedVariants([variantKey])
    } else {
      if (selectedVariants.includes(variantKey)) {
        setSelectedVariants(selectedVariants.filter(v => v !== variantKey))
      } else {
        if (viewMode === 'split' && selectedVariants.length >= 2) {
          setSelectedVariants([selectedVariants[1], variantKey])
        } else if (viewMode === 'grid' && selectedVariants.length >= 4) {
          setSelectedVariants([...selectedVariants.slice(1), variantKey])
        } else {
          setSelectedVariants([...selectedVariants, variantKey])
        }
      }
    }
  }

  const renderVariant = (variant: Variant) => {
    const Component = variant.component
    return (
      <div className="relative h-full">
        {/* Variant Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white bg-opacity-95 border-b">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-1.5 bg-${variant.color}-100 rounded`}>
                <variant.icon className={`h-4 w-4 text-${variant.color}-600`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{variant.name}</h3>
                <p className="text-xs text-gray-500">{variant.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFullscreenVariant(variant.key)}
                className="p-1 text-gray-400 hover:text-gray-600"
                title="Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Component Content */}
        <div className="pt-16 h-full overflow-auto">
          <Component 
            properties={mockProperties}
            loading={false}
            onPropertyClick={(property) => console.log('Property clicked:', property)}
            onEdit={(property) => console.log('Edit property:', property)}
            onDelete={(property) => console.log('Delete property:', property)}
          />
        </div>
      </div>
    )
  }

  // Fullscreen modal
  if (fullscreenVariant) {
    const variant = variants.find(v => v.key === fullscreenVariant)!
    const Component = variant.component
    
    return (
      <div className="fixed inset-0 bg-white z-50">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setFullscreenVariant(null)}
            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 h-full overflow-auto">
          <Component 
            properties={mockProperties}
            loading={false}
            onPropertyClick={(property) => console.log('Property clicked:', property)}
            onEdit={(property) => console.log('Edit property:', property)}
            onDelete={(property) => console.log('Delete property:', property)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/properties')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Property List UI Lab</h1>
                <p className="text-sm text-gray-500">Compare different list and table approaches</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Property Count Control */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Properties:</label>
                <select
                  value={propertyCount}
                  onChange={(e) => setPropertyCount(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('single')}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    viewMode === 'single' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    viewMode === 'split' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Split
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Grid
                </button>
              </div>
              
              {/* Device Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-1.5 rounded transition-colors ${
                    deviceMode === 'desktop' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                  title="Desktop"
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('tablet')}
                  className={`p-1.5 rounded transition-colors ${
                    deviceMode === 'tablet' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                  title="Tablet"
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-1.5 rounded transition-colors ${
                    deviceMode === 'mobile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                  title="Mobile"
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>
              
              {/* Controls Toggle */}
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 text-gray-600 hover:text-gray-900"
                title={showControls ? 'Hide controls' : 'Show controls'}
              >
                {showControls ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      {showControls && (
        <div className="bg-white border-b">
          <div className="px-4 py-4">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Select Variants to Compare</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {variants.map(variant => (
                <button
                  key={variant.key}
                  onClick={() => handleVariantToggle(variant.key)}
                  className={`
                    p-3 rounded-lg border-2 transition-all text-left
                    ${selectedVariants.includes(variant.key)
                      ? `border-${variant.color}-500 bg-${variant.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <variant.icon className={`h-4 w-4 ${
                      selectedVariants.includes(variant.key) 
                        ? `text-${variant.color}-600` 
                        : 'text-gray-400'
                    }`} />
                    <span className="text-xs font-medium text-gray-900">
                      {variant.platform}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">{variant.version}</div>
                </button>
              ))}
            </div>
            
            {/* Variant Details */}
            {selectedVariants.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-xs font-medium text-gray-700 mb-2">Selected Variants</h3>
                <div className="space-y-2">
                  {selectedVariants.map(key => {
                    const variant = variants.find(v => v.key === key)!
                    return (
                      <div key={key} className="flex items-start space-x-3">
                        <div className={`p-1 bg-${variant.color}-100 rounded`}>
                          <variant.icon className={`h-3 w-3 text-${variant.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900">{variant.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {variant.characteristics.join(' • ')}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comparison View */}
      <div className="p-4">
        <div className={getDeviceClasses()}>
          {selectedVariants.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Grid className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Variants Selected</h3>
              <p className="text-sm text-gray-600">
                Select one or more variants from the controls above to start comparing
              </p>
            </div>
          ) : (
            <div className={`
              ${viewMode === 'single' ? 'grid grid-cols-1' : ''}
              ${viewMode === 'split' ? 'grid grid-cols-1 lg:grid-cols-2' : ''}
              ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2' : ''}
              gap-4
            `}>
              {selectedVariants.map(key => {
                const variant = variants.find(v => v.key === key)!
                return (
                  <div 
                    key={key} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    style={{ height: viewMode === 'grid' ? '600px' : '800px' }}
                  >
                    {renderVariant(variant)}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-2">
        <button
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50"
          title="Export comparison"
        >
          <Download className="h-5 w-5 text-gray-600" />
        </button>
        <button
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50"
          title="Share comparison"
        >
          <Share2 className="h-5 w-5 text-gray-600" />
        </button>
        <button
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50"
          title="Lab settings"
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}