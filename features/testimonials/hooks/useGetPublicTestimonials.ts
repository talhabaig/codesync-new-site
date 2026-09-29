import { useQuery } from "@tanstack/react-query";
import { getPublicTestimonialsApi } from "../api";
import { GetTestimonialsParams, TestimonialMeta } from "../types";

export const PUBLIC_TESTIMONIALS_QUERY_KEY = ["testimonials", "public"] as const;

const defaultMeta: TestimonialMeta = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  getAll: false,
};

export function useGetPublicTestimonials(
  params: GetTestimonialsParams = {
    getAll: true,
    sortBy: "displayOrder",
    sortOrder: "asc",
  }
) {
  const query = useQuery({
    queryKey: [...PUBLIC_TESTIMONIALS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getPublicTestimonialsApi(params);
      if (!response.success) throw new Error("Failed to fetch testimonials");
      return response;
    },
  });

  return {
    data: query.data?.data ?? [],
    meta: query.data?.meta ?? defaultMeta,
    isLoading: query.isPending,
    error: (query.error as Error | null)?.message ?? null,
  };
}
