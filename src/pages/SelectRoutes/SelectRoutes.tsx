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
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useMemo, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { useGetRoutes } from "../../api/travelPlanApi";

import { BestRouteCard } from "../../components/BestRouteCard/BestRouteCard";
import { RouteCard } from "../../components/RouteCard/RouteCard";
import RouteMainTitle from "../../components/RouteMainTitle/RouteMainTitle";

import { routeCardThemes } from "../../utils/colors";

import { useRoutePreviewCities } from "../../hooks/useRoutePreviewCities";

const BEST_ROUTE_INDEX = 1;

const ROUTES_PER_LOAD = 4;

function MyRoutes() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = {
    from: searchParams.get("from") ?? "",
    to: searchParams.get("to") ?? "",
    tripDays: searchParams.get("tripDays") ?? "",
    startDate: searchParams.get("startDate") ?? "",
    budget: Number(searchParams.get("budget") ?? 500),
    maxStops: Number(searchParams.get("maxStops") ?? 2),
  };

  const [visibleRoutes, setVisibleRoutes] = useState(ROUTES_PER_LOAD);

  const { data, isLoading } = useGetRoutes(params);

  const airports = data?.airports ?? {};

  const routes = data?.routes ?? [];

  const routesWithImages = useRoutePreviewCities(
    routes.slice(0, visibleRoutes + BEST_ROUTE_INDEX),
    airports
  );

  const bestRoute = useMemo(() => {
    const airportsOfRoute = routesWithImages[0]?.route?.path
      .map(id => airports?.[id])
      .filter(Boolean);

    return { ...routesWithImages[0], airports: airportsOfRoute };
  }, [airports, routesWithImages]);

  const suggestedRoutes = routesWithImages.slice(
    BEST_ROUTE_INDEX,
    visibleRoutes + BEST_ROUTE_INDEX
  );

  const remainingRoutes = Math.max(routes.length - (visibleRoutes + BEST_ROUTE_INDEX), 0);

  const departure = airports[bestRoute?.route?.path?.[0]];

  const arrival = airports[bestRoute?.route?.path?.[bestRoute.route.path.length - 1]];

  const viewDetailsRoute = (routesKey: string[]) => {
    navigate({
      pathname: `/route/details/${routesKey.join("->")}`,
      search: createSearchParams({
        startDate: params.startDate,
        budget: String(params.budget),
        maxStops: String(params.maxStops),
        tripDays: String(params.tripDays),
      }).toString(),
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!bestRoute) {
    return <Typography variant="h5">No routes found</Typography>;
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
        <RouteMainTitle {...params} from={departure._id} to={arrival._id} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EmojiEventsIcon color="warning" />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            Best route for you
          </Typography>
        </Box>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1,
            mb: 3,
          }}
        >
          Our algorithm found the best balance between price, distance and experience.
        </Typography>

        <BestRouteCard
          route={bestRoute.route}
          departure={departure}
          arrival={arrival}
          image={bestRoute.previewCity}
          airports={bestRoute.airports}
          viewDetailsRoute={viewDetailsRoute}
        />

        <Alert
          variant="outlined"
          severity="success"
          sx={{
            mt: 2,

            borderRadius: 2,
          }}
        >
          Great Choice! This route offers the best balance of price, time and interesting
          cities.
        </Alert>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <DoneAllIcon />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
            >
              Other smart alternatives
            </Typography>
          </Box>

          {remainingRoutes > 0 && (
            <Button
              variant="outlined"
              startIcon={<ArrowDownwardIcon />}
              onClick={() => setVisibleRoutes(prev => prev + ROUTES_PER_LOAD)}
              sx={{
                px: 3,

                borderRadius: 999,

                textTransform: "none",
              }}
            >
              Show more ({remainingRoutes})
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          {suggestedRoutes.map(({ route, previewCity }, index) => {
            const theme = routeCardThemes[index % routeCardThemes.length];
            const airportsOfRoute = route.path
              .map(id => airports?.[id]?.city)
              .filter(Boolean);

            return (
              <Grid
                key={route.id}
                size={{
                  xs: 12,
                  md: 6,
                  lg: 3,
                }}
              >
                <Grow in timeout={400 + index * 120}>
                  <Box
                    sx={{
                      height: "100%",
                    }}
                  >
                    <RouteCard
                      route={route}
                      departure={departure._id}
                      arrival={arrival._id}
                      previewCity={previewCity}
                      bestPrice={bestRoute.route.cost}
                      airportsOfRoute={airportsOfRoute}
                      mainColor={theme.mainColor}
                      bgColor={theme.bgColor}
                      viewDetailsRoute={viewDetailsRoute}
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
