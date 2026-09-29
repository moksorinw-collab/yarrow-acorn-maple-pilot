import { i as __toESM } from "../_runtime.mjs";
import { c as sourceOf, i as VERTICAL_LABEL, o as dispositionOf, t as ACTION_LABEL } from "./status-DXgq6v-7.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ExternalLink, s as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as cn, n as Route, r as AppShell } from "./router-Bm2DRonz.mjs";
import { n as DispositionBadge, r as StatusBadge, t as ActionBadge } from "./status-badge-BvI3QdpG.mjs";
import { t as Button } from "./button-DH6tEwy_.mjs";
import { t as TrustBar } from "./trust-bar-DWgcwqHk.mjs";
import { t as useWarrant } from "./store-DkQfbocC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audits._id-3d6nYcAx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function segmentAnswer(answer, claims) {
	const hits = [];
	for (const claim of claims) {
		const needle = claim.anchor || claim.text;
		if (!needle) continue;
		const start = answer.indexOf(needle);
		if (start < 0) continue;
		hits.push({
			start,
			end: start + needle.length,
			claim
		});
	}
	hits.sort((a, b) => a.start - b.start || b.end - a.end - (a.end - a.start));
	const picked = [];
	let cursor = 0;
	for (const hit of hits) {
		if (hit.start < cursor) continue;
		picked.push(hit);
		cursor = hit.end;
	}
	const segments = [];
	let i = 0;
	for (const hit of picked) {
		if (hit.start > i) segments.push({ text: answer.slice(i, hit.start) });
		segments.push({
			text: answer.slice(hit.start, hit.end),
			claimId: hit.claim.id,
			status: hit.claim.status
		});
		i = hit.end;
	}
	if (i < answer.length) segments.push({ text: answer.slice(i) });
	return segments;
}
var MARK = {
	verified: "bg-verified/18 decoration-verified",
	partial: "bg-partial/18 decoration-partial",
	unverified: "bg-unverified/18 decoration-unverified",
	contradicted: "bg-contradicted/18 decoration-contradicted",
	fabricated: "bg-fabricated/18 decoration-fabricated"
};
function AnswerViewer({ answer, claims, selectedId, onSelect }) {
	const segments = segmentAnswer(answer, claims);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "font-display text-[1.05rem] leading-[1.7] text-pretty text-fg",
		children: segments.map((seg, i) => seg.claimId && seg.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onSelect(seg.claimId),
			className: cn("rounded-[4px] px-0.5 text-left underline decoration-2 underline-offset-4 transition-colors duration-[var(--motion-quick)]", MARK[seg.status], selectedId === seg.claimId && "ring-2 ring-accent/40"),
			children: seg.text
		}, `${seg.claimId}-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: seg.text }, `t-${i}`))
	});
}
var OVERRIDES = [
	{
		status: "verified",
		label: "검증됨으로"
	},
	{
		status: "partial",
		label: "부분 지지로"
	},
	{
		status: "unverified",
		label: "미확인으로"
	},
	{
		status: "contradicted",
		label: "모순으로"
	},
	{
		status: "fabricated",
		label: "날조로"
	}
];
function ClaimPanel({ audit, claim, onOverride }) {
	const source = sourceOf(audit, claim);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col gap-4 rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: claim.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBadge, { action: claim.action }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto text-xs tabular-nums text-muted",
						children: [
							"확신 ",
							claim.confidence,
							"%",
							claim.overridden ? " · 사람 수정" : ""
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base leading-relaxed",
				children: claim.text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: claim.rationale
			}),
			source ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-md)] bg-bg px-3.5 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.12em] text-subtle",
						children: "출처"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-medium",
						children: source.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [source.publisher, source.live ? " · 원문 확인됨" : " · 원문 없음"]
					}),
					claim.quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
						className: "mt-2 border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-fg",
						children: claim.quote
					}) : null,
					source.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: source.url,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-3 inline-flex h-10 items-center gap-1.5 text-sm text-accent hover:underline",
						children: ["원문 열기", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-md)] bg-bg px-3.5 py-3 text-sm text-muted",
				children: "이 주장에 연결된 출처가 없습니다."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium uppercase tracking-[0.12em] text-subtle",
				children: "검토자가 상태 수정"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: OVERRIDES.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: claim.status === opt.status ? "primary" : "secondary",
					onClick: () => onOverride(opt.status),
					children: opt.label
				}, opt.status))
			})] })
		]
	});
}
function AuditPage() {
	const { id } = Route.useParams();
	const audit = useWarrant((s) => s.audits.find((a) => a.id === id));
	const overrideClaim = useWarrant((s) => s.overrideClaim);
	const [selectedId, setSelectedId] = (0, import_react.useState)(audit?.claims[0]?.id ?? null);
	const selected = (0, import_react.useMemo)(() => audit?.claims.find((c) => c.id === selectedId) ?? audit?.claims[0], [audit, selectedId]);
	if (!audit) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "이 감사를 찾을 수 없습니다."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: "mt-3 inline-block text-sm text-accent hover:underline",
		children: "데스크로"
	})] });
	const disposition = dispositionOf(audit);
	const believe = audit.claims.filter((c) => c.action === "use");
	const recheck = audit.claims.filter((c) => c.action === "recheck");
	const discard = audit.claims.filter((c) => c.action === "discard");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "inline-flex h-10 items-center gap-1.5 text-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "데스크"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						VERTICAL_LABEL[audit.vertical],
						" · ",
						audit.model,
						" · ",
						audit.channel
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-[1.85rem] leading-tight tracking-tight md:text-[2.1rem]",
					children: audit.title
				}),
				audit.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: audit.notes
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DispositionBadge, { value: disposition })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBar, { claims: audit.claims })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lane, {
					title: "믿어도 됨",
					items: believe,
					empty: "이 답변에서 바로 쓸 문장이 없습니다.",
					selectedId: selected?.id ?? null,
					onSelect: setSelectedId
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lane, {
					title: "다시 확인할 것",
					items: recheck,
					empty: "재확인 대기 주장이 없습니다.",
					selectedId: selected?.id ?? null,
					onSelect: setSelectedId
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lane, {
					title: "쓰지 말 것",
					items: discard,
					empty: "폐기할 주장이 없습니다.",
					selectedId: selected?.id ?? null,
					onSelect: setSelectedId
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)] md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.12em] text-subtle",
					children: "원문 · 문장 선택"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerViewer, {
						answer: audit.originalAnswer,
						claims: audit.claims,
						selectedId: selected?.id ?? null,
						onSelect: setSelectedId
					})
				})]
			}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimPanel, {
				audit,
				claim: selected,
				onOverride: (status) => overrideClaim(audit.id, selected.id, status)
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl tracking-tight",
				children: "모든 주장"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-2",
				children: audit.claims.map((claim) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSelectedId(claim.id),
					className: cn("flex w-full flex-col gap-2 rounded-[var(--radius-lg)] bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)] md:flex-row md:items-center", selected?.id === claim.id && "ring-2 ring-accent/30"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: claim.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBadge, { action: claim.action })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm leading-relaxed md:flex-1",
							children: claim.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs tabular-nums text-muted",
							children: [claim.confidence, "%"]
						})
					]
				}) }, claim.id))
			})]
		})
	] });
}
function Lane({ title, items, empty, selectedId, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs tabular-nums text-muted",
				children: items.length
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-subtle",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(item.id),
				className: cn("min-h-11 w-full rounded-[var(--radius-sm)] bg-bg px-3 py-2 text-left text-sm leading-relaxed", selectedId === item.id && "ring-2 ring-accent/30"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "sr-only",
					children: [ACTION_LABEL[item.action], "."]
				}), item.text]
			}) }, item.id))
		})]
	});
}
//#endregion
export { AuditPage as component };
