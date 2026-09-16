import { nextStageAfterExecute, type AgentCommand } from "@rimvio/shared";

/** Backend entry — Agent/Capability/Execution services plug in here. */
export function describeBackend(): string {
  return "rimvio-backend";
}

export function previewAgentStage(command: AgentCommand): string {
  if (command.kind === "verify") {
    return nextStageAfterExecute("pass");
  }
  return "observe";
}
