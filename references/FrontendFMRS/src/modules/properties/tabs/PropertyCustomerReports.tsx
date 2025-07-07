import { useOutletContext } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { PropertyWithReports } from "@/hooks/api/useSiteManagement"

interface PropertyContext {
  property: PropertyWithReports
}

export default function PropertyCustomerReports() {
  const { property } = useOutletContext<PropertyContext>()

  // Mock customer reports data
  const mockCustomerReports = [
    {
      id: 1,
      title: "Monthly Service Summary - December 2024",
      sentDate: "2025-01-01",
      recipients: ["john@client.com", "mary@client.com"],
      status: "Delivered",
      openRate: "100%",
      format: "PDF",
      pages: 8,
      includedReports: 3
    },
    {
      id: 2,
      title: "Weekly Service Update - Week 52",
      sentDate: "2024-12-27",
      recipients: ["john@client.com"],
      status: "Delivered",
      openRate: "50%",
      format: "PDF",
      pages: 4,
      includedReports: 1
    },
    {
      id: 3,
      title: "Quarterly Property Review - Q4 2024",
      sentDate: "2024-12-15",
      recipients: ["john@client.com", "mary@client.com", "board@hoa.com"],
      status: "Delivered",
      openRate: "75%",
      format: "PDF",
      pages: 16,
      includedReports: 12
    }
  ]

  // Mock scheduled reports
  const mockScheduledReports = [
    {
      id: 1,
      title: "Monthly Service Summary",
      frequency: "Monthly",
      nextDate: "2025-02-01",
      recipients: 2,
      status: "Active"
    },
    {
      id: 2,
      title: "Weekly Service Update",
      frequency: "Weekly",
      nextDate: "2025-01-10",
      recipients: 1,
      status: "Active"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Delivered': 'bg-green-100 text-green-600',
      'Scheduled': 'bg-purple-100 text-purple-600',
      'Failed': 'bg-red-100 text-red-600',
      'Active': 'bg-blue-100 text-blue-600',
      'Paused': 'bg-gray-100 text-gray-600'
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Reports Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCustomerReports.length}</div>
            <div className="text-sm text-gray-500 mt-1">This month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">75%</div>
            <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockScheduledReports.length}</div>
            <div className="text-sm text-gray-500 mt-1">Auto-generated</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Next Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">Jan 10</div>
            <div className="text-sm text-gray-500 mt-1">Weekly update</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Customer Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Customer Reports</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomerReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{new Date(report.sentDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{report.recipients.length} recipients</div>
                      <div className="text-gray-500 text-xs">
                        {report.recipients[0]}
                        {report.recipients.length > 1 && ` +${report.recipients.length - 1} more`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{report.openRate}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{report.pages} pages</div>
                      <div className="text-gray-500">{report.includedReports} reports</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Resend</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Send Date</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockScheduledReports.map((schedule) => (
                <TableRow key={schedule.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{schedule.title}</TableCell>
                  <TableCell>{schedule.frequency}</TableCell>
                  <TableCell>{new Date(schedule.nextDate).toLocaleDateString()}</TableCell>
                  <TableCell>{schedule.recipients} recipients</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Pause</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {mockScheduledReports.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No scheduled reports configured.</p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Set Up Schedule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}