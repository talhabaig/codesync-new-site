"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../../components/ui/CustomInput";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { GalleryUploader } from "../../components/ui/GalleryUploader";
import { RichTextEditor } from "../../components/ui/RichTextEditor";
import { FieldLabel, fieldControlClass } from "../../components/ui/FieldLabel";
import { CreatePortfolioPayload } from "../../../features/portfolio/types";
import { portfolioFormSchema } from "../../../features/portfolio/validations";

interface PortfolioFormProps {
  formId: string;
  defaultValues: CreatePortfolioPayload;
  apiError: string | null;
  onSubmit: (values: CreatePortfolioPayload) => Promise<void>;
}

export function PortfolioForm({
  formId,
  defaultValues,
  apiError,
  onSubmit,
}: PortfolioFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePortfolioPayload>({
    resolver: yupResolver(portfolioFormSchema),
    defaultValues: {
      ...defaultValues,
      galleryImages: defaultValues.galleryImages ?? [],
      siteUrl: defaultValues.siteUrl ?? "",
      videoUrl: defaultValues.videoUrl ?? "",
    },
  });

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          ...values,
          galleryImages: values.galleryImages ?? [],
          siteUrl: values.siteUrl || null,
          videoUrl: values.videoUrl || null,
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
        <FieldLabel htmlFor="shortDescription" required>
          Short description
        </FieldLabel>
        <textarea
          id="shortDescription"
          rows={2}
          className={`${fieldControlClass(!!errors.shortDescription)} resize-none`}
          {...register("shortDescription")}
        />
        {errors.shortDescription && (
          <p className="text-xs text-red-600">{errors.shortDescription.message}</p>
        )}
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
              folder="codesyncs/portfolio"
              objectFit="cover"
              error={errors.coverImage?.message}
            />
          )}
        />
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="galleryImages"
          control={control}
          render={({ field }) => (
            <GalleryUploader
              label="Gallery images"
              value={field.value || []}
              onChange={field.onChange}
              folder="codesyncs/portfolio"
              error={
                typeof errors.galleryImages?.message === "string"
                  ? errors.galleryImages.message
                  : undefined
              }
            />
          )}
        />
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="videoUrl"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Demo video"
              value={field.value || ""}
              onChange={field.onChange}
              folder="codesyncs/portfolio"
              resourceType="video"
              objectFit="contain"
              error={errors.videoUrl?.message}
            />
          )}
        />
      </div>

      <div className="sm:col-span-2">
        <CustomInput
          label="Site URL"
          type="url"
          placeholder="https://example.com"
          error={errors.siteUrl?.message}
          {...register("siteUrl")}
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
              placeholder="Write the project challenge, solution, and deliverables..."
            />
          )}
        />
      </div>

      <CustomInput
        label="Display order"
        type="number"
        required
        min={1}
        error={errors.displayOrder?.message}
        {...register("displayOrder", { valueAsNumber: true })}
      />

      <div className="space-y-1.5">
        <FieldLabel htmlFor="status" required>
          Status
        </FieldLabel>
        <select id="status" className={fieldControlClass(!!errors.status)} {...register("status")}>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        {errors.status && <p className="text-xs text-red-600">{errors.status.message}</p>}
      </div>
    </form>
  );
}
