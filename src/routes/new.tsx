import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useWarrant } from "@/lib/store";
import { runAudit } from "@/lib/verify";

export const Route = createFileRoute("/new")({ component: NewAudit });

const SAMPLES = [
  {
    label: "노동법 메모",
    model: "ChatGPT",
    answer:
      "현행 근로기준법상 1주 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없고, 연장근로는 당사자 합의 아래 1주 12시간 한도입니다. 특별연장근로는 인가를 받으면 주 64시간까지 가능하며 대판 2024다998877이 이를 확인했습니다.",
  },
  {
    label: "최저임금 숫자",
    model: "Gemini",
    answer:
      "대한민국 2026년 최저임금은 시간급 10,860원입니다. 월 환산액은 주 40시간 기준 약 2,269,740원입니다. 식대는 최저임금 산입범위에서 항상 제외됩니다.",
  },
  {
    label: "정책 질문",
    model: "사내 RAG",
    answer:
      "고객 실명 계약서는 담당 변호사가 메일로 바로 보내도 됩니다. 외부 LLM에 사건 문서를 붙여 넣는 것은 금지되어 있지 않으나 개인정보는 마스킹하는 것이 좋습니다.",
  },
];

function NewAudit() {
  const navigate = useNavigate();
  const addAudit = useWarrant((s) => s.addAudit);
  const [model, setModel] = useState("ChatGPT");
  const [answer, setAnswer] = useState("");
  const [sourceUrls, setSourceUrls] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const result = await runAudit({ data: { answer, model, sourceUrls } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      addAudit(result.audit);
      await navigate({ to: "/audits/$id", params: { id: result.audit.id } });
    } catch {
      setError("검증 서버에 연결하지 못했습니다. 잠시 후 다시 시도하세요.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AppShell>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">새 검증</p>
      <h1 className="mt-2 font-display text-[2rem] leading-tight tracking-tight">
        AI 답변을 붙여 넣고
        <br />
        문장 상태를 받습니다
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        주장을 분해하고, 출처 URL이 있으면 본문을 가져온 뒤 지지·부분·모순·날조·미확인으로
        분류합니다. 검증은 버튼을 눌렀을 때만 실행됩니다.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {SAMPLES.map((sample) => (
          <Button
            key={sample.label}
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              setAnswer(sample.answer);
              setModel(sample.model);
            }}
          >
            샘플 · {sample.label}
          </Button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-6 max-w-2xl space-y-4">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">모델</span>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 h-11 w-full rounded-[var(--radius-md)] bg-surface px-3 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-accent/40"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">
            AI 답변
          </span>
          <textarea
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={9}
            placeholder="검증할 답변을 그대로 붙여 넣으세요."
            className="mt-1 w-full resize-y rounded-[var(--radius-lg)] bg-surface px-3.5 py-3 text-sm leading-relaxed shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-accent/40"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">
            대조할 출처 URL (선택)
          </span>
          <textarea
            value={sourceUrls}
            onChange={(e) => setSourceUrls(e.target.value)}
            rows={3}
            placeholder="한 줄에 하나씩. 예: https://www.law.go.kr"
            className="mt-1 w-full resize-y rounded-[var(--radius-md)] bg-surface px-3.5 py-3 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-accent/40"
          />
        </label>
        {error ? <p className="text-sm text-fabricated">{error}</p> : null}
        <Button type="submit" disabled={pending}>
          {pending ? "주장 분해 중…" : "근거 상태 추적"}
        </Button>
      </form>
    </AppShell>
  );
}
