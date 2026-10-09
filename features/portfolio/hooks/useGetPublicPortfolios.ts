import { useQuery } from "@tanstack/react-query";
import { getPublicPortfoliosApi } from "../api";
import { GetPortfoliosParams, PortfolioMeta } from "../types";

export const PUBLIC_PORTFOLIO_QUERY_KEY = ["portfolio", "public"] as const;

const defaultMeta: PortfolioMeta = {
  total: 0,
  page: 1,
  limit: 4,
  totalPages: 1,
  getAll: false,
};

export function useGetPublicPortfolios(
  params: GetPortfoliosParams = {
    page: 1,
    limit: 4,
    sortBy: "displayOrder",
    sortOrder: "asc",
  }
) {
  const query = useQuery({
    queryKey: [...PUBLIC_PORTFOLIO_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getPublicPortfoliosApi(params);
      if (!response.success) throw new Error("Failed to fetch portfolios");
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
