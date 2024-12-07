// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      blur: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};


