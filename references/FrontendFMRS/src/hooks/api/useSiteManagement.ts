import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

// Property types with Site Management context
export interface PropertyWithReports {
  id: number
  propertyID: number
  propertyName: string
  address: string
  isActive: boolean
  propertyStatusName: string
  propertyType: string
  branchName: string
  accountOwnerContactName: string
  productionManagerContactName: string
  // Site Management specific fields
  totalReports: number
  draftReports: number
  completedReports: number
  lastReportDate?: string
  overallScore?: number
}

// Site Report types
export interface SiteReportListItem {
  id: number
  propertyID: number
  title: string
  status: string
  reportDate: string
  createdByUserName: string
  createdDate: string
  completedByUserName?: string
  completedDate?: string
  overallScore?: number
  maxPossibleScore?: number
  propertyName: string
  propertyAddress: string
  sectionCount: number
  photoCount: number
  issueCount: number
}

export interface SiteReportDetail {
  id: number
  propertyID: number
  templateId?: number
  title: string
  description?: string
  status: string
  reportDate: string
  createdByUserID: number
  createdByUserName: string
  createdDate: string
  completedByUserID?: number
  completedByUserName?: string
  completedDate?: string
  notes?: string
  gpsLatitude?: string
  gpsLongitude?: string
  weatherConditions?: string
  temperature?: string
  overallScore?: number
  maxPossibleScore?: number
  propertyName: string
  propertyAddress: string
  templateName?: string
  sectionCount: number
  photoCount: number
  issueCount: number
  sections: SiteReportSection[]
  photos: SiteReportPhoto[]
  issues: SiteReportIssue[]
}

export interface SiteReportSection {
  id: number
  reportId: number
  sectionName: string
  sectionType?: string
  score?: number
  maxScore?: number
  scoreType?: string
  scoreLabel?: string
  notes?: string
  recommendations?: string
  priority?: string
  status: string
  sectionOrder: number
  photoCount: number
}

export interface SiteReportPhoto {
  id: number
  reportId: number
  sectionId?: number
  fileName: string
  filePath: string
  caption?: string
  description?: string
  gpsLatitude?: string
  gpsLongitude?: string
  photoTakenDate?: string
  photoType?: string
  issueType?: string
  uploadedByUserName: string
  uploadedDate: string
  photoOrder: number
  isActive: boolean
  sectionName?: string
  photoUrl: string
}

export interface SiteReportIssue {
  id: number
  reportId: number
  sectionId?: number
  title: string
  description: string
  issueType: string
  severity: string
  status: string
  priority?: string
  gpsLatitude: string
  gpsLongitude: string
  targetResolutionDate?: string
  assignedToUserName?: string
  reportedByUserName: string
  reportedDate: string
  requiresFollowUp: boolean
}

export interface CreateSiteReport {
  propertyID: number
  templateId?: number
  title: string
  description?: string
  reportDate: string
  notes?: string
  gpsLatitude?: string
  gpsLongitude?: string
  weatherConditions?: string
  temperature?: string
}

export interface SiteReportFilter {
  propertyID?: number
  status?: string
  startDate?: string
  endDate?: string
  createdByUserID?: number
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: string
}

// Properties with Site Management context
export const usePropertiesWithReports = () => {
  return useQuery<PropertyWithReports[]>({
    queryKey: ['properties-with-reports'],
    queryFn: async () => {
      // Use dedicated Site Management properties endpoint
      const properties = await api.get('/api/Properties/GetSiteManagementProperties')
      
      return properties.map((property: any) => ({
        id: property.Id || property.id,
        propertyID: property.PropertyID || property.propertyID,
        propertyName: property.PropertyName || property.propertyName,
        address: property.address || property.Address || '',
        isActive: property.IsActive ?? property.isActive,
        propertyStatusName: property.PropertyStatusName || property.propertyStatusName || '',
        propertyType: property.PropertyType || property.propertyType || '',
        branchName: property.BranchName || property.branchName || '',
        accountOwnerContactName: property.AccountOwnerContactName || property.accountOwnerContactName || '',
        productionManagerContactName: property.ProductionManagerContactName || property.productionManagerContactName || '',
        // Real report data from stored procedure
        totalReports: property.TotalReports || property.totalReports || 0,
        draftReports: property.DraftReports || property.draftReports || 0,
        completedReports: property.CompletedReports || property.completedReports || 0,
        lastReportDate: property.LastReportDate || property.lastReportDate || undefined,
        overallScore: property.OverallScore || property.overallScore || undefined,
      }))
    },
  })
}

// Site Reports
export const useSiteReports = (filter?: SiteReportFilter) => {
  return useQuery<SiteReportListItem[]>({
    queryKey: ['site-reports', filter],
    queryFn: async () => {
      const response = await api.post('/api/SiteReport/search', filter || {})
      return response
    },
    enabled: true, // Always enabled, filter can be empty
  })
}

export const useSiteReport = (id: number) => {
  return useQuery<SiteReportDetail>({
    queryKey: ['site-report', id],
    queryFn: async () => {
      return api.get(`/api/SiteReport/${id}`)
    },
    enabled: !!id,
  })
}

export const useCreateSiteReport = () => {
  const queryClient = useQueryClient()
  
  return useMutation<SiteReportDetail, Error, CreateSiteReport>({
    mutationFn: async (reportData) => {
      return api.post('/api/SiteReport', reportData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-reports'] })
      queryClient.invalidateQueries({ queryKey: ['properties-with-reports'] })
    },
  })
}

export const useUpdateSiteReport = () => {
  const queryClient = useQueryClient()
  
  return useMutation<SiteReportDetail, Error, { id: number; data: Partial<CreateSiteReport> }>({
    mutationFn: async ({ id, data }) => {
      return api.put(`/api/SiteReport/${id}`, { id, ...data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-reports'] })
      queryClient.invalidateQueries({ queryKey: ['site-report'] })
    },
  })
}

export const useDeleteSiteReport = () => {
  const queryClient = useQueryClient()
  
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      return api.delete(`/api/SiteReport/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-reports'] })
      queryClient.invalidateQueries({ queryKey: ['properties-with-reports'] })
    },
  })
}

export const useUpdateSiteReportStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation<void, Error, { id: number; status: string }>({
    mutationFn: async ({ id, status }) => {
      return api.patch(`/api/SiteReport/${id}/status`, status)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-reports'] })
      queryClient.invalidateQueries({ queryKey: ['site-report'] })
    },
  })
}

export const useCompleteSiteReport = () => {
  const queryClient = useQueryClient()
  
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      return api.patch(`/api/SiteReport/${id}/complete`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-reports'] })
      queryClient.invalidateQueries({ queryKey: ['site-report'] })
    },
  })
}

// Site Report Statistics
export const useSiteReportStatistics = () => {
  return useQuery<{
    totalReports: number
    draftReports: number
    inReviewReports: number
    completedReports: number
    totalProperties: number
    averageScore: number
    recentActivity: Array<{
      id: number
      propertyName: string
      action: string
      date: string
      user: string
    }>
  }>({
    queryKey: ['site-report-statistics'],
    queryFn: async () => {
      return api.get('/api/SiteReport/statistics')
    },
  })
}