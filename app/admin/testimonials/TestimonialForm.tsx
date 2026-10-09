"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../../components/ui/CustomInput";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { FieldLabel, fieldControlClass } from "../../components/ui/FieldLabel";
import { CreateTestimonialPayload } from "../../../features/testimonials/types";
import { testimonialFormSchema } from "../../../features/testimonials/validations";

interface TestimonialFormProps {
  formId: string;
  defaultValues: CreateTestimonialPayload;
  apiError: string | null;
  onSubmit: (values: CreateTestimonialPayload) => Promise<void>;
}

export function TestimonialForm({
  formId,
  defaultValues,
  apiError,
  onSubmit,
}: TestimonialFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTestimonialPayload>({
    resolver: yupResolver(testimonialFormSchema),
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

      <CustomInput
        label="Client name"
        required
        error={errors.clientName?.message}
        {...register("clientName")}
      />
      <CustomInput label="Company" required error={errors.company?.message} {...register("company")} />
      <div className="sm:col-span-2">
        <CustomInput
          label="Designation"
          required
          error={errors.designation?.message}
          {...register("designation")}
        />
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Photo"
              required
              value={field.value}
              onChange={field.onChange}
              folder="codesyncs/testimonials"
              objectFit="cover"
              error={errors.photo?.message}
            />
          )}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="testimonial" required>
          Testimonial
        </FieldLabel>
        <textarea
          id="testimonial"
          rows={4}
          className={`${fieldControlClass(!!errors.testimonial)} resize-y`}
          {...register("testimonial")}
        />
        {errors.testimonial && <p className="text-xs text-red-600">{errors.testimonial.message}</p>}
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="rating" required>
          Rating
        </FieldLabel>
        <select
          id="rating"
          className={fieldControlClass(!!errors.rating)}
          {...register("rating", { valueAsNumber: true })}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} star{n === 1 ? "" : "s"}
            </option>
          ))}
        </select>
        {errors.rating && <p className="text-xs text-red-600">{errors.rating.message}</p>}
      </div>

      <CustomInput
        label="Display order"
        type="number"
        required
        min={1}
        error={errors.displayOrder?.message}
        {...register("displayOrder", { valueAsNumber: true })}
      />

      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-customLightBlue2 focus:ring-customLightBlue2"
          {...register("featured")}
        />
        Featured
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
