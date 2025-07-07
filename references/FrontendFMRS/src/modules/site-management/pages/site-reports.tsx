import { useState } from 'react'
import PageContainer from "@/layout/PageContainer"
import PageHeader from "@/components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { useSiteReports, usePropertiesWithReports, useCreateSiteReport, SiteReportFilter, CreateSiteReport } from "@/hooks/api/useSiteManagement"

export default function SiteReports() {
  const [filter, setFilter] = useState<SiteReportFilter>({
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'ReportDate',
    sortDirection: 'desc'
  })
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Form state for create report
  const [createForm, setCreateForm] = useState<CreateSiteReport>({
    propertyID: 0,
    title: '',
    description: '',
    reportDate: new Date().toISOString().split('T')[0],
    notes: '',
    gpsLatitude: '',
    gpsLongitude: '',
    weatherConditions: '',
    temperature: ''
  })

  const { data: reports, isLoading, error } = useSiteReports(filter)
  const { data: properties } = usePropertiesWithReports()
  const createReportMutation = useCreateSiteReport()

  // Mock data for demonstration since backend isn't connected yet
  const mockReports = reports || [
    {
      id: 1,
      propertyID: 1,
      title: "Monthly Quality Audit - Oak Grove HOA",
      status: "Draft",
      reportDate: "2025-01-02",
      createdByUserName: "John Smith",
      createdDate: "2025-01-02T10:00:00Z",
      overallScore: 85,
      maxPossibleScore: 100,
      propertyName: "Oak Grove HOA",
      propertyAddress: "123 Oak Grove Dr, Austin, TX",
      sectionCount: 4,
      photoCount: 12,
      issueCount: 2
    },
    {
      id: 2,
      propertyID: 2,
      title: "Weekly Inspection - Sunset Plaza",
      status: "Complete",
      reportDate: "2025-01-01",
      createdByUserName: "Jane Doe",
      createdDate: "2025-01-01T14:30:00Z",
      completedByUserName: "Jane Doe",
      completedDate: "2025-01-01T16:45:00Z",
      overallScore: 92,
      maxPossibleScore: 100,
      propertyName: "Sunset Plaza",
      propertyAddress: "456 Sunset Blvd, Austin, TX",
      sectionCount: 5,
      photoCount: 18,
      issueCount: 1
    },
    {
      id: 3,
      propertyID: 3,
      title: "Post-Storm Assessment - Cedar Ridge",
      status: "InReview",
      reportDate: "2024-12-30",
      createdByUserName: "Mike Johnson",
      createdDate: "2024-12-30T09:15:00Z",
      overallScore: 67,
      maxPossibleScore: 100,
      propertyName: "Cedar Ridge Apartments",
      propertyAddress: "789 Cedar Ridge Rd, Austin, TX",
      sectionCount: 6,
      photoCount: 25,
      issueCount: 8
    }
  ]

  const filteredReports = mockReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const handleCreateReport = () => {
    setIsCreateModalOpen(true)
  }

  const handleSubmitCreateReport = async () => {
    if (!createForm.propertyID || !createForm.title.trim()) {
      alert('Please select a property and enter a report title.')
      return
    }

    try {
      await createReportMutation.mutateAsync(createForm)
      setIsCreateModalOpen(false)
      setCreateForm({
        propertyID: 0,
        title: '',
        description: '',
        reportDate: new Date().toISOString().split('T')[0],
        notes: '',
        gpsLatitude: '',
        gpsLongitude: '',
        weatherConditions: '',
        temperature: ''
      })
    } catch (error) {
      console.error('Failed to create report:', error)
      alert('Failed to create report. Please try again.')
    }
  }

  const handleStatusFilter = (status: string) => {
    setFilter(prev => ({ ...prev, status: status === 'all' ? undefined : status }))
  }

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading reports...</div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
            <CardTitle className="text-sm font-medium text-gray-600">Draft Reports</CardTitle>
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
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockReports.filter(r => r.status === 'Complete').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reports List</CardTitle>
            <Button onClick={handleCreateReport} className="bg-green-600 hover:bg-green-700">
              Create New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Controls */}
          <div className="flex items-center space-x-4 mb-6">
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Select onValueChange={handleStatusFilter}>
              <option value="all">All Status</option>
              <option value="Draft">Draft</option>
              <option value="InReview">In Review</option>
              <option value="Complete">Complete</option>
              <option value="Archived">Archived</option>
            </Select>
          </div>

          {/* Reports Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Photos/Issues</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-gray-500">
                        {report.sectionCount} sections
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.propertyName}</div>
                      <div className="text-sm text-gray-500">{report.propertyAddress}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(report.status)}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(report.reportDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {report.createdByUserName}
                  </TableCell>
                  <TableCell>
                    {getScoreBadge(report.overallScore)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{report.photoCount} photos</div>
                      <div className="text-gray-500">{report.issueCount} issues</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {report.status === 'Draft' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Edit
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No reports found matching your search.' : 'No reports available.'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Report Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Site Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property *
              </label>
              <select
                value={createForm.propertyID}
                onChange={(e) => setCreateForm(prev => ({ ...prev, propertyID: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value={0}>Select a property...</option>
                {properties?.map((property) => (
                  <option key={property.id} value={property.propertyID}>
                    {property.propertyName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Title *
              </label>
              <Input 
                placeholder="Enter report title..." 
                value={createForm.title}
                onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Input 
                placeholder="Enter report description..." 
                value={createForm.description}
                onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Date
              </label>
              <Input 
                type="date" 
                value={createForm.reportDate}
                onChange={(e) => setCreateForm(prev => ({ ...prev, reportDate: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitCreateReport}
                disabled={createReportMutation.isPending || !createForm.propertyID || !createForm.title.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {createReportMutation.isPending ? 'Creating...' : 'Create Report'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}
