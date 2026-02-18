"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Contract } from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { profile } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Contract[]>("/contracts")
      .then(setContracts)
      .catch(() => setContracts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <span className="font-semibold text-slate-800">Contralytic</span>
          <nav className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {profile?.tokens ?? 0} tokens
            </span>
            <Link
              href="/ai/tokens"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Buy tokens
            </Link>
            <Link
              href="/ai/profile"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Profile
            </Link>
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">My contracts</h1>
          <Link
            href="/ai/analyse"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            New analysis
          </Link>
        </div>

        {loading ? (
          <p className="mt-8 text-slate-500">Loading…</p>
        ) : contracts.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">No analyses yet.</p>
            <Link
              href="/ai/analyse"
              className="mt-4 inline-block font-medium text-slate-800 hover:underline"
            >
              Analyse your first contract →
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {contracts.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/ai/contract/${c.id}`}
                  className="block rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      {c.result?.contract_type ?? "Contract"} · {c.tokens} tokens
                    </span>
                    <span className="text-sm text-slate-500">
                      {c.result?.signing_recommendation != null
                        ? `Score: ${c.result.signing_recommendation}/10`
                        : ""}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {new Date(c.created_at).toLocaleString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
