import { useQuery } from 'react-query'
import { companyApi } from '../api/companyApi'

export const useCompanies = () => {
  return useQuery(
    ['companies'],
    companyApi.getCompanies,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  )
}