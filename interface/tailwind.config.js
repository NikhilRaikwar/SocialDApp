module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#BB86FC", // Soft purple
        secondary: "#03DAC6", // Teal
        background: {
          light: "#2C2C2C", // Dark grey
          default: "#1E1E1E", // Darker grey
          dark: "#121212", // Almost black
        },
        text: {
          light: "#E0E0E0", // Light grey
          default: "#BBBBBB", // Medium grey
          dark: "#FFFFFF", // White
        },
        accent: "#CF6679", // Muted pink
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
