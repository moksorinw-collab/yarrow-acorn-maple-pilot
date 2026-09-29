//#region node_modules/.nitro/vite/services/ssr/assets/status-DXgq6v-7.js
var STATUS_LABEL = {
	verified: "검증됨",
	partial: "부분 지지",
	unverified: "미확인",
	contradicted: "모순",
	fabricated: "날조"
};
var ACTION_LABEL = {
	use: "믿어도 됨",
	recheck: "다시 확인할 것",
	discard: "쓰지 말 것"
};
var DISPOSITION_LABEL = {
	ready: "송부 가능",
	needs_review: "재확인 필요",
	blocked: "송부 금지"
};
var VERTICAL_LABEL = {
	legal: "법률",
	policy: "내부 정책",
	research: "리서치"
};
function actionForStatus(status) {
	if (status === "verified") return "use";
	if (status === "contradicted" || status === "fabricated") return "discard";
	return "recheck";
}
function dispositionOf(audit) {
	const statuses = audit.claims.map((c) => c.status);
	if (statuses.some((s) => s === "fabricated" || s === "contradicted")) return "blocked";
	if (statuses.some((s) => s === "partial" || s === "unverified")) return "needs_review";
	return "ready";
}
function mixOf(claims) {
	const total = Math.max(claims.length, 1);
	const count = (s) => claims.filter((c) => c.status === s).length;
	return {
		verified: count("verified"),
		recheck: count("partial") + count("unverified"),
		discard: count("contradicted") + count("fabricated"),
		total: claims.length,
		verifiedPct: Math.round(count("verified") / total * 100)
	};
}
function sourceOf(audit, claim) {
	const id = claim.sourceIds[0];
	return audit.sources.find((s) => s.id === id);
}
//#endregion
export { actionForStatus as a, sourceOf as c, VERTICAL_LABEL as i, DISPOSITION_LABEL as n, dispositionOf as o, STATUS_LABEL as r, mixOf as s, ACTION_LABEL as t };
