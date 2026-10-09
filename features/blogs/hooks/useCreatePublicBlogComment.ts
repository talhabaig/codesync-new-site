import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPublicBlogCommentApi } from "../api";
import { CreatePublicBlogCommentPayload } from "../types";
import { PUBLIC_BLOG_COMMENTS_QUERY_KEY } from "./useGetPublicBlogComments";
import { BLOG_COMMENTS_QUERY_KEY } from "./useGetBlogComments";

export function useCreatePublicBlogComment(slug: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreatePublicBlogCommentPayload) =>
      createPublicBlogCommentApi(slug, payload),
    onSuccess: () => {
      toast.success("Comment posted successfully");
      queryClient.invalidateQueries({ queryKey: PUBLIC_BLOG_COMMENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: BLOG_COMMENTS_QUERY_KEY });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    postComment: mutation.mutateAsync,
    isPosting: mutation.isPending,
  };
}
