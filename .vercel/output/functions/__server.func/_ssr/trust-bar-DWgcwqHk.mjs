import { s as mixOf } from "./status-DXgq6v-7.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trust-bar-DWgcwqHk.js
var import_jsx_runtime = require_jsx_runtime();
function TrustBar({ claims, compact = false }) {
	const mix = mixOf(claims);
	const total = Math.max(mix.total, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: compact ? "space-y-2" : "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-2 overflow-hidden rounded-full bg-bg-subtle",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-verified",
					style: { width: `${mix.verified / total * 100}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-partial",
					style: { width: `${mix.recheck / total * 100}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-fabricated",
					style: { width: `${mix.discard / total * 100}%` }
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "flex flex-wrap gap-x-5 gap-y-1 text-xs tabular-nums text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "inline text-verified",
						children: "믿어도 됨"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "inline text-fg",
						children: mix.verified
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "inline text-partial",
						children: "다시 확인할 것"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "inline text-fg",
						children: mix.recheck
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "inline text-fabricated",
						children: "쓰지 말 것"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "inline text-fg",
						children: mix.discard
					})
				] })
			]
		})]
	});
}
//#endregion
export { TrustBar as t };
