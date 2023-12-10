import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
  }
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    classicButton: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    classicButton: true;
  }
}

export default createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 640,
      desktop: 1200,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#222222",
    },
    secondary: {
      main: "#C648D1",
    },
    classicButton: {
      main: "#5783db",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          "@media (min-width: 0px)": {
            padding: 0,
          },
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        },
      },
    },
  },
});
