import { toast } from "react-hot-toast";

export const TOKEN_KEY = "token";
export const USER_KEY = "user";

let redirectingToLogin = false;

/** Decode JWT payload without verifying signature (UI/expiry only). */
export function readTokenExpiry(token: string): number | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json) as { exp?: number };
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function isAccessTokenValid(token: string | null | undefined): boolean {
  if (!token) return false;
  const expMs = readTokenExpiry(token);
  if (expMs === null) return true; // no exp claim — let API decide
  return Date.now() < expMs;
}

export function clearAuthStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Called when the API rejects the session (expired/invalid JWT).
 * Clears auth keys once and sends the user to login.
 */
export function handleSessionExpired(
  message = "Session expired. Please log in again."
) {
  if (typeof window === "undefined") return;
  if (redirectingToLogin) return;
  if (window.location.pathname.startsWith("/admin/login")) {
    clearAuthStorage();
    return;
  }

  redirectingToLogin = true;
  clearAuthStorage();
  toast.error(message);
  window.location.assign("/admin/login");
}
