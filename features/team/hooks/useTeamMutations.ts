import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createTeamMemberApi,
  deleteTeamMemberApi,
  deleteTeamMembersBulkApi,
  toggleTeamMemberStatusApi,
  updateTeamMemberApi,
  updateTeamMemberDisplayOrderApi,
} from "../api";
import { CreateTeamMemberPayload, UpdateTeamMemberPayload } from "../types";
import { TEAM_QUERY_KEY } from "./useGetTeamMembers";

export function useTeamMutations() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: TEAM_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateTeamMemberPayload) =>
      createTeamMemberApi(payload),
    onSuccess: () => {
      toast.success("Team member created");
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
      payload: UpdateTeamMemberPayload;
    }) => updateTeamMemberApi(id, payload),
    onSuccess: () => {
      toast.success("Team member updated");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleTeamMemberStatusApi,
    onSuccess: () => {
      toast.success("Team member status updated");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, displayOrder }: { id: string; displayOrder: number }) =>
      updateTeamMemberDisplayOrderApi(id, displayOrder),
    onSuccess: () => {
      toast.success("Display order updated");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeamMemberApi,
    onSuccess: () => {
      toast.success("Team member deleted");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteBulkMutation = useMutation({
    mutationFn: deleteTeamMembersBulkApi,
    onSuccess: () => {
      toast.success("Selected team members deleted");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    createTeamMember: createMutation.mutateAsync,
    updateTeamMember: (id: string, payload: UpdateTeamMemberPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    toggleStatus: toggleStatusMutation.mutateAsync,
    updateDisplayOrder: (id: string, displayOrder: number) =>
      updateOrderMutation.mutateAsync({ id, displayOrder }),
    deleteTeamMember: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending || deleteBulkMutation.isPending,
    createError: (createMutation.error as Error | null)?.message ?? null,
    updateError: (updateMutation.error as Error | null)?.message ?? null,
  };
}
