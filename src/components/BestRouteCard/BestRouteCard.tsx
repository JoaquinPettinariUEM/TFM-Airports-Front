import { Box, Card, Grid, Typography, Divider, Button } from "@mui/material";

import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import { RouteStat } from "../RouteStats/RouteStats";
import { RoutePath } from "../RoutePath/RoutePath";
import type { RouteResponse } from "../../types/routes";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EastIcon from "@mui/icons-material/East";
import { getAllCities } from "../../utils/cities";

export function BestRouteCard({
  route,
  image,
}: Readonly<{ image: string; route: RouteResponse }>) {
  const cities = getAllCities(route.pathDetailed);

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
              <Typography variant="h5">{cities.join(" → ")}</Typography>

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
              <RouteStat
                icon={<RequestQuoteOutlinedIcon color="primary" />}
                label={`€${route.cost}`}
              />

              <RouteStat
                icon={<FmdGoodOutlinedIcon color="primary" />}
                label={`${route.path.length - 1} flights`}
              />

              <RouteStat
                icon={<SocialDistanceIcon color="primary" />}
                label={`${route.distance} km`}
              />
            </Box>

            <Divider />

            <RoutePath routes={route.pathDetailed} />

            <Button variant="contained" sx={{ width: 200 }} endIcon={<EastIcon />}>
              View full details
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
