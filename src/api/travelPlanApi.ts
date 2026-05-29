import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import { apiRoutes } from "./apiRoutes";
import type {
  CreateShareRouteResponse,
  EnrichedRouteDetail,
  GetRoutesParams,
  PopularRoutesResponse,
  RouteByQueryResponse,
  RouteMapped,
  RoutesResponse,
  SharedRouteResponse,
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

const enrichRoute = async (body: RouteMapped | undefined): Promise<EnrichedRouteDetail> => {
  const { data } = await api.post(apiRoutes.routeDetail, body);

  return data;
};

const getPopularRoutes = async (): Promise<PopularRoutesResponse> => {
  const { data } = await api.get(apiRoutes.popularRoutes);

  return data;
};

const createShareRoute = async (body: {
  route: EnrichedRouteDetail;
  budget?: number;
  requestedMaxStops?: number;
}): Promise<CreateShareRouteResponse> => {
  const { data } = await api.post(apiRoutes.routeShare, body);
  return data;
};

const getSharedRoute = async (shareId: string): Promise<SharedRouteResponse> => {
  const { data } = await api.get(`${apiRoutes.routeShare}/${shareId}`);
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
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useEnrichRoute = () => {
  return useMutation({
    mutationFn: (params: RouteMapped) => enrichRoute(params),
  });
};

export const useGetPopularRoutes = () => {
  return useQuery({
    queryKey: ["popular-routes"],
    queryFn: getPopularRoutes,
    staleTime: 1000 * 60 * 10,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateShareRoute = () => {
  return useMutation({
    mutationFn: createShareRoute,
  });
};

export const useGetSharedRoute = (shareId?: string) => {
  return useQuery({
    queryKey: ["shared-route", shareId],
    queryFn: () => getSharedRoute(shareId ?? ""),
    enabled: Boolean(shareId),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
