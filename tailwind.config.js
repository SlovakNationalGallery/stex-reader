/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      'display': ['SNG Sans'],
      'body': ['Circular']
    },
    extend: {
      colors: {
        "blue-ribbon": {
          50: "#edf6ff",
          100: "#d7eaff",
          200: "#b9dcff",
          300: "#88c7ff",
          400: "#50a7ff",
          500: "#2882ff",
          600: "#095cff",
          700: "#0a4aeb",
          800: "#0f3cbe",
          900: "#133895",
          950: "#11245a",
        },
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};
