import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  CreateServicePayload,
  GetServicesParams,
  Service,
  UpdateServicePayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getServicesApi = async (
  params: GetServicesParams
): Promise<ApiListResponse<Service>> => {
  try {
    return await makeApiCall<ApiListResponse<Service>>({
      url: "/services/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch services"));
  }
};

export const createServiceApi = async (
  payload: CreateServicePayload
): Promise<Service> => {
  try {
    const response = await makeApiCall<ApiResponse<Service>>({
      url: "/services",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create service");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create service"));
  }
};

export const updateServiceApi = async (
  id: string,
  payload: UpdateServicePayload
): Promise<Service> => {
  try {
    const response = await makeApiCall<ApiResponse<Service>>({
      url: `/services/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update service");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update service"));
  }
};

export const toggleServiceStatusApi = async (id: string): Promise<Service> => {
  try {
    const response = await makeApiCall<ApiResponse<Service>>({
      url: `/services/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const toggleServiceHomeApi = async (id: string): Promise<Service> => {
  try {
    const response = await makeApiCall<ApiResponse<Service>>({
      url: `/services/${id}/home`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle home visibility");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle home visibility"));
  }
};

export const updateDisplayOrderApi = async (
  id: string,
  displayOrder: number
): Promise<Service> => {
  try {
    const response = await makeApiCall<ApiResponse<Service>>({
      url: `/services/${id}/display-order`,
      method: "PATCH",
      data: { displayOrder },
    });
    if (!response.success) throw new Error("Failed to update display order");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update display order"));
  }
};

export const deleteServiceApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/services/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete service");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete service"));
  }
};

export const deleteServicesBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(ids.map((id) => deleteServiceApi(id)));
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(
      `Deleted ${ids.length - failed} of ${ids.length} services. ${failed} failed.`
    );
  }
};
