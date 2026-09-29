import { a as actionForStatus } from "./status-DXgq6v-7.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-ckjXObjN.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var STATUSES = [
	"verified",
	"partial",
	"unverified",
	"contradicted",
	"fabricated"
];
function asStatus(value) {
	return STATUSES.includes(value) ? value : "unverified";
}
function extractJson(text) {
	const raw = (text.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? text).trim();
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) return {};
	try {
		return JSON.parse(raw.slice(start, end + 1));
	} catch {
		return {};
	}
}
function stripHtml(html) {
	return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/\s+/g, " ").trim();
}
function isPrivateHost(hostname) {
	const host = hostname.toLowerCase();
	if (host === "localhost" || host.endsWith(".localhost") || host === "127.0.0.1") return true;
	if (host === "::1" || host.startsWith("10.") || host.startsWith("192.168.") || host.startsWith("169.254.")) return true;
	if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return true;
	return false;
}
async function fetchExcerpt(url) {
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
		if (isPrivateHost(parsed.hostname)) return null;
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5e3);
		const res = await fetch(url, {
			signal: controller.signal,
			redirect: "follow",
			headers: { "User-Agent": "WarrantAudit/1.0" }
		});
		clearTimeout(timer);
		const buf = await res.arrayBuffer();
		const slice = buf.byteLength > 8e4 ? buf.slice(0, 8e4) : buf;
		const html = new TextDecoder("utf-8", { fatal: false }).decode(slice);
		const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
		const title = titleMatch ? stripHtml(titleMatch[1]).slice(0, 140) : parsed.hostname;
		return {
			id: `src-${Math.random().toString(36).slice(2, 8)}`,
			title: title || parsed.hostname,
			publisher: parsed.hostname,
			url,
			live: res.ok,
			excerpt: stripHtml(html).slice(0, 1200)
		};
	} catch {
		return {
			id: `src-${Math.random().toString(36).slice(2, 8)}`,
			title: url,
			publisher: "fetch-failed",
			url,
			live: false,
			excerpt: ""
		};
	}
}
function heuristicAudit(answer, model) {
	const claims = answer.split(/(?<=다\.|요\.|니다\.|[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 12).slice(0, 8).map((text) => {
		const hasUrl = /https?:\/\//i.test(text);
		const fakeCite = /대판\s*\d{4}다\d{5,}|20\d{2}다\d{6}/.test(text);
		const hedge = /통용|것으로 보인다|알려져 있다|추정/.test(text);
		let status = "unverified";
		if (fakeCite) status = "fabricated";
		else if (hedge) status = "partial";
		else if (hasUrl) status = "unverified";
		return {
			text: text.slice(0, 180),
			anchor: text.slice(0, 80),
			status,
			confidence: fakeCite ? 80 : 40,
			rationale: fakeCite ? "판례 번호 형식이 보이나 원문을 확인하지 못했습니다. 날조 가능성이 있어 재검색이 필요합니다." : "자동 분해만 수행했습니다. 출처를 대조하기 전까지 미확인입니다."
		};
	});
	return {
		title: `${model} 답변 감사`,
		claims
	};
}
var runAudit_createServerFn_handler = createServerRpc({
	id: "dbff8caf84cf7755aaf37ff213587720dacb5d45630e3af5c878f57a50f45036",
	name: "runAudit",
	filename: "src/lib/verify.ts"
}, (opts) => runAudit.__executeServer(opts));
var runAudit = createServerFn({ method: "POST" }).validator((input) => input).handler(runAudit_createServerFn_handler, async ({ data }) => {
	const answer = data.answer.trim().slice(0, 8e3);
	const model = data.model.trim().slice(0, 80) || "Unknown";
	if (answer.length < 20) return {
		ok: false,
		error: "답변이 너무 짧습니다. 문장 두 개 이상을 붙여 넣으세요."
	};
	const urls = (data.sourceUrls ?? "").split(/[\s,]+/).map((u) => u.trim()).filter((u) => /^https?:\/\//i.test(u)).slice(0, 4);
	const fetched = (await Promise.all(urls.map(fetchExcerpt))).filter(Boolean);
	const apiKey = process.env.XAI_API_KEY;
	let parsed = {};
	if (apiKey) {
		const prompt = `You are Warrant, a claim-level evidence auditor.
Split the AI answer into at most 8 atomic factual claims.
Judge each claim only against (a) the provided source excerpts and (b) well-established public facts you are highly confident about.
If evidence is missing, status MUST be "unverified". Never mark verified by guessing.

status enum: verified | partial | unverified | contradicted | fabricated
- verified: excerpt or settled public fact fully supports the claim
- partial: only part of the claim is supported, or a number/date/title is off
- unverified: no usable evidence
- contradicted: evidence says the opposite
- fabricated: invented citation, URL, case number, quote, or document version

Return JSON only:
{"title":"short Korean title","claims":[{"text":"...","anchor":"exact substring from the answer","status":"verified","confidence":0-100,"sourceTitle":"...","sourceUrl":"...","publisher":"...","quote":"verbatim supporting or contradicting span","rationale":"Korean, 2 sentences, what the user should do"}]}

AI model: ${model}

Answer:
"""${answer}"""

Source excerpts:
${fetched.length === 0 ? "(제공된 출처 없음)" : fetched.map((s, i) => `[${i + 1}] ${s.title} | ${s.publisher} | live=${s.live}\n${s.excerpt || "(본문 없음)"}`).join("\n\n")}`;
		try {
			const res = await fetch("https://api.x.ai/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`
				},
				body: JSON.stringify({
					model: "grok-4.5",
					temperature: .2,
					max_tokens: 1800,
					response_format: { type: "json_object" },
					messages: [{
						role: "user",
						content: prompt
					}]
				})
			});
			if (res.ok) parsed = extractJson((await res.json()).choices?.[0]?.message?.content ?? "");
		} catch {
			parsed = {};
		}
	}
	if (!parsed.claims || parsed.claims.length === 0) parsed = heuristicAudit(answer, model);
	const sources = [...fetched];
	const claims = (parsed.claims ?? []).slice(0, 8).map((raw, index) => {
		const status = asStatus(raw.status);
		let sourceIds = [];
		if (raw.sourceUrl || raw.sourceTitle) {
			const existing = sources.find((s) => s.url === raw.sourceUrl || s.title === raw.sourceTitle);
			if (existing) sourceIds = [existing.id];
			else {
				const created = {
					id: `src-m${index + 1}`,
					title: raw.sourceTitle || raw.sourceUrl || "모델이 지목한 출처",
					publisher: raw.publisher || "unknown",
					url: raw.sourceUrl,
					live: Boolean(raw.sourceUrl),
					excerpt: raw.quote || ""
				};
				sources.push(created);
				sourceIds = [created.id];
			}
		}
		const anchor = raw.anchor && answer.includes(raw.anchor) ? raw.anchor : answer.includes(raw.text) ? raw.text : raw.anchor || raw.text.slice(0, 40);
		return {
			id: `c-live-${index + 1}`,
			text: raw.text.slice(0, 240),
			anchor,
			status,
			confidence: Math.max(0, Math.min(100, Math.round(raw.confidence ?? 50))),
			action: actionForStatus(status),
			sourceIds,
			quote: raw.quote?.slice(0, 400),
			rationale: (raw.rationale || "판정 근거가 비어 있습니다. 원문을 직접 확인하세요.").slice(0, 400)
		};
	});
	return {
		ok: true,
		audit: {
			id: `aud-${Date.now()}`,
			title: (parsed.title || `${model} 답변 감사`).slice(0, 80),
			model,
			channel: "붙여넣은 답변",
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			owner: "김서연",
			vertical: "research",
			originalAnswer: answer,
			claims,
			sources
		}
	};
});
//#endregion
export { runAudit_createServerFn_handler };
