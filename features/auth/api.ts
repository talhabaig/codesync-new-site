import { makeApiCall } from "@/lib/api/makeApiCall";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: AuthUser;
  };
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const loginAdmin = async (payload: LoginPayload) => {
  try {
    return await makeApiCall<LoginResponse>({
      url: "auth/login",
      method: "POST",
      data: payload,
      noAuth: true,
    });
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to login. Please try again."
    );
  }
};

export const getAdminProfile = async () => {
  try {
    return await makeApiCall<{ success: boolean; data: AuthUser }>({
      url: "admin/me",
      method: "GET",
    });
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to fetch profile");
  }
};

export const updateAdminProfile = async (payload: UpdateProfilePayload) => {
  try {
    return await makeApiCall<{ success: boolean; data: AuthUser }>({
      url: "admin/me",
      method: "PATCH",
      data: payload,
    });
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to update profile");
  }
};

export const changeAdminPassword = async (payload: ChangePasswordPayload) => {
  try {
    return await makeApiCall<{ success: boolean; data: { message: string } }>({
      url: "admin/me/password",
      method: "PATCH",
      data: payload,
    });
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to change password"
    );
  }
};
