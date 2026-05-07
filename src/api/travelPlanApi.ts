import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import { apiRoutes } from "./apiRoutes";
import type { RouteByQueryResponse } from "../types/routes";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

const getAirportsByQuery = async (query: string): Promise<RouteByQueryResponse[]> => {
  const { data } = await api.get(`${apiRoutes.airportsSearch}?query=${query}`);

  return data;
};

export const useAirportSearch = (query: string) => {
  const debouncedQuery = useDebouncedValue(query, 400);

  return useQuery({
    queryKey: ["airports", debouncedQuery],
    queryFn: () => getAirportsByQuery(debouncedQuery),
    enabled: !!debouncedQuery,
    staleTime: 1000 * 60 * 5,
  });
};
