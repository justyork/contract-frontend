"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Building2,
  Clock,
  FileCheck,
  Languages,
  Scale,
  TrendingUp,
  Upload,
  User,
  Zap,
} from "lucide-react";
import { HomeHeaderNav } from "@/components/HomeHeaderNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Badge } from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const iconProps = { size: 24, strokeWidth: 1.5 };

type SampleTab = "risks" | "clauses" | "recommendation";

const sampleTabs: Array<{ id: SampleTab; label: string }> = [
  { id: "risks", label: "Risks" },
  { id: "clauses", label: "Clauses" },
  { id: "recommendation", label: "Recommendation" },
];

const sampleContent: Record<
  SampleTab,
  { title: string; points: string[]; tone: "brand" | "success" | "neutral" }
> = {
  risks: {
    title: "Top issues detected",
    points: [
      "Auto-renewal clause with only 7-day cancellation window.",
      "Broad liability cap exclusion for vendor negligence.",
      "Unbalanced termination rights in favor of the supplier.",
    ],
    tone: "brand",
  },
  clauses: {
    title: "Key clauses at a glance",
    points: [
      "Payment terms: Net 30 with 2.5% monthly late fee.",
      "Data processing obligations mapped to privacy standards.",
      "IP ownership remains with contractor for pre-existing assets.",
    ],
    tone: "neutral",
  },
  recommendation: {
    title: "Signing recommendation",
    points: [
      "Current score: 6.5/10. Sign only after clause adjustments.",
      "Negotiate cancellation period to minimum 30 days.",
      "Add mutual limitation of liability language before approval.",
    ],
    tone: "success",
  },
};

