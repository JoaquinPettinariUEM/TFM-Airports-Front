import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#A855F7",
    },

    secondary: {
      main: "#F4B942",
    },

    background: {
      default: "#0B1020",
      paper: "rgba(15,23,42,0.72)",
    },

    text: {
      primary: "#F8FAFC",
      secondary: "#CBD5E1",
    },

    divider: "rgba(255,255,255,0.08)",
  },

  shape: {
    borderRadius: 18,
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.06)",
          borderRadius: 14,

          "& fieldset": {
            borderColor: "rgba(255,255,255,0.08)",
          },

          "&:hover fieldset": {
            borderColor: "#F4B942",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#F4B942",
          },
        },
      },
    },
  },

  typography: {
    fontFamily: "'Inter', sans-serif",

    h1: {
      fontWeight: 800,
      letterSpacing: "-2px",
    },

    h2: {
      fontWeight: 700,
      letterSpacing: "-1px",
    },

    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
});
