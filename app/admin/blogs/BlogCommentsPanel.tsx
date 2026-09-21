"use client";

import { BlogComment } from "../../../features/blogs/types";
import { useGetBlogComments } from "../../../features/blogs/hooks/useGetBlogComments";
import { useBlogCommentMutations } from "../../../features/blogs/hooks/useBlogCommentMutations";
import { CustomButton } from "../../components/ui/CustomButton";

function commentAuthor(comment: BlogComment) {
  return comment.authorName || comment.name || comment.authorEmail || comment.email || "Anonymous";
}

function commentBody(comment: BlogComment) {
  return comment.content || comment.message || comment.comment || "";
}

interface BlogCommentsPanelProps {
  blogId: string;
}

export function BlogCommentsPanel({ blogId }: BlogCommentsPanelProps) {
  const { data: comments, isLoading, error } = useGetBlogComments(
    { page: 1, limit: 20, blogId },
    !!blogId
  );
  const { setVisibility, deleteComment, isUpdating, isDeleting } = useBlogCommentMutations();

  if (isLoading) {
    return <p className="py-8 text-center text-sm text-gray-500">Loading comments...</p>;
  }

  if (error) {
    return <p className="py-8 text-center text-sm text-red-600">{error}</p>;
  }

  if (comments.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-500">No comments on this post yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-lg border border-gray-200 p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">{commentAuthor(comment)}</p>
              {(comment.email || comment.authorEmail) && (
                <p className="truncate text-xs text-gray-500">
                  {comment.email || comment.authorEmail}
                </p>
              )}
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                comment.isVisible
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {comment.isVisible ? "Visible" : "Hidden"}
            </span>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{commentBody(comment)}</p>
          <div className="mt-3 flex justify-end gap-2">
            <CustomButton
              type="button"
              variant="secondary"
              size="sm"
              disabled={isUpdating || isDeleting}
              onClick={() => setVisibility(comment.id, !comment.isVisible)}
            >
              {comment.isVisible ? "Hide" : "Show"}
            </CustomButton>
            <CustomButton
              type="button"
              variant="danger"
              size="sm"
              disabled={isUpdating || isDeleting}
              loading={isDeleting}
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </CustomButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
