import { readMarkdownFile } from "@/lib/markdown";
import { MarkdownContent } from "@/components/MarkdownContent";
import { LegalPageShell } from "@/components/public/LegalPageShell";

export default function CookiePolicyPage() {
  const content = readMarkdownFile("cookie-policy.md");

  return (
    <LegalPageShell title="Cookie Policy" activePage="cookie-policy">
        <MarkdownContent content={content} />
    </LegalPageShell>
  );
}
