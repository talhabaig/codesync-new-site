import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";
import "./styles/globals.css";
import "./styles/main.scss";
import styles from "./styles/layout.module.css";
import { Footer } from "./components/Footer";
import NextTopLoader from "nextjs-toploader";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
      <head>
  <title>CodeSyncs - Contact Us</title>
  <meta name="description" content="Contact CodeSyncs for any questions or remarks. Just write us a message, our team member will contact you shortly!" />
  <link rel="icon" href="/icon.png" />
  <link rel="canonical" href="https://www.codesyncs.com/contact" />

  <meta property="og:title" content="CodeSyncs - Contact Us" />
  <meta property="og:description" content="Contact CodeSyncs for any questions or remarks. Just write us a message , our team member will contact you shortly!" />
  <meta property="og:url" content="https://www.codesyncs.com/contact" />
  <meta property="og:site_name" content="CodeSyncs" />
  <meta property="og:type" content="website" />
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
          <section className={styles.container}>
            <Nav />

            <header className={styles.header}>
             
            </header>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
            
            </footer>
            <Footer />
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
