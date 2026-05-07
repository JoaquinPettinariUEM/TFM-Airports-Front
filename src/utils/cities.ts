import type { PathDetailed } from "../types/routes";

export const getAllCities = (path: PathDetailed[]) => {
  return path?.map((path: PathDetailed) => path.city);
};
