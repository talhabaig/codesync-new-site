import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createTestimonialApi,
  deleteTestimonialApi,
  deleteTestimonialsBulkApi,
  toggleTestimonialFeaturedApi,
  toggleTestimonialStatusApi,
  updateTestimonialApi,
} from "../api";
import { CreateTestimonialPayload, UpdateTestimonialPayload } from "../types";
import { TESTIMONIALS_QUERY_KEY } from "./useGetTestimonials";

export function useTestimonialMutations() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: TESTIMONIALS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateTestimonialPayload) =>
      createTestimonialApi(payload),
    onSuccess: () => {
      toast.success("Testimonial created");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateTestimonialPayload;
    }) => updateTestimonialApi(id, payload),
    onSuccess: () => {
      toast.success("Testimonial updated");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleTestimonialStatusApi,
    onSuccess: () => {
      toast.success("Testimonial status updated");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: toggleTestimonialFeaturedApi,
    onSuccess: () => {
      toast.success("Featured status updated");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonialApi,
    onSuccess: () => {
      toast.success("Testimonial deleted");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deleteTestimonialsBulkApi,
    onSuccess: () => {
      toast.success("Selected testimonials deleted");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createTestimonial: createMutation.mutateAsync,
    updateTestimonial: (id: string, payload: UpdateTestimonialPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    toggleFeatured: toggleFeaturedMutation.mutateAsync,
    deleteTestimonial: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
