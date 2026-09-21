import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createPortfolioApi,
  deletePortfolioApi,
  deletePortfoliosBulkApi,
  togglePortfolioStatusApi,
  updatePortfolioApi,
  updatePortfolioDisplayOrderApi,
} from "../api";
import { CreatePortfolioPayload, UpdatePortfolioPayload } from "../types";
import { PORTFOLIO_QUERY_KEY } from "./useGetPortfolios";

export function usePortfolioMutations() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreatePortfolioPayload) => createPortfolioApi(payload),
    onSuccess: () => {
      toast.success("Portfolio created successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePortfolioPayload }) =>
      updatePortfolioApi(id, payload),
    onSuccess: () => {
      toast.success("Portfolio updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: togglePortfolioStatusApi,
    onSuccess: () => {
      toast.success("Portfolio status updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, displayOrder }: { id: string; displayOrder: number }) =>
      updatePortfolioDisplayOrderApi(id, displayOrder),
    onSuccess: () => {
      toast.success("Display order updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePortfolioApi,
    onSuccess: () => {
      toast.success("Portfolio deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deletePortfoliosBulkApi,
    onSuccess: () => {
      toast.success("Selected portfolios deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createPortfolio: createMutation.mutateAsync,
    updatePortfolio: (id: string, payload: UpdatePortfolioPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    updateDisplayOrder: (id: string, displayOrder: number) =>
      updateOrderMutation.mutateAsync({ id, displayOrder }),
    deletePortfolio: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
