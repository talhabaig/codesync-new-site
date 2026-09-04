import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

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
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    ...(token && !noAuth ? { Authorization: `Bearer ${token}` } : {}),
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

    // Skip session redirect on public/login calls (noAuth)
    if (response?.status === 401 && !noAuth) {
      toast.error("Session expired or invalid. Please log in again.");
      if (typeof window !== "undefined") {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 1500);
      }
    }

    if (response?.status === 403 && !noAuth) {
      toast.error("You are not authorized to access this page.");
      if (typeof window !== "undefined") {
        localStorage.clear();
        window.location.href = "/403";
      }
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
