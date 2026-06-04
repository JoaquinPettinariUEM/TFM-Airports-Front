import { Box, Button, Typography, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { appPalette, routeCardThemes } from "../../theme";

export const dialogPaperSx = (theme: { palette: { divider: string } }) => ({
  backgroundColor: appPalette.surfaceStrong,
  backgroundImage: "none",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: appPalette.shadowStrong,
  borderRadius: 4,
  overflow: "hidden",
  minHeight: "min(860px, 88vh)",
  maxHeight: "88vh",
});

export const dialogContentSx = {
  pt: 2,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
};

export const HeaderRow = styled(Box)({
  display: "flex",
  gap: 16,
  alignItems: "flex-start",
  justifyContent: "space-between",
});

export const HeaderMain = styled(Box)({
  display: "flex",
  gap: 16,
  alignItems: "center",
  minWidth: 0,
});

export const FlagImage = styled("img")({
  width: 36,
  height: 36,
  borderRadius: 999,
  objectFit: "cover",
  flexShrink: 0,
  marginTop: 4,
  boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
});

export const TopInfo = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  gap: 12,
  marginBottom: 16,
  "@media (max-width: 1200px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (max-width: 700px)": {
    gridTemplateColumns: "1fr",
  },
});

export const InfoPill = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 12,
  alignItems: "center",
  padding: 16,
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  background: appPalette.surfaceSoft,
  minHeight: 88,
}));

export const InfoIconWrap = styled(Box)<{ mainColor: string; bgColor: string }>(
  ({ mainColor, bgColor }) => ({
    width: 40,
    height: 40,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: mainColor,
    background: bgColor,
    flexShrink: 0,
  }),
);

export const ContentGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "550px minmax(0, 1fr)",
  gap: 20,
  flex: 1,
  height: 0,
  overflow: "auto",
  paddingRight: 4,
  alignItems: "stretch",
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "1fr",
    height: "auto",
  },
});

export const LeftColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  height: "100%",
  "@media (max-width: 1100px)": {
    height: "auto",
  },
});

export const PreviewPanel = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 20,
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  background: alpha(theme.palette.common.white, 0.02),
}));

export const ItineraryPanel = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  background: alpha(theme.palette.common.white, 0.02),
  height: "100%",
  overflow: "hidden",
  "@media (max-width: 1100px)": {
    height: "auto",
    minHeight: 520,
  },
}));

export const ItineraryPanelBox = styled(Box)({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  padding: 20,
  gap: 16,
});

export const PanelHeader = styled(Box)({
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
});

export const PanelSmallHeader = styled(Box)({
  display: "flex",
  gap: 8,
  alignItems: "center",
});

export const PlaceholderBlock = styled(Box)(({ theme }) => ({
  minHeight: 180,
  borderRadius: 16,
  border: `1px dashed ${theme.palette.divider}`,
  display: "grid",
  placeItems: "center",
  color: theme.palette.text.secondary,
}));

export const HeroImage = styled("img")({
  width: "100%",
  height: 260,
  objectFit: "cover",
  borderRadius: 16,
  display: "block",
});

export const GalleryStrip = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 10,
});

export const GalleryThumb = styled("button")<{ active?: boolean }>(({ active, theme }) => ({
  appearance: "none",
  border: active ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
  padding: 0,
  borderRadius: 12,
  overflow: "hidden",
  background: "transparent",
  cursor: "pointer",
  height: 72,
}));

export const GalleryThumbImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const TipsBlock = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: 8,
  padding: 16,
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  background: alpha(theme.palette.common.white, 0.02),
}));

export const TimelineScrollArea = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  flex: 1,
  paddingRight: 8,
  overflowY: "auto",
});

export const ActivityRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "88px 1fr",
  gap: 16,
  alignItems: "start",
  paddingBottom: 12,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const TimeCell = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.light,
}));

export const ActivityContent = styled(Box)({
  display: "grid",
  gap: 6,
});

export const ActivityHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

export const TypeChip = styled("span")<{
  mainColor: string;
  bgColor: string;
}>(({ mainColor, bgColor, theme }) => ({
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 16,
  color: mainColor,
  background: bgColor,
  border: `1px solid ${mainColor === appPalette.textPrimary ? theme.palette.divider : alpha(mainColor, 0.35)}`,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontWeight: 700,
}));

export const MapButton = styled(Button)({
  justifySelf: "stretch",
});

export const AiAlertSx = {
  mb: 2,
  borderRadius: 2,
  backgroundColor: alpha(routeCardThemes[3].mainColor, 0.08),
  "& .MuiAlert-icon": {
    color: routeCardThemes[3].mainColor,
  },
};

export const FooterActions = styled(Box)({
  marginTop: 16,
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
});
