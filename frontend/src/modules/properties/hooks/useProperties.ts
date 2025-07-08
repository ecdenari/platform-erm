import { useQuery, useMutation, useQueryClient } from 'react-query'
import { propertyApi } from '../api/propertyApi'
import {
  PropertyFilters,
  CreateProperty,
  UpdateProperty
} from '../types'

// Query keys
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters: PropertyFilters) => [...propertyKeys.lists(), filters] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id: number) => [...propertyKeys.details(), id] as const,
  byCompany: (companyId: number) => [...propertyKeys.all, 'company', companyId] as const,
}

// Get properties list with filters
export const useProperties = (filters?: PropertyFilters) => {
  return useQuery(
    propertyKeys.list(filters || {}),
    () => propertyApi.getProperties(filters),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      keepPreviousData: true, // Keep previous data while fetching new page
    }
  )
}

// Get single property details
export const useProperty = (id: number) => {
  return useQuery(
    propertyKeys.detail(id),
    () => propertyApi.getProperty(id),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      enabled: !!id,
    }
  )
}

// Get properties by company
export const usePropertiesByCompany = (companyId: number) => {
  return useQuery(
    propertyKeys.byCompany(companyId),
    () => propertyApi.getPropertiesByCompany(companyId),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      enabled: !!companyId,
    }
  )
}

// Create property mutation
export const useCreateProperty = () => {
  const queryClient = useQueryClient()
  
  return useMutation(
    (newProperty: CreateProperty) => propertyApi.createProperty(newProperty),
    {
      onSuccess: () => {
        // Invalidate all property lists to refetch with new property
        queryClient.invalidateQueries(propertyKeys.lists())
      },
    }
  )
}

// Update property mutation
export const useUpdateProperty = () => {
  const queryClient = useQueryClient()
  
  return useMutation(
    ({ id, property }: { id: number; property: UpdateProperty }) =>
      propertyApi.updateProperty(id, property),
    {
      onSuccess: (data, variables) => {
        // Update the specific property in cache
        queryClient.setQueryData(propertyKeys.detail(variables.id), data)
        // Invalidate lists to refetch
        queryClient.invalidateQueries(propertyKeys.lists())
      },
    }
  )
}

// Delete property mutation
export const useDeleteProperty = () => {
  const queryClient = useQueryClient()
  
  return useMutation(
    (id: number) => propertyApi.deleteProperty(id),
    {
      onSuccess: (_, id) => {
        // Remove from cache
        queryClient.removeQueries(propertyKeys.detail(id))
        // Invalidate lists
        queryClient.invalidateQueries(propertyKeys.lists())
      },
    }
  )
}

// Bulk update properties mutation
export const useBulkUpdateProperties = () => {
  const queryClient = useQueryClient()
  
  return useMutation(
    ({ propertyIds, updates }: { propertyIds: number[]; updates: Partial<UpdateProperty> }) =>
      propertyApi.bulkUpdateProperties(propertyIds, updates),
    {
      onSuccess: () => {
        // Invalidate all properties since we don't know which ones were updated
        queryClient.invalidateQueries(propertyKeys.all)
      },
    }
  )
}

// Export properties mutation
export const useExportProperties = () => {
  return useMutation(
    (filters?: PropertyFilters) => propertyApi.exportProperties(filters),
    {
      onSuccess: (blob) => {
        // Create download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `properties-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      },
    }
  )
}