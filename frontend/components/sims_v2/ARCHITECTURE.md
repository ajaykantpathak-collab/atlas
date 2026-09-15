# Sims Architecture — Plan of Record

Status: plan of record, 2026-09-14. This document is the authority on the
three simulation systems in `frontend/`, when to use which, the migration
direction, and the BespokeSimWrapper plan. Counts below were measured on
this tree; where counts drift, the named registry/JSON file is the
authority — not this doc.

---

## 1. The three systems

| | c6_12 bespoke | sims_v2 engine | three/ WebGL |
|---|---|---|---|
| Location | `components/simulations/c6_12/` (725 tsx) + `components/simulations/c6_12_new/` (55 tsx) | `components/sims_v2/` | `components/simulations/three/` |
| Nature | one bespoke React component per sim; hand-written game loop, state, and scoring per file | data-driven `SimDef` objects rendered by one shared player | one WebGL (three.js) component per sim + shared `Sim3DStage.tsx` |
| Count | 780 components; 780 wired `GameMeta` entries | 176 authored SimDefs (classes 1–6) + generated v3/v3w masters for classes 7–12 (`SIM_INDEX.json`: 2374 entries) | 43 sims (44 tsx minus `Sim3DStage.tsx`) |
| Wiring | `lib/c6_12_gameRegistry.ts` → `C6_12_GAMES: GameMeta[]` (`{id, name, emoji, color, nodeIds[], subject, classLevel, component: lazySim(...)}`); first-match node lookup | `components/sims_v2/index.ts` → `ALL_SIMS_V2`, `BY_ID`/`BY_NODE`/`BY_CHAPTER`; route `app/(student)/sims-v2/[id]` renders `SimPlayer(def, senior for ≥6)` | `app/3d-lab/simLoaders.tsx` (dynamic imports, `ssr:false`) + `registryChunk_a/b.ts` |
| Node mapping (backend authority) | `backend/its/competency/SIM_NODE_MAP.json` — 652 mapped (`source: "c6_12_gameRegistry"`) | `components/sims_v2/SIM_NODE_MAP_V2.json` — classes 1–5 use canonical topic keys `g{class}.{slug}` (backend node corpus starts at class 6); class 6: 54 sims → 420 distinct `c6_*` node ids | `backend/its/competency/SIM_NODE_MAP.json` — 36 mapped (`source: "3d_lab"`) |
| Role | **the depth tier**: rich, per-chapter interactive experiences for classes 6–12 | **the growth path**: data-driven pedagogy (see below); a fix to the engine fixes every sim | **the 3D tier**: spatial/3D concepts (crystal lattices, DNA helix, orbits, VSEPR, wave optics) |

### sims_v2 engine in one paragraph

Every sim is a `SimDef`: pure data (`components/sims_v2/engine/types.ts`).
`SimPlayer` (`engine/SimPlayer.tsx`) renders a fixed phase loop —
`intro → discover → teach → explore → observe → predict → play → reflect →
results` — in `junior` mode (classes 1–5: mascot, read-aloud, tap/drag) or
`senior` mode (classes 6–12: KaTeX, math input, hint ladders, linked
sub-parts). Challenges are typed (`mcq | sort | order | count | interact |
math_input | subpart`); `interact` challenges are validated against widget
state (`engine/widgets.tsx` widgets are controlled components reporting
`onChange(state)`, validated by strings like `clock:hour=9,mins=0`).
`NODE_GRAPH.json` + `getPrereqSims`/`getNextSims` give remediation and
"next up" routing from the same prerequisite graph the backend tutor uses.

Sources of generated v2 content (classes 7–12): `npm run sims:build` =
`tools/build_simdefs.mjs` + `tools/wrap_masters.mjs` +
`tools/build_simindex.mjs` + `tools/validate_sims.mjs --new-only`. The
`v3/` + `v3w/` folders per class are GENERATED — never hand-edit them;
edit the masters and rebuild.

---

## 2. When to use which

Decision rule, in order:

