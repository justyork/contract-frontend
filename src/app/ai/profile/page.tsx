"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/ai/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { usePreferredCurrency } from "@/hooks/usePreferredCurrency";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, logout, refreshProfile } = useAuth();
  const { currency, setCurrency } = usePreferredCurrency(profile?.preferred_currency);
  const [savingCurrency, setSavingCurrency] = useState(false);
  const [currencyError, setCurrencyError] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!profile) {
    return (
      <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-5 text-sm text-[var(--foreground-muted)]">
        <Spinner />
        Loading profile...
      </div>
    );
  }

  const handleCurrencyChange = async (nextCurrency: "eur" | "usd") => {
    setCurrency(nextCurrency);
    setCurrencyError("");
    setSavingCurrency(true);
    try {
      await api.patch<{ success: true; preferred_currency: "eur" | "usd" }>("/profile", {
        preferred_currency: nextCurrency,
      });
      await refreshProfile();
    } catch (err) {
      setCurrencyError(err instanceof Error ? err.message : "Failed to save preferred currency");
    } finally {
      setSavingCurrency(false);
    }
  };

  return (
    <>
      <PageHeader title="Profile" description="Manage your account and token balance." />

      <div className="max-w-xl">
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-medium text-[var(--foreground-muted)]">Name</p>
            <p className="text-[var(--foreground)]">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground-muted)]">Email</p>
            <p className="text-[var(--foreground)]">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground-muted)]">Token balance</p>
            <p className="text-[var(--foreground)]">{profile.tokens} tokens</p>
            <Link
              href="/ai/tokens"
              className="focus-ring mt-1 inline-block rounded-sm text-sm font-medium text-[var(--primary)] underline"
            >
              Buy tokens
            </Link>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground-muted)]">Preferred currency</p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-1">
              {(["eur", "usd"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => void handleCurrencyChange(option)}
                  disabled={savingCurrency}
                  className={`focus-ring rounded-[var(--radius-sm)] px-3 py-1.5 text-xs font-medium uppercase disabled:opacity-60 ${
                    option === currency
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {currencyError && (
              <p className="mt-2 text-xs text-red-700">{currencyError}</p>
            )}
          </div>
        </Card>

        <button
          type="button"
          onClick={handleLogout}
          className={`${buttonClassName("secondary", "md")} mt-6`}
        >
          Log out
        </button>
      </div>
    </>
  );
}
