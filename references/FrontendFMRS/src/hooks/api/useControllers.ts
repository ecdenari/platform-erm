import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

// Controller types based on backend DTOs
export interface ControllerListItem {
  id: number
  controllerName: string
  propertyId: number
  propertyName: string
  manufacturerId: number
  manufacturerName: string
  modelId: number
  modelName: string
  isActive: boolean
  faultCount: number
  zoneCount: number
  createdAt?: string
}

export interface CreateControllerData {
  controllerName: string
  propertyId: number
  manufacturerId: number
  modelId: number
  zones: ControllerZone[]
  programs: ControllerProgram[]
  seasonalAdjustments: SeasonalAdjustment[]
}

export interface ControllerZone {
  zoneNumber: number
  zoneName: string
  plantTypeId: number
  soilTypeId: number
  sprinklerId: number
  valveSizeId: number
  coverage: number
  flow: number
  isActive: boolean
}

export interface ControllerProgram {
  programNumber: number
  programName: string
  startTimeId: number
  runtimeId: number
  isActive: boolean
  selectedZones: number[]
}

export interface SeasonalAdjustment {
  month: number
  adjustmentPercent: number
}

// Master data interfaces
export interface Manufacturer {
  id: number
  name: string
}

export interface Model {
  id: number
  name: string
  manufacturerId: number
}

export interface PlantType {
  id: number
  name: string
}

export interface SoilType {
  id: number
  name: string
}

export interface SprinklerType {
  id: number
  name: string
}

export interface ValveSize {
  id: number
  size: string
}

export interface ProgramRuntime {
  id: number
  runtime: string
  minutes: number
}

// Controller hooks
export const useControllers = (propertyId?: number) => {
  return useQuery<ControllerListItem[]>({
    queryKey: ['controllers', propertyId],
    queryFn: async () => {
      const url = propertyId 
        ? `/api/ControllersHandler/GetControllerList?propertyId=${propertyId}`
        : '/api/ControllersHandler/GetControllerList'
      return api.get<ControllerListItem[]>(url)
    },
  })
}

export const useControllerDetails = (controllerId: number) => {
  return useQuery({
    queryKey: ['controller-details', controllerId],
    queryFn: async () => {
      return api.get(`/api/ControllersHandler/GetControllerDetailsById/${controllerId}`)
    },
    enabled: !!controllerId,
  })
}

export const useCreateController = () => {
  const queryClient = useQueryClient()
  
  return useMutation<any, Error, CreateControllerData>({
    mutationFn: async (controllerData) => {
      return api.post('/api/ControllersHandler/CreateController', controllerData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['controllers'] })
      queryClient.invalidateQueries({ queryKey: ['properties'] })
    },
  })
}

export const useUpdateController = () => {
  const queryClient = useQueryClient()
  
  return useMutation<any, Error, { controllerId: number } & Partial<CreateControllerData>>({
    mutationFn: async ({ controllerId, ...updateData }) => {
      return api.put(`/api/ControllersHandler/ModifyControllerDetails/${controllerId}`, updateData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['controllers'] })
      queryClient.invalidateQueries({ queryKey: ['controller-details'] })
    },
  })
}

// Master data hooks for controller creation
export const useManufacturers = () => {
  return useQuery<Manufacturer[]>({
    queryKey: ['manufacturers'],
    queryFn: async () => {
      return api.get<Manufacturer[]>('/api/Manufacturer/ManufacturersList')
    },
  })
}

export const useModels = (manufacturerId?: number) => {
  return useQuery<Model[]>({
    queryKey: ['models', manufacturerId],
    queryFn: async () => {
      const url = manufacturerId 
        ? `/api/Model/ModelList?manufacturerId=${manufacturerId}`
        : '/api/Model/ModelList'
      return api.get<Model[]>(url)
    },
  })
}

export const usePlantTypes = () => {
  return useQuery<PlantType[]>({
    queryKey: ['plant-types'],
    queryFn: async () => {
      return api.get<PlantType[]>('/api/PlantType/PlantTypeList')
    },
  })
}

export const useSoilTypes = () => {
  return useQuery<SoilType[]>({
    queryKey: ['soil-types'],
    queryFn: async () => {
      return api.get<SoilType[]>('/api/SoilType/SoilTypeList')
    },
  })
}

export const useSprinklerTypes = () => {
  return useQuery<SprinklerType[]>({
    queryKey: ['sprinkler-types'],
    queryFn: async () => {
      return api.get<SprinklerType[]>('/api/Sprinklers/SprinklerList')
    },
  })
}

export const useValveSizes = () => {
  return useQuery<ValveSize[]>({
    queryKey: ['valve-sizes'],
    queryFn: async () => {
      return api.get<ValveSize[]>('/api/ValveSize/ValveSizeList')
    },
  })
}

export const useProgramRuntimes = () => {
  return useQuery<ProgramRuntime[]>({
    queryKey: ['program-runtimes'],
    queryFn: async () => {
      return api.get<ProgramRuntime[]>('/api/ProgramRuntime/ProgramRuntimeList')
    },
  })
}

// Hook for getting all master data needed for controller creation
export const useControllerMasterData = () => {
  return useQuery({
    queryKey: ['controller-master-data'],
    queryFn: async () => {
      return api.get('/api/ControllersHandler/CreateControllerPageData')
    },
  })
}