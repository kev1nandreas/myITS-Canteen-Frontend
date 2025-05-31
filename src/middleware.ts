import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ENV } from "./configs/environment";
import { PATH } from "./shared/path";

export async function middleware(request: NextRequest) {
  // Skip middleware for RSC requests
  if (
    request.headers.get("RSC") === "1" ||
    request.headers.get("Next-Router-State-Tree") ||
    request.headers.get("Next-Router-Prefetch")
  ) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const hasToken = request.cookies.get(ENV.TOKEN_KEY)?.value;

  if (pathname === PATH.AUTH.LOGIN && hasToken) {
    return NextResponse.redirect(new URL(PATH.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*', '/guard/:path*'],
};