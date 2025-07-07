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
  const [tenant, setTenant] = useState<TenantInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const resolveTenant = async () => {
      try {
        // For development, try to get tenant from localStorage first
        const devTenantId = localStorage.getItem('dev-tenant-id')
        if (devTenantId && import.meta.env.DEV) {
          const response = await api.get(`/api/internal/tenants/${devTenantId}`)
          setTenant(response.data)
        } else {
          // Try to resolve tenant from current context
          const response = await api.get('/api/internal/tenants/current')
          setTenant(response.data)
        }
      } catch (err) {
        console.error('Error resolving tenant:', err)
        setError('Unable to resolve tenant')
        
        // For development, set a default tenant
        if (import.meta.env.DEV) {
          setTenant({
            id: 'demo',
            name: 'Demo Company',
            subdomain: 'demo',
            features: ['properties', 'contacts', 'workorders'],
            branding: {
              primaryColor: '#3b82f6',
            },
          })
        }
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