import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageContainer from '@/layout/PageContainer'
import PageHeader from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  useCreateReportTemplate, 
  useUpdateReportTemplate,
  useReportTemplate,
  parseTemplateSections,
  stringifyTemplateSections,
  TemplateSection,
  CreateReportTemplate,
  UpdateReportTemplate 
} from '@/hooks/api/useReportTemplates'
import { 
  Plus, 
  Save, 
  X, 
  ArrowLeft,
  GripVertical,
  Eye,
  CheckCircle,
  AlertCircle,
  Edit,
  Check
} from 'lucide-react'

const TemplateBuilder = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  const { data: existingTemplate } = useReportTemplate(Number(id))
  const createTemplateMutation = useCreateReportTemplate()
  const updateTemplateMutation = useUpdateReportTemplate()

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

  // UI states
  const [showPreview, setShowPreview] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)

  // Load existing template data
  useEffect(() => {
    if (existingTemplate) {
      setTemplateName(existingTemplate.name)
      setTemplateDescription(existingTemplate.description || '')
      setTemplateSections(parseTemplateSections(existingTemplate.sections))
      setIsActive(existingTemplate.isActive)
    }
  }, [existingTemplate])

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [templateName, templateDescription, templateSections, isActive])

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

  const startEditingSection = (sectionId: string) => {
    setEditingSectionId(sectionId)
  }

  const cancelEditingSection = () => {
    setEditingSectionId(null)
  }

  const updateSection = (sectionId: string, updates: Partial<TemplateSection>) => {
    setTemplateSections(sections => 
      sections.map(section => 
        section.id === sectionId 
          ? { ...section, ...updates }
          : section
      )
    )
    setEditingSectionId(null)
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
      if (isEditing && existingTemplate) {
        const updateData: UpdateReportTemplate = {
          id: existingTemplate.id,
          name: templateName,
          description: templateDescription,
          sections: sectionsJson,
          isActive: isActive
        }
        await updateTemplateMutation.mutateAsync(updateData)
      } else {
        const createData: CreateReportTemplate = {
          name: templateName,
          description: templateDescription,
          sections: sectionsJson,
          isActive: isActive
        }
        await createTemplateMutation.mutateAsync(createData)
      }
      setHasUnsavedChanges(false)
      navigate('/admin/site-management/templates')
    } catch (error) {
      console.error('Failed to save template:', error)
    }
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/admin/site-management/templates')
      }
    } else {
      navigate('/admin/site-management/templates')
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

  const isFormValid = templateName.trim() && templateSections.length > 0

  // EditableSection component
  const EditableSection = ({ section, index }: { section: TemplateSection; index: number }) => {
    const [editName, setEditName] = useState(section.name)
    const [editType, setEditType] = useState(section.type)
    const [editScoreType, setEditScoreType] = useState(section.scoreType)
    const [editMaxScore, setEditMaxScore] = useState(section.maxScore || 10)
    const [editRequired, setEditRequired] = useState(section.required)

    const handleSave = () => {
      updateSection(section.id, {
        name: editName,
        type: editType,
        scoreType: editScoreType,
        maxScore: editScoreType === 'numerical' ? editMaxScore : undefined,
        required: editRequired
      })
    }

    const handleCancel = () => {
      setEditName(section.name)
      setEditType(section.type)
      setEditScoreType(section.scoreType)
      setEditMaxScore(section.maxScore || 10)
      setEditRequired(section.required)
      cancelEditingSection()
    }

    if (editingSectionId === section.id) {
      return (
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Name
                </label>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Type
                </label>
                <Input
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scoring Type
                </label>
                <select
                  value={editScoreType}
                  onChange={(e) => setEditScoreType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="numerical">Numerical (0-X points)</option>
                  <option value="passfail">Pass/Fail</option>
                  <option value="percentage">Percentage (0-100%)</option>
                  <option value="none">No Scoring</option>
                </select>
              </div>
              {editScoreType === 'numerical' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Score
                  </label>
                  <Input
                    type="number"
                    value={editMaxScore}
                    onChange={(e) => setEditMaxScore(Number(e.target.value))}
                    min="1"
                    max="100"
                    className="w-full"
                  />
                </div>
              )}
              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id={`editRequired-${section.id}`}
                  checked={editRequired}
                  onChange={(e) => setEditRequired(e.target.checked)}
                  className="mr-3 h-4 w-4 text-green-600 rounded focus:ring-green-500"
                />
                <label htmlFor={`editRequired-${section.id}`} className="text-sm font-medium text-gray-700">
                  Required Section
                </label>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                disabled={!editName.trim()}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => moveSectionUp(index)}
                disabled={index === 0}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 hover:bg-gray-100 rounded transition-colors"
                title="Move up"
              >
                <GripVertical size={16} />
              </button>
              <button
                onClick={() => moveSectionDown(index)}
                disabled={index === templateSections.length - 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 hover:bg-gray-100 rounded transition-colors"
                title="Move down"
              >
                <GripVertical size={16} />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded font-medium">
                  #{index + 1}
                </span>
                <h3 className="font-semibold text-gray-900 text-lg">{section.name}</h3>
                {section.required && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-medium">
                    Required
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {section.type && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {section.type}
                  </span>
                )}
                <span className="font-medium">
                  {getScoreTypeDisplay(section.scoreType, section.maxScore)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => startEditingSection(section.id)}
              className="p-2 hover:bg-blue-50"
              title="Edit section"
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeSection(section.id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Delete section"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageContainer>
      <PageHeader 
        title={isEditing ? 'Edit Template' : 'Create New Template'} 
        subtitle={isEditing ? 'Modify template configuration and sections' : 'Build a new report template with custom sections and scoring'}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Site Management', href: '/admin/site-management' },
          { label: 'Templates', href: '/admin/site-management/templates' },
          { label: isEditing ? 'Edit' : 'New' }
        ]}
      />

      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={handleCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Button>

        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center"
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? 'Hide Preview' : 'Preview'}
          </Button>
          
          <Button 
            onClick={handleSaveTemplate}
            disabled={!isFormValid || createTemplateMutation.isPending || updateTemplateMutation.isPending}
            className="bg-green-600 hover:bg-green-700 flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            {createTemplateMutation.isPending || updateTemplateMutation.isPending 
              ? 'Saving...' 
              : isEditing ? 'Update Template' : 'Create Template'
            }
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Template Info & Stats */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
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
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="mr-3 h-4 w-4 text-green-600 rounded focus:ring-green-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active template
                </label>
              </div>

              {/* Template Stats */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Template Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sections:</span>
                    <span className="font-medium">{templateSections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scored Sections:</span>
                    <span className="font-medium">
                      {templateSections.filter(s => s.scoreType !== 'none').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Required Sections:</span>
                    <span className="font-medium">
                      {templateSections.filter(s => s.required).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Validation Status */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Validation</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    {templateName.trim() ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className={templateName.trim() ? 'text-green-700' : 'text-red-700'}>
                      Template name
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    {templateSections.length > 0 ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className={templateSections.length > 0 ? 'text-green-700' : 'text-red-700'}>
                      At least one section
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Add New Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Plus className="mr-2 h-5 w-5 text-green-600" />
                Add New Section
              </CardTitle>
              <p className="text-sm text-gray-600">
                Create a new section for this template with custom scoring options
              </p>
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
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Section to Template
              </Button>
            </CardContent>
          </Card>

          {/* Template Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Template Sections ({templateSections.length})
              </CardTitle>
              <p className="text-sm text-gray-600">
                Reorder sections by dragging. These will appear in this order during report creation.
              </p>
            </CardHeader>
            <CardContent>
              {templateSections.length > 0 ? (
                <div className="space-y-3">
                  {templateSections.map((section, index) => (
                    <EditableSection key={section.id} section={section} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No sections added yet</h3>
                  <p className="text-gray-600">Add sections above to define your report structure</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

export default TemplateBuilder