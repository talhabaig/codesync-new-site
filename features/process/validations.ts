import * as yup from "yup";
import type { CreateProcessPayload, ProcessStatus } from "./types";

export const processFormSchema: yup.ObjectSchema<CreateProcessPayload> = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(120, "Title must be at most 120 characters"),
  icon: yup.string().trim().required("Icon is required"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .max(400, "Description must be at most 400 characters"),
  displayOrder: yup
    .number()
    .typeError("Display order is required")
    .integer("Display order must be a whole number")
    .min(1, "Display order must be at least 1")
    .required("Display order is required"),
  status: yup.mixed<ProcessStatus>().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

export type ProcessFormValues = yup.InferType<typeof processFormSchema>;
