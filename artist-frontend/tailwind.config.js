// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A", // deep blue
          light: "#3B82F6",   // bright blue
          dark: "#1E40AF",    // navy blue
        },
        accent: "#60A5FA", // lighter blue
      },
    },
  },
  plugins: [],
};
