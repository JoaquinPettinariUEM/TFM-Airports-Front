import { useMemo, useState } from "react";

import { useGetRoutes } from "../api/travelPlanApi";
import { useRoutePreviewCities } from "./useRoutePreviewCities";
import { getDepartureArrival, getRouteAirports } from "../utils/cities";
import type { AirportResponse, GetRoutesParams } from "../types/routes";

const ROUTES_PER_LOAD = 4;

export function useSearchedRoutes(params: GetRoutesParams) {
  const [visibleRoutes, setVisibleRoutes] = useState(ROUTES_PER_LOAD);

  const { data, isLoading } = useGetRoutes(params);

  const airports = data?.airports ?? {};
  const bestRouteRaw = data?.bestRoute ?? null;
  const recommendedRoutesRaw = data?.recommendedRoutes ?? [];
  const moreExpensiveOptionsRaw = data?.moreExpensiveOptions ?? [];

  const routes = useMemo(
    () => [...recommendedRoutesRaw, ...moreExpensiveOptionsRaw],
    [recommendedRoutesRaw, moreExpensiveOptionsRaw]
  );

  const bestRouteData = useRoutePreviewCities(bestRouteRaw ? [bestRouteRaw] : [], airports)[0];

  const recommendedWithImages = useRoutePreviewCities(
    recommendedRoutesRaw.slice(0, visibleRoutes),
    airports
  );
  const expensiveWithImages = useRoutePreviewCities(moreExpensiveOptionsRaw, airports);

  const suggestedRoutes = recommendedWithImages;
  const expensiveSuggestedRoutes = expensiveWithImages;

  const remainingRoutes = Math.max(recommendedRoutesRaw.length - visibleRoutes, 0);

  const bestRoute = useMemo(() => {
    if (!bestRouteData) return null;

    return {
      ...bestRouteData,
      airports: getRouteAirports(bestRouteData.route, airports),
    };
  }, [bestRouteData, airports]);

  const departureArrival = useMemo<{
    departure?: AirportResponse;
    arrival?: AirportResponse;
  }>(() => {
    if (!bestRoute) {
      return {
        departure: undefined,
        arrival: undefined,
      };
    }

    return getDepartureArrival(bestRoute.route, airports);
  }, [bestRoute, airports]);

  return {
    isLoading,
    airports,
    routes,
    recommendedRoutes: recommendedRoutesRaw,
    moreExpensiveOptions: moreExpensiveOptionsRaw,
    bestRoute,
    suggestedRoutes,
    expensiveSuggestedRoutes,
    remainingRoutes,
    visibleRoutes,
    setVisibleRoutes,
    departure: departureArrival?.departure,
    arrival: departureArrival?.arrival,
  };
}
