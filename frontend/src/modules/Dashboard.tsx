import React from 'react'
import { useTenant } from '../hooks/useTenant'
import PageLayout from '../layout/PageLayout'
import LayoutDemo from '../components/LayoutDemo'
import LayoutBoundsTest from '../components/LayoutBoundsTest'
import { Building2, Users, MapPin, ClipboardList } from 'lucide-react'

const Dashboard: React.FC = () => {
  const { tenant } = useTenant()

  const stats = [
    {
      name: 'Properties',
      value: '24',
      icon: MapPin,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      name: 'Companies',
      value: '8',
      icon: Building2,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      name: 'Contacts',
      value: '156',
      icon: Users,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      name: 'Work Orders',
      value: '42',
      icon: ClipboardList,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <PageLayout
      title={`Welcome to ${tenant?.name || 'Platform-ERM'}`}
      description="Manage your landscape business with Platform-ERM's comprehensive tools."
    >
      <div className="space-y-6">
      
      {/* Layout Demo */}
      <LayoutDemo />

      {/* Layout Bounds Test */}
      <LayoutBoundsTest />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {[
                {
                  content: 'New property "Oak Grove Mall" added',
                  time: '2 hours ago',
                },
                {
                  content: 'Work order #1234 completed',
                  time: '4 hours ago',
                },
                {
                  content: 'Contact "John Smith" updated',
                  time: '1 day ago',
                },
              ].map((item, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <div className="h-2 w-2 bg-gray-600 rounded-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <p className="text-sm text-gray-900">{item.content}</p>
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </PageLayout>
  )
}

export default Dashboard