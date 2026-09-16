import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  CreateTeamMemberPayload,
  GetTeamMembersParams,
  TeamMember,
  UpdateTeamMemberPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getTeamMembersApi = async (
  params: GetTeamMembersParams
): Promise<ApiListResponse<TeamMember>> => {
  try {
    return await makeApiCall<ApiListResponse<TeamMember>>({
      url: "/team/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch team members"));
  }
};

export const createTeamMemberApi = async (
  payload: CreateTeamMemberPayload
): Promise<TeamMember> => {
  try {
    const response = await makeApiCall<ApiResponse<TeamMember>>({
      url: "/team",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create team member");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create team member"));
  }
};

export const updateTeamMemberApi = async (
  id: string,
  payload: UpdateTeamMemberPayload
): Promise<TeamMember> => {
  try {
    const response = await makeApiCall<ApiResponse<TeamMember>>({
      url: `/team/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update team member");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update team member"));
  }
};

export const toggleTeamMemberStatusApi = async (
  id: string
): Promise<TeamMember> => {
  try {
    const response = await makeApiCall<ApiResponse<TeamMember>>({
      url: `/team/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const updateTeamMemberDisplayOrderApi = async (
  id: string,
  displayOrder: number
): Promise<TeamMember> => {
  try {
    const response = await makeApiCall<ApiResponse<TeamMember>>({
      url: `/team/${id}/display-order`,
      method: "PATCH",
      data: { displayOrder },
    });
    if (!response.success) throw new Error("Failed to update display order");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update display order"));
  }
};

export const deleteTeamMemberApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/team/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete team member");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete team member"));
  }
};

export const deleteTeamMembersBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(
    ids.map((id) => deleteTeamMemberApi(id))
  );
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(
      `Deleted ${ids.length - failed} of ${ids.length} team members. ${failed} failed.`
    );
  }
};
