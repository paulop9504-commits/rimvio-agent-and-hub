import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { describeBackend, previewAgentStage } from "./index.js";

describe("backend", () => {
  it("describes package", () => {
    assert.equal(describeBackend(), "rimvio-backend");
  });

  it("previews agent stage from verify command", () => {
    assert.equal(
      previewAgentStage({
        kind: "verify",
        executionId: "e1",
      }),
      "commit",
    );
  });
});
