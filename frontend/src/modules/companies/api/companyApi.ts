import apiClient from '../../../api/client'
import { Company, CompanyListResponse } from '../types'

const COMPANIES_BASE_URL = '/internal/companies'

export const companyApi = {
  // Get all companies
  getCompanies: async (): Promise<Company[]> => {
    const { data } = await apiClient.get<Company[]>(COMPANIES_BASE_URL)
    return data
  },

  // Get paginated companies
  getCompaniesPaged: async (pageNumber = 1, pageSize = 20): Promise<CompanyListResponse> => {
    const { data } = await apiClient.get<CompanyListResponse>(
      `${COMPANIES_BASE_URL}/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    return data
  },

  // Get single company
  getCompany: async (id: number): Promise<Company> => {
    const { data } = await apiClient.get<Company>(`${COMPANIES_BASE_URL}/${id}`)
    return data
  }
}