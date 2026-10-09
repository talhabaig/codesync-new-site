import { useQuery } from "@tanstack/react-query";
import { getPortfoliosApi } from "../api";
import { GetPortfoliosParams, PortfolioMeta } from "../types";

export const PORTFOLIO_QUERY_KEY = ["portfolio"] as const;

const defaultMeta: PortfolioMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetPortfolios(params: GetPortfoliosParams) {
  const query = useQuery({
    queryKey: [...PORTFOLIO_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getPortfoliosApi(params);
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
    refetch: query.refetch,
  };
}
