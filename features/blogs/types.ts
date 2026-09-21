export type BlogStatus = "DRAFT" | "PUBLISHED";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  readTime: number;
  viewCount: number;
  status: BlogStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPayload {
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  tags: string[];
  status: BlogStatus;
}

export type UpdateBlogPayload = CreateBlogPayload;

export interface GetBlogsParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  tag?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: BlogStatus;
}

export interface BlogMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: BlogMeta;
}

export interface BlogComment {
  id: string;
  blogId?: string;
  name?: string;
  authorName?: string;
  email?: string;
  authorEmail?: string;
  content?: string;
  message?: string;
  comment?: string;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetBlogCommentsParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  blogId?: string;
  isVisible?: boolean;
}
