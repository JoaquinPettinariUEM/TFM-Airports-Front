import type { Flight, RouteMapped } from "../types/routes";

const euroFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatEuro(value: number) {
  return euroFormatter.format(Math.round(value));
}

export function formatCompactDistance(distance: number) {
  return new Intl.NumberFormat("es-ES").format(Math.round(distance));
}

export function computeRouteScoreOutOfTen(route: Pick<RouteMapped, "cost" | "distance" | "path">) {
  const stops = Math.max(route.path.length - 2, 0);
  const pricePenalty = Math.min(route.cost / 1400, 1) * 3.2;
  const distancePenalty = Math.min(route.distance / 5000, 1) * 2.8;
  const stopPenalty = Math.min(stops / 4, 1) * 2.0;
  const raw = 10 - pricePenalty - distancePenalty - stopPenalty;
  return Math.max(1, Math.min(10, Number(raw.toFixed(1))));
}

export function computeTotalTravelDuration(flights: Flight[]) {
  if (!flights.length) {
    return null;
  }

  const departureDate = new Date(flights[0].departureDate);
  const arrivalDate = new Date(flights[flights.length - 1].arrivalDate);
  const totalMinutes = Math.max(
    0,
    Math.round((arrivalDate.getTime() - departureDate.getTime()) / 60000),
  );

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `~${hours}h ${minutes}m`;
}
