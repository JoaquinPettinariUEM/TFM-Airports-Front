import { create } from "zustand";
import type { Airports, RouteListItemResponse } from "../types/routes";

interface RouteStore {
  airports: Airports;
  selectedRoute?: RouteListItemResponse;
  setAirports: (airports: Airports) => void;
  setSelectedRoute: (route: RouteListItemResponse) => void;
}

export const useRouteStore = create<RouteStore>(set => ({
  airports: {},
  selectedRoute: undefined,
  setAirports: (airports: Airports) => set(() => ({ airports })),
  setSelectedRoute: (selectedRoute: RouteListItemResponse) =>
    set(() => ({ selectedRoute })),
}));
