import { readMarkdownFile } from "@/lib/markdown";
import { MarkdownContent } from "@/components/MarkdownContent";
import { LegalPageShell } from "@/components/public/LegalPageShell";

export default function PrivacyPage() {
  const content = readMarkdownFile("privacy.md");

  return (
    <LegalPageShell title="Privacy Policy" activePage="privacy">
        <MarkdownContent content={content} />
    </LegalPageShell>
  );
}
