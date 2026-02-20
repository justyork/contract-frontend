"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const redirect = searchParams.get("redirect") ?? "/ai/dashboard";

    if (token) {
      setToken(token);
      router.push(redirect);
    } else {
      setError("Authentication failed. No token received.");
    }
  }, [searchParams, setToken, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-red-900">Authentication Error</h1>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 w-full rounded-lg bg-slate-800 py-2.5 font-medium text-white hover:bg-slate-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800"></div>
        </div>
        <p className="mt-4 text-center text-sm text-slate-600">Completing authentication...</p>
      </div>
    </div>
  );
}
