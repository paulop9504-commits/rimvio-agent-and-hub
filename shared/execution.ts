/** Execution contract — a single run of an action inside a loop. */

import type { CapabilityActionRef } from "./capability.js";

export type ExecutionId = string;
export type LoopId = string;

export type ExecutionStatus =
  | "queued"
  | "running"
  | "waiting"
  | "completed"
  | "failed"
  | "cancelled";

export type Execution = {
  id: ExecutionId;
  loopId: LoopId;
  ownerId: string;
  action: CapabilityActionRef | null;
  status: ExecutionStatus;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ExecutionLogLevel = "info" | "warn" | "error";

export type ExecutionLog = {
  id: string;
  executionId: ExecutionId;
  level: ExecutionLogLevel;
  message: string;
  payload?: Record<string, unknown>;
  createdAt: string;
};

export const TERMINAL_EXECUTION_STATUSES: readonly ExecutionStatus[] = [
  "completed",
  "failed",
  "cancelled",
] as const;

export function isTerminalExecutionStatus(status: ExecutionStatus): boolean {
  return (TERMINAL_EXECUTION_STATUSES as readonly string[]).includes(status);
}
