"""Deprecated shim -- the module behind this name is ARCHIVED.

``misconception_matcher`` moved to
backend/_archive/its_tutoring_superseded/misconception_matcher.py on
2026-09-13 (superseded by its/solver/misconception_catalog.py and the
misconception lanes of spiral_service.py / socratic_pipeline_integrated.py).
The audit found no live importers of this shim, so it is a
docstring-only stub: it exports no names (any `from ... import X`
on it raises ImportError by design).
The still-importable no-op stub lives at
backend/its/tutoring/misconception_matcher.py (kept only so the
deprecated backend/ai/misconception_matcher re-export used by
services/tutor_service.py stays importable).
"""
