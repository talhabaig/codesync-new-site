"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { CustomInput } from "@/app/components/ui/CustomInput";
import { CustomButton } from "@/app/components/ui/CustomButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  changePasswordSchema,
  updateProfileSchema,
  type ChangePasswordFormValues,
  type UpdateProfileFormValues,
} from "@/features/auth/validations";

export default function AdminProfilePage() {
  const {
    user,
    updateProfile,
    changePassword,
    updateProfileMutation,
    changePasswordMutation,
  } = useAuth();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileFormValues>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: { name: "", email: "" },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!user) return;
    resetProfile({
      name: user.name || "",
      email: user.email || "",
    });
  }, [user, resetProfile]);

  const onProfileSubmit = async (values: UpdateProfileFormValues) => {
    await updateProfile({
      name: values.name?.trim() || undefined,
      email: values.email.trim(),
    });
  };

  const onPasswordSubmit = async (values: ChangePasswordFormValues) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      resetPassword();
    } catch {
      // toast handled by mutation
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500">
          Update your account email and password
        </p>
      </div>

      <form
        onSubmit={handleProfileSubmit(onProfileSubmit)}
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        noValidate
      >
        <h2 className="text-lg font-semibold text-gray-900">Account details</h2>
        <CustomInput
          label="Name"
          placeholder="Your name"
          leftIcon={FaUser}
          error={profileErrors.name?.message}
          {...registerProfile("name")}
        />
        <CustomInput
          label="Email"
          type="email"
          placeholder="admin@admin.com"
          leftIcon={FaEnvelope}
          error={profileErrors.email?.message}
          {...registerProfile("email")}
        />
        <div className="flex justify-end">
          <CustomButton type="submit" loading={updateProfileMutation.isPending}>
            Save profile
          </CustomButton>
        </div>
      </form>

      <form
        onSubmit={handlePasswordSubmit(onPasswordSubmit)}
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        noValidate
      >
        <h2 className="text-lg font-semibold text-gray-900">Change password</h2>
        <CustomInput
          label="Current password"
          type="password"
          leftIcon={FaLock}
          error={passwordErrors.currentPassword?.message}
          {...registerPassword("currentPassword")}
        />
        <CustomInput
          label="New password"
          type="password"
          leftIcon={FaLock}
          hint="Minimum 8 characters"
          error={passwordErrors.newPassword?.message}
          {...registerPassword("newPassword")}
        />
        <CustomInput
          label="Confirm new password"
          type="password"
          leftIcon={FaLock}
          error={passwordErrors.confirmPassword?.message}
          {...registerPassword("confirmPassword")}
        />
        <div className="flex justify-end">
          <CustomButton
            type="submit"
            loading={changePasswordMutation.isPending}
          >
            Update password
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
