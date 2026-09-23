import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createServiceSubsectionApi,
  deleteServiceSubsectionApi,
  deleteServiceSubsectionsBulkApi,
  toggleServiceSubsectionStatusApi,
  updateServiceSubsectionApi,
  updateServiceSubsectionDisplayOrderApi,
} from "../api";
import {
  CreateServiceSubsectionPayload,
  UpdateServiceSubsectionPayload,
} from "../types";
import { SERVICE_SUBSECTIONS_QUERY_KEY } from "./useGetServiceSubsections";

export function useServiceSubsectionMutations() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: SERVICE_SUBSECTIONS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateServiceSubsectionPayload) =>
      createServiceSubsectionApi(payload),
    onSuccess: () => {
      toast.success("Service subsection created successfully");
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
      payload: UpdateServiceSubsectionPayload;
    }) => updateServiceSubsectionApi(id, payload),
    onSuccess: () => {
      toast.success("Service subsection updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleServiceSubsectionStatusApi,
    onSuccess: () => {
      toast.success("Service subsection status updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, displayOrder }: { id: string; displayOrder: number }) =>
      updateServiceSubsectionDisplayOrderApi(id, displayOrder),
    onSuccess: () => {
      toast.success("Display order updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteServiceSubsectionApi,
    onSuccess: () => {
      toast.success("Service subsection deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deleteServiceSubsectionsBulkApi,
    onSuccess: () => {
      toast.success("Selected subsections deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createSubsection: createMutation.mutateAsync,
    updateSubsection: (id: string, payload: UpdateServiceSubsectionPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    updateDisplayOrder: (id: string, displayOrder: number) =>
      updateOrderMutation.mutateAsync({ id, displayOrder }),
    deleteSubsection: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
