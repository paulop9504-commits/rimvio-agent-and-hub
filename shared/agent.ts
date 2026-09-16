/** Agent contract — plan → execute → verify boundary (no second runtime). */

import type { CapabilityActionRef } from "./capability.js";
import type { ExecutionId, LoopId } from "./execution.js";
import type { VerificationVerdict } from "./verification.js";

export type AgentStage =
  | "observe"
  | "judge"
  | "plan"
  | "execute"
  | "verify"
  | "repair"
  | "commit";

export type AgentRun = {
  id: string;
  loopId: LoopId;
  stage: AgentStage;
  proposedAction: CapabilityActionRef | null;
  lastExecutionId: ExecutionId | null;
  lastVerdict: VerificationVerdict | null;
  updatedAt: string;
};

export type AgentCommand =
  | { kind: "start_loop"; loopId: LoopId; goal: string }
  | { kind: "run_action"; loopId: LoopId; action: CapabilityActionRef }
  | { kind: "verify"; executionId: ExecutionId }
  | { kind: "cancel"; executionId: ExecutionId };

export function nextStageAfterExecute(verdict: VerificationVerdict): AgentStage {
  if (verdict === "pass") {
    return "commit";
  }
  if (verdict === "needs_human") {
    return "verify";
  }
  return "repair";
}
