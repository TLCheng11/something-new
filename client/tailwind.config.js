/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-40": "40vh",
        "1/10": "10%",
        "9/10": "90%",
      },
    },
  },
  plugins: [],
};
