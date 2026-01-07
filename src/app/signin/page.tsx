"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 rounded-lg shadow-xl p-8 border border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to <span className="text-red-600">ChatApp</span>
          </h1>
          <p className="text-zinc-400">
            Sign in to start chatting with people around the world
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/chat" })}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>

        <p className="text-zinc-500 text-sm text-center mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
