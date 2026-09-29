import { ActionBadge, StatusBadge } from "./status-badge";
import { Button } from "./ui/button";
import { sourceOf } from "@/lib/status";
import type { Audit, Claim, ClaimStatus } from "@/lib/types";
import { ExternalLink } from "lucide-react";

const OVERRIDES: { status: ClaimStatus; label: string }[] = [
  { status: "verified", label: "검증됨으로" },
  { status: "partial", label: "부분 지지로" },
  { status: "unverified", label: "미확인으로" },
  { status: "contradicted", label: "모순으로" },
  { status: "fabricated", label: "날조로" },
];

export function ClaimPanel({
  audit,
  claim,
  onOverride,
}: {
  audit: Audit;
  claim: Claim;
  onOverride: (status: ClaimStatus) => void;
}) {
  const source = sourceOf(audit, claim);
  return (
    <article className="flex flex-col gap-4 rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={claim.status} />
        <ActionBadge action={claim.action} />
        <span className="ml-auto text-xs tabular-nums text-muted">
          확신 {claim.confidence}%
          {claim.overridden ? " · 사람 수정" : ""}
        </span>
      </div>
      <p className="text-base leading-relaxed">{claim.text}</p>
      <p className="text-sm leading-relaxed text-muted">{claim.rationale}</p>
      {source ? (
        <div className="rounded-[var(--radius-md)] bg-bg px-3.5 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">출처</p>
          <p className="mt-1 text-sm font-medium">{source.title}</p>
          <p className="text-xs text-muted">
            {source.publisher}
            {source.live ? " · 원문 확인됨" : " · 원문 없음"}
          </p>
          {claim.quote ? (
            <blockquote className="mt-2 border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-fg">
              {claim.quote}
            </blockquote>
          ) : null}
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex h-10 items-center gap-1.5 text-sm text-accent hover:underline"
            >
              원문 열기
              <ExternalLink className="size-3.5" />
            </a>
          ) : null}
        </div>
      ) : (
        <div className="rounded-[var(--radius-md)] bg-bg px-3.5 py-3 text-sm text-muted">
          이 주장에 연결된 출처가 없습니다.
        </div>
      )}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-subtle">
          검토자가 상태 수정
        </p>
        <div className="flex flex-wrap gap-2">
          {OVERRIDES.map((opt) => (
            <Button
              key={opt.status}
              type="button"
              size="sm"
              variant={claim.status === opt.status ? "primary" : "secondary"}
              onClick={() => onOverride(opt.status)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}
