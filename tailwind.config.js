/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tractor-red': '#E31837', // Mahindra Red-ish
        'tractor-dark': '#1a1a1a',
        'tractor-gray': '#333333',
      }
    },
  },
  plugins: [],
}
