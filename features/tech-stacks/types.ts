export type TechStackStatus = "ACTIVE" | "INACTIVE";

export type TechStackCategory = 
  | "FRONTEND" 
  | "BACKEND" 
  | "DATABASE" 
  | "DEVOPS" 
  | "CLOUD" 
  | "MOBILE" 
  | "DESIGN" 
  | "OTHER";

export interface TechStack {
  id: string;
  name: string;
  logo: string | null;
  category: TechStackCategory;
  description: string;
  displayOrder: number;
  status: TechStackStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateTechStackPayload = Omit<
  TechStack,
  "id" | "createdAt" | "updatedAt"
> & {
  logo?: string | null;
};
export type UpdateTechStackPayload = CreateTechStackPayload;

export interface GetTechStacksParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: TechStackStatus;
  category?: TechStackCategory;
}

export interface TechStackMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: TechStackMeta;
}