# Shared contracts — Agent ↔ Capability ↔ Execution

Cross-team types live here. Import from `@rimvio/shared`.

| File | Owns |
|------|------|
| `capability.ts` | What Rimvio can do |
| `execution.ts` | A single action run inside a loop |
| `verification.ts` | Pass / fail / needs_human before Commit |
| `agent.ts` | Stage boundary (observe → … → commit) |

Change these only when the interface between teams changes, and call it out in the PR.
