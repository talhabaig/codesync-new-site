import { useQuery } from "@tanstack/react-query";
import { getTeamMembersApi } from "../api";
import { GetTeamMembersParams, TeamMemberMeta } from "../types";

export const TEAM_QUERY_KEY = ["team"] as const;

const defaultMeta: TeamMemberMeta = {
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  getAll: false,
};

export function useGetTeamMembers(params: GetTeamMembersParams) {
  const query = useQuery({
    queryKey: [...TEAM_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getTeamMembersApi(params);
      if (!response.success) throw new Error("Failed to fetch team members");
      return response;
    },
    placeholderData: (previous) => previous,
  });

  return {
    data: query.data?.data ?? [],
    meta: query.data?.meta ?? defaultMeta,
    isLoading: query.isPending,
    isFetching: query.isFetching,
    error: (query.error as Error | null)?.message ?? null,
    refetch: query.refetch,
  };
}
