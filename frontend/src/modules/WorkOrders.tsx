import React from 'react'
import PageLayout from '../layout/PageLayout'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { Plus } from 'lucide-react'

const WorkOrders: React.FC = () => {
  const breadcrumbs = useBreadcrumbs()

  const actions = (
    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
      <Plus className="h-4 w-4 mr-2" />
      Create Work Order
    </button>
  )

  return (
    <PageLayout
      title="Work Orders"
      description="Manage job scheduling, tracking, and completion status."
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-600">
            Work Orders module will be implemented here. This will include work order management, 
            scheduling, and tracking.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

export default WorkOrders