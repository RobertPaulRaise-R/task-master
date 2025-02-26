/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        high: "#EF4444",
        medium: "#F59E0B",
        low: "#10B981",
      },
    },
  },
  plugins: [],
};
