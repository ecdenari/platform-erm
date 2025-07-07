import React from 'react';
import { Users, UserCheck, Activity, TrendingUp, Droplets, MapPin } from 'lucide-react';
import { useUsers } from '../hooks/useUser';

const AdminDashboard = () => {
  const { data: users, isLoading } = useUsers();
  const userCount = Array.isArray(users) ? users.length : 0;

  const stats = [
    {
      name: 'Total Users',
      value: isLoading ? '...' : userCount,
      icon: Users,
      change: '+2.1%',
      changeType: 'positive' as const,
    },
    {
      name: 'Active Sessions',
      value: '12',
      icon: Activity,
      change: '+5.4%',
      changeType: 'positive' as const,
    },
    {
      name: 'Properties',
      value: '8',
      icon: MapPin,
      change: '+1.2%',
      changeType: 'positive' as const,
    },
    {
      name: 'Controllers',
      value: '24',
      icon: Droplets,
      change: '-0.8%',
      changeType: 'negative' as const,
    },
  ];

  const recentActivity = [
    { user: 'Admin User', action: 'Logged in', time: '2 minutes ago' },
    { user: 'John Smith', action: 'Created irrigation schedule', time: '1 hour ago' },
    { user: 'Sarah Johnson', action: 'Updated property settings', time: '3 hours ago' },
    { user: 'Mike Davis', action: 'Completed inspection', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-slate-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-slate-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-slate-900">{stat.value}</div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm rounded-lg border border-slate-200">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activityIdx}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center ring-8 ring-white">
                          <UserCheck className="h-4 w-4 text-slate-500" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-slate-500">
                            <span className="font-medium text-slate-900">{activity.user}</span> {activity.action}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-slate-500">
                          {activity.time}
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

      {/* Quick Actions */}
      <div className="bg-white shadow-sm rounded-lg border border-slate-200">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <button className="relative block w-full p-4 border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-red-600" />
                <span className="text-sm font-medium text-slate-900">Add New User</span>
              </div>
            </button>
            <button className="relative block w-full p-4 border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-red-600" />
                <span className="text-sm font-medium text-slate-900">Add Property</span>
              </div>
            </button>
            <button className="relative block w-full p-4 border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 text-red-600" />
                <span className="text-sm font-medium text-slate-900">View Reports</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 