import { useState } from 'react'
import { useOutletContext, useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { PropertyWithReports, useSiteReports, SiteReportFilter } from "@/hooks/api/useSiteManagement"
import { useActiveReportTemplates } from "@/hooks/api/useReportTemplates"
import { FileText, ClipboardList } from 'lucide-react'

interface PropertyContext {
  property: PropertyWithReports
}

export default function PropertySiteReports() {
  const { property } = useOutletContext<PropertyContext>()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null)
  
  // Filter for this property's reports
  const reportFilter: SiteReportFilter = {
    propertyID: property.propertyID,
    pageNumber: 1,
    pageSize: 50,
    sortBy: 'ReportDate',
    sortDirection: 'desc'
  }
  
  const { data: reports } = useSiteReports(reportFilter)
  const { data: templates, isLoading: templatesLoading } = useActiveReportTemplates()

  const handleCreateReport = () => {
    setShowTemplateModal(true)
  }

  const handleTemplateSelect = () => {
    if (selectedTemplateId !== null) {
      // If it's the free-form option (0), navigate without template ID
      if (selectedTemplateId === 0) {
        navigate(`/site-management/properties/${id}/site-reports/create`)
      } else {
        navigate(`/site-management/properties/${id}/site-reports/create/${selectedTemplateId}`)
      }
      setShowTemplateModal(false)
      setSelectedTemplateId(null)
    }
  }

  // Mock data for demonstration
  const mockReports = reports || [
    {
      id: 1,
      propertyID: property.propertyID,
      title: "Monthly Quality Audit - December",
      status: "Complete",
      reportDate: "2025-01-02",
      createdByUserName: "John Smith",
      createdDate: "2025-01-02T10:00:00Z",
      completedByUserName: "John Smith",
      completedDate: "2025-01-02T11:30:00Z",
      overallScore: 92,
      maxPossibleScore: 100,
      sectionCount: 5,
      photoCount: 15,
      issueCount: 2
    },
    {
      id: 2,
      propertyID: property.propertyID,
      title: "Weekly Inspection - Week 52",
      status: "Draft",
      reportDate: "2024-12-28",
      createdByUserName: "Jane Doe",
      createdDate: "2024-12-28T09:00:00Z",
      overallScore: 85,
      maxPossibleScore: 100,
      sectionCount: 4,
      photoCount: 8,
      issueCount: 3
    },
    {
      id: 3,
      propertyID: property.propertyID,
      title: "Post-Storm Assessment",
      status: "InReview",
      reportDate: "2024-12-26",
      createdByUserName: "Mike Johnson",
      createdDate: "2024-12-26T14:00:00Z",
      overallScore: 78,
      maxPossibleScore: 100,
      sectionCount: 6,
      photoCount: 22,
      issueCount: 5
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Draft': 'bg-yellow-100 text-yellow-600',
      'InReview': 'bg-blue-100 text-blue-600',
      'Complete': 'bg-green-100 text-green-600',
      'Archived': 'bg-gray-100 text-gray-600'
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    )
  }

  const getScoreBadge = (score?: number) => {
    if (!score) return <span className="text-gray-400">-</span>
    
    let colorClass = 'text-gray-600'
    if (score >= 90) colorClass = 'text-green-600'
    else if (score >= 80) colorClass = 'text-blue-600'
    else if (score >= 70) colorClass = 'text-yellow-600'
    else colorClass = 'text-red-600'
    
    return <span className={`font-medium ${colorClass}`}>{score}%</span>
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockReports.filter(r => r.status === 'Draft').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockReports.filter(r => r.status === 'InReview').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(mockReports.reduce((sum, r) => sum + (r.overallScore || 0), 0) / mockReports.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Site Reports</CardTitle>
            <Button onClick={handleCreateReport} className="bg-green-600 hover:bg-green-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Photos/Issues</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report: any) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-gray-500">{report.sectionCount} sections</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div>
                      <div>{report.createdByUserName}</div>
                      {report.completedByUserName && (
                        <div className="text-sm text-gray-500">
                          Completed by {report.completedByUserName}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getScoreBadge(report.overallScore)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{report.photoCount} photos</div>
                      <div className="text-gray-500">{report.issueCount} issues</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      {report.status === 'Draft' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Edit</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {mockReports.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No site reports found for this property.</p>
              <p className="text-sm mt-1">Click "Create New Report" above to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Template Selection Modal */}
      <Modal
        isOpen={showTemplateModal}
        onClose={() => {
          setShowTemplateModal(false)
          setSelectedTemplateId(null)
        }}
        title="Select Report Type"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Choose a template for your site report or create a free-form report.
          </p>
          
          <div className="space-y-3">
            {/* Free-form option */}
            <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="template"
                value="0"
                checked={selectedTemplateId === 0}
                onChange={() => setSelectedTemplateId(0)}
                className="mt-1 mr-3 text-green-600 focus:ring-green-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium text-gray-900">Free-form Report</h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Create a custom report without a predefined template
                </p>
              </div>
            </label>

            {/* Template options */}
            {templatesLoading ? (
              <div className="text-center py-4">
                <p className="text-gray-500">Loading templates...</p>
              </div>
            ) : (
              templates?.map((template) => (
                <label key={template.id} className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={selectedTemplateId === template.id}
                    onChange={() => setSelectedTemplateId(template.id)}
                    className="mt-1 mr-3 text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-gray-400" />
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                    </div>
                    {template.description && (
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Used in {template.reportsCount} reports
                    </p>
                  </div>
                </label>
              ))
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setShowTemplateModal(false)
                setSelectedTemplateId(null)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTemplateSelect}
              disabled={selectedTemplateId === null}
              className="bg-green-600 hover:bg-green-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}