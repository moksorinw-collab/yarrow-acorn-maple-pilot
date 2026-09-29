import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Inbox, n as ScrollText, o as ClipboardPlus, r as LayoutGrid, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bm2DRonz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-DjzLJoFc.css";
var APP_NAME = "Warrant";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "AI 답변의 주장마다 근거 상태를 추적해, 무엇을 믿고 무엇을 다시 확인할지 보여줍니다."
			},
			{
				name: "theme-color",
				content: "#f3f1ec"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ko",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$3 = () => import("./routes-wMg5uPgK.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./new-BE85bDgh.mjs");
var Route$3 = createFileRoute("/new")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
function WarrantMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "1.5",
			y: "1.5",
			width: "29",
			height: "29",
			rx: "4",
			className: "stroke-fg",
			strokeWidth: "1.4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 9.5h2.2l2.55 8.2L15.4 9.5h1.2l2.65 8.2 2.55-8.2H24L19.7 22.5h-1.35L15.95 14.6 13.65 22.5H12.3L8 9.5Z",
			className: "fill-fg"
		})]
	});
}
var WORKSPACE = {
	org: "한강법률",
	desk: "리서치 데스크",
	user: "김서연",
	role: "시니어 어소시에이트"
};
var SEED_AUDITS = [
	{
		id: "aud-52h",
		title: "주 52시간제 예외 적용 범위",
		model: "ChatGPT",
		channel: "고객 송부 예정 메모",
		createdAt: "2026-09-29T08:40:00+09:00",
		owner: "김서연",
		vertical: "legal",
		originalAnswer: "현행 근로기준법상 1주 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없고, 연장근로는 당사자 합의 아래 1주 12시간 한도입니다. 따라서 원칙적인 1주 총 근로 한도는 52시간입니다. 상시 근로자 5인 미만 사업장에는 연장근로 한도 규정이 적용되지 않습니다. 특별연장근로는 고용노동부 인가를 받으면 주 64시간까지 가능하며, 이는 대판 2024다998877이 명확히 확인한 바입니다. 또한 2020년 이전처럼 휴일근로를 연장근로와 별도로 보면 주 68시간 체제가 여전히 유효하다는 해석이 실무에서 통용됩니다.",
		notes: "클라이언트 자문 초안. 송부 전 인용 판례 번호와 68시간 서술을 반드시 걸러야 함.",
		sources: [
			{
				id: "src-l1",
				title: "근로기준법 제50조 · 제53조",
				publisher: "국가법령정보센터",
				url: "https://www.law.go.kr",
				live: true,
				excerpt: "제50조(근로시간) ① 1주 간의 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없다. 제53조(연장 근로의 제한) ① 당사자 간에 합의하면 1주 간에 12시간을 한도로 제50조의 근로시간을 연장할 수 있다."
			},
			{
				id: "src-l2",
				title: "근로기준법 제11조 및 별표 1",
				publisher: "국가법령정보센터",
				url: "https://www.law.go.kr",
				live: true,
				excerpt: "상시 4명 이하의 근로자를 사용하는 사업 또는 사업장에는 대통령령으로 정하는 바에 따라 이 법의 일부 규정을 적용하지 아니할 수 있다. 별표에서 제53조 연장근로 제한은 5인 미만 사업장에 적용 제외로 열거된다."
			},
			{
				id: "src-l3",
				title: "근로기준법 제53조 제4항 특별연장근로",
				publisher: "고용노동부",
				url: "https://www.moel.go.kr",
				live: true,
				excerpt: "사용자는 특별한 사정이 있으면 고용노동부장관의 인가와 근로자의 동의를 받아 제1항에 따른 근로시간을 연장할 수 있다. 인가 요건과 건강보호 조치는 고시로 정한다. 법률은 ‘주 64시간’을 한도로 규정하지 않는다."
			}
		],
		claims: [
			{
				id: "c-52-1",
				text: "1주 소정근로 40시간, 연장 12시간으로 원칙 한도는 52시간이다.",
				anchor: "원칙적인 1주 총 근로 한도는 52시간입니다",
				status: "verified",
				confidence: 96,
				action: "use",
				sourceIds: ["src-l1"],
				quote: "1주 간의 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없다. … 1주 간에 12시간을 한도로 … 연장할 수 있다.",
				rationale: "근로기준법 제50조·제53조 문언과 일치합니다. 고객 메모의 원칙 진술로 사용해도 됩니다."
			},
			{
				id: "c-52-2",
				text: "상시 5인 미만 사업장에는 연장근로 한도가 적용되지 않는다.",
				anchor: "상시 근로자 5인 미만 사업장에는 연장근로 한도 규정이 적용되지 않습니다",
				status: "verified",
				confidence: 91,
				action: "use",
				sourceIds: ["src-l2"],
				quote: "상시 4명 이하의 근로자를 사용하는 사업장에는 이 법의 일부 규정을 적용하지 아니할 수 있다.",
				rationale: "적용 제외 구조는 맞습니다. 다만 ‘5인 미만’과 ‘4명 이하’는 같은 말이므로 조문 표현을 병기하는 편이 안전합니다."
			},
			{
				id: "c-52-3",
				text: "특별연장근로는 인가 시 주 64시간까지 가능하다.",
				anchor: "특별연장근로는 고용노동부 인가를 받으면 주 64시간까지 가능하며",
				status: "partial",
				confidence: 58,
				action: "recheck",
				sourceIds: ["src-l3"],
				quote: "특별한 사정이 있으면 고용노동부장관의 인가와 근로자의 동의를 받아 제1항에 따른 근로시간을 연장할 수 있다. 법률은 ‘주 64시간’을 한도로 규정하지 않는다.",
				rationale: "인가 제도 자체는 존재하지만, ‘주 64시간’은 법령 한도가 아니라 행정 실무에서 건강보호 기준으로 쓰이는 숫자입니다. 한도로 단정하면 과잉입니다. 고시·지침을 확인해 조건을 붙이십시오."
			},
			{
				id: "c-52-4",
				text: "대판 2024다998877이 특별연장근로 64시간을 확인했다.",
				anchor: "대판 2024다998877이 명확히 확인한 바입니다",
				status: "fabricated",
				confidence: 97,
				action: "discard",
				sourceIds: [],
				rationale: "해당 사건번호는 공개 판례 데이터베이스에 존재하지 않습니다. 전형적인 인용 날조입니다. 메모에서 삭제해야 합니다."
			},
			{
				id: "c-52-5",
				text: "휴일근로를 연장과 분리하면 주 68시간 체제가 여전히 유효하다.",
				anchor: "주 68시간 체제가 여전히 유효하다는 해석이 실무에서 통용됩니다",
				status: "contradicted",
				confidence: 93,
				action: "discard",
				sourceIds: ["src-l1"],
				quote: "1주 간에 12시간을 한도로 제50조의 근로시간을 연장할 수 있다.",
				rationale: "2018년 개정으로 휴일근로가 연장근로 한도에 산입됩니다. 68시간 해석은 구법 실무이며 현행과 모순됩니다. 사용 금지."
			}
		]
	},
	{
		id: "aud-policy",
		title: "고객 자료 반출 승인 경로",
		model: "사내 RAG · Glean",
		channel: "슬랙 /ask-policy",
		createdAt: "2026-09-28T19:12:00+09:00",
		owner: "한지훈",
		vertical: "policy",
		originalAnswer: "고객이 요청한 실명 계약서는 담당 변호사가 메일로 바로 보내도 됩니다. 정보보안 정책 v3.4 섹션 4.2는 사건 담당자의 단독 승인을 반출 권한으로 명시합니다. 개인정보가 포함된 파일은 반출 대장에 기록하고, 암호는 별도 채널로 전달하면 충분합니다. 외부 LLM에 사건 문서를 붙여 넣는 것은 금지되어 있지 않으나, 민감 개인정보는 마스킹하는 것이 권고됩니다.",
		notes: "신입 변호사 질문. 잘못된 승인 경로가 이미 슬랙에 올라간 상태.",
		sources: [{
			id: "src-p1",
			title: "정보보안 정책 v4.1 §4.2 자료 반출",
			publisher: "한강법률 내부 Wiki",
			live: true,
			excerpt: "고객 실명 자료·계약서·증거 원본의 사외 반출은 파트너 1인의 사전 승인과 컴플라이언스 팀 기록이 필요하다. 담당 변호사 단독 승인은 허용되지 않는다. v3.4는 2025-11-01 폐지."
		}, {
			id: "src-p2",
			title: "생성형 AI 사용 지침 2026.03",
			publisher: "한강법률 컴플라이언스",
			live: true,
			excerpt: "사건 문서, 고객 명, 계약 조건, 미공개 분쟁 사실을 외부 LLM(ChatGPT, Claude, Gemini 등)에 입력하는 행위는 금지한다. 마스킹만으로 금지 해제되지 않는다."
		}],
		claims: [
			{
				id: "c-p1",
				text: "실명 계약서는 담당 변호사가 메일로 바로 보내도 된다.",
				anchor: "담당 변호사가 메일로 바로 보내도 됩니다",
				status: "contradicted",
				confidence: 94,
				action: "discard",
				sourceIds: ["src-p1"],
				quote: "사외 반출은 파트너 1인의 사전 승인과 컴플라이언스 팀 기록이 필요하다. 담당 변호사 단독 승인은 허용되지 않는다.",
				rationale: "현행 v4.1과 정면으로 모순됩니다. 이 답변을 따른 반출은 정책 위반입니다."
			},
			{
				id: "c-p2",
				text: "정책 v3.4 §4.2가 담당자 단독 승인을 반출 권한으로 명시한다.",
				anchor: "정보보안 정책 v3.4 섹션 4.2는 사건 담당자의 단독 승인을 반출 권한으로 명시합니다",
				status: "fabricated",
				confidence: 90,
				action: "discard",
				sourceIds: ["src-p1"],
				quote: "v3.4는 2025-11-01 폐지.",
				rationale: "폐지된 버전을 현행처럼 인용했고, 단독 승인 문언은 현행 문서에 없습니다. 검색이 구 청크를 붙잡은 RAG 실패로 보입니다."
			},
			{
				id: "c-p3",
				text: "개인정보 파일은 반출 대장 기록과 별도 채널 암호 전달이면 충분하다.",
				anchor: "개인정보가 포함된 파일은 반출 대장에 기록하고, 암호는 별도 채널로 전달하면 충분합니다",
				status: "partial",
				confidence: 64,
				action: "recheck",
				sourceIds: ["src-p1"],
				quote: "사외 반출은 파트너 1인의 사전 승인과 컴플라이언스 팀 기록이 필요하다.",
				rationale: "대장 기록·암호 분리 전달은 실무 관행에 가깝지만, 필요조건인 파트너 승인이 빠져 있습니다. 절차의 일부만 맞습니다."
			},
			{
				id: "c-p4",
				text: "외부 LLM에 사건 문서를 넣는 것은 금지되어 있지 않다.",
				anchor: "외부 LLM에 사건 문서를 붙여 넣는 것은 금지되어 있지 않으나",
				status: "contradicted",
				confidence: 98,
				action: "discard",
				sourceIds: ["src-p2"],
				quote: "사건 문서, 고객 명, 계약 조건을 외부 LLM에 입력하는 행위는 금지한다. 마스킹만으로 금지 해제되지 않는다.",
				rationale: "2026년 3월 지침이 명시적으로 금지합니다. ‘권고’가 아니라 ‘금지’입니다."
			}
		]
	},
	{
		id: "aud-brief",
		title: "상대방 대리인 로펌 최근 동향",
		model: "Perplexity",
		channel: "사건 킥오프 브리프",
		createdAt: "2026-09-27T14:05:00+09:00",
		owner: "김서연",
		vertical: "research",
		originalAnswer: "북극성 로펌은 2026년 3월 Series B로 8,000만 달러를 유치했고, 서울 사무소 소속 변호사는 240명입니다. 최근 공정거래 사건을 15건 수임했으며, 대표 파트너 유민재는 전 공정위 심판관 출신입니다. 홈페이지에 따르면 생성형 AI 리서치 도구를 전 변호사에게 배포 중이고, 인용 없이 외부에 의견을 내는 것을 내부 규정으로 금하고 있습니다.",
		notes: "상대 대리인 프로필. 숫자 세 개가 핵심 리스크.",
		sources: [{
			id: "src-r1",
			title: "People · Offices",
			publisher: "북극성 로펌 공식 사이트",
			url: "https://example-northstar.law",
			live: true,
			excerpt: "서울 사무소. 변호사 및 외국변호사 총 86명(2026년 9월 기준). 공정거래 그룹 리드: 유민재 변호사. 전 공정거래위원회 사무관."
		}, {
			id: "src-r2",
			title: "AI research policy (internal excerpt, published summary)",
			publisher: "북극성 로펌",
			url: "https://example-northstar.law/ai",
			live: true,
			excerpt: "생성형 AI로 작성한 외부 의견서·메모는 출처 확인 없이 발송할 수 없다. 도구는 희망자에 한해 파일럿 중이다."
		}],
		claims: [
			{
				id: "c-r1",
				text: "2026년 3월 Series B 8,000만 달러를 유치했다.",
				anchor: "2026년 3월 Series B로 8,000만 달러를 유치했고",
				status: "unverified",
				confidence: 41,
				action: "recheck",
				sourceIds: [],
				rationale: "로펌은 통상 벤처 라운드를 하지 않으며, 제공된 출처와 공개 보도에 해당 투자 사실이 없습니다. 날조로 단정하기 전 보도 검색이 필요합니다. 지금은 숫자에 의존하지 마십시오."
			},
			{
				id: "c-r2",
				text: "서울 사무소 소속 변호사가 240명이다.",
				anchor: "서울 사무소 소속 변호사는 240명입니다",
				status: "contradicted",
				confidence: 88,
				action: "discard",
				sourceIds: ["src-r1"],
				quote: "변호사 및 외국변호사 총 86명(2026년 9월 기준).",
				rationale: "공식 사이트 인원(86)과 불일치합니다. 240은 사용 금지."
			},
			{
				id: "c-r3",
				text: "최근 공정거래 사건 15건을 수임했다.",
				anchor: "최근 공정거래 사건을 15건 수임했으며",
				status: "unverified",
				confidence: 35,
				action: "recheck",
				sourceIds: ["src-r1"],
				rationale: "수임 건수는 공개 출처에 없습니다. ‘최근’의 기간도 정의되지 않았습니다. 사건 리스트로 따로 확인해야 합니다."
			},
			{
				id: "c-r4",
				text: "유민재 파트너는 전 공정위 심판관 출신이다.",
				anchor: "대표 파트너 유민재는 전 공정위 심판관 출신입니다",
				status: "partial",
				confidence: 70,
				action: "recheck",
				sourceIds: ["src-r1"],
				quote: "공정거래 그룹 리드: 유민재 변호사. 전 공정거래위원회 사무관.",
				rationale: "인물과 공정위 경력은 맞지만 직위가 다릅니다. 심판관이 아니라 사무관입니다. 직함을 고치면 사용 가능합니다."
			},
			{
				id: "c-r5",
				text: "생성형 AI를 전 변호사에게 배포 중이며 무인용 외부 의견을 금지한다.",
				anchor: "생성형 AI 리서치 도구를 전 변호사에게 배포 중이고, 인용 없이 외부에 의견을 내는 것을 내부 규정으로 금하고 있습니다",
				status: "partial",
				confidence: 62,
				action: "recheck",
				sourceIds: ["src-r2"],
				quote: "생성형 AI로 작성한 외부 의견서는 출처 확인 없이 발송할 수 없다. 도구는 희망자에 한해 파일럿 중이다.",
				rationale: "무인용 발송 금지는 맞습니다. ‘전 변호사 배포’는 파일럿 사실과 어긋납니다. 금지 부분만 취하고 배포 범위는 수정하십시오."
			}
		]
	},
	{
		id: "aud-civil",
		title: "불법행위 소멸시효 원칙",
		model: "Claude",
		channel: "의견서 초안",
		createdAt: "2026-09-26T11:20:00+09:00",
		owner: "김서연",
		vertical: "legal",
		originalAnswer: "민법상 불법행위로 인한 손해배상 청구권은 피해자가 손해와 가해자를 안 날부터 3년입니다. 또한 불법행위가 있은 날부터 10년이 지나면 청구권은 소멸합니다. 두 기간 중 먼저 만료되는 쪽이 적용됩니다.",
		notes: "시효 원칙만 정리한 짧은 초안. 특칙(제조물, 의료 등)은 아직 넣지 않음.",
		sources: [{
			id: "src-s1",
			title: "민법 제766조",
			publisher: "국가법령정보센터",
			url: "https://www.law.go.kr",
			live: true,
			excerpt: "불법행위로 인한 손해배상의 청구권은 피해자나 그 법정대리인이 그 손해 및 가해자를 안 날부터 3년간 행사하지 아니하면 시효로 인하여 소멸한다. 불법행위를 한 날부터 10년이 지나면 소멸한다."
		}],
		claims: [{
			id: "c-s1",
			text: "불법행위 손해배상 채권의 소멸시효는 피해자가 손해와 가해자를 안 날부터 3년이다.",
			anchor: "피해자가 손해와 가해자를 안 날부터 3년입니다",
			status: "verified",
			confidence: 95,
			action: "use",
			sourceIds: ["src-s1"],
			quote: "불법행위로 인한 손해배상의 청구권은 피해자나 그 법정대리인이 그 손해 및 가해자를 안 날부터 3년간 행사하지 아니하면 시효로 인하여 소멸한다.",
			rationale: "민법 제766조 제1항 문언과 일치합니다. 의견서의 원칙 진술로 사용해도 됩니다."
		}, {
			id: "c-s2",
			text: "불법행위일부터 10년이 지나면 손해와 가해자를 몰랐더라도 청구권이 소멸한다.",
			anchor: "불법행위가 있은 날부터 10년이 지나면 청구권은 소멸합니다",
			status: "verified",
			confidence: 94,
			action: "use",
			sourceIds: ["src-s1"],
			quote: "그 불법행위를 한 날부터 10년이 지나면 소멸한다.",
			rationale: "같은 조 제2항의 장기 소멸시효입니다. 3년과 10년을 병기한 서술은 정확합니다."
		}]
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		to: "/",
		label: "데스크",
		icon: LayoutGrid
	},
	{
		to: "/queue",
		label: "재확인 큐",
		icon: Inbox
	},
	{
		to: "/new",
		label: "새 검증",
		icon: ClipboardPlus
	},
	{
		to: "/playbook",
		label: "로드맵",
		icon: ScrollText
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2",
				children: "본문으로"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-20 hidden w-[15.5rem] flex-col border-r border-border bg-surface px-4 py-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarrantMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl leading-none tracking-tight",
							children: "Warrant"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 px-1 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle",
						children: WORKSPACE.org
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-1 text-sm text-muted",
						children: WORKSPACE.desk
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-1 flex-col gap-1",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" || pathname.startsWith("/audits/") : pathname === item.to;
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-2.5 rounded-[var(--radius-md)] px-3 text-sm transition-colors duration-[var(--motion-quick)]", active ? "bg-bg-subtle text-fg" : "text-muted hover:bg-bg-subtle hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[var(--radius-lg)] bg-bg px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: WORKSPACE.user
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: WORKSPACE.role
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3 backdrop-blur-sm md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarrantMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg leading-none",
						children: "Warrant"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: WORKSPACE.org
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:pl-[15.5rem]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					id: "main",
					className: "mx-auto w-full max-w-[72rem] px-4 pb-28 pt-6 md:px-8 md:pb-16 md:pt-8",
					children
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
				children: NAV.map((item) => {
					const active = item.to === "/" ? pathname === "/" || pathname.startsWith("/audits/") : pathname === item.to;
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]", active ? "text-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: 1.75
						}), item.label]
					}, item.to);
				})
			})
		]
	});
}
var Route$2 = createFileRoute("/playbook")({ component: Playbook });
var MONTHS = [
	{
		t: "0–2개월 · 파일럿",
		d: "법률 리서치 데스크 하나. ChatGPT/Claude 답변 붙여넣기, 주장 분해, 5상태 라벨, 사람 큐. 고객은 로펌 1곳 또는 기업 법무 1팀."
	},
	{
		t: "3–5개월 · 게이트",
		d: "슬랙·Outlook ‘보내기 전 검사’. 사내 Wiki/계약 저장소 커넥터. 폐지된 정책 버전 탐지. SOC 2 착수."
	},
	{
		t: "6–8개월 · 감사 로그",
		d: "누가 어떤 문장을 믿어도 된다고 바꿨는지 불변 로그. 고객사별 근거 코퍼스. API로 기존 RAG 뒤에 장착."
	},
	{
		t: "9–12개월 · 수직 확장",
		d: "컴플라이언스 정책 큐, 그다음 브랜드 FactCheck. 한국 먼저 닫고 글로벌 로펌 네트워크로 확장. VPC/온프렘은 매터 플랜만."
	}
];
var PLANS = [
	{
		name: "Desk",
		price: "₩99,000",
		unit: "/석·월",
		points: [
			"월 200건 감사",
			"5상태 라벨 + 사람 큐",
			"붙여넣기·CSV보내기",
			"법률 코퍼스 템플릿"
		]
	},
	{
		name: "Chamber",
		price: "₩249,000",
		unit: "/석·월",
		points: [
			"무제한 감사",
			"슬랙·메일 게이트",
			"상태 수정 감사 로그",
			"SSO, 보존 기간 설정"
		]
	},
	{
		name: "Matter",
		price: "협의",
		unit: "",
		points: [
			"VPC / 전용 인스턴스",
			"사내 RAG 인라인 검증",
			"법적 홀드·내보내기",
			"도메인 라벨 커스텀"
		]
	}
];
function Playbook() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
			children: "Go-to-market"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mt-2 max-w-2xl font-display text-[2rem] leading-tight tracking-tight",
			children: [
				"첫 수직은 법률.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"12개월은 게이트를 파는 시간."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted",
			children: "Warrant는 답변 엔진이 아닙니다. 이미 쓰고 있는 모델 위에 얹는 근거 상태 레이어입니다. 한국 로펌·기업 법무에서 송부 전 검사를 닫은 뒤, 같은 상태 모델을 정책·브랜드로 복제합니다."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-8 grid gap-3 md:grid-cols-2",
			children: MONTHS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg tracking-tight",
					children: row.t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: row.d
				})]
			}, row.t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl tracking-tight",
					children: "과금"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "검증 원가는 인용 한 건에 센트 단위입니다. 좌석 과금이 기본, 대량 감사는 건당으로 넘어갑니다. ‘진실 보증’이 아니라 ‘이 코퍼스 대비 근거 상태’만 약속합니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-3 md:grid-cols-3",
					children: PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.12em] text-subtle",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display text-3xl leading-none",
								children: [plan.price, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-base text-muted",
									children: plan.unit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2 text-sm text-muted",
								children: plan.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p))
							})
						]
					}, plan.name))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl tracking-tight",
				children: "왜 한국 법률이 먼저인가"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 space-y-2 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "틀린 판례 번호 하나가 의견서를 붕괴시킵니다. 구매 이유가 사고 회피입니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "국가법령정보센터처럼 닫힌 코퍼스가 있어 검증 정확도를 측정하기 쉽습니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "송부 전 게이트는 기존 ChatGPT 사용을 막지 않고, 그 위에 과금합니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "영어권 AEO(Profound)와 안 싸웁니다. 그들은 ‘보이느냐’, 여기는 ‘믿어도 되느냐’." })
				]
			})]
		})
	] });
}
var $$splitComponentImporter$1 = () => import("./queue-C34zJWX0.mjs");
var Route$1 = createFileRoute("/queue")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./audits._id-3d6nYcAx.mjs");
var Route = createFileRoute("/audits/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	NewRoute: Route$3.update({
		id: "/new",
		path: "/new",
		getParentRoute: () => Route$5
	}),
	PlaybookRoute: Route$2.update({
		id: "/playbook",
		path: "/playbook",
		getParentRoute: () => Route$5
	}),
	QueueRoute: Route$1.update({
		id: "/queue",
		path: "/queue",
		getParentRoute: () => Route$5
	}),
	AuditsIdRoute: Route.update({
		id: "/audits/$id",
		path: "/audits/$id",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { SEED_AUDITS as a, cn as i, Route as n, AppShell as r, router_exports as t };
