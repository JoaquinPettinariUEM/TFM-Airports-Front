import { styled } from "@mui/material";
import { appPalette, routeCardThemes } from "../../theme";

export const PageSection = styled("section")({
  width: "100%",
  minHeight: "100%",
  background:
    "radial-gradient(circle at 20% 0%, rgba(59,130,246,0.16), transparent 36%), radial-gradient(circle at 90% 10%, rgba(139,92,246,0.18), transparent 32%), linear-gradient(to bottom, var(--tp-bg-start), var(--tp-bg-end))",
  color: "var(--tp-text-primary)",
});

export const HeroSection = styled("section")({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.25fr) minmax(320px, 0.9fr)",
  gap: 24,
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "1fr",
  },
});

export const HeroCopy = styled("div")({
  display: "grid",
  gap: 18,
  alignContent: "center",
  minHeight: 280,
  ".tp-title": {
    maxWidth: 760,
  },
  ".tp-subtitle": {
    maxWidth: 720,
  },
});

export const HeroPanel = styled("div")(({ theme }) => ({
  display: "grid",
  gap: 20,
  padding: 24,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  boxShadow: appPalette.shadowStrong,
}));

export const PanelHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
});

export const PathWrap = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
});

export const PathItem = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
});

export const Arrow = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 20,
}));

export const NodeDot = styled("span")({
  width: 10,
  height: 10,
  borderRadius: "50%",
  display: "inline-block",
  "&[data-kind='origin']": {
    background: routeCardThemes[0].mainColor,
  },
  "&[data-kind='best']": {
    background: routeCardThemes[1].mainColor,
  },
  "&[data-kind='destination']": {
    background: "#F87171",
  },
});

export const MetricsRow = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 12,
  "@media (max-width: 640px)": {
    gridTemplateColumns: "1fr",
  },
});

export const MetricCard = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: appPalette.surfaceSoft,
}));

export const ProcessGrid = styled("section")({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 16,
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (max-width: 700px)": {
    gridTemplateColumns: "1fr",
  },
});

export const ProcessCard = styled("article")(({ theme }) => ({
  position: "relative",
  display: "grid",
  gap: 14,
  padding: 20,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
}));

export const StepBadge = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 14,
}));

export const StepIcon = styled("div")({
  width: 56,
  height: 56,
  borderRadius: 8,
  display: "grid",
  placeItems: "center",
  fontSize: 28,
});

export const LargePanel = styled("section")(({ theme }) => ({
  display: "grid",
  gap: 28,
  padding: 24,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  boxShadow: appPalette.shadowStrong,
}));

export const TwoColumnHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: 20,
  alignItems: "flex-end",
  flexWrap: "wrap",
});

export const AlgorithmLayout = styled("div")({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.3fr) minmax(280px, 0.8fr)",
  gap: 20,
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "1fr",
  },
});

export const GraphPanel = styled("div")(({ theme }) => ({
  display: "grid",
  gap: 16,
  padding: 20,
  minHeight: 420,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: "rgba(2,6,23,0.28)",
}));

export const GraphCanvas = styled("div")({
  position: "relative",
  minHeight: 320,
  aspectRatio: "19 / 9",
  overflow: "hidden",
});

export const GraphSvg = styled("svg")({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
});

export const GraphNode = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "grid",
  gap: 4,
  placeItems: "center",
  width: 92,
  padding: "12px 10px",
  borderRadius: 999,
  transform: "translate(-50%, -50%)",
  border: `1px solid ${theme.palette.divider}`,
  background: appPalette.surfaceStrong,
  textAlign: "center",
  span: {
    fontWeight: 700,
    fontSize: 14,
  },
  small: {
    color: theme.palette.text.secondary,
    fontSize: 11,
  },
  "&[data-kind='origin']": {
    borderColor: routeCardThemes[0].mainColor,
    boxShadow: `0 0 0 1px ${routeCardThemes[0].mainColor} inset`,
  },
  "&[data-kind='destination']": {
    borderColor: "#F87171",
    boxShadow: "0 0 0 1px #F87171 inset",
  },
  "&[data-kind='best']": {
    borderColor: routeCardThemes[1].mainColor,
    boxShadow: `0 0 0 1px ${routeCardThemes[1].mainColor} inset`,
  },
  "&[data-kind='candidate']": {
    borderColor: routeCardThemes[3].mainColor,
    boxShadow: `0 0 0 1px ${routeCardThemes[3].mainColor} inset`,
    background: "#162338",
  },
  "&[data-kind='pruned']": {
    opacity: 0.45,
    borderStyle: "dashed",
    background: "#111827",
  },
}));

export const GraphLine = styled("line")({
  stroke: "rgba(148,163,184,0.35)",
  strokeWidth: 2,
  strokeLinecap: "round",
  "&[data-best='true']": {
    stroke: routeCardThemes[1].mainColor,
    filter: `drop-shadow(0 0 8px ${routeCardThemes[1].mainColor})`,
  },
});

export const LegendRow = styled("div")({
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
});

export const LegendItem = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.secondary,
  fontSize: 14,
}));

export const LegendDot = styled("span")({
  width: 10,
  height: 10,
  borderRadius: "50%",
  display: "inline-block",
  "&[data-kind='origin']": {
    background: routeCardThemes[0].mainColor,
  },
  "&[data-kind='best']": {
    background: routeCardThemes[1].mainColor,
  },
  "&[data-kind='candidate']": {
    background: routeCardThemes[3].mainColor,
  },
  "&[data-kind='destination']": {
    background: "#F87171",
  },
});

export const NotesGrid = styled("div")({
  display: "grid",
  gap: 16,
});

export const NoteCard = styled("article")(({ theme }) => ({
  display: "grid",
  gap: 10,
  padding: 18,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: appPalette.surfaceSoft,
}));

export const NoteIcon = styled("div")({
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontSize: 22,
});

export const StatsStrip = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 20,
  alignItems: "stretch",
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: "rgba(2,6,23,0.22)",
  padding: 20,
  flexWrap: "wrap",
  ".MuiDivider-root": {
    borderColor: theme.palette.divider,
  },
}));

export const StatBox = styled("div")({
  display: "grid",
  gap: 6,
  minWidth: 180,
  flex: 1,
});

export const SectionTitle = styled("div")({
  display: "grid",
  gap: 8,
  marginBottom: 20,
});

export const ResultsGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "1fr",
  },
});

export const ResultCard = styled("article")(({ theme }) => ({
  display: "grid",
  gap: 14,
  padding: 20,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
}));

export const InfoRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const InfoBadge = styled("span")({
  display: "inline-flex",
  alignItems: "center",
  minHeight: 30,
  padding: "0 12px",
  borderRadius: 999,
  fontWeight: 600,
  fontSize: 13,
});

export const ResultPath = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
});

export const PathFragment = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
});

export const MetaStack = styled("div")({
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
});

export const MetaPill = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  minHeight: 30,
  padding: "0 12px",
  borderRadius: 999,
  background: appPalette.surfaceSoft,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  fontSize: 13,
}));

export const Eyebrow = styled("div")(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "uppercase",
  letterSpacing: 1,
  fontSize: 13,
  fontWeight: 700,
}));
