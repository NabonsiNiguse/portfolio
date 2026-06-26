/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#080C12',
        },
        brand: {
          emerald: '#34D399',
          teal:    '#2DD4BF',
          blue:    '#60A5FA',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        display: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl':  ['6rem',   { lineHeight: '1', letterSpacing: '-0.04em' }],
        '9xl':  ['7rem',   { lineHeight: '1', letterSpacing: '-0.05em' }],
        '10xl': ['8.5rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-emerald':   '0 0 40px rgba(52,211,153,0.15)',
        'glow-emerald-lg':'0 0 80px rgba(52,211,153,0.12)',
        'glow-blue':      '0 0 40px rgba(96,165,250,0.12)',
        'card':           '0 1px 3px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.35)',
        'card-hover':     '0 2px 8px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.4)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up':   'slideUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':    'fadeIn 0.5s ease both',
        'shimmer':    'shimmer 2.5s linear infinite',
        'spin-slow':  'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
