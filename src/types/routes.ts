export type RouteByQueryResponse = {
  id: string;
  name: string;
  city: string;
  country: string;
  label: string;
};

export type RouteResponse = {
  path: string[];
  cost: number;
  distance: number;
  score: number;
  pathDetailed: PathDetailed[];
};

export type PathDetailed = {
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
