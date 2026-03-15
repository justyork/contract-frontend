import type { LandingContent } from "@/config/landings";

/** B2B / SMB landing: vendor contracts, liability, SLAs. */
export const b2bContent: Partial<LandingContent> = {
  hero: {
    badge: "Spot hidden risks before you sign",
    title: "Review vendor contracts with confidence",
    subtitle:
      "Clealex reads your contract and surfaces liability caps, SLA gaps, and auto-renewal traps — so your team signs knowing exactly what you're agreeing to.",
    ctaPrimary: "Start analyzing",
    ctaSecondary: "See demo report",
  },
  features: {
    sectionTitle: "Built for SMB and procurement teams",
    sectionSubtitle:
      "One workflow, tailored outcomes for operations, legal, and vendor management.",
    items: [
      {
        title: "Procurement",
        description:
          "Catch liability limits, indemnity gaps, and pricing escalation before they impact the business.",
      },
      {
        title: "Legal and compliance",
        description:
          "Get structured first-pass analysis to prioritize manual review and flag non-standard terms.",
      },
      {
        title: "Vendor management",
        description:
          "Compare SLAs, termination rights, and renewal terms across contracts in one place.",
      },
    ],
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
