import { apiClient } from '../../../api/client'
import {
  Property,
  PropertyDetail,
  CreateProperty,
  UpdateProperty,
  PropertyListResponse,
  PropertyFilters
} from '../types'

const PROPERTIES_BASE_URL = '/api/internal/properties'

export const propertyApi = {
  // Get paginated list of properties
  getProperties: async (filters?: PropertyFilters): Promise<PropertyListResponse> => {
    const params = new URLSearchParams()
    
    if (filters) {
      if (filters.search) params.append('search', filters.search)
      if (filters.propertyType) params.append('propertyType', filters.propertyType)
      if (filters.status) params.append('status', filters.status)
      if (filters.companyId) params.append('companyId', filters.companyId.toString())
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)
      if (filters.pageNumber) params.append('pageNumber', filters.pageNumber.toString())
      if (filters.pageSize) params.append('pageSize', filters.pageSize.toString())
    }
    
    const { data } = await apiClient.get<PropertyListResponse>(
      `${PROPERTIES_BASE_URL}?${params.toString()}`
    )
    return data
  },

  // Get single property with full details
  getProperty: async (id: number): Promise<PropertyDetail> => {
    const { data } = await apiClient.get<PropertyDetail>(`${PROPERTIES_BASE_URL}/${id}`)
    return data
  },

  // Create new property
  createProperty: async (property: CreateProperty): Promise<Property> => {
    const { data } = await apiClient.post<Property>(PROPERTIES_BASE_URL, property)
    return data
  },

  // Update existing property
  updateProperty: async (id: number, property: UpdateProperty): Promise<Property> => {
    const { data } = await apiClient.put<Property>(`${PROPERTIES_BASE_URL}/${id}`, property)
    return data
  },

  // Delete property (soft delete)
  deleteProperty: async (id: number): Promise<void> => {
    await apiClient.delete(`${PROPERTIES_BASE_URL}/${id}`)
  },

  // Export properties to CSV
  exportProperties: async (filters?: PropertyFilters): Promise<Blob> => {
    const params = new URLSearchParams()
    
    if (filters) {
      if (filters.search) params.append('search', filters.search)
      if (filters.propertyType) params.append('propertyType', filters.propertyType)
      if (filters.status) params.append('status', filters.status)
      if (filters.companyId) params.append('companyId', filters.companyId.toString())
    }
    
    const { data } = await apiClient.get(`${PROPERTIES_BASE_URL}/export?${params.toString()}`, {
      responseType: 'blob'
    })
    return data
  },

  // Bulk update properties
  bulkUpdateProperties: async (propertyIds: number[], updates: Partial<UpdateProperty>): Promise<void> => {
    await apiClient.patch(`${PROPERTIES_BASE_URL}/bulk`, {
      propertyIds,
      updates
    })
  },

  // Get properties by company
  getPropertiesByCompany: async (companyId: number): Promise<Property[]> => {
    const { data } = await apiClient.get<Property[]>(`${PROPERTIES_BASE_URL}/company/${companyId}`)
    return data
  }
}