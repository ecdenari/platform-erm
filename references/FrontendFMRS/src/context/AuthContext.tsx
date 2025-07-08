import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { tokenManager, api } from '@/lib/api'

// User types based on backend DTOs - Platform-wide user
export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  roleId: number
  // Platform-wide permissions
  permissions: PlatformPermissions
}

// Platform-wide permissions structure
export interface PlatformPermissions {
  // Global platform access
  platformAdmin: boolean
  
  // Module access and admin levels
  modules: {
    irrigation: ModulePermissions
    siteManagement: ModulePermissions  
    equipment: ModulePermissions
    admin: AdminModulePermissions
  }
}

// Standard module permissions
export interface ModulePermissions {
  // Basic access
  canAccess: boolean
  
  // Admin levels within the module
  adminLevel: 'none' | 'read' | 'write' | 'full' // none=user, read=view admin, write=edit admin, full=module admin
  
  // Feature-specific permissions
  features: {
    canView: boolean
    canCreate: boolean
    canEdit: boolean
    canDelete: boolean
    canManageSettings: boolean
    canViewReports: boolean
    canExportData: boolean
  }
}

// Special admin module permissions (platform administration)
export interface AdminModulePermissions extends Omit<ModulePermissions, 'adminLevel'> {
  // Admin module has different levels
  adminLevel: 'none' | 'module-admin' | 'platform-admin' | 'super-admin'
  
  // Platform-wide admin features
  features: ModulePermissions['features'] & {
    canManageUsers: boolean
    canManageRoles: boolean
    canManageModules: boolean
    canViewSystemLogs: boolean
    canManageSystemSettings: boolean
    canManageIntegrations: boolean
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

// Auth context type - Platform-wide authentication with granular permissions
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  logout: () => void
  refreshUser: () => Promise<void>
  
  // Permission checking methods
  canAccessModule: (module: keyof PlatformPermissions['modules']) => boolean
  hasModuleAdminAccess: (module: keyof PlatformPermissions['modules'], level?: 'read' | 'write' | 'full') => boolean
  hasFeaturePermission: (module: keyof PlatformPermissions['modules'], feature: string) => boolean
  isPlatformAdmin: () => boolean
  isSuperAdmin: () => boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to use auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

// Auth provider props
interface AuthProviderProps {
  children: ReactNode
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated
  const isAuthenticated = !!user && tokenManager.hasToken()

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth()
  }, [])

