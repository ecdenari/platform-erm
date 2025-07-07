import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { apiConfig } from '@/config/api'

// API Response Types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

// Token management
const TOKEN_KEY = import.meta.env.VITE_JWT_TOKEN_KEY || 'fieldpoint_auth_token'

export const tokenManager = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
  
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },
  
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  },
  
  hasToken(): boolean {
    return !!this.getToken()
  }
}

// Create Axios instance
const createApiClient = (): AxiosInstance => {
  const baseURL = apiConfig.baseURL
  const timeout = apiConfig.timeout

  const client = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Log API configuration in development
  if (import.meta.env.VITE_DEBUG_MODE === 'true') {
    console.log('🔧 API Client Configuration:', {
      baseURL,
      timeout,
      accessType: apiConfig.getAccessType(),
      isNetworkAccess: apiConfig.isNetworkAccess()
    })
  }

  // Request interceptor - Add JWT token to requests
  client.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = tokenManager.getToken()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      // Don't set Content-Type for FormData - let axios handle it
      if (config.data instanceof FormData && config.headers) {
        delete config.headers['Content-Type']
      }
      
      // Log requests in development
      if (import.meta.env.VITE_DEBUG_MODE === 'true') {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data,
          headers: config.headers,
        })
      }
      
      return config
    },
    (error) => {
      console.error('API Request Error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor - Handle responses and errors
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log responses in development
      if (import.meta.env.VITE_DEBUG_MODE === 'true') {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data,
        })
      }
      
      return response
    },
    (error) => {
      const { response, request, message } = error

      // Log errors in development
      if (import.meta.env.VITE_DEBUG_MODE === 'true') {
        console.error('❌ API Error:', error)
      }

      // Handle different error scenarios
      if (response) {
        // Server responded with error status
        const { status, data } = response
        
        switch (status) {
          case 401:
            // Unauthorized - token expired or invalid
            tokenManager.removeToken()
            // Redirect to login if not already there
            if (window.location.pathname !== '/login') {
              window.location.href = '/login'
            }
            break
            
          case 403:
            // Forbidden - insufficient permissions
            console.error('Access denied. Insufficient permissions.')
            break
            
          case 404:
            console.error('Resource not found.')
            break
            
          case 422:
            // Validation error
            console.error('Validation error:', data)
            break
            
          case 500:
            console.error('Internal server error. Please try again later.')
            break
            
          default:
            console.error(`API Error ${status}:`, data?.message || 'Unknown error')
        }
        
        // Return formatted error
        const apiError: ApiError = {
          message: data?.message || `Request failed with status ${status}`,
          errors: data?.errors,
          statusCode: status,
        }
        
        return Promise.reject(apiError)
      } else if (request) {
        // Network error - no response received
        console.error('Network Error Details:', {
          url: request.responseURL || error.config?.url,
          method: error.config?.method,
          timeout: error.config?.timeout,
          baseURL: error.config?.baseURL
        })
        const networkError: ApiError = {
          message: `Network error. URL: ${request.responseURL || error.config?.url}. Please check your connection and try again.`,
          statusCode: 0,
        }
        return Promise.reject(networkError)
      } else {
        // Request setup error
        const setupError: ApiError = {
          message: message || 'Request failed to send',
        }
        return Promise.reject(setupError)
      }
    }
  )

  return client
}

// Create and export the API client instance
export const apiClient = createApiClient()

// Convenience methods for common operations
export const api = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get(url, config).then(response => response.data),
    
  // POST request
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post(url, data, config).then(response => response.data),
    
  // PUT request
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put(url, data, config).then(response => response.data),
    
  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.patch(url, data, config).then(response => response.data),
    
  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete(url, config).then(response => response.data),
}

// Export token manager for use in auth components
export { TOKEN_KEY }
export default apiClient