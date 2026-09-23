import { useQuery } from "@tanstack/react-query";
import { getPublicPortfolioBySlugApi } from "../api";
import { PORTFOLIO_QUERY_KEY } from "./useGetPortfolios";

export function useGetPortfolioBySlug(slug: string | undefined) {
  const query = useQuery({
    queryKey: [...PORTFOLIO_QUERY_KEY, "slug", slug],
    queryFn: () => getPublicPortfolioBySlugApi(slug as string),
    enabled: !!slug,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isPending,
    error: (query.error as Error | null)?.message ?? null,
    refetch: query.refetch,
  };
}
