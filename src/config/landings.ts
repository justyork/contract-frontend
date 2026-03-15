/**
 * Landing variants configuration: source-to-variant mapping and content types.
 * Content for each variant lives in content/landings/<variant>.ts.
 */

import { defaultContent } from "@/content/landings/default";
import { b2bContent } from "@/content/landings/b2b";
import { freelancersContent } from "@/content/landings/freelancers";

/** Hero block: badge, headline, subtitle, primary and secondary CTA labels. */
export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

/** Single feature card: title and description (icon is assigned by layout by index). */
export interface FeatureItem {
  title: string;
  description: string;
}

export interface FeaturesContent {
  sectionTitle: string;
  sectionSubtitle: string;
  items: FeatureItem[];
}

/** Single step in "How it works" (icon assigned by layout by index). */
export interface HowItWorksStep {
  step: string;
}

export interface HowItWorksContent {
  sectionTitle: string;
  steps: HowItWorksStep[];
}

/** Proof/trust block item. */
export interface ProofItem {
  value: string;
  label: string;
}

export interface ProofContent {
  sectionTitle: string;
  items: ProofItem[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

export interface TestimonialsContent {
  sectionTitle: string;
  items: TestimonialItem[];
}

export interface PricingContent {
  sectionTitle: string;
  subtitle: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqContent {
  sectionTitle: string;
  items: FaqItem[];
}

export interface FinalCtaContent {
  title: string;
  subtitle: string;
  ctaText: string;
}

/** Demo report block: contract type, parties, score, risks, perspectives, etc. */
export interface DemoReportContent {
  contractType: string;
  parties: readonly string[];
  score: number;
  risks: string[];
  hiddenClauses: string[];
  compliance: string[];
  legalPerspective: string;
  financialPerspective: string;
  operationalPerspective: string;
  strategicPerspective: string;
  keyPoints: string[];
  termination: string[];
  suggestions: string[];
  negotiation: string[];
}

/** Sample report section headings (optional override per variant). */
export interface SampleReportHeadings {
  sectionTitle: string;
  sectionSubtitle: string;
}

/**
 * Full landing content for one variant. All fields required for default;
 * other variants can omit fields to fall back to default.
 */
export interface LandingContent {
  hero: HeroContent;
  features: FeaturesContent;
  howItWorks: HowItWorksContent;
  sampleReportHeadings: SampleReportHeadings;
  proof: ProofContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  demoReport: DemoReportContent;
}

/** Map from query/UTM value to variant key. Query param landing=xyz and utm_* are looked up here. */
export const SOURCE_TO_VARIANT: Record<string, string> = {
  freelancers: "freelancers",
  b2b: "b2b",
  smb: "b2b",
  "freelancers_2025": "freelancers",
};

export const DEFAULT_VARIANT = "default";

/** If true, persist selected variant in sessionStorage and reuse when returning to / without query. */
export const PERSIST_VARIANT_IN_SESSION = true;

const STORAGE_KEY = "clealex_landing_variant";

export function getStoredVariant(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredVariant(variant: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, variant);
  } catch {
    // ignore
  }
}

/** Registry of variant content. Default is always present; others merged on top. */
const contentByVariant: Record<string, Partial<LandingContent>> = {
  [DEFAULT_VARIANT]: defaultContent,
  freelancers: freelancersContent,
  b2b: b2bContent,
};

/** Register optional variant content (e.g. freelancers, b2b). Called from content modules or here. */
export function registerVariantContent(
  variant: string,
  content: Partial<LandingContent>
): void {
  contentByVariant[variant] = content;
}

/**
 * Returns merged landing content for the given variant. Unknown variants fall back to default.
 */
export function getLandingContent(variant: string): LandingContent {
  const base = defaultContent as LandingContent;
  const overrides = contentByVariant[variant];
  if (!overrides || variant === DEFAULT_VARIANT) {
    return base;
  }
  return deepMergeLandingContent(base, overrides);
}

function deepMergeLandingContent(
  base: LandingContent,
  overrides: Partial<LandingContent>
): LandingContent {
  const result = { ...base };
  for (const key of Object.keys(overrides) as (keyof LandingContent)[]) {
    const ov = overrides[key];
    if (ov === undefined) continue;
    const baseVal = base[key];
    if (baseVal !== null && typeof baseVal === "object" && !Array.isArray(baseVal)) {
      (result as Record<string, unknown>)[key] = {
        ...baseVal,
        ...(ov as object),
      };
    } else {
      (result as Record<string, unknown>)[key] = ov;
    }
  }
  return result;
}
