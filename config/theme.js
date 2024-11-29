import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red, orange, pink, green,lightBlue } from "@mui/material/colors";
// Create a theme instance.

let theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      light: "#ffebee",
      text: "#000000",
    },
    secondary: {
      // main: "#19857b",
      main: "#052844",
      footerBG: "#031f34",
    },
    subPrimary: {
      main: "#2196fd",
      light: "#ffe52c",
    },
    error: {
      main: red.A400,
    },
  },

  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: orange[700],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: lightBlue[50],
            "color": orange[700],
            "&:hover": {
              backgroundColor: green[100],
              color: green[700],
            },
          },
          "&:hover": {
            backgroundColor: red[50],
            color: pink[700],
          },
        },
     
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#d0021b",
          "&$error": {
            color: "#d0021b",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#3E68A8",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#3E68A8",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover:not($disabled) fieldset": {
              borderColor: red.A400,
              borderWidth: "0.15rem",
            },
            "&.Mui-focused fieldset": {
              borderColor: red.A400,
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textTransform: "initial",
          fontSize: "1rem",
          "&[disabled]": {
            color: "#FBFBFB",
            pointerEvents: "none",
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: { color: red.A400 },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: { color: "#333333" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { color: red.A400 },
        outlined: {
          borderColor: "purple",
          color: "white",
          backgroundColor: red.A400,
          "&:hover": {
            backgroundColor: "#19857b",
            color: "white",
            opacity: [0.9, 0.8, 0.7],
          },
        },
        outlinedPrimary: {
          borderColor: "pink",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
