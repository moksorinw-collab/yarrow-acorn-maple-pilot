import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ActionBadge, StatusBadge } from "@/components/status-badge";
import { dispositionOf } from "@/lib/status";
import { useWarrant } from "@/lib/store";

export const Route = createFileRoute("/queue")({ component: QueuePage });

function QueuePage() {
  const audits = useWarrant((s) => s.audits);
  const items = audits.flatMap((audit) =>
    audit.claims
      .filter((c) => c.action !== "use" || dispositionOf(audit) !== "ready")
      .filter((c) => c.action === "recheck" || c.action === "discard")
      .map((claim) => ({ audit, claim })),
  );

  return (
    <AppShell>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">사람 큐</p>
      <h1 className="mt-2 font-display text-[2rem] leading-tight tracking-tight">
        다시 확인할 주장만
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        자동 분류가 끝난 뒤, 노랑·빨강만 시니어가 봅니다. 항목을 열어 상태를 고치면 감사
        기록이 남습니다.
      </p>
      <p className="mt-4 text-sm tabular-nums text-muted">{items.length}건 대기</p>
      <ul className="mt-4 grid gap-2">
        {items.map(({ audit, claim }) => (
          <li key={`${audit.id}-${claim.id}`}>
            <Link
              to="/audits/$id"
              params={{ id: audit.id }}
              className="block rounded-[var(--radius-lg)] bg-surface px-4 py-4 shadow-[var(--shadow-border)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={claim.status} />
                <ActionBadge action={claim.action} />
                <span className="text-xs text-muted">{audit.title}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{claim.text}</p>
              <p className="mt-1 text-xs text-subtle">{claim.rationale}</p>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
