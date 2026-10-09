"use client";

import { ReactNode } from "react";
import { AdminShell } from "@/app/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
