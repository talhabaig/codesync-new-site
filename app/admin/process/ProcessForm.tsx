"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../../components/ui/CustomInput";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { FieldLabel, fieldControlClass } from "../../components/ui/FieldLabel";
import { CreateProcessPayload } from "../../../features/process/types";
import { processFormSchema } from "../../../features/process/validations";

interface ProcessFormProps {
  formId: string;
  defaultValues: CreateProcessPayload;
  apiError: string | null;
  onSubmit: (values: CreateProcessPayload) => Promise<void>;
}

export function ProcessForm({
  formId,
  defaultValues,
  apiError,
  onSubmit,
}: ProcessFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProcessPayload>({
    resolver: yupResolver(processFormSchema),
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

      <div className="sm:col-span-2">
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Icon"
              required
              value={field.value}
              onChange={field.onChange}
              folder="codesyncs/process"
              objectFit="contain"
              error={errors.icon?.message}
            />
          )}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="description" required>
          Description
        </FieldLabel>
        <textarea
          id="description"
          rows={3}
          className={`${fieldControlClass(!!errors.description)} resize-none`}
          {...register("description")}
        />
        {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
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
