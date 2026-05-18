import { create } from "zustand";
import type { Airports, EnrichedRouteDetail } from "../types/routes";

interface RouteStore {
  airports: Airports;
  selectedRoute?: EnrichedRouteDetail;
  setAirports: (airports: Airports) => void;
  setSelectedRoute: (route: EnrichedRouteDetail) => void;
}

export const useRouteStore = create<RouteStore>(set => ({
  airports: {},
  selectedRoute: undefined,
  setAirports: (airports: Airports) => set(() => ({ airports })),
  setSelectedRoute: (selectedRoute: EnrichedRouteDetail) =>
    set(() => ({ selectedRoute })),
}));
