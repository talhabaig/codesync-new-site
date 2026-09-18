"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../../components/ui/CustomInput";
import { RichTextEditor } from "../../components/ui/RichTextEditor";
import { FieldLabel, fieldControlClass } from "../../components/ui/FieldLabel";
import { CreateJobPayload, JOB_TYPES } from "../../../features/jobs/types";
import { jobFormSchema } from "../../../features/jobs/validations";

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toIsoOrNull(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

interface JobFormProps {
  formId: string;
  defaultValues: CreateJobPayload;
  apiError: string | null;
  onSubmit: (values: CreateJobPayload) => Promise<void>;
}

export function JobForm({ formId, defaultValues, apiError, onSubmit }: JobFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateJobPayload>({
    resolver: yupResolver(jobFormSchema),
    defaultValues: {
      ...defaultValues,
      expiresAt: toDatetimeLocal(defaultValues.expiresAt),
    },
  });

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          ...values,
          expiresAt: toIsoOrNull(values.expiresAt),
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
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              label="Full description"
              required
              content={field.value}
              onChange={field.onChange}
              error={errors.description?.message}
              placeholder="Write the full job description..."
            />
          )}
        />
      </div>

      <CustomInput label="Location" required error={errors.location?.message} {...register("location")} />
      <CustomInput
        label="Department"
        required
        error={errors.department?.message}
        {...register("department")}
      />

      <div className="space-y-1.5">
        <FieldLabel htmlFor="jobType" required>
          Job type
        </FieldLabel>
        <select id="jobType" className={fieldControlClass(!!errors.jobType)} {...register("jobType")}>
          {JOB_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.jobType && <p className="text-xs text-red-600">{errors.jobType.message}</p>}
      </div>

      <CustomInput
        label="Salary range"
        required
        error={errors.salaryRange?.message}
        {...register("salaryRange")}
      />

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="requirements" required>
          Requirements
        </FieldLabel>
        <textarea
          id="requirements"
          rows={3}
          className={`${fieldControlClass(!!errors.requirements)} resize-y`}
          {...register("requirements")}
        />
        {errors.requirements && (
          <p className="text-xs text-red-600">{errors.requirements.message}</p>
        )}
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

      <div className="sm:col-span-2">
        <CustomInput
          label="Expires at"
          type="datetime-local"
          error={errors.expiresAt?.message}
          {...register("expiresAt")}
        />
      </div>
    </form>
  );
}
