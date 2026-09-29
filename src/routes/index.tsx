import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { AuditRow } from "@/components/audit-row";
import { Button } from "@/components/ui/button";
import { dispositionOf, mixOf } from "@/lib/status";
import { useWarrant } from "@/lib/store";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const audits = useWarrant((s) => s.audits);
  const claims = audits.flatMap((a) => a.claims);
  const mix = mixOf(claims);
  const blocked = audits.filter((a) => dispositionOf(a) === "blocked").length;
  const review = audits.filter((a) => dispositionOf(a) === "needs_review").length;
  const ready = audits.filter((a) => dispositionOf(a) === "ready").length;

  const chart = [
    { name: "믿어도 됨", value: mix.verified, color: "var(--color-verified)" },
    { name: "다시 확인할 것", value: mix.recheck, color: "var(--color-partial)" },
    { name: "쓰지 말 것", value: mix.discard, color: "var(--color-fabricated)" },
  ];

  return (
    <AppShell>
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">
            증거 상태 데스크
          </p>
          <h1 className="mt-2 font-display text-[2rem] leading-[1.15] tracking-tight md:text-[2.35rem]">
            무엇을 믿고,
            <br />
            무엇을 다시 확인할지
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            AI가 붙인 인용이 아니라, 문장 단위 근거 상태입니다. 데모 워크스페이스에는 법률 메모,
            내부 정책, 상대 로펌 브리프가 이미 올라가 있습니다.
          </p>
        </div>
        <Button asChild>
          <Link to="/new">답변 검증하기</Link>
        </Button>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="송부 가능" value={ready} hint="모든 주장이 검증됨" />
        <Stat label="재확인 대기" value={review} hint="부분 지지 또는 미확인" />
        <Stat label="송부 금지" value={blocked} hint="모순 또는 날조 포함" />
      </section>

      <section className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-xl tracking-tight">이번 큐의 신뢰 구성</h2>
          <p className="mt-1 text-sm text-muted">
            주장 {mix.total}개 중 {mix.verified}개는 사용, {mix.recheck}개는 재확인, {mix.discard}개는
            폐기.
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <MixCard tone="verified" label="믿어도 됨" value={mix.verified} />
            <MixCard tone="partial" label="다시 확인할 것" value={mix.recheck} />
            <MixCard tone="fabricated" label="쓰지 말 것" value={mix.discard} />
          </dl>
        </div>
        <div className="flex flex-col items-center justify-center rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
          <div className="h-40 w-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chart}
                  dataKey="value"
                  innerRadius={48}
                  outerRadius={70}
                  stroke="none"
                  paddingAngle={2}
                >
                  {chart.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 font-display text-2xl tabular-nums leading-none">{mix.verifiedPct}%</p>
          <p className="mt-1 text-xs text-muted">검증되어 사용 가능한 비율</p>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl tracking-tight">최근 감사</h2>
          <Link to="/queue" className="text-sm text-accent hover:underline">
            재확인만 보기
          </Link>
        </div>
        <div className="mt-4 grid gap-3">
          {audits.map((audit) => (
            <AuditRow key={audit.id} audit={audit} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums leading-none">{value}</p>
      <p className="mt-2 text-xs text-subtle">{hint}</p>
    </div>
  );
}

function MixCard({
  tone,
  label,
  value,
}: {
  tone: "verified" | "partial" | "fabricated";
  label: string;
  value: number;
}) {
  const color =
    tone === "verified" ? "text-verified" : tone === "partial" ? "text-partial" : "text-fabricated";
  return (
    <div className="rounded-[var(--radius-md)] bg-bg px-3 py-3">
      <p className={`text-xs ${color}`}>{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums leading-none">{value}</p>
    </div>
  );
}
