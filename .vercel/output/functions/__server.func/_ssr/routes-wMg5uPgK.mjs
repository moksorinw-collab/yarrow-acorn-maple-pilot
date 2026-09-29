import { i as VERTICAL_LABEL, o as dispositionOf, s as mixOf } from "./status-DXgq6v-7.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as AppShell } from "./router-Bm2DRonz.mjs";
import { n as DispositionBadge } from "./status-badge-BvI3QdpG.mjs";
import { t as Button } from "./button-DH6tEwy_.mjs";
import { t as TrustBar } from "./trust-bar-DWgcwqHk.mjs";
import { t as useWarrant } from "./store-DkQfbocC.mjs";
import { i as ResponsiveContainer, n as Pie, r as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-wMg5uPgK.js
var import_jsx_runtime = require_jsx_runtime();
function formatWhen(iso) {
	try {
		return new Intl.DateTimeFormat("ko-KR", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			timeZone: "Asia/Seoul"
		}).format(new Date(iso));
	} catch {
		return iso;
	}
}
function AuditRow({ audit }) {
	const disposition = dispositionOf(audit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/audits/$id",
		params: { id: audit.id },
		className: "block rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)] md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						VERTICAL_LABEL[audit.vertical],
						" · ",
						audit.model,
						" · ",
						formatWhen(audit.createdAt)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-lg leading-snug tracking-tight text-balance",
					children: audit.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DispositionBadge, { value: disposition })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 line-clamp-2 text-sm text-muted",
				children: audit.channel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBar, {
					claims: audit.claims,
					compact: true
				})
			})
		]
	});
}
function Home() {
	const audits = useWarrant((s) => s.audits);
	const claims = audits.flatMap((a) => a.claims);
	const mix = mixOf(claims);
	const blocked = audits.filter((a) => dispositionOf(a) === "blocked").length;
	const review = audits.filter((a) => dispositionOf(a) === "needs_review").length;
	const ready = audits.filter((a) => dispositionOf(a) === "ready").length;
	const chart = [
		{
			name: "믿어도 됨",
			value: mix.verified,
			color: "var(--color-verified)"
		},
		{
			name: "다시 확인할 것",
			value: mix.recheck,
			color: "var(--color-partial)"
		},
		{
			name: "쓰지 말 것",
			value: mix.discard,
			color: "var(--color-fabricated)"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
					children: "증거 상태 데스크"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-display text-[2rem] leading-[1.15] tracking-tight md:text-[2.35rem]",
					children: [
						"무엇을 믿고,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"무엇을 다시 확인할지"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm leading-relaxed text-muted",
					children: "AI가 붙인 인용이 아니라, 문장 단위 근거 상태입니다. 데모 워크스페이스에는 법률 메모, 내부 정책, 상대 로펌 브리프가 이미 올라가 있습니다."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/new",
					children: "답변 검증하기"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "송부 가능",
					value: ready,
					hint: "모든 주장이 검증됨"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "재확인 대기",
					value: review,
					hint: "부분 지지 또는 미확인"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "송부 금지",
					value: blocked,
					hint: "모순 또는 날조 포함"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_18rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: "이번 큐의 신뢰 구성"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"주장 ",
							mix.total,
							"개 중 ",
							mix.verified,
							"개는 사용, ",
							mix.recheck,
							"개는 재확인, ",
							mix.discard,
							"개는 폐기."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixCard, {
								tone: "verified",
								label: "믿어도 됨",
								value: mix.verified
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixCard, {
								tone: "partial",
								label: "다시 확인할 것",
								value: mix.recheck
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixCard, {
								tone: "fabricated",
								label: "쓰지 말 것",
								value: mix.discard
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-40 w-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: chart,
								dataKey: "value",
								innerRadius: 48,
								outerRadius: 70,
								stroke: "none",
								paddingAngle: 2,
								children: chart.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.color }, entry.name))
							}) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-display text-2xl tabular-nums leading-none",
						children: [mix.verifiedPct, "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "검증되어 사용 가능한 비율"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl tracking-tight",
					children: "최근 감사"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/queue",
					className: "text-sm text-accent hover:underline",
					children: "재확인만 보기"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3",
				children: audits.map((audit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditRow, { audit }, audit.id))
			})]
		})
	] });
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl tabular-nums leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-subtle",
				children: hint
			})
		]
	});
}
function MixCard({ tone, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] bg-bg px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `text-xs ${tone === "verified" ? "text-verified" : tone === "partial" ? "text-partial" : "text-fabricated"}`,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl tabular-nums leading-none",
			children: value
		})]
	});
}
//#endregion
export { Home as component };
