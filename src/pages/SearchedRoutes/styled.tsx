import { Box, Card, styled } from "@mui/material";

export const PageWrapper = styled(Box)({
  background: "linear-gradient(to bottom, var(--tp-bg-start), var(--tp-bg-end))",
  color: "var(--tp-text-primary)",
  paddingTop: 32,
  paddingBottom: 32,
});

export const SectionHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const AlternativesHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 48,
  marginBottom: 24,
  flexWrap: "wrap",
  gap: 16,
});

export const StyledRouteCard = styled(Card)<{
  mainColor: string;
}>(({ mainColor, theme }) => ({
  overflow: "hidden",
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.25s ease",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 0 0 1px ${mainColor}, var(--tp-shadow-hover)`,
  },
}));

export const CardContent = styled(Box)({
  padding: 24,
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const PriceRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  marginTop: "auto",
  width: "100%",
});

export const BottomAction = styled(Box)({});
