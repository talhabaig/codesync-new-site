"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCloudUploadAlt, FaSpinner, FaTimes } from "react-icons/fa";
import {
  destroyCloudinaryAsset,
  isCloudinaryUrl,
  type UploadFolder,
} from "../../../features/upload/api";
import { useCloudinaryUpload } from "../../../features/upload/hooks/useCloudinaryUpload";
import { SafeImage } from "./SafeImage";
import { FieldLabel } from "./FieldLabel";

interface GalleryUploaderProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  folder: UploadFolder;
  error?: string;
}

export function GalleryUploader({
  label,
  value,
  onChange,
  folder,
  error,
}: GalleryUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [removingUrl, setRemovingUrl] = useState<string | null>(null);
  const { uploadFile, isUploading, error: uploadError } = useCloudinaryUpload();
  const images = value || [];

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const uploaded: string[] = [];
    for (const file of files) {
      const url = await uploadFile(file, folder, "image");
      if (url) uploaded.push(url);
    }
    if (uploaded.length) onChange([...images, ...uploaded]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = async (url: string) => {
    if (isCloudinaryUrl(url)) {
      setRemovingUrl(url);
      try {
        await destroyCloudinaryAsset(url, "image");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete Cloudinary file");
        setRemovingUrl(null);
        return;
      }
      setRemovingUrl(null);
    }
    onChange(images.filter((item) => item !== url));
  };

  const hasError = !!(error || uploadError);

  return (
    <div className="w-full space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((url) => (
          <div
            key={url}
            className="group relative overflow-hidden rounded-lg border border-gray-300 bg-gray-50"
          >
            <SafeImage src={url} fallback={url} alt="Gallery image" className="h-28 w-full object-cover" />
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity ${
                removingUrl === url ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {removingUrl === url ? (
                <FaSpinner className="h-5 w-5 animate-spin text-white" />
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  disabled={isUploading}
                  className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700"
                >
                  <span className="inline-flex items-center gap-1">
                    <FaTimes className="h-3 w-3" /> Remove
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={`flex h-28 flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            hasError
              ? "border-red-400 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          {isUploading ? (
            <>
              <FaSpinner className="mb-1.5 h-5 w-5 animate-spin text-customLightBlue2" />
              <span className="text-xs font-medium text-gray-600">Uploading...</span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="mb-1.5 h-6 w-6 text-gray-400" />
              <span className="text-xs font-medium text-gray-600">Add images</span>
            </>
          )}
        </button>
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
        multiple
        ref={fileInputRef}
        onChange={handleFiles}
        className="hidden"
      />

      {hasError && <p className="text-xs text-red-600">{error || uploadError}</p>}
    </div>
  );
}
