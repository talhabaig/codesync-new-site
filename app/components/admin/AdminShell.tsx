"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CustomLoader } from "@/app/components/ui/CustomLoader";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/login");

  useEffect(() => {
    const ok = isAuthenticated();
    setAuthed(ok);
    setAuthReady(true);
    if (!isAuthPage && !ok) {
      router.replace("/admin/login");
    }
  }, [isAuthPage, isAuthenticated, router, pathname]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Warm admin routes so sidebar clicks feel instant
  useEffect(() => {
    router.prefetch("/admin/admindashboard");
    router.prefetch("/admin/profile");
  }, [router]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  // First paint only — verify token exists before showing the shell
  if (!authReady) {
    return <CustomLoader fullScreen label="Checking session..." />;
  }

  if (!authed) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-30 flex shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FaBars className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Welcome back</p>
            <p className="font-semibold text-gray-900">
              {loading && !user ? "..." : user?.name || user?.email || "Admin"}
            </p>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
