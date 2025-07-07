import { useState } from 'react'
import PageContainer from '@/layout/PageContainer'
import PageHeader from '@/components/PageHeader'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/Table'
import { Trash, Plus } from 'lucide-react'
import CreateUserModal from '../components/CreateUserModal'
import ChangePasswordModal from '../components/ChangePasswordModal'
import {
  useUsers,
  useBulkDeleteUsers,
  useUpdateUserRole,
  useUserRoles,
} from '../hooks/useUser'

export default function AdminUsersPage() {
  const [selectedUserIds, setSelectedUserIds] = useState<Set<number>>(new Set())
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const { data, isLoading, isError } = useUsers()
  const users = Array.isArray(data) ? data : []
  const deleteMutation = useBulkDeleteUsers()
  const { mutate: updateRole } = useUpdateUserRole()
  const { data: rolesData, isLoading: rolesLoading, isError: rolesError } = useUserRoles()
  const roles = Array.isArray(rolesData) ? rolesData : []

  const toggleUserSelection = (userId: number) => {
    setSelectedUserIds(prev => {
      const updated = new Set(prev)
      updated.has(userId) ? updated.delete(userId) : updated.add(userId)
      return updated
    })
  }

  const handleBulkDelete = async () => {
    await deleteMutation.mutateAsync({ userIds: Array.from(selectedUserIds) })
    setSelectedUserIds(new Set())
  }

  const handleRoleChange = (userId: number, roleName: string) => {
    const selectedRole = roles.find((role: any) => 
      role.roleName === roleName
    )
    
    if (selectedRole) {
      updateRole({ userId, roleId: selectedRole.roleId })
    } else {
      console.error('Role not found:', roleName)
    }
  }

  const handleUserCreated = () => {
    setShowAddUserModal(false)
  }

  const handlePasswordChange = (user: any) => {
    setSelectedUser(user)
    setShowPasswordModal(true)
  }

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false)
    setSelectedUser(null)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Users</h2>
            <p className="text-sm text-slate-600 mt-1">Manage Fieldpoint platform users and their permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleBulkDelete}
              disabled={!selectedUserIds.size || deleteMutation.isPending}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash className="w-4 h-4 mr-2" />
              {deleteMutation.isPending ? 'Deleting...' : 'Bulk Delete'}
            </Button>
            <Button onClick={() => setShowAddUserModal(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" /> Add User
            </Button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
            <p className="text-slate-500 text-sm mt-2">Loading users...</p>
          </div>
        ) : isError ? (
          <div className="p-8 text-center">
            <p className="text-red-500 text-sm">Failed to load users</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-medium text-slate-900 mb-1">No users found</h3>
            <p className="text-sm text-slate-500 mb-4">Get started by creating your first user.</p>
            <Button onClick={() => setShowAddUserModal(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" /> Add User
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden">
            <Table>
              <TableHead>
                <TableRow className="bg-slate-50 border-b border-slate-200">
                  <TableCell className="font-medium text-slate-700">
                    <Checkbox
                      checked={selectedUserIds.size === users.length && users.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedUserIds(new Set(users.map((u: any) => u.id)))
                        } else {
                          setSelectedUserIds(new Set())
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">Name</TableCell>
                  <TableCell className="font-medium text-slate-700">Email</TableCell>
                  <TableCell className="font-medium text-slate-700">Role</TableCell>
                  <TableCell className="font-medium text-slate-700">Status</TableCell>
                  <TableCell className="font-medium text-slate-700">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: any) => (
                  <TableRow key={user.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell>
                      <Checkbox
                        checked={selectedUserIds.has(user.id)}
                        onCheckedChange={() => toggleUserSelection(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email || 'Unknown User'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-slate-900">{user.email || 'No email'}</div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value: string) => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-auto min-w-[120px]">
                          {user.role || 'Select Role'}
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role: any) => (
                            <SelectItem key={role.roleId} value={role.roleName}>
                              {role.roleName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePasswordChange(user)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Change Password
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <CreateUserModal
        open={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onUserCreated={handleUserCreated}
      />

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={handlePasswordModalClose}
        user={selectedUser}
      />
    </div>
  )
}
