import { o as dispositionOf } from "./status-DXgq6v-7.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as AppShell } from "./router-Bm2DRonz.mjs";
import { r as StatusBadge, t as ActionBadge } from "./status-badge-BvI3QdpG.mjs";
import { t as useWarrant } from "./store-DkQfbocC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queue-C34zJWX0.js
var import_jsx_runtime = require_jsx_runtime();
function QueuePage() {
	const items = useWarrant((s) => s.audits).flatMap((audit) => audit.claims.filter((c) => c.action !== "use" || dispositionOf(audit) !== "ready").filter((c) => c.action === "recheck" || c.action === "discard").map((claim) => ({
		audit,
		claim
	})));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
			children: "사람 큐"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-[2rem] leading-tight tracking-tight",
			children: "다시 확인할 주장만"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm leading-relaxed text-muted",
			children: "자동 분류가 끝난 뒤, 노랑·빨강만 시니어가 봅니다. 항목을 열어 상태를 고치면 감사 기록이 남습니다."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm tabular-nums text-muted",
			children: [items.length, "건 대기"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-2",
			children: items.map(({ audit, claim }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/audits/$id",
				params: { id: audit.id },
				className: "block rounded-[var(--radius-lg)] bg-surface px-4 py-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: claim.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBadge, { action: claim.action }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: audit.title
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: claim.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: claim.rationale
					})
				]
			}) }, `${audit.id}-${claim.id}`))
		})
	] });
}
//#endregion
export { QueuePage as component };
