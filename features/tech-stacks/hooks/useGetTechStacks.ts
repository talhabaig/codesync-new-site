import { useQuery } from "@tanstack/react-query";
import { getTechStacksApi } from "../api";
import { GetTechStacksParams, TechStackMeta } from "../types";

export const TECH_STACKS_QUERY_KEY = ["tech-stacks"] as const;

const defaultMeta: TechStackMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetTechStacks(params: GetTechStacksParams) {
  const query = useQuery({
    queryKey: [...TECH_STACKS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getTechStacksApi(params);
      if (!response.success) throw new Error("Failed to fetch tech stacks");
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
