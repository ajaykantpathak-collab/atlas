# Atlas — Verified-Answer Architecture & Roadmap

## Core principle (the non-negotiable)

The LLM never decides what the answer is. It sits in **layer 3** — turning messy input into structure, and structure back into friendly output. Answers come from **layer 1** (authored corpus) or **layer 2** (deterministic compute). Anything the LLM touched must re-derive or match authored ground truth, or it doesn't ship.

```
photo → OCR (tesseract → flash-lite vision fallback) → text
typed → text
        │
        ▼
MiniLM embeddings → top-15 shortlist → Laya re-rank (calibrated P) → concept
        │
        ├─ STEM:     extract/canonicalize → compute → inverse-check → VERIFIED
        ├─ Recall:   authored node/board answer → point-coverage check → MODEL ANSWER
        ├─ Writing:  student attempt → format rubric + marking-point coverage
        │            + 27B grounded evaluation → RUBRIC FEEDBACK
        └─ nothing:  honest refusal + story link to nearest concept
```

## Trust tiers (label honestly in UI)

| Tier | Meaning |
|---|---|
| `VERIFIED` | Deterministic compute chain |
| `VERIFIED (canonicalized)` | LLM-extracted slots, deterministically computed |
| `MODEL ANSWER` | Authored corpus/board key content |
| `RUBRIC FEEDBACK` | AI-scored vs authored marking scheme — never VERIFIED |
| `GUIDED` | Authored method/steps, no final answer |
| Refusal | Honest abstain + story link |

## Model assignments

| Role | Model | Why |
|---|---|---|
| Concept recall (shortlist) | MiniLM-L6-v2 | Free, fast, already deployed |
| Shortlist precision re-rank | Laya (421M, Apache-2.0, self-host) | Calibrated, non-generative, can't hallucinate. Eval first — keep only if it beats embeddings on our corpus |
| Slot extraction (STEM) | gemma-4-26b-a4b-it | Extraction only, never answers |
| OCR fallback + conceptual fallback | gemini-flash-lite-latest | Cheap, vision-capable |
| Grounded evaluation / tutor words | gemma-4-26b or qwen 27B-class | Evaluate against authored truth — never author truth |
| Jev | ❌ rejected | Closed API, paid, our label space ≤15 after shortlist |

## Phase order

### Phase 0 — proof (done)
- [x] Rowlatt test: c10_hist_cbse_02_003 authored content hits all 3 marking points of real CBSE 3-marker. Corpus is sufficient — machinery is the gap.

### Phase 1 — non-STEM verified lane
- [ ] `NONSTEM-1` Marking-point extraction: flatten DIAGNOSTIC_ANSWER_* + WALKTHROUGH into checkable point lists per node; freeze into catalogs (same generate.py pattern — LLM drafts, corpus freezes)
- [ ] `NONSTEM-2` MODEL ANSWER lane: board question → node route → authored answer retrieval + point coverage
- [ ] `NONSTEM-3` Multi-node synthesis: follow FORWARD_NODE_IDS when question spans a chain (Rowlatt→Jallianwala→NCM)
- [ ] `NONSTEM-4` Coverage bench: sample N board questions per subject (hist/geo/eng/hin/eco/psy/soc) → route → marking-point coverage %. The "7455/7455" equivalent for humanities.
- [ ] `NONSTEM-5` Format rubrics for English/Hindi writing: letter/report/notice structure checks (deterministic) + word bands + marking-scheme points

### Phase 2 — Laya referee
- [ ] `LAYA-1` Eval: ~200 routed questions, Laya re-rank vs raw MiniLM top-1. Keep only if precision measurably wins.
- [ ] `LAYA-2` If win: `services/laya_router.py`, vendor weights to `runtime_data/hf_cache` (same pattern as MiniLM)
- [ ] `LAYA-3` `noul` gates: slot-sanity check on canonicalizer output; "is this answer on-topic" check on MODEL ANSWER retrievals

### Phase 3 — photo input
- [ ] `PHOTO-1` `POST /api/solve/image`: tesseract → confidence gate → flash-lite vision fallback → same pipeline
- [ ] `PHOTO-2` Solver UI: upload affordance, tier badges (VERIFIED vs AI explanation), "learn this concept" CTA → node/story link

### Phase 4 — self-healing coverage
- [ ] `QUEUE-1` unanswered → fallback answer → review queue → human promotes into generated catalogs → coverage grows where demand is

### Standing items
- [ ] `TS-1` ~120 residual tsc errors in generated sims (type-level)
- [ ] `FIG-1` figure/diagram solving — roadmap decision pending
- [ ] `HINDI-1` i18n chrome wiring (separate track — user authoring content)

## Verification discipline (same as maths)
Every lane gets a bench with a number: `verified/total`. No claiming coverage without a measured %. Live-verify through the API after every deploy. Honest abstain > wrong answer, always.

## Integration plan (execution order)

1. `model_answer()` upgrade: serve chapter packs (question-level match)
   before node diagnostics; node points = fallback
2. RUBRIC lane: `grade_answer(question, attempt)` — semantic point
   coverage + wrong-signal check + expected_format adherence +
   27B-grounded phrasing. Output tier: RUBRIC FEEDBACK.
3. Deploy: docker up, sync backend files, live-verify solve + model answer
4. PHOTO-1/2: image endpoint (tesseract→flash-lite) + UI upload + badges
5. LAYA-1: re-rank eval vs MiniLM baseline on 200 questions
6. QUEUE-1: unanswered→review→catalog promotion
7. Residual: TS errors, FIG-1 decision, HINDI-1 (user's track)

Generation running: generate.py (key1, node pedagogy) +
generate_chapter_answers.py (key2, ultra-550b, 953 chapters, thinking on,
32k tokens, 10x ultra / 5x super retries).
