import React from 'react'
import PageContainer from '@/layout/PageContainer'
import PageHeader from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Settings, 
  BarChart3, 
  Users, 
  ArrowRight,
  Plus,
  Eye,
  Edit
} from 'lucide-react'
import { useReportTemplates } from '@/hooks/api/useReportTemplates'

const SiteManagementOverview = () => {
  const { data: templates } = useReportTemplates()

  const quickActions = [
    {
      title: "Create New Template",
      description: "Build templates for site reports, customer reports, and turnover documentation",
      icon: Plus,
      to: "/admin/site-management/templates/new",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      title: "Manage Templates", 
      description: "View, edit, and organize all report templates",
      icon: Settings,
      to: "/admin/site-management/templates",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Template Analytics",
      description: "View usage statistics and performance metrics for templates",
      icon: BarChart3,
      to: "/admin/site-management/analytics",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      title: "User Permissions",
      description: "Manage who can create, edit, and use different template types",
      icon: Users,
      to: "/admin/site-management/permissions",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    }
  ]

  const recentTemplates = templates?.slice(0, 5) || []

  return (
    <PageContainer>
      <PageHeader 
        title="Site Management Administration" 
        subtitle="Manage report templates, settings, and site management configuration"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Templates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {templates?.filter(t => t.isActive).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reports Created</p>
                <p className="text-2xl font-bold text-gray-900">
                  {templates?.reduce((sum, t) => sum + t.reportsCount, 0) || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Edit className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-sm font-bold text-gray-900">
                  {templates?.length > 0 ? 'Today' : 'Never'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <p className="text-gray-600">Common tasks for site management administration</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.to}
                className="group block"
              >
                <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg ${action.color} ${action.hoverColor} transition-colors`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {action.description}
                      </p>
                      <div className="flex items-center mt-3 text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        Get started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Templates</CardTitle>
              <p className="text-gray-600">Recently created or modified templates</p>
            </div>
            <Link to="/admin/site-management/templates">
              <Button variant="outline">
                View All Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentTemplates.length > 0 ? (
            <div className="space-y-4">
              {recentTemplates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-xs text-gray-600">
                        Created by {template.createdByUserName} • v{template.version}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      template.isActive 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {template.reportsCount} reports
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
              <p className="text-gray-600 mb-4">Create your first template to get started</p>
              <Link to="/admin/site-management/templates/new">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  )
}

export default SiteManagementOverview