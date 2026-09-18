import * as yup from "yup";
import type { CreateTechStackPayload, TechStackCategory, TechStackStatus } from "./types";

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "CLOUD",
  "MOBILE",
  "DESIGN",
  "OTHER",
];

export const techStackFormSchema: yup.ObjectSchema<CreateTechStackPayload> = yup.object({
  name: yup.string().trim().required("Name is required").max(80, "Name must be at most 80 characters"),
  logo: yup.string().nullable().default(""),
  category: yup
    .mixed<TechStackCategory>()
    .oneOf(TECH_STACK_CATEGORIES, "Category is required")
    .required("Category is required"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .max(300, "Description must be at most 300 characters"),
  displayOrder: yup
    .number()
    .typeError("Display order is required")
    .integer("Display order must be a whole number")
    .min(1, "Display order must be at least 1")
    .required("Display order is required"),
  status: yup.mixed<TechStackStatus>().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

export type TechStackFormValues = yup.InferType<typeof techStackFormSchema>;
