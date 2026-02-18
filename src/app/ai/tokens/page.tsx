"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { TokenPackage } from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";

export default function TokensPage() {
  const { profile } = useAuth();
  const [packages, setPackages] = useState<TokenPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPackagesLoading(true);
    api
      .get<TokenPackage[]>("/tokens/packages")
      .then((data) => {
        setPackages(Array.isArray(data) ? data : []);
      })
      .catch(() => setPackages([]))
      .finally(() => setPackagesLoading(false));
  }, []);

  const handleBuy = async (priceId: string) => {
    if (!priceId) {
      setError("This package is not available for purchase yet (no Stripe price configured).");
      return;
    }
    setError("");
    setBuyLoading(true);
    try {
      const res = await api.post<{ redirectUrl: string }>("/payments/create-intent", {
        priceId,
        type: "token_purchase",
      });
      window.location.href = res.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setBuyLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link href="/ai/dashboard" className="text-slate-600 hover:text-slate-900">
            ← Dashboard
          </Link>
          <span className="font-medium text-slate-800">
            Balance: {profile?.tokens ?? 0} tokens
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Buy tokens</h1>
        <p className="mt-1 text-slate-600">
          One token ≈ 1,000 characters. Average contract (~20K chars) ≈ €2. Tokens don't expire.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        {packagesLoading && (
          <p className="mt-8 text-slate-600">Loading packages…</p>
        )}

        {!packagesLoading && packages.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-700">No token packages available right now.</p>
            <p className="mt-2 text-sm text-slate-500">
              Packages may need to be configured in the backend. Try again later or contact support.
            </p>
            <Link
              href="/ai/dashboard"
              className="mt-6 inline-block text-slate-700 underline hover:no-underline"
            >
              ← Back to dashboard
            </Link>
          </div>
        )}

        {!packagesLoading && packages.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h2 className="text-lg font-semibold text-slate-800">{pkg.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{pkg.description ?? ""}</p>
                <p className="mt-4 text-2xl font-bold text-slate-900">${pkg.price}</p>
                {pkg.savings && (
                  <p className="text-sm text-green-600">Save ${pkg.savings}</p>
                )}
                <p className="text-sm text-slate-500">{pkg.tokens} tokens</p>
                <button
                  type="button"
                  disabled={buyLoading || !pkg.stripe_price_id}
                  onClick={() => handleBuy(pkg.stripe_price_id ?? "")}
                  className="mt-6 w-full rounded-lg bg-slate-800 py-2.5 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
                >
                  {pkg.stripe_price_id ? (buyLoading ? "Redirecting…" : "Buy") : "Not configured"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
