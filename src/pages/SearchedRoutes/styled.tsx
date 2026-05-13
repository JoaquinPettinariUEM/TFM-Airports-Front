import { Box, Card, styled } from "@mui/material";

export const PageWrapper = styled(Box)({
  background: "linear-gradient(to bottom, #0B1020, #111827)",
  color: "white",
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
  maincolor: string;
}>(({ maincolor }) => ({
  overflow: "hidden",
  borderRadius: 8,
  backgroundColor: "#111827",
  color: "white",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.25s ease",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 0 0 1px ${maincolor}, 0 20px 40px rgba(0,0,0,0.35)`,
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
