import { useQuery } from "@tanstack/react-query";
import { getPublicTeamMembersApi } from "../api";
import { GetTeamMembersParams, TeamMemberMeta } from "../types";

export const PUBLIC_TEAM_QUERY_KEY = ["team", "public"] as const;

const defaultMeta: TeamMemberMeta = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  getAll: false,
};

export function useGetPublicTeamMembers(
  params: GetTeamMembersParams = {
    getAll: true,
    sortBy: "displayOrder",
    sortOrder: "asc",
  }
) {
  const query = useQuery({
    queryKey: [...PUBLIC_TEAM_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getPublicTeamMembersApi(params);
      if (!response.success) throw new Error("Failed to fetch team members");
      return response;
    },
  });

  return {
    data: query.data?.data ?? [],
    meta: query.data?.meta ?? defaultMeta,
    isLoading: query.isPending,
    error: (query.error as Error | null)?.message ?? null,
  };
}
