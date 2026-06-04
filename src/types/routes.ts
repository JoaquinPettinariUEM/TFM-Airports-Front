export type RouteByQueryResponse = {
  id: string;
  name: string;
  city: string;
  country: string;
  label: string;
};

export type CreateRouteForm = {
  routePoints: RoutePointInput[];
  budget?: number;
  startDate?: Date;
  endDate?: Date;
};

export type RoutePointInput = {
  id: string;
  city: RouteByQueryResponse | null;
  stayDays: number;
};

export type RoutesResponse = {
  airports: Airports;
  bestRoute: RouteListItemResponse | null;
  recommendedRoutes: RouteListItemResponse[];
  moreExpensiveOptions: RouteListItemResponse[];
  notFoundCities?: string[];
};

export type PopularRoutesResponse = {
  airports: Airports;
  popularRoutes: RouteListItemResponse[];
};

export type CreateShareRouteResponse = {
  shareId: string;
  expiresInSeconds: number;
};

export type SharedRouteResponse = {
  route: EnrichedRouteDetail;
  budget?: number;
  requestedMaxStops?: number;
  createdAt: string;
  expiresInSeconds: number;
};

export type CityItineraryCategory = "History" | "Gastronomy" | "Culture" | "Must-see" | "Nature";

export type CityItineraryActivity = {
  time: string;
  name: string;
  description: string;
  type: CityItineraryCategory;
  mapQuery?: string | null;
  image?: string | null;
  moreInfoUrl?: string | null;
};

export type CityItineraryDay = {
  day: number;
  title: string;
  activities: CityItineraryActivity[];
};

export type CityItinerary = {
  city: string;
  country: string;
  citySlug: string;
  cacheKey: string;
  days: number;
  summary?: string;
  shortDescription: string;
  budgetLevel: string;
  estimatedDailyBudget: {
    min: number | null;
    max: number | null;
    currency: string;
  };
  currency: string;
  bestSeason: string;
  averageWeather: string;
  heroImage?: string | null;
  galleryImages: string[];
  tips: string[];
  itineraryDays: CityItineraryDay[];
  historicalInfoUrl?: string | null;
  mapUrl?: string | null;
  sourceModel?: string;
  promptVersion?: string;
};

export type CityItineraryResponse = {
  source: "database" | "generated" | "mock";
  cacheKey: string;
  itinerary: CityItinerary;
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
  flights: Flight[];
};

export type RouteMapped = RouteListItemResponse & { citiesInfo: AirportResponse[] };

export type Flight = {
  from: string;
  to: string;
  departureDate: string;
  arrivalDate: string;
  durationMinutes: number;
  stayDays: number;
  day: string;
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
  endDate?: string;
  pathTemplate?: string;
  stayDaysTemplate?: string;
  budget?: number;
  maxStops?: number;
};

export type EnrichedRouteDetail = RouteListItemResponse & {
  citiesInfo: {
    coordinates: Location;
    _id: string;
    slug: string;
    name: string;
    country: string;
    description: string;
    summary: string;
    image: string;
    wikipediaUrl: string;
    source: string;
    cachedAt: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type RouteBadge = "Best Balance" | "Best Price" | "Fastest" | "Smart Choice" | "Fewer Stops";
