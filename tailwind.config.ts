import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdff',
          100: '#ccf7fc',
          200: '#99eef9',
          300: '#5de0f4',
          400: '#2bc9e8',
          500: '#00D9FF',
          600: '#00a3cc',
          700: '#0081a3',
          800: '#006885',
          900: '#00566e',
        },
        dark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
        },
        light: {
          50: '#ffffff',
          100: '#f8f8f8',
          200: '#f0f0f0',
          300: '#e8e8e8',
          400: '#d8d8d8',
          500: '#c8c8c8',
          600: '#a8a8a8',
          700: '#888888',
          800: '#686868',
          900: '#484848',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        'hero': ['3rem', { lineHeight: '1.1' }],
        'display': ['4rem', { lineHeight: '1' }],
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-out',
        'slideUp': 'slideUp 0.8s ease-out',
        'slideDown': 'slideDown 0.8s ease-out',
        'scaleIn': 'scaleIn 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glowPulse': 'glowPulse 2s ease-in-out infinite alternate',
        'tiltIn': 'tiltIn 0.8s ease-out',
        'floatUp': 'floatUp 3s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)' },
        },
        tiltIn: {
          '0%': { opacity: '0', transform: 'rotateX(20deg) translateY(2rem)' },
          '100%': { opacity: '1', transform: 'rotateX(0deg) translateY(0)' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'glow-primary': '0 0 10px rgba(0, 217, 255, 0.5)',
        'glow-primary-lg': '0 0 20px rgba(0, 217, 255, 0.6)',
        'glow-primary-xl': '0 0 30px rgba(0, 217, 255, 0.7)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
