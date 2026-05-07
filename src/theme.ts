import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#E3A72F",
      light: "#F0BD5A",
      dark: "#CF921F",
      contrastText: "#FFFFFF",
    },
  },

  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Inclusive Sans",
        },
      },
    },
  },
});
