import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import { apiRoutes } from "./apiRoutes";
import type {
  GetRouteByKeyParams,
  GetRoutesParams,
  RouteByQueryResponse,
  RoutesResponse,
} from "../types/routes";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

const getAirportsByQuery = async (query: string): Promise<RouteByQueryResponse[]> => {
  const { data } = await api.get(`${apiRoutes.airportsSearch}?query=${query}`);

  return data;
};

const getRoutes = async (params: GetRoutesParams | null): Promise<RoutesResponse> => {
  const { data } = await api.get(apiRoutes.routes, {
    params,
  });

  return data;
};

const getRouteByKey = async (params: GetRouteByKeyParams | null) => {
  const { data } = await api.get(`${apiRoutes.routes}/${params?.pathKey}`, {
    params,
  });

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

export const useGetRoutes = (params: GetRoutesParams | null) => {
  return useQuery({
    queryKey: ["routes", params],
    queryFn: () => getRoutes(params),
    enabled: !!params,
  });
};

export const useGetRouteByKey = (params: GetRouteByKeyParams | null) => {
  return useQuery({
    queryKey: ["route", params?.pathKey],
    queryFn: () => getRouteByKey(params),
    enabled: !!params,
  });
};
