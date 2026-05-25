import { Box, Card, styled } from "@mui/material";

export const PageWrapper = styled(Box)({
  background:
    "radial-gradient(circle at 20% 0%, rgba(59,130,246,0.16), transparent 36%), radial-gradient(circle at 90% 10%, rgba(139,92,246,0.18), transparent 32%), linear-gradient(to bottom, var(--tp-bg-start), var(--tp-bg-end))",
  color: "var(--tp-text-primary)",
  paddingTop: 28,
  paddingBottom: 56,
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
  marginTop: 40,
  marginBottom: 24,
  flexWrap: "wrap",
  gap: 16,
});

export const StyledRouteCard = styled(Card)<{
  mainColor: string;
}>(({ mainColor, theme }) => ({
  overflow: "hidden",
  borderRadius: 10,
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
  padding: 20,
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
