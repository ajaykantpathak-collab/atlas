"""answer_telemetry.py — the 14-day test's data plane (COLD-START brief §C).

Every student-facing solve (the ``answer()`` choke point) and every practice
submit emits ONE structured JSONL row to ``<CBSE_DATA_DIR>/ops/
answer_telemetry.jsonl``.  In prod ``CBSE_DATA_DIR`` is the runtime_data
volume (mounted at /app/cbse_data), so the file lands on the host at
``runtime_data/ops/answer_telemetry.jsonl``.

Design law (from the brief):
  * async + fail-safe: a telemetry failure must NEVER break the answer path
    (same contract as _queue_miss in answer_pipeline).
  * append-only: one JSON object per line, no reads, no rewrites.
  * privacy: ``student_hash`` is sha256(student_id)[:16] — never the raw id
    (raw ids are also banned from display, and the digest file must be
    safe to share/analyze).
  * ``llm_used`` is DERIVED from whether a real LLM call actually ran —
    the solver's slot canonicalizer (competency_engine) and the practice
    rubric grader (llm_grader) both flip a contextvar at the real network
    call.  It is never hardcoded: a hardcoded ``false`` would turn the
    zero-LLM proof into a lie (INCORP finding).

Row shape (exactly the brief's contract):
  {ts, student_hash, subject, class, label, llm_used, refusal_reason,
   latency_ms, lane, surface}
"""

from __future__ import annotations

import contextvars
import hashlib
import json
import os
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Optional

# --------------------------------------------------------------------------- #
# Request context (what the HTTP layer knows that answer() does not)
# --------------------------------------------------------------------------- #

_ctx: contextvars.ContextVar[dict[str, Any]] = contextvars.ContextVar(
    "atlas_telemetry_ctx", default={})

# Flipped by the REAL LLM call sites (competency_engine._llm_canonicalize,
# llm_grader.grade). ContextVar so concurrent requests never see each
# other's LLM usage.
_llm_invoked: contextvars.ContextVar[bool] = contextvars.ContextVar(
    "atlas_llm_invoked", default=False)


def bind(**fields: Any) -> None:
    """Bind request-scoped fields (student_id, subject, class_level,
    surface) for the telemetry rows emitted during this request."""
    cur = dict(_ctx.get())
    cur.update({k: v for k, v in fields.items() if v is not None})
    _ctx.set(cur)


def mark_llm_invoked() -> None:
    """Call ONLY from a site that actually sent a prompt to an LLM (the
    network call happened or is in flight). Never call speculatively."""
    _llm_invoked.set(True)


def llm_invoked() -> bool:
    return bool(_llm_invoked.get())


def student_hash(student_id: Any) -> Optional[str]:
    raw = str(student_id or "").strip()
    if not raw:
        return None
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:16]


# --------------------------------------------------------------------------- #
# Append-only JSONL writer (async, fail-safe)
# --------------------------------------------------------------------------- #

_PATH: Optional[str] = None
_EXEC: Optional[ThreadPoolExecutor] = None
_LOCK = threading.Lock()


def _telemetry_path() -> str:
    global _PATH
    if _PATH is None:
        base = (
            os.environ.get("CBSE_DATA_DIR")
            or os.environ.get("RUNTIME_DATA_DIR")
            # native dev fallback: the runtime_data folder next to the repo
            or os.path.join(os.path.dirname(__file__), "..", "..", "..",
                            "runtime_data")
        )
        _PATH = os.path.join(os.path.normpath(base), "ops",
                             "answer_telemetry.jsonl")
    return _PATH


def _write_row(row: dict[str, Any]) -> None:
    """Blocking append — runs on the writer thread only."""
    try:
        path = _telemetry_path()
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(row, ensure_ascii=False, default=str) + "\n")
    except Exception as exc:  # noqa: BLE001 — telemetry must never raise
        print(f"[answer_telemetry] write failed: {exc}", file=sys.stderr)


def _emit(row: dict[str, Any]) -> None:
    """Hand the row to the background writer; never blocks the request."""
    global _EXEC
    try:
        with _LOCK:
            if _EXEC is None:
                _EXEC = ThreadPoolExecutor(
                    max_workers=1, thread_name_prefix="atlas-telemetry")
        _EXEC.submit(_write_row, row)
    except Exception as exc:  # noqa: BLE001
        print(f"[answer_telemetry] submit failed: {exc}", file=sys.stderr)


