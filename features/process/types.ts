export type ProcessStatus = "ACTIVE" | "INACTIVE";

export interface ProcessStep {
  id: string;
  title: string;
  icon: string;
  description: string;
  displayOrder: number;
  status: ProcessStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProcessPayload {
  title: string;
  icon: string;
  description: string;
  displayOrder: number;
  status: ProcessStatus;
}

export type UpdateProcessPayload = CreateProcessPayload;

export interface GetProcessParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: ProcessStatus;
}

export interface ProcessMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: ProcessMeta;
}
