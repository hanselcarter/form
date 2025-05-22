import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STORAGE_KEYS } from "./constants";

const PROTECTED_ROUTES = ["/dashboard"];

const AUTH_ROUTES = ["/login", "/signup"];

const PUBLIC_ROUTES = ["/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const requestHeaders = new Headers(request.headers);

  let routeType = "unknown";
  if (isProtectedRoute) routeType = "protected";
  else if (isAuthRoute) routeType = "auth";
  else if (isPublicRoute) routeType = "public";

  requestHeaders.set("x-route-type", routeType);

  if (isProtectedRoute) {
    const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - API routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
