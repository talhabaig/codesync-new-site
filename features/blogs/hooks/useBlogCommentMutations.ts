import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBlogCommentApi, updateBlogCommentVisibilityApi } from "../api";
import { BLOG_COMMENTS_QUERY_KEY } from "./useGetBlogComments";

export function useBlogCommentMutations() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: BLOG_COMMENTS_QUERY_KEY });

  const visibilityMutation = useMutation({
    mutationFn: ({ id, isVisible }: { id: string; isVisible: boolean }) =>
      updateBlogCommentVisibilityApi(id, isVisible),
    onSuccess: () => {
      toast.success("Comment visibility updated successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogCommentApi,
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    setVisibility: (id: string, isVisible: boolean) =>
      visibilityMutation.mutateAsync({ id, isVisible }),
    deleteComment: deleteMutation.mutateAsync,
    isUpdating: visibilityMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
