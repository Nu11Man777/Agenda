/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        schneider: {
          500: '#00b140',
        },
      },
    },
  },
  plugins: [],
}
