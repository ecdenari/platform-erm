// Enterprise design tokens for Platform-ERM
// Extends the base tokens with ServiceTitan, LMN, and Aspire inspired patterns

import { tokens } from './tokens'

// Enterprise density tokens
export const enterpriseTokens = {
  ...tokens,
  
  // Enhanced spacing for data-dense interfaces
  spacing: {
    ...tokens.spacing,
    // Tighter spacing for tables and lists (ServiceTitan inspired)
    dense: {
      xs: '0.125rem',  // 2px
      sm: '0.25rem',   // 4px
      md: '0.375rem',  // 6px
      lg: '0.5rem',    // 8px
    },
    // Comfortable spacing for forms (LMN inspired)
    comfortable: {
      sm: '0.5rem',    // 8px
      md: '0.75rem',   // 12px
      lg: '1rem',      // 16px
      xl: '1.25rem',   // 20px
    }
  },

  // Professional color enhancements
  colors: {
    ...tokens.colors,
    
    // Status colors for work orders (Aspire inspired)
    status: {
      draft: '#6B7280',      // gray-500
      scheduled: '#3B82F6',  // blue-500
      inProgress: '#F59E0B', // amber-500
      completed: '#10B981',  // emerald-500
      cancelled: '#EF4444',  // red-500
      onHold: '#8B5CF6',    // violet-500
    },
    
    // Commercial landscape specific (LMN inspired)
    landscape: {
      maintenance: '#059669',  // emerald-600
      construction: '#DC2626', // red-600
      irrigation: '#2563EB',   // blue-600
      enhancement: '#7C3AED',  // violet-600
      snow: '#64748B',        // slate-500
    },
    
    // ServiceTitan professional grays
    serviceTitan: {
      bg: '#f8f9fa',
      border: '#dee2e6',
      text: '#212529',
      textMuted: '#6c757d',
      hover: '#e9ecef',
    },
    
    // LMN landscape greens (but professional)
    lmn: {
      primary: '#10b981',     // emerald-500
      secondary: '#059669',   // emerald-600
      accent: '#34d399',      // emerald-400
      bg: '#f0fdf4',         // green-50
      border: '#bbf7d0',     // green-200
    },
    
    // Aspire commercial slate
    aspire: {
      primary: '#1e293b',     // slate-800
      secondary: '#475569',   // slate-600
      accent: '#64748b',      // slate-500
      bg: '#f8fafc',         // slate-50
      border: '#e2e8f0',     // slate-200
    }
  },

  // Typography for data density
  typography: {
    ...tokens.typography,
    // Compact sizes for tables (ServiceTitan inspired)
    compact: {
      xs: '0.6875rem',   // 11px
      sm: '0.75rem',     // 12px
      base: '0.8125rem', // 13px
      lg: '0.875rem',    // 14px
    },
    // Table-specific line heights
    lineHeight: {
      ...tokens.typography.lineHeight,
      dense: '1.2',
      table: '1.35',
    }
  },

  // Component-specific tokens
  components: {
    // Data table styling (ServiceTitan inspired)
    dataTable: {
      headerHeight: '2.5rem',     // 40px
      rowHeight: '2.25rem',       // 36px
      rowHeightCompact: '1.875rem', // 30px
      cellPadding: '0.5rem',      // 8px
      cellPaddingCompact: '0.25rem', // 4px
      borderColor: '#E5E7EB',     // gray-200
      headerBg: '#F9FAFB',        // gray-50
      hoverBg: '#F3F4F6',         // gray-100
    },
    
    // Work order cards (Aspire inspired)
    workOrderCard: {
      minHeight: '4rem',          // 64px
      padding: '0.75rem',         // 12px
      statusBarWidth: '4px',
      idTagHeight: '1.5rem',      // 24px
      hierarchyIndent: '1rem',    // 16px
    },
    
    // Form styling (LMN comfortable + ServiceTitan efficient)
    form: {
      fieldHeight: '2.25rem',     // 36px
      fieldHeightCompact: '1.875rem', // 30px
      labelGap: '0.375rem',       // 6px
      sectionGap: '1.5rem',       // 24px
      groupGap: '1rem',           // 16px
    },
    
    // Navigation enhancements
    navigation: {
      moduleNavWidth: '12rem',    // 192px
      moduleNavItemHeight: '2rem', // 32px
      breadcrumbHeight: '1.5rem', // 24px
    }
  }
}

