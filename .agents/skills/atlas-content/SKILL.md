---
name: atlas-content
description: Add or ingest curriculum content into the Atlas CBSE platform (D:\platform) — new NCERT chapters, Hindi subjects, topic nodes, or Classes 1-5 junior games. Use whenever the user mentions adding content, new chapters, NCERT topics, ingesting writer content, filling curriculum gaps, or authoring new educational material for Atlas.
---

# Atlas Content Pipeline

Add curriculum content to Atlas with zero-wrong verification. One rule above all:
**every fact must be verifiable against authoritative sources (NCERT/CBSE syllabus),
and every derived word/number must trace to an authored file.** Never invent facts.

## Pipeline overview

1. Author content in the canonical format (see references)
2. Place files in the canonical tree: `deploy/content/enhanced_nodes_md/`
3. Rebuild the index ONCE (in backend-1, ~85s; copy cache JSON+pickle to backend-2)
4. Deploy code changes via docker cp + OPS restart-lock (see references/deploy-flow.md)
5. Verify live on :3001/:80, mirror everything to the root tree

## Senior corpus (Classes 6-12): one md file = one topic node

Read `references/node-format.md` for the exact section spec
(ELI5 / DEFINITION / WALKTHROUGH / DIAGNOSTIC_Q&A ≥6 / COMMON_MISCONCEPTION /
ON_FAILURE / WORKED_EXAMPLE / PREREQUISITE_NODE_IDS).
File naming: `<class>_<subject>_cbse_<chapter>_<serial>.md`.
Canonical priority: `deploy/content/enhanced_nodes_md/` (never the stale
`content/md_cache` Desktop-era snapshot).

## Junior games (Classes 1-5): one JSON = one game

Read `references/junior-games.md` for the GameData spec (5 slides + 8 challenges,
named mascots, subject-detection via `getSubjectKey` in app/play/page.tsx).
Files: `frontend/public/data/games/c<N>_<Name>Game.json` + register in
`_manifest.json`. Mirror to `deploy/frontend/public/data/games/`.

## Quality gates — run ALL before declaring done

- `verify_gen_corpus.py` pattern: every word ≥4 chars and every number in derived
  content must exist in the source file (fidelity verifier; Devanagari-aware for Hindi)
- **Node ID mandate**: Every subject and every question in the database or corpus MUST
  have valid `node_tags` / `node_id`. Zero unmapped or null node questions permitted.
- **Minimal LLM usage**: Use deterministic extraction and database grounding; never use
  LLMs to generate unanchored facts or dates. For below 75% match, stamp the official AI
  disclaimer banner.
- Schema validation for junior games: 5 slides, 8 challenges, options ≥3,
  answer ∈ options, sort challenges have sortItems+bins
- Answer self-consistency: no ambiguous items, no duplicate options, correct
  answer always present
- Live verification: enrichment/questions endpoints return the new content on
  :3001, Story/practice boot for new nodes

## Known traps

- CACHE_VERSION must bump in `enhanced_nodes.py` whenever the parser changes
  (else stale index caches load silently)
- `content/md_cache` is a dead Desktop-era snapshot — never read from it
- `_CORPUS_SUBJECTS` aliases in question_selector must include the new subject
  code or practice/diagnostics serve zero corpus rows
- Board/account content historically leaked across grades — class-gate everything

## Current gap priorities

Read `CURRICULUM_GAPS.md` — it holds the per-class gap list from the 6-student
curriculum audit (author new chapters only where the owner approved authoring).
