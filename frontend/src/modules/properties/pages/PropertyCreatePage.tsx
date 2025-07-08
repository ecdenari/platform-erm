import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PropertyForm } from '../components'

export const PropertyCreatePage: React.FC = () => {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/properties')
  }

  const handleCancel = () => {
    navigate('/properties')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="flex items-center text-sm">
            <button
              onClick={() => navigate('/properties')}
              className="text-gray-500 hover:text-gray-700"
            >
              Properties
            </button>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">New Property</span>
          </nav>
          <h1 className="mt-2 text-2xl font-semibold text-gray-900">Create New Property</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new property to your portfolio
          </p>
        </div>

        <PropertyForm 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}