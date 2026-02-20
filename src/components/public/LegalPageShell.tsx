import type { ReactNode } from "react";
import Link from "next/link";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Container } from "@/components/ui/Container";

type LegalPage = "terms" | "privacy" | "cookie-policy";

interface LegalPageShellProps {
  title: string;
  activePage: LegalPage;
  children: ReactNode;
}

const legalLinks: Array<{ href: `/${LegalPage}`; label: string; key: LegalPage }> =
  [
    { href: "/terms", label: "Terms", key: "terms" },
    { href: "/privacy", label: "Privacy", key: "privacy" },
    { href: "/cookie-policy", label: "Cookies", key: "cookie-policy" },
  ];

export function LegalPageShell({
  title,
  activePage,
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
        <Container
          size="md"
          className="flex h-16 items-center justify-between gap-4"
        >
          <Link href="/" className="focus-ring rounded-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
            ← Contralytic
          </Link>
          <nav aria-label="Legal navigation" className="flex items-center gap-3 text-sm">
            {legalLinks.map((item) => {
              const isActive = item.key === activePage;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`focus-ring rounded-[var(--radius-pill)] px-3 py-1.5 transition ${
                    isActive
                      ? "bg-blue-50 text-[var(--primary)]"
                      : "text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </header>
      <main id="main-content" className="py-12">
        <Container size="sm">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {title}
          </h1>
          <div className="mt-8">{children}</div>
        </Container>
      </main>
      <PublicFooter />
    </div>
  );
}
