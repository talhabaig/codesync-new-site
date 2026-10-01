import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  Blog,
  BlogComment,
  CreateBlogPayload,
  CreatePublicBlogCommentPayload,
  GetBlogCommentsParams,
  GetBlogsParams,
  GetPublicBlogCommentsParams,
  PublicBlogComment,
  PublicBlogListItem,
  RelatedBlog,
  UpdateBlogPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

function normalizeRelated(item: Partial<RelatedBlog> | null | undefined): RelatedBlog | null {
  if (!item?.id || !item.title) return null;
  return {
    id: item.id,
    title: item.title,
    excerpt: item.excerpt ?? "",
    coverImage: item.coverImage ?? "",
    author: item.author ?? null,
    slug: item.slug,
  };
}

function normalizeBlog(item: Blog): Blog {
  return {
    ...item,
    author: item.author ?? null,
    tags: item.tags ?? [],
    displayOrder: item.displayOrder ?? 0,
    relatedBlogIds: item.relatedBlogIds ?? [],
    relatedBlogs: (item.relatedBlogs ?? []).map(normalizeRelated).filter(Boolean) as RelatedBlog[],
  };
}

export const getBlogsApi = async (params: GetBlogsParams): Promise<ApiListResponse<Blog>> => {
  try {
    const response = await makeApiCall<ApiListResponse<Blog>>({
      url: "/blogs/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
    return {
      ...response,
      data: (response.data ?? []).map(normalizeBlog),
    };
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch blogs"));
  }
};

export const getPublicBlogsApi = async (
  params: GetBlogsParams = {}
): Promise<ApiListResponse<PublicBlogListItem>> => {
  try {
    const response = await makeApiCall<ApiListResponse<PublicBlogListItem>>({
      url: "/blogs",
      method: "GET",
      noAuth: true,
      params: compactParams(params as Record<string, unknown>),
    });
    return {
      ...response,
      data: (response.data ?? []).map((item) => ({
        ...item,
        author: item.author ?? null,
        tags: item.tags ?? [],
        displayOrder: item.displayOrder ?? 0,
      })),
    };
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch blogs"));
  }
};

export const getBlogByIdApi = async (id: string): Promise<Blog> => {
  try {
    const response = await makeApiCall<ApiResponse<Blog>>({
      url: `/blogs/${id}`,
      method: "GET",
    });
    if (!response.success || !response.data) throw new Error("Failed to fetch blog");
    return normalizeBlog(response.data);
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch blog"));
  }
};

export const getPublicBlogBySlugApi = async (slug: string): Promise<Blog> => {
  try {
    const response = await makeApiCall<ApiResponse<Blog>>({
      url: `/blogs/slug/${encodeURIComponent(slug)}`,
      method: "GET",
      noAuth: true,
    });
    if (!response.success || !response.data) throw new Error("Failed to fetch blog");
    return normalizeBlog(response.data);
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch blog"));
  }
};

export const createBlogApi = async (payload: CreateBlogPayload): Promise<Blog> => {
  try {
    const response = await makeApiCall<ApiResponse<Blog>>({
      url: "/blogs",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create blog");
    return normalizeBlog(response.data);
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create blog"));
  }
};

export const updateBlogApi = async (id: string, payload: UpdateBlogPayload): Promise<Blog> => {
  try {
    const response = await makeApiCall<ApiResponse<Blog>>({
      url: `/blogs/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update blog");
    return normalizeBlog(response.data);
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update blog"));
  }
};

export const toggleBlogStatusApi = async (id: string): Promise<Blog> => {
  try {
    const response = await makeApiCall<ApiResponse<Blog>>({
      url: `/blogs/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return normalizeBlog(response.data);
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const updateBlogDisplayOrderApi = async (
  id: string,
  displayOrder: number
): Promise<Blog> => {
  try {
    const response = await makeApiCall<ApiResponse<Blog>>({
      url: `/blogs/${id}/display-order`,
      method: "PATCH",
      data: { displayOrder },
    });
    if (!response.success) throw new Error("Failed to update display order");
    return normalizeBlog(response.data);
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update display order"));
  }
};

export const deleteBlogApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/blogs/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete blog");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete blog"));
  }
};

export const deleteBlogsBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(ids.map((id) => deleteBlogApi(id)));
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(`Deleted ${ids.length - failed} of ${ids.length} blogs. ${failed} failed.`);
  }
};

function normalizePublicComment(item: PublicBlogComment): PublicBlogComment {
  return {
    id: item.id,
    authorName: item.authorName || "Guest",
    body: item.body || "",
    createdAt: item.createdAt || "",
  };
}

export const getPublicBlogCommentsApi = async (
  slug: string,
  params: GetPublicBlogCommentsParams = {}
): Promise<ApiListResponse<PublicBlogComment>> => {
  try {
    const response = await makeApiCall<ApiListResponse<PublicBlogComment>>({
      url: `/blogs/slug/${encodeURIComponent(slug)}/comments`,
      method: "GET",
      noAuth: true,
      params: compactParams(params as Record<string, unknown>),
    });
    return {
      ...response,
      data: (response.data ?? []).map(normalizePublicComment),
    };
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch comments"));
  }
};

export const createPublicBlogCommentApi = async (
  slug: string,
  payload: CreatePublicBlogCommentPayload
): Promise<PublicBlogComment> => {
  try {
    const response = await makeApiCall<ApiResponse<PublicBlogComment>>({
      url: `/blogs/slug/${encodeURIComponent(slug)}/comments`,
      method: "POST",
      noAuth: true,
      data: payload,
    });
    if (!response.success || !response.data) throw new Error("Failed to post comment");
    return normalizePublicComment(response.data);
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to post comment"));
  }
};

export const getBlogCommentsApi = async (
  params: GetBlogCommentsParams
): Promise<ApiListResponse<BlogComment>> => {
  try {
    return await makeApiCall<ApiListResponse<BlogComment>>({
      url: "/blog-comments/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch comments"));
  }
};

export const updateBlogCommentVisibilityApi = async (
  id: string,
  isVisible: boolean
): Promise<BlogComment> => {
  try {
    const response = await makeApiCall<ApiResponse<BlogComment>>({
      url: `/blog-comments/${id}/visibility`,
      method: "PATCH",
      data: { isVisible },
    });
    if (!response.success) throw new Error("Failed to update comment visibility");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update comment visibility"));
  }
};

export const deleteBlogCommentApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/blog-comments/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete comment");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete comment"));
  }
};
