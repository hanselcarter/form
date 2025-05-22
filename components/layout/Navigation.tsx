"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { APP_NAME } from "@/constants";

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">{APP_NAME}</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">
                  {user?.email}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-sm font-medium text-slate-600 hover:text-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-primary"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-slate-600 hover:text-primary"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
