import {
  compactParams,
  getApiErrorMessage,
  makeApiCall,
} from "@/lib/api/makeApiCall";

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

export interface CloudinaryDestroySignatureData {
  url: string;
  cloudName: string;
  apiKey: string;
  signature: string;
  timestamp: number;
  publicId: string;
  resourceType: UploadResourceType;
  invalidate: string;
}

export interface CloudinaryDestroySignatureResponse {
  success: boolean;
  data: CloudinaryDestroySignatureData;
}

export function isCloudinaryUrl(url: string | null | undefined): boolean {
  return !!url && url.includes("res.cloudinary.com");
}

export const getDestroySignatureApi = async (params: {
  url?: string;
  publicId?: string;
  resourceType?: UploadResourceType;
}) => {
  try {
    return await makeApiCall<CloudinaryDestroySignatureResponse>({
      url: "/upload/destroy-signature",
      method: "GET",
      params: compactParams(params as Record<string, unknown>),
    });
  } catch (err) {
    throw new Error(getApiErrorMessage(err, "Failed to get destroy signature"));
  }
};

export const destroyCloudinaryAsset = async (
  secureUrl: string,
  resourceType: UploadResourceType = "image"
): Promise<void> => {
  if (!isCloudinaryUrl(secureUrl)) return;

  const sigRes = await getDestroySignatureApi({
    url: secureUrl,
    resourceType,
  });
  if (!sigRes.success || !sigRes.data) {
    throw new Error("Failed to get destroy signature");
  }

  const { data } = sigRes;
  const form = new FormData();
  form.append("public_id", data.publicId);
  form.append("api_key", data.apiKey);
  form.append("timestamp", String(data.timestamp));
  form.append("signature", data.signature);
  form.append("invalidate", String(data.invalidate));

  const cloudRes = await fetch(data.url, { method: "POST", body: form });
  const cloudJson = await cloudRes.json().catch(() => null);

  if (!cloudRes.ok || cloudJson?.result !== "ok") {
    throw new Error(cloudJson?.error?.message || "Cloudinary delete failed");
  }
};
