# its/tutoring superseded modules — archived 2026-09-13

Moved out of `backend/its/tutoring/` so the folder contains only LIVE
modules (or stubs pointing at live ones).

| Archived file | Original path | Superseded by |
|---|---|---|
| `socratic_state_machine.py` | `backend/its/tutoring/socratic_state_machine.py` | `backend/its/tutoring/unified_socratic_engine.py` (`/api/tutor/its/*`), `backend/its/tutoring/socratic_pipeline_integrated.py` (`/api/intelligence/tutor`), `backend/its/solver/tutor.py` + `backend/api/competency_tutor.py` (`/api/tutor-graph/*`) |
| `misconception_matcher.py` | `backend/its/tutoring/misconception_matcher.py` | `backend/its/solver/misconception_catalog.py` (20-entry deterministic catalog), misconception lanes of `spiral_service.py` / `socratic_pipeline_integrated.py` |

## Import audit at move time

- `socratic_state_machine`: zero live importers. Only references were
  comments (`backend/its/contracts.py`) and the deprecated
  `backend/services/socratic_state_machine.py` shim, which is now a
  docstring-only stub (exports no names).
- `misconception_matcher`: one live import chain existed —
  `backend/routers/tutor.py` (mounted in `main.py` as `tutor_router`)
  → `backend/services/tutor_service.py` → deprecated
  `backend/ai/misconception_matcher` shim → this module. The shim chain
  is left in place but now resolves to a backward-compatibility stub at
  `backend/its/tutoring/misconception_matcher.py` whose `match_misconception`,
  `get_examiner_comments` and `get_remediation_path` are explicit no-ops
  returning the same safe-empty shapes the real module produced when its
  misconception DB tables were empty. `/api/tutor` reply grading wraps the
  matcher in try/except as a nice-to-have, so router behaviour is
  unchanged apart from misconception probing being retired.

Do not import from this folder — see the table above for the live
surfaces.
