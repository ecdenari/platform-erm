// Component foundations for Platform-ERM
import { tokens } from './tokens'

export const foundations = {
  // Button variants
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: tokens.typography.fontWeight.medium,
      fontSize: tokens.typography.fontSize.sm,
      borderRadius: tokens.borderRadius.md,
      padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
      transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut}`,
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      focusRing: `0 0 0 2px ${tokens.colors.primary[500]}40`,
    },
    variants: {
      primary: {
        backgroundColor: tokens.colors.primary[600],
        color: 'white',
        hover: {
          backgroundColor: tokens.colors.primary[700],
        },
        active: {
          backgroundColor: tokens.colors.primary[800],
        },
        disabled: {
          backgroundColor: tokens.colors.interactive.disabled,
          color: tokens.colors.interactive.disabledText,
          cursor: 'not-allowed',
        },
      },
      secondary: {
        backgroundColor: 'white',
        color: tokens.colors.gray[700],
        border: `1px solid ${tokens.colors.gray[300]}`,
        hover: {
          backgroundColor: tokens.colors.gray[50],
          borderColor: tokens.colors.gray[400],
        },
        active: {
          backgroundColor: tokens.colors.gray[100],
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: tokens.colors.gray[600],
        hover: {
          backgroundColor: tokens.colors.interactive.hover,
          color: tokens.colors.gray[700],
        },
      },
      destructive: {
        backgroundColor: tokens.colors.error[600],
        color: 'white',
        hover: {
          backgroundColor: tokens.colors.error[700],
        },
      },
    },
    sizes: {
      sm: {
        padding: `${tokens.spacing[1]} ${tokens.spacing[3]}`,
        fontSize: tokens.typography.fontSize.xs,
      },
      md: {
        padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
        fontSize: tokens.typography.fontSize.sm,
      },
      lg: {
        padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
        fontSize: tokens.typography.fontSize.base,
      },
    },
  },

  // Card variants
  card: {
    base: {
      backgroundColor: 'white',
      borderRadius: tokens.borderRadius.lg,
      border: `1px solid ${tokens.colors.layout.contentBorder}`,
      overflow: 'hidden',
    },
    variants: {
      default: {
        boxShadow: tokens.shadow.sm,
      },
      elevated: {
        boxShadow: tokens.shadow.md,
      },
      bordered: {
        boxShadow: 'none',
        borderWidth: '1px',
      },
      interactive: {
        cursor: 'pointer',
        transition: `all ${tokens.animation.duration.fast}`,
        hover: {
          boxShadow: tokens.shadow.md,
          transform: 'translateY(-1px)',
        },
      },
    },
  },

  // Input foundations
  input: {
    base: {
      width: '100%',
      padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
      fontSize: tokens.typography.fontSize.sm,
      lineHeight: tokens.typography.lineHeight.tight,
      borderRadius: tokens.borderRadius.md,
      border: `1px solid ${tokens.colors.gray[300]}`,
      backgroundColor: 'white',
      transition: `all ${tokens.animation.duration.fast}`,
      outline: 'none',
    },
    states: {
      focus: {
        borderColor: tokens.colors.primary[500],
        boxShadow: `0 0 0 2px ${tokens.colors.primary[500]}20`,
      },
      error: {
        borderColor: tokens.colors.error[500],
        boxShadow: `0 0 0 2px ${tokens.colors.error[500]}20`,
      },
      success: {
        borderColor: tokens.colors.success[500],
        boxShadow: `0 0 0 2px ${tokens.colors.success[500]}20`,
      },
      disabled: {
        backgroundColor: tokens.colors.interactive.disabled,
        borderColor: tokens.colors.gray[200],
        color: tokens.colors.interactive.disabledText,
        cursor: 'not-allowed',
      },
    },
  },

  // Table styling
  table: {
    base: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: tokens.borderRadius.lg,
      overflow: 'hidden',
      boxShadow: tokens.shadow.sm,
    },
    header: {
      backgroundColor: tokens.colors.gray[50],
      borderBottom: `1px solid ${tokens.colors.gray[200]}`,
    },
    headerCell: {
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      textAlign: 'left',
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.gray[700],
    },
    row: {
      borderBottom: `1px solid ${tokens.colors.gray[100]}`,
      hover: {
        backgroundColor: tokens.colors.gray[50],
      },
    },
    cell: {
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.gray[900],
    },
  },

  // Navigation foundations
  navigation: {
    // Primary navigation (sidebar)
    primary: {
      background: tokens.colors.layout.sidebarBg,
      width: tokens.layout.sidebarWidth.expanded,
      widthCollapsed: tokens.layout.sidebarWidth.collapsed,
      item: {
        padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
        borderRadius: tokens.borderRadius.md,
        margin: `0 ${tokens.spacing[2]}`,
        color: tokens.colors.layout.sidebarText,
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.medium,
        transition: `all ${tokens.animation.duration.fast}`,
        hover: {
          backgroundColor: tokens.colors.layout.sidebarHover,
          color: 'white',
        },
        active: {
          backgroundColor: tokens.colors.layout.sidebarActive,
          color: tokens.colors.layout.sidebarActiveText,
        },
      },
      group: {
        marginBottom: tokens.spacing[6],
      },
      groupTitle: {
        padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
        fontSize: tokens.typography.fontSize.xs,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.layout.sidebarTextMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },

    // Secondary navigation
    secondary: {
      background: tokens.colors.layout.secondarySidebarBg,
      width: tokens.layout.secondarySidebarWidth,
      border: `1px solid ${tokens.colors.layout.secondarySidebarBorder}`,
      item: {
        padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
        borderRadius: tokens.borderRadius.base,
        margin: `0 ${tokens.spacing[2]}`,
        color: tokens.colors.layout.secondarySidebarText,
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.normal,
        transition: `all ${tokens.animation.duration.fast}`,
        hover: {
          backgroundColor: tokens.colors.layout.secondarySidebarActive,
          color: tokens.colors.gray[900],
        },
        active: {
          backgroundColor: tokens.colors.primary[50],
          color: tokens.colors.primary[700],
          borderLeft: `3px solid ${tokens.colors.primary[500]}`,
        },
      },
    },

    // Breadcrumb navigation
    breadcrumb: {
      container: {
        display: 'flex',
        alignItems: 'center',
        fontSize: tokens.typography.fontSize.sm,
        color: tokens.colors.gray[600],
        marginBottom: tokens.spacing[4],
      },
      item: {
        color: tokens.colors.gray[500],
        hover: {
          color: tokens.colors.gray[700],
        },
      },
      current: {
        color: tokens.colors.gray[900],
        fontWeight: tokens.typography.fontWeight.medium,
      },
      separator: {
        margin: `0 ${tokens.spacing[2]}`,
        color: tokens.colors.gray[400],
      },
    },
  },

  // Layout foundations
  layout: {
    topbar: {
      height: tokens.layout.topbarHeight,
      backgroundColor: tokens.colors.layout.topbarBg,
      borderBottom: `1px solid ${tokens.colors.layout.topbarBorder}`,
      boxShadow: tokens.colors.layout.topbarShadow,
      zIndex: tokens.zIndex.sticky,
    },
    sidebar: {
      width: tokens.layout.sidebarWidth.expanded,
      widthCollapsed: tokens.layout.sidebarWidth.collapsed,
      backgroundColor: tokens.colors.layout.sidebarBg,
      borderRight: `1px solid ${tokens.colors.layout.sidebarBorder}`,
      zIndex: tokens.zIndex.fixed,
      transition: `width ${tokens.animation.duration.normal} ${tokens.animation.easing.easeInOut}`,
    },
    content: {
      backgroundColor: tokens.colors.layout.contentBg,
      padding: tokens.layout.contentPadding,
      minHeight: '100vh',
      marginTop: tokens.layout.topbarHeight,
    },
  },

  // Form foundations
  form: {
    group: {
      marginBottom: tokens.spacing[4],
    },
    label: {
      display: 'block',
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.gray[700],
      marginBottom: tokens.spacing[1],
    },
    helperText: {
      fontSize: tokens.typography.fontSize.xs,
      color: tokens.colors.gray[500],
      marginTop: tokens.spacing[1],
    },
    errorText: {
      fontSize: tokens.typography.fontSize.xs,
      color: tokens.colors.error[600],
      marginTop: tokens.spacing[1],
    },
  },

  // Modal foundations
  modal: {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: tokens.zIndex.modal,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      backgroundColor: 'white',
      borderRadius: tokens.borderRadius.lg,
      boxShadow: tokens.shadow.xl,
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'auto',
    },
  },
} as const

// CSS class helpers for common patterns
export const cssClasses = {
  button: {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-md transition-colors',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium px-4 py-2 rounded-md transition-colors',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-700 font-medium px-4 py-2 rounded-md transition-colors',
  },
  card: {
    default: 'bg-white rounded-lg border border-gray-200 shadow-sm',
    elevated: 'bg-white rounded-lg border border-gray-200 shadow-md',
    interactive: 'bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer',
  },
  navigation: {
    primaryItem: 'flex items-center px-4 py-3 mx-2 rounded-md text-sm font-medium text-slate-300 hover:bg-zinc-800 hover:text-white transition-colors',
    primaryItemActive: 'flex items-center px-4 py-3 mx-2 rounded-md text-sm font-medium bg-primary-700 text-white',
    secondaryItem: 'flex items-center px-4 py-2 mx-2 rounded text-sm text-slate-600 hover:bg-slate-100 hover:text-gray-900 transition-colors',
    secondaryItemActive: 'flex items-center px-4 py-2 mx-2 rounded text-sm bg-primary-50 text-primary-700 border-l-3 border-primary-500',
  },
}