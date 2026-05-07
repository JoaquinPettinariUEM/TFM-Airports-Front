import { Box, Card, Grid, Typography, Divider } from "@mui/material";

import WalletIcon from "@mui/icons-material/Wallet";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import { RouteStat } from "../RouteStats/RouteStats";
import { RoutePath } from "../RoutePath/RoutePath";
import type { PathDetailed, RouteResponse } from "../../types/routes";

export function BestRouteCard({
  route,
  image,
}: Readonly<{ image: string; route: RouteResponse }>) {
  const cities = route.pathDetailed.map((p: PathDetailed) => p.city);

  return (
    <Card
      sx={{
        overflow: "hidden",
        mt: 3,
      }}
    >
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={`${import.meta.env.VITE_API_URL}/city-images/${image}`}
            alt={image}
            sx={{
              width: "100%",
              height: "100%",
              minHeight: 420,
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="h3">{cities.join(" → ")}</Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Best balance between price, distance and experience
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <RouteStat icon={<WalletIcon color="primary" />} label={`€${route.cost}`} />

              <RouteStat
                icon={<AirlineStopsIcon color="primary" />}
                label={`${route.path.length - 1} flights`}
              />

              <RouteStat
                icon={<SocialDistanceIcon color="primary" />}
                label={`${route.distance} km`}
              />
            </Box>

            <Divider />

            <RoutePath cities={cities} />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