export default function Home() {
  const [activeSampleTab, setActiveSampleTab] = useState<SampleTab>("risks");
  const selectedSample = sampleContent[activeSampleTab];

  useEffect(() => {
    const els = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );
    els.forEach((el) => {
      el.classList.add("animate-on-scroll");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md">
        <Container size="lg" className="flex h-16 items-center justify-between">
          <span className="text-xl font-semibold tracking-tight text-[var(--foreground)]">Contralytic</span>
          <HomeHeaderNav />
        </Container>
      </header>

      <main id="main-content">
        <Section spacing="lg" className="hero-gradient pb-16 pt-20 sm:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="brand">AI contract clarity for fast decisions</Badge>
            <h1 className="mt-6 font-light text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
              Sign with confidence, not guesswork
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--foreground-muted)]">
              Contralytic reviews your contract in minutes and highlights hidden
              risks, key obligations, and negotiation priorities in one clean
              report.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className={buttonClassName("primary", "lg")}
                data-analytics-event="hero_cta_click"
              >
                Start analyzing
              </Link>
              <Link
                href="#sample-report"
                className={buttonClassName("secondary", "lg")}
                data-analytics-event="hero_demo_click"
              >
                See demo report
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--foreground-muted)]">
              <Badge>Encrypted processing</Badge>
              <Badge>GDPR-ready workflows</Badge>
              <Badge>No legal advice replacement</Badge>
            </div>
          </div>
        </Section>

        <Section id="features" background="surface" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">Built for every contract-heavy team</h2>
            <p className="section-subtitle">
              One workflow, tailored outcomes for owners, freelancers, and legal
              teams.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "SMB owners",
                description:
                  "Catch pricing, liability, and renewal traps before they impact cash flow.",
                Icon: Building2,
              },
              {
                title: "Freelancers",
                description:
                  "Validate scope, payment terms, and ownership clauses before signing.",
                Icon: User,
              },
              {
                title: "Legal teams",
                description:
                  "Get structured first-pass analysis to prioritize manual review faster.",
                Icon: Scale,
              },
            ].map(({ title, description, Icon }) => (
              <Card key={title}>
                <span
                  className="inline-flex text-[var(--foreground-muted)]"
                  aria-hidden
                >
                  <Icon {...iconProps} />
                </span>
                <h3 className="mt-3 text-lg font-medium text-[var(--foreground)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">How it works</h2>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "Upload a PDF or paste your contract text.",
                Icon: Upload,
              },
              {
                step:
                  "Choose your language and run analysis in one click.",
                Icon: Languages,
              },
              {
                step:
                  "Review risks, clauses, and signing recommendation.",
                Icon: FileCheck,
              },
            ].map(({ step, Icon }, index) => (
              <Card key={step} className="flex items-start gap-4">
                <span
                  className="inline-flex text-[var(--foreground-muted)]"
                  aria-hidden
                >
                  <Icon {...iconProps} size={22} />
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-[var(--primary-foreground)]">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-[var(--foreground-muted)]">
                  {step}
                </span>
              </Card>
            ))}
          </ol>
        </Section>

        <Section id="sample-report" background="surface" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">Live sample analysis</h2>
            <p className="section-subtitle">
              Preview how insights are organized before you register.
            </p>
          </div>
          <Card className="mx-auto mt-10 max-w-4xl">
            <div
              className="inline-flex rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-muted)] p-1"
              role="tablist"
              aria-label="Sample analysis tabs"
            >
              {sampleTabs.map((tab) => {
                const isActive = tab.id === activeSampleTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`sample-panel-${tab.id}`}
                    id={`sample-tab-${tab.id}`}
                    className={`focus-ring rounded-[var(--radius-pill)] px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-[var(--surface)] text-[var(--foreground)] shadow"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    }`}
                    data-analytics-event="demo_tab_switch"
                    onClick={() => setActiveSampleTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div
              id={`sample-panel-${activeSampleTab}`}
              role="tabpanel"
              aria-labelledby={`sample-tab-${activeSampleTab}`}
              className="mt-6 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium text-[var(--foreground)]">
                  {selectedSample.title}
                </h3>
                <Badge variant={selectedSample.tone}>Demo output</Badge>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[var(--foreground-muted)]">
                {selectedSample.points.map((point) => (
                  <li key={point} className="rounded-[var(--radius-sm)] bg-[var(--surface-muted)] p-3">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Section>

        <Section data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">Proof and trust</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                value: "10k+",
                label: "contracts reviewed*",
                Icon: TrendingUp,
              },
              {
                value: "<5 min",
                label: "average first-pass analysis time*",
                Icon: Clock,
              },
              {
                value: "24/7",
                label: "self-serve availability",
                Icon: Zap,
              },
            ].map(({ value, label, Icon }) => (
              <Card key={label} className="text-center">
                <span
                  className="inline-flex text-[var(--foreground-muted)]"
                  aria-hidden
                >
                  <Icon {...iconProps} />
                </span>
                <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                  {value}
                </p>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                  {label}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-[var(--foreground-muted)]">
            * Placeholder metrics. Replace with production analytics values.
          </p>
        </Section>

        <Section id="pricing" background="surface" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">Simple pay-per-use pricing</h2>
            <p className="section-subtitle">
              1 token is about 1,000 characters. Average contract (~20K chars) is
              about 20 tokens.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { name: "Starter", tokens: 20, price: "€2", note: "1 analysis" },
              {
                name: "Pro",
                tokens: 50,
                price: "€4.50",
                note: "2-3 analyses",
                popular: true,
              },
              { name: "Business", tokens: 100, price: "€8", note: "5 analyses" },
              {
                name: "Enterprise",
                tokens: 200,
                price: "€15",
                note: "10 analyses",
              },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={plan.popular ? "border-[var(--primary)]/40 shadow-[var(--shadow-card)] ring-1 ring-[var(--primary)]/10" : ""}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-medium text-[var(--foreground)]">
                    {plan.name}
                  </h3>
                  {plan.popular && <Badge variant="brand">Most popular</Badge>}
                </div>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">{plan.note}</p>
                <p className="mt-4 text-3xl font-bold text-[var(--foreground)]">
                  {plan.price}
                </p>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                  {plan.tokens} tokens
                </p>
                <Link
                  href="/register"
                  className={`${buttonClassName("secondary", "md", true)} mt-5`}
                  data-analytics-event="pricing_cta_click"
                >
                  Choose {plan.name}
                </Link>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="faq" containerSize="sm" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">FAQ</h2>
          </div>
          <dl className="mt-10 space-y-4">
            {[
              {
                q: "Is Contralytic a replacement for legal counsel?",
                a: "No. Contralytic accelerates contract review and issue spotting, but final legal decisions remain your responsibility.",
              },
              {
                q: "How is my contract data handled?",
                a: "Data is processed through encrypted channels and limited to analysis workflows described in our Privacy Policy.",
              },
              {
                q: "Can I analyze in different languages?",
                a: "Yes. You can request analysis language, or keep it auto-detected from the contract.",
              },
              {
                q: "Do tokens expire?",
                a: "No. Token packages are one-time purchases and remain available on your account.",
              },
            ].map((item) => (
              <Card key={item.q}>
                <dt className="text-base font-medium text-[var(--foreground)]">
                  {item.q}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  {item.a}
                </dd>
              </Card>
            ))}
          </dl>
        </Section>

        <Section background="surface" containerSize="sm" data-animate>
          <Card className="text-center shadow-[var(--shadow-premium)]">
            <h2 className="text-2xl font-light tracking-tight text-[var(--foreground)] sm:text-3xl">
              Ready to review your next contract in minutes?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--foreground-muted)]">
              Start with one upload and get a clear action-focused report before
              you sign.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/register"
                className={buttonClassName("primary", "lg")}
                data-analytics-event="final_cta_click"
              >
                Create account
              </Link>
            </div>
          </Card>
        </Section>
      </main>

      <PublicFooter />
    </div>
  );
}
