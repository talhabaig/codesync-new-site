import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createTechStackApi,
  deleteTechStackApi,
  deleteTechStacksBulkApi,
  toggleTechStackStatusApi,
  updateTechStackApi,
} from "../api";
import { CreateTechStackPayload, UpdateTechStackPayload } from "../types";
import { TECH_STACKS_QUERY_KEY } from "./useGetTechStacks";

export function useTechStackMutations() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: TECH_STACKS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateTechStackPayload) => createTechStackApi(payload),
    onSuccess: () => {
      toast.success("Tech stack created successfully");
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
      payload: UpdateTechStackPayload;
    }) => updateTechStackApi(id, payload),
    onSuccess: () => {
      toast.success("Tech stack updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleTechStackStatusApi,
    onSuccess: () => {
      toast.success("Tech stack status updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTechStackApi,
    onSuccess: () => {
      toast.success("Tech stack deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deleteTechStacksBulkApi,
    onSuccess: () => {
      toast.success("Selected tech stacks deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createTechStack: createMutation.mutateAsync,
    updateTechStack: (id: string, payload: UpdateTechStackPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    deleteTechStack: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
