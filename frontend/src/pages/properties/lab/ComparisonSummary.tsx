import React from 'react'
import { 
  CheckCircle, XCircle, AlertCircle,
  Zap, Users, Map, Clock, DollarSign,
  Layout, Smartphone, Shield, Globe
} from 'lucide-react'

interface ComparisonData {
  feature: string
  icon: React.ElementType
  serviceTitanV1: string
  serviceTitanV2: string
  lmnV1: string
  lmnV2: string
  aspireV1: string
  aspireV2: string
}

export const ComparisonSummary: React.FC = () => {
  const comparisonData: ComparisonData[] = [
    {
      feature: 'Information Density',
      icon: Layout,
      serviceTitanV1: 'Maximum (3-col)',
      serviceTitanV2: 'High (tabs)',
      lmnV1: 'Medium (split)',
      lmnV2: 'Low (wizard)',
      aspireV1: 'High (hierarchy)',
      aspireV2: 'Minimal'
    },
    {
      feature: 'Time to Complete',
      icon: Clock,
      serviceTitanV1: '~2 min',
      serviceTitanV2: '~3 min',
      lmnV1: '~3 min',
      lmnV2: '~5 min',
      aspireV1: '~3 min',
      aspireV2: '~1 min'
    },
    {
      feature: 'Map Integration',
      icon: Map,
      serviceTitanV1: 'None',
      serviceTitanV2: 'Basic',
      lmnV1: 'Primary',
      lmnV2: 'Secondary',
      aspireV1: 'Optional',
      aspireV2: 'None'
    },
    {
      feature: 'Service Focus',
      icon: Zap,
      serviceTitanV1: 'Checkbox list',
      serviceTitanV2: 'Settings tab',
      lmnV1: 'Visual toggles',
      lmnV2: 'Service-first',
      aspireV1: 'Contract-based',
      aspireV2: 'Opportunity'
    },
    {
      feature: 'Mobile Ready',
      icon: Smartphone,
      serviceTitanV1: 'Desktop only',
      serviceTitanV2: 'Desktop focus',
      lmnV1: 'Responsive',
      lmnV2: 'Mobile friendly',
      aspireV1: 'Desktop focus',
      aspireV2: 'Desktop only'
    },
    {
      feature: 'Commercial Focus',
      icon: Users,
      serviceTitanV1: 'High',
      serviceTitanV2: 'High',
      lmnV1: 'Medium',
      lmnV2: 'Medium',
      aspireV1: 'Very High',
      aspireV2: 'Very High'
    }
  ]

  const getRatingIcon = (value: string) => {
    if (value.includes('Very High') || value.includes('Primary') || value.includes('~1 min')) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else if (value.includes('None') || value.includes('Desktop only') || value.includes('~5 min')) {
      return <XCircle className="h-4 w-4 text-red-500" />
    } else {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Feature Comparison Matrix</h2>
        <p className="text-sm text-gray-600 mt-1">
          Compare key characteristics across all property creation variations
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-blue-600 uppercase tracking-wider" colSpan={2}>
                ServiceTitan
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-green-600 uppercase tracking-wider" colSpan={2}>
                LMN
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-purple-600 uppercase tracking-wider" colSpan={2}>
                Aspire
              </th>
            </tr>
            <tr>
              <th className="px-6 py-2"></th>
              <th className="px-3 py-2 text-center text-xs text-gray-500">V1</th>
              <th className="px-3 py-2 text-center text-xs text-gray-500">V2</th>
              <th className="px-3 py-2 text-center text-xs text-gray-500">V1</th>
              <th className="px-3 py-2 text-center text-xs text-gray-500">V2</th>
              <th className="px-3 py-2 text-center text-xs text-gray-500">V1</th>
              <th className="px-3 py-2 text-center text-xs text-gray-500">V2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {comparisonData.map((row, index) => {
              const Icon = row.icon
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{row.feature}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRatingIcon(row.serviceTitanV1)}
                      <span className="text-sm text-gray-600">{row.serviceTitanV1}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRatingIcon(row.serviceTitanV2)}
                      <span className="text-sm text-gray-600">{row.serviceTitanV2}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRatingIcon(row.lmnV1)}
                      <span className="text-sm text-gray-600">{row.lmnV1}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRatingIcon(row.lmnV2)}
                      <span className="text-sm text-gray-600">{row.lmnV2}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRatingIcon(row.aspireV1)}
                      <span className="text-sm text-gray-600 italic">{row.aspireV1}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRatingIcon(row.aspireV2)}
                      <span className="text-sm text-gray-600 italic">{row.aspireV2}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Recommendations */}
      <div className="px-6 py-4 bg-gray-50 border-t">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">For Power Users</div>
              <div className="text-gray-600">ServiceTitan V1 or V2 for maximum efficiency</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Map className="h-4 w-4 text-green-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">For Field Teams</div>
              <div className="text-gray-600">LMN V1 with map-first approach</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Users className="h-4 w-4 text-purple-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">For Enterprise</div>
              <div className="text-gray-600">Aspire V1 for commercial hierarchy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}