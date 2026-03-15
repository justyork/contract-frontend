"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
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
import { getLandingContent } from "@/config/landings";
import type { LandingContent } from "@/config/landings";
import { useLandingVariant } from "@/hooks/useLandingVariant";
import { usePreferredCurrency, currencySymbol } from "@/hooks/usePreferredCurrency";
import { api } from "@/lib/api";
import type { TokenPackage } from "@/types/api";

const iconProps = { size: 24, strokeWidth: 1.5 };

const FEATURE_ICONS = [Building2, User, Scale] as const;
const HOW_IT_WORKS_ICONS = [Upload, Languages, FileCheck] as const;
const PROOF_ICONS = [Clock, TrendingUp, Zap] as const;

type DemoReportTab = "risks" | "perspectives" | "details";

const DEMO_TABS: Array<{ id: DemoReportTab; label: string }> = [
  { id: "risks", label: "Risks & Issues" },
  { id: "perspectives", label: "Analysis Perspectives" },
  { id: "details", label: "Contract Details" },
];

function HomeBody({ content }: { content: LandingContent }) {
  const [demoTab, setDemoTab] = useState<DemoReportTab>("risks");
  const { currency, setCurrency } = usePreferredCurrency();
  const [packages, setPackages] = useState<TokenPackage[]>([]);
  const demo = content.demoReport;

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
            <Badge variant="brand">{content.hero.badge}</Badge>
            <h1 className="mt-6 font-light text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
              {content.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--foreground-muted)]">
              {content.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className={buttonClassName("primary", "lg")}
                data-analytics-event="hero_cta_click"
              >
                {content.hero.ctaPrimary}
              </Link>
              <Link
                href="#sample-report"
                className={buttonClassName("secondary", "lg")}
                data-analytics-event="hero_demo_click"
              >
                {content.hero.ctaSecondary}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--foreground-muted)]">
              <Badge>Encrypted processing</Badge>
              <Badge>GDPR-ready</Badge>
              <Badge>No subscription required</Badge>
            </div>
          </div>
        </Section>

        <Section id="features" background="surface" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">{content.features.sectionTitle}</h2>
            <p className="section-subtitle">
              {content.features.sectionSubtitle}
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {content.features.items.map((item, index) => {
              const Icon = FEATURE_ICONS[index] ?? Building2;
              return (
                <Card key={item.title}>
                  <span
                    className="inline-flex text-[var(--foreground-muted)]"
                    aria-hidden
                  >
                    <Icon {...iconProps} />
                  </span>
                  <h3 className="mt-3 text-lg font-medium text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Section>

        <Section data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">{content.howItWorks.sectionTitle}</h2>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {content.howItWorks.steps.map((item, index) => {
              const Icon = HOW_IT_WORKS_ICONS[index] ?? Upload;
              return (
                <Card key={item.step} className="flex items-start gap-4">
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
                    {item.step}
                  </span>
                </Card>
              );
            })}
          </ol>
        </Section>

        <Section id="sample-report" background="surface" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">{content.sampleReportHeadings.sectionTitle}</h2>
            <p className="section-subtitle">
              {content.sampleReportHeadings.sectionSubtitle}
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl space-y-6">
            <div className="flex items-center justify-between gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2">
              <span className="text-sm font-medium text-[var(--foreground-muted)]">
                Demo report
              </span>
              <Badge variant="neutral">Sample only</Badge>
            </div>

            <ScoreCard score={demo.score} />

            <QuickSummary
              contractType={demo.contractType}
              parties={[...demo.parties]}
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
                  totalCount={demo.risks.length + demo.hiddenClauses.length + demo.compliance.length}
                >
                  <Accordion
                    title="Risks"
                    icon={<AlertCircle size={18} className="text-red-600" />}
                    count={demo.risks.length}
                    variant="danger"
                  >
                    <AnalysisSection items={demo.risks} />
                  </Accordion>
                  <Accordion
                    title="Hidden Clauses"
                    icon={<EyeOff size={18} className="text-red-600" />}
                    count={demo.hiddenClauses.length}
                    variant="danger"
                  >
                    <AnalysisSection items={demo.hiddenClauses} />
                  </Accordion>
                  <Accordion
                    title="Compliance Issues"
                    icon={<ShieldCheck size={18} className="text-orange-600" />}
                    count={demo.compliance.length}
                    variant="warning"
                  >
                    <AnalysisSection items={demo.compliance} />
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
                    <AnalysisSection text={demo.legalPerspective} />
                  </Accordion>
                  <Accordion
                    title="Financial Perspective"
                    icon={<DollarSign size={18} className="text-blue-600" />}
                  >
                    <AnalysisSection text={demo.financialPerspective} />
                  </Accordion>
                  <Accordion
                    title="Operational Perspective"
                    icon={<Settings size={18} className="text-teal-600" />}
                  >
                    <AnalysisSection text={demo.operationalPerspective} />
                  </Accordion>
                  <Accordion
                    title="Strategic Perspective"
                    icon={<Target size={18} className="text-indigo-600" />}
                  >
                    <AnalysisSection text={demo.strategicPerspective} />
                  </Accordion>
                </SectionGroup>
              )}

              {demoTab === "details" && (
                <SectionGroup
                  id="demo-details"
                  title="Contract Details"
                  icon={<FileCheck size={20} />}
                  totalCount={
                    demo.keyPoints.length +
                    demo.termination.length +
                    demo.suggestions.length +
                    demo.negotiation.length
                  }
                >
                  <Accordion
                    title="Key Points"
                    icon={<List size={18} className="text-[var(--foreground-muted)]" />}
                    count={demo.keyPoints.length}
                  >
                    <AnalysisSection items={demo.keyPoints} />
                  </Accordion>
                  <Accordion
                    title="Termination Conditions"
                    icon={<X size={18} className="text-[var(--foreground-muted)]" />}
                    count={demo.termination.length}
                  >
                    <AnalysisSection items={demo.termination} />
                  </Accordion>
                  <Accordion
                    title="Suggestions"
                    icon={<Lightbulb size={18} className="text-amber-600" />}
                    count={demo.suggestions.length}
                  >
                    <AnalysisSection items={demo.suggestions} />
                  </Accordion>
                  <Accordion
                    title="Negotiation Priorities"
                    icon={<Handshake size={18} className="text-[var(--foreground-muted)]" />}
                    count={demo.negotiation.length}
                  >
                    <AnalysisSection items={demo.negotiation} />
                  </Accordion>
                </SectionGroup>
              )}
            </div>
          </div>
        </Section>

        <Section data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">{content.proof.sectionTitle}</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {content.proof.items.map((item, index) => {
              const Icon = PROOF_ICONS[index] ?? Clock;
              return (
                <Card key={item.label} className="text-center">
                  <span
                    className="inline-flex text-[var(--foreground-muted)]"
                    aria-hidden
                  >
                    <Icon {...iconProps} />
                  </span>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                    {item.label}
                  </p>
                </Card>
              );
            })}
          </div>
        </Section>

        <Section background="surface" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">{content.testimonials.sectionTitle}</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {content.testimonials.items.map(({ quote, name, role }) => (
              <Card key={name}>
                <p className="text-sm leading-relaxed text-[var(--foreground-muted)] italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-[var(--foreground)]">{name}</p>
                  <p className="text-xs text-[var(--foreground-muted)]">{role}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="pricing" background="surface" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">{content.pricing.sectionTitle}</h2>
            <p className="section-subtitle">
              {content.pricing.subtitle}
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
                  {Math.max(1, Math.floor(plan.tokens / 10))} analyses
                </p>
                <p className="mt-4 text-3xl font-bold text-[var(--foreground)]">
                  {currencySymbol(plan.currency)}{plan.price}
                </p>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                  {plan.tokens} tokens
                </p>
                {plan.description && (
                  <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                    {plan.description}
                  </p>
                )}
                {plan.savings && (
                  <span className="mt-2 inline-block">
                    <Badge variant="success">Save {plan.savings}</Badge>
                  </span>
                )}
                <Link
                  href="/register"
                  className={`${buttonClassName("secondary", "md", true)} mt-5`}
                  data-analytics-event="pricing_cta_click"
                >
                  Get started with {plan.name}
                </Link>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="faq" containerSize="sm" data-animate>
          <div className="text-center">
            <h2 className="section-title font-light">{content.faq.sectionTitle}</h2>
          </div>
          <dl className="mt-10 space-y-4">
            {content.faq.items.map((item) => (
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
              {content.finalCta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--foreground-muted)]">
              {content.finalCta.subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/register"
                className={buttonClassName("primary", "lg")}
                data-analytics-event="final_cta_click"
              >
                {content.finalCta.ctaText}
              </Link>
            </div>
          </Card>
        </Section>
      </main>

      <PublicFooter />
    </div>
  );
}

function HomeWithVariantFromQuery() {
  const { content } = useLandingVariant();
  return <HomeBody content={content} />;
}

function HomeWithDefaultContent() {
  const content = getLandingContent("default");
  return <HomeBody content={content} />;
}

export default function Home() {
  return (
    <Suspense fallback={<HomeWithDefaultContent />}>
      <HomeWithVariantFromQuery />
    </Suspense>
  );
}
