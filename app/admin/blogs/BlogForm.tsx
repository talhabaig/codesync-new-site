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

interface BlogFormProps {
  formId: string;
  defaultValues: CreateBlogPayload;
  apiError: string | null;
  onSubmit: (values: CreateBlogPayload) => Promise<void>;
}

export function BlogForm({ formId, defaultValues, apiError, onSubmit }: BlogFormProps) {
  const [tagDraft, setTagDraft] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogPayload>({
    resolver: yupResolver(blogFormSchema),
    defaultValues: {
      ...defaultValues,
      tags: defaultValues.tags ?? [],
    },
  });

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
        await onSubmit({
          ...values,
          tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
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
