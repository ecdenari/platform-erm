export interface Company {
  id: number
  tenantId: string
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
  createdBy: string
  updatedBy?: string
}

export interface CompanyListResponse {
  items: Company[]
  totalCount: number
  pageNumber: number
  pageSize: number
}

export interface CreateCompany {
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
}

export interface UpdateCompany extends CreateCompany {}