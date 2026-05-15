export type RouteByQueryResponse = {
  id: string;
  name: string;
  city: string;
  country: string;
  label: string;
};

export type CreateRouteForm = {
  from: RouteByQueryResponse | null;
  to: RouteByQueryResponse | null;
  budget?: number;
  maxStops?: number;
  startDate?: Date;
  endDate?: Date;
};

export type RoutesResponse = {
  airports: Airports;
  routes: RouteListItemResponse[];
};

export type Airports = Record<string, AirportResponse>;

export type RouteListItemResponse = {
  id: string;
  path: string[];
  cost: number;
  distance: number;
  score: number;
  previewCity: string;
  badge: RouteBadge;
};

export type AirportResponse = {
  _id: string;
  name: string;
  city: string;
  country: string;
  location: Location;
};

export type Location = {
  lat: number;
  lon: number;
};

export type GetRoutesParams = {
  from: string;
  to: string;
  tripDays: string;
  startDate: string;
  budget?: number;
  maxStops?: number;
};

export type GetRouteByKeyParams = {
  pathKey: string;
  startDate: string;
  tripDays: string;
  budget?: number;
  maxStop?: number;
};

export type RouteBadge = "Best Balance" | "Best Price" | "Fastest" | "Smart Choice";
