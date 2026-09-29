import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createProcessStepApi,
  deleteProcessStepApi,
  deleteProcessStepsBulkApi,
  toggleProcessStatusApi,
  updateProcessDisplayOrderApi,
  updateProcessStepApi,
} from "../api";
import { CreateProcessPayload, UpdateProcessPayload } from "../types";
import { PROCESS_QUERY_KEY } from "./useGetProcessSteps";

export function useProcessMutations() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: PROCESS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateProcessPayload) => createProcessStepApi(payload),
    onSuccess: () => {
      toast.success("Process step created successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProcessPayload }) =>
      updateProcessStepApi(id, payload),
    onSuccess: () => {
      toast.success("Process step updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleProcessStatusApi,
    onSuccess: () => {
      toast.success("Process status updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, displayOrder }: { id: string; displayOrder: number }) =>
      updateProcessDisplayOrderApi(id, displayOrder),
    onSuccess: () => {
      toast.success("Display order updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProcessStepApi,
    onSuccess: () => {
      toast.success("Process step deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deleteProcessStepsBulkApi,
    onSuccess: () => {
      toast.success("Selected process steps deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createProcessStep: createMutation.mutateAsync,
    updateProcessStep: (id: string, payload: UpdateProcessPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    updateDisplayOrder: (id: string, displayOrder: number) =>
      updateOrderMutation.mutateAsync({ id, displayOrder }),
    deleteProcessStep: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
