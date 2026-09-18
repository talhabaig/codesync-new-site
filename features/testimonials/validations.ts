import * as yup from "yup";
import type { CreateTestimonialPayload, TestimonialStatus } from "./types";

export const testimonialFormSchema: yup.ObjectSchema<CreateTestimonialPayload> = yup.object({
  clientName: yup
    .string()
    .trim()
    .required("Client name is required")
    .max(80, "Client name must be at most 80 characters"),
  designation: yup
    .string()
    .trim()
    .required("Designation is required")
    .max(120, "Designation must be at most 120 characters"),
  company: yup.string().trim().required("Company is required").max(120, "Company must be at most 120 characters"),
  photo: yup.string().trim().required("Photo is required"),
  testimonial: yup
    .string()
    .trim()
    .required("Testimonial is required")
    .max(1000, "Testimonial must be at most 1000 characters"),
  rating: yup
    .number()
    .typeError("Rating is required")
    .integer()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .required("Rating is required"),
  displayOrder: yup
    .number()
    .typeError("Display order is required")
    .integer("Display order must be a whole number")
    .min(1, "Display order must be at least 1")
    .required("Display order is required"),
  featured: yup.boolean().required(),
  status: yup.mixed<TestimonialStatus>().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

export type TestimonialFormValues = yup.InferType<typeof testimonialFormSchema>;
