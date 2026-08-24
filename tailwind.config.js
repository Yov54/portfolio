/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: 'rgb(var(--color-bg) / <alpha-value>)',
        white: 'rgb(var(--color-text-primary) / <alpha-value>)',
        gray: {
          300: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          400: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          500: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        },
        pastel: {
          lavender: '#D9D7F1',
          cream: '#FFFDDE',
          lime: '#E7FBBE',
          pink: '#FFCBCB',
          sage: '#D6E5BD',
          yellow: '#F9E1A8',
          blue: '#BCD8EC',
          purple: '#DCCCEC',
          peach: '#FFDAB4',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          light: 'rgb(var(--color-accent-light) / <alpha-value>)',
          dark: 'rgb(var(--color-accent-dark) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          light: 'rgb(var(--color-surface-light) / <alpha-value>)',
          dark: 'rgb(var(--color-surface-dark) / <alpha-value>)',
        },
        'grad-start': 'rgb(var(--color-grad-start) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        retro: ['VT323', 'monospace'],
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(var(--color-shadow) / 1)',
        'retro-sm': '2px 2px 0px 0px rgba(var(--color-shadow) / 1)',
        'retro-active': '0px 0px 0px 0px rgba(var(--color-shadow) / 1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 250ms ease-out both',
        'scale-up': 'scale-up 220ms cubic-bezier(.2,.9,.3,1) both',
        'pixel-bounce': 'pixel-bounce 1s steps(4) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-up': {
          '0%': { opacity: '0', transform: 'scale(.985)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
