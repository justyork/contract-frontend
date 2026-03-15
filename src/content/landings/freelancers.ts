import type { LandingContent } from "@/config/landings";

/** Freelancer-focused landing: gig contracts, payment terms, IP. */
export const freelancersContent: Partial<LandingContent> = {
  hero: {
    badge: "Spot hidden risks before you sign",
    title: "Sign freelance contracts with confidence",
    subtitle:
      "Clealex reads your contract and surfaces payment traps, scope creep, and IP clauses — so you know exactly what you're agreeing to before you sign.",
    ctaPrimary: "Start analyzing",
    ctaSecondary: "See demo report",
  },
  features: {
    sectionTitle: "Built for freelancers and contractors",
    sectionSubtitle:
      "One workflow, tailored outcomes for designers, developers, and consultants.",
    items: [
      {
        title: "Payment terms",
        description:
          "Spot late payment penalties, milestone traps, and net-60+ terms before they impact cash flow.",
      },
      {
        title: "Scope and revisions",
        description:
          "Validate scope boundaries, revision rounds, and change-order clauses before signing.",
      },
      {
        title: "IP and ownership",
        description:
          "See who keeps rights to your work and whether the client can use it beyond the project.",
      },
    ],
  },
  demoReport: {
    contractType: "Freelance Agreement",
    parties: ["Client", "Contractor"],
    score: 4,
    risks: [
      "Payment is due 45 days after invoice, which may strain cash flow for the Contractor.",
      "Unlimited revision rounds are included without clear scope, risking scope creep.",
      "The Client retains broad license to use deliverables in perpetuity without additional compensation.",
      "Termination for convenience leaves the Contractor liable for unreimbursed expenses.",
      "Liability cap is low relative to contract value, limiting recourse for the Contractor.",
    ],
    hiddenClauses: [
      "The Client may assign the agreement without consent (Section 8), potentially changing who the Contractor works with.",
      "Work-for-hire language (Section 5) transfers all IP to the Client, including pre-existing components unless listed.",
      "Non-compete clause (Section 9) restricts the Contractor from similar work for 12 months.",
    ],
    compliance: [
      "Contract may conflict with local freelancer protection laws regarding payment timing.",
      "IP assignment without explicit exclusions may affect Contractor's portfolio rights.",
    ],
    legalPerspective:
      "The agreement favors the Client on IP and payment timing. Key risks are scope creep and limited recourse under the liability cap.",
    financialPerspective:
      "Late payment terms and broad deliverables without clear milestones could delay or reduce expected income.",
    operationalPerspective:
      "Unlimited revisions and vague scope may lead to rework and disputes; clarify revision rounds and out-of-scope rates.",
    strategicPerspective:
      "Non-compete and broad IP assignment may limit the Contractor's ability to reuse work or take similar gigs.",
    keyPoints: [
      "Fixed fee for defined deliverables with payment 45 days after invoice.",
      "Unlimited revisions during the review period; additional work is out of scope.",
      "Work-for-hire: all deliverables and IP transfer to the Client upon payment.",
      "Either party may terminate with 14 days notice; Contractor keeps fees for work completed.",
      "Contractor may not work for competing clients for 12 months after the project.",
    ],
    termination: [
      "Either party may terminate with 14 days written notice.",
      "Contractor remains entitled to fees for work completed and approved; no refund of advance.",
    ],
    suggestions: [
      "Negotiate payment to 30 days or add late payment interest.",
      "Cap revision rounds (e.g. 2) and define out-of-scope rates.",
      "Carve out pre-existing IP and portfolio use from the work-for-hire clause.",
      "Narrow or remove the non-compete, or limit its duration and scope.",
    ],
    negotiation: [
      "Shorten payment terms to 30 days.",
      "Cap revisions and define change-order process.",
      "Reserve portfolio and pre-existing IP rights.",
    ],
  },
};
