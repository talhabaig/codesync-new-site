export type TestimonialStatus = "ACTIVE" | "INACTIVE";

export interface Testimonial {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  photo: string;
  testimonial: string;
  rating: number;
  displayOrder: number;
  featured: boolean;
  status: TestimonialStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateTestimonialPayload = Omit<
  Testimonial,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateTestimonialPayload = CreateTestimonialPayload;

export interface GetTestimonialsParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: TestimonialStatus;
  featured?: boolean;
}

export interface TestimonialMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: TestimonialMeta;
}
