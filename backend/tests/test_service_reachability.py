"""
Gate B — service reachability (ATLAS_10x10_PLAN.md §2a).

A service module that no other module imports is dead code that still ships in
the image. It rots silently: `services/streak_service.py` (1,091 lines) was
written against a schema that does not exist and crashed on first use if
anyone ever wired it — it was DELETED 2026-10-05 (audit lane) rather than
exempted, which is the preferred exit. `AuthService.get_children_for_parent`
was the other historical resident.

The gate therefore locks the CURRENT state rather than demanding zero: the
baseline below is the set of known-unwired services, each with a note. A NEW
unreferenced service fails the build; removing one from the list fails it too
(fix the code, don't just silence the gate).
"""

from __future__ import annotations

import re
from pathlib import Path

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
_SERVICES = _BACKEND / "services"

# Services nothing imports, with the reason each is still here. "Unwired" is a
# fact this test proves; the notes are context, not justification.
KNOWN_UNWIRED: dict[str, str] = {
    "board_format": "staged board answer-shape profiles (CBSE vs ICSE/ISC marking contracts); pure data + lookup, awaiting its answer-emission consumer — not on any request path",
    "bloom_marker_parser": "content/corpus tooling (content deferred by directive)",
    "cognitive_diagnosis_engine": "unwired; diagnosis path never mounted",
    "discussion_moments": "unwired feature stub",
    "enrichment_parser": "content/corpus tooling (content deferred by directive)",
    "graph_rag_retriever": "unwired; superseded by plain graph endpoints",
    "kst_path_selector": "unwired; superseded by knowledge_tracing",
    "misconception_matcher": "superseded copy also in _archive/its_tutoring_superseded",
    "photo_input": "unwired multimodal input path",
    "q_matrix_generator": "IRT research tooling, not on a request path",
    "socratic_pipeline": "unwired; socratic stack never mounted",
    "socratic_state_machine": "superseded copy also in _archive/its_tutoring_superseded",
    "synthetic_student": "synthetic data generator, not a request path",
    "unified_socratic_engine": "unwired; socratic stack never mounted",
}

_SKIP_DIR_PARTS = ("_archive", "__pycache__", "content_parsers", "tests")


def _service_modules() -> set[str]:
    return {p.stem for p in _SERVICES.glob("*.py") if p.stem != "__init__.py"}


def _all_backend_source() -> str:
    chunks: list[str] = []
    for path in _BACKEND.rglob("*.py"):
        text_path = str(path)
        if any(part in text_path for part in _SKIP_DIR_PARTS):
            continue
        try:
            chunks.append(path.read_text(encoding="utf-8", errors="ignore"))
        except OSError:
            continue
    return "\n".join(chunks)


def _is_referenced(name: str, source: str) -> bool:
    patterns = (
        rf"services\.{name}\b",
        rf"from\s+{name}\s+import",
        rf"import\s+{name}\b",
        rf"from\s+\.\s*{name}\b",
        # parenthesized multi-line form:  from backend.services import (
        #                                     some_service as alias,
        rf"import\s*\([^)]*\b{name}\b",
    )
    return any(re.search(p, source) for p in patterns)


class TestServiceReachability:
    def test_every_service_is_imported_somewhere(self):
        source = _all_backend_source()
        unwired = sorted(
            name for name in _service_modules() if not _is_referenced(name, source)
        )
        assert unwired == sorted(KNOWN_UNWIRED), (
            "service reachability changed. New unwired service: "
            f"{sorted(set(unwired) - set(KNOWN_UNWIRED))}. "
            f"Resolved/removed: {sorted(set(KNOWN_UNWIRED) - set(unwired))}. "
            "Wire it or update KNOWN_UNWIRED with a reason."
        )

    def test_known_unwired_entries_still_exist(self):
        """Stops the baseline rotting into a permanent exemption list."""
        stale = sorted(set(KNOWN_UNWIRED) - _service_modules())
        assert stale == [], f"baseline lists services that no longer exist: {stale}"

    def test_baseline_is_not_blanket_exemption(self):
        assert len(KNOWN_UNWIRED) < 25, (
            "the unwired list is growing toward 'all services are exempt', "
            "which would make this gate meaningless"
        )


class TestObservabilityWiring:
    """The §3 wiring must not be silently removed."""

    def test_main_wires_observability(self):
        main = (_BACKEND / "main.py").read_text(encoding="utf-8")
        assert "from backend.observability import" in main
        assert "install_rate_limit(app)" in main
        assert "init_sentry(app)" in main
        assert "setup_logging()" in main

    def test_rate_limiter_never_limits_health_probes(self):
        """A 429 on /health reads as 'the service is down' to Docker."""
        obs = (_BACKEND / "observability.py").read_text(encoding="utf-8")
        assert '"/health"' in obs
        assert '"/api/health"' in obs

    def test_rate_limiter_fails_open(self):
        obs = (_BACKEND / "observability.py").read_text(encoding="utf-8")
        assert "never fail the request closed" in obs
