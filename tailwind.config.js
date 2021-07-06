module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        accent: {
          primary: {
            DEFAULT: "var(--color-primary)",
            darker: "var(--color-primary-darker)",
          },
          secondary: {
            DEFAULT: "var(--color-secondary)",
            darker: "var(--color-secondary-darker)",
          },
          tertiary: {
            DEFAULT: "var(--color-tertiary)",
            darker: "var(--color-tertiary-darker)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
