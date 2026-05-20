import { Box, Button, Card, Divider, Grid, Typography, styled } from "@mui/material";

import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EastIcon from "@mui/icons-material/East";

import { RouteStat } from "../RouteStats/RouteStats";
import { RoutePath } from "../RoutePath/RoutePath";

import type { AirportResponse, RouteMapped } from "../../types/routes";
import { appPalette } from "../../theme";

type Props = {
  route: RouteMapped;
  departure: AirportResponse;
  arrival: AirportResponse;
  image: string;
  airports: AirportResponse[];
  viewDetailsRoute: (routes: RouteMapped) => void;
};

export function BestRouteCard({
  route,
  departure,
  arrival,
  image,
  airports,
  viewDetailsRoute,
}: Readonly<Props>) {
  return (
    <BestCard>
      <Grid container>
        <Grid size={{ xs: 12, md: 5 }}>
          <RouteImage src={`${import.meta.env.VITE_API_URL}/city-images/${image}`} alt={image} />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <RightColumn>
            <RouteTitle variant="h3">
              {[departure?.city, arrival?.city].join(" -> ")}
            </RouteTitle>

            <RouteDescription variant="body1">
              Our algorithm found the smartest route balancing price, travel time and
              interesting stopovers.
            </RouteDescription>

            <StatsWrap>
              <RouteStat icon={<PriceIcon />} label={`EUR ${route.cost}`} />
              <RouteStat icon={<LocationIcon />} label={`${route.path.length - 1} flights`} />
              <RouteStat icon={<DistanceIcon />} label={`${route.distance} km`} />
            </StatsWrap>

            <CardDivider />

            <RoutePath routes={airports} />

            <ActionWrap>
              <Button
                variant="contained"
                endIcon={<EastIcon />}
                onClick={() => viewDetailsRoute(route)}
              >
                View full details
              </Button>
            </ActionWrap>
          </RightColumn>
        </Grid>
      </Grid>
    </BestCard>
  );
}

const BestCard = styled(Card)(({ theme }) => ({
  overflow: "hidden",
  marginTop: 24,
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: appPalette.shadowHover,
}));

const RouteImage = styled("img")({
  width: "100%",
  height: "100%",
  minHeight: 260,
  objectFit: "cover",
  "@media (min-width:900px)": {
    minHeight: 520,
  },
});

const RightColumn = styled(Box)({
  padding: 24,
  display: "flex",
  flexDirection: "column",
  "@media (min-width:900px)": {
    padding: 40,
  },
});

const RouteTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  lineHeight: 1.1,
  marginBottom: 8,
  color: theme.palette.text.primary,
  fontSize: "2rem",
  "@media (min-width:900px)": {
    fontSize: "2.5rem",
  },
}));

const RouteDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 32,
  fontSize: "1rem",
}));

const StatsWrap = styled(Box)({
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 32,
});

const CardDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.divider,
  marginBottom: 32,
}));

const ActionWrap = styled(Box)({
  marginTop: "auto",
  paddingTop: 32,
  "& .MuiButton-root": {
    borderRadius: 12,
    paddingInline: 32,
    paddingBlock: 11.2,
    fontWeight: 700,
  },
});

const PriceIcon = styled(RequestQuoteOutlinedIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const LocationIcon = styled(FmdGoodOutlinedIcon)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const DistanceIcon = styled(SocialDistanceIcon)(({ theme }) => ({
  color: theme.palette.info.main,
}));
