import type { Claim, ClaimStatus } from "./types";

export type AnswerSegment = {
  text: string;
  claimId?: string;
  status?: ClaimStatus;
};

export function segmentAnswer(answer: string, claims: Claim[]): AnswerSegment[] {
  const hits: { start: number; end: number; claim: Claim }[] = [];
  for (const claim of claims) {
    const needle = claim.anchor || claim.text;
    if (!needle) continue;
    const start = answer.indexOf(needle);
    if (start < 0) continue;
    hits.push({ start, end: start + needle.length, claim });
  }
  hits.sort((a, b) => a.start - b.start || b.end - a.end - (a.end - a.start));

  const picked: typeof hits = [];
  let cursor = 0;
  for (const hit of hits) {
    if (hit.start < cursor) continue;
    picked.push(hit);
    cursor = hit.end;
  }

  const segments: AnswerSegment[] = [];
  let i = 0;
  for (const hit of picked) {
    if (hit.start > i) {
      segments.push({ text: answer.slice(i, hit.start) });
    }
    segments.push({
      text: answer.slice(hit.start, hit.end),
      claimId: hit.claim.id,
      status: hit.claim.status,
    });
    i = hit.end;
  }
  if (i < answer.length) segments.push({ text: answer.slice(i) });
  return segments;
}
