import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageContainer from "@/layout/PageContainer"
import PageHeader from "@/components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { StatCard } from "@/components/ui/StatCard"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Select, SelectItem } from "@/components/ui/Select"
import { usePropertiesWithReports, useCreateSiteReport } from "@/hooks/api/useSiteManagement"
import { PropertyWithReports } from "@/hooks/api/useSiteManagement"
import { Home, Activity, File, Clock } from 'lucide-react'
import { ReportTypeModal } from '@/components/ui/ReportTypeModal'

export default function PropertiesPage() {
  const { data: properties, isLoading, error } = usePropertiesWithReports()
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all')
  const [accountManagerFilter, setAccountManagerFilter] = useState('all')
  const [fieldManagerFilter, setFieldManagerFilter] = useState('all')
  const [selectedProperty, setSelectedProperty] = useState<PropertyWithReports | null>(null)
  const [showReportModal, setShowReportModal] = useState(false)
  
  // Load user's default filter preference
  useEffect(() => {
    const savedFilter = localStorage.getItem('siteManagement_defaultFilter')
    if (savedFilter) {
      setPropertyTypeFilter(savedFilter)
    } else {
      // Default to Construction as requested
      setPropertyTypeFilter('Construction')
    }
  }, [])
  
  // Save filter preference when changed
  const handleFilterChange = (value: string) => {
    setPropertyTypeFilter(value)
    localStorage.setItem('siteManagement_defaultFilter', value)
  }

  const handleAccountManagerFilterChange = (value: string) => {
    setAccountManagerFilter(value)
  }

  const handleFieldManagerFilterChange = (value: string) => {
    setFieldManagerFilter(value)
  }

  // Get unique managers for filter dropdowns
  const uniqueAccountManagers = [...new Set(properties?.map(p => p.accountOwnerContactName).filter(Boolean))] || []
  const uniqueFieldManagers = [...new Set(properties?.map(p => p.productionManagerContactName).filter(Boolean))] || []
  
  const createSiteReportMutation = useCreateSiteReport()

  // Filter properties based on search term, property type, and managers
  const filteredProperties = properties?.filter(property => {
    const matchesSearch = property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.accountOwnerContactName || '').toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = propertyTypeFilter === 'all' || 
      (property.propertyType && property.propertyType === propertyTypeFilter)
    
    const matchesAccountManager = accountManagerFilter === 'all' || 
      property.accountOwnerContactName === accountManagerFilter
    
    const matchesFieldManager = fieldManagerFilter === 'all' || 
      property.productionManagerContactName === fieldManagerFilter
    
    return matchesSearch && matchesType && matchesAccountManager && matchesFieldManager
  }) || []

  const handleCreateReport = (property: PropertyWithReports) => {
    setSelectedProperty(property)
    setShowReportModal(true)
  }

  const handleReportTypeSelected = (type: 'site' | 'customer' | 'turnover') => {
    setShowReportModal(false)
    
    if (!selectedProperty) return

    // Handle different report types
    switch (type) {
      case 'site':
        const reportData = {
          propertyID: selectedProperty.propertyID || selectedProperty.id,
          title: `Site Report - ${selectedProperty.propertyName}`,
          description: `Quality audit for ${selectedProperty.propertyName}`,
          reportDate: new Date().toISOString(),
          notes: '',
        }

        createSiteReportMutation.mutate(reportData, {
          onSuccess: () => {
            // Navigate to the new report or show success message
            alert(`Site report created for ${selectedProperty.propertyName}`)
          },
          onError: (error) => {
            console.error('Failed to create report:', error)
            alert('Failed to create report')
          }
        })
        break
        
      case 'customer':
        // TODO: Implement customer report creation
        alert(`Customer report creation for ${selectedProperty.propertyName} - Coming soon!`)
        break
        
      case 'turnover':
        // TODO: Implement turnover report creation
        alert(`Turnover report creation for ${selectedProperty.propertyName} - Coming soon!`)
        break
    }
  }

  const getStatusBadge = (property: PropertyWithReports) => {
    if (!property.isActive) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Inactive</span>
    }
    
    if (property.draftReports > 0) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-full">{property.draftReports} Draft(s)</span>
    }
    
    return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">Up to Date</span>
  }

  const getScoreBadge = (score?: number) => {
    if (!score) return null
    
    let colorClass = 'bg-gray-100 text-gray-600'
    if (score >= 90) colorClass = 'bg-green-100 text-green-600'
    else if (score >= 80) colorClass = 'bg-blue-100 text-blue-600'
    else if (score >= 70) colorClass = 'bg-yellow-100 text-yellow-600'
    else colorClass = 'bg-red-100 text-red-600'
    
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>{score}%</span>
  }

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader title="Properties" />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading properties...</div>
        </div>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader title="Properties" />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error loading properties: {error.message}</div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* Summary Cards - Reduced spacing for information density */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <StatCard
          title="Total Properties"
          value={properties?.length || 0}
          icon={<Home size={20} />}
        />
        
        <StatCard
          title="Active Properties"
          value={properties?.filter(p => p.isActive).length || 0}
          icon={<Activity size={20} />}
        />
        
        <StatCard
          title="Total Reports"
          value={properties?.reduce((sum, p) => sum + p.totalReports, 0) || 0}
          icon={<File size={20} />}
        />
        
        <StatCard
          title="Draft Reports"
          value={properties?.reduce((sum, p) => sum + p.draftReports, 0) || 0}
          icon={<Clock size={20} />}
        />
      </div>

      {/* Search and Actions - Reduced margin for information density */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Property List</CardTitle>
            <div className="flex items-center gap-3">
              <Select value={propertyTypeFilter} onValueChange={handleFilterChange} className="w-40">
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </Select>
              <Select value={accountManagerFilter} onValueChange={handleAccountManagerFilterChange} className="w-44">
                <SelectItem value="all">All Managers</SelectItem>
                {uniqueAccountManagers.map(manager => (
                  <SelectItem key={manager} value={manager}>{manager}</SelectItem>
                ))}
              </Select>
              <Select value={fieldManagerFilter} onValueChange={handleFieldManagerFilterChange} className="w-44">
                <SelectItem value="all">All Field Managers</SelectItem>
                {uniqueFieldManagers.map(manager => (
                  <SelectItem key={manager} value={manager}>{manager}</SelectItem>
                ))}
              </Select>
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">Property Name</TableHead>
                <TableHead className="w-56">Address</TableHead>
                <TableHead className="w-32">Account Manager</TableHead>
                <TableHead className="w-32">Field Manager</TableHead>
                <TableHead className="w-24">Last Report</TableHead>
                <TableHead className="w-20">Score</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <Link 
                      to={`/site-management/properties/${property.propertyID || property.id}`}
                      className="text-green-600 hover:text-green-700 hover:underline"
                    >
                      {property.propertyName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {property.address || 'Address not available'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {property.accountOwnerContactName || 'N/A'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {property.productionManagerContactName || 'N/A'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {property.lastReportDate 
                      ? new Date(property.lastReportDate).toLocaleDateString()
                      : 'Never'
                    }
                  </TableCell>
                  <TableCell>
                    {getScoreBadge(property.overallScore)}
                  </TableCell>
                  <TableCell className="w-32">
                    <div className="flex items-center gap-2">
                      <Link to={`/site-management/properties/${property.propertyID || property.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="min-w-16"
                        >
                          View
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="min-w-20"
                        onClick={() => handleCreateReport(property)}
                        disabled={createSiteReportMutation.isPending}
                      >
                        {createSiteReportMutation.isPending ? 'Creating...' : 'Report'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No properties found matching your search.' : 'No properties available.'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Type Selection Modal */}
      <ReportTypeModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false)
          setSelectedProperty(null)
        }}
        onSelectType={handleReportTypeSelected}
        propertyName={selectedProperty?.propertyName || ''}
      />
    </PageContainer>
  )
}