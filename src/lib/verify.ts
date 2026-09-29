import { createServerFn } from "@tanstack/react-start";
import { actionForStatus } from "./status";
import type { Audit, Claim, ClaimStatus, Source } from "./types";

const STATUSES: ClaimStatus[] = [
  "verified",
  "partial",
  "unverified",
  "contradicted",
  "fabricated",
];

type ModelClaim = {
  text: string;
  anchor?: string;
  status: string;
  confidence?: number;
  sourceTitle?: string;
  sourceUrl?: string;
  publisher?: string;
  quote?: string;
  rationale?: string;
};

function asStatus(value: string): ClaimStatus {
  return STATUSES.includes(value as ClaimStatus) ? (value as ClaimStatus) : "unverified";
}

function extractJson(text: string): { title?: string; claims?: ModelClaim[] } {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced?.[1] ?? text).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return {};
  try {
    return JSON.parse(raw.slice(start, end + 1)) as { title?: string; claims?: ModelClaim[] };
  } catch {
    return {};
  }
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host === "127.0.0.1") return true;
  if (host === "::1" || host.startsWith("10.") || host.startsWith("192.168.") || host.startsWith("169.254.")) {
    return true;
  }
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return true;
  return false;
}

async function fetchExcerpt(url: string): Promise<Source | null> {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (isPrivateHost(parsed.hostname)) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "WarrantAudit/1.0" },
    });
    clearTimeout(timer);
    const buf = await res.arrayBuffer();
    const slice = buf.byteLength > 80_000 ? buf.slice(0, 80_000) : buf;
    const html = new TextDecoder("utf-8", { fatal: false }).decode(slice);
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? stripHtml(titleMatch[1]).slice(0, 140) : parsed.hostname;
    return {
      id: `src-${Math.random().toString(36).slice(2, 8)}`,
      title: title || parsed.hostname,
      publisher: parsed.hostname,
      url,
      live: res.ok,
      excerpt: stripHtml(html).slice(0, 1200),
    };
  } catch {
    return {
      id: `src-${Math.random().toString(36).slice(2, 8)}`,
      title: url,
      publisher: "fetch-failed",
      url,
      live: false,
      excerpt: "",
    };
  }
}

function heuristicAudit(answer: string, model: string): { title: string; claims: ModelClaim[] } {
  const sentences = answer
    .split(/(?<=다\.|요\.|니다\.|[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12)
    .slice(0, 8);

  const claims: ModelClaim[] = sentences.map((text) => {
    const hasUrl = /https?:\/\//i.test(text);
    const fakeCite = /대판\s*\d{4}다\d{5,}|20\d{2}다\d{6}/.test(text);
    const hedge = /통용|것으로 보인다|알려져 있다|추정/.test(text);
    let status: ClaimStatus = "unverified";
    if (fakeCite) status = "fabricated";
    else if (hedge) status = "partial";
    else if (hasUrl) status = "unverified";
    return {
      text: text.slice(0, 180),
      anchor: text.slice(0, 80),
      status,
      confidence: fakeCite ? 80 : 40,
      rationale: fakeCite
        ? "판례 번호 형식이 보이나 원문을 확인하지 못했습니다. 날조 가능성이 있어 재검색이 필요합니다."
        : "자동 분해만 수행했습니다. 출처를 대조하기 전까지 미확인입니다.",
    };
  });

  return {
    title: `${model} 답변 감사`,
    claims,
  };
}

export const runAudit = createServerFn({ method: "POST" })
  .validator((input: { answer: string; model: string; sourceUrls?: string }) => input)
  .handler(async ({ data }) => {
    const answer = data.answer.trim().slice(0, 8000);
    const model = data.model.trim().slice(0, 80) || "Unknown";
    if (answer.length < 20) {
      return { ok: false as const, error: "답변이 너무 짧습니다. 문장 두 개 이상을 붙여 넣으세요." };
    }

    const urls = (data.sourceUrls ?? "")
      .split(/[\s,]+/)
      .map((u) => u.trim())
      .filter((u) => /^https?:\/\//i.test(u))
      .slice(0, 4);

    const fetched = (await Promise.all(urls.map(fetchExcerpt))).filter(Boolean) as Source[];

    const apiKey = process.env.XAI_API_KEY;
    let parsed: { title?: string; claims?: ModelClaim[] } = {};

    if (apiKey) {
      const sourceBlock =
        fetched.length === 0
          ? "(제공된 출처 없음)"
          : fetched
              .map(
                (s, i) =>
                  `[${i + 1}] ${s.title} | ${s.publisher} | live=${s.live}\n${s.excerpt || "(본문 없음)"}`,
              )
              .join("\n\n");

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
${sourceBlock}`;

      try {
        const res = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "grok-4.5",
            temperature: 0.2,
            max_tokens: 1800,
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: prompt }],
          }),
        });
        if (res.ok) {
          const body = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          parsed = extractJson(body.choices?.[0]?.message?.content ?? "");
        }
      } catch {
        parsed = {};
      }
    }

    if (!parsed.claims || parsed.claims.length === 0) {
      parsed = heuristicAudit(answer, model);
    }

    const sources: Source[] = [...fetched];
    const modelClaims = parsed.claims ?? [];
    const claims: Claim[] = modelClaims.slice(0, 8).map((raw, index) => {
      const status = asStatus(raw.status);
      let sourceIds: string[] = [];
      if (raw.sourceUrl || raw.sourceTitle) {
        const existing = sources.find(
          (s) => s.url === raw.sourceUrl || s.title === raw.sourceTitle,
        );
        if (existing) sourceIds = [existing.id];
        else {
          const created: Source = {
            id: `src-m${index + 1}`,
            title: raw.sourceTitle || raw.sourceUrl || "모델이 지목한 출처",
            publisher: raw.publisher || "unknown",
            url: raw.sourceUrl,
            live: Boolean(raw.sourceUrl),
            excerpt: raw.quote || "",
          };
          sources.push(created);
          sourceIds = [created.id];
        }
      }
      const anchor =
        raw.anchor && answer.includes(raw.anchor)
          ? raw.anchor
          : answer.includes(raw.text)
            ? raw.text
            : raw.anchor || raw.text.slice(0, 40);
      return {
        id: `c-live-${index + 1}`,
        text: raw.text.slice(0, 240),
        anchor,
        status,
        confidence: Math.max(0, Math.min(100, Math.round(raw.confidence ?? 50))),
        action: actionForStatus(status),
        sourceIds,
        quote: raw.quote?.slice(0, 400),
        rationale: (raw.rationale || "판정 근거가 비어 있습니다. 원문을 직접 확인하세요.").slice(
          0,
          400,
        ),
      };
    });

    const audit: Audit = {
      id: `aud-${Date.now()}`,
      title: (parsed.title || `${model} 답변 감사`).slice(0, 80),
      model,
      channel: "붙여넣은 답변",
      createdAt: new Date().toISOString(),
      owner: "김서연",
      vertical: "research",
      originalAnswer: answer,
      claims,
      sources,
    };

    return { ok: true as const, audit };
  });
