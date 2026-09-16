/** Verification contract — before Commit / dangerous side effects. */

import type { ExecutionId } from "./execution.js";

export type VerificationVerdict = "pass" | "fail" | "needs_human";

export type Verification = {
  id: string;
  executionId: ExecutionId;
  verdict: VerificationVerdict;
  reason: string;
  checkedAt: string;
};

export function requiresHuman(verification: Verification): boolean {
  return verification.verdict === "needs_human";
}

export function canProceed(verification: Verification): boolean {
  return verification.verdict === "pass";
}
