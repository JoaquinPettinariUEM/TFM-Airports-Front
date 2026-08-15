import { Button, Chip, Container, Typography, styled } from "@mui/material";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { useNavigate } from "react-router-dom";
import { appPalette, routeCardThemes } from "../../../theme";
import {
  algorithmNotes,
  graphEdges,
  graphNodes,
  processSteps,
} from "../../HowItWorks/howItWorks.data";

export function HomeHowItWorksPreview() {
  const navigate = useNavigate();
  const previewSteps = processSteps.slice(0, 3);
  const previewNotes = algorithmNotes;

  return (
    <Section>
      <Container maxWidth="xl" sx={{ py: 6, display: "grid", gap: 3 }}>
        <HeaderRow>
          <div>
            <Eyebrow>How it works</Eyebrow>
            <Typography variant="h3">How RouteWise chooses better routes</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
              We use your cities, dates, stay days and budget to explore route combinations, filter
              weak options and surface the most useful alternatives.
            </Typography>
          </div>

          <Button
            variant="outlined"
            endIcon={<ArrowOutwardOutlinedIcon />}
            onClick={() => navigate("/how-it-works")}
          >
            See how it works
          </Button>
        </HeaderRow>

        <ContentGrid>
          <PreviewPanel>
            <MiniGraphWrap>
              <MiniGraphSvg
                viewBox="0 0 760 360"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {graphEdges.map((edge) => {
                  const from = graphNodes.find((node) => node.id === edge.from);
                  const to = graphNodes.find((node) => node.id === edge.to);

                  if (!from || !to) return null;

                  return (
                    <MiniGraphLine
                      key={`${edge.from}-${edge.to}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      data-best={edge.best || undefined}
                    />
                  );
                })}
              </MiniGraphSvg>

              {graphNodes.map((node) => (
                <MiniGraphNode
                  key={node.id}
                  style={{
                    left: `${(node.x / 760) * 100}%`,
                    top: `${(node.y / 360) * 100}%`,
                  }}
                  data-kind={node.kind}
                >
                  <span>{node.id}</span>
                </MiniGraphNode>
              ))}
            </MiniGraphWrap>

            <LegendRow>
              <LegendItem>
                <LegendDot data-kind="origin" />
                Origin
              </LegendItem>
              <LegendItem>
                <LegendDot data-kind="best" />
                Best path
              </LegendItem>
              <LegendItem>
                <LegendDot data-kind="candidate" />
                Explored
              </LegendItem>
            </LegendRow>
          </PreviewPanel>

          <InfoColumn>
            <StepsGrid>
              {previewSteps.map((item, index) => {
                const accent = routeCardThemes[index % routeCardThemes.length];

                return (
                  <StepCard key={item.step}>
                    <StepNumber>{item.step}</StepNumber>
                    <StepIcon style={{ color: accent.mainColor, background: accent.bgColor }}>
                      {item.icon}
                    </StepIcon>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography color="text.secondary">{item.description}</Typography>
                  </StepCard>
                );
              })}
            </StepsGrid>

            <CriteriaRow>
              {previewNotes.map((item, index) => {
                const accent = routeCardThemes[index % routeCardThemes.length];

                return (
                  <CriteriaCard key={item.title}>
                    <Chip
                      label={item.title}
                      sx={{
                        alignSelf: "flex-start",
                        color: accent.mainColor,
                        background: accent.bgColor,
                        fontWeight: 600,
                      }}
                    />
                    <Typography color="text.secondary">{item.description}</Typography>
                  </CriteriaCard>
                );
              })}
            </CriteriaRow>
          </InfoColumn>
        </ContentGrid>
      </Container>
    </Section>
  );
}

const Section = styled("section")({
  background: "linear-gradient(to bottom, rgba(11,16,32,1) 0%, rgba(13,19,36,1) 100%)",
});

const HeaderRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: 20,
  alignItems: "flex-end",
  flexWrap: "wrap",
});

const Eyebrow = styled("div")(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "uppercase",
  letterSpacing: 1,
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 8,
}));

const ContentGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "minmax(320px, 0.95fr) minmax(0, 1.05fr)",
  gap: 20,
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "1fr",
  },
});

const PreviewPanel = styled("div")(({ theme }) => ({
  display: "grid",
  gap: 16,
  padding: 20,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  boxShadow: appPalette.shadowStrong,
}));

const MiniGraphWrap = styled("div")({
  position: "relative",
  minHeight: 280,
  aspectRatio: "19 / 10",
  overflow: "hidden",
});

const MiniGraphSvg = styled("svg")({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
});

const MiniGraphLine = styled("line")({
  stroke: "rgba(148,163,184,0.28)",
  strokeWidth: 2,
  strokeLinecap: "round",
  "&[data-best='true']": {
    stroke: routeCardThemes[1].mainColor,
    filter: `drop-shadow(0 0 6px ${routeCardThemes[1].mainColor})`,
  },
});

const MiniGraphNode = styled("div")(({ theme }) => ({
  position: "absolute",
  width: 64,
  height: 64,
  borderRadius: "50%",
  transform: "translate(-50%, -50%)",
  display: "grid",
  placeItems: "center",
  border: `1px solid ${theme.palette.divider}`,
  background: "#111827",
  fontWeight: 700,
  fontSize: 13,
  boxShadow: "0 10px 24px rgba(2,6,23,0.28)",
  "&[data-kind='origin']": {
    borderColor: routeCardThemes[0].mainColor,
    color: routeCardThemes[0].mainColor,
  },
  "&[data-kind='best']": {
    borderColor: routeCardThemes[1].mainColor,
    color: routeCardThemes[1].mainColor,
  },
  "&[data-kind='candidate']": {
    borderColor: routeCardThemes[3].mainColor,
    color: routeCardThemes[3].mainColor,
    background: "#162338",
  },
  "&[data-kind='destination']": {
    borderColor: "#F87171",
    color: "#FCA5A5",
  },
  "&[data-kind='pruned']": {
    opacity: 0.45,
    borderStyle: "dashed",
  },
}));

const LegendRow = styled("div")({
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
});

const LegendItem = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.secondary,
  fontSize: 14,
}));

const LegendDot = styled("span")({
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
});

const InfoColumn = styled("div")({
  display: "grid",
  gap: 16,
});

const StepsGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
  "@media (max-width: 800px)": {
    gridTemplateColumns: "1fr",
  },
});

const StepCard = styled("article")(({ theme }) => ({
  display: "grid",
  gap: 12,
  padding: 18,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
}));

const StepNumber = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 13,
}));

const StepIcon = styled("div")({
  width: 48,
  height: 48,
  borderRadius: 8,
  display: "grid",
  placeItems: "center",
  fontSize: 24,
});

const CriteriaRow = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
  "@media (max-width: 800px)": {
    gridTemplateColumns: "1fr",
  },
});

const CriteriaCard = styled("article")(({ theme }) => ({
  display: "grid",
  gap: 12,
  padding: 18,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: appPalette.surfaceSoft,
}));
