import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { PropertyWithReports } from "@/hooks/api/useSiteManagement"
import { ReportTypeModal } from '@/components/ui/ReportTypeModal'
import { 
  FileText, 
  Users, 
  RefreshCw, 
  Plus, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react'

interface PropertyContext {
  property: PropertyWithReports
}

export default function PropertyOverview() {
  const { property } = useOutletContext<PropertyContext>()
  const navigate = useNavigate()
  const [showReportModal, setShowReportModal] = useState(false)

  // Mock data for demonstration - replace with real API data
  const mockRecentReports = [
    {
      id: 1,
      name: "Monthly Quality Audit",
      type: "Site Report",
      date: new Date().toLocaleDateString(),
      status: "Completed",
      score: "85%",
      statusColor: "green"
    },
    {
      id: 2,
      name: "Weekly Inspection Draft", 
      type: "Site Report",
      date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
      status: "Draft",
      score: "-",
      statusColor: "yellow"
    },
    {
      id: 3,
      name: "Customer Report - March",
      type: "Customer Report", 
      date: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
      status: "Completed",
      score: "92%",
      statusColor: "green"
    }
  ]

  const reportTypes = [
    {
      id: 'site',
      title: 'Site Reports',
      description: 'Quality audits and site inspections',
      icon: <FileText className="w-6 h-6" />,
      color: 'blue',
      count: property.totalReports || 2,
      completed: property.completedReports || 1,
      drafts: property.draftReports || 1,
      lastReport: property.lastReportDate ? new Date(property.lastReportDate).toLocaleDateString() : 'Never',
      route: 'site-reports'
    },
    {
      id: 'customer', 
      title: 'Customer Reports',
      description: 'Client-facing reports and summaries',
      icon: <Users className="w-6 h-6" />,
      color: 'green',
      count: 1,
      completed: 1,
      drafts: 0,
      lastReport: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
      route: 'customer-reports'
    },
    {
      id: 'turnover',
      title: 'Turnover Reports', 
      description: 'Project completion and handoff reports',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'purple',
      count: 0,
      completed: 0,
      drafts: 0,
      lastReport: 'Never',
      route: 'schedule'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600',
      green: 'bg-green-50 border-green-200 text-green-600', 
      purple: 'bg-purple-50 border-purple-200 text-purple-600'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const handleCreateReport = () => {
    setShowReportModal(true)
  }

  const handleReportTypeSelected = (type: 'site' | 'customer' | 'turnover') => {
    setShowReportModal(false)
    // This will be handled by the ReportTypeModal navigation logic
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Overall Score</p>
                <p className="text-2xl font-bold text-blue-900">
                  {property.overallScore ? `${property.overallScore}%` : 'N/A'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{property.totalReports || 0}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{property.completedReports || 0}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">{property.draftReports || 0}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reportTypes.map((reportType) => (
          <Card key={reportType.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${getColorClasses(reportType.color)}`}>
                    {reportType.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{reportType.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{reportType.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/site-management/properties/${property.propertyID || property.id}/${reportType.route}`)}
                  className="shrink-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{reportType.count}</p>
                    <p className="text-gray-600">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-green-600">{reportType.completed}</p>
                    <p className="text-gray-600">Done</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-yellow-600">{reportType.drafts}</p>
                    <p className="text-gray-600">Drafts</p>
                  </div>
                </div>

                {/* Last Report */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Report:</span>
                    <span className="font-medium text-gray-900">{reportType.lastReport}</span>
                  </div>
                </div>

                {/* Create Button */}
                <Button 
                  onClick={handleCreateReport}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create {reportType.title.slice(0, -1)}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockRecentReports.length > 0 ? (
            <div className="space-y-3">
              {mockRecentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      report.statusColor === 'green' ? 'bg-green-500' :
                      report.statusColor === 'yellow' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      report.statusColor === 'green' ? 'bg-green-100 text-green-700' :
                      report.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {report.status}
                    </span>
                    {report.score !== '-' && (
                      <span className="text-sm font-medium text-gray-900">{report.score}</span>
                    )}
                    <Button variant="outline" size="sm" className="px-3">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first report.</p>
              <Button onClick={handleCreateReport} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Report
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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