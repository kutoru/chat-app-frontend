/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-1": "hsl(250, 11%, 11%)",
        "dark-2": "hsl(250, 11%, 13%)",
        "dark-3": "hsl(250, 11%, 16%)",
        "light-1": "hsl(250, 100%, 100%)",
        "light-2": "hsl(250, 100%, 90%)",
        "light-3": "hsl(250, 100%, 85%)",
      },
    },
  },
  plugins: [],
};
