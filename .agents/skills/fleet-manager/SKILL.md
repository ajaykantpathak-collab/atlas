---
name: fleet-manager
description: Manage the Atlas agent build fleet at D:\platform — launch fixer/auditor agents, enforce the 6-agent cap, claim protocol, restart locks, timeboxes, kill runaways, and resume killed waves. Use whenever launching subagent waves, coordinating parallel agents, diagnosing stuck or runaway agents, or resuming killed agent work.
---

# Fleet Manager — parallel agent discipline

Max **6 concurrent agents.** This cap exists because exceeding it got every
agent killed by the platform. Count before every launch.

## Agent archetypes
- **AUDITOR** — walks the product, files findings. Never fixes. Finishes by
  producing a report file (their "completion" is a document, not code).
- **FIXER** — claims items from a ledger (BUGS.md / CURRICULUM_GAPS.md), fixes,
  verifies live, mirrors to deploy, logs. One fixer per disjoint workstream.

## Launch protocol
1. Count running agents first. Free slots = 6 − running.
2. Write self-contained prompts: platform path, claim protocol, verification
   standard (Playwright rendered-page checks for UI, curl for APIs — never curl
   for pages), mirror-to-deploy rule, OPS restart-lock rule, zero-wrong rule.
   FE briefs additionally cite the installed ui-skills constraints
   (`.agents/skills/baseline-ui`, `fixing-accessibility`,
   `fixing-motion-performance`, `improve-ui` — pick per task) and require the
   work be reviewed against them; FE ships are gated by `npm run verify`
   (Reticle flows) in `deploy/frontend`.
3. Split workstreams by FILE/domain so parallel agents never edit the same file.
   Define integration contracts upfront (e.g. "story2 exports X, story1 imports
   it with a fallback").
4. Relaunching killed agents: instruct them to check their output files
   (CURRICULUM_GAPS.md sections, report docs) and RESUME, not restart.

## Coordination ledger
`BUGS.md` is the single source of coordination:
- Claim before fixing: retag `- [STUDENT-X]` → `- [claimed-<tag>]` (Edit with the
  full line as old_string — the failing Edit is the collision detector).
- Done: `[fixed-<tag>]` + evidence. Blocked by owner: `[blocked-owner]` + reason.
- Backend restarts: append `- [restart-lock <tag> <HH:MM>]` under `## OPS`,
  restart backends + nginx, verify, clear the lock. Never restart unlocked —
  unlogged restarts kill in-flight requests and trigger index-rebuild CPU storms.
- Stale-copy rule: before docker cp of any backend file, diff repo vs container;
  pull container→repo first if newer (stale pushes reverted live fixes twice).

## Runaway handling
Symptoms: agent hours past its scope, repeating steps, token burn complaint.
1. TaskStop the agent (verify it actually stopped).
2. Audit its leftovers: partial files, half-mirrored deploy changes, open locks.
3. Relaunch tight-scoped with a resume instruction and a HARD checklist.

## Minimal LLM usage & deterministic-first law (Owner Law 2026-10-14)
- **Database & deterministic first**: Ground truth lives in the authored 20,797 curriculum
  nodes and 403,620 board questions. Subagents MUST query local indexes (`load_index()`
  in `enhanced_nodes`), SymPy math/physics engines, exact kernels, and Postgres tables first.
- **Zero LLM hallucinations**: Never invoke LLMs to answer syllabus facts, historical dates,
  scientific formulas, or standard definitions. LLMs hallucinate dates and numbers; ground
  truth lives in the database.
- **Fast model routing**: When natural language parsing strictly requires an LLM, route
  exclusively to fast models (`gemini-3.5-flash` or `gemini-3.1-flash-lite`). Never use slow
  30s timeouts or unauthenticated local endpoints.
- **Every subject has valid Node IDs**: Every subject and every question created, ingested,
  or transformed by any agent MUST carry valid, structured `node_tags` / `node_id`. Null,
  empty `[]`, or unmapped questions fail the gate.

## Verification before declaring a wave done
- Every claim: [fixed-*] with evidence, deploy mirrors diff-identical.
- Post-batch: run Chisel impact mapping (`chisel diff-impact` — project dir
  `D:/platform/deploy`) and run every test it names as impacted — a batch
  cannot ship with its impacted tests unrun (ICE 1.4).
- Run the verify-sweep skill (acceptance checklist) against :3001.
- FE waves: `npm run verify` in deploy/frontend (Reticle saved flows) exits 0.
- Only then: production rebuild via the atlas-deploy skill.
