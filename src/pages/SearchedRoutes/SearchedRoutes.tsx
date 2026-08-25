import { Alert, Box, Button, Container, Grid, Grow, Typography, styled } from "@mui/material";
import { useEffect } from "react";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

import { BestRouteCard } from "../../components/BestRouteCard/BestRouteCard";
import { RouteCard } from "../../components/RouteCard/RouteCard";
import RouteMainTitle from "../../components/RouteMainTitle/RouteMainTitle";

import { routeCardThemes } from "../../theme";

import { useSearchedRoutes } from "../../hooks/useSearchedRoutes";

import { AlternativesHeader, PageWrapper, SectionHeader } from "./styled";
import type { RouteMapped } from "../../types/routes";
import { useRouteStore } from "../../store/routeStore";
import { useEnrichRoute } from "../../api/travelPlanApi";
import { TravelLoadingScreen } from "../../components/TravelLoadingScreen/TravelLoadingScreen";
import { useI18n } from "../../i18n/i18nContext";

const ROUTES_PER_LOAD = 4;

function SearchedRoutes() {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const { setSelectedRoute, setAirports, setSearchForm } = useRouteStore();
  const { mutate: enrichRouteMutation, isPending } = useEnrichRoute();

  const navigate = useNavigate();

  const params = {
    from: searchParams.get("from") ?? "",
    to: searchParams.get("to") ?? "",
    tripDays: searchParams.get("tripDays") ?? "",
    startDate: searchParams.get("startDate") ?? "",
    endDate: searchParams.get("endDate") ?? "",
    pathTemplate: searchParams.get("pathTemplate") ?? "",
    stayDaysTemplate: searchParams.get("stayDaysTemplate") ?? "",
    budget: Number(searchParams.get("budget") ?? 500),
    maxStops: searchParams.get("maxStops") ? Number(searchParams.get("maxStops")) : undefined,
  };

  const {
    isLoading,
    airports,
    bestRoute,
    suggestedRoutes,
    expensiveSuggestedRoutes,
    notFoundCities,
    remainingRoutes,
    setVisibleRoutes,
    departure,
    arrival,
  } = useSearchedRoutes(params);

  useEffect(() => {
    const pathCodes = (params.pathTemplate || "")
      .split("->")
      .map((code) => code.trim())
      .filter(Boolean);
    const stayDays = (params.stayDaysTemplate || "").split(",").map((value) => Number(value));

    if (pathCodes.length < 2) return;

    setSearchForm({
      routePoints: pathCodes.map((code, index) => {
        const airport = airports[code];

        return {
          id: `route-point-${index + 1}-${code}`,
          city:
            code === "?"
              ? null
              : {
                  id: airport?._id ?? code,
                  name: airport?.name ?? code,
                  city: airport?.city ?? code,
                  country: airport?.country ?? "",
                  label: airport ? `${airport.city}, ${airport.country} (${airport._id})` : code,
                },
          stayDays: index === 0 ? 2 : Math.max(1, stayDays[index] || 2),
        };
      }),
      budget: params.budget,
      startDate: params.startDate ? new Date(params.startDate) : undefined,
      endDate: params.endDate ? new Date(params.endDate) : undefined,
    });
  }, [
    airports,
    params.budget,
    params.endDate,
    params.pathTemplate,
    params.startDate,
    params.stayDaysTemplate,
    setSearchForm,
  ]);

  const viewDetailsRoute = (route: RouteMapped) => {
    setAirports(airports);
    enrichRouteMutation(route, {
      onSuccess: (response) => {
        setSelectedRoute(response);
        navigate({
          pathname: `/route/details`,
          search: createSearchParams(
            Object.fromEntries(
              Object.entries({
                ...params,
                budget: String(params.budget),
                maxStops: params.maxStops !== undefined ? String(params.maxStops) : undefined,
              }).filter(([, value]) => value !== undefined),
            ) as Record<string, string>,
          ).toString(),
        });
      },
    });
  };

  if (isLoading || isPending) {
    return <TravelLoadingScreen from={params.from} to={params.to} />;
  }

  if (!bestRoute || !departure || !arrival) {
    return (
      <PageWrapper>
        <Container
          maxWidth="md"
          sx={{
            minHeight: "calc(100dvh - var(--tp-header-height) - 84px)",
            display: "flex",
          }}
        >
          <NoRoutesWrap>
            <SearchOffOutlinedIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="h4">{t("searchedRoutes.noRoutesTitle")}</Typography>
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              {t("searchedRoutes.noRoutesSubtitle")}
            </Typography>
            <Button variant="contained" onClick={() => navigate("/create/route")}>
              {t("searchedRoutes.backToSearch")}
            </Button>
          </NoRoutesWrap>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <RouteMainTitle
          {...params}
          maxStops={params.maxStops ?? 0}
          from={departure._id}
          to={arrival._id}
        />

        <SectionHeader>
          <EmojiEventsIcon color="warning" />

          <Typography variant="h4">{t("searchedRoutes.bestRouteTitle")}</Typography>
        </SectionHeader>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 2.5 }}>
          {t("searchedRoutes.bestRouteSubtitle")}
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
          {t("searchedRoutes.greatChoice")}
        </Alert>

        {notFoundCities.length > 0 && (
          <Alert
            variant="outlined"
            severity="warning"
            sx={{
              mt: 2,
              borderRadius: 2,
            }}
          >
            {t("searchedRoutes.notFoundCities", { cities: notFoundCities.join(", ") })}
          </Alert>
        )}

        {suggestedRoutes.length > 0 && (
          <>
            <AlternativesHeader>
              <SectionHeader>
                <DoneAllIcon />

                <Typography variant="h4">{t("searchedRoutes.otherAlternatives")}</Typography>
              </SectionHeader>

              {remainingRoutes > 0 && (
                <Button
                  variant="outlined"
                  endIcon={<ArrowDownwardIcon />}
                  onClick={() => setVisibleRoutes((prev) => prev + ROUTES_PER_LOAD)}
                >
                  {t("searchedRoutes.viewAllRoutes", { count: remainingRoutes })}
                </Button>
              )}
            </AlternativesHeader>

            <Grid container spacing={3}>
              {suggestedRoutes.map(({ route, previewCity }, index) => {
                const theme = routeCardThemes[index % routeCardThemes.length];

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
                      <Box sx={{ height: "100%" }}>
                        <RouteCard
                          route={route}
                          previewCity={previewCity}
                          airports={airports}
                          bestPrice={bestRoute.route.cost}
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
          </>
        )}

        {expensiveSuggestedRoutes.length > 0 && (
          <>
            <AlternativesHeader>
              <SectionHeader>
                <DoneAllIcon />
                <Typography variant="h5">{t("searchedRoutes.moreExpensiveTitle")}</Typography>
              </SectionHeader>
            </AlternativesHeader>

            <Grid container spacing={3}>
              {expensiveSuggestedRoutes.map(({ route, previewCity }, index) => {
                const theme =
                  routeCardThemes[(index + suggestedRoutes.length) % routeCardThemes.length];

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
                      <Box sx={{ height: "100%" }}>
                        <RouteCard
                          route={route}
                          previewCity={previewCity}
                          airports={airports}
                          bestPrice={bestRoute.route.cost}
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
          </>
        )}
      </Container>
    </PageWrapper>
  );
}

const NoRoutesWrap = styled(Box)(({ theme }) => ({
  marginTop: 56,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  background: theme.palette.background.paper,
  minHeight: 280,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: 20,
}));

export default SearchedRoutes;
