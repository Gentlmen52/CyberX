/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- Shu qatorda class orqali boshqarish yoqiladi!
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberGreen: "#10b981",
        cyberOrange: "#f97316",
      },
    },
  },
  plugins: [],
};