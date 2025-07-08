import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

// Property types based on backend DTOs
export interface PropertyListItem {
  id: number
  propertyID: number
  propertyName: string
  isActive: boolean
  propertyStatusID: number
  propertyStatusName: string
  propertyTypeID: number
  propertyType: string
  branchID: number
  branchName: string
  branchCode: string
  controllerCount: number
  faults: number
  totalInspectionIssues: number
}

export interface PropertyStatistics {
  totalProperties: number
  activeProperties: number
  inactiveProperties: number
  totalControllers: number
  totalFaults: number
  totalInspectionIssues: number
}

// Properties hooks
export const useProperties = () => {
  return useQuery<PropertyListItem[]>({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await api.get<PropertyListItem[]>('/api/Properties/GetIrrigationProperties')
      
      // Normalize property data to match frontend interface
      return response.map((item: any) => ({
        id: item.Id || item.id,
        propertyID: item.PropertyID || item.propertyID,
        propertyName: item.PropertyName || item.propertyName,
        isActive: item.IsActive ?? item.isActive,
        propertyStatusID: item.PropertyStatusID || item.propertyStatusID,
        propertyStatusName: item.PropertyStatusName || item.propertyStatusName,
        propertyTypeID: item.PropertyTypeID || item.propertyTypeID,
        propertyType: item.PropertyType || item.propertyType,
        branchID: item.BranchID || item.branchID,
        branchName: item.BranchName || item.branchName,
        branchCode: item.BranchCode || item.branchCode,
        controllerCount: item.ControllerCount ?? item.controllerCount ?? 0,
        faults: item.Faults ?? item.faults ?? 0,
        totalInspectionIssues: item.TotalInspectionIssues ?? item.totalInspectionIssues ?? 0,
      }))
    },
  })
}

export const usePropertyStatistics = () => {
  return useQuery<PropertyStatistics>({
    queryKey: ['property-statistics'],
    queryFn: async () => {
      return api.get<PropertyStatistics>('/api/Properties/GetPropertyStatistics')
    },
  })
}

export const useSwitchPropertyStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation<any, Error, { propertyId: number; isActive: boolean }>({
    mutationFn: async ({ propertyId, isActive }) => {
      return api.post('/api/Properties/SwitchPropertyStatus', {
        PropertyId: propertyId,
        IsActive: isActive,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      queryClient.invalidateQueries({ queryKey: ['property-statistics'] })
    },
  })
}

// Hook for properties count (used in dashboard)
export const usePropertiesCount = () => {
  return useQuery<number>({
    queryKey: ['properties-count'],
    queryFn: async () => {
      const properties = await api.get<PropertyListItem[]>('/api/Properties/GetIrrigationProperties')
      return properties.length
    },
  })
}