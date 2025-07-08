import { useAuthContext } from '@/context/AuthContext'

// Re-export the auth context hook with a more convenient name
export const useAuth = useAuthContext

// Additional convenience hooks for common use cases
export const useAuthUser = () => {
  const { user } = useAuth()
  return user
}

export const useAuthStatus = () => {
  const { isAuthenticated, isLoading } = useAuth()
  return { isAuthenticated, isLoading }
}

export const usePermissions = () => {
  const { 
    canAccessModule, 
    hasModuleAdminAccess, 
    hasFeaturePermission, 
    isPlatformAdmin, 
    isSuperAdmin 
  } = useAuth()
  
  return {
    canAccessModule,
    hasModuleAdminAccess,
    hasFeaturePermission,
    isPlatformAdmin,
    isSuperAdmin,
  }
}

// Convenience hooks for specific permission checks
export const useModuleAccess = (module: 'irrigation' | 'siteManagement' | 'equipment' | 'admin') => {
  const { canAccessModule } = useAuth()
  return canAccessModule(module)
}

export const useAdminAccess = (module: 'irrigation' | 'siteManagement' | 'equipment' | 'admin', level: 'read' | 'write' | 'full' = 'read') => {
  const { hasModuleAdminAccess } = useAuth()
  return hasModuleAdminAccess(module, level)
}

export const useFeatureAccess = (module: 'irrigation' | 'siteManagement' | 'equipment' | 'admin', feature: string) => {
  const { hasFeaturePermission } = useAuth()
  return hasFeaturePermission(module, feature)
}

// Hook for checking multiple permissions at once
export const usePermissionCheck = (checks: {
  module?: 'irrigation' | 'siteManagement' | 'equipment' | 'admin'
  adminLevel?: 'read' | 'write' | 'full'
  feature?: string
  requirePlatformAdmin?: boolean
}) => {
  const { canAccessModule, hasModuleAdminAccess, hasFeaturePermission, isPlatformAdmin } = useAuth()
  
  const results = {
    canAccess: true,
    hasAdminAccess: true,
    hasFeatureAccess: true,
    isPlatformAdmin: isPlatformAdmin(),
  }
  
  // Check module access
  if (checks.module) {
    results.canAccess = canAccessModule(checks.module)
  }
  
  // Check admin access
  if (checks.module && checks.adminLevel) {
    results.hasAdminAccess = hasModuleAdminAccess(checks.module, checks.adminLevel)
  }
  
  // Check feature access
  if (checks.module && checks.feature) {
    results.hasFeatureAccess = hasFeaturePermission(checks.module, checks.feature)
  }
  
  // Check platform admin requirement
  if (checks.requirePlatformAdmin) {
    results.isPlatformAdmin = isPlatformAdmin()
  }
  
  // Overall permission (all checks must pass)
  const hasPermission = results.canAccess && 
                       results.hasAdminAccess && 
                       results.hasFeatureAccess && 
                       (!checks.requirePlatformAdmin || results.isPlatformAdmin)
  
  return {
    ...results,
    hasPermission,
  }
}

export default useAuth