import { Link } from "@tanstack/react-router";
import { DispositionBadge } from "./status-badge";
import { TrustBar } from "./trust-bar";
import { dispositionOf, VERTICAL_LABEL } from "@/lib/status";
import type { Audit } from "@/lib/types";

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Seoul",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function AuditRow({ audit }: { audit: Audit }) {
  const disposition = dispositionOf(audit);
  return (
    <Link
      to="/audits/$id"
      params={{ id: audit.id }}
      className="block rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)] md:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted">
            {VERTICAL_LABEL[audit.vertical]} · {audit.model} · {formatWhen(audit.createdAt)}
          </p>
          <h3 className="mt-1 font-display text-lg leading-snug tracking-tight text-balance">
            {audit.title}
          </h3>
        </div>
        <DispositionBadge value={disposition} />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-muted">{audit.channel}</p>
      <div className="mt-4">
        <TrustBar claims={audit.claims} compact />
      </div>
    </Link>
  );
}
