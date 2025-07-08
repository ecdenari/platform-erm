import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/client'

interface TenantInfo {
  id: string
  name: string
  subdomain: string
  features: string[]
  branding: {
    primaryColor: string
    logo?: string
  }
}

interface TenantContextType {
  tenant: TenantInfo | null
  loading: boolean
  error: string | null
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  error: null,
})

export const useTenantContext = () => {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenantContext must be used within a TenantProvider')
  }
  return context
}

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with demo tenant in dev mode to prevent flashing
  const [tenant, setTenant] = useState<TenantInfo | null>(
    import.meta.env.DEV ? {
      id: 'demo',
      name: 'Demo Company',
      subdomain: 'demo',
      features: ['properties', 'contacts', 'workorders'],
      branding: {
        primaryColor: '#3b82f6',
      },
    } : null
  )
  const [loading, setLoading] = useState(false) // Set to false since we have default tenant
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Skip tenant resolution in development - we already have default tenant
    if (import.meta.env.DEV) {
      return
    }
    
    // Production logic - will implement when tenant endpoints are ready
    const resolveTenant = async () => {
      setLoading(true)
      try {
        const devTenantId = localStorage.getItem('dev-tenant-id')
        if (devTenantId) {
          const response = await api.get(`/api/internal/tenants/${devTenantId}`)
          setTenant(response.data)
        } else {
          const response = await api.get('/api/internal/tenants/current')
          setTenant(response.data)
        }
      } catch (err) {
        console.error('Error resolving tenant:', err)
        setError('Unable to resolve tenant')
      } finally {
        setLoading(false)
      }
    }

    resolveTenant()
  }, [])

  return (
    <TenantContext.Provider value={{ tenant, loading, error }}>
      {children}
    </TenantContext.Provider>
  )
}