  // Initialize authentication state
  const initializeAuth = async () => {
    try {
      const token = tokenManager.getToken()
      console.log('🔍 Token exists during init:', !!token)
      if (token) {
        console.log('🔍 Parsing existing token during init...')
        // Validate token by fetching user profile
        await refreshUser()
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      // Clear invalid token
      tokenManager.removeToken()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Login function
  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      setIsLoading(true)

      // Call backend login API
      const response = await api.post<any>('/api/Auth/Login', {
        Email: credentials.email,
        Password: credentials.password,
      })

      // Debug: Log the full response to understand the structure
      console.log('🔍 Full Login Response:', response)

      // Handle backend response format (authStatus: 1 means success)
      if (response.authStatus === 1 && response.response) {
        // Store token (backend puts JWT in 'response' field)
        tokenManager.setToken(response.response)
        
        // Parse JWT token to get user info
        const tokenPayload = parseJwtToken(response.response)
        
        // Debug: Log token payload to see available fields
        console.log('🔍 JWT Token Payload:', tokenPayload)
        
        // Parse name from unique_name field
        const nameParts = tokenPayload?.unique_name?.split(' ') || []
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        // Build user object from JWT token
        const user: User = {
          id: parseInt(tokenPayload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'] || tokenPayload?.userId || '0'),
          firstName: firstName,
          lastName: lastName,
          email: tokenPayload?.email || credentials.email,
          phone: tokenPayload?.phone || '',
          role: tokenPayload?.role || 'Admin',
          roleId: parseInt(tokenPayload?.roleId || '1'),
          permissions: buildPermissionsFromRole(tokenPayload?.role || 'Admin', parseInt(tokenPayload?.roleId || '1')),
        }
        
        // Set user state
        setUser(user)

        return {
          success: true,
          message: 'Login successful',
          token: response.response,
          user: user,
        }
      } else {
        return {
          success: false,
          message: response.message || 'Login failed',
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Handle API errors
      const errorMessage = error.message || 'Login failed. Please try again.'
      
      return {
        success: false,
        message: errorMessage,
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    try {
      // Clear token
      tokenManager.removeToken()
      
      // Clear user state
      setUser(null)

      // Redirect to login page
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Refresh user profile
  const refreshUser = async (): Promise<void> => {
    try {
      // Note: Backend doesn't have a dedicated user profile endpoint
      // We'll need to use the user list endpoint and filter by current user
      // This is a temporary solution until backend adds a profile endpoint
      const token = tokenManager.getToken()
      if (!token) {
        throw new Error('No token available')
      }

      // For now, we'll decode the JWT token to get user info
      // In production, you'd want a proper user profile endpoint
      const tokenPayload = parseJwtToken(token)
      console.log('🔍 RefreshUser - JWT Token Payload:', tokenPayload)
      
      if (tokenPayload) {
        const role = tokenPayload.role || ''
        const roleId = parseInt(tokenPayload.roleId || '0')
        
        // Parse name from unique_name field
        const nameParts = tokenPayload?.unique_name?.split(' ') || []
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        const userData: User = {
          id: parseInt(tokenPayload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'] || tokenPayload?.userId || '0'),
          firstName: firstName,
          lastName: lastName,
          email: tokenPayload.email || '',
          phone: tokenPayload.phone || '',
          role: role,
          roleId: roleId,
          permissions: buildPermissionsFromRole(role, roleId),
        }
        console.log('🔍 RefreshUser - Built User Data:', userData)
        setUser(userData)
      } else {
        throw new Error('Invalid token')
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
      throw error
    }
  }

  // Parse JWT token (basic implementation)
  const parseJwtToken = (token: string): any => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Failed to parse JWT token:', error)
      return null
    }
  }

  // Permission checking methods
  const canAccessModule = (module: keyof PlatformPermissions['modules']): boolean => {
    if (!user?.permissions) return false
    return user.permissions.modules[module].canAccess
  }

  const hasModuleAdminAccess = (
    module: keyof PlatformPermissions['modules'], 
    level: 'read' | 'write' | 'full' = 'read'
  ): boolean => {
    if (!user?.permissions) return false
    
    const modulePerms = user.permissions.modules[module]
    const adminLevel = modulePerms.adminLevel
    
    // Check admin level hierarchy
    switch (level) {
      case 'read':
        return adminLevel !== 'none'
      case 'write':
        return adminLevel === 'write' || adminLevel === 'full' || adminLevel === 'platform-admin' || adminLevel === 'super-admin'
      case 'full':
        return adminLevel === 'full' || adminLevel === 'platform-admin' || adminLevel === 'super-admin'
      default:
        return false
    }
  }

  const hasFeaturePermission = (
    module: keyof PlatformPermissions['modules'], 
    feature: string
  ): boolean => {
    if (!user?.permissions) return false
    
    const moduleFeatures = user.permissions.modules[module].features as any
    return moduleFeatures[feature] === true
  }

  const isPlatformAdmin = (): boolean => {
    return user?.permissions?.platformAdmin === true
  }

  const isSuperAdmin = (): boolean => {
    if (!user?.permissions) return false
    return user.permissions.modules.admin.adminLevel === 'super-admin'
  }

  // Utility function to build permissions from backend role
  const buildPermissionsFromRole = (role: string, roleId: number): PlatformPermissions => {
    // Default permissions structure
    const defaultModulePerms: ModulePermissions = {
      canAccess: false,
      adminLevel: 'none',
      features: {
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canManageSettings: false,
        canViewReports: false,
        canExportData: false,
      }
    }

    const defaultAdminPerms: AdminModulePermissions = {
      canAccess: false,
      adminLevel: 'none',
      features: {
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canManageSettings: false,
        canViewReports: false,
        canExportData: false,
        canManageUsers: false,
        canManageRoles: false,
        canManageModules: false,
        canViewSystemLogs: false,
        canManageSystemSettings: false,
        canManageIntegrations: false,
      }
    }

    // Build permissions based on role
    switch (role.toLowerCase()) {
      case 'admin':
      case 'administrator':
        return {
          platformAdmin: true,
          modules: {
            irrigation: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'full',
              features: {
                canView: true,
                canCreate: true,
                canEdit: true,
                canDelete: true,
                canManageSettings: true,
                canViewReports: true,
                canExportData: true,
              }
            },
            siteManagement: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'full',
              features: {
                canView: true,
                canCreate: true,
                canEdit: true,
                canDelete: true,
                canManageSettings: true,
                canViewReports: true,
                canExportData: true,
              }
            },
            equipment: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'full',
              features: {
                canView: true,
                canCreate: true,
                canEdit: true,
                canDelete: true,
                canManageSettings: true,
                canViewReports: true,
                canExportData: true,
              }
            },
            admin: {
              ...defaultAdminPerms,
              canAccess: true,
              adminLevel: 'platform-admin',
              features: {
                canView: true,
                canCreate: true,
                canEdit: true,
                canDelete: true,
                canManageSettings: true,
                canViewReports: true,
                canExportData: true,
                canManageUsers: true,
                canManageRoles: true,
                canManageModules: true,
                canViewSystemLogs: true,
                canManageSystemSettings: true,
                canManageIntegrations: true,
              }
            }
          }
        }

      case 'irrigation manager':
      case 'manager':
        return {
          platformAdmin: false,
          modules: {
            irrigation: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'write',
              features: {
                canView: true,
                canCreate: true,
                canEdit: true,
                canDelete: false,
                canManageSettings: true,
                canViewReports: true,
                canExportData: true,
              }
            },
            siteManagement: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'read',
              features: {
                canView: true,
                canCreate: false,
                canEdit: false,
                canDelete: false,
                canManageSettings: false,
                canViewReports: true,
                canExportData: false,
              }
            },
            equipment: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'read',
              features: {
                canView: true,
                canCreate: false,
                canEdit: false,
                canDelete: false,
                canManageSettings: false,
                canViewReports: true,
                canExportData: false,
              }
            },
            admin: defaultAdminPerms
          }
        }

      case 'technician':
      default:
        return {
          platformAdmin: false,
          modules: {
            irrigation: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'none',
              features: {
                canView: true,
                canCreate: true,
                canEdit: true,
                canDelete: false,
                canManageSettings: false,
                canViewReports: true,
                canExportData: false,
              }
            },
            siteManagement: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'none',
              features: {
                canView: true,
                canCreate: false,
                canEdit: false,
                canDelete: false,
                canManageSettings: false,
                canViewReports: false,
                canExportData: false,
              }
            },
            equipment: {
              ...defaultModulePerms,
              canAccess: true,
              adminLevel: 'none',
              features: {
                canView: true,
                canCreate: false,
                canEdit: false,
                canDelete: false,
                canManageSettings: false,
                canViewReports: false,
                canExportData: false,
              }
            },
            admin: defaultAdminPerms
          }
        }
    }
  }

  // Context value
  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
    canAccessModule,
    hasModuleAdminAccess,
    hasFeaturePermission,
    isPlatformAdmin,
    isSuperAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext