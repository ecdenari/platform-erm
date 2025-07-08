import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

// Template types
export interface ReportTemplate {
  id: number
  name: string
  description?: string
  sections: string // JSON string
  isActive: boolean
  createdByUserID: number
  createdByUserName: string
  createdDate: string
  modifiedByUserID?: number
  modifiedByUserName?: string
  modifiedDate?: string
  version: number
}

export interface ReportTemplateListItem {
  id: number
  name: string
  description?: string
  isActive: boolean
  createdByUserName: string
  createdDate: string
  version: number
  reportsCount: number
}

export interface CreateReportTemplate {
  name: string
  description?: string
  sections: string
  isActive: boolean
}

export interface UpdateReportTemplate {
  id: number
  name: string
  description?: string
  sections: string
  isActive: boolean
}

export interface TemplateSection {
  id: string
  name: string
  type: string
  scoreType: 'numerical' | 'passfail' | 'percentage' | 'none'
  maxScore?: number
  required: boolean
  order: number
  description?: string
}

// API Hooks
export const useReportTemplates = () => {
  return useQuery<ReportTemplateListItem[]>({
    queryKey: ['report-templates'],
    queryFn: async () => {
      return api.get('/api/SiteReportTemplate')
    },
  })
}

export const useActiveReportTemplates = () => {
  return useQuery<ReportTemplateListItem[]>({
    queryKey: ['report-templates', 'active'],
    queryFn: async () => {
      return api.get('/api/SiteReportTemplate/active')
    },
  })
}

export const useReportTemplate = (id: number) => {
  return useQuery<ReportTemplate>({
    queryKey: ['report-template', id],
    queryFn: async () => {
      return api.get(`/api/SiteReportTemplate/${id}`)
    },
    enabled: !!id,
  })
}

export const useCreateReportTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation<ReportTemplate, Error, CreateReportTemplate>({
    mutationFn: async (templateData) => {
      return api.post('/api/SiteReportTemplate', templateData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-templates'] })
    },
  })
}

export const useUpdateReportTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation<ReportTemplate, Error, UpdateReportTemplate>({
    mutationFn: async (templateData) => {
      return api.put(`/api/SiteReportTemplate/${templateData.id}`, templateData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-templates'] })
      queryClient.invalidateQueries({ queryKey: ['report-template'] })
    },
  })
}

export const useDeleteReportTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      return api.delete(`/api/SiteReportTemplate/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-templates'] })
    },
  })
}

export const useToggleTemplateStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      return api.patch(`/api/SiteReportTemplate/${id}/toggle-status`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-templates'] })
    },
  })
}

// Helper functions for template sections
export const parseTemplateSections = (sectionsJson: string): TemplateSection[] => {
  try {
    return JSON.parse(sectionsJson)
  } catch {
    return []
  }
}

export const stringifyTemplateSections = (sections: TemplateSection[]): string => {
  return JSON.stringify(sections, null, 2)
}