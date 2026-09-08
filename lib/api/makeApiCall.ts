import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import {
  TOKEN_KEY,
  handleSessionExpired,
  isAccessTokenValid,
} from "@/lib/api/session";

interface basicParams extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  noAuth?: true;
  isFormData?: boolean;
}

interface paramsWithConfig extends basicParams {
  sendConfig: true;
}

interface paramsWithoutConfig extends basicParams {
  sendConfig?: never;
}

function makeApiCall<T>(
  params: paramsWithConfig
): Promise<AxiosResponse<T, any>>;
function makeApiCall<T>(params: paramsWithoutConfig): Promise<T>;

async function makeApiCall<T>({
  url,
  method = "GET",
  data,
  noAuth,
  sendConfig,
  isFormData = false,
  headers: customHeaders = {},
  ...config
}: paramsWithConfig | paramsWithoutConfig) {
  const rawToken =
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  const token =
    !noAuth && rawToken && isAccessTokenValid(rawToken) ? rawToken : null;

  // Token present but already expired — kick to login before calling API
  if (!noAuth && rawToken && !isAccessTokenValid(rawToken)) {
    handleSessionExpired("Session expired. Please log in again.");
    throw new Error("Session expired");
  }

  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(customHeaders as Record<string, string>),
  };

  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios<T>({
      method,
      data,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
      headers,
      ...config,
    });

    return sendConfig ? response : response.data;
  } catch (error: any) {
    const response = error.response;

    // Authenticated routes: 401 = bad/expired JWT → force re-login
    if (response?.status === 401 && !noAuth) {
      handleSessionExpired(
        response?.data?.message ||
          "Session expired or invalid. Please log in again."
      );
    }

    if (response?.status === 403 && !noAuth) {
      toast.error("You are not authorized to access this page.");
    }

    throw error;
  }
}

export interface errType {
  message: string;
  code: number | string;
  err?: any;
}

function checkErrorHasMessage(err: any): err is errType {
  return err?.message !== undefined;
}

export { makeApiCall, checkErrorHasMessage };
