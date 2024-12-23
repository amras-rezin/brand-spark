/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#086aff',  
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #071f63, #000, #000, #000, #071f63)',
      },
    },
  },
  plugins: [],
};
