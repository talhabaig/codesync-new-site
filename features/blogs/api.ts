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
  GetBlogCommentsParams,
  GetBlogsParams,
  UpdateBlogPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getBlogsApi = async (params: GetBlogsParams): Promise<ApiListResponse<Blog>> => {
  try {
    return await makeApiCall<ApiListResponse<Blog>>({
      url: "/blogs/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch blogs"));
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
    return response.data;
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
    return response.data;
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
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
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
