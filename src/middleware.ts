import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/appwrite";

export default async function middleware(req: NextRequest) {
  const authenticated = await isAuthenticated();

  // If trying to access dashboard route and not authenticated
  if (req.nextUrl.pathname.startsWith("/dashboard") && !authenticated) {
    // Redirect to sign-in page
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(signInUrl.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/under-review"],
};
