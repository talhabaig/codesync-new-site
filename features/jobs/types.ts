export type JobStatus = "ACTIVE" | "INACTIVE";

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "HYBRID"
  | "REMOTE";

export const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "REMOTE", label: "Remote" },
];

export interface Job {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  location: string;
  jobType: JobType;
  department: string;
  salaryRange: string;
  requirements: string;
  displayOrder: number;
  status: JobStatus;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobPayload {
  title: string;
  shortDescription: string;
  description: string;
  location: string;
  jobType: JobType;
  department: string;
  salaryRange: string;
  requirements: string;
  displayOrder: number;
  status: JobStatus;
  expiresAt: string | null;
}

export type UpdateJobPayload = CreateJobPayload;

export interface GetJobsParams {
  page?: number;
  limit?: number;
  getAll?: boolean;
  search?: string;
  jobType?: JobType;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: JobStatus;
}

export interface JobMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  getAll: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: JobMeta;
}
