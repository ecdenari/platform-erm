import { Outlet } from 'react-router-dom'

export default function SiteManagementLayout() {
  return (
    <div>
      {/* Simplified layout - header and navigation now handled by dual sidebar */}
      <Outlet />
    </div>
  )
}
