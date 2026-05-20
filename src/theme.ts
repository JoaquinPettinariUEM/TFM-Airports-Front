import { createTheme } from "@mui/material";

export const appPalette = {
  bgGradientStart: "#0B1020",
  bgGradientEnd: "#111827",
  surfaceStrong: "#111827",
  surfaceSoft: "rgba(255,255,255,0.03)",
  surfaceGlass: "rgba(255,255,255,0.06)",
  borderSoft: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.12)",
  textPrimary: "#F8FAFC",
  textMuted: "#9CA3AF",
  textSubtle: "#6B7280",
  overlayDarkStrong: "rgba(2,6,23,0.85)",
  overlayDarkSoft: "rgba(2,6,23,0.65)",
  shadowStrong: "0 8px 32px rgba(0,0,0,0.35)",
  shadowHover: "0 20px 40px rgba(0,0,0,0.35)",
};

export const routeCardThemes = [
  { mainColor: "#34D399", bgColor: "rgba(16,185,129,0.18)" },
  { mainColor: "#A78BFA", bgColor: "rgba(139,92,246,0.18)" },
  { mainColor: "#FBBF24", bgColor: "rgba(245,158,11,0.18)" },
  { mainColor: "#60A5FA", bgColor: "rgba(59,130,246,0.18)" },
] as const;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#A855F7" },
    secondary: { main: "#F4B942" },
    success: { main: "#34D399" },
    warning: { main: "#FBBF24" },
    info: { main: "#60A5FA" },
    background: {
      default: appPalette.bgGradientStart,
      paper: appPalette.surfaceGlass,
    },
    text: {
      primary: appPalette.textPrimary,
      secondary: "#CBD5E1",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(18px)",
          background: appPalette.surfaceGlass,
          border: `1px solid ${appPalette.borderSoft}`,
          boxShadow: appPalette.shadowStrong,
        },
      },
    },
  },
});
