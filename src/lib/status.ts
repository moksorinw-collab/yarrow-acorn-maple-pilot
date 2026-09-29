import type { Audit, AuditDisposition, Claim, ClaimAction, ClaimStatus } from "./types";

export const STATUS_ORDER: ClaimStatus[] = [
  "verified",
  "partial",
  "unverified",
  "contradicted",
  "fabricated",
];

export const STATUS_LABEL: Record<ClaimStatus, string> = {
  verified: "검증됨",
  partial: "부분 지지",
  unverified: "미확인",
  contradicted: "모순",
  fabricated: "날조",
};

export const ACTION_LABEL: Record<ClaimAction, string> = {
  use: "믿어도 됨",
  recheck: "다시 확인할 것",
  discard: "쓰지 말 것",
};

export const DISPOSITION_LABEL: Record<AuditDisposition, string> = {
  ready: "송부 가능",
  needs_review: "재확인 필요",
  blocked: "송부 금지",
};

export const VERTICAL_LABEL: Record<Audit["vertical"], string> = {
  legal: "법률",
  policy: "내부 정책",
  research: "리서치",
};

export function actionForStatus(status: ClaimStatus): ClaimAction {
  if (status === "verified") return "use";
  if (status === "contradicted" || status === "fabricated") return "discard";
  return "recheck";
}

export function dispositionOf(audit: Audit): AuditDisposition {
  const statuses = audit.claims.map((c) => c.status);
  if (statuses.some((s) => s === "fabricated" || s === "contradicted")) return "blocked";
  if (statuses.some((s) => s === "partial" || s === "unverified")) return "needs_review";
  return "ready";
}

export function mixOf(claims: Claim[]) {
  const total = Math.max(claims.length, 1);
  const count = (s: ClaimStatus) => claims.filter((c) => c.status === s).length;
  return {
    verified: count("verified"),
    recheck: count("partial") + count("unverified"),
    discard: count("contradicted") + count("fabricated"),
    total: claims.length,
    verifiedPct: Math.round((count("verified") / total) * 100),
  };
}

export function sourceOf(audit: Audit, claim: Claim): Audit["sources"][number] | undefined {
  const id = claim.sourceIds[0];
  return audit.sources.find((s) => s.id === id);
}
