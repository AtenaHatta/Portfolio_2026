/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Light mode colors
        'bg-light': {
          text: '#000000',
          DEFAULT: '#FAFAFA',
        },
        'primary-light': {
          DEFAULT: '#000000',
        },
        'secondary-light': {
          DEFAULT: '#6B7280',
        },
        'disabled-light': {
          DEFAULT: '#9CA3AF',
        },
        'button-light': {
          text: '#FAFAFA',
          DEFAULT: '#000000',
        },
        'chip-light': {
          text: '#6B7280',
          DEFAULT: '#FAFAFA',
        },
        // Dark mode colors
        'bg-dark': {
          text: '#FAFAFA',
          DEFAULT: '#000000',
        },
        'primary-dark': {
          DEFAULT: '#1F2937',
        },
        'secondary-dark': {
          DEFAULT: '#6B7280',
        },
        'disabled-dark': {
          DEFAULT: '#9CA3AF',
        },
        'button-dark': {
          text: '#FAFAFA',
          DEFAULT: '#1F2937',
        },
        'chip-dark': {
          text: '#FAFAFA',
          DEFAULT: '#1F2937',
        },
      },
    },
  },
  plugins: [],
}
