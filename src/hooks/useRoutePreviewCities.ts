import type { AirportResponse, RouteListItemResponse } from "../types/routes";

export function useRoutePreviewCities(
  routes: RouteListItemResponse[],
  airports: Record<string, AirportResponse>
) {
  const usedCities = new Set<string>();

  return routes.map(route => {
    const middleCities = route.path
      .slice(1, -1)
      .map(id => airports[id]?.city)
      .filter(Boolean);

    const previewCity =
      middleCities.find(city => city && !usedCities.has(city)) ??
      middleCities[0] ??
      airports[route.path[0]]?.city ??
      "";

    if (previewCity) {
      usedCities.add(previewCity);
    }

    return {
      route,

      previewCity,
    };
  });
}
