import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  CreateServiceSubsectionPayload,
  GetServiceSubsectionsParams,
  ServiceSubsection,
  UpdateServiceSubsectionPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getServiceSubsectionsApi = async (
  params: GetServiceSubsectionsParams
): Promise<ApiListResponse<ServiceSubsection>> => {
  try {
    return await makeApiCall<ApiListResponse<ServiceSubsection>>({
      url: "/service-subsections/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch service subsections"));
  }
};

export const createServiceSubsectionApi = async (
  payload: CreateServiceSubsectionPayload
): Promise<ServiceSubsection> => {
  try {
    const response = await makeApiCall<ApiResponse<ServiceSubsection>>({
      url: "/service-subsections",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create service subsection");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create service subsection"));
  }
};

export const updateServiceSubsectionApi = async (
  id: string,
  payload: UpdateServiceSubsectionPayload
): Promise<ServiceSubsection> => {
  try {
    const response = await makeApiCall<ApiResponse<ServiceSubsection>>({
      url: `/service-subsections/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update service subsection");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update service subsection"));
  }
};

export const toggleServiceSubsectionStatusApi = async (
  id: string
): Promise<ServiceSubsection> => {
  try {
    const response = await makeApiCall<ApiResponse<ServiceSubsection>>({
      url: `/service-subsections/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const updateServiceSubsectionDisplayOrderApi = async (
  id: string,
  displayOrder: number
): Promise<ServiceSubsection> => {
  try {
    const response = await makeApiCall<ApiResponse<ServiceSubsection>>({
      url: `/service-subsections/${id}/display-order`,
      method: "PATCH",
      data: { displayOrder },
    });
    if (!response.success) throw new Error("Failed to update display order");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update display order"));
  }
};

export const deleteServiceSubsectionApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/service-subsections/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete service subsection");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete service subsection"));
  }
};

export const deleteServiceSubsectionsBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(ids.map((id) => deleteServiceSubsectionApi(id)));
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(
      `Deleted ${ids.length - failed} of ${ids.length} subsections. ${failed} failed.`
    );
  }
};
