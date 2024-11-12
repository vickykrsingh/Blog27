/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#006266',
        'secondary':'#dcdde1',
        'primary-light':'#009432',
        'secondary-light':'#e15f41'
      }
    },
  },
  plugins: [],
}