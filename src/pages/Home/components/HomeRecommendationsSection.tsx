import { Box, Container, Grid, Typography, styled } from "@mui/material";
import { addDays } from "date-fns";
import type { Ref } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPopularRoutes } from "../../../api/travelPlanApi";
import { RouteCard } from "../../../components/RouteCard/RouteCard";
import { useI18n } from "../../../i18n/i18nContext";
import { useRouteStore } from "../../../store/routeStore";
import { appPalette, routeCardThemes } from "../../../theme";
import type { RouteMapped } from "../../../types/routes";

type Props = {
  sectionRef?: Ref<HTMLElement>;
};

export function HomeRecommendationsSection({ sectionRef }: Readonly<Props>) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { setSearchForm } = useRouteStore();
  const { data } = useGetPopularRoutes();

  const airports = useMemo(() => data?.airports ?? {}, [data]);
  const popularRoutesMapped = useMemo<RouteMapped[]>(
    () =>
      (data?.popularRoutes ?? []).map((route) => ({
        ...route,
        citiesInfo: route.path.map((code) => airports[code]).filter(Boolean),
      })),
    [data?.popularRoutes, airports],
  );

  const bestPrice = useMemo(() => {
    if (!popularRoutesMapped.length) return 0;
    return Math.min(...popularRoutesMapped.map((route) => route.cost));
  }, [popularRoutesMapped]);

  const handlePopularRouteClick = (route: RouteMapped) => {
    const startDate = startOfToday();
    const endDate = addDays(startDate, 15);

    setSearchForm({
      routePoints: route.path.map((code, index) => {
        const airport = airports[code];

        return {
          id: `popular-route-point-${index + 1}-${code}`,
          city: airport
            ? {
                id: airport._id,
                name: airport.name,
                city: airport.city,
                country: airport.country,
                label: `${airport.city}, ${airport.country} (${airport._id})`,
              }
            : null,
          stayDays: index === 0 ? 2 : Math.max(1, route.flights[index - 1]?.stayDays ?? 2),
        };
      }),
      budget: route.cost,
      startDate,
      endDate,
    });

    navigate("/create/route");
  };

  return (
    <Section ref={sectionRef} id="home-recommendations">
      <Container maxWidth="xl" sx={{ py: 6, display: "grid", gap: 4 }}>
        <section>
          <SectionHeader>
            <Typography variant="h3">{t("home.popularTitle")}</Typography>
            <Typography color="textSecondary">{t("home.popularSubtitle")}</Typography>
          </SectionHeader>

          {popularRoutesMapped.length ? (
            <Grid container spacing={3}>
              {popularRoutesMapped.map((route, index) => {
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
                    <Box sx={{ height: "100%" }}>
                      <RouteCard
                        route={route}
                        previewCity={route.previewCity}
                        airports={airports}
                        bestPrice={bestPrice}
                        mainColor={theme.mainColor}
                        bgColor={theme.bgColor}
                        viewDetailsRoute={() => undefined}
                        showPriceDelta={false}
                        showViewDetailsButton={false}
                        onCardClick={() => handlePopularRouteClick(route)}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <EmptyRecommendations>
              <Typography variant="h6">{t("home.popularEmptyTitle")}</Typography>
              <Typography color="textSecondary">{t("home.popularEmptySubtitle")}</Typography>
            </EmptyRecommendations>
          )}
        </section>
      </Container>
    </Section>
  );
}

const Section = styled("section")({
  background: "#0B1020",
  scrollMarginTop: "calc(var(--tp-header-height) + 16px)",
});

const SectionHeader = styled("div")({
  marginBottom: 24,
});

const EmptyRecommendations = styled("div")(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: 8,
  background: appPalette.surfaceSoft,
  minHeight: 130,
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  padding: 16,
}));

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
