import { useQuery } from "@tanstack/react-query";
import { getPublicBlogCommentsApi } from "../api";
import { BlogMeta, GetPublicBlogCommentsParams } from "../types";

export const PUBLIC_BLOG_COMMENTS_QUERY_KEY = ["blog-comments", "public"] as const;

const defaultMeta: BlogMeta = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  getAll: false,
};

export function useGetPublicBlogComments(
  slug: string | undefined,
  params: GetPublicBlogCommentsParams = { page: 1, limit: 10 }
) {
  const query = useQuery({
    queryKey: [...PUBLIC_BLOG_COMMENTS_QUERY_KEY, slug, params],
    queryFn: async () => {
      const response = await getPublicBlogCommentsApi(slug as string, params);
      if (!response.success) throw new Error("Failed to fetch comments");
      return response;
    },
    enabled: !!slug,
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
