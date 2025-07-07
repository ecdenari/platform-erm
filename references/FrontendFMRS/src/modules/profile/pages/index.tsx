import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUpdateProfile, type UpdateProfilePayload } from '../hooks/useProfile'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { User, Mail, Phone } from 'lucide-react'
import { toast } from 'sonner'

export default function PersonalInformationPage() {
  const { user, refreshUser } = useAuth()
  const updateProfileMutation = useUpdateProfile()
  
  const [phone, setPhone] = useState(user?.phone || '')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const profileData: UpdateProfilePayload = {
      FirstName: user?.firstName || '',
      LastName: user?.lastName || '',
      Email: user?.email || '',
      Phone: phone.trim() || undefined,
    }

    try {
      await updateProfileMutation.mutateAsync(profileData)
      await refreshUser() // Refresh user context
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      console.error('Profile update error:', error)
      toast.error(error.message || 'Failed to update profile. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Personal Information</h3>
        <p className="text-sm text-slate-600">
          Update your personal details and contact information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* User Avatar Section */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {user?.firstName || user?.lastName 
              ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
              : user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-900">Profile Picture</h4>
            <p className="text-sm text-slate-500">JPG, GIF or PNG. 1MB max.</p>
            <Button variant="outline" size="sm" className="mt-2" disabled>
              Upload new picture
            </Button>
          </div>
        </div>

        {/* Name Fields - Read Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              First Name
            </label>
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900">
              {user?.firstName || 'Not set'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Last Name
            </label>
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900">
              {user?.lastName || 'Not set'}
            </div>
          </div>
        </div>

        {/* Email Field - Read Only */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900">
            {user?.email || 'Not set'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Contact your administrator to change your email address.
          </p>
        </div>

        {/* Phone Field - Editable */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="pl-10"
              placeholder="Enter your phone number"
              disabled={updateProfileMutation.isPending}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Optional - used for account recovery and notifications
          </p>
        </div>

        {/* Current Role Display */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Current Role
          </label>
          <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-600">
            {user?.role || 'Not assigned'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Contact your administrator to change your role.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={updateProfileMutation.isPending}
            className="flex items-center"
          >
            {updateProfileMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}