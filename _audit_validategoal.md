# validateGoal "fail-closed" Audit

**Scope:** `validateGoal(validate, state)` in `frontend/components/sims_v2/engine/widgets.tsx`
**Change under review:** missing state keys previously coerced to `0` via `state[a] ?? 0`; now each rule returns `false` when a referenced key is absent from `state`.
**Verdict:** **SAFE TO SHIP AS-IS** — 0 confirmed breakages, 4 theoretical risks.
**Repo mutation:** this markdown file only. No source file was modified.

---

## 1. Does the implementation actually fail closed? — YES

`frontend/components/sims_v2/engine/widgets.tsx:541-558`

```ts
export function validateGoal(validate: string, state: Record<string, number>): boolean {
    const rules = validate.split(':')[1] ?? '';
    return rules.split(',').every(rule => {
        if (rule.includes('>')) {
            const [a, b] = rule.split('>');
            if (!(a in state) || !(b in state)) return false;   // :546
            return (state[a] ?? 0) > (state[b] ?? 0);
        }
        if (rule.includes('<')) {
            const [a, b] = rule.split('<');
            if (!(a in state) || !(b in state)) return false;   // :551
            return (state[a] ?? 0) < (state[b] ?? 0);
        }
        const [k, v] = rule.split('=');
        if (!(k in state)) return false;                        // :555
        return state[k] === Number(v);
    });
}
```

All three rule forms are guarded, and the guard runs **before** any comparison:

| Rule form | Guard | Line | Fails closed? |
|---|---|---|---|
| `a>b` | `if (!(a in state) \|\| !(b in state)) return false;` | :546 | YES — both operands checked |
| `a<b` | `if (!(a in state) \|\| !(b in state)) return false;` | :551 | YES — both operands checked |
| `k=v`  | `if (!(k in state)) return false;` | :555 | YES — key checked before `=== Number(v)` |

The `?? 0` on lines :547, :552 is now dead code (unreachable after the guard). Harmless, but a mild readability trap: it implies a 0-fallback is still in play. Cosmetic only.

Edge case: a `validate` string with no `:` yields `rules = ''`, so the rule list is `['']`, `k` is `''`, and line :555 returns `false`. Old code also returned `false` (`state[''] === NaN`). **Behavior unchanged.**

### 1a. Which rules can actually change verdict? (behavioral delta analysis)


## 2. Call sites of `validateGoal`

A repo-wide sweep of `D:\platform\frontend` found **zero** callers outside `components/sims_v2`. `frontend/lib/*.ts` and `frontend/app/**` contain no references. `generated/*.ts` (the ~200-file bulk corpus) contains **no `validate:` strings at all** — it is entirely `mcq`-driven and never reaches this function.

| # | File:line | Context | Verdict |
|---|---|---|---|
| 1 | `engine/SimPlayer.tsx:850` | `checkInteract()` — interact challenge grading | **SAFE** |
| 2 | `engine/SimPlayer.tsx:1008` | remediation "Check my fix ✅" button | **SAFE** |
| 3 | `engine/beats.tsx:106` | `MissionBeat` "Check ✅" button | **SAFE** |
| 4 | `SimPlayer.tsx:808` | near-duplicate top-level player, same code | **SAFE** |
| 5 | `SimPlayer.tsx:966` | near-duplicate top-level player, same code | **SAFE** |
| — | `types.ts:97` | comment only (`// validateGoal string`) | n/a |

Import sites: `engine/SimPlayer.tsx:28`, `SimPlayer.tsx:28`, `engine/beats.tsx:12`.

> **Structural note (not a regression):** `sims_v2/SimPlayer.tsx` and `sims_v2/engine/SimPlayer.tsx` are **two different files** with near-identical logic (`fc /b` reports they differ; `engine/` is the longer/newer one). `deploy/` ships only `engine/SimPlayer.tsx`. This duplication predates the change, but a fix applied to one copy silently misses the other.

