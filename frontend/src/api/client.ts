import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token and tenant info
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add tenant header for development
    const tenantId = localStorage.getItem('dev-tenant-id') || '1'
    if (import.meta.env.DEV) {
      config.headers['X-Tenant-Id'] = tenantId
      // Also set a default tenant ID in localStorage for consistency
      if (!localStorage.getItem('dev-tenant-id')) {
        localStorage.setItem('dev-tenant-id', '1')
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Skip redirect in development mode for now
      if (import.meta.env.DEV) {
        console.warn('401 Unauthorized - Auth not implemented yet')
        return Promise.reject(error)
      }
      
      // Handle unauthorized access in production
      localStorage.removeItem('auth-token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api