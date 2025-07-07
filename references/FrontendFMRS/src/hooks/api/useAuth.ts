import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { LoginCredentials, AuthResponse } from '@/context/AuthContext'

// Types for user management
export interface CreateUserPayload {
  FirstName: string
  LastName: string
  Email: string
  Phone: string
  Password: string
  ConfirmPassword: string
  RoleId: number
}

export interface UpdateUserRolePayload {
  userId: number
  roleId: number
}

export interface BulkDeleteUsersPayload {
  userIds: number[]
}

export interface UserRole {
  id: number
  name: string
  description?: string
}

export interface UserListItem {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  roleId: number
  isActive: boolean
  createdAt?: string
  lastLogin?: string
}

// Authentication hooks
export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      return api.post<AuthResponse>('/api/Auth/Login', {
        Email: credentials.email,
        Password: credentials.password,
      })
    },
  })
}

// User management hooks for admin functionality
export const useUsers = () => {
  return useQuery<UserListItem[]>({
    queryKey: ['users'],
    queryFn: async () => {
      return api.get<UserListItem[]>('/api/User/GetAllActiveUsers')
    },
  })
}

export const useUserRoles = () => {
  return useQuery<UserRole[]>({
    queryKey: ['user-roles'],
    queryFn: async () => {
      return api.get<UserRole[]>('/api/User/GetAllRoles')
    },
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation<any, Error, CreateUserPayload>({
    mutationFn: async (userData) => {
      return api.post('/api/User/CreateNewUser', userData)
    },
    onSuccess: () => {
      // Invalidate users list to refresh data
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient()
  
  return useMutation<any, Error, UpdateUserRolePayload>({
    mutationFn: async (payload) => {
      return api.patch(`/api/User/UpdateUserRole?userId=${payload.userId}&roleId=${payload.roleId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useBulkDeleteUsers = () => {
  const queryClient = useQueryClient()
  
  return useMutation<any, Error, BulkDeleteUsersPayload>({
    mutationFn: async (payload) => {
      return api.post('/api/User/BulkDeleteUsers', payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

// Admin dashboard data hook
export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      return api.get('/api/User/AdminDashboardDetails')
    },
  })
}

// Password reset hooks
export const useSendResetPasswordLink = () => {
  return useMutation<any, Error, { email: string }>({
    mutationFn: async ({ email }) => {
      return api.get(`/api/User/SendResetPasswordLink?email=${encodeURIComponent(email)}`)
    },
  })
}

export const useResetPassword = () => {
  return useMutation<any, Error, { token: string; newPassword: string; confirmPassword: string }>({
    mutationFn: async (payload) => {
      return api.post('/api/User/ResetPassword', payload)
    },
  })
}

// Profile management types
export interface UpdateProfilePayload {
  FirstName: string
  LastName: string
  Email: string
  Phone?: string
}

export interface ChangePasswordPayload {
  CurrentPassword: string
  NewPassword: string
  ConfirmPassword: string
}

// Profile management hooks
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation<any, Error, UpdateProfilePayload>({
    mutationFn: async (profileData) => {
      return api.patch('/api/User/UpdateProfile', profileData)
    },
    onSuccess: () => {
      // Invalidate current user data to refresh
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}

export const useChangePassword = () => {
  return useMutation<any, Error, ChangePasswordPayload>({
    mutationFn: async (passwordData) => {
      return api.post('/api/User/ChangePassword', passwordData)
    },
  })
}