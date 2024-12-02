/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'wb-orange': '#ff9800',
        'wb-blue': '#1a73e8',
        'wb-light-gray': '#00000099'
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  darkMode: 'class',
  daisyui: {
    themes: ['light'],
    darkTheme: 'light',
    darkMode: false,
  }
}

