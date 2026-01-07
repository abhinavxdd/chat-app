"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
      <Link href="/" className="text-2xl font-bold text-red-600">
        ChatApp
      </Link>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span className="text-white">{session.user?.name}</span>
            </div>
            <Link
              href="/chat"
              className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
            >
              Chat
            </Link>
            <button
              onClick={() => signOut()}
              className="px-6 py-2 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/api/auth/signin"
            className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
