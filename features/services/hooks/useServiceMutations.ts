import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createServiceApi,
  deleteServiceApi,
  deleteServicesBulkApi,
  toggleServiceHomeApi,
  toggleServiceStatusApi,
  updateDisplayOrderApi,
  updateServiceApi,
} from "../api";
import { CreateServicePayload, UpdateServicePayload } from "../types";
import { SERVICES_QUERY_KEY } from "./useGetServices";

export function useServiceMutations() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateServicePayload) => createServiceApi(payload),
    onSuccess: () => {
      toast.success("Service created successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateServicePayload }) =>
      updateServiceApi(id, payload),
    onSuccess: () => {
      toast.success("Service updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleServiceStatusApi,
    onSuccess: () => {
      toast.success("Service status updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleHomeMutation = useMutation({
    mutationFn: toggleServiceHomeApi,
    onSuccess: () => {
      toast.success("Home visibility updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, displayOrder }: { id: string; displayOrder: number }) =>
      updateDisplayOrderApi(id, displayOrder),
    onSuccess: () => {
      toast.success("Display order updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteServiceApi,
    onSuccess: () => {
      toast.success("Service deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deleteServicesBulkApi,
    onSuccess: () => {
      toast.success("Selected services deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createService: createMutation.mutateAsync,
    updateService: (id: string, payload: UpdateServicePayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    toggleHome: toggleHomeMutation.mutateAsync,
    updateDisplayOrder: (id: string, displayOrder: number) =>
      updateOrderMutation.mutateAsync({ id, displayOrder }),
    deleteService: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
