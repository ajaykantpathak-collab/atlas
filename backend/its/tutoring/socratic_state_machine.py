"""ARCHIVED STUB -- superseded, do not extend.

``socratic_state_machine.py`` (the Layer-3 per-node INTRODUCE ->
DISCUSSION -> PROBE -> MASTERY loop) was moved to
``backend/_archive/its_tutoring_superseded/socratic_state_machine.py``
on 2026-09-13.

Superseded by the LIVE tutoring surfaces:

  - ``backend/its/tutoring/unified_socratic_engine.py``  (/api/tutor/its/*)
  - ``backend/its/tutoring/socratic_pipeline_integrated.py`` (/api/intelligence/tutor)
  - ``backend/its/solver/tutor.py`` + ``backend/api/competency_tutor.py``
    (/api/tutor-graph/*)

The audit found zero live imports of the original module (only this
stub's own docstring family and the deprecated ``services/`` shim).
Nothing here is importable on purpose -- import one of the live
surfaces above instead.
"""