// Platform-specific style generators
export const platformStyles = {
  // ServiceTitan: Dense, efficient, maximum information
  serviceTitan: {
    table: {
      container: 'bg-white border border-gray-300 rounded-sm',
      header: 'bg-gray-100 border-b border-gray-300',
      headerCell: 'px-2 py-1 text-xs font-semibold text-gray-700 uppercase tracking-wider',
      row: 'border-b border-gray-200 hover:bg-gray-50 h-8',
      cell: 'px-2 py-1 text-xs text-gray-900',
      actionCell: 'px-1 py-1 text-right w-20',
    },
    card: {
      container: 'bg-white border border-gray-300 rounded-sm p-3 hover:shadow-sm',
      header: 'flex justify-between items-start mb-2',
      title: 'text-sm font-semibold text-gray-900 truncate',
      content: 'space-y-1 text-xs text-gray-600',
    },
    form: {
      section: 'bg-white border border-gray-300 rounded-sm p-3 mb-3',
      grid: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3',
      field: 'space-y-1',
      label: 'block text-xs font-medium text-gray-700',
      input: 'block w-full px-2 py-1 text-xs border-gray-300 rounded-sm',
    }
  },

  // LMN: Landscape workflows, comfortable spacing
  lmn: {
    table: {
      container: 'bg-white rounded-lg shadow-sm border border-gray-200',
      header: 'bg-green-50 border-b border-green-200',
      headerCell: 'px-4 py-3 text-sm font-medium text-green-800',
      row: 'border-b border-gray-100 hover:bg-green-25 h-12',
      cell: 'px-4 py-3 text-sm text-gray-800',
      statusCell: 'px-4 py-3 text-center',
    },
    card: {
      container: 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow',
      header: 'h-32 bg-gradient-to-br from-green-400 to-green-600 relative',
      content: 'p-4',
      title: 'text-lg font-semibold text-gray-900 mb-1',
      tags: 'flex flex-wrap gap-1 mb-3',
    },
    form: {
      section: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
      field: 'space-y-2',
      label: 'block text-sm font-medium text-gray-700',
      input: 'block w-full px-3 py-2 text-sm border-gray-300 rounded-md',
    }
  },

  // Aspire: Commercial hierarchy, professional B2B
  aspire: {
    table: {
      container: 'bg-white rounded-md border border-slate-300',
      header: 'bg-slate-50 border-b border-slate-300',
      headerCell: 'px-3 py-2 text-sm font-medium text-slate-700',
      row: 'border-b border-slate-200 hover:bg-slate-25 h-10',
      cell: 'px-3 py-2 text-sm text-slate-900',
      hierarchyCell: 'px-3 py-2 font-mono text-xs',
    },
    card: {
      container: 'bg-white rounded-md border border-slate-300 p-4',
      header: 'flex justify-between items-start mb-3',
      title: 'text-base font-semibold text-slate-900',
      idSection: 'text-right',
      details: 'grid grid-cols-2 gap-3 text-sm',
    },
    form: {
      section: 'bg-white rounded-md border border-slate-200 p-4 mb-4',
      grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      field: 'space-y-1',
      label: 'block text-sm font-medium text-slate-700',
      input: 'block w-full px-3 py-2 text-sm border-slate-300 rounded-md',
    }
  }
}

// Utility functions for platform styles
export const getPlatformStyles = (platform: 'servicetitan' | 'lmn' | 'aspire') => {
  return platformStyles[platform]
}

export const generateTenantTheme = (primaryColor: string, platform: 'servicetitan' | 'lmn' | 'aspire' = 'aspire') => {
  // This would generate color variations based on the primary color
  // For now, return the base theme with the primary color override
  return {
    ...enterpriseTokens,
    colors: {
      ...enterpriseTokens.colors,
      primary: {
        ...enterpriseTokens.colors.primary,
        500: primaryColor,
        600: primaryColor, // Would be calculated darker
        700: primaryColor, // Would be calculated even darker
      }
    }
  }
}

export default enterpriseTokens