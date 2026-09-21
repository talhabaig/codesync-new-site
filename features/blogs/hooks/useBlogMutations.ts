import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createBlogApi,
  deleteBlogApi,
  deleteBlogsBulkApi,
  toggleBlogStatusApi,
  updateBlogApi,
} from "../api";
import { CreateBlogPayload, UpdateBlogPayload } from "../types";
import { BLOGS_QUERY_KEY } from "./useGetBlogs";

export function useBlogMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateBlogPayload) => createBlogApi(payload),
    onSuccess: () => {
      toast.success("Blog created successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateBlogPayload }) =>
      updateBlogApi(id, payload),
    onSuccess: () => {
      toast.success("Blog updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleBlogStatusApi,
    onSuccess: () => {
      toast.success("Blog status updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogApi,
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deleteBlogsBulkApi,
    onSuccess: () => {
      toast.success("Selected blogs deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createBlog: createMutation.mutateAsync,
    updateBlog: (id: string, payload: UpdateBlogPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    deleteBlog: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
