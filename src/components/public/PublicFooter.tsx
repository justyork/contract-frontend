import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-8">
      <Container size="lg" className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <span className="text-sm text-[var(--foreground-muted)]">
          Clealex
        </span>
        <nav
          aria-label="Footer links"
          className="flex items-center gap-5 text-sm text-[var(--foreground-muted)]"
        >
          <Link href="/contact" className="focus-ring rounded-sm hover:text-[var(--foreground)]">
            Contact
          </Link>
          <Link href="/privacy" className="focus-ring rounded-sm hover:text-[var(--foreground)]">
            Privacy
          </Link>
          <Link href="/terms" className="focus-ring rounded-sm hover:text-[var(--foreground)]">
            Terms
          </Link>
          <Link
            href="/cookie-policy"
            className="focus-ring rounded-sm hover:text-[var(--foreground)]"
          >
            Cookies
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
