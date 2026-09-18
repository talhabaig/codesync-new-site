import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  CreateJobPayload,
  GetJobsParams,
  Job,
  UpdateJobPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getJobsApi = async (params: GetJobsParams): Promise<ApiListResponse<Job>> => {
  try {
    return await makeApiCall<ApiListResponse<Job>>({
      url: "/jobs/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch jobs"));
  }
};

export const createJobApi = async (payload: CreateJobPayload): Promise<Job> => {
  try {
    const response = await makeApiCall<ApiResponse<Job>>({
      url: "/jobs",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create job");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create job"));
  }
};

export const updateJobApi = async (id: string, payload: UpdateJobPayload): Promise<Job> => {
  try {
    const response = await makeApiCall<ApiResponse<Job>>({
      url: `/jobs/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update job");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update job"));
  }
};

export const toggleJobStatusApi = async (id: string): Promise<Job> => {
  try {
    const response = await makeApiCall<ApiResponse<Job>>({
      url: `/jobs/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const deleteJobApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/jobs/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete job");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete job"));
  }
};

export const deleteJobsBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(ids.map((id) => deleteJobApi(id)));
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(
      `Deleted ${ids.length - failed} of ${ids.length} jobs. ${failed} failed.`
    );
  }
};
