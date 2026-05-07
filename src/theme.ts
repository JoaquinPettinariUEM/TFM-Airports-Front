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

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 600,
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 500,
    },

    body1: {
      fontWeight: 400,
    },

    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        },
      },
    },
  },
});
