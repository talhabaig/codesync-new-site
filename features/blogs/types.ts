export type BlogStatus = "DRAFT" | "PUBLISHED";

export interface RelatedBlog {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string | null;
  slug?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string | null;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  readTime: number;
  viewCount: number;
  displayOrder: number;
  relatedBlogIds: string[];
  relatedBlogs?: RelatedBlog[];
  status: BlogStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicBlogListItem {
  id: string;
  title: string;
  slug: string;
  author: string | null;
  excerpt: string;
  coverImage: string;
  tags: string[];
  readTime: number;
  viewCount: number;
  displayOrder: number;
  publishedAt: string | null;
}

export interface CreateBlogPayload {
  title: string;
  author: string;
  excerpt: string;
  coverImage: string;
  content: string;
  tags: string[];
  relatedBlogIds: string[];
  displayOrder: number;
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
  blogId: string;
  authorName: string;
  body: string;
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

export interface PublicBlogComment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface CreatePublicBlogCommentPayload {
  authorName: string;
  body: string;
}

export interface GetPublicBlogCommentsParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
}