1. **Does the concept need real 3D** (spatial structure, orbits,
   molecular geometry)? → **three/**: new `C{class}_{subject}...Sim.tsx`
   in `components/simulations/three/`, built on `Sim3DStage`, wired in
   `app/3d-lab/simLoaders.tsx`, node-mapped into
   `backend/its/competency/SIM_NODE_MAP.json`.
2. **Otherwise, any new sim → sims_v2 `SimDef`.** Author it (classes 1–6
   live in `components/sims_v2/class{n}/`; masters for the 7–12 generated
   pipeline under `tools/authored/`), then rebuild the indexes with
   `npm run sims:build`. No exceptions without lead sign-off.
3. **c6_12 bespoke is frozen.** 780 components stay wired and supported —
   bug fixes only. No new bespoke c6_12 components: they are
   untypechecked (see §5), untemplated, and each one is a private
   architecture. The only escape hatch is a truly one-off deep
   interactive that v2 widgets cannot express and that is not 3D; that
   requires lead sign-off and lands in `c6_12_new/` with a
   `c6_12_gameRegistry` entry.

---

## 3. Migration direction

- **New sims: v2 SimDefs, always** (unless genuine 3D → three/).
- **Generated content flows through the v2 pipeline**: masters →
  `npm run sims:build` → SimDefs → `SIM_INDEX.json`. Class 7–12 v3/v3w
  masters are already the bulk of new v2 volume.
- **c6_12 gets absorbed, not rewritten**: bespoke components will
  register as v2 widgets behind `BespokeSimWrapper` (§4), so routing,
  node mapping, and telemetry treat all sims uniformly. The components
  themselves are not ported.
- **three/ stays a peer tier**, but its sims should also gain a
  `BespokeSimWrapper` registration (same mechanism, `ssr:false` caveat)
  so `getSimsForNode` can return them; today they are only reachable via
  `app/3d-lab`.

---

## 4. BespokeSimWrapper plan (one page)

**Goal:** make every wired c6_12 `GameMeta` visible to the v2 registry
(`getSimsForNode`, `getSimsForChapter`, `NODE_GRAPH` routing) and the v2
phase/telemetry model, without touching the bespoke components.

**Mechanism:**

1. **Wrapper component** `components/sims_v2/engine/BespokeSimWrapper.tsx`:
   - props: `{ gameMetaId: string }` + the v2 widget contract
     (`onChange(state: Record<string, number>)`, `locked?`).
   - resolves the `GameMeta` from `C6_12_GAMES` and lazy-renders its
     `component` full-bleed inside the `SimPlayer` shell.
   - maps bespoke lifecycle → v2 phases: bespoke sims already do their
     own teach/explore/play, so the wrapper runs v2 phases `intro` and
     `results` only, with the bespoke component as the whole middle.
     Completion/score callbacks from the bespoke component are forwarded
     as widget state `bespoke:done=1` (+ `bespoke:score=n` when a score
     exists), which satisfies the engine's `interact` validation.
   - bespoke components that never report completion get a visible
     "Mark done" affordance — honest, not faked.

2. **Registration (generated, not hand-written):** a new
   `tools/build_bespoke_wrappers.mjs` reads `lib/c6_12_gameRegistry.ts`
   (same parser approach as `backend/tools/build_sim_node_map.py`) and
   emits one synthetic `SimDef` per entry:
   - `id: "bespoke.<gameMeta.id>"`, `classLevel`, `subject`, `nodeIds`
     copied verbatim from the `GameMeta`;
   - single challenge: `{ type: "interact", widget: gameMetaId,
     validate: "bespoke:done=1" }`;
   - wired into `ALL_SIMS_V2` via a generated `bespoke_index.ts`.
   Rebuild is deterministic and CI-checkable like the rest of
   `npm run sims:build`.

3. **Player plumbing:** `SimPlayer` sees the `bespoke.` id prefix and
   renders `BespokeSimWrapper` as the widget; nothing else changes —
   phase loop, results, stars, buddy, and telemetry are the standard v2
   ones.

**Rollout:**

1. Pilot: generate wrappers for one wave (e.g. the 55 `c6_12_new`
   components) behind a flag on `app/(student)/sims-v2/[id]`; v1 game
   routes stay live.
2. Compare completion/telemetry parity vs the legacy route.
3. Mass-generate the remaining waves; keep both routes during the
   transition; retire direct game routes only when wrappers carry equal
   traffic.

**Non-goals:** no rewrite of bespoke internals, no new bespoke sims, no
attempt to force bespoke components through junior-mode phases.

---

## 5. Known debts / quality gates

- **Typecheck baseline:** `npx tsc --noEmit` reports ~831 errors from the
  c6_12/c6_12_new corpus (tsconfig excludes `components/simulations`,
  but app/ page imports pull the files in transitively). Two premium
  errors (`components/premium/KnowledgeGraph3DReal.tsx:316,317`) were
  pinned at baseline and have since been FIXED; the gate
  `frontend/scripts/check_types_baseline.mjs` (used by
  `.github/workflows/ci.yml` and `backend/scripts/run_checks.bat`)
  allows only the sim-corpus path prefix and fails on anything new.
  Consequently `npm run build` (Next typechecks at build time) is
  **known-red** and stays an opt-in CI job until the sim corpus is
  cleaned or its imports are quarantined behind lazy boundaries.
- **Wiring audit:** `backend/tools/build_sim_node_map.py` regenerates
  `SIM_NODE_MAP.json` / `UNMAPPED_SIMS.json` from the registry — run it
  when adding sims so backend node coverage stays true.
- **v2 validation:** `npm run sims:build` ends with
  `tools/validate_sims.mjs --new-only`; keep it green.
