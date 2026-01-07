import { auth } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnChat = req.nextUrl.pathname.startsWith("/chat");

  // Redirect unauthenticated users trying to access /chat
  if (isOnChat && !isLoggedIn) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/chat/:path*"],
};
