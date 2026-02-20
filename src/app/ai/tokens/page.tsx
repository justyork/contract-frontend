"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/ai/EmptyState";
import { PageHeader } from "@/components/ai/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
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
      window.location.assign(res.redirectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setBuyLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Buy tokens"
        description="One token is about 1,000 characters. Average contract (~20K chars) is about 20 tokens."
      />

      <p className="mb-4 text-sm text-[var(--foreground-muted)]">
        Current balance: {profile?.tokens ?? 0} tokens
      </p>

      {error && (
        <p className="mb-4 rounded-[var(--radius-md)] bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {packagesLoading && (
        <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-5 text-sm text-[var(--foreground-muted)]">
          <Spinner />
          Loading packages...
        </div>
      )}

      {!packagesLoading && packages.length === 0 && (
        <EmptyState
          title="No token packages available right now"
          description="Packages may need to be configured in the backend. Try again later or contact support."
          action={
            <Link href="/ai/dashboard" className={buttonClassName("secondary", "md")}>
              Back to dashboard
            </Link>
          }
        />
      )}

      {!packagesLoading && packages.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <Card key={pkg.id}>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">{pkg.name}</h2>
              <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                {pkg.description ?? ""}
              </p>
              <p className="mt-4 text-3xl font-bold text-[var(--foreground)]">${pkg.price}</p>
              {pkg.savings && (
                <p className="text-sm text-emerald-700">Save ${pkg.savings}</p>
              )}
              <p className="text-sm text-[var(--foreground-muted)]">{pkg.tokens} tokens</p>
              <button
                type="button"
                disabled={buyLoading || !pkg.stripe_price_id}
                onClick={() => handleBuy(pkg.stripe_price_id ?? "")}
                className={`${buttonClassName("primary", "md", true)} mt-6 disabled:opacity-50`}
              >
                {pkg.stripe_price_id
                  ? buyLoading
                    ? "Redirecting..."
                    : "Buy"
                  : "Not configured"}
              </button>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
