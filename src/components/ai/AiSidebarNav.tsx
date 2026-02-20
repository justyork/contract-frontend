"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AiSidebarNavProps {
  onNavigate?: () => void;
}

const navItems = [
  { href: "/ai/dashboard", label: "Dashboard" },
  { href: "/ai/analyse", label: "New analysis" },
  { href: "/ai/tokens", label: "Buy tokens" },
  { href: "/ai/profile", label: "Profile" },
];

export function AiSidebarNav({ onNavigate }: AiSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="space-y-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            onClick={onNavigate}
            className={`focus-ring block rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-blue-50 text-[var(--primary)]"
                : "text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <div className="mt-4 border-t border-[var(--border)] pt-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="focus-ring block rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--foreground-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}
