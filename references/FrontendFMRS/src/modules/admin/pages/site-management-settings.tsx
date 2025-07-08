import React, { useState } from 'react'
import PageContainer from '@/layout/PageContainer'
import PageHeader from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog'
import { 
  useReportTemplates, 
  useCreateReportTemplate, 
  useUpdateReportTemplate,
  useDeleteReportTemplate,
  useToggleTemplateStatus,
  parseTemplateSections,
  stringifyTemplateSections,
  TemplateSection,
  CreateReportTemplate,
  UpdateReportTemplate 
} from '@/hooks/api/useReportTemplates'
import { Plus, Edit, Trash2, Eye, Power, PowerOff, GripVertical, X } from 'lucide-react'

const SiteManagementAdmin = () => {
  const { data: templates, isLoading } = useReportTemplates()
  const createTemplateMutation = useCreateReportTemplate()
  const updateTemplateMutation = useUpdateReportTemplate()
  const deleteTemplateMutation = useDeleteReportTemplate()
  const toggleStatusMutation = useToggleTemplateStatus()

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [previewingTemplate, setPreviewingTemplate] = useState<any>(null)

  // Form states
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const [templateSections, setTemplateSections] = useState<TemplateSection[]>([])
  const [isActive, setIsActive] = useState(true)

  // Section builder state
  const [newSectionName, setNewSectionName] = useState('')
  const [newSectionType, setNewSectionType] = useState('')
  const [newSectionScoreType, setNewSectionScoreType] = useState<'numerical' | 'passfail' | 'percentage' | 'none'>('numerical')
  const [newSectionMaxScore, setNewSectionMaxScore] = useState<number>(10)
  const [newSectionRequired, setNewSectionRequired] = useState(true)

  const resetForm = () => {
    setTemplateName('')
    setTemplateDescription('')
    setTemplateSections([])
    setIsActive(true)
    setEditingTemplate(null)
  }

  const openCreateModal = () => {
    resetForm()
    setShowCreateModal(true)
  }

  const openEditModal = (template: any) => {
    setEditingTemplate(template)
    setTemplateName(template.name)
    setTemplateDescription(template.description || '')
    setTemplateSections(parseTemplateSections(template.sections))
    setIsActive(template.isActive)
    setShowEditModal(true)
  }

  const openPreviewModal = (template: any) => {
    setPreviewingTemplate(template)
    setShowPreviewModal(true)
  }

  const addSection = () => {
    if (!newSectionName.trim()) return

    const newSection: TemplateSection = {
      id: crypto.randomUUID(),
      name: newSectionName,
      type: newSectionType,
      scoreType: newSectionScoreType,
      maxScore: newSectionScoreType === 'numerical' ? newSectionMaxScore : undefined,
      required: newSectionRequired,
      order: templateSections.length + 1,
      description: ''
    }

    setTemplateSections([...templateSections, newSection])
    setNewSectionName('')
    setNewSectionType('')
    setNewSectionScoreType('numerical')
    setNewSectionMaxScore(10)
    setNewSectionRequired(true)
  }

  const removeSection = (sectionId: string) => {
    setTemplateSections(sections => sections.filter(s => s.id !== sectionId))
  }

  const moveSectionUp = (index: number) => {
    if (index === 0) return
    const newSections = [...templateSections]
    const temp = newSections[index]
    newSections[index] = newSections[index - 1]
    newSections[index - 1] = temp
    newSections.forEach((section, i) => section.order = i + 1)
    setTemplateSections(newSections)
  }

  const moveSectionDown = (index: number) => {
    if (index === templateSections.length - 1) return
    const newSections = [...templateSections]
    const temp = newSections[index]
    newSections[index] = newSections[index + 1]
    newSections[index + 1] = temp
    newSections.forEach((section, i) => section.order = i + 1)
    setTemplateSections(newSections)
  }

  const handleSaveTemplate = async () => {
    if (!templateName.trim() || templateSections.length === 0) return

    const sectionsJson = stringifyTemplateSections(templateSections)

    try {
      if (editingTemplate) {
        const updateData: UpdateReportTemplate = {
          id: editingTemplate.id,
          name: templateName,
          description: templateDescription,
          sections: sectionsJson,
          isActive: isActive
        }
        await updateTemplateMutation.mutateAsync(updateData)
        setShowEditModal(false)
      } else {
        const createData: CreateReportTemplate = {
          name: templateName,
          description: templateDescription,
          sections: sectionsJson,
          isActive: isActive
        }
        await createTemplateMutation.mutateAsync(createData)
        setShowCreateModal(false)
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save template:', error)
    }
  }

  const handleDeleteTemplate = async (templateId: number) => {
    if (!confirm('Are you sure you want to delete this template? This action cannot be undone.')) return
    
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

  const getScoreTypeDisplay = (scoreType: string, maxScore?: number) => {
    switch (scoreType) {
      case 'numerical':
        return `0-${maxScore || 10} points`
      case 'passfail':
        return 'Pass/Fail'
      case 'percentage':
        return '0-100%'
      case 'none':
        return 'No scoring'
      default:
        return scoreType
    }
  }

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader title="Site Management Settings" />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading templates...</div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Site Management Settings" 
        subtitle="Manage report templates and site management configuration"
      />

      {/* Templates Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Report Templates</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Create and manage templates for site reports with custom sections and scoring
              </p>
            </div>
            <Button onClick={openCreateModal} className="bg-green-600 hover:bg-green-700">
              <Plus size={16} className="mr-2" />
              Create Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reports Using</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates?.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell className="text-gray-600">
                    {template.description || 'No description'}
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
                    <span className="text-sm">{template.reportsCount} reports</span>
                  </TableCell>
                  <TableCell className="text-gray-600">{template.createdByUserName}</TableCell>
                  <TableCell className="text-gray-600">v{template.version}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPreviewModal(template)}
                        className="p-1.5"
                      >
                        <Eye size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(template)}
                        className="p-1.5"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(template.id)}
                        className="p-1.5"
                        disabled={toggleStatusMutation.isPending}
                      >
                        {template.isActive ? <PowerOff size={14} /> : <Power size={14} />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-1.5 text-red-600 hover:text-red-700"
                        disabled={template.reportsCount > 0 || deleteTemplateMutation.isPending}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {templates?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No templates created yet. Create your first template to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Template Modal */}
      <Dialog open={showCreateModal || showEditModal} onOpenChange={(open) => {
        if (!open) {
          setShowCreateModal(false)
          setShowEditModal(false)
          resetForm()
        }
      }}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTemplate ? 'Edit Template' : 'Create New Template'}
            </DialogTitle>
            <DialogDescription>
              {editingTemplate 
                ? 'Modify the template configuration and sections'
                : 'Create a new report template with custom sections and scoring types'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Column - Basic Info & Settings */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name *
                    </label>
                    <Input
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="e.g., Standard Site Audit"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={templateDescription}
                      onChange={(e) => setTemplateDescription(e.target.value)}
                      placeholder="Brief description of this template..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="mr-3"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Active (available for use in reports)
                    </label>
                  </div>

                  {/* Template Stats */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Template Summary</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Sections:</span>
                        <span className="font-medium">{templateSections.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scored Sections:</span>
                        <span className="font-medium">
                          {templateSections.filter(s => s.scoreType !== 'none').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Required Sections:</span>
                        <span className="font-medium">
                          {templateSections.filter(s => s.required).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Columns - Section Builder */}
            <div className="lg:col-span-2 space-y-6">

              {/* Add New Section Card */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Plus size={20} className="mr-2 text-green-600" />
                    Add New Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Name *
                      </label>
                      <Input
                        value={newSectionName}
                        onChange={(e) => setNewSectionName(e.target.value)}
                        placeholder="e.g., Turf Quality, Irrigation Systems"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Type
                      </label>
                      <Input
                        value={newSectionType}
                        onChange={(e) => setNewSectionType(e.target.value)}
                        placeholder="e.g., Maintenance, Landscaping, Safety"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Scoring Type *
                      </label>
                      <select
                        value={newSectionScoreType}
                        onChange={(e) => setNewSectionScoreType(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="numerical">Numerical (0-X points)</option>
                        <option value="passfail">Pass/Fail</option>
                        <option value="percentage">Percentage (0-100%)</option>
                        <option value="none">No Scoring</option>
                      </select>
                    </div>
                    {newSectionScoreType === 'numerical' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Score
                        </label>
                        <Input
                          type="number"
                          value={newSectionMaxScore}
                          onChange={(e) => setNewSectionMaxScore(Number(e.target.value))}
                          min="1"
                          max="100"
                          className="w-full"
                        />
                      </div>
                    )}
                    <div className="flex items-center pt-6">
                      <input
                        type="checkbox"
                        id="newSectionRequired"
                        checked={newSectionRequired}
                        onChange={(e) => setNewSectionRequired(e.target.checked)}
                        className="mr-3 h-4 w-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <label htmlFor="newSectionRequired" className="text-sm font-medium text-gray-700">
                        Required Section
                      </label>
                    </div>
                  </div>

                  <Button 
                    onClick={addSection} 
                    disabled={!newSectionName.trim()}
                    className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Section to Template
                  </Button>
                </CardContent>
              </Card>

              {/* Sections List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Sections ({templateSections.length})</CardTitle>
                  <p className="text-sm text-gray-600">
                    Drag to reorder sections. These will appear in this order during report creation.
                  </p>
                </CardHeader>
                <CardContent>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {templateSections.map((section, index) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex flex-col space-y-1">
                              <button
                                onClick={() => moveSectionUp(index)}
                                disabled={index === 0}
                                className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 hover:bg-gray-100 rounded"
                                title="Move up"
                              >
                                <GripVertical size={14} />
                              </button>
                              <button
                                onClick={() => moveSectionDown(index)}
                                disabled={index === templateSections.length - 1}
                                className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 hover:bg-gray-100 rounded"
                                title="Move down"
                              >
                                <GripVertical size={14} />
                              </button>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">
                                  {index + 1}
                                </span>
                                <div className="font-semibold text-gray-900">{section.name}</div>
                                {section.required && (
                                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-medium">
                                    Required
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {section.type && (
                                  <span className="text-blue-600 font-medium">{section.type}</span>
                                )}
                                {section.type && ' • '}
                                <span>{getScoreTypeDisplay(section.scoreType, section.maxScore)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSection(section.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {templateSections.length === 0 && (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-lg font-medium mb-2">No sections added yet</div>
                      <div className="text-sm">Add sections above to define your report structure</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <div className="text-sm text-gray-600">
              {templateSections.length === 0 ? (
                <span className="text-red-600">⚠ Add at least one section to save the template</span>
              ) : (
                <span>✓ Template ready with {templateSections.length} section{templateSections.length !== 1 ? 's' : ''}</span>
              )}
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCreateModal(false)
                  setShowEditModal(false)
                  resetForm()
                }}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveTemplate}
                disabled={!templateName.trim() || templateSections.length === 0 || createTemplateMutation.isPending || updateTemplateMutation.isPending}
                className="bg-green-600 hover:bg-green-700 px-8"
              >
                {createTemplateMutation.isPending || updateTemplateMutation.isPending 
                  ? 'Saving...' 
                  : editingTemplate ? 'Update Template' : 'Create Template'
                }
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Template Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Template Preview: {previewingTemplate?.name}</DialogTitle>
            <DialogDescription>
              Preview of how this template will appear in reports
            </DialogDescription>
          </DialogHeader>

          {previewingTemplate && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Description</h4>
                <p className="text-sm text-gray-600">
                  {previewingTemplate.description || 'No description provided'}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sections ({parseTemplateSections(previewingTemplate.sections).length})</h4>
                <div className="space-y-3">
                  {parseTemplateSections(previewingTemplate.sections).map((section, index) => (
                    <div key={section.id} className="border border-gray-200 rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{index + 1}. {section.name}</div>
                          {section.type && (
                            <div className="text-sm text-gray-600">{section.type}</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {getScoreTypeDisplay(section.scoreType, section.maxScore)}
                          </div>
                          {section.required && (
                            <div className="text-xs text-red-600">Required</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setShowPreviewModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}

export default SiteManagementAdmin 