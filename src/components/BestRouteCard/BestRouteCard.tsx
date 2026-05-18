import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";

import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EastIcon from "@mui/icons-material/East";

import { RouteStat } from "../RouteStats/RouteStats";
import { RoutePath } from "../RoutePath/RoutePath";

import type { AirportResponse, RouteMapped } from "../../types/routes";

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
    <Card
      sx={{
        overflow: "hidden",
        mt: 3,
        borderRadius: 4,
        backgroundColor: "#111827",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0px 10px 40px rgba(0,0,0,0.35)",
      }}
    >
      <Grid container>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            component="img"
            src={`${import.meta.env.VITE_API_URL}/city-images/${image}`}
            alt={image}
            sx={{
              width: "100%",
              height: "100%",
              minHeight: { xs: 260, md: 520 },
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 1,
                color: "#F9FAFB",
                fontSize: {
                  xs: "2rem",
                  md: "2.5rem",
                },
              }}
            >
              {departure?.city} → {arrival?.city}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#9CA3AF",
                mb: 4,
                fontSize: "1rem",
              }}
            >
              Our algorithm found the smartest route balancing price, travel time and
              interesting stopovers.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                mb: 4,
              }}
            >
              <RouteStat
                icon={<RequestQuoteOutlinedIcon sx={{ color: "#10B981" }} />}
                label={`€${route.cost}`}
              />

              <RouteStat
                icon={<FmdGoodOutlinedIcon sx={{ color: "#7C3AED" }} />}
                label={`${route.path.length - 1} flights`}
              />

              <RouteStat
                icon={<SocialDistanceIcon sx={{ color: "#3B82F6" }} />}
                label={`${route.distance} km`}
              />
            </Box>

            <Divider
              sx={{
                borderColor: "rgba(255,255,255,0.08)",
                mb: 4,
              }}
            />

            <RoutePath routes={airports} />

            <Box
              sx={{
                mt: "auto",
                pt: 4,
              }}
            >
              <Button
                variant="contained"
                endIcon={<EastIcon />}
                onClick={() => viewDetailsRoute(route)}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.4,
                  fontWeight: 700,
                }}
              >
                View full details
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
