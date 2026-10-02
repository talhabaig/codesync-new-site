"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BlogComment } from "../../../features/blogs/types";
import { useGetBlogComments } from "../../../features/blogs/hooks/useGetBlogComments";
import { useBlogCommentMutations } from "../../../features/blogs/hooks/useBlogCommentMutations";
import { CustomButton } from "../../components/ui/CustomButton";
import { CustomModal } from "../../components/ui/CustomModal";

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

interface BlogCommentsPanelProps {
  blogId: string;
}

export function BlogCommentsPanel({ blogId }: BlogCommentsPanelProps) {
  const [page, setPage] = useState(1);
  const [visibility, setVisibility] = useState<"ALL" | "VISIBLE" | "HIDDEN">("ALL");
  const [pendingDelete, setPendingDelete] = useState<BlogComment | null>(null);

  const params = {
    page,
    limit: 10,
    blogId,
    isVisible: visibility === "ALL" ? undefined : visibility === "VISIBLE",
  };

  const { data: comments, meta, isLoading, isFetching, error } = useGetBlogComments(
    params,
    !!blogId
  );
  const { setVisibility: toggleVisibility, deleteComment, isUpdating, isDeleting } =
    useBlogCommentMutations();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <select
          value={visibility}
          onChange={(event) => {
            setVisibility(event.target.value as "ALL" | "VISIBLE" | "HIDDEN");
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-customLightBlue2"
        >
          <option value="ALL">All comments</option>
          <option value="VISIBLE">Visible</option>
          <option value="HIDDEN">Hidden</option>
        </select>
      </div>

      {error ? <p className="text-center text-sm text-red-600">{error}</p> : null}

      {isLoading && comments.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">No comments on this post yet.</p>
      ) : (
        <ul className={`space-y-3 ${isFetching ? "opacity-60" : ""}`}>
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-lg border border-gray-200 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">{comment.authorName}</p>
                  <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
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
              <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{comment.body}</p>
              <div className="mt-3 flex justify-end gap-2">
                <CustomButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={isUpdating || isDeleting}
                  onClick={() => toggleVisibility(comment.id, !comment.isVisible)}
                >
                  {comment.isVisible ? "Hide" : "Show"}
                </CustomButton>
                <CustomButton
                  type="button"
                  variant="danger"
                  size="sm"
                  disabled={isUpdating || isDeleting}
                  onClick={() => setPendingDelete(comment)}
                >
                  Delete
                </CustomButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      {meta.totalPages > 1 ? (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Page {meta.page} of {Math.max(meta.totalPages, 1)}
          </span>
          <div className="flex gap-1">
            <CustomButton
              type="button"
              variant="secondary"
              size="sm"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((current) => current - 1)}
              className="border-gray-300 p-2"
            >
              <FaChevronLeft className="h-3 w-3" />
            </CustomButton>
            <CustomButton
              type="button"
              variant="secondary"
              size="sm"
              disabled={page >= meta.totalPages || isFetching}
              onClick={() => setPage((current) => current + 1)}
              className="border-gray-300 p-2"
            >
              <FaChevronRight className="h-3 w-3" />
            </CustomButton>
          </div>
        </div>
      ) : null}

      {pendingDelete ? (
        <CustomModal
          open={!!pendingDelete}
          onClose={() => !isDeleting && setPendingDelete(null)}
          title="Delete comment"
          size="sm"
          footer={
            <>
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => setPendingDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="button"
                variant="danger"
                loading={isDeleting}
                onClick={async () => {
                  await deleteComment(pendingDelete.id);
                  setPendingDelete(null);
                }}
              >
                Delete
              </CustomButton>
            </>
          }
        >
          <p className="text-sm text-gray-600">
            Delete the comment from <span className="font-semibold">{pendingDelete.authorName}</span>?
            This cannot be undone.
          </p>
        </CustomModal>
      ) : null}
    </div>
  );
}
