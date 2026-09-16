# PIPELINE.md -- upload, calibrate, launch

The backend is a finished pipeline: upload data, run the stages, read
the manifest, launch.  One command runs everything:

    cd D:\platform
    python -m backend.tools.pipeline --stage all

Or stage by stage (all idempotent, all results land in
`cbse_data/pipeline_manifest.json`):

    python -m backend.tools.pipeline --stage ingest-audit   # what exists?
    python -m backend.tools.pipeline --stage mine-openstax  # examples+IR
    python -m backend.tools.pipeline --stage mine-cfq       # bank+keys
    python -m backend.tools.pipeline --stage compile        # MS -> IR
    python -m backend.tools.pipeline --stage validate       # gates+licenses
    python -m backend.tools.pipeline --stage coverage       # S7 register
    python -m backend.tools.pipeline --stage link           # graph (guarded)
    python -m backend.tools.pipeline --stage serve-check    # API smoke
    python -m backend.tools.pipeline --contract             # data contract

## 1. UPLOAD -- where data goes

| You have                        | Put it at                                             |
|---------------------------------|-------------------------------------------------------|
| OpenStax PDFs (OP/print preferred) | D:\KnowledgeBase\OpenStax\*.pdf                    |
| CBSE CFQ/PQ PDFs                | D:\node_generator\ncert-mcp\data\raw\cbse_exam\CompetencyFocused\ |
| Board SQP/MS/PQ papers          | same ncert-mcp raw tree (existing miner)              |
| Curriculum graph (when frozen)  | D:\platform\cbse_data\nodes\graph\ + create empty STABLE.mark |

Image-only PDFs (scans) are detected and skipped honestly; they need
an OCR pass before they contribute.

## 2. CALIBRATE -- the data contract

`python -m backend.tools.pipeline --contract` prints it.  The parts
your team controls:

- **documents/questions/marking_steps/official_answers** rows: required
  columns are starred in the contract; `questions.section` carries the
  chapter; official keys join on (doc_id, qno).
- **Node graph** (for the link stage): `node_metadata.json` with
  `node_id, subject (lowercase_underscored), class_level (int),
  chapter, concept_tags[]` + `node_embeddings.npy` (N x 384, MiniLM
  row-aligned) + an empty `STABLE.mark` file once frozen.  The link
  stage refuses to run without the marker -- deliberate, so a moving
  graph never poisons practice_map.json.
- **Licensing**: the pipeline stamps each OpenStax book's embedded
  license and auto-scrubs restricted renditions to IR-only at
  ingestion.  Nothing to configure; just do not delete the stamp.

Calibration targets to watch in the manifest after each upload:

    mine-openstax  anchor_verified: should climb (650+ today)
    mine-cfq       official_answers: should climb (400+ today)
    validate       gate_passed / irs_checked close to 1.0
                   restricted_files_surface_clean == restricted count
    serve-check    status ok, solver_tier VERIFIED

## 3. LAUNCH -- what runs where

    # backend
    python -m uvicorn backend.main:app --port 8001

    # frontend
    cd D:\platform\frontend && npm run dev

Product surfaces on launch:
- /practice/deterministic -- corpus practice, escrowed checking,
  "one more like this", free-form solver with truth tiers
- /api/practice/deterministic/* -- the same endpoints for any client
- /api/practice/deterministic/cfq/* -- official competency MCQs with
  escrowed official keys (VERIFIED-OFFICIAL tier)

## Guardrails baked in (do not remove)

1. Answers ship only after an attempt (escrow) or under VERIFIED tiers.
2. Restricted-license content renders through the author-first
   renderer only; source text never leaves the corpus files.
3. Tests: `python -m pytest backend/its/tests/ -q` must be green
   before any deploy.  It covers the gates, escrow non-leak,
   determinism, licenses, and the API contract.
