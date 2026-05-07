import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { head, last } from "lodash";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import { useGetRoutes } from "../../api/travelPlanApi";
import { BestRouteCard } from "../../components/BestRouteCard/BestRouteCard";
import { useRoutePreviewCities } from "../../hooks/useRoutePreviewCities";
import { RouteCard } from "../../components/RouteCard/RouteCard";
import RouteMainTitle from "../../components/RouteMainTitle/RouteMainTitle";
import { getAllCities } from "../../utils/cities";

function MyRoutes() {
  const [searchParams] = useSearchParams();
  const params = {
    from: searchParams.get("from") ?? "",
    to: searchParams.get("to") ?? "",
    budget: Number(searchParams.get("budget") ?? 500),
    maxStops: Number(searchParams.get("maxStops") ?? 2),
  };

  const { data: routes, isLoading } = useGetRoutes(params);

  const routesWithImages = useRoutePreviewCities(routes?.slice(0, 5) ?? []);

  const bestRoute = useMemo(() => routesWithImages[0], [routesWithImages]);
  const suggestedRoutes = useMemo(() => routesWithImages.slice(1, 5), [routesWithImages]);

  const { departure, arrival } = useMemo(() => {
    const cities = getAllCities(bestRoute.route.pathDetailed);

    return {
      departure: head(cities) ?? "",
      arrival: last(cities) ?? "",
    };
  }, [bestRoute.route]);

  if (isLoading || !routes || !bestRoute || !routesWithImages) {
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
          <EmojiEventsIcon color="primary" />

          <Typography variant="h5">Best route for you</Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Our algorithm found the best balance between price, distance and experience.
        </Typography>

        <BestRouteCard route={bestRoute.route} image={bestRoute.previewCity} />

        <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>
          More suggestions
        </Typography>

        <Grid container spacing={3}>
          {suggestedRoutes.map(({ route, previewCity }, index) => (
            <Grid key={index} size={{ xs: 12, md: 6, lg: 3 }}>
              <RouteCard route={route} previewCity={previewCity} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default MyRoutes;
