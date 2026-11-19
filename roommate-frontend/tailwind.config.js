/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#20251f",
        paper: "#f6f5f0",
        sage: { 50: "#f1f3ed", 100: "#e5e9df", 500: "#78866b", 600: "#5b6b50", 700: "#46553d" },
        clay: "#bd795e"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["DM Serif Display", "Georgia", "serif"]
      },
      boxShadow: { soft: "0 18px 55px rgba(31, 38, 29, .08)" }
    }
  },
  plugins: []
};