### Call site 1 — `engine/SimPlayer.tsx:850` (interact challenge)

```
805  const checkInteract = () => {
807      if (!challenge?.interactGoal) return;
850      const ok = validateGoal(challenge.interactGoal.validate, widgetState);
809      if (ok) correct(); else wrong();
```

State source: `widgetState` (`:566`), fed by `onChange={setWidgetState}` on the single widget/lab rendered at `:1042-1044`. Every validate key in the interact corpus maps to a key that widget actually emits. **No missing keys. SAFE.**

### Call site 2 — `engine/SimPlayer.tsx:1008` (remediation)

Widget rendered at `:955-958` (`WIDGETS[labTask.widget]` else `LABS[labTask.widget]`). Remediation `labTask` widgets in the corpus are `heart` and `grow` — both resolve, both emit their slider keys. **SAFE.**

### Call site 3 — `engine/beats.tsx:106` (mission beat)

State source: local `st` (`:89`), fed by `<W onChange={setSt} />` or `<CanvasLab spec={lab} onChange={setSt} />` (`:103`). Widget selection at `:96-97`:

```ts
const preferLab = !junior && !!lab;
const W = preferLab ? undefined : WIDGETS[m.widget];
```


## 3. Key-by-key verification of every validate string in the corpus

`state` is populated on **mount** (via `useEffect`) for all lab/slider widgets, so the key exists before the learner touches anything.

### DOM widgets (`WIDGETS`, `widgets.tsx:522-535`)

| Validate string | Source | Widget reports (on mount?) | Missing keys | Verdict |
|---|---|---|---|---|
| `clock:hour=9,mins=0` | `class1/maths.ts:238` | `ClockFace` → `{hour, mins}` `:28` YES | none | **SAFE** |
| `tray:count=7` | `class1/maths.ts:54` | `CountingTray` → `{count}` `:65` YES | none | **SAFE** |
| `tray:count=12 / 15 / 20 / 8 / 6` | `maths.ts:114,171,349,402,447` | same | none | **SAFE** |
| `tray:count=4/5/6/9` | class2-9 corpus | same | none | **SAFE** |
| `balance:left=5,right=5` | `class1/maths.ts:295` | `BalanceScale` → `{left, right}` `:122` YES | none | **SAFE** |
| `balance:right>left` | class2-9 corpus | same, both keys | none | **SAFE** |
| `purse:total=10` | `class1/maths.ts:498` | `CoinPurse` → `{total, coins}` `:159` YES | none | **SAFE** |
| `bundles:tens=3,ones=4` / `tens=5,ones=2` | class2-9 corpus | `Bundles` → `{tens, ones, total}` `:189` YES | none | **SAFE** |
| `numberline:pos=7` | class1 maths corpus | `NumberLine` → `{pos}` `:90` YES | none | **SAFE** |
| `match:correct=3` | `class1/nipun.ts:48` | `MatchPairs` → `{matched, correct, total}` `:299` YES | none | **SAFE** |
| `order:correct=3` | `class1/nipun.ts:96` | `OrderSteps` → `{correct, total}` `:343` YES | none | **SAFE** |
| `trace:score>60` | `class1/language.ts:61,253` | `TracePad` → **on mount: NO** | `score` absent until first stroke | **SAFE** — see §3.1 |
| `fluency:level>0` | class2-9 corpus | `FluencyMeter` → **on mount: NO** | `level` absent until "Done reading" | **SAFE** — see §3.1 |

### Canvas labs (`LABS`, `canvasLab.tsx:5818+`) — all emit every slider id on mount via `useState` init (`:5647-5651`) + `onChange` effect (`:5728/5749/5753`)

