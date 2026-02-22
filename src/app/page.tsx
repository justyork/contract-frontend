"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  Building2,
  Clock,
  DollarSign,
  EyeOff,
  FileCheck,
  FileText,
  Handshake,
  Languages,
  Lightbulb,
  List,
  Scale,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Target,
  TrendingUp,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import { HomeHeaderNav } from "@/components/HomeHeaderNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Badge } from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  Accordion,
  AnalysisSection,
  QuickSummary,
  ScoreCard,
  SectionGroup,
} from "@/components/contract-analysis";
import { usePreferredCurrency, currencySymbol } from "@/hooks/usePreferredCurrency";
import { api } from "@/lib/api";
import type { TokenPackage } from "@/types/api";

const iconProps = { size: 24, strokeWidth: 1.5 };

/** Demo report data: same structure as real analysis result. */
const DEMO_SCORE = 4;
const DEMO_CONTRACT_TYPE = "Master Services Agreement";
const DEMO_PARTIES = ["Provider", "Client"] as const;

const DEMO_RISKS = [
  "The Provider can unilaterally modify services and pricing, creating potential financial unpredictability for the Client.",
  "The Client is bound to pay for the entire Subscription Term even if they terminate early, which could lead to financial loss.",
  "Automatic renewal clauses may result in unintended financial obligations if the Client fails to terminate in time.",
  "The Provider has extensive rights to use Client Data, including for AI training, which may raise privacy concerns.",
  "The Provider's liability is significantly limited, potentially leaving the Client without recourse for damages.",
];

const DEMO_HIDDEN_CLAUSES = [
  "The Provider's right to modify the agreement unilaterally (Section 11) without explicit consent from the Client.",
  "Automatic activation of premium features based on usage thresholds (Section 2.3) without explicit consent.",
  "The perpetual and irrevocable license granted to the Provider to use Client Data (Section 7.1).",
  "The automatic renewal clause (Section 6.1) which may not be obvious to the Client.",
];

const DEMO_COMPLIANCE = [
  "Potential GDPR compliance risks due to extensive data usage rights granted to the Provider.",
  "Cross-border data transfer without explicit consent may violate data protection regulations.",
  "Perpetual data usage rights: contract grants ongoing or irreversible rights to use/retain user data.",
];

const DEMO_LEGAL_PERSPECTIVE =
  "The contract heavily favors the Provider, allowing unilateral modifications and limiting liability, which could lead to enforceability issues if challenged.";

const DEMO_FINANCIAL_PERSPECTIVE =
  "The contract creates hidden financial obligations through automatic renewals and usage-based charges, which could lead to unexpected costs for the Client.";

const DEMO_OPERATIONAL_PERSPECTIVE =
  "The Client may face operational challenges due to potential service modifications and the need to monitor usage to avoid automatic feature activations.";

const DEMO_STRATEGIC_PERSPECTIVE =
  "The agreement's terms may limit the Client's strategic flexibility, particularly due to data usage rights and automatic renewals.";

const DEMO_KEY_POINTS = [
  "The Provider offers an AI document analysis platform on a subscription basis.",
  "The Client is financially liable for the full initial Subscription Term even if terminated early.",
  "The Provider can modify services and pricing at its sole discretion.",
  "Client Data can be used by the Provider for various purposes including AI training.",
  "The agreement automatically renews unless terminated 30 days prior to renewal.",
];

const DEMO_TERMINATION = [
  "The Client can terminate for convenience with written notice but remains liable for the full Subscription Term.",
  "The agreement automatically renews unless terminated 30 days prior to renewal.",
];

const DEMO_SUGGESTIONS = [
  "Negotiate for a more balanced termination clause that does not financially penalize the Client for early termination.",
  "Request explicit consent for any service modifications or pricing changes.",
  "Ensure that automatic renewal terms are clearly communicated and require explicit consent.",
  "Limit the Provider's rights to use Client Data, especially for AI training, to protect privacy and data ownership.",
  "Seek to increase the Provider's liability cap to ensure adequate recourse in case of service failures.",
];

const DEMO_NEGOTIATION = [
  "Negotiate termination terms to avoid financial penalties.",
  "Limit the Provider's unilateral rights to modify services and pricing.",
  "Clarify and restrict data usage rights to ensure compliance with data protection laws.",
];

type DemoReportTab = "risks" | "perspectives" | "details";

const DEMO_TABS: Array<{ id: DemoReportTab; label: string }> = [
  { id: "risks", label: "Risks & Issues" },
  { id: "perspectives", label: "Analysis Perspectives" },
  { id: "details", label: "Contract Details" },
];

