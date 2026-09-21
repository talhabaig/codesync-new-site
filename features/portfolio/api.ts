import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  CreatePortfolioPayload,
  GetPortfoliosParams,
  Portfolio,
  UpdatePortfolioPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getPortfoliosApi = async (
  params: GetPortfoliosParams
): Promise<ApiListResponse<Portfolio>> => {
  try {
    return await makeApiCall<ApiListResponse<Portfolio>>({
      url: "/portfolio/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch portfolios"));
  }
};

export const createPortfolioApi = async (
  payload: CreatePortfolioPayload
): Promise<Portfolio> => {
  try {
    const response = await makeApiCall<ApiResponse<Portfolio>>({
      url: "/portfolio",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create portfolio");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create portfolio"));
  }
};

export const updatePortfolioApi = async (
  id: string,
  payload: UpdatePortfolioPayload
): Promise<Portfolio> => {
  try {
    const response = await makeApiCall<ApiResponse<Portfolio>>({
      url: `/portfolio/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update portfolio");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update portfolio"));
  }
};

export const togglePortfolioStatusApi = async (id: string): Promise<Portfolio> => {
  try {
    const response = await makeApiCall<ApiResponse<Portfolio>>({
      url: `/portfolio/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const updatePortfolioDisplayOrderApi = async (
  id: string,
  displayOrder: number
): Promise<Portfolio> => {
  try {
    const response = await makeApiCall<ApiResponse<Portfolio>>({
      url: `/portfolio/${id}/display-order`,
      method: "PATCH",
      data: { displayOrder },
    });
    if (!response.success) throw new Error("Failed to update display order");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update display order"));
  }
};

export const deletePortfolioApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/portfolio/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete portfolio");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete portfolio"));
  }
};

export const deletePortfoliosBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(ids.map((id) => deletePortfolioApi(id)));
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(
      `Deleted ${ids.length - failed} of ${ids.length} portfolios. ${failed} failed.`
    );
  }
};
