import { useQuery } from "@tanstack/react-query";
import { getPublicBlogsApi } from "../api";
import { BlogMeta, GetBlogsParams } from "../types";

export const PUBLIC_BLOGS_QUERY_KEY = ["blogs", "public"] as const;

const defaultMeta: BlogMeta = {
  total: 0,
  page: 1,
  limit: 6,
  totalPages: 1,
  getAll: false,
};

export function useGetPublicBlogs(
  params: GetBlogsParams = {
    page: 1,
    limit: 6,
    sortBy: "displayOrder",
    sortOrder: "asc",
  }
) {
  const query = useQuery({
    queryKey: [...PUBLIC_BLOGS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getPublicBlogsApi(params);
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
  };
}
