import type { RouteResponse } from "../types/routes";

export function useRoutePreviewCities(routes: RouteResponse[]) {
  const usedCities = new Set<string>();

  return routes.map(route => {
    const middleCities = route.pathDetailed.slice(1, -1).map(p => p.city);

    const previewCity =
      middleCities.find(city => !usedCities.has(city)) ??
      middleCities[0] ??
      route.pathDetailed[0]?.city;

    if (previewCity) {
      usedCities.add(previewCity);
    }

    return {
      route,
      previewCity,
    };
  });
}
