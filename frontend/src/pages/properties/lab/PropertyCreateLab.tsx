import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Monitor, Smartphone, Tablet, Grid, List, 
  ChevronLeft, ChevronRight, Maximize2, X,
  Eye, EyeOff, Settings, Download, Share2,
  Palette, Layout, Zap, Map, Workflow, Building,
  BarChart
} from 'lucide-react'
import { PropertyCreateServiceTitanV1 } from '../create/PropertyCreateServiceTitanV1'
import { PropertyCreateServiceTitanV2 } from '../create/PropertyCreateServiceTitanV2'
import { PropertyCreateLMNV1 } from '../create/PropertyCreateLMNV1'
import { PropertyCreateLMNV2 } from '../create/PropertyCreateLMNV2'
import { ComparisonSummary } from './ComparisonSummary'

type ViewMode = 'single' | 'split' | 'grid'
type DeviceMode = 'desktop' | 'tablet' | 'mobile'
type VariantKey = 'servicetitan-v1' | 'servicetitan-v2' | 'lmn-v1' | 'lmn-v2' | 'aspire-v1' | 'aspire-v2'

interface Variant {
  key: VariantKey
  name: string
  platform: string
  version: string
  description: string
  icon: React.ElementType
  color: string
  component: React.ComponentType
  characteristics: string[]
}

export const PropertyCreateLab: React.FC = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [selectedVariants, setSelectedVariants] = useState<VariantKey[]>(['servicetitan-v1', 'lmn-v1'])
  const [showControls, setShowControls] = useState(true)
  const [fullscreenVariant, setFullscreenVariant] = useState<VariantKey | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  const variants: Variant[] = [
    {
      key: 'servicetitan-v1',
      name: 'ServiceTitan V1',
      platform: 'ServiceTitan',
      version: 'Maximum Density',
      description: 'Ultra-dense 3-column layout with everything on one screen',
      icon: Grid,
      color: 'blue',
      component: PropertyCreateServiceTitanV1,
      characteristics: ['3-column grid', 'Minimal spacing', 'Quick actions', 'Single page']
    },
    {
      key: 'servicetitan-v2',
      name: 'ServiceTitan V2',
      platform: 'ServiceTitan',
      version: 'Tabbed Sections',
      description: 'Organized tabs with keyboard shortcuts for efficient navigation',
      icon: Layout,
      color: 'blue',
      component: PropertyCreateServiceTitanV2,
      characteristics: ['Horizontal tabs', 'Keyboard shortcuts', 'Organized sections', 'Compact design']
    },
    {
      key: 'lmn-v1',
      name: 'LMN V1',
      platform: 'LMN',
      version: 'Map-First Visual',
      description: 'Split screen with interactive map and visual elements',
      icon: Map,
      color: 'green',
      component: PropertyCreateLMNV1,
      characteristics: ['Map integration', 'Visual design', 'GPS features', 'Service zones']
    },
    {
      key: 'lmn-v2',
      name: 'LMN V2',
      platform: 'LMN',
      version: 'Service Workflow',
      description: 'Step-by-step wizard focusing on services and environment',
      icon: Workflow,
      color: 'green',
      component: PropertyCreateLMNV2,
      characteristics: ['Service-first', 'Step wizard', 'Environmental focus', 'Visual selectors']
    },
    {
      key: 'aspire-v1',
      name: 'Aspire V1',
      platform: 'Aspire',
      version: 'Coming Soon',
      description: 'Commercial hierarchy focus with company-first approach',
      icon: Building,
      color: 'purple',
      component: ComingSoon,
      characteristics: ['Company hierarchy', 'Professional', 'Contract ready', 'B2B focus']
    },
    {
      key: 'aspire-v2',
      name: 'Aspire V2',
      platform: 'Aspire',
      version: 'Coming Soon',
      description: 'Streamlined for opportunity creation with minimal fields',
      icon: Zap,
      color: 'purple',
      component: ComingSoon,
      characteristics: ['Opportunity ready', 'Minimal fields', 'Takeoff integration', 'Quick create']
    }
  ]

  const getDeviceClasses = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
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
          <Component />
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
        <Component />
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
                <h1 className="text-xl font-semibold text-gray-900">Property Create UI Lab</h1>
                <p className="text-sm text-gray-500">Compare and test different UI approaches</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
              
              {/* Comparison Toggle */}
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`p-2 rounded-lg transition-colors ${
                  showComparison ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Show comparison matrix"
              >
                <BarChart className="h-5 w-5" />
              </button>
              
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

      {/* Comparison Matrix */}
      {showComparison && (
        <div className="p-4">
          <ComparisonSummary />
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

// Placeholder component for variants not yet implemented
const ComingSoon: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
        <Building className="h-8 w-8 text-purple-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
      <p className="text-gray-600 max-w-md">
        This variant is currently under development. Check back soon to see the Aspire-inspired 
        commercial hierarchy approach.
      </p>
    </div>
  </div>
)