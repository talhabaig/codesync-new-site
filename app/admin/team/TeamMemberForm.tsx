"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "../../components/ui/CustomInput";
import { ImageUploader } from "../../components/ui/ImageUploader";
import { FieldLabel, fieldControlClass } from "../../components/ui/FieldLabel";
import { CreateTeamMemberPayload } from "../../../features/team/types";
import { teamMemberFormSchema } from "../../../features/team/validations";

const DEFAULT_MEMBER_IMAGE = "/default-member.png";

interface TeamMemberFormProps {
  formId: string;
  defaultValues: CreateTeamMemberPayload;
  apiError: string | null;
  onSubmit: (values: CreateTeamMemberPayload) => Promise<void>;
}

export function TeamMemberForm({ formId, defaultValues, apiError, onSubmit }: TeamMemberFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeamMemberPayload>({
    resolver: yupResolver(teamMemberFormSchema),
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

      <CustomInput label="Name" required error={errors.name?.message} {...register("name")} />
      <CustomInput
        label="Designation"
        required
        error={errors.designation?.message}
        {...register("designation")}
      />

      <div className="sm:col-span-2">
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Photo"
              required
              value={field.value}
              onChange={field.onChange}
              folder="codesyncs/team"
              objectFit="cover"
              fallbackSrc={DEFAULT_MEMBER_IMAGE}
              error={errors.image?.message}
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