| Validate string | Lab | Slider key(s) | Missing keys | Verdict |
|---|---|---|---|---|
| `jump:pos=8` | `jump` :5835 | `pos` | none | **SAFE** |
| `jump:pos=6 / 7 / 9` | `jump` | `pos` | none | **SAFE** |
| `cycle:heat=70,time=85` | `cycle` :5852 | `heat`,`time` | none | **SAFE** |
| `grow:sun=60,water=90` | `grow` :5824 | `sun`,`water` | none | **SAFE** |
| `grow:sun=80,water=80` | `grow` :5824 | `sun`,`water` | none | **SAFE** |
| `grow:sun=60` | `grow` :5824 | `sun` | none | **SAFE** |
| `heart:rate=80` | `heart` :5874 | `rate` | none | **SAFE** |
| `circuit:switch=1` | `circuit` :5879 | `switch`,`voltage` | none | **SAFE** |
| `flow:stage=80` | `flow` :5981 | `stage` | none | **SAFE** |
| `dna:unzip=70` | `dna` :5984 | `unzip` | none | **SAFE** |
| `graph:slope=75` | `graph` | `slope` | none | **SAFE** |
| `molecule:atoms=4` | `molecule` :6025 | `atoms` | none | **SAFE** |
| `fraction:parts=4` | `fraction` :5846 | `parts`,`shaded` | none | **SAFE** |

### 3.1 Widgets that do NOT report on mount — examined, both SAFE

These were my primary suspects per the task brief.

**`TracePad` (`widgets.tsx:371-469`) — no `onChange` on mount.** `onChange` fires only inside `report()` (`:404-408`, invoked from `up` at `:429`) and `clear()` (`:430`). So `state` is `{}` until the child lifts a pointer.
- Validate: `trace:score>60` (`class1/language.ts:61,253`).
- Old code with `{}`: `undefined ?? 0` → `0 > 60` → **false**. New code with `{}`: `'score' in {}` → **false**. **Identical.**
- The goal is genuinely reachable: the learner traces the guide letter, `report()` fires, `score` lands in state. The change does not make it unpassable.
- Same for `clear()` → `{covered:0, total:cells, score:0, strokes}` — `score` present, `0 > 60` false. Correct.

**`FluencyMeter` (`widgets.tsx:475-519`) — no `onChange` on mount.** `onChange` fires only in `stop()` (`:494`) → `{wpm, secs, words, level}`.
- Validate: `fluency:level>0`.
- Old with `{}`: `0 > 0` → **false**. New with `{}`: **`false`**. **Identical.**
- Reachable: learner starts (`:502`) then taps "Done reading" (`:508`) → `stop()` populates `level`. Passes when `wpm >= 60`.

Both are `>`-form rules, which is exactly why the `?? 0` removal is a no-op for them. Had either been authored as `trace:score=0` or `fluency:level=0`, this change **would** have hard-broken them. See Risk R1.

### 3.2 `mins` and `right`/`left` — explicitly checked per the brief

- **`mins`** — only appears in `clock:hour=9,mins=0` (`class1/maths.ts:238`). `ClockFace` emits `mins` on mount at `widgets.tsx:28` alongside `hour` in the same object literal. Never absent. Reachable: `mins` starts at 0 and `+15 min` steps 0→15→30→45→0, so `mins=0` is the initial state; `hour` cycles `(h % 12) + 1` from 7, so 9 is two taps away. **SAFE.**
- **`left` / `right`** — appear in `balance:left=5,right=5` and `balance:right>left`. `BalanceScale` emits `{ left, right }` together at `widgets.tsx:122`. Both keys are structurally inseparable (one object literal, one effect), so neither can be present without the other. `left` starts at 2, `right` at 5; the `+` buttons are unbounded, so `left=5,right=5` is reachable, and `right>left` holds from the start. **SAFE.**

## 4. Risks (all theoretical; none currently fires)

**R1 — THEORETICAL RISK: mount-silent widgets + any future `k=0` rule.**
`TracePad` and `FluencyMeter` are the only widgets that skip `onChange` on mount. They are safe *only* because their rules use `>` form. If anyone authors `trace:score=0` or `fluency:level=0`, or changes `score>60` to `score=60`, the mount-silent path combined with fail-closed becomes **unconditionally unpassable** — the learner has no way to inject a `0`. Recommend a mount-time `onChange` in both as defense-in-depth. Low priority; not a ship blocker.

