"use client";

interface CustomLoaderProps {
  label?: string;
  fullScreen?: boolean;
}

export function CustomLoader({
  label = "Loading...",
  fullScreen = false,
}: CustomLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "h-screen w-full bg-gray-50" : "py-12"
      }`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 rounded-full border-4 border-customLightBlue2/20" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-customLightBlue2 border-r-customLightBlue2" />
      </div>
      {label && (
        <p className="text-sm font-medium text-gray-600">{label}</p>
      )}
      <span className="sr-only">{label}</span>
    </div>
  );
}
