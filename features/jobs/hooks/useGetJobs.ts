import { useQuery } from "@tanstack/react-query";
import { getJobsApi } from "../api";
import { GetJobsParams, JobMeta } from "../types";

export const JOBS_QUERY_KEY = ["jobs"] as const;

const defaultMeta: JobMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetJobs(params: GetJobsParams) {
  const query = useQuery({
    queryKey: [...JOBS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getJobsApi(params);
      if (!response.success) throw new Error("Failed to fetch jobs");
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
