import { segmentAnswer } from "@/lib/highlight";
import type { Claim, ClaimStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const MARK: Record<ClaimStatus, string> = {
  verified: "bg-verified/18 decoration-verified",
  partial: "bg-partial/18 decoration-partial",
  unverified: "bg-unverified/18 decoration-unverified",
  contradicted: "bg-contradicted/18 decoration-contradicted",
  fabricated: "bg-fabricated/18 decoration-fabricated",
};

export function AnswerViewer({
  answer,
  claims,
  selectedId,
  onSelect,
}: {
  answer: string;
  claims: Claim[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const segments = segmentAnswer(answer, claims);
  return (
    <div className="font-display text-[1.05rem] leading-[1.7] text-pretty text-fg">
      {segments.map((seg, i) =>
        seg.claimId && seg.status ? (
          <button
            key={`${seg.claimId}-${i}`}
            type="button"
            onClick={() => onSelect(seg.claimId!)}
            className={cn(
              "rounded-[4px] px-0.5 text-left underline decoration-2 underline-offset-4 transition-colors duration-[var(--motion-quick)]",
              MARK[seg.status],
              selectedId === seg.claimId && "ring-2 ring-accent/40",
            )}
          >
            {seg.text}
          </button>
        ) : (
          <span key={`t-${i}`}>{seg.text}</span>
        ),
      )}
    </div>
  );
}
