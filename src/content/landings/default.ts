import type { LandingContent } from "@/config/landings";

export const defaultContent: LandingContent = {
  hero: {
    badge: "Spot hidden risks before you sign",
    title: "Sign with confidence, not guesswork",
    subtitle:
      "Clealex reads your contract and surfaces hidden traps, one-sided clauses, and negotiation priorities — so you sign knowing exactly what you're agreeing to.",
    ctaPrimary: "Start analyzing",
    ctaSecondary: "See demo report",
  },
  features: {
    sectionTitle: "Built for every contract-heavy team",
    sectionSubtitle:
      "One workflow, tailored outcomes for owners, freelancers, and legal teams.",
    items: [
      {
        title: "SMB owners",
        description:
          "Catch pricing, liability, and renewal traps before they impact cash flow.",
      },
      {
        title: "Freelancers",
        description:
          "Validate scope, payment terms, and ownership clauses before signing.",
      },
      {
        title: "Legal teams",
        description:
          "Get structured first-pass analysis to prioritize manual review faster.",
      },
    ],
  },
  howItWorks: {
    sectionTitle: "How it works",
    steps: [
      { step: "Upload a PDF or paste your contract text." },
      { step: "Run analysis in one click." },
      {
        step: "Review risks, clauses, and signing recommendation.",
      },
    ],
  },
  sampleReportHeadings: {
    sectionTitle: "Live sample analysis",
    sectionSubtitle:
      "Preview how insights are organized before you register.",
  },
  proof: {
    sectionTitle: "Proof and trust",
    items: [
      { value: "Minutes", label: "from upload to full report" },
      { value: "AI + ML", label: "multi-layer analysis pipeline" },
      { value: "24/7", label: "self-serve, no waiting list" },
    ],
  },
  testimonials: {
    sectionTitle: "What users say",
    items: [
      {
        quote:
          "Caught an automatic renewal clause I completely missed. Saved me from a 12-month lock-in.",
        name: "Anna K.",
        role: "Freelance Designer",
      },
      {
        quote:
          "We run 5–10 vendor contracts a month. Clealex cuts our first-pass review time in half.",
        name: "Michael S.",
        role: "Operations Manager, SMB",
      },
      {
        quote:
          "The negotiation priorities section alone justifies the cost. Very actionable output.",
        name: "Laura P.",
        role: "In-house Legal Counsel",
      },
    ],
  },
  pricing: {
    sectionTitle: "Simple pay-per-use pricing",
    subtitle:
      "One analysis costs less than 5 minutes of a lawyer's time. Average contract (~10K characters) uses about 10 tokens. 10 free tokens when you register.",
  },
  faq: {
    sectionTitle: "FAQ",
    items: [
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
      {
        q: "Do I get free tokens?",
        a: "Yes. New accounts receive 10 free tokens (about one contract, ~10K characters) when they register.",
      },
      {
        q: "What if I'm not satisfied with the analysis?",
        a: "Each analysis gives you a full structured report. If the result is unclear or incomplete, contact support — we review edge cases individually.",
      },
      {
        q: "How accurate is the AI analysis?",
        a: "Clealex identifies structural risks and hidden clauses with high recall. It is not a substitute for legal advice, but it gives you a clear starting point and saves significant review time.",
      },
    ],
  },
  finalCta: {
    title: "Ready to review your next contract in minutes?",
    subtitle:
      "Start with one upload and get a clear action-focused report before you sign.",
    ctaText: "Create account",
  },
  demoReport: {
    contractType: "Master Services Agreement",
    parties: ["Provider", "Client"],
    score: 4,
    risks: [
      "The Provider can unilaterally modify services and pricing, creating potential financial unpredictability for the Client.",
      "The Client is bound to pay for the entire Subscription Term even if they terminate early, which could lead to financial loss.",
      "Automatic renewal clauses may result in unintended financial obligations if the Client fails to terminate in time.",
      "The Provider has extensive rights to use Client Data, including for AI training, which may raise privacy concerns.",
      "The Provider's liability is significantly limited, potentially leaving the Client without recourse for damages.",
    ],
    hiddenClauses: [
      "The Provider's right to modify the agreement unilaterally (Section 11) without explicit consent from the Client.",
      "Automatic activation of premium features based on usage thresholds (Section 2.3) without explicit consent.",
      "The perpetual and irrevocable license granted to the Provider to use Client Data (Section 7.1).",
      "The automatic renewal clause (Section 6.1) which may not be obvious to the Client.",
    ],
    compliance: [
      "Potential GDPR compliance risks due to extensive data usage rights granted to the Provider.",
      "Cross-border data transfer without explicit consent may violate data protection regulations.",
      "Perpetual data usage rights: contract grants ongoing or irreversible rights to use/retain user data.",
    ],
    legalPerspective:
      "The contract heavily favors the Provider, allowing unilateral modifications and limiting liability, which could lead to enforceability issues if challenged.",
    financialPerspective:
      "The contract creates hidden financial obligations through automatic renewals and usage-based charges, which could lead to unexpected costs for the Client.",
    operationalPerspective:
      "The Client may face operational challenges due to potential service modifications and the need to monitor usage to avoid automatic feature activations.",
    strategicPerspective:
      "The agreement's terms may limit the Client's strategic flexibility, particularly due to data usage rights and automatic renewals.",
    keyPoints: [
      "The Provider offers an AI document analysis platform on a subscription basis.",
      "The Client is financially liable for the full initial Subscription Term even if terminated early.",
      "The Provider can modify services and pricing at its sole discretion.",
      "Client Data can be used by the Provider for various purposes including AI training.",
      "The agreement automatically renews unless terminated 30 days prior to renewal.",
    ],
    termination: [
      "The Client can terminate for convenience with written notice but remains liable for the full Subscription Term.",
      "The agreement automatically renews unless terminated 30 days prior to renewal.",
    ],
    suggestions: [
      "Negotiate for a more balanced termination clause that does not financially penalize the Client for early termination.",
      "Request explicit consent for any service modifications or pricing changes.",
      "Ensure that automatic renewal terms are clearly communicated and require explicit consent.",
      "Limit the Provider's rights to use Client Data, especially for AI training, to protect privacy and data ownership.",
      "Seek to increase the Provider's liability cap to ensure adequate recourse in case of service failures.",
    ],
    negotiation: [
      "Negotiate termination terms to avoid financial penalties.",
      "Limit the Provider's unilateral rights to modify services and pricing.",
      "Clarify and restrict data usage rights to ensure compliance with data protection laws.",
    ],
  },
};
