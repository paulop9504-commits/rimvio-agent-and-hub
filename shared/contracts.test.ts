import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isCapabilityReady } from "./capability.js";
import { isTerminalExecutionStatus } from "./execution.js";
import { canProceed, requiresHuman } from "./verification.js";
import { nextStageAfterExecute } from "./agent.js";

describe("shared contracts", () => {
  it("capability ready gate", () => {
    assert.equal(
      isCapabilityReady({
        id: "1",
        key: "browser",
        title: "Browser",
        status: "ready",
        ownerId: "u",
        createdAt: "",
        updatedAt: "",
      }),
      true,
    );
  });

  it("execution terminal statuses", () => {
    assert.equal(isTerminalExecutionStatus("completed"), true);
    assert.equal(isTerminalExecutionStatus("running"), false);
  });

  it("verification gates", () => {
    assert.equal(
      canProceed({
        id: "v",
        executionId: "e",
        verdict: "pass",
        reason: "ok",
        checkedAt: "",
      }),
      true,
    );
    assert.equal(
      requiresHuman({
        id: "v",
        executionId: "e",
        verdict: "needs_human",
        reason: "pay",
        checkedAt: "",
      }),
      true,
    );
  });

  it("agent stage after execute", () => {
    assert.equal(nextStageAfterExecute("pass"), "commit");
    assert.equal(nextStageAfterExecute("fail"), "repair");
    assert.equal(nextStageAfterExecute("needs_human"), "verify");
  });
});
