import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const publicPaths = ["/signin", "/signup", "/password-reset"];

  const isPublicPath = publicPaths.includes(pathname);

  if (!token && !isPublicPath && !pathname.startsWith("/public")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
