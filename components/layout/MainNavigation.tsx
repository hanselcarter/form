"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { APP_NAME } from "@/constants";
import { Button } from "../ui/button";

export function MainNavigation() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  // Don't show navigation on auth pages
  const authPages = ["/login", "/signup", "/forgot-password"];
  if (authPages.includes(pathname)) {
    return null;
  }

  return (
    <header className="w-full border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">{APP_NAME}</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/"
                ? "text-primary"
                : "text-slate-600 hover:text-primary"
            }`}
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium ${
                  pathname === "/dashboard"
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">{user?.email}</span>
                <Button
                  onClick={logout}
                  className="inline-flex h-9 items-center justify-center gap-1 rounded-md bg-red-50 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-slate-900 border border-slate-200 hover:bg-slate-50"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
