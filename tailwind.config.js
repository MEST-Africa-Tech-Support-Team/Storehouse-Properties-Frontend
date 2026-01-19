/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'blue-glow': '0 0 12px rgba(37, 99, 235, 0.4)',   
        'red-glow': '0 0 12px rgba(220, 38, 38, 0.4)',    
      },
      borderRadius: {
        'full': '9999px',
      }
    },
  },
  plugins: [],
}

