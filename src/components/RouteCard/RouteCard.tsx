import { Button, Chip, Divider, Stack, Typography, styled } from "@mui/material";

import FlightIcon from "@mui/icons-material/Flight";
import StraightenIcon from "@mui/icons-material/Straighten";
import EastIcon from "@mui/icons-material/East";

import { RouteCardImage } from "../RouteCardImage/RouteCardImage";
import { InfoChip } from "../InfoChip/InfoChip";

import type { AirportResponse, RouteMapped } from "../../types/routes";
import { getRouteCities } from "../../utils/cities";
import {
  BottomAction,
  CardContent,
  PriceRow,
  StyledRouteCard,
} from "../../pages/SearchedRoutes/styled";

type Props = {
  route: RouteMapped;
  previewCity: string;
  bestPrice: number;
  mainColor: string;
  bgColor: string;
  airports: Record<string, AirportResponse>;
  viewDetailsRoute: (routes: RouteMapped) => void;
};

export function RouteCard({
  route,
  previewCity,
  bestPrice,
  mainColor,
  bgColor,
  airports,
  viewDetailsRoute,
}: Readonly<Props>) {
  const cities = getRouteCities(route, airports);

  const departure = cities[0];
  const arrival = cities[cities.length - 1];

  const stopCities = cities.slice(1, -1);

  const difference = route.cost - bestPrice;

  const viaText =
    stopCities.length > 0 ? `Via ${stopCities.join(" & ")}` : "Direct flight";

  return (
    <StyledRouteCard mainColor={mainColor}>
      <RouteCardImage city={previewCity} />

      <CardContent>
        <TitleText variant="h5">{[departure, arrival].join(" -> ")}</TitleText>

        <SubtitleText variant="body1">{viaText}</SubtitleText>

        <PriceRow>
          <Typography variant="h5" color={mainColor}>
            {`EUR ${route.cost}`}
          </Typography>

          {difference > 0 && (
            <InfoChip textColor={mainColor} bgColor={bgColor} label={`+EUR ${difference}`} />
          )}
        </PriceRow>

        <StatsStack direction="row" spacing={1}>
          <Chip icon={<FlightIcon />} label={`${route.path.length - 1} flights`} />
          <Chip icon={<StraightenIcon />} label={`${route.distance} km`} />
        </StatsStack>

        <ContentDivider />

        <PathText variant="body2">{route.path.join(" -> ")}</PathText>

        <BottomAction>
          <Button
            variant="outlined"
            fullWidth
            endIcon={<EastIcon />}
            onClick={() => viewDetailsRoute(route)}
          >
            View Details
          </Button>
        </BottomAction>
      </CardContent>
    </StyledRouteCard>
  );
}

const TitleText = styled(Typography)({
  marginBottom: 8,
});

const SubtitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 16,
}));

const StatsStack = styled(Stack)({
  marginBottom: 16,
  justifyContent: "space-between",
});

const ContentDivider = styled(Divider)({
  marginBottom: 16,
});

const PathText = styled(Typography)({
  marginBottom: 16,
});
