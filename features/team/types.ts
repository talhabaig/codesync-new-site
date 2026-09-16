export type TeamMemberStatus = "ACTIVE" | "INACTIVE";

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  displayOrder: number;
  status: TeamMemberStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateTeamMemberPayload = Omit<
  TeamMember,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateTeamMemberPayload = CreateTeamMemberPayload;

export interface GetTeamMembersParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: TeamMemberStatus;
}

export interface TeamMemberMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: TeamMemberMeta;
}
