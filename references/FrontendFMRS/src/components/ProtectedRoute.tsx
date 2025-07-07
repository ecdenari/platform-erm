import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  // Optional module access requirement
  requireModule?: 'irrigation' | 'siteManagement' | 'equipment' | 'admin'
  // Optional admin level requirement for the module
  requireAdminLevel?: 'read' | 'write' | 'full'
  // Optional specific feature requirement
  requireFeature?: string
  // Optional platform admin requirement
  requirePlatformAdmin?: boolean
  // Custom fallback component instead of redirect
  fallback?: React.ReactNode
  // Custom redirect path (defaults to /login)
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireModule,
  requireAdminLevel,
  requireFeature,
  requirePlatformAdmin = false,
  fallback,
  redirectTo = '/login',
}) => {
  const location = useLocation()
  const { 
    isAuthenticated, 
    isLoading, 
    canAccessModule, 
    hasModuleAdminAccess, 
    hasFeaturePermission, 
    isPlatformAdmin 
  } = useAuth()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Check platform admin requirement
  if (requirePlatformAdmin && !isPlatformAdmin()) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
          <p className="text-sm text-gray-600">
            You need platform administrator privileges to access this area.
          </p>
        </div>
      </div>
    )
  }

  // Check module access requirement
  if (requireModule && !canAccessModule(requireModule)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Module Access Required</h3>
          <p className="text-sm text-gray-600">
            You don't have permission to access the {requireModule} module.
          </p>
        </div>
      </div>
    )
  }

  // Check admin level requirement
  if (requireModule && requireAdminLevel && !hasModuleAdminAccess(requireModule, requireAdminLevel)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Access Required</h3>
          <p className="text-sm text-gray-600">
            You need {requireAdminLevel} level admin access to the {requireModule} module.
          </p>
        </div>
      </div>
    )
  }

  // Check feature permission requirement
  if (requireModule && requireFeature && !hasFeaturePermission(requireModule, requireFeature)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Access Denied</h3>
          <p className="text-sm text-gray-600">
            You don't have permission to access the {requireFeature} feature.
          </p>
        </div>
      </div>
    )
  }

  // All checks passed - render the protected content
  return <>{children}</>
}

// Higher-order component version for easier use
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requirements?: Omit<ProtectedRouteProps, 'children'>
) => {
  return (props: P) => (
    <ProtectedRoute {...requirements}>
      <Component {...props} />
    </ProtectedRoute>
  )
}

// Specific module protection components for convenience
export const IrrigationProtectedRoute: React.FC<Omit<ProtectedRouteProps, 'requireModule'>> = (props) => (
  <ProtectedRoute {...props} requireModule="irrigation" />
)

export const SiteManagementProtectedRoute: React.FC<Omit<ProtectedRouteProps, 'requireModule'>> = (props) => (
  <ProtectedRoute {...props} requireModule="siteManagement" />
)

export const EquipmentProtectedRoute: React.FC<Omit<ProtectedRouteProps, 'requireModule'>> = (props) => (
  <ProtectedRoute {...props} requireModule="equipment" />
)

export const AdminProtectedRoute: React.FC<Omit<ProtectedRouteProps, 'requireModule'>> = (props) => (
  <ProtectedRoute {...props} requireModule="admin" />
)

export default ProtectedRoute