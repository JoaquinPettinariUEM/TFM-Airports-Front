import { useState } from "react";
import type { CreateRouteForm, RouteByQueryResponse } from "../types/routes";
import { createSearchParams, useNavigate } from "react-router-dom";
import { addDays, differenceInDays, format } from "date-fns";

export function useCreateRouteForm() {
  const navigate = useNavigate();
  const MAX_ROUTE_POINTS = 5;
  const [form, setForm] = useState<CreateRouteForm>({
    routePoints: [
      {
        id: "city-1",
        city: null,
        stayDays: 2,
      },
      {
        id: "city-2",
        city: null,
        stayDays: 2,
      },
    ],
    budget: 300,
    startDate: new Date(),
    endDate: addDays(new Date(), 15),
  });

  const updateField = <K extends keyof CreateRouteForm>(field: K, value: CreateRouteForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    };

    const params = createSearchParams(queryParams);

    navigate(`/searched/routes?${params.toString()}`);
  };

  const addRoutePoint = () => {
    setForm((prev) => {
      if (prev.routePoints.length >= MAX_ROUTE_POINTS) return prev;
      const next = [...prev.routePoints];
      next.splice(next.length - 1, 0, {
        id: `stop-${Date.now()}-${Math.round(Math.random() * 1000)}`,
        city: null,
        stayDays: 2,
      });
      return {
        ...prev,
        routePoints: next,
      };
    });
  };

  const removeRoutePoint = (id: string) => {
    if (form.routePoints.length <= 2) return;
    setForm((prev) => ({
      ...prev,
      routePoints: prev.routePoints.filter((item) => item.id !== id),
    }));
  };

  const updateRoutePointCity = (id: string, city: RouteByQueryResponse | null) => {
    setForm((prev) => ({
      ...prev,
      routePoints: prev.routePoints.map((item) => (item.id === id ? { ...item, city } : item)),
    }));
  };

  const updateRoutePointStayDays = (id: string, stayDays: number) => {
    setForm((prev) => ({
      ...prev,
      routePoints: prev.routePoints.map((item) =>
        item.id === id
          ? {
              ...item,
              stayDays: Math.max(1, stayDays),
            }
          : item,
      ),
    }));
  };

  const reorderRoutePointsByIds = (sourceId?: string, targetId?: string) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    setForm((prev) => {
      const fromIndex = prev.routePoints.findIndex((item) => item.id === sourceId);
      const toIndex = prev.routePoints.findIndex((item) => item.id === targetId);
      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return prev;

      const next = [...prev.routePoints];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return prev;
      next.splice(toIndex, 0, moved);
      return {
        ...prev,
        routePoints: next,
      };
    });
  };

  return {
    form,
    maxRoutePoints: MAX_ROUTE_POINTS,
    updateField,
    addRoutePoint,
    removeRoutePoint,
    updateRoutePointCity,
    updateRoutePointStayDays,
    reorderRoutePointsByIds,
    tripDays,
    totalStayDays,
    remainingStayDays,
    isStayDaysWithinTrip,
    isFormValid,
    submit,
  };
}
