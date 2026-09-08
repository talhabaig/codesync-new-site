"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaUserCog,
} from "react-icons/fa";
import { useAuth } from "@/features/auth/hooks/useAuth";

const navItems = [
  { href: "/admin/admindashboard", label: "Dashboard", icon: FaTachometerAlt },
  { href: "/admin/profile", label: "Profile", icon: FaUserCog },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 shrink-0 flex-col overflow-hidden bg-customNavy text-white shadow-xl transition-transform duration-300
          lg:static lg:translate-x-0 lg:shadow-none
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-customLightBlue2">
              CodeSyncs
            </p>
            <h2 className="text-lg font-bold">Admin Panel</h2>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                  ${
                    active
                      ? "bg-customLightBlue2 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 px-4 py-4">
          <div className="mb-3 truncate text-sm">
            <p className="font-semibold">{user?.name || "Admin"}</p>
            <p className="truncate text-white/60">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-sm font-semibold hover:bg-white/20"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
