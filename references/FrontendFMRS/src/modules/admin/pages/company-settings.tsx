import { useState, useEffect } from 'react'
import { Building2, Image, Mail, FileText, Shield, Palette } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from 'sonner'
import { useCompanySettings, useUpdateCompanySettings, useUploadLogo, type CompanySettings } from '@/hooks/api/useCompanySettings'

const tabs = [
  {
    id: 'general',
    label: 'General',
    icon: Building2,
  },
  {
    id: 'branding',
    label: 'Branding',
    icon: Palette,
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: Mail,
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
  },
]

const CompanySettings = () => {
  const [activeTab, setActiveTab] = useState('general')
  
  // API hooks
  const { data: companySettingsResponse, isLoading: isLoadingSettings, error } = useCompanySettings()
  const updateCompanyMutation = useUpdateCompanySettings()
  const uploadLogoMutation = useUploadLogo()
  
  // Local state for form data
  const [companyData, setCompanyData] = useState<CompanySettings>({
    name: '',
    phone: '',
    email: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
    },
    primaryColor: '#10b981',
    supportEmail: '',
    notificationEmail: '',
    sessionTimeoutMinutes: 480,
    passwordMinLength: 8,
    requireTwoFactor: false,
  })

  // Update local state when API data loads
  useEffect(() => {
    if (companySettingsResponse?.success && companySettingsResponse.data) {
      console.log('Company settings loaded:', companySettingsResponse.data)
      setCompanyData(companySettingsResponse.data)
    }
  }, [companySettingsResponse])

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error('Failed to load company settings')
    }
  }, [error])

  const handleSave = async () => {
    try {
      await updateCompanyMutation.mutateAsync(companyData)
      toast.success('Company settings saved successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to save settings. Please try again.')
    }
  }

  const handleLogoUpload = async (file: File, logoType: string) => {
    try {
      const result = await uploadLogoMutation.mutateAsync({ file, logoType })
      console.log('Logo upload result:', result)
      toast.success('Logo uploaded successfully!')
    } catch (error: any) {
      console.error('Logo upload error:', error)
      // Check for validation errors
      if (error.errors) {
        const errorMessages = Object.values(error.errors).flat().join(', ')
        toast.error(`Upload failed: ${errorMessages}`)
      } else {
        toast.error(error.message || 'Failed to upload logo. Please try again.')
      }
    }
  }

  const isLoading = isLoadingSettings || updateCompanyMutation.isPending || uploadLogoMutation.isPending

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab companyData={companyData} setCompanyData={setCompanyData} />
      case 'branding':
        return <BrandingTab companyData={companyData} setCompanyData={setCompanyData} onLogoUpload={handleLogoUpload} />
      case 'communication':
        return <CommunicationTab companyData={companyData} setCompanyData={setCompanyData} />
      case 'documents':
        return <DocumentsTab />
      case 'security':
        return <SecurityTab companyData={companyData} setCompanyData={setCompanyData} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Company Settings</h2>
        <p className="text-slate-600 mt-1">
          Manage your organization's information, branding, and system-wide preferences
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Company settings tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${isActive
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Save Button */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 rounded-b-lg">
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// General Information Tab
const GeneralTab = ({ companyData, setCompanyData }: any) => {
  const updateField = (field: string, value: any) => {
    setCompanyData((prev: any) => ({ ...prev, [field]: value }))
  }

  const updateAddressField = (field: string, value: string) => {
    setCompanyData((prev: any) => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Company Information</h3>
        <p className="text-sm text-slate-600">
          Basic information about your organization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Company Name
          </label>
          <Input
            value={companyData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            value={companyData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <Input
            type="email"
            value={companyData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="info@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Website
          </label>
          <Input
            type="url"
            value={companyData.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="https://company.com"
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-slate-900 mb-4">Business Address</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Street Address
            </label>
            <Input
              value={companyData.address?.street || ''}
              onChange={(e) => updateAddressField('street', e.target.value)}
              placeholder="123 Business St"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                City
              </label>
              <Input
                value={companyData.address?.city || ''}
                onChange={(e) => updateAddressField('city', e.target.value)}
                placeholder="City"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                State
              </label>
              <Input
                value={companyData.address?.state || ''}
                onChange={(e) => updateAddressField('state', e.target.value)}
                placeholder="State"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                ZIP Code
              </label>
              <Input
                value={companyData.address?.zip || ''}
                onChange={(e) => updateAddressField('zip', e.target.value)}
                placeholder="12345"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Country
              </label>
              <Input
                value={companyData.address?.country || ''}
                onChange={(e) => updateAddressField('country', e.target.value)}
                placeholder="United States"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Branding Tab
const BrandingTab = ({ companyData, setCompanyData, onLogoUpload }: any) => {
  const handleFileUpload = (logoType: string) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        onLogoUpload(file, logoType)
      }
    }
    input.click()
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Brand Assets</h3>
        <p className="text-sm text-slate-600">
          Manage your company's visual identity and branding elements.
        </p>
      </div>

      {/* Logo Management */}
      <div className="space-y-4">
        <div>
          <h4 className="text-md font-medium text-slate-900">Company Logos</h4>
          <p className="text-sm text-slate-600 mt-1">Recommended size: 200x60px for best results. Supports PNG, JPG, GIF, and SVG formats.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Logo */}
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center mb-3 px-4">
              <img 
                src={companyData.primaryLogoPath ? `${import.meta.env.VITE_API_BASE_URL}${companyData.primaryLogoPath}` : "/puregreen-logo.png"} 
                alt="Primary Logo" 
                className="max-h-24 max-w-full object-contain"
                onError={(e) => { e.currentTarget.src = "/puregreen-logo.png" }}
              />
            </div>
            <h5 className="font-medium text-slate-900 mb-1">Primary Logo</h5>
            <p className="text-xs text-slate-500 mb-3">Used in navigation and headers</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => handleFileUpload('primary')}>
              Upload New
            </Button>
          </div>

          {/* Login Logo */}
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center mb-3 px-4">
              <img 
                src={companyData.loginLogoPath ? `${import.meta.env.VITE_API_BASE_URL}${companyData.loginLogoPath}` : "/puregreen-logo.png"} 
                alt="Login Logo" 
                className="max-h-24 max-w-full object-contain"
                onError={(e) => { e.currentTarget.src = "/puregreen-logo.png" }}
              />
            </div>
            <h5 className="font-medium text-slate-900 mb-1">Login Page Logo</h5>
            <p className="text-xs text-slate-500 mb-3">Displayed on authentication pages</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => handleFileUpload('login')}>
              Upload New
            </Button>
          </div>

          {/* Document Logo */}
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center mb-3 px-4">
              <img 
                src={companyData.documentLogoPath ? `${import.meta.env.VITE_API_BASE_URL}${companyData.documentLogoPath}` : "/puregreen-logo.png"} 
                alt="Document Logo" 
                className="max-h-24 max-w-full object-contain"
                onError={(e) => { e.currentTarget.src = "/puregreen-logo.png" }}
              />
            </div>
            <h5 className="font-medium text-slate-900 mb-1">Document Logo</h5>
            <p className="text-xs text-slate-500 mb-3">Used in PDFs and reports</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => handleFileUpload('document')}>
              Upload New
            </Button>
          </div>
        </div>
      </div>

      {/* Color Scheme */}
      <div>
        <h4 className="text-md font-medium text-slate-900 mb-4">Color Scheme</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={companyData.primaryColor}
                onChange={(e) => setCompanyData((prev: any) => ({ ...prev, primaryColor: e.target.value }))}
                className="w-12 h-10 border border-slate-200 rounded cursor-pointer"
              />
              <Input
                value={companyData.primaryColor}
                onChange={(e) => setCompanyData((prev: any) => ({ ...prev, primaryColor: e.target.value }))}
                placeholder="#10b981"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Used for buttons, links, and accents throughout the platform
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Communication Tab
const CommunicationTab = ({ companyData, setCompanyData }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Email Settings</h3>
        <p className="text-sm text-slate-600">
          Configure email addresses used for system communications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Support Email
          </label>
          <Input
            type="email"
            value={companyData.supportEmail}
            onChange={(e) => setCompanyData((prev: any) => ({ ...prev, supportEmail: e.target.value }))}
            placeholder="support@company.com"
          />
          <p className="text-xs text-slate-500 mt-1">
            Users will see this for support inquiries
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            System Notifications From
          </label>
          <Input
            type="email"
            value={companyData.notificationEmail}
            onChange={(e) => setCompanyData((prev: any) => ({ ...prev, notificationEmail: e.target.value }))}
            placeholder="notifications@company.com"
          />
          <p className="text-xs text-slate-500 mt-1">
            System emails will be sent from this address
          </p>
        </div>
      </div>
    </div>
  )
}

// Documents Tab (Scaffolded)
const DocumentsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Document Templates</h3>
        <p className="text-sm text-slate-600">
          Customize templates for reports and system-generated documents.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
        <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h4 className="text-lg font-medium text-slate-900 mb-2">PDF Templates</h4>
        <p className="text-slate-600 mb-4">
          Customize headers, footers, and styling for system-generated PDFs.
        </p>
        <Button variant="outline" disabled>
          Configure Templates
        </Button>
      </div>
    </div>
  )
}

// Security Tab
const SecurityTab = ({ companyData, setCompanyData }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Security Policies</h3>
        <p className="text-sm text-slate-600">
          Configure system-wide security settings and user policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Session Timeout (minutes)
          </label>
          <Input
            type="number"
            value={companyData.sessionTimeout}
            onChange={(e) => setCompanyData((prev: any) => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
            placeholder="480"
            min="30"
            max="1440"
          />
          <p className="text-xs text-slate-500 mt-1">
            How long users can stay logged in without activity
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Minimum Password Length
          </label>
          <Input
            type="number"
            value={companyData.passwordMinLength}
            onChange={(e) => setCompanyData((prev: any) => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
            placeholder="8"
            min="6"
            max="50"
          />
          <p className="text-xs text-slate-500 mt-1">
            Minimum characters required for user passwords
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
          <div>
            <h4 className="font-medium text-slate-900">Require Two-Factor Authentication</h4>
            <p className="text-sm text-slate-600">Force all users to enable 2FA for enhanced security</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={companyData.requireTwoFactor}
              onChange={(e) => setCompanyData((prev: any) => ({ ...prev, requireTwoFactor: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default CompanySettings 