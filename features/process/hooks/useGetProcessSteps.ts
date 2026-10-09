import { useQuery } from "@tanstack/react-query";
import { getProcessStepsApi } from "../api";
import { GetProcessParams, ProcessMeta } from "../types";

export const PROCESS_QUERY_KEY = ["process"] as const;

const defaultMeta: ProcessMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetProcessSteps(params: GetProcessParams) {
  const query = useQuery({
    queryKey: [...PROCESS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getProcessStepsApi(params);
      if (!response.success) throw new Error("Failed to fetch process steps");
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
