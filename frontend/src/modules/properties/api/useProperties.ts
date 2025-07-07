import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { propertyApi } from './propertyApi'
import type {
  Property,
  PropertyDetail,
  CreateProperty,
  UpdateProperty,
  PropertyFilters
} from '../types/property.types'

const PROPERTIES_QUERY_KEY = 'properties'

// Hook to get list of properties
export const useProperties = (filters?: PropertyFilters) => {
  return useQuery({
    queryKey: [PROPERTIES_QUERY_KEY, 'list', filters],
    queryFn: () => propertyApi.getProperties(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to get a single property detail
export const useProperty = (id: number | undefined) => {
  return useQuery({
    queryKey: [PROPERTIES_QUERY_KEY, 'detail', id],
    queryFn: () => propertyApi.getProperty(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook to create a new property
export const useCreateProperty = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (property: CreateProperty) => propertyApi.createProperty(property),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTIES_QUERY_KEY, 'list'] })
    },
  })
}

// Hook to update a property
export const useUpdateProperty = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, property }: { id: number; property: UpdateProperty }) => 
      propertyApi.updateProperty(id, property),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [PROPERTIES_QUERY_KEY, 'list'] })
      queryClient.invalidateQueries({ queryKey: [PROPERTIES_QUERY_KEY, 'detail', variables.id] })
    },
  })
}

// Hook to delete a property
export const useDeleteProperty = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => propertyApi.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTIES_QUERY_KEY, 'list'] })
    },
  })
}

// Hook to export properties
export const useExportProperties = () => {
  return useMutation({
    mutationFn: (filters?: PropertyFilters) => propertyApi.exportProperties(filters),
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
  })
}