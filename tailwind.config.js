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
      backgroundImage: (theme) => ({
        "dj-login":
          "url('https://images.pexels.com/photos/2350325/pexels-photo-2350325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
      }),
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
          spotify: {
            DEFAULT: "var(--color-spotify)",
            darker: "var(--color-spotify-darker)",
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
