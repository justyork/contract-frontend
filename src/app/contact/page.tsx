import { LegalPageShell } from "@/components/public/LegalPageShell";
import { MarkdownContent } from "@/components/MarkdownContent";

const contactMarkdown = `
## Contact details

Use the details below for support, privacy requests, billing questions, or general inquiries.

| | |
|---|---|
| **Email** | [SUPPORT_EMAIL] |
| **Company** | [COMPANY_NAME] |
| **Address** | [ADDRESS] |
[PLACEHOLDER_NOTE]

## What we can help with

- **Product support** — Questions about using Clealex, contract analysis, or your account.
- **Privacy and data** — Data subject requests (access, deletion, portability), privacy inquiries, or complaints. See our [Privacy Policy](/privacy).
- **Billing** — Invoices, refunds, or issues with token purchases. See our [Terms of Use](/terms) for refund policy.

## Response time

We aim to respond to inquiries within **2 business days**. For urgent account or security issues, include "Urgent" in your subject line.
`;

const PLACEHOLDER_NOTE =
  "\n\n*Replace placeholders in production: set `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_COMPANY_NAME`, and `NEXT_PUBLIC_COMPANY_ADDRESS` in your environment (see ENVIRONMENT.md).*\n";

function getContactContent(): string {
  const email =
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "YOUR_SUPPORT_EMAIL";
  const company =
    process.env.NEXT_PUBLIC_COMPANY_NAME?.trim() || "YOUR_COMPANY_NAME";
  const address =
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS?.trim() || "YOUR_COMPANY_ADDRESS";
  const isPlaceholder =
    email === "YOUR_SUPPORT_EMAIL" ||
    company === "YOUR_COMPANY_NAME" ||
    address === "YOUR_COMPANY_ADDRESS";
  const emailDisplay =
    email === "YOUR_SUPPORT_EMAIL" ? email : `[${email}](mailto:${email})`;

  return contactMarkdown
    .replace("[SUPPORT_EMAIL]", emailDisplay)
    .replace("[COMPANY_NAME]", company)
    .replace("[ADDRESS]", address)
    .replace("[PLACEHOLDER_NOTE]", isPlaceholder ? PLACEHOLDER_NOTE : "");
}

export default function ContactPage() {
  const content = getContactContent();

  return (
    <LegalPageShell title="Contact & Support" activePage="contact">
      <MarkdownContent content={content} />
    </LegalPageShell>
  );
}
