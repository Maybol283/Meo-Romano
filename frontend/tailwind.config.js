/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'], // Define a custom name for your font
      },
      centerScreen: {
        
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

