module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: ["./src/**/*.js", "./src/**/**/*.js"],
  },
  theme: {
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    colors: {
      white: "#ffffff",
      white2: "#FAFAFA",
      blue: {
        base: "#385185",
        medium: "#0095F6",
      },
      black: {
        light: "#262626",
        faded: "#00000059",
      },
      gray: {
        base: "#A0A0A0",
        background: "#fafafa",
        primary: "#dbdbdb",
      },
      red: {
        primary: "#ed4956",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