**R2 — THEORETICAL RISK: `setWidgetState` REPLACES, it does not merge.**
`widgetState` is a single `Record` shared across the explore, remediation, and interact phases (`:923`, `:955-958`, `:1020`, `:1042-1044`), and every widget calls `onChange` with a *fresh, complete* object literal. Because most widgets re-report on mount, a phase change overwrites stale state correctly. Two concrete consequences:
- `score` is emitted by **both** `WriterStudio` (`:251`, `{score, words}`) and `TracePad` (`:407`, `{covered,total,score,strokes}`). A stale `score` from a prior writer widget would be read by a trace goal. Mitigated because `TracePad`'s threshold is 60 (a stale writer score is 0-5, so `5 > 60` is false) and because `WriterStudio` re-reports `{score:0,words:0}` on mount. Safe today, fragile if thresholds move.
- `total` is emitted by `CoinPurse`, `Bundles`, `MatchPairs`, `OrderSteps`, and `TracePad` alike. No corpus rule reads `total`, so no impact.

**R3 — THEORETICAL RISK: unmapped widget key renders nothing → always fail.**
If `WidgetFor` is in neither `WIDGETS` nor `LABS`, the `:1038` gate `(Widget || LabFor)` is false and nothing renders, leaving `widgetState` at `{}` → fail-closed returns `false` forever. Previously an `=0` rule would have silently passed. I verified **all** 19 mission widgets and all interact/remediation widgets resolve to a real spec, so this does not fire today. A runtime guard or dev-time assertion on `WidgetFor` would close it.

**R4 — THEORETICAL RISK: diagram labs (`dgm_*`) have zero sliders.**
~60 `dgm_*` entries in `LABS` (`canvasLab.tsx:6085+`) declare **no** `sliders`, so `vals` initializes to `{}` and `onChange` only ever emits `{}` plus `sel`/`seen_N` from hotspot taps (`:5705`). They are driven by `hotspots`, not sliders. **No `dgm_*` lab appears in any `validate:` string in the corpus** — I checked all of them. If one is ever wired to a validate goal it will be unpassable under fail-closed. Also note `:5705` injects a numeric `sel` (an index, possibly `-1`) into a `Record<string, number>` — a latent type smell independent of this change.

---

## 5. Deploy sync — IN SYNC

Byte-compared with `fc /b`:

| File | Result |
|---|---|
| `frontend/.../sims_v2/engine/widgets.tsx` vs `deploy/.../engine/widgets.tsx` | **no differences encountered** |
| `frontend/.../sims_v2/engine/SimPlayer.tsx` vs `deploy/.../engine/SimPlayer.tsx` | **no differences encountered** |
| `frontend/.../sims_v2/engine/beats.tsx` vs `deploy/.../engine/beats.tsx` | **no differences encountered** |

The fail-closed change is present **identically** in both trees (verified by reading `widgets.tsx:541-558` from each path). `deploy/` ships only `engine/SimPlayer.tsx`; the top-level `sims_v2/SimPlayer.tsx` has no deploy counterpart — pre-existing structural difference, unrelated to this change.

---

## 6. Bottom line

- **`validateGoal` fails closed correctly for all three rule forms** — `>` (`:546`), `<` (`:551`), `=` (`:555`). The guard precedes the comparison in every branch. The `?? 0` on `:547`/`:552` is now dead code (cosmetic).
- **The only behavioral delta in the entire corpus is `clock:hour=9,mins=0`**, and `ClockFace` reports `mins` on mount, so even that is unchanged. Every other rule resolves identically under old and new logic.
- **5 call sites, all SAFE. 0 CONFIRMED BREAKAGE.** Every validate key across all 25+ distinct validate strings is backed by a key its widget actually emits. No goal is unreachable.
- **SAFE TO SHIP AS-IS.** The change strictly removes a fail-open hole (`k=0` passing with no interaction) and introduces no fail-closed regression in the current corpus.
- **Deploy copy is in sync** with the working tree for all three touched files.

