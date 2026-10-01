"use client";

import { KeyboardEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaTimes } from "react-icons/fa";
import { CustomInput } from "../../components/ui/CustomInput";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { RichTextEditor } from "../../components/ui/RichTextEditor";
import { FieldLabel, fieldControlClass } from "../../components/ui/FieldLabel";
import { CreateBlogPayload } from "../../../features/blogs/types";
import { blogFormSchema } from "../../../features/blogs/validations";
import { useGetBlogs } from "../../../features/blogs/hooks/useGetBlogs";

interface BlogFormProps {
  formId: string;
  excludeBlogId?: string | null;
  defaultValues: CreateBlogPayload;
  apiError: string | null;
  onSubmit: (values: CreateBlogPayload) => Promise<void>;
}

export function BlogForm({
  formId,
  excludeBlogId,
  defaultValues,
  apiError,
  onSubmit,
}: BlogFormProps) {
  const [tagDraft, setTagDraft] = useState("");
  const { data: blogOptions, isLoading: isLoadingOptions } = useGetBlogs({
    getAll: true,
    sortBy: "displayOrder",
    sortOrder: "asc",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogPayload>({
    resolver: yupResolver(blogFormSchema),
    defaultValues: {
      ...defaultValues,
      author: defaultValues.author ?? "",
      tags: defaultValues.tags ?? [],
      relatedBlogIds: defaultValues.relatedBlogIds ?? [],
    },
  });

  const selectableBlogs = blogOptions.filter((blog) => blog.id !== excludeBlogId);

  const addTag = (current: string[], onChange: (tags: string[]) => void) => {
    const next = tagDraft.trim().replace(/,$/, "");
    if (!next) return;
    if (!current.some((tag) => tag.toLowerCase() === next.toLowerCase())) {
      onChange([...current, next]);
    }
    setTagDraft("");
  };

  const onTagKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    current: string[],
    onChange: (tags: string[]) => void
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(current, onChange);
    }
    if (event.key === "Backspace" && !tagDraft && current.length) {
      onChange(current.slice(0, -1));
    }
  };

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(async (values) => {
        const relatedBlogIds = [...new Set(values.relatedBlogIds)].filter(
          (id) => id && id !== excludeBlogId
        );
        await onSubmit({
          ...values,
          author: values.author.trim(),
          tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
          relatedBlogIds,
        });
      })}
      className="grid gap-4 sm:grid-cols-2"
    >
      {apiError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{apiError}</div>
      )}

      <div className="sm:col-span-2">
        <CustomInput label="Title" required error={errors.title?.message} {...register("title")} />
      </div>

      <CustomInput label="Author" error={errors.author?.message} {...register("author")} />

      <CustomInput
        label="Display order"
        type="number"
        min={0}
        required
        error={errors.displayOrder?.message}
        {...register("displayOrder", { valueAsNumber: true })}
      />

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="excerpt" required>
          Excerpt
        </FieldLabel>
        <textarea
          id="excerpt"
          rows={2}
          className={`${fieldControlClass(!!errors.excerpt)} resize-none`}
          {...register("excerpt")}
        />
        {errors.excerpt && <p className="text-xs text-red-600">{errors.excerpt.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Cover image"
              required
              value={field.value}
              onChange={field.onChange}
              folder="codesyncs/blogs"
              objectFit="cover"
              error={errors.coverImage?.message}
            />
          )}
        />
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              label="Content"
              required
              content={field.value}
              onChange={field.onChange}
              error={errors.content?.message}
              placeholder="Write the blog post..."
              imageFolder="codesyncs/blogs/rich-text"
            />
          )}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="tags" required>
          Tags
        </FieldLabel>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <>
              <div
                className={`${fieldControlClass(!!errors.tags)} flex min-h-[42px] flex-wrap items-center gap-1.5 py-1.5`}
              >
                {field.value.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                  >
                    {tag}
                    <button
                      type="button"
                      aria-label={`Remove ${tag}`}
                      onClick={() => field.onChange(field.value.filter((item) => item !== tag))}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <input
                  id="tags"
                  value={tagDraft}
                  onChange={(event) => setTagDraft(event.target.value)}
                  onKeyDown={(event) => onTagKeyDown(event, field.value, field.onChange)}
                  onBlur={() => addTag(field.value, field.onChange)}
                  placeholder={field.value.length ? "" : "Type a tag and press Enter"}
                  className="min-w-[140px] flex-1 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-gray-400"
                />
              </div>
              <p className="text-xs text-gray-400">Press Enter or comma to add a tag.</p>
            </>
          )}
        />
        {errors.tags && <p className="text-xs text-red-600">{errors.tags.message}</p>}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel>Related blogs</FieldLabel>
        <Controller
          name="relatedBlogIds"
          control={control}
          render={({ field }) => {
            const selected = field.value ?? [];
            const atLimit = selected.length >= 3;
            return (
              <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-300 p-2">
                {isLoadingOptions ? (
                  <p className="px-2 py-3 text-sm text-gray-500">Loading blogs...</p>
                ) : selectableBlogs.length === 0 ? (
                  <p className="px-2 py-3 text-sm text-gray-500">No other blogs available.</p>
                ) : (
                  selectableBlogs.map((blog) => {
                    const checked = selected.includes(blog.id);
                    return (
                      <label
                        key={blog.id}
                        className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={!checked && atLimit}
                          onChange={() => {
                            if (checked) {
                              field.onChange(selected.filter((id) => id !== blog.id));
                              return;
                            }
                            if (atLimit) return;
                            field.onChange([...selected, blog.id]);
                          }}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
                        />
                        <span className="min-w-0 leading-5 text-gray-700">{blog.title}</span>
                      </label>
                    );
                  })
                )}
              </div>
            );
          }}
        />
        <p className="text-xs text-gray-400">Select up to 3 related posts.</p>
        {errors.relatedBlogIds && (
          <p className="text-xs text-red-600">{errors.relatedBlogIds.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="status" required>
          Status
        </FieldLabel>
        <select id="status" className={fieldControlClass(!!errors.status)} {...register("status")}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        {errors.status && <p className="text-xs text-red-600">{errors.status.message}</p>}
      </div>
    </form>
  );
}
