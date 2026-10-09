import * as yup from "yup";
import type { CreatePortfolioPayload, PortfolioStatus } from "./types";

function hasTextContent(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim().length > 0;
}

function emptyToNull(value: unknown) {
  if (value == null) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export const portfolioFormSchema: yup.ObjectSchema<CreatePortfolioPayload> = yup.object({
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
  coverImage: yup.string().trim().required("Cover image is required"),
  galleryImages: yup
    .array(yup.string().trim().required())
    .ensure()
    .default([]),
  siteUrl: yup
    .string()
    .transform(emptyToNull)
    .nullable()
    .defined()
    .test("url", "Enter a valid website URL", (value) => !value || isHttpUrl(value)),
  videoUrl: yup
    .string()
    .transform(emptyToNull)
    .nullable()
    .defined()
    .test("url", "Upload a valid video URL", (value) => !value || isHttpUrl(value)),
  content: yup
    .string()
    .required("Content is required")
    .test("html", "Content is required", (value) => hasTextContent(value || "")),
  displayOrder: yup
    .number()
    .typeError("Display order is required")
    .integer("Display order must be a whole number")
    .min(1, "Display order must be at least 1")
    .required("Display order is required"),
  status: yup.mixed<PortfolioStatus>().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

export type PortfolioFormValues = yup.InferType<typeof portfolioFormSchema>;
