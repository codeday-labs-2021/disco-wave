module.exports = {
  purge: [
    './src/**/*.tsx',
    './src/**/*.js',
    './src/**/*.ts'
  ],
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
        "dj-login": "url('/login-page-dj.jpg')",
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
