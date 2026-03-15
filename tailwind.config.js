module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,html}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brandBlue: "#3b82f6",
        brandGreen: "#10b981",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.08)",
      }
    },
  },
  plugins: [],
};
