import { ACTION_LABEL, DISPOSITION_LABEL, STATUS_LABEL } from "@/lib/status";
import type { AuditDisposition, ClaimAction, ClaimStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_CLASS: Record<ClaimStatus, string> = {
  verified: "bg-verified/12 text-verified",
  partial: "bg-partial/12 text-partial",
  unverified: "bg-unverified/12 text-unverified",
  contradicted: "bg-contradicted/12 text-contradicted",
  fabricated: "bg-fabricated/12 text-fabricated",
};

const ACTION_CLASS: Record<ClaimAction, string> = {
  use: "bg-verified/12 text-verified",
  recheck: "bg-partial/12 text-partial",
  discard: "bg-fabricated/12 text-fabricated",
};

const DISPOSITION_CLASS: Record<AuditDisposition, string> = {
  ready: "bg-verified/12 text-verified",
  needs_review: "bg-partial/12 text-partial",
  blocked: "bg-fabricated/12 text-fabricated",
};

export function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium",
        STATUS_CLASS[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export function ActionBadge({ action }: { action: ClaimAction }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium",
        ACTION_CLASS[action],
      )}
    >
      {ACTION_LABEL[action]}
    </span>
  );
}

export function DispositionBadge({ value }: { value: AuditDisposition }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium",
        DISPOSITION_CLASS[value],
      )}
    >
      {DISPOSITION_LABEL[value]}
    </span>
  );
}
