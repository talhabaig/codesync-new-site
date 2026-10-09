"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CustomInput } from "@/app/components/ui/CustomInput";
import { CustomButton } from "@/app/components/ui/CustomButton";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/validations";

const AdminLogin = () => {
  const { login, loading, error, isAuthenticated } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/admin/admindashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login({ email: values.email, password: values.password });
      reset();
    } catch {
      // toast handled by mutation
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <div className="bg-customLightBlue2 px-8 py-8 text-center text-white">
          <div className="mb-4 flex justify-center">
            <div className="rounded-xl bg-white/20 p-3">
              <FaShieldAlt className="h-7 w-7" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Admin Portal</h2>
          <p className="text-sm text-white/90">Sign in to manage CodeSyncs CMS</p>
        </div>

        <div className="px-8 py-8">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <CustomInput
              label="Email Address"
              type="email"
              placeholder="admin@admin.com"
              leftIcon={FaEnvelope}
              error={errors.email?.message}
              {...register("email")}
            />

            <CustomInput
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={FaLock}
              error={errors.password?.message}
              {...register("password")}
            />

            <CustomButton type="submit" fullWidth loading={loading}>
              Sign In to Dashboard
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
