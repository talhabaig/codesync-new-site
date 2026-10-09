import { useQuery } from "@tanstack/react-query";
import { getTestimonialsApi } from "../api";
import { GetTestimonialsParams, TestimonialMeta } from "../types";

export const TESTIMONIALS_QUERY_KEY = ["testimonials"] as const;

const defaultMeta: TestimonialMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetTestimonials(params: GetTestimonialsParams) {
  const query = useQuery({
    queryKey: [...TESTIMONIALS_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getTestimonialsApi(params);
      if (!response.success) throw new Error("Failed to fetch testimonials");
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
