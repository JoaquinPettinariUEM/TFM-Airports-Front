import { Box, Container, Grid, Typography, styled } from "@mui/material";
import type { Ref } from "react";
import { useMemo } from "react";
import { useGetPopularRoutes } from "../../../api/travelPlanApi";
import { RouteCard } from "../../../components/RouteCard/RouteCard";
import { appPalette, routeCardThemes } from "../../../theme";
import type { RouteMapped } from "../../../types/routes";

type Props = {
  sectionRef?: Ref<HTMLElement>;
};

export function HomeRecommendationsSection({ sectionRef }: Readonly<Props>) {
  const { data } = useGetPopularRoutes();

  const airports = data?.airports ?? {};
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

  return (
    <Section ref={sectionRef} id="home-recommendations">
      <Container maxWidth="xl" sx={{ py: 6, display: "grid", gap: 4 }}>
        <section>
          <SectionHeader>
            <Typography variant="h3">Popular multi-city trips</Typography>
            <Typography color="textSecondary">
              Discover real routes planned by travelers like you
            </Typography>
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
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <EmptyRecommendations>
              <Typography variant="h6">No popular routes yet</Typography>
              <Typography color="textSecondary">
                We are preparing popular trip combinations.
              </Typography>
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
