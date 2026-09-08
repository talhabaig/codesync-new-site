"use client";

import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
  useState,
} from "react";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface CustomInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  /** Icon component or node rendered on the left inside the field */
  leftIcon?: IconType | ReactNode;
  /** Icon component or node rendered on the right inside the field */
  rightIcon?: IconType | ReactNode;
  /** Show eye toggle for password fields (default: true when type="password") */
  showPasswordToggle?: boolean;
}

function renderIcon(icon: IconType | ReactNode | undefined) {
  if (!icon) return null;
  if (typeof icon === "function") {
    const Icon = icon as IconType;
    return <Icon className="h-4 w-4" aria-hidden />;
  }
  return icon;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      showPasswordToggle,
      className = "",
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || props.name || generatedId;
    const isPassword = type === "password";
    const enableToggle =
      showPasswordToggle !== undefined ? showPasswordToggle : isPassword;
    const [visible, setVisible] = useState(false);

    const resolvedType =
      isPassword && enableToggle ? (visible ? "text" : "password") : type;

    const hasLeft = Boolean(leftIcon);
    const hasRight = Boolean(rightIcon) || (isPassword && enableToggle);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {hasLeft && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {renderIcon(leftIcon)}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            className={`block w-full rounded-lg border py-2.5 text-sm text-gray-800 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-customLightBlue2 focus:border-customLightBlue2
              disabled:bg-gray-50 disabled:cursor-not-allowed
              ${hasLeft ? "pl-10" : "pl-3"}
              ${hasRight ? "pr-10" : "pr-3"}
              ${error ? "border-red-400" : "border-gray-300"}
              ${className}`}
            {...props}
          />

          {(isPassword && enableToggle) || rightIcon ? (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isPassword && enableToggle ? (
                <button
                  type="button"
                  tabIndex={-1}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setVisible((v) => !v)}
                  aria-label={visible ? "Hide password" : "Show password"}
                >
                  {visible ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <span className="text-gray-400">{renderIcon(rightIcon)}</span>
              )}
            </span>
          ) : null}
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
