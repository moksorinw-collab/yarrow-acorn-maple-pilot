import { mixOf } from "@/lib/status";
import type { Claim } from "@/lib/types";

export function TrustBar({ claims, compact = false }: { claims: Claim[]; compact?: boolean }) {
  const mix = mixOf(claims);
  const total = Math.max(mix.total, 1);
  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <div className="flex h-2 overflow-hidden rounded-full bg-bg-subtle">
        <span className="bg-verified" style={{ width: `${(mix.verified / total) * 100}%` }} />
        <span className="bg-partial" style={{ width: `${(mix.recheck / total) * 100}%` }} />
        <span className="bg-fabricated" style={{ width: `${(mix.discard / total) * 100}%` }} />
      </div>
      <dl className="flex flex-wrap gap-x-5 gap-y-1 text-xs tabular-nums text-muted">
        <div>
          <dt className="inline text-verified">믿어도 됨</dt>{" "}
          <dd className="inline text-fg">{mix.verified}</dd>
        </div>
        <div>
          <dt className="inline text-partial">다시 확인할 것</dt>{" "}
          <dd className="inline text-fg">{mix.recheck}</dd>
        </div>
        <div>
          <dt className="inline text-fabricated">쓰지 말 것</dt>{" "}
          <dd className="inline text-fg">{mix.discard}</dd>
        </div>
      </dl>
    </div>
  );
}
