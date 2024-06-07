// import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import "./styles/main.scss";
import styles from "./styles/layout.module.css";
import { Footer } from "./components/Footer";
import Hero from "./home/Hero";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <Nav />

            <header className={styles.header}>
              {/* <Image
                src="/logo.svg"
                className={styles.logo}
                alt="logo"
                width={100}
                height={100}
              /> */}
              {/* <Hero /> */}
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
