import { useQuery } from "@tanstack/react-query";
import { getServiceSubsectionsApi } from "../api";
import { GetServiceSubsectionsParams, ServiceSubsectionMeta } from "../types";

export const SERVICE_SUBSECTIONS_QUERY_KEY = ["service-subsections"] as const;

const defaultMeta: ServiceSubsectionMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetServiceSubsections(params: GetServiceSubsectionsParams) {
  const query = useQuery({
    queryKey: [...SERVICE_SUBSECTIONS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getServiceSubsectionsApi(params);
      if (!response.success) throw new Error("Failed to fetch service subsections");
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
