/**
 * Dynamic API Configuration
 * Automatically detects hostname and sets appropriate backend URL
 * - localhost:5173 → localhost:5032 (desktop)
 * - 192.168.x.x:5173 → 192.168.x.x:5032 (mobile/tablet)
 */

export function getApiBaseUrl(): string {
  // Check if we have an environment override (highest priority)
  const envApiUrl = import.meta.env.VITE_API_BASE_URL
  if (envApiUrl) {
    // Ensure environment URL ends with slash
    return envApiUrl.endsWith('/') ? envApiUrl : `${envApiUrl}/`
  }

  // Get current hostname and port
  const hostname = window.location.hostname
  const protocol = window.location.protocol

  // Backend always runs on port 5032
  const backendPort = '5032'

  // Build dynamic API URL based on current hostname
  const dynamicApiUrl = `${protocol}//${hostname}:${backendPort}/`

  // Log the detection in development mode
  if (import.meta.env.VITE_DEBUG_MODE === 'true') {
    console.log('🔗 Dynamic API URL Detection:', {
      currentUrl: window.location.href,
      hostname,
      protocol,
      detectedApiUrl: dynamicApiUrl,
      envOverride: envApiUrl || 'none'
    })
  }

  return dynamicApiUrl
}

/**
 * API Configuration object
 */
export const apiConfig = {
  baseURL: getApiBaseUrl(),
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'), // Increased for mobile
  
  // Helper to check if we're running on network IP (mobile/tablet)
  isNetworkAccess: () => {
    const hostname = window.location.hostname
    return hostname !== 'localhost' && hostname !== '127.0.0.1'
  },
  
  // Helper to get current access type
  getAccessType: () => {
    return apiConfig.isNetworkAccess() ? 'network' : 'localhost'
  }
}

export default apiConfig