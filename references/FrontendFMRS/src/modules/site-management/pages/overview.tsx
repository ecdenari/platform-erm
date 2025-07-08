import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { usePropertiesWithReports, useSiteReportStatistics } from "@/hooks/api/useSiteManagement";

export default function SiteManagementOverview() {
  const { data: properties } = usePropertiesWithReports()
  const { data: statistics } = useSiteReportStatistics()

  // Calculate overview metrics from properties data
  const totalProperties = properties?.length || 0
  const activeProperties = properties?.filter(p => p.isActive).length || 0
  const totalReports = properties?.reduce((sum, p) => sum + p.totalReports, 0) || 0
  const draftReports = properties?.reduce((sum, p) => sum + p.draftReports, 0) || 0
  const completedReports = properties?.reduce((sum, p) => sum + p.completedReports, 0) || 0
  
  // Recent activity from properties with recent reports
  const recentActivity = properties
    ?.filter(p => p.lastReportDate)
    .sort((a, b) => new Date(b.lastReportDate!).getTime() - new Date(a.lastReportDate!).getTime())
    .slice(0, 5) || []

  return (
    <div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProperties}</div>
            <div className="text-sm text-green-600 mt-1">
              {activeProperties} active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalReports}</div>
            <div className="text-sm text-gray-600 mt-1">
              {completedReports} completed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Draft Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{draftReports}</div>
            <div className="text-sm text-gray-600 mt-1">
              Need completion
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {properties && properties.length > 0 
                ? Math.round(properties
                    .filter(p => p.overallScore)
                    .reduce((sum, p) => sum + (p.overallScore || 0), 0) / 
                    properties.filter(p => p.overallScore).length)
                : 0}%
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Overall quality
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Link to="/site-management/properties">
                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  View All Properties
                </Button>
              </Link>
              
              <Link to="/site-management/site-reports">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Manage Site Reports
                </Button>
              </Link>
              
              <Link to="/site-management/customer-reports">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                  Customer Reports
                </Button>
              </Link>
              
              <Button variant="outline" className="w-full justify-start" disabled>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Report Templates (Coming Soon)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((property, index) => (
                  <div key={property.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium text-sm">{property.propertyName}</div>
                      <div className="text-xs text-gray-500">
                        Last report: {new Date(property.lastReportDate!).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      {property.overallScore && (
                        <div className={`text-sm font-medium ${
                          property.overallScore >= 90 ? 'text-green-600' :
                          property.overallScore >= 80 ? 'text-blue-600' :
                          property.overallScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {property.overallScore}%
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        {property.totalReports} reports
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No recent activity</p>
                <p className="text-sm mt-1">Create your first site report to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 