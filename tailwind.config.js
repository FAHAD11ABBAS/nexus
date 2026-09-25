/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // NEXUS brand color palette
      colors: {
        nexus: {
          bg:        '#0a0a12',   // Deep space black
          surface:   '#12121e',   // Elevated surfaces
          card:      '#1a1a2e',   // Cards / panels
          border:    '#2a2a45',   // Subtle borders
          primary:   '#7c3aed',   // Violet core
          secondary: '#a855f7',   // Lavender accent
          accent:    '#e879f9',   // Neon pink
          cyan:      '#22d3ee',   // Electric cyan
          gold:      '#fbbf24',   // Premium gold
          text:      '#e2e8f0',   // Primary text
          muted:     '#94a3b8',   // Secondary text
          dim:       '#475569',   // Dimmed text
        },
      },

      // Custom font stacks
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },

      // Gradient shortcuts
      backgroundImage: {
        'nexus-gradient':   'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #e879f9 100%)',
        'nexus-radial':     'radial-gradient(ellipse at center, #7c3aed22 0%, transparent 70%)',
        'nexus-glow':       'radial-gradient(circle at 50% 50%, #a855f733, transparent 70%)',
        'card-gradient':    'linear-gradient(135deg, rgba(26,26,46,0.9) 0%, rgba(18,18,30,0.95) 100%)',
        'cyan-gradient':    'linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%)',
      },

      // Glow box shadows
      boxShadow: {
        'nexus-sm':  '0 0 8px rgba(124,58,237,0.4)',
        'nexus':     '0 0 20px rgba(124,58,237,0.5)',
        'nexus-lg':  '0 0 40px rgba(168,85,247,0.4)',
        'nexus-xl':  '0 0 60px rgba(232,121,249,0.35)',
        'cyan-glow': '0 0 20px rgba(34,211,238,0.5)',
        'glass':     '0 8px 32px rgba(0,0,0,0.4)',
        'nav':       '0 -4px 30px rgba(0,0,0,0.6)',
      },

      // Custom border radius
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // Smooth animations
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(124,58,237,0.4)' },
          '50%':       { boxShadow: '0 0 25px rgba(168,85,247,0.8)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        'fade-in':    'fade-in 0.4s ease-out both',
        'slide-up':   'slide-up 0.35s ease-out both',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        shimmer:      'shimmer 2.5s linear infinite',
        float:        'float 4s ease-in-out infinite',
        'spin-slow':  'spin-slow 8s linear infinite',
      },

      // Backdrop blur variants
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
