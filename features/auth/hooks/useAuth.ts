"use client";

import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  AuthUser,
  LoginPayload,
  getAdminProfile,
  loginAdmin,
} from "@/features/auth/api";

const TOKEN_KEY = "token";
const USER_KEY = "user";
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

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAuthenticated = useCallback(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem(TOKEN_KEY));
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
    initialData: readStoredUser,
    staleTime: 5 * 60 * 1000,
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

  const logout = useCallback(() => {
    clearSession();
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
  };
}
