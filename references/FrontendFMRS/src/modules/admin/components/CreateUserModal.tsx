import { useState } from 'react'
import { z } from 'zod'
import { useCreateUser, useUserRoles } from '../hooks/useUser'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Eye, EyeOff, UserPlus } from 'lucide-react'

// Dynamic role options loaded from backend

const userSchema = z
  .object({
    FirstName: z.string().min(1, 'First name is required'),
    LastName: z.string().min(1, 'Last name is required'),
    Email: z.string().email('Invalid email'),
    Phone: z.string().min(10, 'Phone number is required'),
    Password: z.string().min(6, 'Password must be at least 6 characters'),
    ConfirmPassword: z.string().min(6, 'Password confirmation is required'),
    RoleId: z.number(),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: 'Passwords do not match',
    path: ['ConfirmPassword'],
  })

interface CreateUserModalProps {
  open: boolean
  onClose: () => void
  onUserCreated: (user: any) => void
}

export default function CreateUserModal({
  open,
  onClose,
  onUserCreated,
}: CreateUserModalProps) {
  const { mutate: createUser, isPending } = useCreateUser()
  const { data: roles, isLoading: rolesLoading } = useUserRoles()

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Password: '',
    ConfirmPassword: '',
    RoleId: 4, // Default to Standard User (RoleId 4)
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'RoleId' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = () => {
    const validation = userSchema.safeParse(formData)

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message
      toast.error(firstError || 'Validation failed')
      return
    }

    createUser(formData, {
      onSuccess: (res) => {
        toast.success('User created successfully')
        onUserCreated(res.data)
        onClose()
        setFormData({
          FirstName: '',
          LastName: '',
          Email: '',
          Phone: '',
          Password: '',
          ConfirmPassword: '',
          RoleId: 4, // Reset to Standard User default
        })
      },
      onError: () => {
        toast.error('Failed to create user')
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>Add New User</DialogTitle>
              <p className="text-sm text-slate-600 mt-1">
                Create a new user account for the Fieldpoint platform
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-900 border-b border-slate-200 pb-2">
              Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  First Name *
                </label>
                <input
                  type="text"
                  name="FirstName"
                  placeholder="Enter first name"
                  value={formData.FirstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="LastName"
                  placeholder="Enter last name"
                  value={formData.LastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email Address *
              </label>
              <input
                type="email"
                name="Email"
                placeholder="Enter email address"
                value={formData.Email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Phone Number *
              </label>
              <input
                type="text"
                name="Phone"
                placeholder="Enter phone number"
                value={formData.Phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Security & Access Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-900 border-b border-slate-200 pb-2">
              Security & Access
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="Password"
                    placeholder="Enter password"
                    value={formData.Password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="ConfirmPassword"
                    placeholder="Confirm password"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Role *
              </label>
              <select
                name="RoleId"
                value={formData.RoleId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                disabled={rolesLoading}
              >
                {rolesLoading ? (
                  <option>Loading roles...</option>
                ) : (
                  roles?.map((role: any) => (
                    <option key={role.Id} value={role.Id}>
                      {role.RoleName}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The user will receive login credentials and can change their password after first login.
              </p>
            </div>
          </div>

        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPending ? 'Creating...' : 'Create User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
