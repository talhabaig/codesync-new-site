"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import {
  destroyCloudinaryAsset,
  isCloudinaryUrl,
  type UploadFolder,
  type UploadResourceType,
} from "../../../features/upload/api";
import { useCloudinaryUpload } from "../../../features/upload/hooks/useCloudinaryUpload";
import { SafeImage } from "./SafeImage";
import { FieldLabel } from "./FieldLabel";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  resourceType?: UploadResourceType;
  error?: string;
  objectFit?: "cover" | "contain";
  fallbackSrc?: string;
  required?: boolean;
}

export function ImageUploader({
  label,
  value,
  onChange,
  folder,
  resourceType = "image",
  error,
  objectFit = "cover",
  fallbackSrc,
  required,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDestroying, setIsDestroying] = useState(false);
  const { uploadFile, isUploading, error: uploadError } = useCloudinaryUpload();
  const isBusy = isUploading || isDestroying;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const oldUrl = value;
    const url = await uploadFile(file, folder, resourceType);
    if (url) {
      if (oldUrl && oldUrl !== url && isCloudinaryUrl(oldUrl)) {
        try {
          await destroyCloudinaryAsset(oldUrl, resourceType);
        } catch {
          toast.error("New file uploaded, but the previous Cloudinary file could not be deleted");
        }
      }
      onChange(url);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = async () => {
    if (isCloudinaryUrl(value)) {
      setIsDestroying(true);
      try {
        await destroyCloudinaryAsset(value, resourceType);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete Cloudinary file");
        setIsDestroying(false);
        return;
      }
      setIsDestroying(false);
    }
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const hasError = !!(error || uploadError);
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
  const isVideo = resourceType === "video";

  return (
    <div className="w-full space-y-1.5">
      <FieldLabel required={required}>{label}</FieldLabel>

      {value ? (
        <div className="group relative overflow-hidden rounded-lg border border-gray-300 bg-gray-50">
          {isVideo ? (
            <video src={value} className={`h-32 w-full ${fitClass}`} muted />
          ) : (
            <SafeImage
              src={value}
              fallback={fallbackSrc || value}
              alt={label}
              className={`h-32 w-full ${fitClass}`}
            />
          )}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/50 transition-opacity ${
              isBusy ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {isBusy ? (
              <FaSpinner className="h-6 w-6 animate-spin text-white" />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isBusy}
          className={`flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            hasError
              ? "border-red-400 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          {isBusy ? (
            <>
              <FaSpinner className="mb-2 h-6 w-6 animate-spin text-customLightBlue2" />
              <span className="text-sm font-medium text-gray-600">
                {isDestroying ? "Removing..." : "Uploading..."}
              </span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="mb-2 h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                Click to upload {isVideo ? "video" : "image"}
              </span>
              <span className="mt-1 text-xs text-gray-400">
                {isVideo ? "MP4 and similar (max 150MB)" : "PNG, JPG, WEBP, SVG (max 5MB)"}
              </span>
            </>
          )}
        </button>
      )}

      <input
        type="file"
        accept={
          isVideo
            ? "video/*"
            : "image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
        }
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {hasError && <p className="text-xs text-red-600">{error || uploadError}</p>}
    </div>
  );
}
