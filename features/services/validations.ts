import * as yup from "yup";
import type { CreateServicePayload } from "./types";

function hasTextContent(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim().length > 0;
}

export const serviceFormSchema: yup.ObjectSchema<CreateServicePayload> = yup.object({
  title: yup.string().trim().required("Title is required").max(120, "Title must be at most 120 characters"),
  shortDescription: yup
    .string()
    .trim()
    .required("Short description is required")
    .max(300, "Short description must be at most 300 characters"),
  description: yup
    .string()
    .required("Full description is required")
    .test("html", "Full description is required", (value) => hasTextContent(value || "")),
  icon: yup.string().trim().required("Icon is required").max(500, "Icon must be at most 500 characters"),
  bannerImage: yup.string().default(""),
  headerImage: yup.string().default(""),
  displayOrder: yup
    .number()
    .typeError("Display order is required")
    .integer("Display order must be a whole number")
    .min(1, "Display order must be at least 1")
    .required("Display order is required"),
  showOnHome: yup.boolean().required(),
  status: yup.mixed<CreateServicePayload["status"]>().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
  seoTitle: yup.string().max(70, "SEO title must be at most 70 characters").default(""),
  seoDescription: yup.string().max(160, "SEO description must be at most 160 characters").default(""),
  seoKeywords: yup.string().max(200, "SEO keywords must be at most 200 characters").default(""),
});

export type ServiceFormValues = yup.InferType<typeof serviceFormSchema>;