def _base_row(surface: str) -> dict[str, Any]:
    ctx = _ctx.get()
    return {
        "ts": time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime())
              + f".{int((time.time() % 1) * 1000):03d}Z",
        "surface": surface,
        "student_hash": student_hash(ctx.get("student_id")),
        "subject": ctx.get("subject"),
        "class": ctx.get("class_level"),
    }


# --------------------------------------------------------------------------- #
# Emitters
# --------------------------------------------------------------------------- #

_VERIFIED_LABELS = (
    "VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL",
    "VERIFIED_SEMANTIC")

ROUTE_CAP = 32


def _route_of(audit: Any) -> list[str]:
    route = getattr(audit, "route", None) or []
    return [str(r) for r in list(route)[:ROUTE_CAP]]


def _stage_of(audit: Any) -> Optional[str]:
    route = getattr(audit, "route", None) or []
    return str(route[0]) if route else None


def record_solve(text: str, result: Any, latency_ms: float) -> None:
    """One row per student-facing solve (called from answer()'s choke
    point — every serving path routes through it, so no serving surface
    can skip telemetry)."""
    try:
        row = _base_row("solve")
        label = getattr(result, "label", None)
        audit = getattr(result, "audit", None)
        row.update({
            "label": label,
            "llm_used": llm_invoked(),
            "refusal_reason": getattr(result, "refusal_reason", None),
            "latency_ms": round(float(latency_ms), 1),
            "lane": getattr(audit, "lane", None),
            "verified": bool(label in _VERIFIED_LABELS),
            "route": _route_of(audit),
            "stage": _stage_of(audit),
            # coarse shape only — never the raw question text (privacy:
            # this file must be safe to analyze without a scrub pass)
            "text_len": len(text or ""),
        })
        _emit(row)
    except Exception as exc:  # noqa: BLE001
        print(f"[answer_telemetry] record_solve failed: {exc}", file=sys.stderr)


def record_practice(
    *,
    student_id: Any,
    subject: Any,
    class_level: Any,
    is_correct: bool,
    graded: bool,
    grading: Optional[str] = None,
    llm_graded: bool = False,
    latency_ms: float = 0.0,
    replay: bool = False,
) -> None:
    """One row per practice submit (called from POST /practice/{sid}/submit).

    ``grading`` is the DERIVED lane from _evaluate_answer_detailed:
      "deterministic" | "llm" | "keyword" | "error" — the label maps from
    it so the truth tier can never drift from what actually ran."""
    try:
        ctx = _ctx.get()
        merged_student = student_id if student_id is not None else ctx.get("student_id")
        row = _base_row("practice")
        if not graded:
            label = "UNGRADED"
        elif grading == "llm":
            label = "RUBRIC_LLM"
        elif grading == "keyword":
            label = "RUBRIC_KEYWORD"
        elif grading == "error":
            label = "GRADING_ERROR"
        else:
            label = "DETERMINISTIC"
        row.update({
            "student_hash": student_hash(merged_student),
            "subject": subject if subject is not None else ctx.get("subject"),
            "class": class_level if class_level is not None else ctx.get("class_level"),
            # truth tier of a practice verdict: the grading method IS the
            # honesty label.
            "label": label,
            # DERIVED, never hardcoded: true when the rubric lane ran OR
            # any real LLM call fired during this request.
            "llm_used": bool(
                llm_graded or grading in ("llm", "keyword") or llm_invoked()),
            "refusal_reason": None if graded else "offline_ungraded",
            "latency_ms": round(float(latency_ms), 1),
            "lane": "PRACTICE",
            "grading": grading,
            "correct": None if not graded else bool(is_correct),
            "replay": bool(replay),
        })
        if graded and merged_student and is_correct is not None:
            try:
                try:
                    from backend.its.bkt_engine import bkt_tracker
                except ImportError:
                    from its.bkt_engine import bkt_tracker
                skill = str(subject or "general")
                new_p, bkt_info = bkt_tracker.update(str(merged_student), skill, bool(is_correct))
                row["p_mastery"] = round(new_p, 4)
                row["zpd_tier"] = bkt_info.get("zpd_tier")
            except Exception:
                pass
        _emit(row)
    except Exception as exc:  # noqa: BLE001

        print(f"[answer_telemetry] record_practice failed: {exc}", file=sys.stderr)
