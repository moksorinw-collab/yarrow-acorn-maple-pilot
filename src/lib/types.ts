export type ClaimStatus =
  | "verified"
  | "partial"
  | "unverified"
  | "contradicted"
  | "fabricated";

export type ClaimAction = "use" | "recheck" | "discard";

export type AuditDisposition = "ready" | "needs_review" | "blocked";

export type AuditVertical = "legal" | "policy" | "research";

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  excerpt: string;
  live: boolean;
};

export type Claim = {
  id: string;
  text: string;
  /** Exact substring of the original answer, used for highlighting. */
  anchor: string;
  status: ClaimStatus;
  confidence: number;
  action: ClaimAction;
  sourceIds: string[];
  quote?: string;
  rationale: string;
  overridden?: boolean;
};

export type Audit = {
  id: string;
  title: string;
  model: string;
  channel: string;
  createdAt: string;
  owner: string;
  vertical: AuditVertical;
  originalAnswer: string;
  claims: Claim[];
  sources: Source[];
  notes?: string;
};
