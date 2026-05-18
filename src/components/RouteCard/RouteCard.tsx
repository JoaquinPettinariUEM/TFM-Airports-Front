import { Button, Chip, Divider, Stack, Typography } from "@mui/material";

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
    <StyledRouteCard maincolor={mainColor}>
      <RouteCardImage city={previewCity} />

      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {departure} → {arrival}
        </Typography>

        <Typography variant="body1" color="#9CA3AF" sx={{ mb: 2 }}>
          {viaText}
        </Typography>

        <PriceRow>
          <Typography variant="h5" color={mainColor}>
            €{route.cost}
          </Typography>

          {difference > 0 && (
            <InfoChip textColor={mainColor} bgColor={bgColor} label={`+€${difference}`} />
          )}
        </PriceRow>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, justifyContent: "space-between" }}
        >
          <Chip icon={<FlightIcon />} label={`${route.path.length - 1} flights`} />

          <Chip icon={<StraightenIcon />} label={`${route.distance} km`} />
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body2" sx={{ mb: 2 }}>
          {route.path.join(" → ")}
        </Typography>

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
