"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../../components/ui/CustomInput";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { RichTextEditor } from "../../components/ui/RichTextEditor";
import { FieldLabel, fieldControlClass } from "../../components/ui/FieldLabel";
import { CreateServicePayload } from "../../../features/services/types";
import { serviceFormSchema } from "../../../features/services/validations";

interface ServiceFormProps {
  formId: string;
  defaultValues: CreateServicePayload;
  apiError: string | null;
  onSubmit: (values: CreateServicePayload) => Promise<void>;
}

export function ServiceForm({ formId, defaultValues, apiError, onSubmit }: ServiceFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServicePayload>({
    resolver: yupResolver(serviceFormSchema),
    defaultValues,
  });

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
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
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              label="Full Description"
              required
              content={field.value}
              onChange={field.onChange}
              error={errors.description?.message}
              placeholder="Write the full service description..."
            />
          )}
        />
      </div>

      <CustomInput
        label="Icon (URL or character)"
        required
        error={errors.icon?.message}
        {...register("icon")}
      />
      <CustomInput
        label="Display order"
        type="number"
        required
        min={1}
        error={errors.displayOrder?.message}
        {...register("displayOrder", { valueAsNumber: true })}
      />

      <div className="sm:col-span-2">
        <Controller
          name="bannerImage"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Banner Image"
              value={field.value}
              onChange={field.onChange}
              folder="codesyncs/services"
              error={errors.bannerImage?.message}
            />
          )}
        />
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="headerImage"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Header Image"
              value={field.value}
              onChange={field.onChange}
              folder="codesyncs/services"
              error={errors.headerImage?.message}
            />
          )}
        />
      </div>

      <CustomInput label="SEO Title" error={errors.seoTitle?.message} {...register("seoTitle")} />
      <CustomInput label="SEO Keywords" error={errors.seoKeywords?.message} {...register("seoKeywords")} />
      <div className="sm:col-span-2">
        <CustomInput
          label="SEO Description"
          error={errors.seoDescription?.message}
          {...register("seoDescription")}
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
          {...register("showOnHome")}
        />
        Show on home page
      </label>

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
