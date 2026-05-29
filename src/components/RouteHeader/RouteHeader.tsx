import { Box, Button, Divider, Paper, Typography, styled } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import type { EnrichedRouteDetail } from "../../types/routes";
import { routeCardThemes } from "../../theme";
import {
  computeRouteScoreOutOfTen,
  computeTotalTravelDuration,
  formatCompactDistance,
  formatEuro,
} from "../../utils/format";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  route: EnrichedRouteDetail;
  budget?: number;
  requestedMaxStops?: number;
  onShare?: () => void;
}

export function RouteHeader({ route, budget, requestedMaxStops, onShare }: Readonly<Props>) {
  const navigate = useNavigate();
  const location = useLocation();

  const totalStops = Math.max(route.path.length - 2, 0);
  const totalCities = route.path.length;
  const score = computeRouteScoreOutOfTen(route, { budget, requestedMaxStops });
  const totalDuration = computeTotalTravelDuration(route.flights) ?? "-";

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <HeaderTitle variant="h2">Full Route Details</HeaderTitle>
        <HeaderActions>
          {onShare && (
            <Button variant="contained" startIcon={<ShareOutlinedIcon />} onClick={onShare}>
              Share
            </Button>
          )}
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() =>
              navigate({
                pathname: "/searched/routes",
                search: location.search,
              })
            }
          >
            Back to results
          </Button>
        </HeaderActions>
      </Box>
      <HeaderSubtitle>Every stop. Every detail. Your complete journey.</HeaderSubtitle>

      <SummaryCard elevation={0}>
        <MetricsRow>
          <MetricBlock>
            <MetricValue colorVariant="success">{formatEuro(route.cost)}</MetricValue>
            <MetricLabel>Total Price</MetricLabel>
          </MetricBlock>
          <MetricDivider orientation="vertical" flexItem />
          <MetricBlock>
            <MetricValue colorVariant="secondary">{`${totalStops} stops`}</MetricValue>
            <MetricLabel>{`${totalCities} cities`}</MetricLabel>
          </MetricBlock>
          <MetricDivider orientation="vertical" flexItem />
          <MetricBlock>
            <MetricValue colorVariant="info">{`${formatCompactDistance(route.distance)} km`}</MetricValue>
            <MetricLabel>Total Distance</MetricLabel>
          </MetricBlock>
          <MetricDivider orientation="vertical" flexItem />
          <MetricBlock>
            <MetricValue colorVariant="warning">{`${score}/10`}</MetricValue>
            <MetricLabel>Route Score</MetricLabel>
          </MetricBlock>
          <MetricDivider orientation="vertical" flexItem />
          <MetricBlock>
            <MetricValue>{totalDuration}</MetricValue>
            <MetricLabel>Total Travel Time</MetricLabel>
          </MetricBlock>
        </MetricsRow>

        <PathRow>
          {route.citiesInfo.map((step, index) => {
            const color = routeCardThemes[index % routeCardThemes.length].mainColor;
            const airportId = route.path[index];

            return (
              <PathStepWrap key={`${step}-${index}`}>
                <Typography sx={{ color }}>{step.name}</Typography>
                <PathStep style={{ color }}>({airportId})</PathStep>
                {index < route.path.length - 1 && <EastIcon fontSize="small" />}
              </PathStepWrap>
            );
          })}
        </PathRow>
      </SummaryCard>
    </Box>
  );
}

const HeaderTitle = styled(Typography)({
  fontWeight: 700,
});

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  marginTop: 10,
  color: theme.palette.text.secondary,
  fontSize: 18,
}));

const HeaderActions = styled(Box)({
  display: "flex",
  gap: 8,
});

const SummaryCard = styled(Paper)(({ theme }) => ({
  marginTop: 20,
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  overflow: "visible",
  position: "relative",
}));

const MetricsRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr auto 1fr",
  alignItems: "stretch",
  "@media (max-width: 1200px)": {
    gridTemplateColumns: "1fr 1fr",
  },
});

const MetricBlock = styled(Box)({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minHeight: 96,
  justifyContent: "center",
});

const MetricDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.divider,
  "@media (max-width: 1200px)": {
    display: "none",
  },
}));

const MetricValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "colorVariant",
})<{ colorVariant?: "success" | "secondary" | "info" | "warning" }>(({ theme, colorVariant }) => {
  const colorMap = {
    success: theme.palette.success.main,
    secondary: theme.palette.secondary.main,
    info: theme.palette.info.main,
    warning: theme.palette.warning.main,
  };

  return {
    fontWeight: 700,
    fontSize: 42,
    lineHeight: 1.1,
    color: colorVariant ? colorMap[colorVariant] : theme.palette.text.primary,
    "@media (max-width: 1200px)": {
      fontSize: 32,
    },
  };
});

const MetricLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const PathRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  flexWrap: "wrap",
  padding: 12,
  border: `1px solid ${theme.palette.divider}`,
}));

const PathStepWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.secondary,
}));

const PathStep = styled(Typography)({
  fontWeight: 700,
});
