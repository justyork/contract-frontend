/** Profile (GET /api/profile) */
export interface Profile {
  id: number;
  name: string;
  email: string;
  tokens: number;
  preferred_currency: "eur" | "usd";
}

/** Token balance (GET /api/tokens/balance) */
export interface TokenBalance {
  success: boolean;
  balance: {
    user_id: number;
    balance: number;
    last_updated: string;
  };
}

/** Token package (from GET /api/tokens/packages) */
export interface TokenPackage {
  id: number;
  name: string;
  description: string | null;
  tokens: number;
  price: string;
  currency: "eur" | "usd";
  savings: string | null;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  active: boolean;
}

/** Supported contract families for analysis request (frontend selector). NOT_LEGAL omitted — not offered as a choice. */
export const CONTRACT_FAMILY_OPTIONS = [
  { value: "auto", label: "Detect document type automatically" },
  { value: "GENERIC_LEGAL", label: "General legal contract (other agreements)" },
  { value: "EMPLOYMENT_RELEASE", label: "Employment, termination or release / waiver" },
  { value: "SAAS_DPA", label: "SaaS agreement or data processing (DPA / GDPR)" },
  { value: "SERVICES_SOW", label: "Services agreement or statement of work (SOW)" },
  { value: "NDA", label: "Non-disclosure agreement (NDA)" },
  { value: "VENDOR_PROCUREMENT", label: "Vendor or procurement / supply agreement" },
  { value: "PURCHASE_SALE", label: "Purchase or sale agreement" },
  { value: "PARTNERSHIP_JV", label: "Partnership or joint venture agreement" },
  { value: "REAL_ESTATE_LEASE", label: "Real estate lease" },
] as const;

export type ContractFamilyValue = (typeof CONTRACT_FAMILY_OPTIONS)[number]["value"];

/** Contract analysis result (from AI) */
export interface ContractAnalysisResult {
  contract_type: string;
  parties: string[];
  key_points: string[];
  risks: string[];
  hidden_clauses: string[];
  suggestions: string[];
  legal_perspective: string;
  financial_perspective: string;
  operational_perspective: string;
  strategic_perspective: string;
  termination_conditions: string[];
  compliance_issues: string[];
  signing_recommendation: number;
  negotiation_priorities: string[];
  // * New fields from v2.0 pipeline
  hidden_obligations: string[];
  hidden_financial_obligations: string[];
  one_sided_clauses: string[];
  risk_severity: 'low' | 'medium' | 'high' | 'critical';
  /** Contract family from classifier (e.g. NOT_LEGAL, SAAS_DPA). Present in API response. */
  contract_family?: string;
  /** Secondary family for hybrid documents. Present in API response. */
  secondary_family?: string | null;
}

/** Contract (GET /api/contracts or /api/contracts/:id) */
export interface Contract {
  id: number;
  user_id: number;
  status: "pending" | "completed" | "failed";
  tokens: number;
  text: string;
  result: ContractAnalysisResult | null;
  created_at: string;
  error_message?: string;
}

/** Analyse response (POST /api/documents/text or upload) — returns immediately with id; analysis runs in background */
export interface AnalyseResponse {
  id: number;
  tokens: number;
}

/** Login response */
export interface LoginResponse {
  token: string;
}

/** Verify token response */
export interface VerifyTokenResponse {
  valid: boolean;
  message?: string;
}

/** Create payment intent response */
export interface CreateIntentResponse {
  redirectUrl: string;
}

/** Payment confirm success response */
export interface PaymentConfirmResponse {
  success: true;
  tokens: number;
  already_processed?: boolean;
}
