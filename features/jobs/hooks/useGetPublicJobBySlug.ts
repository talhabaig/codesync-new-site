import { useQuery } from "@tanstack/react-query";
import { getPublicJobBySlugApi } from "../api";
import { PUBLIC_JOBS_QUERY_KEY } from "./useGetPublicJobs";

export function useGetPublicJobBySlug(slug: string | undefined) {
  const query = useQuery({
    queryKey: [...PUBLIC_JOBS_QUERY_KEY, "slug", slug],
    queryFn: () => getPublicJobBySlugApi(slug as string),
    enabled: !!slug,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isPending,
    error: (query.error as Error | null)?.message ?? null,
  };
}
