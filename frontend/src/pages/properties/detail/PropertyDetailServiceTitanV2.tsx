import React, { useState } from 'react'
import { PropertyDetail } from '../../../modules/properties/types'

interface PropertyDetailServiceTitanV2Props {
  property: PropertyDetail
  onEdit?: () => void
  onDelete?: () => void
}

type TabType = 'summary' | 'jobs' | 'estimates' | 'invoices' | 'maintenance' | 'locations' | 'contacts' | 'activity'

export const PropertyDetailServiceTitanV2: React.FC<PropertyDetailServiceTitanV2Props> = ({ 
  property,
  onEdit,
  onDelete 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary')
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'jobs' | 'efficiency'>('revenue')

  const tabs: { key: TabType; label: string; count?: number; badge?: string }[] = [
    { key: 'summary', label: 'Summary' },
    { key: 'jobs', label: 'Jobs', count: 47 },
    { key: 'estimates', label: 'Estimates', count: 12, badge: '3 pending' },
    { key: 'invoices', label: 'Invoices', count: 42 },
    { key: 'maintenance', label: 'Maintenance Plans', count: 2 },
    { key: 'locations', label: 'Locations', count: 1 },
    { key: 'contacts', label: 'Contacts', count: property.propertyContacts?.length },
    { key: 'activity', label: 'Activity' },
  ]

  const renderMetricsPanel = () => (
    <div className="bg-white border border-gray-200 rounded">
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-900">Performance Metrics</h3>
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="text-xs border-gray-200 rounded px-2 py-1"
          >
            <option value="revenue">Revenue</option>
            <option value="jobs">Jobs</option>
            <option value="efficiency">Efficiency</option>
          </select>
        </div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-xl font-bold text-green-600">$24,567</div>
            <div className="text-xs text-gray-500">This Year</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-xl font-bold text-gray-900">$18,234</div>
            <div className="text-xs text-gray-500">Last Year</div>
          </div>
        </div>
        <div className="mt-3 h-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
          Revenue Chart
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-sm font-semibold text-gray-900">98%</div>
            <div className="text-xs text-gray-500">On-Time</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">4.8</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">2.3h</div>
            <div className="text-xs text-gray-500">Avg Time</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="grid grid-cols-12 gap-3">
            {/* Main Content - 9 cols */}
            <div className="col-span-9 space-y-3">
              {/* Key Information Strip */}
              <div className="bg-white border border-gray-200 rounded px-4 py-3">
                <div className="grid grid-cols-6 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Property Type</span>
                    <p className="font-semibold text-gray-900 mt-0.5">{property.propertyType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Square Footage</span>
                    <p className="font-semibold text-gray-900 mt-0.5">
                      {property.squareFootage ? property.squareFootage.toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Acreage</span>
                    <p className="font-semibold text-gray-900 mt-0.5">
                      {property.acreageSize ? property.acreageSize + ' acres' : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Account #</span>
                    <p className="font-semibold text-gray-900 mt-0.5 font-mono">
                      ACC-{property.companyId.toString().padStart(5, '0')}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Service Area</span>
                    <p className="font-semibold text-gray-900 mt-0.5">Zone 3</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Priority</span>
                    <p className="font-semibold text-orange-600 mt-0.5">Premium</p>
                  </div>
                </div>
              </div>

              {/* Upcoming Jobs */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-900">Upcoming Jobs</h3>
                  <div className="flex items-center space-x-2">
                    <button className="text-xs text-blue-600 hover:text-blue-700">Schedule New</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-xs text-blue-600 hover:text-blue-700">View Calendar</button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="px-3 py-2 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-1 h-8 rounded ${i === 1 ? 'bg-red-500' : i === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-blue-600">JOB-00{i}234</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs font-medium text-gray-900">Landscape Maintenance</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {i === 1 ? 'Tomorrow' : i === 2 ? 'Thu, Dec 14' : 'Mon, Dec 18'} • 
                            {i === 1 ? '8:00 AM' : i === 2 ? '10:30 AM' : '2:00 PM'} • 
                            Tech: {i === 1 ? 'J. Smith' : i === 2 ? 'M. Johnson' : 'R. Williams'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          i === 1 ? 'bg-red-100 text-red-800' : 
                          i === 2 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {i === 1 ? 'Urgent' : i === 2 ? 'Scheduled' : 'Confirmed'}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    View All 12 Scheduled Jobs →
                  </button>
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-xs font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-3">
                  <div className="space-y-3">
                    {[
                      { type: 'job', action: 'Job #JOB-004567 completed', time: '2 hours ago', user: 'J. Smith' },
                      { type: 'invoice', action: 'Invoice #INV-2341 sent', time: '4 hours ago', user: 'System' },
                      { type: 'estimate', action: 'Estimate #EST-789 approved', time: 'Yesterday', user: 'Client' },
                      { type: 'note', action: 'Added note about gate code', time: '2 days ago', user: 'M. Johnson' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                          activity.type === 'job' ? 'bg-green-500' :
                          activity.type === 'invoice' ? 'bg-blue-500' :
                          activity.type === 'estimate' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-900">{activity.action}</div>
                          <div className="text-xs text-gray-500">
                            {activity.time} • {activity.user}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service History & Notes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-gray-200 rounded">
                  <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-xs font-semibold text-gray-900">Service Preferences</h3>
                  </div>
                  <div className="p-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Preferred Day</span>
                      <span className="font-medium">Tuesday</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time Window</span>
                      <span className="font-medium">Morning (8-12)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gate Code</span>
                      <span className="font-mono font-medium">1234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Special Instructions</span>
                      <span className="font-medium text-blue-600 cursor-pointer">View</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded">
                  <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-xs font-semibold text-gray-900">Property Notes</h3>
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-700 space-y-1">
                      <p>• Dog in backyard - friendly but loud</p>
                      <p>• Use side gate for equipment access</p>
                      <p>• Owner prefers text updates</p>
                    </div>
                    <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                      Add Note +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - 3 cols */}
            <div className="col-span-3 space-y-3">
              {/* Company Info */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-xs font-semibold text-gray-900">Company</h3>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium text-gray-900">{property.company.name}</div>
                  <div className="text-xs text-gray-500 mt-1">Customer since 2019</div>
                  <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                    {property.company.phone && (
                      <div className="text-xs text-gray-600">{property.company.phone}</div>
                    )}
                    {property.company.email && (
                      <div className="text-xs text-gray-600 truncate">{property.company.email}</div>
                    )}
                  </div>
                  <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                    View Account →
                  </button>
                </div>
              </div>

              {/* Metrics Panel */}
              {renderMetricsPanel()}

              {/* Tags & Categories */}
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-xs font-semibold text-gray-900">Tags & Categories</h3>
                </div>
                <div className="p-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Commercial</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Weekly Service</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Premium</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">+3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'jobs':
        return (
          <div className="bg-white border border-gray-200 rounded">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Job History</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="text-xs px-2 py-1 border border-gray-200 rounded w-48"
                  />
                  <select className="text-xs px-2 py-1 border border-gray-200 rounded">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Scheduled</option>
                  </select>
                  <button className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    New Job
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Job #</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Technician</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...Array(10)].map((_, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2 whitespace-nowrap text-xs font-mono text-blue-600">
                        JOB-00{4567 - i}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-900">Maintenance</td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                        {new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600">J. Smith</td>
                      <td className="px-3 py-2 text-xs text-gray-600">2.5 hrs</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs font-medium text-gray-900">$450</td>
                      <td className="px-3 py-2 text-xs">
                        <button className="text-blue-600 hover:text-blue-700">INV-{2341 - i}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white border border-gray-200 rounded p-8">
            <p className="text-sm text-gray-500 text-center">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon...
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header with Status Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-2 flex items-center justify-between bg-blue-50 border-b border-blue-100">
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-blue-700 font-medium">Property Details</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">ID: PROP-{property.id.toString().padStart(5, '0')}</span>
            <span className="text-gray-400">|</span>
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
              property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {property.status}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-500">Last activity: 2 hours ago</span>
            <button className="text-blue-600 hover:text-blue-700">Refresh</button>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">{property.name}</h1>
              <p className="text-xs text-gray-600 mt-0.5">
                {property.fullAddress}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                <span className="mr-1">📞</span> Call
              </button>
              <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                <span className="mr-1">📧</span> Email
              </button>
              <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                <span className="mr-1">📍</span> Directions
              </button>
              <div className="w-px h-4 bg-gray-300"></div>
              <button
                onClick={onEdit}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
              >
                Edit
              </button>
              <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                ⋮
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4">
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative py-2 px-1 text-xs font-medium ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`ml-1 text-xs ${
                    activeTab === tab.key ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    ({tab.count})
                  </span>
                )}
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 px-1 py-0.5 bg-red-500 text-white text-xs rounded">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {renderTabContent()}
      </div>
    </div>
  )
}