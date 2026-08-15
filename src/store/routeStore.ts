import { addDays } from "date-fns";
import { create } from "zustand";
import type {
  Airports,
  CreateRouteForm,
  EnrichedRouteDetail,
  RouteByQueryResponse,
} from "../types/routes";

interface RouteStore {
  airports: Airports;
  selectedRoute?: EnrichedRouteDetail;
  searchForm: CreateRouteForm;
  setAirports: (airports: Airports) => void;
  setSelectedRoute: (route: EnrichedRouteDetail) => void;
  setSearchForm: (form: CreateRouteForm) => void;
  updateSearchField: <K extends keyof CreateRouteForm>(field: K, value: CreateRouteForm[K]) => void;
  addSearchRoutePoint: () => void;
  removeSearchRoutePoint: (id: string) => void;
  updateSearchRoutePointCity: (id: string, city: RouteByQueryResponse | null) => void;
  updateSearchRoutePointStayDays: (id: string, stayDays: number) => void;
  reorderSearchRoutePointsByIds: (sourceId?: string, targetId?: string) => void;
  resetSearchForm: () => void;
}

const MAX_ROUTE_POINTS = 5;

export const useRouteStore = create<RouteStore>((set) => ({
  airports: {},
  selectedRoute: undefined,
  searchForm: getDefaultSearchForm(),
  setAirports: (airports: Airports) => set(() => ({ airports })),
  setSelectedRoute: (selectedRoute: EnrichedRouteDetail) => set(() => ({ selectedRoute })),
  setSearchForm: (searchForm: CreateRouteForm) =>
    set(() => ({
      searchForm: normalizeSearchForm(searchForm),
    })),
  updateSearchField: (field, value) =>
    set((state) => ({
      searchForm: {
        ...state.searchForm,
        [field]: value,
      },
    })),
  addSearchRoutePoint: () =>
    set((state) => {
      if (state.searchForm.routePoints.length >= MAX_ROUTE_POINTS) return state;
      const next = [...state.searchForm.routePoints];
      next.splice(next.length - 1, 0, {
        id: createRoutePointId(),
        city: null,
        stayDays: 2,
      });

      return {
        searchForm: {
          ...state.searchForm,
          routePoints: next,
        },
      };
    }),
  removeSearchRoutePoint: (id: string) =>
    set((state) => {
      if (state.searchForm.routePoints.length <= 2) return state;

      return {
        searchForm: {
          ...state.searchForm,
          routePoints: state.searchForm.routePoints.filter((item) => item.id !== id),
        },
      };
    }),
  updateSearchRoutePointCity: (id: string, city: RouteByQueryResponse | null) =>
    set((state) => ({
      searchForm: {
        ...state.searchForm,
        routePoints: state.searchForm.routePoints.map((item) =>
          item.id === id ? { ...item, city } : item,
        ),
      },
    })),
  updateSearchRoutePointStayDays: (id: string, stayDays: number) =>
    set((state) => ({
      searchForm: {
        ...state.searchForm,
        routePoints: state.searchForm.routePoints.map((item) =>
          item.id === id
            ? {
                ...item,
                stayDays: Math.max(1, stayDays),
              }
            : item,
        ),
      },
    })),
  reorderSearchRoutePointsByIds: (sourceId?: string, targetId?: string) =>
    set((state) => {
      if (!sourceId || !targetId || sourceId === targetId) return state;

      const fromIndex = state.searchForm.routePoints.findIndex((item) => item.id === sourceId);
      const toIndex = state.searchForm.routePoints.findIndex((item) => item.id === targetId);

      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return state;

      const next = [...state.searchForm.routePoints];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return state;
      next.splice(toIndex, 0, moved);

      return {
        searchForm: {
          ...state.searchForm,
          routePoints: next,
        },
      };
    }),
  resetSearchForm: () =>
    set(() => ({
      searchForm: getDefaultSearchForm(),
    })),
}));

function getDefaultSearchForm(): CreateRouteForm {
  const today = startOfToday();

  return {
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
    startDate: today,
    endDate: addDays(today, 15),
  };
}

function normalizeSearchForm(form: Partial<CreateRouteForm>): CreateRouteForm {
  const fallback = getDefaultSearchForm();

  return {
    routePoints:
      form.routePoints?.length && form.routePoints.length >= 2
        ? form.routePoints.map((point, index) => ({
            id: point.id || `city-${index + 1}`,
            city: point.city ?? null,
            stayDays: Math.max(1, point.stayDays ?? 2),
          }))
        : fallback.routePoints,
    budget: form.budget ?? fallback.budget,
    startDate: form.startDate ? new Date(form.startDate) : fallback.startDate,
    endDate: form.endDate ? new Date(form.endDate) : fallback.endDate,
  };
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function createRoutePointId() {
  return `stop-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}