export default function Home() {
  const [demoTab, setDemoTab] = useState<DemoReportTab>("risks");
  const { currency, setCurrency } = usePreferredCurrency();
  const [packages, setPackages] = useState<TokenPackage[]>([]);

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

  useEffect(() => {
    api
      .get<TokenPackage[]>(`/tokens/packages?currency=${currency}`)
      .then((data) => {
        setPackages(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setPackages([]);
      });
  }, [currency]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md">
        <Container size="lg" className="flex h-16 items-center justify-between">
          <span className="text-xl font-semibold tracking-tight text-[var(--foreground)]">Clealex</span>
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
              Clealex reviews your contract in minutes and highlights hidden
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
          <div className="mx-auto mt-10 max-w-4xl space-y-6">
            <div className="flex items-center justify-between gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2">
              <span className="text-sm font-medium text-[var(--foreground-muted)]">
                Demo report
              </span>
              <Badge variant="neutral">Sample only</Badge>
            </div>

            <ScoreCard score={DEMO_SCORE} />

            <QuickSummary
              contractType={DEMO_CONTRACT_TYPE}
              parties={[...DEMO_PARTIES]}
            />

            <div
              className="inline-flex rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-muted)] p-1"
              role="tablist"
              aria-label="Demo report sections"
            >
              {DEMO_TABS.map((tab) => {
                const isActive = tab.id === demoTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`demo-panel-${tab.id}`}
                    id={`demo-tab-${tab.id}`}
                    className={`focus-ring rounded-[var(--radius-pill)] px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-[var(--surface)] text-[var(--foreground)] shadow"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    }`}
                    onClick={() => setDemoTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              id={`demo-panel-${demoTab}`}
              role="tabpanel"
              aria-labelledby={`demo-tab-${demoTab}`}
              className="min-h-[200px]"
            >
              {demoTab === "risks" && (
                <SectionGroup
                  id="demo-risks"
                  title="Risks & Issues"
                  icon={<ShieldAlert size={20} />}
                  totalCount={DEMO_RISKS.length + DEMO_HIDDEN_CLAUSES.length + DEMO_COMPLIANCE.length}
                >
                  <Accordion
                    title="Risks"
                    icon={<AlertCircle size={18} className="text-red-600" />}
                    count={DEMO_RISKS.length}
                    variant="danger"
                  >
                    <AnalysisSection items={DEMO_RISKS} />
                  </Accordion>
                  <Accordion
                    title="Hidden Clauses"
                    icon={<EyeOff size={18} className="text-red-600" />}
                    count={DEMO_HIDDEN_CLAUSES.length}
                    variant="danger"
                  >
                    <AnalysisSection items={DEMO_HIDDEN_CLAUSES} />
                  </Accordion>
                  <Accordion
                    title="Compliance Issues"
                    icon={<ShieldCheck size={18} className="text-orange-600" />}
                    count={DEMO_COMPLIANCE.length}
                    variant="warning"
                  >
                    <AnalysisSection items={DEMO_COMPLIANCE} />
                  </Accordion>
                </SectionGroup>
              )}

              {demoTab === "perspectives" && (
                <SectionGroup
                  id="demo-perspectives"
                  title="Analysis Perspectives"
                  icon={<FileText size={20} />}
                  totalCount={4}
                >
                  <Accordion
                    title="Legal Perspective"
                    icon={<Scale size={18} className="text-purple-600" />}
                  >
                    <AnalysisSection text={DEMO_LEGAL_PERSPECTIVE} />
                  </Accordion>
                  <Accordion
                    title="Financial Perspective"
                    icon={<DollarSign size={18} className="text-blue-600" />}
                  >
                    <AnalysisSection text={DEMO_FINANCIAL_PERSPECTIVE} />
                  </Accordion>
                  <Accordion
                    title="Operational Perspective"
                    icon={<Settings size={18} className="text-teal-600" />}
                  >
                    <AnalysisSection text={DEMO_OPERATIONAL_PERSPECTIVE} />
                  </Accordion>
                  <Accordion
                    title="Strategic Perspective"
                    icon={<Target size={18} className="text-indigo-600" />}
                  >
                    <AnalysisSection text={DEMO_STRATEGIC_PERSPECTIVE} />
                  </Accordion>
                </SectionGroup>
              )}

              {demoTab === "details" && (
                <SectionGroup
                  id="demo-details"
                  title="Contract Details"
                  icon={<FileCheck size={20} />}
                  totalCount={
                    DEMO_KEY_POINTS.length +
                    DEMO_TERMINATION.length +
                    DEMO_SUGGESTIONS.length +
                    DEMO_NEGOTIATION.length
                  }
                >
                  <Accordion
                    title="Key Points"
                    icon={<List size={18} className="text-[var(--foreground-muted)]" />}
                    count={DEMO_KEY_POINTS.length}
                  >
                    <AnalysisSection items={DEMO_KEY_POINTS} />
                  </Accordion>
                  <Accordion
                    title="Termination Conditions"
                    icon={<X size={18} className="text-[var(--foreground-muted)]" />}
                    count={DEMO_TERMINATION.length}
                  >
                    <AnalysisSection items={DEMO_TERMINATION} />
                  </Accordion>
                  <Accordion
                    title="Suggestions"
                    icon={<Lightbulb size={18} className="text-amber-600" />}
                    count={DEMO_SUGGESTIONS.length}
                  >
                    <AnalysisSection items={DEMO_SUGGESTIONS} />
                  </Accordion>
                  <Accordion
                    title="Negotiation Priorities"
                    icon={<Handshake size={18} className="text-[var(--foreground-muted)]" />}
                    count={DEMO_NEGOTIATION.length}
                  >
                    <AnalysisSection items={DEMO_NEGOTIATION} />
                  </Accordion>
                </SectionGroup>
              )}
            </div>
          </div>
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
            <div className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-1">
              {(["eur", "usd"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCurrency(option)}
                  className={`focus-ring rounded-[var(--radius-sm)] px-3 py-1.5 text-xs font-medium uppercase ${
                    option === currency
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((plan) => (
              <Card
                key={plan.name}
                className={plan.name === "Pro" ? "border-[var(--primary)]/40 shadow-[var(--shadow-card)] ring-1 ring-[var(--primary)]/10" : ""}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-medium text-[var(--foreground)]">
                    {plan.name}
                  </h3>
                  {plan.name === "Pro" && <Badge variant="brand">Most popular</Badge>}
                </div>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                  {Math.max(1, Math.floor(plan.tokens / 20))} analyses
                </p>
                <p className="mt-4 text-3xl font-bold text-[var(--foreground)]">
                  {currencySymbol(plan.currency)}{plan.price}
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
                q: "Is Clealex a replacement for legal counsel?",
                a: "No. Clealex accelerates contract review and issue spotting, but final legal decisions remain your responsibility.",
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
