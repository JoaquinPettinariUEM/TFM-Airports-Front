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

type ScoreOptions = {
  budget?: number;
  requestedMaxStops?: number;
};

export function computeRouteScoreOutOfTen(
  route: Pick<RouteMapped, "cost" | "distance" | "path">,
  options: ScoreOptions = {},
) {
  const { budget, requestedMaxStops } = options;
  const stops = Math.max(route.path.length - 2, 0);
  let score = 9.8;

  if (Number.isFinite(budget) && (budget ?? 0) > 0) {
    const normalizedBudget = Number(budget);
    const ratio = route.cost / normalizedBudget;

    if (ratio <= 1.2) {
      score = 9.8;
    } else if (ratio <= 1.4) {
      score -= 0.4;
    } else if (ratio <= 1.6) {
      score -= 0.9;
    } else if (ratio <= 1.9) {
      score -= 1.6;
    } else {
      score -= 2.3;
    }
  } else {
    score -= Math.min(route.distance / 30000, 0.7);
  }

  if (Number.isFinite(requestedMaxStops) && (requestedMaxStops ?? 0) >= 1) {
    const stopDelta = Math.abs(stops - Number(requestedMaxStops));
    score -= Math.min(stopDelta * 0.2, 0.6);
  }

  return Math.max(5.5, Math.min(9.8, Number(score.toFixed(1))));
}

export function computeTotalTravelDuration(flights: Flight[]) {
  if (!flights.length) {
    return null;
  }

  const totalMinutes = flights.reduce((acc, flight) => acc + (flight.durationMinutes ?? 0), 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `~${hours}h ${minutes}m`;
}
