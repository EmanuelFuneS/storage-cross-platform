import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export default auth((req: any) => {
  const isLoggedIn = !req.auth;
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*"], //protected routes
};
