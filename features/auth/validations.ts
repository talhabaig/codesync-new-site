import * as yup from "yup";

const emailField = yup
  .string()
  .trim()
  .lowercase()
  .email("Enter a valid email");

export const loginSchema = yup.object({
  email: emailField.required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

export const updateProfileSchema = yup.object({
  name: yup.string().trim().max(100, "Name must be at most 100 characters"),
  email: emailField.required("Email is required"),
});

export type UpdateProfileFormValues = yup.InferType<typeof updateProfileSchema>;

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .max(128, "New password must be at most 128 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

export type ChangePasswordFormValues = yup.InferType<typeof changePasswordSchema>;
