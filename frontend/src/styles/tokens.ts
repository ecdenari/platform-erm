// Design tokens for Platform-ERM
export const tokens = {
  // Color Palette - Adapted for Platform-ERM with blue primary instead of green
  colors: {
    // Primary brand colors (blue theme)
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Primary brand color
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },

    // Layout colors
    layout: {
      // Sidebar colors (dark theme)
      sidebarBg: '#18181b', // zinc-900
      sidebarText: '#cbd5e1', // slate-300
      sidebarTextMuted: '#94a3b8', // slate-400
      sidebarBorder: '#27272a', // zinc-800
      sidebarHover: '#27272a', // zinc-800
      sidebarActive: '#1d4ed8', // primary-700
      sidebarActiveText: '#ffffff',
      
      // Topbar colors (light theme)
      topbarBg: '#f8fafc', // slate-50
      topbarText: '#0f172a', // slate-900
      topbarBorder: '#e2e8f0', // slate-200
      topbarShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      
      // Content area
      contentBg: '#ffffff',
      contentBorder: '#e2e8f0', // slate-200
      
      // Secondary sidebar
      secondarySidebarBg: '#ffffff',
      secondarySidebarBorder: '#e2e8f0', // slate-200
      secondarySidebarText: '#475569', // slate-600
      secondarySidebarActive: '#f1f5f9', // slate-100
    },

    // Semantic colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },

    // Neutral grays
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },

    // Interactive states
    interactive: {
      hover: 'rgba(59, 130, 246, 0.04)', // primary with alpha
      focus: 'rgba(59, 130, 246, 0.12)',
      active: 'rgba(59, 130, 246, 0.16)',
      disabled: '#f1f5f9',
      disabledText: '#94a3b8',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Menlo', 'Monaco', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Spacing scale
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
  },

  // Layout dimensions
  layout: {
    sidebarWidth: {
      collapsed: '4rem',    // 64px
      expanded: '15rem',    // 240px
    },
    secondarySidebarWidth: '12rem', // 192px
    topbarHeight: '4rem',   // 64px
    contentPadding: '1.5rem', // 24px
    maxContentWidth: '80rem', // 1280px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    full: '9999px',
  },

  // Shadows
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Animation
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },

  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
} as const

// Helper functions for accessing tokens
export const getColor = (path: string) => {
  const keys = path.split('.')
  let value: any = tokens.colors
  for (const key of keys) {
    value = value[key]
  }
  return value
}

export const getSpacing = (value: keyof typeof tokens.spacing) => {
  return tokens.spacing[value]
}

export const getFontSize = (value: keyof typeof tokens.typography.fontSize) => {
  return tokens.typography.fontSize[value]
}