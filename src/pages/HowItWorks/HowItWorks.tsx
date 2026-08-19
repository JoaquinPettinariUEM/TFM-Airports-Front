import { useEffect } from "react";
import { Alert, Button, Chip, Container, Stack, Typography } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/i18nContext";
import { routeCardThemes } from "../../theme";
import { HowItWorksGraph } from "./components/HowItWorksGraph";
import {
  exampleSearchPath,
  getAlgorithmNotes,
  getProcessSteps,
  getResultCards,
} from "./howItWorks.data";
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
  const { t } = useI18n();
  const processSteps = getProcessSteps(t);
  const algorithmNotes = getAlgorithmNotes(t);
  const resultCards = getResultCards(t);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <PageSection>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, display: "grid", gap: 5 }}>
        <HeroSection>
          <HeroCopy>
            <Eyebrow>{t("howItWorks.eyebrow")}</Eyebrow>
            <Typography variant="h2" className="tp-title">
              {t("howItWorks.title")}
            </Typography>
            <Typography variant="h5" color="text.secondary" className="tp-subtitle">
              {t("howItWorks.subtitle")}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                startIcon={<MapOutlinedIcon />}
                onClick={() => navigate("/create/route")}
              >
                {t("howItWorks.createRoute")}
              </Button>
              <Button variant="outlined" size="large" onClick={() => navigate("/")}>
                {t("howItWorks.backToHome")}
              </Button>
            </Stack>
          </HeroCopy>

          <HeroPanel>
            <PanelHeader>
              <Typography variant="h5">{t("howItWorks.exampleSearch")}</Typography>
              <Chip size="small" color="secondary" label={t("howItWorks.mockExample")} />
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
                  {t("howItWorks.budget")}
                </Typography>
                <Typography variant="h6">EUR 300</Typography>
              </MetricCard>
              <MetricCard>
                <Typography variant="body2" color="text.secondary">
                  {t("howItWorks.tripWindow")}
                </Typography>
                <Typography variant="h6">16 days</Typography>
              </MetricCard>
              <MetricCard>
                <Typography variant="body2" color="text.secondary">
                  {t("howItWorks.maxStops")}
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
              <Eyebrow>{t("howItWorks.insideEyebrow")}</Eyebrow>
              <Typography variant="h3">{t("howItWorks.insideTitle")}</Typography>
            </div>
            <Typography color="text.secondary" sx={{ maxWidth: 620 }}>
              {t("howItWorks.insideSubtitle")}
            </Typography>
          </TwoColumnHeader>

          <HowItWorksGraph algorithmNotes={algorithmNotes} />
        </LargePanel>

        <section>
          <SectionTitle>
            <Typography variant="h3">{t("howItWorks.resultsTitle")}</Typography>
            <Typography color="text.secondary">{t("howItWorks.resultsSubtitle")}</Typography>
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
          {t("howItWorks.infoAlert")}
        </Alert>
      </Container>
    </PageSection>
  );
}

export default HowItWorks;
