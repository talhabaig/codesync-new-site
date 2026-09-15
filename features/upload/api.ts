import { getApiErrorMessage, makeApiCall } from "@/lib/api/makeApiCall";

export const UPLOAD_FOLDERS = [
  "codesyncs/services",
  "codesyncs/tech-stacks",
  "codesyncs/process",
  "codesyncs/why-us",
  "codesyncs/testimonials",
  "codesyncs/portfolio",
  "codesyncs/blogs",
  "codesyncs/blogs/rich-text",
  "codesyncs/team",
] as const;

export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];
export type UploadResourceType = "image" | "video";

export interface CloudinarySignatureData {
  url: string;
  cloudName: string;
  apiKey: string;
  signature: string;
  timestamp: number;
  folder: UploadFolder | string;
  resourceType: UploadResourceType;
  allowedFormats: string[];
  maxBytes: number;
}

export interface CloudinarySignatureResponse {
  success: boolean;
  data: CloudinarySignatureData;
}

export const getUploadSignatureApi = async (
  folder: UploadFolder,
  resourceType: UploadResourceType
) => {
  try {
    return await makeApiCall<CloudinarySignatureResponse>({
      url: "/upload/signature",
      method: "GET",
      params: { folder, resourceType },
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to get upload signature"));
  }
};
