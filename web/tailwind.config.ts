import type { Config } from 'tailwindcss';

// GraphOne brand system. Accent is the Wellfound-style red/pink used across the
// reference screens; surfaces are near-white with soft borders.
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#F0285A',
          50: '#FEF1F4',
          100: '#FDE2E9',
          200: '#FBC7D5',
          300: '#F89BB3',
          400: '#F4628B',
          500: '#F0285A',
          600: '#D81149',
          700: '#B30B3C',
          800: '#8F0D33',
          900: '#77102F',
        },
        ink: {
          DEFAULT: '#0B0B0F',
          muted: '#5B5F6B',
          soft: '#8A8F9C',
        },
        line: '#ECECEF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
        hover: '0 12px 32px -8px rgba(16,24,40,0.18)',
        pop: '0 8px 30px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      maxWidth: {
        page: '1200px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
