import * as yup from "yup";
import type { BlogStatus, CreateBlogPayload } from "./types";

function hasTextContent(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim().length > 0;
}

export const blogFormSchema: yup.ObjectSchema<CreateBlogPayload> = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(160, "Title must be at most 160 characters"),
  excerpt: yup
    .string()
    .trim()
    .required("Excerpt is required")
    .max(300, "Excerpt must be at most 300 characters"),
  coverImage: yup.string().trim().required("Cover image is required"),
  content: yup
    .string()
    .required("Content is required")
    .test("html", "Content is required", (value) => hasTextContent(value || "")),
  tags: yup
    .array(yup.string().trim().required())
    .min(1, "Add at least one tag")
    .required("Add at least one tag"),
  status: yup
    .mixed<BlogStatus>()
    .oneOf(["DRAFT", "PUBLISHED"])
    .required("Status is required"),
});

export type BlogFormValues = yup.InferType<typeof blogFormSchema>;
