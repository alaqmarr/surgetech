import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is trying to access /admin but is not logged in, withAuth will handle redirect to /admin/login
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login',
    }
  }
);

export const config = {
  matcher: ["/admin/((?!login).*)", "/api/admin/:path*"],
};