**Recommended (non-blocking) follow-ups:** mount-time `onChange` in `TracePad` and `FluencyMeter` (R1); reconcile the duplicated `sims_v2/SimPlayer.tsx` vs `sims_v2/engine/SimPlayer.tsx` (genuinely different files — a future fix to one will miss the other); drop the now-dead `?? 0` on `:547`/`:552`.

  - Note: `balance` is the one key present in **both** registries — `WIDGETS.balance` = `BalanceScale` (`:528`) and `LABS.balance` (`:5840`, sliders `left`/`right`). `SimPlayer:1042` gives seniors the lab and juniors the DOM widget. Both emit `left`+`right`, so the branch is verdict-neutral. **SAFE.**

---

| `atom:electrons=4` | `atom` :5895 | `electrons` | none | **SAFE** |
| `orbit:speed=50 / 80` | `orbit` :5858 | `speed` | none | **SAFE** |
| `ph:probe=25` | `ph` :6005 | `probe` | none | **SAFE** |
| `prism:angle=60` | `prism` :5900 | `angle` | none | **SAFE** |
| `reflex:speed=70` | `reflex` :5995 | `speed` | none | **SAFE** |
| `solid:radius=60` | `solid` :6030 | `radius`,`height` | none | **SAFE** |
| `supply:demand=80` | `supply` :5989 | `supply`,`demand` | none | **SAFE** |
| `timeline:year=80` | `timeline` :5976 | `year` | none | **SAFE** |
| `unitcircle:angle=50` | `unitcircle` :6036 | `angle` | none | **SAFE** |
| `wave:amplitude=80` | `wave` | `amplitude` | none | **SAFE** |

**Every validate key in the corpus is backed by a key the widget actually emits. Zero missing keys. Zero unreachably-passing goals.**

---

Rendered at `:103` as `W ? <W/> : lab ? <CanvasLab/> : null` — so a junior on a LABS-only widget (e.g. `grow`, `heart`) correctly falls through to `CanvasLab`. I verified all 19 mission widgets used in the corpus (`atom, balance, circuit, dna, flow, fraction, graph, grow, heart, molecule, orbit, ph, prism, reflex, solid, supply, timeline, unitcircle, wave`) exist in `LABS` (`canvasLab.tsx:5818+`). **No unmapped widget. SAFE.**

---

The `?? 0` fallback only ever produced a *different* answer in one narrow case:

- **`a>b`, both keys missing** — old: `0 > 0` → `false`. New: `false`. **Identical.**
- **`a>b`, only `b` missing** — old: `state[a] > 0`, which *could* be `true`, but that was the fail-**open** bug being fixed, and no corpus rule hits it. New: `false`.
- **`a<b`, keys missing** — old: `0 < 0` → `false`; or `state[a] < 0` → `false` for non-negative a. New: `false`. **Identical.**
- **`k=v` where `v != 0`** — old: `0 === v` → `false`. New: `false`. **Identical.**
- **`k=v` where `v == 0`** — old: `0 === 0` → **`true` (fail-open!)**. New: `false`. **CHANGED — the only real behavioral delta.**

So the change is a no-op for every rule form *except* `k=0`, which is precisely the "press Done without doing it" hole the hardening targets. Corpus sweep for `=0`-style rules returned exactly one hit:

```
clock:hour=9,mins=0     <- the ONLY =0 rule in the entire sims_v2 tree
```

`class1/maths.ts:238` — `widget: 'clock'`, and `ClockFace` reports `{ hour, mins }` unconditionally on mount (`widgets.tsx:28`, `useEffect(..., [hour, mins, onChange])`). `mins` is always present. **The one rule that could have regressed does not.**

---
