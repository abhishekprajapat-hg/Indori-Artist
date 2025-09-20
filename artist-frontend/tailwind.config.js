// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "light-gradient":
          "linear-gradient(to right, #9bf8f4, #6f7bf7)", // light stylish gradient
        "dark-gradient": "linear-gradient(to right, #000328, #000000)", // dark stylish gradient
      },
    },
  },
  plugins: [],
};
