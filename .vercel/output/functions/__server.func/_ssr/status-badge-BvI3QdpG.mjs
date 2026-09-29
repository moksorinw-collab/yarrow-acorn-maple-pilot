import { n as DISPOSITION_LABEL, r as STATUS_LABEL, t as ACTION_LABEL } from "./status-DXgq6v-7.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn } from "./router-Bm2DRonz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-BvI3QdpG.js
var import_jsx_runtime = require_jsx_runtime();
var STATUS_CLASS = {
	verified: "bg-verified/12 text-verified",
	partial: "bg-partial/12 text-partial",
	unverified: "bg-unverified/12 text-unverified",
	contradicted: "bg-contradicted/12 text-contradicted",
	fabricated: "bg-fabricated/12 text-fabricated"
};
var ACTION_CLASS = {
	use: "bg-verified/12 text-verified",
	recheck: "bg-partial/12 text-partial",
	discard: "bg-fabricated/12 text-fabricated"
};
var DISPOSITION_CLASS = {
	ready: "bg-verified/12 text-verified",
	needs_review: "bg-partial/12 text-partial",
	blocked: "bg-fabricated/12 text-fabricated"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium", STATUS_CLASS[status]),
		children: STATUS_LABEL[status]
	});
}
function ActionBadge({ action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium", ACTION_CLASS[action]),
		children: ACTION_LABEL[action]
	});
}
function DispositionBadge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium", DISPOSITION_CLASS[value]),
		children: DISPOSITION_LABEL[value]
	});
}
//#endregion
export { DispositionBadge as n, StatusBadge as r, ActionBadge as t };
