import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";
import {
  ApiListResponse,
  CreateTestimonialPayload,
  GetTestimonialsParams,
  Testimonial,
  UpdateTestimonialPayload,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getTestimonialsApi = async (
  params: GetTestimonialsParams
): Promise<ApiListResponse<Testimonial>> => {
  try {
    return await makeApiCall<ApiListResponse<Testimonial>>({
      url: "/testimonials/manage",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to fetch testimonials"));
  }
};

export const createTestimonialApi = async (
  payload: CreateTestimonialPayload
): Promise<Testimonial> => {
  try {
    const response = await makeApiCall<ApiResponse<Testimonial>>({
      url: "/testimonials",
      method: "POST",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to create testimonial");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to create testimonial"));
  }
};

export const updateTestimonialApi = async (
  id: string,
  payload: UpdateTestimonialPayload
): Promise<Testimonial> => {
  try {
    const response = await makeApiCall<ApiResponse<Testimonial>>({
      url: `/testimonials/${id}`,
      method: "PATCH",
      data: payload,
    });
    if (!response.success) throw new Error("Failed to update testimonial");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to update testimonial"));
  }
};

export const toggleTestimonialStatusApi = async (
  id: string
): Promise<Testimonial> => {
  try {
    const response = await makeApiCall<ApiResponse<Testimonial>>({
      url: `/testimonials/${id}/status`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle status");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle status"));
  }
};

export const toggleTestimonialFeaturedApi = async (
  id: string
): Promise<Testimonial> => {
  try {
    const response = await makeApiCall<ApiResponse<Testimonial>>({
      url: `/testimonials/${id}/featured`,
      method: "PATCH",
    });
    if (!response.success) throw new Error("Failed to toggle featured");
    return response.data;
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to toggle featured"));
  }
};

export const deleteTestimonialApi = async (id: string): Promise<void> => {
  try {
    const response = await makeApiCall<ApiResponse<null>>({
      url: `/testimonials/${id}`,
      method: "DELETE",
    });
    if (!response.success) throw new Error("Failed to delete testimonial");
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to delete testimonial"));
  }
};

export const deleteTestimonialsBulkApi = async (ids: string[]): Promise<void> => {
  const results = await Promise.allSettled(
    ids.map((id) => deleteTestimonialApi(id))
  );
  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) {
    throw new Error(
      `Deleted ${ids.length - failed} of ${ids.length} testimonials. ${failed} failed.`
    );
  }
};
