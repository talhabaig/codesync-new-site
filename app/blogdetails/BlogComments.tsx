"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../components/ui/CustomInput";
import { FieldLabel, fieldControlClass } from "../components/ui/FieldLabel";
import { useGetPublicBlogComments } from "../../features/blogs/hooks/useGetPublicBlogComments";
import { useCreatePublicBlogComment } from "../../features/blogs/hooks/useCreatePublicBlogComment";
import {
  publicBlogCommentSchema,
  PublicBlogCommentFormValues,
} from "../../features/blogs/validations";

function formatCommentDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function BlogComments({ slug }: { slug: string }) {
  const [page, setPage] = useState(1);
  const { data: comments, meta, isLoading, isFetching } = useGetPublicBlogComments(slug, {
    page,
    limit: 10,
  });
  const { postComment, isPosting } = useCreatePublicBlogComment(slug);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PublicBlogCommentFormValues>({
    resolver: yupResolver(publicBlogCommentSchema),
    defaultValues: { authorName: "", body: "" },
  });

  const totalPages = Math.max(meta.totalPages, 1);

  return (
    <section className="mx-auto max-w-5xl px-6 pb-14 md:px-8">
      <h2 className="mb-6 font-poppins text-2xl font-bold text-customDarkGray">
        Comments
        {meta.total > 0 ? <span className="ml-2 text-base font-medium text-gray-500">({meta.total})</span> : null}
      </h2>

      <form
        noValidate
        onSubmit={handleSubmit(async (values) => {
          await postComment({
            authorName: values.authorName.trim(),
            body: values.body.trim(),
          });
          reset();
          setPage(1);
        })}
        className="mb-8 rounded-2xl bg-white p-5 shadow-md md:p-6"
      >
        <p className="mb-4 text-sm text-gray-500">Leave a comment. Only your name and message are required.</p>
        <div className="space-y-4">
          <CustomInput
            label="Name"
            required
            error={errors.authorName?.message}
            {...register("authorName")}
          />
          <div className="space-y-1.5">
            <FieldLabel htmlFor="comment-body" required>
              Comment
            </FieldLabel>
            <textarea
              id="comment-body"
              rows={4}
              className={`${fieldControlClass(!!errors.body)} resize-y`}
              {...register("body")}
            />
            {errors.body ? <p className="text-xs text-red-600">{errors.body.message}</p> : null}
          </div>
          <button
            type="submit"
            disabled={isPosting}
            className="rounded-lg bg-customBlue1 px-5 py-2.5 text-sm font-medium text-white hover:bg-customBlue1/90 disabled:opacity-60"
          >
            {isPosting ? "Posting..." : "Post comment"}
          </button>
        </div>
      </form>

      {isLoading && comments.length === 0 ? (
        <p className="text-sm text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet. Be the first to share your thoughts.</p>
      ) : (
        <ul className={`space-y-4 ${isFetching ? "opacity-80" : ""}`}>
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-2xl bg-white p-4 shadow-sm md:p-5">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-customDarkGray">{comment.authorName}</p>
                <p className="text-xs text-gray-500">{formatCommentDate(comment.createdAt)}</p>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((current) => current - 1)}
            className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-customBlue1 shadow-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {meta.page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage((current) => current + 1)}
            className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-customBlue1 shadow-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
}
