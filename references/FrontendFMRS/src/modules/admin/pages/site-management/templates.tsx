import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '@/layout/PageContainer'
import PageHeader from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { 
  useReportTemplates, 
  useDeleteReportTemplate,
  useToggleTemplateStatus
} from '@/hooks/api/useReportTemplates'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Power, 
  PowerOff, 
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react'

const TemplateManagement = () => {
  const { data: templates, isLoading } = useReportTemplates()
  const deleteTemplateMutation = useDeleteReportTemplate()
  const toggleStatusMutation = useToggleTemplateStatus()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && template.isActive) ||
      (statusFilter === 'inactive' && !template.isActive)
    
    return matchesSearch && matchesStatus
  }) || []

  const handleDeleteTemplate = async (templateId: number, templateName: string) => {
    if (!confirm(`Are you sure you want to delete "${templateName}"? This action cannot be undone.`)) return
    
    try {
      await deleteTemplateMutation.mutateAsync(templateId)
    } catch (error) {
      console.error('Failed to delete template:', error)
      alert('Failed to delete template. It may be in use by existing reports.')
    }
  }

  const handleToggleStatus = async (templateId: number) => {
    try {
      await toggleStatusMutation.mutateAsync(templateId)
    } catch (error) {
      console.error('Failed to toggle template status:', error)
    }
  }

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader title="Template Management" />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading templates...</div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Template Management" 
        subtitle="Manage all report templates for site management"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Site Management', href: '/admin/site-management' },
          { label: 'Templates' }
        ]}
      />

      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/admin/site-management">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
        </Link>
        
        <Link to="/admin/site-management/templates/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Templates</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Report Templates ({filteredTemplates.length})
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage templates for site reports, customer reports, and turnover documentation
          </p>
        </CardHeader>
        <CardContent>
          {filteredTemplates.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold text-gray-900">{template.name}</div>
                          <div className="text-xs text-gray-500">ID: {template.id}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm text-gray-600 truncate">
                          {template.description || 'No description provided'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          template.isActive 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{template.reportsCount} reports</div>
                          <div className="text-xs text-gray-500">using this template</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{template.createdByUserName}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(template.createdDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          v{template.version}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/site-management/templates/${template.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="p-2"
                              title="View template"
                            >
                              <Eye size={14} />
                            </Button>
                          </Link>
                          <Link to={`/admin/site-management/templates/${template.id}/edit`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="p-2"
                              title="Edit template"
                            >
                              <Edit size={14} />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(template.id)}
                            disabled={toggleStatusMutation.isPending}
                            className="p-2"
                            title={template.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {template.isActive ? <PowerOff size={14} /> : <Power size={14} />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTemplate(template.id, template.name)}
                            disabled={template.reportsCount > 0 || deleteTemplateMutation.isPending}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete template"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              {searchTerm || statusFilter !== 'all' ? (
                <div>
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No matching templates</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('all')
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div>
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
                  <p className="text-gray-600 mb-4">
                    Create your first template to get started with standardized reporting
                  </p>
                  <Link to="/admin/site-management/templates/new">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Template
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  )
}

export default TemplateManagement