import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Grow,
  Typography,
} from "@mui/material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { head, last } from "lodash";
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import { useGetRoutes } from "../../api/travelPlanApi";
import { BestRouteCard } from "../../components/BestRouteCard/BestRouteCard";
import { useRoutePreviewCities } from "../../hooks/useRoutePreviewCities";
import { RouteCard } from "../../components/RouteCard/RouteCard";
import RouteMainTitle from "../../components/RouteMainTitle/RouteMainTitle";
import { getAllCities } from "../../utils/cities";
import { routeCardThemes } from "../../utils/colors";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const BEST_ROUTE_INDEX = 1;
const ROUTES_PER_LOAD = 4;

function MyRoutes() {
  const [searchParams] = useSearchParams();
  const params = {
    from: searchParams.get("from") ?? "",
    to: searchParams.get("to") ?? "",
    budget: Number(searchParams.get("budget") ?? 500),
    maxStops: Number(searchParams.get("maxStops") ?? 2),
  };
  const { data: routes, isLoading } = useGetRoutes(params);

  const [visibleRoutes, setVisibleRoutes] = useState(ROUTES_PER_LOAD);

  const routesWithImages = useRoutePreviewCities(
    routes?.slice(0, visibleRoutes + BEST_ROUTE_INDEX) ?? []
  );

  const bestRoute = routesWithImages[0];

  const suggestedRoutes = routesWithImages.slice(
    BEST_ROUTE_INDEX,
    visibleRoutes + BEST_ROUTE_INDEX
  );

  const remainingRoutes = Math.max(
    (routes?.length ?? 0) - (visibleRoutes + BEST_ROUTE_INDEX),
    0
  );

  const { departure, arrival } = useMemo(() => {
    const cities = getAllCities(bestRoute?.route?.pathDetailed);

    return {
      departure: head(cities) ?? "",
      arrival: last(cities) ?? "",
    };
  }, [bestRoute]);

  if (isLoading || !routes || !bestRoute || !routesWithImages || !suggestedRoutes) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #0B1020, #111827)",
        color: "white",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <RouteMainTitle {...params} from={departure} to={arrival} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EmojiEventsIcon color="warning" />

          <Typography variant="h5">Best route for you</Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Our algorithm found the best balance between price, distance and experience.
        </Typography>

        <BestRouteCard route={bestRoute.route} image={bestRoute.previewCity} />
        <Alert variant="outlined" severity="success" sx={{ mt: 2 }}>
          Great Choice! This route offers the best balance of price, time and interesting
          cities.
        </Alert>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 6, mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <DoneAllIcon />
            <Typography variant="h5">Other smart alternatives</Typography>
          </Box>
          {remainingRoutes > 0 && (
            <Button
              variant="outlined"
              startIcon={<ArrowDownwardIcon />}
              onClick={() => setVisibleRoutes(prev => prev + ROUTES_PER_LOAD)}
              sx={{ px: 3 }}
            >
              Show more ({remainingRoutes})
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          {suggestedRoutes.map(({ route, previewCity }, index) => {
            const theme = routeCardThemes[index % routeCardThemes.length];

            return (
              <Grid key={route.score} size={{ xs: 12, md: 6, lg: 3 }}>
                <Grow in timeout={400 + index * 120} style={{ height: "100%" }}>
                  <Box>
                    <RouteCard
                      route={route}
                      previewCity={previewCity}
                      bestPrice={bestRoute.route.cost}
                      mainColor={theme.mainColor}
                      bgColor={theme.bgColor}
                    />
                  </Box>
                </Grow>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default MyRoutes;
