import React from 'react'
import Breadcrumbs, { BreadcrumbItem } from '../components/ui/Breadcrumbs'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  breadcrumbs = [],
  actions,
  className = ''
}) => {
  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      {/* Page header */}
      {(title || actions) && (
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="ml-4 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Page content */}
      <div>
        {children}
      </div>
    </div>
  )
}

export default PageLayout