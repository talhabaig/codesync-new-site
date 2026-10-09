import { ReactNode } from "react";

export function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-700">
      {children}
      {required ? <span className="ml-0.5 text-red-500">*</span> : null}
    </label>
  );
}

export function fieldControlClass(error?: boolean) {
  return `block w-full rounded-lg border px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-gray-300 focus:border-customLightBlue2 focus:ring-customLightBlue2"
  }`;
}
