import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="px-6 pt-9 pb-0 w-full">
      <Outlet />
    </div>
  )
}
