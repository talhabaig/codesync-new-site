import { useQuery } from "@tanstack/react-query";
import { getPublicBlogBySlugApi } from "../api";
import { PUBLIC_BLOGS_QUERY_KEY } from "./useGetPublicBlogs";

export function useGetPublicBlogBySlug(slug: string | undefined) {
  const query = useQuery({
    queryKey: [...PUBLIC_BLOGS_QUERY_KEY, "slug", slug],
    queryFn: () => getPublicBlogBySlugApi(slug as string),
    enabled: !!slug,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isPending,
    error: (query.error as Error | null)?.message ?? null,
    refetch: query.refetch,
  };
}
