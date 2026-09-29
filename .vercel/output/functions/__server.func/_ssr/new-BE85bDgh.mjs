import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as AppShell } from "./router-Bm2DRonz.mjs";
import { t as Button } from "./button-DH6tEwy_.mjs";
import { t as useWarrant } from "./store-DkQfbocC.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-BE85bDgh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var runAudit = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("dbff8caf84cf7755aaf37ff213587720dacb5d45630e3af5c878f57a50f45036"));
var SAMPLES = [
	{
		label: "노동법 메모",
		model: "ChatGPT",
		answer: "현행 근로기준법상 1주 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없고, 연장근로는 당사자 합의 아래 1주 12시간 한도입니다. 특별연장근로는 인가를 받으면 주 64시간까지 가능하며 대판 2024다998877이 이를 확인했습니다."
	},
	{
		label: "최저임금 숫자",
		model: "Gemini",
		answer: "대한민국 2026년 최저임금은 시간급 10,860원입니다. 월 환산액은 주 40시간 기준 약 2,269,740원입니다. 식대는 최저임금 산입범위에서 항상 제외됩니다."
	},
	{
		label: "정책 질문",
		model: "사내 RAG",
		answer: "고객 실명 계약서는 담당 변호사가 메일로 바로 보내도 됩니다. 외부 LLM에 사건 문서를 붙여 넣는 것은 금지되어 있지 않으나 개인정보는 마스킹하는 것이 좋습니다."
	}
];
function NewAudit() {
	const navigate = useNavigate();
	const addAudit = useWarrant((s) => s.addAudit);
	const [model, setModel] = (0, import_react.useState)("ChatGPT");
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [sourceUrls, setSourceUrls] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setPending(true);
		try {
			const result = await runAudit({ data: {
				answer,
				model,
				sourceUrls
			} });
			if (!result.ok) {
				setError(result.error);
				return;
			}
			addAudit(result.audit);
			await navigate({
				to: "/audits/$id",
				params: { id: result.audit.id }
			});
		} catch {
			setError("검증 서버에 연결하지 못했습니다. 잠시 후 다시 시도하세요.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
			children: "새 검증"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mt-2 font-display text-[2rem] leading-tight tracking-tight",
			children: [
				"AI 답변을 붙여 넣고",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"문장 상태를 받습니다"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm leading-relaxed text-muted",
			children: "주장을 분해하고, 출처 URL이 있으면 본문을 가져온 뒤 지지·부분·모순·날조·미확인으로 분류합니다. 검증은 버튼을 눌렀을 때만 실행됩니다."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "sm",
				variant: "secondary",
				onClick: () => {
					setAnswer(sample.answer);
					setModel(sample.model);
				},
				children: ["샘플 · ", sample.label]
			}, sample.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mt-6 max-w-2xl space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-[0.12em] text-subtle",
						children: "모델"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: model,
						onChange: (e) => setModel(e.target.value),
						className: "mt-1 h-11 w-full rounded-[var(--radius-md)] bg-surface px-3 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-accent/40"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-[0.12em] text-subtle",
						children: "AI 답변"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						value: answer,
						onChange: (e) => setAnswer(e.target.value),
						rows: 9,
						placeholder: "검증할 답변을 그대로 붙여 넣으세요.",
						className: "mt-1 w-full resize-y rounded-[var(--radius-lg)] bg-surface px-3.5 py-3 text-sm leading-relaxed shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-accent/40"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-[0.12em] text-subtle",
						children: "대조할 출처 URL (선택)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: sourceUrls,
						onChange: (e) => setSourceUrls(e.target.value),
						rows: 3,
						placeholder: "한 줄에 하나씩. 예: https://www.law.go.kr",
						className: "mt-1 w-full resize-y rounded-[var(--radius-md)] bg-surface px-3.5 py-3 text-sm shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-accent/40"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fabricated",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: pending,
					children: pending ? "주장 분해 중…" : "근거 상태 추적"
				})
			]
		})
	] });
}
//#endregion
export { NewAudit as component };
