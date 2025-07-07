/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // ServiceTitan professional grays
        servicetitan: {
          bg: '#f8f9fa',
          border: '#dee2e6',
          text: '#212529',
          'text-muted': '#6c757d',
          hover: '#e9ecef',
        },
        // LMN landscape greens (professional)
        lmn: {
          primary: '#10b981',
          secondary: '#059669',
          accent: '#34d399',
          bg: '#f0fdf4',
          border: '#bbf7d0',
        },
        // Aspire commercial slate
        aspire: {
          primary: '#1e293b',
          secondary: '#475569',
          accent: '#64748b',
          bg: '#f8fafc',
          border: '#e2e8f0',
        },
        // Status colors for work orders
        status: {
          draft: '#6B7280',
          scheduled: '#3B82F6',
          'in-progress': '#F59E0B',
          completed: '#10B981',
          cancelled: '#EF4444',
          'on-hold': '#8B5CF6',
        },
        // Landscape service types
        landscape: {
          maintenance: '#059669',
          construction: '#DC2626',
          irrigation: '#2563EB',
          enhancement: '#7C3AED',
          snow: '#64748B',
        },
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        // Dense spacing for tables (ServiceTitan inspired)
        'dense-xs': '0.125rem', // 2px
        'dense-sm': '0.25rem',  // 4px
        'dense-md': '0.375rem', // 6px
        'dense-lg': '0.5rem',   // 8px
        // Comfortable spacing for forms (LMN inspired)
        'comfort-sm': '0.5rem',   // 8px
        'comfort-md': '0.75rem',  // 12px
        'comfort-lg': '1rem',     // 16px
        'comfort-xl': '1.25rem',  // 20px
      },
      fontSize: {
        // Compact sizes for tables
        'compact-xs': '0.6875rem',   // 11px
        'compact-sm': '0.75rem',     // 12px
        'compact-base': '0.8125rem', // 13px
        'compact-lg': '0.875rem',    // 14px
      },
      lineHeight: {
        dense: '1.2',
        table: '1.35',
      },
      height: {
        // Component-specific heights
        'table-header': '2.5rem',     // 40px
        'table-row': '2.25rem',       // 36px
        'table-row-compact': '1.875rem', // 30px
        'form-field': '2.25rem',      // 36px
        'form-field-compact': '1.875rem', // 30px
        'nav-item': '2rem',           // 32px
        'breadcrumb': '1.5rem',       // 24px
      },
      width: {
        'module-nav': '12rem',        // 192px
      },
    },
  },
  plugins: [],
}