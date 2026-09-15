"""generator_registry.py — Uniform adapter over the seeded question generators.

The repo already contains deterministic, seed-parameterized question
generators scattered across ``backend/solvers_regen/<subject>/`` with
inconsistent function names (``generate_questions``, ``generate_question``,
``generate_relation_question``, ...). This registry gives the engagement
layer ONE call shape regardless of subject:

    get_drill_generator(subject: str, class_level: int)
        -> Callable[[int], DrillCandidate | None]

where ``DrillCandidate`` is a normalized dict::

    {
        "question": str,
        "question_type": "mcq" | "numerical" | "short_answer" | ...,
        "options": [...]          # optional, mcq only
        "answer": Any,
        "explanation": str,       # optional
        "skills": [...],          # optional concept tags
        "source": "solvers_regen.maths.class12_maths_solver.generate_relation_question",
    }

Design rules
------------
- Lazy imports with graceful ``None`` fallback: a missing/broken generator
  degrades to "no drill from this source" instead of crashing a quest.
- Determinism is preserved: we never call the generators without an explicit
  seed supplied by the caller (``QuestService`` derives it from
  ``daily_seed(student_id)``).
- The registry is data-driven: adding a subject = adding one line to
  ``_MODULE_MAP``.
"""

from __future__ import annotations

import importlib
import logging
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Tuple

logger = logging.getLogger(__name__)

DrillCandidate = Dict[str, Any]
DrillGenerator = Callable[[int], Optional[DrillCandidate]]


# ---------------------------------------------------------------------------
# Module map — (subject, class_level) -> module path
# Add new generators here; the adapter auto-discovers the entry function.
# ---------------------------------------------------------------------------

_MODULE_MAP: Dict[Tuple[str, int], str] = {
    # maths
    ("maths", 12): "backend.solvers_regen.maths.class12_maths_solver",
    ("maths", 3): "backend.solvers_regen.maths.class3_maths_questions",
    # english
    ("english", 1): "backend.solvers_regen.english.class1_english_questions",
    ("english", 6): "backend.solvers_regen.english.class6_english_questions",
    ("english", 10): "backend.solvers_regen.english.class10_english_solver",
    ("english", 11): "backend.solvers_regen.english.class11_english_questions",
    ("english", 12): "backend.solvers_regen.english.class12_english_questions",
    # evs
    ("evs", 6): "backend.solvers_regen.evs.class6_evs_solver",
    ("evs", 10): "backend.solvers_regen.evs.class10_evs_solver",
    # geography
    ("geo", 7): "backend.solvers_regen.geo.class7_geo_solver",
    ("geo", 12): "backend.solvers_regen.geo.class12_geo_solver",
    # hindi
    ("hindi", 4): "backend.solvers_regen.hindi.class4_hindi_questions",
    # history/civics
    ("histciv", 7): "backend.solvers_regen.histciv.class7_histciv_solver",
    ("histciv", 10): "backend.solvers_regen.histciv.class10_histciv_solver",
    # political science
    ("pol", 11): "backend.solvers_regen.pol.class11_pol_solver",
    # psychology
    ("psy", 12): "backend.solvers_regen.psy.class12_psy_solver",
    # mass media
    ("massmedia", 12): "backend.solvers_regen.massmedia.class12_massmedia_solver",
    # legal studies
    ("legal", 12): "backend.solvers_regen.legal.class12_legal_solver",
    # business studies
    ("bs", 12): "backend.solvers_regen.bs.class12_bs_solver",
}

# Entry-point function names, in priority order. The first callable found on
# the module is used. Signatures accepted (attempted in order):
#   fn(seed: int, count: int = 1, topic: str | None = None) -> list[dict]
#   fn(seed: int) -> dict | list[dict]
_ENTRY_PRIORITY = [
    "generate_questions",
    "generate_question_set",
    "generate_question",
    "generate_n",
]


@dataclass
class DrillSource:
    """A resolved generator binding."""

    subject: str
    class_level: int
    module: str
    fn_name: str
    _fn: Callable = field(repr=False)

    def make(self, seed: int) -> Optional[DrillCandidate]:
        """Generate one normalized drill candidate (never raises)."""
        try:
            out = self._fn(int(seed))
        except Exception as exc:  # noqa: BLE001 — a broken generator must not kill a quest
            logger.warning("generator %s.%s failed on seed=%s: %s",
                           self.module, self.fn_name, seed, exc)
            return None
        return _normalize(out, source=f"{self.module}.{self.fn_name}")


def _normalize(out: Any, source: str) -> Optional[DrillCandidate]:
    """Normalize a generator return value to a DrillCandidate dict."""
    if isinstance(out, list):
        out = out[0] if out else None
    if not isinstance(out, dict):
        return None
    question = out.get("question") or out.get("question_text") or out.get("prompt")
    if not question:
        return None
    return {
        "question": question,
        "question_type": out.get("question_type") or out.get("type") or "short_answer",
        "options": out.get("options"),
        "answer": out.get("answer") or out.get("correct_answer"),
        "explanation": out.get("explanation") or out.get("solution"),
        "skills": out.get("skills") or out.get("concept_tags") or [],
        "source": source,
    }


def _resolve_callable(module_path: str) -> Optional[Tuple[Callable, str]]:
    """Import a generator module and find its entry function."""
    try:
        module = importlib.import_module(module_path)
    except Exception as exc:  # noqa: BLE001
        logger.warning("cannot import generator module %s: %s", module_path, exc)
        return None
    for name in _ENTRY_PRIORITY:
        fn = getattr(module, name, None)
        if callable(fn):
            return fn, name
    # last resort: any module-level fn named generate_*
    for name in sorted(dir(module)):
        if name.startswith("generate_") and callable(getattr(module, name)):
            return getattr(module, name), name
    return None


def get_drill_generator(subject: str, class_level: int) -> Optional[DrillSource]:
    """Resolve the drill generator for a subject/class, or None."""
    module_path = _MODULE_MAP.get((subject.lower(), int(class_level)))
    if not module_path:
        return None
    resolved = _resolve_callable(module_path)
    if not resolved:
        return None
    fn, name = resolved
    return DrillSource(subject=subject.lower(), class_level=int(class_level),
                       module=module_path, fn_name=name, _fn=fn)


def list_supported() -> List[Dict[str, Any]]:
    """All (subject, class) pairs that currently resolve to a live generator."""
    out = []
    for (subject, level) in sorted(_MODULE_MAP):
        src = get_drill_generator(subject, level)
        if src:
            out.append({"subject": subject, "class_level": level,
                        "module": src.module, "fn": src.fn_name})
    return out
