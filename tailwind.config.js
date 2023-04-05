/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'alkatra': ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        'beige': '#DDD0C8'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

