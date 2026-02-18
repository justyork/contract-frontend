"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link href="/ai/dashboard" className="text-slate-600 hover:text-slate-900">
            ← Dashboard
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Name</p>
            <p className="text-slate-900">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="text-slate-900">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Token balance</p>
            <p className="text-slate-900">{profile.tokens} tokens</p>
            <Link href="/ai/tokens" className="mt-1 inline-block text-sm font-medium text-slate-700 hover:underline">
              Buy tokens
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Log out
        </button>
      </main>
    </div>
  );
}
