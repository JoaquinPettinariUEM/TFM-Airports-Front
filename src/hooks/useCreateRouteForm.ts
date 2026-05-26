import { useState } from "react";
import type { CreateRouteForm, RouteByQueryResponse } from "../types/routes";
import { useNavigate } from "react-router-dom";
import { addDays, differenceInDays, format } from "date-fns";

export function useCreateRouteForm() {
  const navigate = useNavigate();
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
    budget: undefined,
    startDate: new Date(),
    endDate: addDays(new Date(), 15),
  });

  const updateField = <K extends keyof CreateRouteForm>(field: K, value: CreateRouteForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = () => {
    const start = form.routePoints[0];
    const end = form.routePoints[form.routePoints.length - 1];
    if (!start?.city || !end?.city || !form.startDate || !form.endDate) return;

    const startDate = format(form.startDate, "yyyy-MM-dd");
    const tripDays = differenceInDays(form.endDate, form.startDate) + 1;
    const middlePoints = form.routePoints.slice(1, -1);
    const selectedStopovers = middlePoints.filter((item) => item.city?.id);
    const via = selectedStopovers.map((item) => item.city?.id).join(",");
    const stayDays = selectedStopovers.map((item) => item.stayDays).join(",");
    const computedMaxStops = Math.max(1, middlePoints.length + 1);

    navigate(
      `/searched/routes?from=${start.city.id}&to=${end.city.id}&budget=${
        form.budget
      }&maxStops=${computedMaxStops}&tripDays=${String(tripDays)}&startDate=${startDate}&via=${via}&stayDays=${stayDays}`,
    );
  };

  const addRoutePoint = () => {
    setForm((prev) => {
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
              stayDays,
            }
          : item,
      ),
    }));
  };

  const reorderRoutePointsById = (sourceId: string, targetId: string) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    setForm((prev) => {
      const next = [...prev.routePoints];
      const fromIndex = next.findIndex((item) => item.id === sourceId);
      const toIndex = next.findIndex((item) => item.id === targetId);
      if (fromIndex < 0 || toIndex < 0) return prev;

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
    updateField,
    addRoutePoint,
    removeRoutePoint,
    updateRoutePointCity,
    updateRoutePointStayDays,
    reorderRoutePointsById,
    submit,
  };
}
