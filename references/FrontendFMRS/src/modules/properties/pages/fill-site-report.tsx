import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageContainer from '@/layout/PageContainer'
import PageHeader from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select, SelectItem } from '@/components/ui/Select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { usePropertiesWithReports, useCreateSiteReport, type CreateSiteReport } from '@/hooks/api/useSiteManagement'
import { useReportTemplate, parseTemplateSections, type TemplateSection } from '@/hooks/api/useReportTemplates'
import { Camera, Upload, X, Plus, Check, AlertTriangle } from 'lucide-react'

interface PhotoWithNotes {
  file: File
  notes: string
}

export default function FillSiteReport() {
  const navigate = useNavigate()
  const { id: propertyId, templateId } = useParams<{ id: string; templateId?: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sectionScores, setSectionScores] = useState<{[key: string]: {score?: number, notes?: string, photos?: PhotoWithNotes[]}}>({})
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [pendingSubmitType, setPendingSubmitType] = useState<'draft' | 'create' | null>(null)

  const { data: properties, isLoading: propertiesLoading } = usePropertiesWithReports()
  const { data: template, isLoading: templateLoading } = useReportTemplate(
    templateId ? Number(templateId) : 0
  )
  
  // Parse template sections if template exists
  const templateSections = template ? parseTemplateSections(template.sections) : []
  const createReportMutation = useCreateSiteReport()

  // Get the specific property
  const property = properties?.find(p => {
    const propId = p.propertyID || p.id
    return propId && propId.toString() === propertyId
  })

  // Form state
  const [form, setForm] = useState<CreateSiteReport>({
    propertyID: Number(propertyId) || 0,
    templateId: templateId ? Number(templateId) : undefined,
    title: '',
    reportDate: new Date().toISOString().split('T')[0],
    notes: ''
  })

  // Auto-fill property ID when propertyId param changes
  useEffect(() => {
    if (propertyId) {
      setForm(prev => ({ ...prev, propertyID: Number(propertyId) }))
    }
  }, [propertyId])

  // Generate score options based on score type
  const getScoreOptions = (section: TemplateSection) => {
    switch (section.scoreType) {
      case 'passfail':
        return [
          { value: '', label: 'Select...' },
          { value: '1', label: 'Pass' },
          { value: '0', label: 'Fail' }
        ]
      case 'percentage':
        const percentOptions = [{ value: '', label: 'Select...' }]
        for (let i = 0; i <= 100; i += 10) {
          percentOptions.push({ value: i.toString(), label: `${i}%` })
        }
        return percentOptions
      case 'numerical':
        const maxScore = section.maxScore || 10
        const numOptions = [{ value: '', label: 'Select...' }]
        for (let i = 0; i <= maxScore; i++) {
          numOptions.push({ value: i.toString(), label: `${i}${maxScore ? `/${maxScore}` : ''}` })
        }
        return numOptions
      default:
        return []
    }
  }

  // Handle photo upload
  const handlePhotoUpload = (sectionId: string, files: FileList | null) => {
    if (!files) return
    
    const newPhotos = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({ file, notes: '' }))
    
    setSectionScores(prev => ({
      ...prev,
      [sectionId]: { 
        ...prev[sectionId], 
        photos: [...(prev[sectionId]?.photos || []), ...newPhotos] 
      }
    }))
  }

  // Update photo notes
  const updatePhotoNotes = (sectionId: string, photoIndex: number, notes: string) => {
    setSectionScores(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        photos: prev[sectionId]?.photos?.map((photo, index) => 
          index === photoIndex ? { ...photo, notes } : photo
        ) || []
      }
    }))
  }

  // Remove photo
  const removePhoto = (sectionId: string, photoIndex: number) => {
    setSectionScores(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        photos: prev[sectionId]?.photos?.filter((_, index) => index !== photoIndex) || []
      }
    }))
  }

  // Calculate completion and scoring
  const calculateScores = () => {
    if (templateSections.length === 0) {
      return { completionPercentage: 0, totalScore: 0, maxPossibleScore: 0, scorePercentage: 0 }
    }

    const scorableSections = templateSections.filter(s => s.scoreType !== 'none')
    const completedSections = templateSections.filter(s => sectionScores[s.id]?.score !== undefined)
    const completedScorableSections = scorableSections.filter(s => sectionScores[s.id]?.score !== undefined)

    // Completion percentage based on all sections
    const completionPercentage = Math.round((completedSections.length / templateSections.length) * 100)

    if (scorableSections.length === 0) {
      return { completionPercentage, totalScore: 0, maxPossibleScore: 0, scorePercentage: 0 }
    }

    // Calculate total score and max possible score
    let totalScore = 0
    let maxPossibleScore = 0

    scorableSections.forEach(section => {
      const sectionScore = sectionScores[section.id]?.score
      const maxScore = section.maxScore || (section.scoreType === 'percentage' ? 100 : 10)

      maxPossibleScore += maxScore

      if (sectionScore !== undefined) {
        switch (section.scoreType) {
          case 'numerical':
            totalScore += sectionScore
            break
          case 'passfail':
            totalScore += sectionScore === 1 ? maxScore : 0
            break
          case 'percentage':
            totalScore += (sectionScore / 100) * maxScore
            break
        }
      }
    })

    const scorePercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0

    return { 
      completionPercentage, 
      totalScore: Math.round(totalScore * 10) / 10, 
      maxPossibleScore, 
      scorePercentage,
      completedScorableSections: completedScorableSections.length,
      totalScorableSections: scorableSections.length
    }
  }

  const { 
    completionPercentage, 
    totalScore, 
    maxPossibleScore, 
    scorePercentage,
    completedScorableSections,
    totalScorableSections
  } = calculateScores()

  const handleSubmitAttempt = (isDraft: boolean = false) => {
    if (!form.title.trim()) {
      setPendingSubmitType(isDraft ? 'draft' : 'create')
      setShowValidationModal(true)
      return
    }
    handleSubmit(isDraft)
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true)
    try {
      const reportData = {
        ...form,
        // Could add status field here: status: isDraft ? 'Draft' : 'InProgress'
      }
      const report = await createReportMutation.mutateAsync(reportData)
      
      // Navigate back to property overview with success
      const status = isDraft ? 'draft' : 'created'
      navigate(`/site-management/properties/${propertyId}?${status}=${report.id}`)
    } catch (error) {
      console.error('Failed to create report:', error)
      alert('Failed to create report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleValidationModalSubmit = () => {
    if (form.title.trim() && pendingSubmitType) {
      setShowValidationModal(false)
      handleSubmit(pendingSubmitType === 'draft')
      setPendingSubmitType(null)
    }
  }

  const handleCancel = () => {
    navigate(`/site-management/properties/${propertyId}`)
  }

  if (propertiesLoading || (templateId && templateLoading)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-red-500">Property not found (ID: {propertyId})</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (templateId && !template) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-red-500">Template not found (ID: {templateId})</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">New Site Report</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{property.propertyName}</span>
                <span>•</span>
                <span>{template ? template.name : 'Free-form Report'}</span>
                {templateSections.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="font-medium">{completionPercentage}% Complete</span>
                    {totalScorableSections > 0 && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-green-600">
                          Score: {totalScore}/{maxPossibleScore} ({scorePercentage}%)
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <Button variant="outline" onClick={handleCancel} className="px-6">
              Cancel
            </Button>
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-8">
            {/* Report Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Report Title *
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={template ? `${template.name} - ${new Date().toLocaleDateString()}` : "e.g., Monthly Quality Audit"}
                  required
                  className="h-12 text-base"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Report Date
                </label>
                <div className="relative w-48">
                  <Input
                    type="date"
                    value={form.reportDate}
                    onChange={(e) => setForm(prev => ({ ...prev, reportDate: e.target.value }))}
                    className="h-12 text-base w-full"
                  />
                </div>
              </div>
            </div>

            {/* Template Sections */}
            {templateSections.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-bold text-gray-900">Report Sections</h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 rounded-full px-4 py-2">
                      <span className="text-sm font-medium text-gray-700">
                        {templateSections.filter(s => sectionScores[s.id]?.score !== undefined).length} of {templateSections.length} sections
                      </span>
                    </div>
                    {totalScorableSections > 0 && (
                      <div className="bg-green-100 rounded-full px-4 py-2">
                        <span className="text-sm font-medium text-green-700">
                          {completedScorableSections} of {totalScorableSections} scored
                        </span>
                      </div>
                    )}
                  </div>
                </div>
            
                {templateSections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => {
                    const isCompleted = sectionScores[section.id]?.score !== undefined;
                    const sectionNumber = index + 1;
                    const sectionPhotos = sectionScores[section.id]?.photos || [];
                    
                    return (
                      <div key={section.id} className={`border-2 rounded-xl p-6 transition-all ${
                        isCompleted 
                          ? 'border-green-200 bg-green-50/30' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}>
                        {/* Section Header with Score */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {isCompleted ? <Check size={20} /> : sectionNumber}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-lg font-semibold text-gray-900">{section.name}</h4>
                                {section.required && (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                    Required
                                  </span>
                                )}
                              </div>
                              {section.description && (
                                <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                              )}
                            </div>
                          </div>
                          
                          {/* Score Selection in Header */}
                          {section.scoreType !== 'none' && (
                            <div className="w-40">
                              <Select 
                                value={sectionScores[section.id]?.score?.toString() || ''}
                                onValueChange={(value) => setSectionScores(prev => ({
                                  ...prev,
                                  [section.id]: { 
                                    ...prev[section.id], 
                                    score: value ? Number(value) : undefined 
                                  }
                                }))}
                                className="h-10"
                              >
                                {getScoreOptions(section).map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          )}
                        </div>

                        {/* Notes Section (First) */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Notes & Observations
                          </label>
                          <textarea
                            value={sectionScores[section.id]?.notes || ''}
                            onChange={(e) => setSectionScores(prev => ({
                              ...prev,
                              [section.id]: { ...prev[section.id], notes: e.target.value }
                            }))}
                            placeholder={`Add notes for ${section.name}...`}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-sm"
                          />
                        </div>

                        {/* Photo Section */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-gray-700">
                              Photos
                            </label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById(`photo-${section.id}`)?.click()}
                              className="flex items-center gap-2"
                            >
                              <Camera size={16} />
                              Add Photos
                            </Button>
                            <input 
                              id={`photo-${section.id}`}
                              type="file" 
                              accept="image/*" 
                              multiple 
                              capture="environment"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(section.id, e.target.files)}
                            />
                          </div>

                          {/* Photo Grid with Individual Notes */}
                          {sectionPhotos.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {sectionPhotos.map((photo, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                  <div className="relative">
                                    <img
                                      src={URL.createObjectURL(photo.file)}
                                      alt={`Upload ${index + 1}`}
                                      className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <button
                                      onClick={() => removePhoto(section.id, index)}
                                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Photo Notes
                                    </label>
                                    <textarea
                                      value={photo.notes}
                                      onChange={(e) => updatePhotoNotes(section.id, index, e.target.value)}
                                      placeholder="Describe this photo..."
                                      rows={2}
                                      className="w-full px-3 py-2 border border-gray-300 rounded text-xs resize-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Additional Notes */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Notes</h3>
              <textarea
                value={form.notes}
                onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes or observations..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Thin Progress Bar */}
          {templateSections.length > 0 && (
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
              size="sm"
            >
              ← Back
            </Button>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => handleSubmitAttempt(true)}
                disabled={isSubmitting}
                variant="outline"
                size="sm"
                className="bg-gray-50"
              >
                {isSubmitting ? 'Saving...' : 'Save as Draft'}
              </Button>
              <Button 
                onClick={() => handleSubmitAttempt(false)}
                disabled={isSubmitting}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? 'Creating...' : 'Create Report'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Modal */}
      <Dialog open={showValidationModal} onOpenChange={setShowValidationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Report Title Required
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">Please enter a title for your report before saving.</p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Report Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter report title..."
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowValidationModal(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleValidationModalSubmit}
                disabled={!form.title.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {pendingSubmitType === 'draft' ? 'Save as Draft' : 'Create Report'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}