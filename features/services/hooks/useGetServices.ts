import { useQuery } from "@tanstack/react-query";
import { getServicesApi } from "../api";
import { GetServicesParams, ServiceMeta } from "../types";

export const SERVICES_QUERY_KEY = ["services"] as const;

const defaultMeta: ServiceMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetServices(params: GetServicesParams) {
  const query = useQuery({
    queryKey: [...SERVICES_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getServicesApi(params);
      if (!response.success) throw new Error("Failed to fetch services");
      return response;
    },
    placeholderData: (previous) => previous,
  });

  return {
    data: query.data?.data ?? [],
    meta: query.data?.meta ?? defaultMeta,
    isLoading: query.isPending,
    isFetching: query.isFetching,
    error: (query.error as Error | null)?.message ?? null,
    refetch: query.refetch,
  };
}
