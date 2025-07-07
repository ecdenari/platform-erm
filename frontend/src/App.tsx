import { Routes, Route } from 'react-router-dom'
import { useTenant } from './hooks/useTenant'
import { SidebarProvider } from './contexts/SidebarContext'
import { SubNavProvider } from './contexts/SubNavContext'
import AppLayout from './layout/AppLayout'
import Dashboard from './modules/Dashboard'
import Properties from './modules/Properties'
import Contacts from './modules/Contacts'
import Companies from './modules/Companies'
import WorkOrders from './modules/WorkOrders'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { tenant, loading } = useTenant()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Platform-ERM
          </h1>
          <p className="text-gray-600">
            Unable to resolve tenant. Please check your configuration.
          </p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <SubNavProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties/*" element={<Properties />} />
            <Route path="/contacts/*" element={<Contacts />} />
            <Route path="/companies/*" element={<Companies />} />
            <Route path="/workorders/*" element={<WorkOrders />} />
          </Routes>
        </AppLayout>
      </SubNavProvider>
    </SidebarProvider>
  )
}

export default App