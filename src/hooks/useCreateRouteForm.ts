import type { RouteByQueryResponse } from "../types/routes";
import { createSearchParams, useNavigate } from "react-router-dom";
import { differenceInDays, format } from "date-fns";
import { useRouteStore } from "../store/routeStore";

export function useCreateRouteForm() {
  const navigate = useNavigate();
  const {
    searchForm: form,
    updateSearchField,
    addSearchRoutePoint,
    removeSearchRoutePoint,
    updateSearchRoutePointCity,
    updateSearchRoutePointStayDays,
    reorderSearchRoutePointsByIds,
  } = useRouteStore();

  const MAX_ROUTE_POINTS = 5;

  const updateField = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    updateSearchField(field, value);
  };

  const tripDays =
    form.startDate && form.endDate
      ? Math.max(0, differenceInDays(form.endDate, form.startDate) + 1)
      : 0;

  const lastIndex = form.routePoints.length - 1;
  const pointsWithStay = form.routePoints.filter((_, index) => index > 0);
  const totalStayDays = pointsWithStay.reduce((sum, point) => sum + (point.stayDays || 0), 0);
  const remainingStayDays = Math.max(0, tripDays - totalStayDays);
  const startPoint = form.routePoints[0];
  const endPoint = form.routePoints[lastIndex];
  const hasRequiredCities = Boolean(startPoint?.city?.id && endPoint?.city?.id);
  const hasValidDates = Boolean(form.startDate && form.endDate && tripDays > 0);
  const hasValidStayDays = pointsWithStay.every((point) => point.stayDays >= 1);
  const hasValidBudget = form.budget === undefined || form.budget >= 0;
  const isStayDaysWithinTrip = totalStayDays <= tripDays;
  const isFormValid =
    hasRequiredCities &&
    hasValidDates &&
    hasValidStayDays &&
    hasValidBudget &&
    isStayDaysWithinTrip;

  const submit = () => {
    const start = form.routePoints[0];
    const end = form.routePoints[form.routePoints.length - 1];

    if (!start?.city || !end?.city || !form.startDate || !form.endDate || !isFormValid) return;

    const startDate = format(form.startDate, "yyyy-MM-dd");
    const endDate = format(form.endDate, "yyyy-MM-dd");
    const pathTemplate = form.routePoints.map((point) => point.city?.id ?? "?").join("->");
    const stayDaysTemplate = form.routePoints
      .map((point, index) => (index === 0 ? "0" : String(point.stayDays)))
      .join(",");

    const queryParams: Record<string, string> = {
      from: start.city.id,
      to: end.city.id,
      budget: String(form.budget ?? 300),
      tripDays: String(tripDays),
      startDate,
      endDate,
      pathTemplate,
      stayDaysTemplate,
      maxStops: String(form.routePoints.length - 1),
    };

    navigate(`/searched/routes?${createSearchParams(queryParams).toString()}`);
  };

  const addRoutePoint = () => {
    addSearchRoutePoint();
  };

  const removeRoutePoint = (id: string) => {
    removeSearchRoutePoint(id);
  };

  const updateRoutePointCity = (id: string, city: RouteByQueryResponse | null) => {
    updateSearchRoutePointCity(id, city);
  };

  const updateRoutePointStayDays = (id: string, stayDays: number) => {
    updateSearchRoutePointStayDays(id, stayDays);
  };

  return {
    form,
    maxRoutePoints: MAX_ROUTE_POINTS,
    updateField,
    addRoutePoint,
    removeRoutePoint,
    updateRoutePointCity,
    updateRoutePointStayDays,
    reorderRoutePointsByIds: reorderSearchRoutePointsByIds,
    tripDays,
    totalStayDays,
    remainingStayDays,
    isStayDaysWithinTrip,
    isFormValid,
    submit,
  };
}
