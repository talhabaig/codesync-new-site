"use client";

import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  AuthUser,
  ChangePasswordPayload,
  LoginPayload,
  UpdateProfilePayload,
  changeAdminPassword,
  getAdminProfile,
  loginAdmin,
  updateAdminProfile,
} from "@/features/auth/api";
import {
  TOKEN_KEY,
  USER_KEY,
  clearAuthStorage,
  isAccessTokenValid,
} from "@/lib/api/session";

export const AUTH_USER_QUERY_KEY = ["auth", "user"] as const;

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function persistSession(accessToken: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAuthenticated = useCallback(() => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem(TOKEN_KEY);
    if (!isAccessTokenValid(token)) {
      if (token) clearAuthStorage();
      return false;
    }
    return true;
  }, []);

  const {
    data: user = null,
    isFetching: isProfileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: async () => {
      const res = await getAdminProfile();
      localStorage.setItem(USER_KEY, JSON.stringify(res.data));
      return res.data;
    },
    enabled: isAuthenticated(),
    placeholderData: () => readStoredUser() ?? undefined,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginAdmin(payload),
    onSuccess: (res) => {
      const { accessToken, user: loggedInUser } = res.data;
      persistSession(accessToken, loggedInUser);
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, loggedInUser);
      toast.success("Logged in successfully");
      router.push("/admin/admindashboard");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Invalid email or password.");
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateAdminProfile(payload),
    onSuccess: (res) => {
      localStorage.setItem(USER_KEY, JSON.stringify(res.data));
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, res.data);
      toast.success("Profile updated");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changeAdminPassword(payload),
    onSuccess: () => {
      toast.success("Password updated");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to change password");
    },
  });

  const logout = useCallback(() => {
    clearAuthStorage();
    queryClient.removeQueries({ queryKey: AUTH_USER_QUERY_KEY });
    queryClient.clear();
    router.push("/admin/login");
  }, [queryClient, router]);

  return {
    user,
    loading: loginMutation.isPending || isProfileLoading,
    error:
      (loginMutation.error as Error | null)?.message ??
      (profileError as Error | null)?.message ??
      null,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    logout,
    fetchProfile: refetchProfile,
    loginMutation,
    updateProfile: updateProfileMutation.mutateAsync,
    updateProfileMutation,
    changePassword: changePasswordMutation.mutateAsync,
    changePasswordMutation,
  };
}
