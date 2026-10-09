import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { AppChrome } from "./components/AppChrome";
import "./styles/globals.css";
import "./styles/main.scss";
import { RouteProgress } from "./components/RouteProgress";
import { Toaster } from "react-hot-toast";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <QueryProvider>
        <html lang="en">
          <head>
            <title>Codesync</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
              name="description"
              content="Welcome to our premier software solutions company, where excellence meets innovation."
            />
            <meta name="format-detection" content="telephone=no" />
            <meta name="keywords" content="Code Sync" />
            <meta property="og:site_name" content="Code Sync" />
            <link rel="icon" type="image/x-icon" href="/icon.png" />
          </head>
          <body>
            <RouteProgress />
            <Toaster position="top-right" />
            <AppChrome>{children}</AppChrome>
          </body>
        </html>
      </QueryProvider>
    </StoreProvider>
  );
}
