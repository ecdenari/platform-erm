import api from '../../../api/client'
import type {
  Property,
  PropertyDetail,
  CreateProperty,
  UpdateProperty,
  PropertyListResponse,
  PropertyFilters
} from '../types/property.types'

const PROPERTIES_BASE_URL = '/api/internal/properties'

export const propertyApi = {
  // Get all properties with filtering and pagination
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
    
    const response = await api.get(`${PROPERTIES_BASE_URL}?${params.toString()}`)
    return response.data
  },

  // Get a single property by ID
  getProperty: async (id: number): Promise<PropertyDetail> => {
    const response = await api.get(`${PROPERTIES_BASE_URL}/${id}`)
    return response.data
  },

  // Create a new property
  createProperty: async (property: CreateProperty): Promise<Property> => {
    const response = await api.post(PROPERTIES_BASE_URL, property)
    return response.data
  },

  // Update an existing property
  updateProperty: async (id: number, property: UpdateProperty): Promise<Property> => {
    const response = await api.put(`${PROPERTIES_BASE_URL}/${id}`, property)
    return response.data
  },

  // Delete a property
  deleteProperty: async (id: number): Promise<void> => {
    await api.delete(`${PROPERTIES_BASE_URL}/${id}`)
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
    
    const response = await api.get(`${PROPERTIES_BASE_URL}/export?${params.toString()}`, {
      responseType: 'blob'
    })
    return response.data
  }
}