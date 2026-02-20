"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AiSidebarNav } from "@/components/ai/AiSidebarNav";
import { AiTopbar } from "@/components/ai/AiTopbar";

interface AiShellProps {
  children: ReactNode;
}

export function AiShell({ children }: AiShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AiTopbar onMenuClick={() => setMobileOpen(true)} />
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 md:px-6 md:py-8">
        <aside className="hidden w-64 shrink-0 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 md:block md:sticky md:top-24 md:h-fit">
          <AiSidebarNav />
        </aside>

        <main id="main-content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-900/30"
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-[var(--foreground)]">Navigation</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="focus-ring rounded-[var(--radius-md)] px-2 py-1 text-sm text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              >
                Close
              </button>
            </div>
            <AiSidebarNav onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </div>
  );
}
