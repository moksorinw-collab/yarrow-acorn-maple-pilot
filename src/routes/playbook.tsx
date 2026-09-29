import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/playbook")({ component: Playbook });

const MONTHS = [
  {
    t: "0–2개월 · 파일럿",
    d: "법률 리서치 데스크 하나. ChatGPT/Claude 답변 붙여넣기, 주장 분해, 5상태 라벨, 사람 큐. 고객은 로펌 1곳 또는 기업 법무 1팀.",
  },
  {
    t: "3–5개월 · 게이트",
    d: "슬랙·Outlook ‘보내기 전 검사’. 사내 Wiki/계약 저장소 커넥터. 폐지된 정책 버전 탐지. SOC 2 착수.",
  },
  {
    t: "6–8개월 · 감사 로그",
    d: "누가 어떤 문장을 믿어도 된다고 바꿨는지 불변 로그. 고객사별 근거 코퍼스. API로 기존 RAG 뒤에 장착.",
  },
  {
    t: "9–12개월 · 수직 확장",
    d: "컴플라이언스 정책 큐, 그다음 브랜드 FactCheck. 한국 먼저 닫고 글로벌 로펌 네트워크로 확장. VPC/온프렘은 매터 플랜만.",
  },
];

const PLANS = [
  {
    name: "Desk",
    price: "₩99,000",
    unit: "/석·월",
    points: ["월 200건 감사", "5상태 라벨 + 사람 큐", "붙여넣기·CSV보내기", "법률 코퍼스 템플릿"],
  },
  {
    name: "Chamber",
    price: "₩249,000",
    unit: "/석·월",
    points: ["무제한 감사", "슬랙·메일 게이트", "상태 수정 감사 로그", "SSO, 보존 기간 설정"],
  },
  {
    name: "Matter",
    price: "협의",
    unit: "",
    points: ["VPC / 전용 인스턴스", "사내 RAG 인라인 검증", "법적 홀드·내보내기", "도메인 라벨 커스텀"],
  },
];

export function Playbook() {
  return (
    <AppShell>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">Go-to-market</p>
      <h1 className="mt-2 max-w-2xl font-display text-[2rem] leading-tight tracking-tight">
        첫 수직은 법률.
        <br />
        12개월은 게이트를 파는 시간.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        Warrant는 답변 엔진이 아닙니다. 이미 쓰고 있는 모델 위에 얹는 근거 상태 레이어입니다.
        한국 로펌·기업 법무에서 송부 전 검사를 닫은 뒤, 같은 상태 모델을 정책·브랜드로
        복제합니다.
      </p>

      <section className="mt-8 grid gap-3 md:grid-cols-2">
        {MONTHS.map((row) => (
          <article
            key={row.t}
            className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <h2 className="font-display text-lg tracking-tight">{row.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{row.d}</p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl tracking-tight">과금</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          검증 원가는 인용 한 건에 센트 단위입니다. 좌석 과금이 기본, 대량 감사는 건당으로
          넘어갑니다. ‘진실 보증’이 아니라 ‘이 코퍼스 대비 근거 상태’만 약속합니다.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className="flex flex-col rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <p className="text-xs uppercase tracking-[0.12em] text-subtle">{plan.name}</p>
              <p className="mt-2 font-display text-3xl leading-none">
                {plan.price}
                <span className="ml-1 text-base text-muted">{plan.unit}</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {plan.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-xl tracking-tight">왜 한국 법률이 먼저인가</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          <li>틀린 판례 번호 하나가 의견서를 붕괴시킵니다. 구매 이유가 사고 회피입니다.</li>
          <li>국가법령정보센터처럼 닫힌 코퍼스가 있어 검증 정확도를 측정하기 쉽습니다.</li>
          <li>송부 전 게이트는 기존 ChatGPT 사용을 막지 않고, 그 위에 과금합니다.</li>
          <li>영어권 AEO(Profound)와 안 싸웁니다. 그들은 ‘보이느냐’, 여기는 ‘믿어도 되느냐’.</li>
        </ul>
      </section>
    </AppShell>
  );
}
