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

export const loginAdmin = async (payload: LoginPayload) => {
  try {
    const response = await makeApiCall<LoginResponse>({
      url: "auth/login",
      method: "POST",
      data: payload,
      noAuth: true,
    });
    return response;
  } catch (err: any) {
    const message =
      err?.response?.data?.message || "Failed to login. Please try again.";
    throw new Error(message);
  }
};

export const getAdminProfile = async () => {
  try {
    const response = await makeApiCall<{ success: boolean; data: AuthUser }>({
      url: "admin/me",
      method: "GET",
    });
    return response;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to fetch profile");
  }
};
