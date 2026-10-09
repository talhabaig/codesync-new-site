"use client";

import { ImgHTMLAttributes, useEffect, useState } from "react";

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  fallback: string;
}

export function SafeImage({ src, fallback, alt, onError, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  useEffect(() => {
    setCurrentSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
        onError?.(event);
      }}
    />
  );
}
