import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createJobApi,
  deleteJobApi,
  deleteJobsBulkApi,
  toggleJobStatusApi,
  updateJobApi,
} from "../api";
import { CreateJobPayload, UpdateJobPayload } from "../types";
import { JOBS_QUERY_KEY } from "./useGetJobs";

export function useJobMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: JOBS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateJobPayload) => createJobApi(payload),
    onSuccess: () => {
      toast.success("Job created successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateJobPayload }) =>
      updateJobApi(id, payload),
    onSuccess: () => {
      toast.success("Job updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleJobStatusApi,
    onSuccess: () => {
      toast.success("Job status updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJobApi,
    onSuccess: () => {
      toast.success("Job deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deleteJobsBulkApi,
    onSuccess: () => {
      toast.success("Selected jobs deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createJob: createMutation.mutateAsync,
    updateJob: (id: string, payload: UpdateJobPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    deleteJob: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
