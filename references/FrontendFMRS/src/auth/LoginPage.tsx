import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCompanySettings } from '@/hooks/api/useCompanySettings'

interface LocationState {
  from?: {
    pathname: string
  }
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, isLoading } = useAuth()
  const { data: companySettings } = useCompanySettings()
  
  // Debug log to see what we're getting
  useEffect(() => {
    console.log('Login page - Company settings:', companySettings)
    console.log('Login logo path:', companySettings?.data?.loginLogoPath)
  }, [companySettings])
  
  // Get company logo for login page with cache busting
  const logoSrc = companySettings?.data?.loginLogoPath 
    ? `${import.meta.env.VITE_API_BASE_URL}${companySettings.data.loginLogoPath}?t=${Date.now()}`
    : '/puregreen-logo.png'
    
  const companyName = companySettings?.data?.name || 'PureGreen Land Group'
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the intended destination after login
  const state = location.state as LocationState
  const from = state?.from?.pathname || '/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate, from])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const result = await login({
        email: formData.email.trim(),
        password: formData.password,
      })

      if (result.success) {
        // Navigate to intended destination
        navigate(from, { replace: true })
      } else {
        // Show login error
        setErrors({
          submit: result.message || 'Login failed. Please try again.',
        })
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setErrors({
        submit: 'An unexpected error occurred. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl border border-slate-200">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src={logoSrc} 
            alt={companyName} 
            className="h-14 max-w-[200px] object-contain mx-auto mb-4"
            onError={(e) => {
              // Fallback to default logo
              e.currentTarget.src = '/puregreen-logo.png'
            }}
          />
          <h1 className="text-xl font-semibold text-slate-800">Management Portal</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? 'border-red-500 focus:ring-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Powered by Fieldpoint
          </p>
        </div>
      </div>
    </div>
  )
}