"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import styles from "@/app/styles/layout.module.css";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <section className={styles.container}>
      <Nav />
      <header className={styles.header}></header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}></footer>
      <Footer />
    </section>
  );
}
