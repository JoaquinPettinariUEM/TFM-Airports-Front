import { useState } from "react";
import type { CreateRouteForm } from "../types/routes";
import { useNavigate } from "react-router-dom";

export function useCreateRouteForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateRouteForm>({
    from: null,
    to: null,
    budget: undefined,
    maxStops: 1,
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
    if (!form.from || !form.to) return;

    navigate(
      `/searched/routes?from=${form.from.id}&to=${form.to.id}&budget=${form.budget}&maxStops=${form.maxStops}`
    );
  };

  return {
    form,
    updateField,
    submit,
  };
}
