import { useQuery } from "@tanstack/react-query";
import { getBlogsApi } from "../api";
import { BlogMeta, GetBlogsParams } from "../types";

export const BLOGS_QUERY_KEY = ["blogs"] as const;

const defaultMeta: BlogMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetBlogs(params: GetBlogsParams) {
  const query = useQuery({
    queryKey: [...BLOGS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getBlogsApi(params);
      if (!response.success) throw new Error("Failed to fetch blogs");
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
