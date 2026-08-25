import { Box, Button, Container, Divider, Stack, Typography, styled } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FlightIcon from "@mui/icons-material/Flight";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../../i18n/i18nContext";
import { appPalette, routeCardThemes } from "../../../theme";
import { TripIcon } from "../../../components/TripIcon/TripIcon";
import PositanoWallpaper from "../../../assets/positano_wallpaper.jpg";

const iconStyle = { sx: { fontSize: 40 } };

type Props = {
  onSeeRecommendations: () => void;
};

export function HomeHero({ onSeeRecommendations }: Readonly<Props>) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const featureItems = [
    {
      title: t("home.featureSmartRoutesTitle"),
      description: t("home.featureSmartRoutesDescription"),
      icon: <FlightIcon {...iconStyle} />,
    },
    {
      title: t("home.featureMultipleCitiesTitle"),
      description: t("home.featureMultipleCitiesDescription"),
      icon: <LocationOnOutlinedIcon {...iconStyle} />,
    },
    {
      title: t("home.featureBudgetTitle"),
      description: t("home.featureBudgetDescription"),
      icon: <WalletOutlinedIcon {...iconStyle} />,
    },
    {
      title: t("home.featureFlexibleTitle"),
      description: t("home.featureFlexibleDescription"),
      icon: <VerifiedUserOutlinedIcon {...iconStyle} />,
    },
  ];

  return (
    <HeroSection>
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 4,
          py: 4,
        }}
      >
        <TextCenterWrap>
          <HeroContent>
            <TitleContainer>
              <TripIcon />
              <Typography variant="body1" color="secondary">
                {t("home.heroEyebrow")}
              </Typography>
            </TitleContainer>
            <Typography variant="h1" className="tp-title">
              {t("home.heroTitleLine1")}
              <br />
              {t("home.heroTitleLine2")}
            </Typography>
            <Typography variant="h5" className="tp-subtitle">
              {t("home.heroSubtitle")}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                size="large"
                variant="contained"
                startIcon={<MapOutlinedIcon />}
                onClick={() => navigate("/create/route")}
                sx={{ py: 2, px: 4 }}
              >
                {t("home.planTrip")}
              </Button>
              <Button
                size="large"
                variant="outlined"
                color="inherit"
                startIcon={<ExploreOutlinedIcon />}
                onClick={onSeeRecommendations}
                sx={{ py: 2, px: 4 }}
              >
                {t("home.seeRecommendations")}
              </Button>
            </Stack>
          </HeroContent>
        </TextCenterWrap>

        <HighlightsRow>
          {featureItems.map((item, index) => {
            const theme = routeCardThemes[index % routeCardThemes.length];
            return (
              <FeatureItem key={item.title}>
                <CircleIcon style={{ color: theme.mainColor, background: theme.bgColor }}>
                  {item.icon}
                </CircleIcon>
                <div>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography color="textSecondary">{item.description}</Typography>
                </div>
                {index < featureItems.length - 1 && <Divider orientation="vertical" flexItem />}
              </FeatureItem>
            );
          })}
        </HighlightsRow>
      </Container>
    </HeroSection>
  );
}

const HeroSection = styled("section")({
  position: "relative",
  height: "calc(100dvh - var(--tp-header-height))",
  display: "flex",
  alignItems: "stretch",
  backgroundImage: `url(${PositanoWallpaper})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center top",
  backgroundSize: "cover",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `linear-gradient(
      to right,
      rgba(2,6,23,0.92) 0%,
      rgba(2,6,23,0.76) 30%,
      rgba(2,6,23,0) 68%,
      rgba(2,6,23,0) 100%
    ), linear-gradient(
      to top,
      rgba(2,6,23,0.92) 0%,
      rgba(2,6,23,0.76) 25%,
      rgba(2,6,23,0) 68%,
      rgba(2,6,23,0) 100%
    )`,
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
});

const TextCenterWrap = styled("div")({
  flex: 1,
  display: "flex",
  alignItems: "center",
});

const HeroContent = styled("section")(({ theme }) => ({
  display: "grid",
  gap: 20,
  ".tp-title": {
    fontSize: "clamp(32px, 8vw, 60px)",
    fontWeight: 700,
    lineHeight: 1.02,
    letterSpacing: 0,
  },
  ".tp-subtitle": {
    maxWidth: 620,
    color: theme.palette.text.secondary,
  },
}));

const TitleContainer = styled(Box)({
  display: "flex",
  alignItems: "end",
});

const HighlightsRow = styled("section")(({ theme }) => ({
  display: "flex",
  gap: 14,
  padding: 32,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  background: "rgba(17,24,39,0.55)",
  backdropFilter: "blur(2px)",
  "& .MuiDivider-root": {
    borderColor: appPalette.borderSoft,
  },
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    "& .MuiDivider-root": {
      display: "none",
    },
  },
  "@media (max-width: 700px)": {
    gridTemplateColumns: "1fr",
  },
}));

const FeatureItem = styled("article")({
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  flex: 1,
});

const CircleIcon = styled("div")(({ theme }) => ({
  width: 65,
  height: 65,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "rgba(168,85,247,0.18)",
  color: theme.palette.primary.main,
  flexShrink: 0,
}));
