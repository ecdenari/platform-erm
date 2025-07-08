import { Outlet, useParams, Link, useLocation } from 'react-router-dom'
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { usePropertiesWithReports, useCreateSiteReport } from "@/hooks/api/useSiteManagement"
import { User, Briefcase, Phone, Mail, Building2, FileText, TrendingUp, Clock, Calendar, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { ReportTypeModal } from '@/components/ui/ReportTypeModal'

export default function PropertyDetailLayout() {
  const { id } = useParams<{ id: string }>()
  const { data: properties, isLoading } = usePropertiesWithReports()
  const createSiteReportMutation = useCreateSiteReport()
  const [showReportModal, setShowReportModal] = useState(false)
  
  // Handle loading state and find property safely
  const property = properties?.find(p => {
    const propId = p.propertyID || p.id
    return propId && propId.toString() === id
  })

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div>
        <Card className="mb-4">
          <div className="p-6">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </Card>
        <div className="text-center py-8">
          <p className="text-slate-500">Loading property details...</p>
        </div>
      </div>
    )
  }

  // Show not found if property doesn't exist after loading
  if (!property) {
    return (
      <div>
        <Card className="mb-4">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900">Property Not Found</h1>
            <p className="text-sm text-slate-600 mt-1">The requested property could not be found.</p>
            <Link to="/site-management/properties">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">Back to Properties</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Construction': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'Maintenance': return 'text-green-600 bg-green-50 border-green-200'
      case 'Past Customer': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const handleCreateReport = () => {
    setShowReportModal(true)
  }

  const handleReportTypeSelected = (type: 'site' | 'customer' | 'turnover') => {
    setShowReportModal(false)
    
    switch (type) {
      case 'site':
        const reportData = {
          propertyID: property.propertyID || property.id,
          title: `Site Report - ${property.propertyName}`,
          description: `Quality audit for ${property.propertyName}`,
          reportDate: new Date().toISOString(),
          notes: '',
        }

        createSiteReportMutation.mutate(reportData, {
          onSuccess: () => {
            alert(`Site report created for ${property.propertyName}`)
          },
          onError: (error) => {
            console.error('Failed to create report:', error)
            alert('Failed to create report')
          }
        })
        break
        
      case 'customer':
        alert(`Customer report creation for ${property.propertyName} - Coming soon!`)
        break
        
      case 'turnover':
        alert(`Turnover report creation for ${property.propertyName} - Coming soon!`)
        break
    }
  }

  return (
    <div>
      {/* Modern Enterprise Property Card */}
      <Card className="mb-4 shadow-sm border-slate-200">
        {/* Header Section */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 mb-1">{property.propertyName}</h1>
              <p className="text-sm text-slate-600">{property.address}</p>
            </div>
            <div>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleCreateReport}
                disabled={createSiteReportMutation.isPending}
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Report
              </Button>
            </div>
          </div>

          {/* Organized Contact Information Grid */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
              {/* Column 1: Property Type & Branch */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-slate-600 text-xs">Property Type</p>
                    <p className="font-medium text-slate-900">{property.propertyType || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-slate-600 text-xs">Branch</p>
                    <p className="font-medium text-slate-900">{property.branchName || 'Not assigned'}</p>
                  </div>
                </div>
              </div>
              
              {/* Column 2: Account Manager & Field Manager */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-slate-600 text-xs">Account Manager</p>
                    <p className="font-medium text-slate-900">{property.accountOwnerContactName || 'Not assigned'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-slate-600 text-xs">Field Manager</p>
                    <p className="font-medium text-slate-900">{property.productionManagerContactName || 'Not assigned'}</p>
                  </div>
                </div>
              </div>
              
              {/* Column 3: Primary Contact */}
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-slate-600 text-xs">Primary Contact</p>
                  <p className="font-medium text-slate-900">John Smith</p>
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Mail className="w-3 h-3" />
                      <span className="text-xs">john.smith@example.com</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Phone className="w-3 h-3" />
                      <span className="text-xs">(555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slim Metrics Bar */}
        <div className="bg-slate-50 border-t px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Overall Score:</span>
                <span className={`font-semibold ${
                  !property.overallScore ? 'text-slate-400' :
                  property.overallScore >= 90 ? 'text-green-600' :
                  property.overallScore >= 80 ? 'text-blue-600' :
                  property.overallScore >= 70 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {property.overallScore ? `${property.overallScore}%` : 'N/A'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Total Reports:</span>
                <span className="font-semibold text-slate-900">{property.totalReports || 0}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Completed:</span>
                <span className="font-semibold text-green-600">{property.completedReports || 0}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Drafts:</span>
                <span className="font-semibold text-yellow-600">{property.draftReports || 0}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Last Report:</span>
                <span className="font-semibold text-slate-900">
                  {property.lastReportDate ? new Date(property.lastReportDate).toLocaleDateString() : 'Never'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>


      {/* Main Content - Additional module content */}
      <div>
        <Outlet context={{ property }} />
      </div>

      {/* Report Type Selection Modal */}
      <ReportTypeModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSelectType={handleReportTypeSelected}
        propertyName={property.propertyName}
        propertyId={property.propertyID || property.id}
      />
    </div>
  )
}