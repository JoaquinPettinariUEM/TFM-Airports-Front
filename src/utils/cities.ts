import type { AirportResponse } from "../types/routes";

export const getAllCities = (path: AirportResponse[]) => {
  return path?.map((path: AirportResponse) => path.city);
};
