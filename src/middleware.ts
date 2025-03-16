import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/appwrite";
import { checkBusinessProfile } from "./lib/dealer-actions";

export default async function middleware(req: NextRequest) {
  const authenticated = await isAuthenticated();
  
  // If not authenticated, always redirect to sign-in
  if (!authenticated) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(signInUrl.toString());
  }
  
  // Only check business profile for dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const { account, business } = await checkBusinessProfile();
    
    // If user is authenticated but doesn't have approved business profile
    if (!account || !business) {
      // Only redirect if they're not already on the under-review page
      if (req.nextUrl.pathname !== "/under-review") {
        const underReviewUrl = new URL("/under-review", req.nextUrl.origin);
        return NextResponse.redirect(underReviewUrl.toString());
      }
    }
  }
  
  // For the under-review page, check if they should actually be on dashboard
  if (req.nextUrl.pathname === "/under-review") {
    const { account, business } = await checkBusinessProfile();
    
    // If they have approved profile, redirect to dashboard
    if (account && business) {
      const dashboardUrl = new URL("/dashboard", req.nextUrl.origin);
      return NextResponse.redirect(dashboardUrl.toString());
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/under-review"],
};