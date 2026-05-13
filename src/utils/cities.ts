import type { AirportResponse, RouteListItemResponse } from "../types/routes";

export function getRouteAirports(
  route: RouteListItemResponse,
  airports: Record<string, AirportResponse>
) {
  return route.path.map(id => airports[id]).filter(Boolean);
}

export function getRouteCities(
  route: RouteListItemResponse,
  airports: Record<string, AirportResponse>
) {
  return getRouteAirports(route, airports).map(airport => airport.city);
}

export function getDepartureArrival(
  route: RouteListItemResponse,
  airports: Record<string, AirportResponse>
) {
  const airportsOfRoute = getRouteAirports(route, airports);

  return {
    departure: airportsOfRoute[0],
    arrival: airportsOfRoute[airportsOfRoute.length - 1],
  };
}
