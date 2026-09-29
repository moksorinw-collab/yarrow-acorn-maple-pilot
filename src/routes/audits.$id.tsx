import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnswerViewer } from "@/components/answer-viewer";
import { AppShell } from "@/components/app-shell";
import { ClaimPanel } from "@/components/claim-panel";
import { ActionBadge, DispositionBadge, StatusBadge } from "@/components/status-badge";
import { TrustBar } from "@/components/trust-bar";
import { ACTION_LABEL, dispositionOf, VERTICAL_LABEL } from "@/lib/status";
import { useWarrant } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/audits/$id")({ component: AuditPage });

function AuditPage() {
  const { id } = Route.useParams();
  const audit = useWarrant((s) => s.audits.find((a) => a.id === id));
  const overrideClaim = useWarrant((s) => s.overrideClaim);
  const [selectedId, setSelectedId] = useState<string | null>(audit?.claims[0]?.id ?? null);

  const selected = useMemo(
    () => audit?.claims.find((c) => c.id === selectedId) ?? audit?.claims[0],
    [audit, selectedId],
  );

  if (!audit) {
    return (
      <AppShell>
        <p className="text-muted">이 감사를 찾을 수 없습니다.</p>
        <Link to="/" className="mt-3 inline-block text-sm text-accent hover:underline">
          데스크로
        </Link>
      </AppShell>
    );
  }

  const disposition = dispositionOf(audit);
  const believe = audit.claims.filter((c) => c.action === "use");
  const recheck = audit.claims.filter((c) => c.action === "recheck");
  const discard = audit.claims.filter((c) => c.action === "discard");

  return (
    <AppShell>
      <Link
        to="/"
        className="inline-flex h-10 items-center gap-1.5 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        데스크
      </Link>

      <header className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs text-muted">
            {VERTICAL_LABEL[audit.vertical]} · {audit.model} · {audit.channel}
          </p>
          <h1 className="mt-1 font-display text-[1.85rem] leading-tight tracking-tight md:text-[2.1rem]">
            {audit.title}
          </h1>
          {audit.notes ? <p className="mt-2 max-w-2xl text-sm text-muted">{audit.notes}</p> : null}
        </div>
        <DispositionBadge value={disposition} />
      </header>

      <div className="mt-5 max-w-xl">
        <TrustBar claims={audit.claims} />
      </div>

      <section className="mt-6 grid gap-3 md:grid-cols-3">
        <Lane
          title="믿어도 됨"
          items={believe}
          empty="이 답변에서 바로 쓸 문장이 없습니다."
          selectedId={selected?.id ?? null}
          onSelect={setSelectedId}
        />
        <Lane
          title="다시 확인할 것"
          items={recheck}
          empty="재확인 대기 주장이 없습니다."
          selectedId={selected?.id ?? null}
          onSelect={setSelectedId}
        />
        <Lane
          title="쓰지 말 것"
          items={discard}
          empty="폐기할 주장이 없습니다."
          selectedId={selected?.id ?? null}
          onSelect={setSelectedId}
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <div className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)] md:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">원문 · 문장 선택</p>
          <div className="mt-4">
            <AnswerViewer
              answer={audit.originalAnswer}
              claims={audit.claims}
              selectedId={selected?.id ?? null}
              onSelect={setSelectedId}
            />
          </div>
        </div>
        {selected ? (
          <ClaimPanel
            audit={audit}
            claim={selected}
            onOverride={(status) => overrideClaim(audit.id, selected.id, status)}
          />
        ) : null}
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl tracking-tight">모든 주장</h2>
        <ul className="mt-3 grid gap-2">
          {audit.claims.map((claim) => (
            <li key={claim.id}>
              <button
                type="button"
                onClick={() => setSelectedId(claim.id)}
                className={cn(
                  "flex w-full flex-col gap-2 rounded-[var(--radius-lg)] bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)] md:flex-row md:items-center",
                  selected?.id === claim.id && "ring-2 ring-accent/30",
                )}
              >
                <span className="flex items-center gap-2">
                  <StatusBadge status={claim.status} />
                  <ActionBadge action={claim.action} />
                </span>
                <span className="text-sm leading-relaxed md:flex-1">{claim.text}</span>
                <span className="text-xs tabular-nums text-muted">{claim.confidence}%</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}

function Lane({
  title,
  items,
  empty,
  selectedId,
  onSelect,
}: {
  title: string;
  items: { id: string; text: string; action: "use" | "recheck" | "discard" }[];
  empty: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium">{title}</h2>
        <span className="text-xs tabular-nums text-muted">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-subtle">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  "min-h-11 w-full rounded-[var(--radius-sm)] bg-bg px-3 py-2 text-left text-sm leading-relaxed",
                  selectedId === item.id && "ring-2 ring-accent/30",
                )}
              >
                <span className="sr-only">{ACTION_LABEL[item.action]}.</span>
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
