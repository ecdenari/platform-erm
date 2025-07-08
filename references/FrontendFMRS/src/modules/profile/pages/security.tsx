import { useState } from 'react'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Key, Shield, Eye, EyeOff } from 'lucide-react'

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Security Settings</h3>
        <p className="text-sm text-slate-600">
          Manage your password and account security preferences.
        </p>
      </div>

      {/* Change Password Section */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div className="flex items-center mb-4">
          <Key className="w-5 h-5 text-green-600 mr-2" />
          <h4 className="text-md font-medium text-slate-900">Change Password</h4>
        </div>
        
        <form className="space-y-4 max-w-lg">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Password must be at least 6 characters long.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled>
            Update Password
          </Button>
        </form>
      </div>

      {/* Account Security Section */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-green-600 mr-2" />
          <h4 className="text-md font-medium text-slate-900">Account Security</h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-200 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
              <p className="text-xs text-slate-500">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm" disabled>
              Enable
            </Button>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-slate-200 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-slate-900">Login Notifications</p>
              <p className="text-xs text-slate-500">Get notified when someone logs into your account</p>
            </div>
            <Button variant="outline" size="sm" disabled>
              Configure
            </Button>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Active Sessions</p>
              <p className="text-xs text-slate-500">Manage devices that are currently logged in</p>
            </div>
            <Button variant="outline" size="sm" disabled>
              View Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}