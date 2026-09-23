export type PortfolioStatus = "ACTIVE" | "INACTIVE";

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  galleryImages: string[];
  siteUrl: string | null;
  videoUrl: string | null;
  content: string;
  displayOrder: number;
  status: PortfolioStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePortfolioPayload {
  title: string;
  shortDescription: string;
  coverImage: string;
  galleryImages: string[];
  siteUrl: string | null;
  videoUrl: string | null;
  content: string;
  displayOrder: number;
  status: PortfolioStatus;
}

export type UpdatePortfolioPayload = CreatePortfolioPayload;

export interface GetPortfoliosParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: PortfolioStatus;
}

export interface PortfolioMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: PortfolioMeta;
}
