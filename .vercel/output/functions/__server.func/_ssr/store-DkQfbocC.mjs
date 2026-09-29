import { a as actionForStatus } from "./status-DXgq6v-7.mjs";
import { a as SEED_AUDITS } from "./router-Bm2DRonz.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DkQfbocC.js
var useWarrant = create((set) => ({
	audits: SEED_AUDITS,
	addAudit: (audit) => set((state) => ({ audits: [audit, ...state.audits.filter((a) => a.id !== audit.id)] })),
	overrideClaim: (auditId, claimId, status) => set((state) => ({ audits: state.audits.map((audit) => {
		if (audit.id !== auditId) return audit;
		return {
			...audit,
			claims: audit.claims.map((claim) => claim.id === claimId ? {
				...claim,
				status,
				action: actionForStatus(status),
				overridden: true
			} : claim)
		};
	}) }))
}));
//#endregion
export { useWarrant as t };
