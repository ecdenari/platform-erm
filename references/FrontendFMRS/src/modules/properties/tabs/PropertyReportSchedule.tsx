import { useOutletContext } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { PropertyWithReports } from "@/hooks/api/useSiteManagement"

interface PropertyContext {
  property: PropertyWithReports
}

export default function PropertyReportSchedule() {
  const { property } = useOutletContext<PropertyContext>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Scheduling</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Automated Report Scheduling Coming Soon
          </h3>
          
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            Schedule automatic customer reports to be generated and sent on a recurring basis. 
            Configure weekly, bi-weekly, monthly, or quarterly reports with custom templates 
            and distribution lists.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Flexible Scheduling</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Set up daily, weekly, monthly, or custom intervals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Custom Recipients</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Configure different distribution lists per schedule
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Smart Templates</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Use dynamic templates that pull latest data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Button className="bg-gray-400 hover:bg-gray-500" disabled>
              Coming Soon
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}