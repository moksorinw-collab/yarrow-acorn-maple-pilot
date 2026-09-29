import { create } from "zustand";
import { SEED_AUDITS } from "./seed";
import { actionForStatus } from "./status";
import type { Audit, Claim, ClaimStatus } from "./types";

type WarrantState = {
  audits: Audit[];
  addAudit: (audit: Audit) => void;
  overrideClaim: (auditId: string, claimId: string, status: ClaimStatus) => void;
};

export const useWarrant = create<WarrantState>((set) => ({
  audits: SEED_AUDITS,
  addAudit: (audit) =>
    set((state) => ({
      audits: [audit, ...state.audits.filter((a) => a.id !== audit.id)],
    })),
  overrideClaim: (auditId, claimId, status) =>
    set((state) => ({
      audits: state.audits.map((audit) => {
        if (audit.id !== auditId) return audit;
        return {
          ...audit,
          claims: audit.claims.map((claim) =>
            claim.id === claimId
              ? ({
                  ...claim,
                  status,
                  action: actionForStatus(status),
                  overridden: true,
                } satisfies Claim)
              : claim,
          ),
        };
      }),
    })),
}));

export function getAudit(id: string): Audit | undefined {
  return useWarrant.getState().audits.find((a) => a.id === id);
}
