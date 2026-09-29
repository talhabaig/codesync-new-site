import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  CreateProcessPayload,
  GetProcessParams,
  ProcessStep,
  UpdateProcessPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getProcessStepsApi = async (
  params: GetProcessParams
): Promise<ApiListResponse<ProcessStep>> => {
  try {
    return await makeApiCall<ApiListResponse<ProcessStep>>({
      url: "/process/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch process steps"));
  }
};

export const createProcessStepApi = async (
  payload: CreateProcessPayload
): Promise<ProcessStep> => {
  try {
    const response = await makeApiCall<ApiResponse<ProcessStep>>({
      url: "/process",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create process step");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create process step"));
  }
};

export const updateProcessStepApi = async (
  id: string,
  payload: UpdateProcessPayload
): Promise<ProcessStep> => {
  try {
    const response = await makeApiCall<ApiResponse<ProcessStep>>({
      url: `/process/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update process step");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update process step"));
  }
};

export const toggleProcessStatusApi = async (id: string): Promise<ProcessStep> => {
  try {
    const response = await makeApiCall<ApiResponse<ProcessStep>>({
      url: `/process/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const updateProcessDisplayOrderApi = async (
  id: string,
  displayOrder: number
): Promise<ProcessStep> => {
  try {
    const response = await makeApiCall<ApiResponse<ProcessStep>>({
      url: `/process/${id}/display-order`,
      method: "PATCH",
      data: { displayOrder },
    });
    if (!response.success) throw new Error("Failed to update display order");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update display order"));
  }
};

export const deleteProcessStepApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/process/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete process step");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete process step"));
  }
};

export const deleteProcessStepsBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(ids.map((id) => deleteProcessStepApi(id)));
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(
      `Deleted ${ids.length - failed} of ${ids.length} process steps. ${failed} failed.`
    );
  }
};
