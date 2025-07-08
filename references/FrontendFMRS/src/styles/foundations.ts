// Fieldpoint UI Foundations - apply these patterns across components
// Updated to use comprehensive design tokens

import {
  colors,
  typography,
  spacing,
  layout,
  borderRadius,
  shadows,
  animation,
  zIndex,
  // Legacy exports for backward compatibility
  radius,
  shadow,
  ring,
  accent,
  sidebarBg,
  subnavText,
  topbarBg,
  textMuted,
  surfaceBg,
  legacySpacing,
  font,
} from './token';

/**
 * Layout Foundations
 */
export const layoutFoundations = {
  dimensions: {
    sidebarExpanded: layout.sidebar.expanded,
    sidebarCollapsed: layout.sidebar.collapsed,
    topbarHeight: layout.topbar.height,
  },
  spacing: {
    paddingX: layout.content.paddingX,
    paddingTop: layout.content.paddingTop,
    paddingBottom: layout.content.paddingBottom,
    mainPadding: layout.content.padding,
  },
  colors: {
    sidebar: colors.layout.sidebarBg,
    topbar: colors.layout.topbarBg,
    topbarBorder: colors.layout.topbarBorder,
    content: colors.layout.contentBg,
    surface: colors.layout.surfaceBg,
  }
} as const;

/**
 * Component Foundations
 */
export const componentFoundations = {
  // Button variants
  button: {
    base: {
      padding: `${spacing[2]} ${spacing[4]}`, // py-2 px-4
      borderRadius: borderRadius.md,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      transition: `all ${animation.fast} ease-in-out`,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none',
      focusRing: `0 0 0 2px ${colors.interactive.focus}`,
    },
    variants: {
      primary: {
        backgroundColor: colors.primary[600],
        color: colors.layout.surfaceBg,
        hover: {
          backgroundColor: colors.primary[700],
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: colors.text.secondary,
        border: `1px solid ${colors.interactive.border}`,
        hover: {
          backgroundColor: colors.layout.contentBg,
        },
      },
      destructive: {
        backgroundColor: colors.semantic.error,
        color: colors.layout.surfaceBg,
        hover: {
          backgroundColor: '#b91c1c', // red-700
        },
      },
    },
  },
  
  // Card variants
  card: {
    base: {
      backgroundColor: colors.layout.surfaceBg,
      borderRadius: borderRadius.default,
      boxShadow: shadows.sm,
      padding: spacing[4],
    },
    variants: {
      elevated: {
        boxShadow: shadows.md,
      },
      bordered: {
        border: `1px solid ${colors.interactive.border}`,
        boxShadow: 'none',
      },
      interactive: {
        cursor: 'pointer',
        transition: `all ${animation.fast} ease-in-out`,
        hover: {
          boxShadow: shadows.md,
          transform: 'translateY(-1px)',
        },
      },
    },
  },
  
  // Input variants
  input: {
    base: {
      width: '100%',
      padding: `${spacing[2]} ${spacing[3]}`,
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.interactive.border}`,
      fontSize: typography.fontSize.sm,
      transition: `all ${animation.fast} ease-in-out`,
      outline: 'none',
      backgroundColor: colors.layout.surfaceBg,
      color: colors.text.primary,
      focus: {
        borderColor: colors.primary[500],
        boxShadow: `0 0 0 2px ${colors.primary[500]}40`, // 25% opacity
      },
    },
    states: {
      error: {
        borderColor: colors.semantic.error,
        focus: {
          borderColor: colors.semantic.error,
          boxShadow: `0 0 0 2px ${colors.semantic.error}40`,
        },
      },
      success: {
        borderColor: colors.semantic.success,
        focus: {
          borderColor: colors.semantic.success,
          boxShadow: `0 0 0 2px ${colors.semantic.success}40`,
        },
      },
      disabled: {
        backgroundColor: colors.layout.contentBg,
        color: colors.text.muted,
        cursor: 'not-allowed',
      },
    },
  },
  
  // Table variants
  table: {
    base: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: typography.fontSize.sm,
    },
    header: {
      backgroundColor: colors.layout.contentBg,
      fontWeight: typography.fontWeight.medium,
      color: colors.text.secondary,
      padding: `${spacing[3]} ${spacing[4]}`,
      textAlign: 'left',
      borderBottom: `1px solid ${colors.interactive.border}`,
    },
    cell: {
      padding: `${spacing[3]} ${spacing[4]}`,
      borderBottom: `1px solid ${colors.interactive.border}`,
      color: colors.text.primary,
    },
    row: {
      hover: {
        backgroundColor: colors.layout.contentBg,
      },
    },
  },
} as const;

/**
 * Navigation Foundations
 */
export const navigationFoundations = {
  sidebar: {
    main: {
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: '15px', // Custom size for main nav
      fontWeight: typography.fontWeight.medium,
      borderRadius: borderRadius.default,
      transition: `all ${animation.normal} ease-in-out`,
      color: colors.text.sidebarMuted,
      hover: {
        backgroundColor: colors.interactive.hover,
        color: colors.text.sidebarHover,
      },
      active: {
        backgroundColor: colors.primary[700],
        color: colors.text.sidebarHover,
      },
    },
    sub: {
      padding: `${spacing[1]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.normal,
      borderRadius: borderRadius.default,
      transition: `all ${animation.normal} ease-in-out`,
      color: colors.text.sidebarMuted,
      hover: {
        backgroundColor: colors.interactive.hover,
        color: colors.text.sidebarHover,
      },
      active: {
        backgroundColor: `${colors.layout.sidebarBg}99`, // Semi-transparent
        color: colors.text.sidebarHover,
        borderLeft: `2px solid ${colors.primary[600]}`,
      },
    },
  },
  topbar: {
    height: layout.topbar.height,
    backgroundColor: colors.layout.topbarBg,
    borderBottom: `1px solid ${colors.layout.topbarBorder}`,
    boxShadow: shadows.sm,
    zIndex: zIndex.elevated,
  },
} as const;

/**
 * Complete Fieldpoint Theme (New comprehensive theme)
 */
export const fieldpointTheme = {
  colors,
  typography,
  spacing,
  layout: layoutFoundations,
  components: componentFoundations,
  navigation: navigationFoundations,
  borderRadius,
  shadows,
  animation,
  zIndex,
} as const;

/**
 * Legacy Theme (Backward compatibility)
 */
export const legacyFieldpointTheme = {
  layout: {
    sidebar: sidebarBg,
    topbar: topbarBg,
    contentSurface: surfaceBg,
  },
  ui: {
    card: `${surfaceBg} ${shadow} ${radius}`,
    dropdown: `${surfaceBg} ${ring} ${shadow} ${radius}`,
    avatar: `w-8 h-8 rounded-full`,
  },
  text: {
    muted: textMuted,
    subnav: subnavText,
    heading: font.heading,
    base: font.base,
  },
  spacing: legacySpacing,
  accent,
} as const;

// Legacy spacing export
export const layoutSpacing = {
  paddingX: '24px',
  paddingTop: '36px',
  paddingBottom: '0px',
};

/**
 * Utility Functions
 */
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba with opacity
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getFocusRing = (color: string = colors.primary[500]): string => {
  return `0 0 0 2px ${getColorWithOpacity(color, 0.25)}`;
};
  