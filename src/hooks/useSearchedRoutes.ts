import { useMemo, useState } from "react";

import { useGetRoutes } from "../api/travelPlanApi";
import { useRoutePreviewCities } from "./useRoutePreviewCities";
import { getDepartureArrival, getRouteAirports } from "../utils/cities";
import type { AirportResponse, GetRoutesParams } from "../types/routes";

const BEST_ROUTE_INDEX = 1;
const ROUTES_PER_LOAD = 4;

export function useSearchedRoutes(params: GetRoutesParams) {
  const [visibleRoutes, setVisibleRoutes] = useState(ROUTES_PER_LOAD);

  const { data, isLoading } = useGetRoutes(params);

  const airports = data?.airports ?? {};
  const routes = data?.routes ?? [];

  const routesWithImages = useRoutePreviewCities(
    routes.slice(0, visibleRoutes + BEST_ROUTE_INDEX),
    airports
  );

  const bestRouteData = routesWithImages[0];

  const suggestedRoutes = routesWithImages.slice(
    BEST_ROUTE_INDEX,
    visibleRoutes + BEST_ROUTE_INDEX
  );

  const remainingRoutes = Math.max(routes.length - (visibleRoutes + BEST_ROUTE_INDEX), 0);

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
    bestRoute,
    suggestedRoutes,
    remainingRoutes,
    visibleRoutes,
    setVisibleRoutes,
    departure: departureArrival?.departure,
    arrival: departureArrival?.arrival,
  };
}
