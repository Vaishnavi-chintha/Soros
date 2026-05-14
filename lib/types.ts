export type TechCategory =
  | "Frontend Frameworks"
  | "Backend & Runtimes"
  | "Databases (SQL & NoSQL)"
  | "Styling & Design Systems"
  | "Authentication & Identity"
  | "State Management"
  | "API Architecture & Protocols"
  | "ORMs & Database Tooling"
  | "Infrastructure & Deployment"
  | "Testing & Quality Assurance"
  | "Package Managers & Build Tools"
  | "CI/CD & DevOps"
  | "Storage & CDN"
  | "Monitoring, Logging & Observability"
  | "Payment & Subscription Processing"
  | "Security & Encryption"
  | "Real-time Communication"
  | "Headless CMS"
  | "Email & Messaging Services"
  | "Form Handling & Validation"
  | "Analytics & SEO"
  | "Caching & Performance"
  | "Mobile & Cross-Platform Development"
  | "Machine Learning & AI Integration";

/** The two categories that MUST be selected before analyzing */
export const REQUIRED_CATEGORIES: TechCategory[] = [
  "Frontend Frameworks",
  "Backend & Runtimes",
];

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  logo?: string;
}

export interface StackSelection {
  category: TechCategory;
  selected: Technology | null;
}

export interface PairingAnalysis {
  pair: [string, string];
  compatibility: number;
  pros: string[];
  cons: string[];
}

export type CostTier = "free" | "low" | "medium" | "high" | "enterprise";

export interface CostBreakdown {
  technology: string;
  category: TechCategory;
  tier: CostTier;
  estimatedMonthly: string; // e.g. "$0" or "$25–$100"
}

export interface AnalysisResult {
  overallCompatibility: number;
  pairings: PairingAnalysis[];
  verdict: string;
  summary: string;
  recommendations: string[];
  costBreakdown: CostBreakdown[];
  estimatedTotalMonthly: string; // e.g. "$120–$380"
}

export type AnalysisStatus = "idle" | "loading" | "success" | "error";
