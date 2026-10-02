import { useQuery } from "@tanstack/react-query";
import { getPublicJobsApi } from "../api";
import { GetJobsParams, JobMeta } from "../types";

export const PUBLIC_JOBS_QUERY_KEY = ["jobs", "public"] as const;

const defaultMeta: JobMeta = {
  total: 0,
  page: 1,
  limit: 6,
  totalPages: 1,
  getAll: false,
};

export function useGetPublicJobs(
  params: GetJobsParams = {
    page: 1,
    limit: 6,
    sortBy: "displayOrder",
    sortOrder: "asc",
  }
) {
  const query = useQuery({
    queryKey: [...PUBLIC_JOBS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getPublicJobsApi(params);
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
  };
}
