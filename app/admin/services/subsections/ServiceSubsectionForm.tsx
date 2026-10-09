"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../../../components/ui/CustomInput";
import { ImageUploader } from "../../../components/ui/ImageUploader";
import { RichTextEditor } from "../../../components/ui/RichTextEditor";
import { FieldLabel, fieldControlClass } from "../../../components/ui/FieldLabel";
import { CreateServiceSubsectionPayload } from "../../../../features/service-subsections/types";
import { serviceSubsectionFormSchema } from "../../../../features/service-subsections/validations";

interface ServiceOption {
  id: string;
  title: string;
}

interface ServiceSubsectionFormProps {
  formId: string;
  defaultValues: CreateServiceSubsectionPayload;
  services: ServiceOption[];
  apiError: string | null;
  onSubmit: (values: CreateServiceSubsectionPayload) => Promise<void>;
}

export function ServiceSubsectionForm({
  formId,
  defaultValues,
  services,
  apiError,
  onSubmit,
}: ServiceSubsectionFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceSubsectionPayload>({
    resolver: yupResolver(serviceSubsectionFormSchema),
    defaultValues: {
      ...defaultValues,
      shortDescription: defaultValues.shortDescription ?? "",
      description: defaultValues.description ?? "",
    },
  });

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          ...values,
          shortDescription: values.shortDescription || null,
          description: values.description && values.description.replace(/<[^>]*>/g, "").trim()
            ? values.description
            : null,
        });
      })}
      className="grid gap-4 sm:grid-cols-2"
    >
      {apiError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{apiError}</div>
      )}

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="serviceId" required>
          Parent service
        </FieldLabel>
        <select
          id="serviceId"
          className={fieldControlClass(!!errors.serviceId)}
          {...register("serviceId")}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
        {errors.serviceId && <p className="text-xs text-red-600">{errors.serviceId.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <CustomInput label="Title" required error={errors.title?.message} {...register("title")} />
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="logo"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Logo"
              required
              value={field.value}
              onChange={field.onChange}
              folder="codesyncs/services"
              objectFit="contain"
              error={errors.logo?.message}
            />
          )}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="shortDescription">Short description</FieldLabel>
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
              label="Description"
              content={field.value || ""}
              onChange={field.onChange}
              error={errors.description?.message}
              placeholder="Optional longer description..."
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
