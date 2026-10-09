export type ServiceSubsectionStatus = "ACTIVE" | "INACTIVE";

export interface ServiceSubsection {
  id: string;
  serviceId: string;
  title: string;
  logo: string;
  shortDescription: string | null;
  description: string | null;
  displayOrder: number;
  status: ServiceSubsectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceSubsectionPayload {
  serviceId: string;
  title: string;
  logo: string;
  shortDescription: string | null;
  description: string | null;
  displayOrder: number;
  status: ServiceSubsectionStatus;
}

export type UpdateServiceSubsectionPayload = CreateServiceSubsectionPayload;

export interface GetServiceSubsectionsParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: ServiceSubsectionStatus;
  serviceId?: string;
}

export interface ServiceSubsectionMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: ServiceSubsectionMeta;
}
