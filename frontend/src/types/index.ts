export interface BaseEntity {
  id: number
  tenantId: string
  createdAt: string
  updatedAt?: string
  createdBy: string
  updatedBy?: string
  isDeleted: boolean
  deletedAt?: string
  deletedBy?: string
}

export interface Tenant {
  id: string
  name: string
  subdomain: string
  apiKey: string
  plan: string
  isActive: boolean
  createdAt: string
  settings: string
  primaryColor: string
  logo?: string
}

export interface Company extends BaseEntity {
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
}

export interface Property extends BaseEntity {
  name: string
  description?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  latitude?: number
  longitude?: number
  squareFootage?: number
  acreageSize?: number
  propertyType?: string
  status: string
  companyId: number
  company?: Company
}

export interface Contact extends BaseEntity {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  mobilePhone?: string
  title?: string
  department?: string
  contactType: string
  isPrimary: boolean
  notes?: string
  companyId?: number
  propertyId?: number
  company?: Company
  property?: Property
  fullName: string
}

export interface WorkOrder extends BaseEntity {
  workOrderNumber: string
  title: string
  description?: string
  status: string
  priority: string
  scheduledDate?: string
  completedDate?: string
  estimatedCost?: number
  actualCost?: number
  notes?: string
  propertyId: number
  assignedToContactId?: number
  property?: Property
  assignedToContact?: Contact
}

export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  role: string
  isActive: boolean
  lastLoginAt?: string
  fullName: string
}