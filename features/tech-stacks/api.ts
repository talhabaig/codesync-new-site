import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  CreateTechStackPayload,
  GetTechStacksParams,
  TechStack,
  UpdateTechStackPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getTechStacksApi = async (
  params: GetTechStacksParams
): Promise<ApiListResponse<TechStack>> => {
  try {
    return await makeApiCall<ApiListResponse<TechStack>>({
      url: "/tech-stacks/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch tech stacks"));
  }
};

export const createTechStackApi = async (
  payload: CreateTechStackPayload
): Promise<TechStack> => {
  try {
    const response = await makeApiCall<ApiResponse<TechStack>>({
      url: "/tech-stacks",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create tech stack");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create tech stack"));
  }
};

export const updateTechStackApi = async (
  id: string,
  payload: UpdateTechStackPayload
): Promise<TechStack> => {
  try {
    const response = await makeApiCall<ApiResponse<TechStack>>({
      url: `/tech-stacks/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update tech stack");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update tech stack"));
  }
};

export const toggleTechStackStatusApi = async (
  id: string
): Promise<TechStack> => {
  try {
    const response = await makeApiCall<ApiResponse<TechStack>>({
      url: `/tech-stacks/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const deleteTechStackApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/tech-stacks/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete tech stack");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete tech stack"));
  }
};

export const deleteTechStacksBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(
    ids.map((id) => deleteTechStackApi(id))
  );
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(
      `Deleted ${ids.length - failed} of ${ids.length} tech stacks. ${failed} failed.`
    );
  }
};
