"use client";

import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";

/** Progress bar for public pages only — admin should feel like an SPA. */
export function RouteProgress() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <NextTopLoader
      color="#49B8FD"
      initialPosition={0.08}
      crawlSpeed={200}
      height={5}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px #49B8FD,0 0 5px #49B8FD"
    />
  );
}
