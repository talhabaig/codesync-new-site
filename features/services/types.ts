export type ServiceStatus = "ACTIVE" | "INACTIVE";

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  bannerImage: string;
  headerImage: string;
  showOnHome: boolean;
  displayOrder: number;
  status: ServiceStatus;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateServicePayload = Omit<Service, "id" | "slug" | "createdAt" | "updatedAt">;

export interface ServiceMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface GetServicesParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: ServiceStatus;
  showOnHome?: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: ServiceMeta;
}

export type UpdateServicePayload = CreateServicePayload;