import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/Card'

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  className?: string
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  className = ''
}: StatCardProps) {
  return (
    <Card className={`bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <CardContent className="p-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            {icon && (
              <div className="text-gray-400">
                {icon}
              </div>
            )}
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          <div className="border-t border-gray-100 pt-2">
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && (
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium ${trend.isPositive !== false ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive !== false ? '+' : '-'}{trend.value}%
                </span>
                <span className="text-sm text-gray-500 ml-1">{trend.label}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}