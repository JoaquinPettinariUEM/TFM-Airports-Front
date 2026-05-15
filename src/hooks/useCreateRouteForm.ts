import { useState } from "react";
import type { CreateRouteForm } from "../types/routes";
import { useNavigate } from "react-router-dom";
import { differenceInDays, format } from "date-fns";

export function useCreateRouteForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateRouteForm>({
    from: null,
    to: null,
    budget: undefined,
    maxStops: 1,
    startDate: new Date(),
    endDate: undefined,
  });

  const updateField = <K extends keyof CreateRouteForm>(
    field: K,
    value: CreateRouteForm[K]
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = () => {
    if (!form.from || !form.to || !form.startDate || !form.endDate) return;
    const startDate = format(form.startDate, "yyyy-MM-dd");

    const tripDays = differenceInDays(form.endDate, form.startDate) + 1;

    navigate(
      `/searched/routes?from=${form.from.id}&to=${form.to.id}&budget=${
        form.budget
      }&maxStops=${form.maxStops}&tripDays=${String(tripDays)}&startDate=${startDate}`
    );
  };

  return {
    form,
    updateField,
    submit,
  };
}
