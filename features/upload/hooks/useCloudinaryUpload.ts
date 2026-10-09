import { useState } from "react";
import {
  getUploadSignatureApi,
  type UploadFolder,
  type UploadResourceType,
} from "../api";

function isAllowedFormat(ext: string | undefined, allowedFormats: string[]) {
  if (!ext || !allowedFormats?.length) return true;
  if (allowedFormats.includes(ext)) return true;
  if (ext === "jpeg" && allowedFormats.includes("jpg")) return true;
  if (ext === "jpg" && allowedFormats.includes("jpeg")) return true;
  return false;
}

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    folder: UploadFolder,
    resourceType: UploadResourceType = "image"
  ): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const sigRes = await getUploadSignatureApi(folder, resourceType);
      if (!sigRes.success || !sigRes.data) {
        throw new Error("Failed to get upload signature");
      }

      const {
        url,
        apiKey,
        timestamp,
        signature,
        folder: signedFolder,
        allowedFormats,
        maxBytes,
      } = sigRes.data;

      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!isAllowedFormat(ext, allowedFormats)) {
        throw new Error(`Allowed formats: ${allowedFormats.join(", ")}`);
      }
      if (file.size > maxBytes) {
        throw new Error(
          `File is too large. Maximum size is ${(maxBytes / 1024 / 1024).toFixed(0)}MB`
        );
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", signedFolder);

      const cloudinaryRes = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const cloudinaryData = await cloudinaryRes.json().catch(() => null);

      if (!cloudinaryRes.ok) {
        throw new Error(cloudinaryData?.error?.message || "Upload failed");
      }

      const secureUrl = cloudinaryData?.secure_url as string | undefined;
      if (!secureUrl) {
        throw new Error("Upload succeeded but no secure_url was returned");
      }
      return secureUrl;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, error };
}
