import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

export const { GET, POST } = handlers;
