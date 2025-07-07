// Fieldpoint Design Tokens
// Complete design system tokens for the multi-module platform

/**
 * Primary Brand Colors
 */
export const colors = {
  // Primary Green Palette
  primary: {
    50: '#f0f9f3',
    100: '#daf1e1', 
    200: '#b8e3c7',
    300: '#89d0a4',
    400: '#55b67b',
    500: '#3B7C4A', // Main brand color
    600: '#2d5c37',
    700: '#244829',
    800: '#1d3a22',
    900: '#18301d',
  },
  
  // Layout Colors
  layout: {
    sidebarBg: '#18181b',      // zinc-900
    topbarBg: '#f8fafc',       // slate-50
    topbarBorder: '#e2e8f0',   // slate-200
    contentBg: '#f4f4f5',      // gray-100
    surfaceBg: '#ffffff',      // white
  },
  
  // Text Colors
  text: {
    primary: '#1f2937',        // gray-900
    secondary: '#4b5563',      // gray-600
    muted: '#94a3b8',          // slate-400
    sidebar: '#f1f5f9',        // slate-100
    sidebarMuted: '#cbd5e1',   // slate-300
    sidebarHover: '#ffffff',   // white
  },
  
  // Semantic Colors
  semantic: {
    success: '#16a34a',        // green-600
    warning: '#eab308',        // yellow-500
    error: '#dc2626',          // red-600
    info: '#0ea5e9',          // sky-500
  },
  
  // Interactive Colors
  interactive: {
    hover: '#27272a',          // zinc-800
    active: '#15803d',         // green-700
    border: '#e2e8f0',         // slate-200
    ring: '#e2e8f0',          // slate-200
    focus: '#22c55e',         // green-500
  }
} as const;

/**
 * Typography System
 */
export const typography = {
  fontFamily: {
    base: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
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
  }
} as const;

/**
 * Spacing System
 */
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

/**
 * Layout Dimensions
 */
export const layout = {
  sidebar: {
    expanded: '240px',  // w-60
    collapsed: '64px',  // w-16
  },
  topbar: {
    height: '64px',     // h-16
  },
  content: {
    padding: '16px',    // p-4
    paddingX: '24px',
    paddingTop: '36px',
  }
} as const;

/**
 * Border Radius
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',     // 2px
  default: '0.3125rem', // 5px - main UI elements
  md: '0.375rem',     // 6px - buttons, interactive elements
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  full: '9999px',     // circular
} as const;

/**
 * Shadows
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

/**
 * Animation Durations
 */
export const animation = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;

/**
 * Z-Index Scale
 */
export const zIndex = {
  base: 0,
  elevated: 10,
  dropdown: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
} as const;

// Legacy exports for backward compatibility
export const radius = `rounded-[${borderRadius.default}]`;
export const shadow = 'shadow-md';
export const ring = 'ring-1 ring-slate-200';
export const accent = colors.primary[500];
export const sidebarBg = `bg-zinc-900`;
export const subnavText = 'text-slate-300 hover:text-white';
export const topbarBg = 'bg-slate-50 border-b border-slate-200';
export const textMuted = 'text-slate-400';
export const surfaceBg = 'bg-white';

// Legacy spacing object
export const legacySpacing = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

// Legacy font object
export const font = {
  base: 'text-sm',
  heading: 'text-xl font-semibold',
};
