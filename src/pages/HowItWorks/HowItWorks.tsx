import { useEffect } from "react";
import { Alert, Button, Chip, Container, Stack, Typography } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useNavigate } from "react-router-dom";
import { routeCardThemes } from "../../theme";
import { HowItWorksGraph } from "./components/HowItWorksGraph";
import { algorithmNotes, exampleSearchPath, processSteps, resultCards } from "./howItWorks.data";
import {
  Arrow,
  Eyebrow,
  HeroCopy,
  HeroPanel,
  HeroSection,
  InfoBadge,
  InfoRow,
  LargePanel,
  MetricCard,
  MetricsRow,
  NodeDot,
  PageSection,
  PanelHeader,
  PathFragment,
  PathItem,
  PathWrap,
  ProcessCard,
  ProcessGrid,
  ResultCard,
  ResultsGrid,
  ResultPath,
  MetaPill,
  MetaStack,
  SectionTitle,
  StepBadge,
  StepIcon,
  TwoColumnHeader,
} from "./HowItWorks.styles";

function HowItWorks() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <PageSection>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, display: "grid", gap: 5 }}>
        <HeroSection>
          <HeroCopy>
            <Eyebrow>How it works</Eyebrow>
            <Typography variant="h2" className="tp-title">
              How RouteWise builds a smarter multi-city trip
            </Typography>
            <Typography variant="h5" color="text.secondary" className="tp-subtitle">
              We combine your route template, dates, stay days and budget to surface the travel
              paths that make the most sense.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                startIcon={<MapOutlinedIcon />}
                onClick={() => navigate("/create/route")}
              >
                Create your route
              </Button>
              <Button variant="outlined" size="large" onClick={() => navigate("/")}>
                Back to home
              </Button>
            </Stack>
          </HeroCopy>

          <HeroPanel>
            <PanelHeader>
              <Typography variant="h5">Example search</Typography>
              <Chip size="small" color="secondary" label="Mock example" />
            </PanelHeader>

            <PathWrap>
              {exampleSearchPath.map((city, index, array) => (
                <PathItem key={city}>
                  <NodeDot
                    data-kind={
                      index === 0 ? "origin" : index === array.length - 1 ? "destination" : "best"
                    }
                  />
                  <Typography variant="body1">{city}</Typography>
                  {index < array.length - 1 && <Arrow>{">"}</Arrow>}
                </PathItem>
              ))}
            </PathWrap>

            <MetricsRow>
              <MetricCard>
                <Typography variant="body2" color="text.secondary">
                  Budget
                </Typography>
                <Typography variant="h6">EUR 300</Typography>
              </MetricCard>
              <MetricCard>
                <Typography variant="body2" color="text.secondary">
                  Trip window
                </Typography>
                <Typography variant="h6">16 days</Typography>
              </MetricCard>
              <MetricCard>
                <Typography variant="body2" color="text.secondary">
                  Max stops
                </Typography>
                <Typography variant="h6">3</Typography>
              </MetricCard>
            </MetricsRow>
          </HeroPanel>
        </HeroSection>

        <ProcessGrid>
          {processSteps.map((item, index) => {
            const accent = routeCardThemes[index % routeCardThemes.length];

            return (
              <ProcessCard key={item.step}>
                <StepBadge>{item.step}</StepBadge>
                <StepIcon style={{ color: accent.mainColor, background: accent.bgColor }}>
                  {item.icon}
                </StepIcon>
                <Typography variant="h6">{item.title}</Typography>
                <Typography color="text.secondary">{item.description}</Typography>
              </ProcessCard>
            );
          })}
        </ProcessGrid>

        <LargePanel>
          <TwoColumnHeader>
            <div>
              <Eyebrow>Inside the search</Eyebrow>
              <Typography variant="h3">What the algorithm actually does</Typography>
            </div>
            <Typography color="text.secondary" sx={{ maxWidth: 620 }}>
              RouteWise does not just list flights. It explores possible city sequences, filters
              weak candidates, then ranks the remaining routes according to the trip criteria.
            </Typography>
          </TwoColumnHeader>

          <HowItWorksGraph algorithmNotes={algorithmNotes} />
        </LargePanel>

        <section>
          <SectionTitle>
            <Typography variant="h3">How to read the results</Typography>
            <Typography color="text.secondary">
              The app highlights different winners so you can choose what matters most for this
              trip.
            </Typography>
          </SectionTitle>

          <ResultsGrid>
            {resultCards.map((card) => (
              <ResultCard key={card.badge}>
                <InfoRow>
                  <InfoBadge
                    style={{ color: card.accent.mainColor, background: card.accent.bgColor }}
                  >
                    {card.badge}
                  </InfoBadge>
                </InfoRow>
                <Typography variant="h4">{card.price}</Typography>
                <Typography color="text.secondary">{card.subtitle}</Typography>
                <ResultPath>
                  {card.path.map((city, index) => (
                    <PathFragment key={city}>
                      <Chip size="small" label={city} />
                      {index < card.path.length - 1 && <Arrow>{">"}</Arrow>}
                    </PathFragment>
                  ))}
                </ResultPath>
                <MetaStack>
                  {card.meta.map((item) => (
                    <MetaPill key={item}>{item}</MetaPill>
                  ))}
                </MetaStack>
              </ResultCard>
            ))}
          </ResultsGrid>
        </section>

        <Alert
          variant="outlined"
          severity="info"
          icon={<CheckCircleOutlineOutlinedIcon />}
          sx={{ borderRadius: 2 }}
        >
          This page currently uses mocked explanatory examples so the product flow is easy to
          understand. We can later swap parts of it with live route examples from the backend.
        </Alert>
      </Container>
    </PageSection>
  );
}

export default HowItWorks;
