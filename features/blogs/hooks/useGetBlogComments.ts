import { useQuery } from "@tanstack/react-query";
import { getBlogCommentsApi } from "../api";
import { BlogMeta, GetBlogCommentsParams } from "../types";

export const BLOG_COMMENTS_QUERY_KEY = ["blog-comments"] as const;

const defaultMeta: BlogMeta = {
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1,
  getAll: false,
};

export function useGetBlogComments(params: GetBlogCommentsParams, enabled = true) {
  const query = useQuery({
    queryKey: [...BLOG_COMMENTS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getBlogCommentsApi(params);
      if (!response.success) throw new Error("Failed to fetch comments");
      return response;
    },
    enabled,
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
