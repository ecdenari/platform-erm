import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

// Types for Company Settings API
export interface CompanyAddress {
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

export interface CompanySettings {
  name: string
  phone?: string
  email?: string
  website?: string
  address?: CompanyAddress
  primaryLogoPath?: string
  loginLogoPath?: string
  documentLogoPath?: string
  primaryColor?: string
  supportEmail?: string
  notificationEmail?: string
  sessionTimeoutMinutes: number
  passwordMinLength: number
  requireTwoFactor: boolean
  documentTemplateSettings?: any
}

export interface CompanySettingsResponse {
  success: boolean
  message: string
  data?: CompanySettings
}

export interface UpdateCompanySettingsRequest {
  settings: CompanySettings
}

export interface LogoUploadResponse {
  success: boolean
  message: string
  logoPath?: string
}

// Hook to get company settings
export const useCompanySettings = () => {
  return useQuery<CompanySettingsResponse>({
    queryKey: ['companySettings'],
    queryFn: async () => {
      const response = await api.get<CompanySettingsResponse>('/api/CompanySettings')
      return response
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to update company settings
export const useUpdateCompanySettings = () => {
  const queryClient = useQueryClient()
  
  return useMutation<CompanySettingsResponse, Error, CompanySettings>({
    mutationFn: async (settings: CompanySettings) => {
      const response = await api.put<CompanySettingsResponse>('/api/CompanySettings', {
        settings
      })
      return response
    },
    onSuccess: () => {
      // Invalidate and refetch company settings
      queryClient.invalidateQueries({ queryKey: ['companySettings'] })
    },
  })
}

// Hook to upload company logo
export const useUploadLogo = () => {
  const queryClient = useQueryClient()
  
  return useMutation<LogoUploadResponse, Error, { file: File; logoType: string }>({
    mutationFn: async ({ file, logoType }) => {
      const formData = new FormData()
      formData.append('File', file)
      formData.append('LogoType', logoType)
      
      const response = await api.post<LogoUploadResponse>('/api/CompanySettings/upload-logo', formData)
      return response
    },
    onSuccess: () => {
      // Invalidate and refetch company settings to get updated logo paths
      queryClient.invalidateQueries({ queryKey: ['companySettings'] })
    },
  })
}