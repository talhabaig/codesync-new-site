"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../../components/ui/CustomInput";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { FieldLabel, fieldControlClass } from "../../components/ui/FieldLabel";
import { CreateTechStackPayload } from "../../../features/tech-stacks/types";
import {
  TECH_STACK_CATEGORIES,
  techStackFormSchema,
} from "../../../features/tech-stacks/validations";

interface TechStackFormProps {
  formId: string;
  defaultValues: CreateTechStackPayload;
  apiError: string | null;
  onSubmit: (values: CreateTechStackPayload) => Promise<void>;
}

export function TechStackForm({ formId, defaultValues, apiError, onSubmit }: TechStackFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTechStackPayload>({
    resolver: yupResolver(techStackFormSchema),
    defaultValues,
  });

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({ ...values, logo: values.logo || "" });
      })}
      className="grid gap-4 sm:grid-cols-2"
    >
      {apiError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{apiError}</div>
      )}

      <div className="sm:col-span-2">
        <CustomInput label="Name" required error={errors.name?.message} {...register("name")} />
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="logo"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Logo"
              value={field.value || ""}
              onChange={field.onChange}
              folder="codesyncs/tech-stacks"
              objectFit="contain"
              error={errors.logo?.message}
            />
          )}
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="category" required>
          Category
        </FieldLabel>
        <select id="category" className={fieldControlClass(!!errors.category)} {...register("category")}>
          {TECH_STACK_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-xs text-red-600">{errors.category.message}</p>}
      </div>

      <CustomInput
        label="Display order"
        type="number"
        required
        min={1}
        error={errors.displayOrder?.message}
        {...register("displayOrder", { valueAsNumber: true })}
      />

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="description" required>
          Description
        </FieldLabel>
        <textarea
          id="description"
          rows={2}
          className={`${fieldControlClass(!!errors.description)} resize-none`}
          {...register("description")}
        />
        {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
      </div>

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
