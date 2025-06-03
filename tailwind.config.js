/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B2CBF',
        'primary-hover': '#9D4EDD',
        secondary: '#E83E8C',
        accent: '#3A86FF',
        success: '#2DC653',
        warning: '#FFBE0B',
        dark: '#333333',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        hover: '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
