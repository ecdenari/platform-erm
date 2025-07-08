// src/modules/admin/components/UsersTable.tsx

import { useUsers, useUpdateUserRole, useBulkDeleteUsers } from '../hooks/useUser'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

interface User {
  Id: number
  FirstName: string
  LastName: string
  Email: string
  Phone: string
  Role: string
}

const roleOptions = ['Admin', 'User', 'Manager'] // TODO: Pull from backend if dynamic

export default function UsersTable() {
  const { data: users, isLoading, isError } = useUsers()
  const { mutate: updateUserRole } = useUpdateUserRole()
  const { mutate: bulkDeleteUsers, isPending: isDeleting } = useBulkDeleteUsers()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleRoleChange = (userId: number, newRole: string) => {
    const roleId = roleOptions.indexOf(newRole) + 1
    updateUserRole({ userId, roleId }, {
      onSuccess: () => toast.success('Role updated'),
      onError: () => toast.error('Failed to update role'),
    })
  }

  const handleCheckboxChange = (userId: number) => {
    setSelectedIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  const handleBulkDelete = () => {
    if (!confirm('Are you sure you want to delete selected users?')) return
    bulkDeleteUsers({ userIds: selectedIds }, {
      onSuccess: () => {
        toast.success('Users deleted')
        setSelectedIds([])
      },
      onError: () => toast.error('Failed to delete users'),
    })
  }

  const allSelected = users && selectedIds.length === users.length

  if (isLoading) return <div>Loading users...</div>
  if (isError) return <div>Error loading users.</div>

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <Button
          variant="destructive"
          onClick={handleBulkDelete}
          disabled={isDeleting}
        >
          Delete Selected ({selectedIds.length})
        </Button>
      )}
      <Table className="rounded-md shadow-sm border text-left text-sm">
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) =>
                  setSelectedIds(e.target.checked ? users.map((u: User) => u.Id) : [])
                }
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user: User) => (
            <TableRow key={user.Id}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.Id)}
                  onChange={() => handleCheckboxChange(user.Id)}
                />
              </TableCell>
              <TableCell>{user.FirstName} {user.LastName}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Phone}</TableCell>
              <TableCell>
                <select
                  value={user.Role}
                  onChange={(e) => handleRoleChange(user.Id, e.target.value)}
                  className="bg-transparent border-none text-sm"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
