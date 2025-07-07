// Property-related types matching backend DTOs

export enum PropertyType {
  Residential = 'Residential',
  Commercial = 'Commercial',
  Industrial = 'Industrial',
  Mixed = 'Mixed',
  Vacant = 'Vacant'
}

export enum PropertyStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Sold = 'Sold',
  Archived = 'Archived'
}

export enum ContactRole {
  General = 'General',
  PropertyManager = 'PropertyManager',
  Owner = 'Owner',
  Tenant = 'Tenant',
  MaintenanceContact = 'MaintenanceContact',
  BillingContact = 'BillingContact',
  EmergencyContact = 'EmergencyContact',
  Supervisor = 'Supervisor',
  Contractor = 'Contractor'
}

export interface Address {
  street: string
  suite?: string
  city: string
  state: string
  zipCode: string
  country: string
  latitude?: number
  longitude?: number
}

export interface CreateAddress {
  street: string
  suite?: string
  city: string
  state: string
  zipCode: string
  country?: string
  latitude?: number
  longitude?: number
}

export interface Property {
  id: number
  name: string
  description?: string
  address?: Address
  squareFootage?: number
  acreageSize?: number
  propertyType: PropertyType
  status: PropertyStatus
  notes?: string
  companyId: number
  companyName: string
  createdAt: string
  updatedAt?: string
  fullAddress: string
  latitude?: number
  longitude?: number
}

export interface PropertyDetail extends Property {
  propertyContacts: PropertyContact[]
  workOrders: WorkOrderSummary[]
  company: Company
}

export interface CreateProperty {
  name: string
  description?: string
  address?: CreateAddress
  squareFootage?: number
  acreageSize?: number
  propertyType: PropertyType
  status: PropertyStatus
  notes?: string
  companyId: number
}

export interface UpdateProperty {
  name: string
  description?: string
  address?: CreateAddress
  squareFootage?: number
  acreageSize?: number
  propertyType: PropertyType
  status: PropertyStatus
  notes?: string
}

export interface PropertyContact {
  id: number
  propertyId: number
  contactId: number
  role: ContactRole
  isPrimary: boolean
  notes?: string
  contact: ContactSummary
}

export interface ContactSummary {
  id: number
  firstName: string
  lastName: string
  fullName: string
  email?: string
  phone?: string
  title?: string
}

export interface WorkOrderSummary {
  id: number
  title: string
  status: string
  createdAt: string
  scheduledDate?: string
}

export interface Company {
  id: number
  name: string
  email?: string
  phone?: string
}

// List response types
export interface PropertyListResponse {
  items: Property[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

// Filter/Sort types for list view
export interface PropertyFilters {
  search?: string
  propertyType?: PropertyType
  status?: PropertyStatus
  companyId?: number
  sortBy?: 'name' | 'createdAt' | 'status' | 'propertyType'
  sortOrder?: 'asc' | 'desc'
  pageNumber?: number
  pageSize?: number
}