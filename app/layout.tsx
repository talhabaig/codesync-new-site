import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { Nav } from "./components/Nav";
import "./styles/globals.css";
import "./styles/main.scss";
import styles from "./styles/layout.module.css";
import { Footer } from "./components/Footer";
import NextTopLoader from "nextjs-toploader";
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
              content="Welcome to our premier software solutions company, where excellence meets innovation. We specialize in developing top-tier solutions for intricate web projects, harnessing an array of frameworks, platforms, and cutting-edge tools."
            />
            <meta name="format-detection" content="telephone=no" />
            <meta name="keywords" content="Code Sync" />
            <meta property="og:site_name" content="Code Sync" />
            <meta
              name="google-site-verification"
              content="yhKetG3xA7fFPnzgMSMSXaFBqVWgzZRpWE8js2vmCeE"
            />
            <link rel="icon" type="image/x-icon" href="/icon.png" />
          </head>
          <body>
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
            <Toaster position="top-right" />
            <section className={styles.container}>
              <Nav />
              <header className={styles.header}></header>
              <main className={styles.main}>{children}</main>
              <footer className={styles.footer}></footer>
              <Footer />
            </section>
          </body>
        </html>
      </QueryProvider>
    </StoreProvider>
  );
}
