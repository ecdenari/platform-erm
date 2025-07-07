import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { FileText, Users, RefreshCw, X, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActiveReportTemplates } from '@/hooks/api/useReportTemplates'

interface ReportTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectType: (type: 'site' | 'customer' | 'turnover') => void
  propertyName: string
  propertyId: string | number
}

export function ReportTypeModal({ isOpen, onClose, onSelectType, propertyName, propertyId }: ReportTypeModalProps) {
  const [currentStep, setCurrentStep] = useState<'reportType' | 'templateSelection'>('reportType')
  const navigate = useNavigate()
  const { data: templates, isLoading: templatesLoading } = useActiveReportTemplates()

  const reportTypes = [
    {
      type: 'site' as const,
      title: 'Site Report',
      icon: <FileText size={40} />
    },
    {
      type: 'customer' as const,
      title: 'Customer Report',
      icon: <Users size={40} />
    },
    {
      type: 'turnover' as const,
      title: 'Turnover Report',
      icon: <RefreshCw size={40} />
    }
  ]

  const handleReportTypeSelect = (type: 'site' | 'customer' | 'turnover') => {
    if (type === 'site') {
      setCurrentStep('templateSelection')
    } else {
      // Handle other report types as before
      onSelectType(type)
      onClose()
    }
  }

  const handleTemplateSelect = (templateId?: number) => {
    const basePath = `/site-management/properties/${propertyId}/site-reports/create`
    const path = templateId ? `${basePath}/${templateId}` : basePath
    navigate(path)
    onClose()
  }

  const handleBack = () => {
    setCurrentStep('reportType')
  }

  const resetAndClose = () => {
    setCurrentStep('reportType')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
        {/* Header - Reduced padding for information density */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentStep === 'templateSelection' && (
                <button
                  onClick={handleBack}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  {currentStep === 'reportType' ? 'Create New Report' : 'Select Site Report Type'}
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-0.5">
                  {currentStep === 'reportType' 
                    ? `Select the type of report to create for ${propertyName}`
                    : 'Choose a template or create a free-form report'
                  }
                </DialogDescription>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Content - Reduced padding for information density */}
        <div className="p-4">
          {currentStep === 'reportType' ? (
            // Step 1: Report Type Selection
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reportTypes.map((report) => (
                <button
                  key={report.type}
                  onClick={() => handleReportTypeSelect(report.type)}
                  className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {/* Icon Container - Reduced size for information density */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-100 transition-colors">
                    <div className="text-gray-600 group-hover:text-gray-700">
                      <FileText size={24} />
                    </div>
                  </div>
                  
                  {/* Title - Reduced font size for information density */}
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700">
                    {report.title}
                  </h3>
                </button>
              ))}
            </div>
          ) : (
            // Step 2: Template Selection for Site Reports
            <div className="space-y-3">
              {templatesLoading ? (
                <div className="text-center py-8">
                  <div className="text-gray-500">Loading templates...</div>
                </div>
              ) : (
                <>
                  {/* Free-form Option */}
                  <button
                    onClick={() => handleTemplateSelect()}
                    className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg w-10 h-10 flex items-center justify-center">
                        <FileText size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Free-form Site Report</h4>
                        <p className="text-sm text-gray-600">Create a custom report without a template</p>
                      </div>
                    </div>
                  </button>

                  {/* Template Options */}
                  {templates && templates.length > 0 && (
                    <>
                      <div className="border-t border-gray-100 pt-3 mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Template-based Reports</h4>
                      </div>
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template.id)}
                          className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-green-50 border border-green-200 rounded-lg w-10 h-10 flex items-center justify-center">
                              <FileText size={20} className="text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{template.name}</h4>
                              {template.description && (
                                <p className="text-sm text-gray-600">{template.description}</p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Footer - Reduced padding for information density */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-end">
            <Button variant="outline" onClick={resetAndClose} className="px-6">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}