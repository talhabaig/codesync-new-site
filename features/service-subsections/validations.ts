import * as yup from "yup";
import type { CreateServiceSubsectionPayload, ServiceSubsectionStatus } from "./types";

function emptyToNull(value: unknown) {
  if (value == null) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
}

function hasTextContent(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim().length > 0;
}

export const serviceSubsectionFormSchema: yup.ObjectSchema<CreateServiceSubsectionPayload> =
  yup.object({
    serviceId: yup.string().trim().required("Service is required"),
    title: yup
      .string()
      .trim()
      .required("Title is required")
      .max(120, "Title must be at most 120 characters"),
    logo: yup.string().trim().required("Logo is required"),
    shortDescription: yup
      .string()
      .transform(emptyToNull)
      .nullable()
      .defined()
      .max(300, "Short description must be at most 300 characters"),
    description: yup
      .string()
      .transform((value) => {
        if (value == null || value === "") return null;
        return hasTextContent(value) ? value : null;
      })
      .nullable()
      .defined(),
    displayOrder: yup
      .number()
      .typeError("Display order is required")
      .integer("Display order must be a whole number")
      .min(1, "Display order must be at least 1")
      .required("Display order is required"),
    status: yup
      .mixed<ServiceSubsectionStatus>()
      .oneOf(["ACTIVE", "INACTIVE"])
      .required("Status is required"),
  });
