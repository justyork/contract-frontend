import Link from "next/link";
import { FileQuestion } from "lucide-react";

/** Primary button styles matching Button.tsx; not-found is a Server Component so we avoid importing client buttonClassName. */
const primaryLinkClass =
  "focus-ring inline-flex h-10 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] shadow-sm transition-colors hover:bg-[var(--primary-hover)] hover:shadow";

/**
 * 404 page for unknown routes. Rendered when notFound() is called or route does not match.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex max-w-md flex-col items-center gap-6 rounded-2xl border border-(--border) bg-(--surface) p-8 shadow-(--shadow-card)">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--surface-muted) text-(--foreground-muted)">
          <FileQuestion className="h-7 w-7" aria-hidden />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            Page not found
          </h1>
          <p className="text-sm text-(--foreground-muted)">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>
        <Link href="/" className={primaryLinkClass}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
