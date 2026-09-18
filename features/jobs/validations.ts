import * as yup from "yup";
import type { CreateJobPayload, JobStatus, JobType } from "./types";

const JOB_TYPE_VALUES: JobType[] = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "HYBRID",
  "REMOTE",
];

function hasTextContent(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim().length > 0;
}

export const jobFormSchema: yup.ObjectSchema<CreateJobPayload> = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(120, "Title must be at most 120 characters"),
  shortDescription: yup
    .string()
    .trim()
    .required("Short description is required")
    .max(300, "Short description must be at most 300 characters"),
  description: yup
    .string()
    .required("Full description is required")
    .test("html", "Full description is required", (value) => hasTextContent(value || "")),
  location: yup
    .string()
    .trim()
    .required("Location is required")
    .max(120, "Location must be at most 120 characters"),
  jobType: yup.mixed<JobType>().oneOf(JOB_TYPE_VALUES, "Job type is required").required("Job type is required"),
  department: yup
    .string()
    .trim()
    .required("Department is required")
    .max(80, "Department must be at most 80 characters"),
  salaryRange: yup
    .string()
    .trim()
    .required("Salary range is required")
    .max(80, "Salary range must be at most 80 characters"),
  requirements: yup
    .string()
    .trim()
    .required("Requirements are required")
    .max(2000, "Requirements must be at most 2000 characters"),
  displayOrder: yup
    .number()
    .typeError("Display order is required")
    .integer("Display order must be a whole number")
    .min(1, "Display order must be at least 1")
    .required("Display order is required"),
  status: yup.mixed<JobStatus>().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
  expiresAt: yup
    .string()
    .transform((value) => (value === "" || value == null ? null : value))
    .nullable()
    .defined()
    .test("datetime", "Enter a valid expiry date", (value) => {
      if (value == null) return true;
      return !Number.isNaN(new Date(value).getTime());
    }),
});

export type JobFormValues = yup.InferType<typeof jobFormSchema>;
