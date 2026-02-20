"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ai/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
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
      <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-5 text-sm text-[var(--foreground-muted)]">
        <Spinner />
        Loading profile...
      </div>
    );
  }

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
