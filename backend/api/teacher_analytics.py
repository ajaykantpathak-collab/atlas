"""
Teacher Analytics API — read-only class-level aggregates over the
tutor's persisted per-student state.

Endpoints
─────────
GET /api/teacher-analytics/overview     Class mastery + cohort gap report

Data sources (all read-only, no auth-walled student data is mutated):
- backend/_cache/tutor_students.json     the tutor's per-student model
                                         (mastery map, attempts, mistake
                                         book) — the same store behind
                                         /api/tutor-graph/progress
- backend/its/competency/catalog_*.json  concept metadata (title, class,
                                         subject, chapter)
- backend/its/competency/SIM_NODE_MAP.json  node-graph ↔ simulation map
                                         (which sim covers which node)

Honesty contract: every number in the response is computed from the
files above. When a metric has no underlying data it is returned as
null / an empty list — never simulated. A missing or unreadable store
yields ``has_data: false`` with empty rows so the UI can show an honest
empty state.
"""

from __future__ import annotations

import json
import logging
import os
import threading
from collections import defaultdict
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Query

router = APIRouter(prefix="/api/teacher-analytics", tags=["teacher-analytics"])

logger = logging.getLogger("api.teacher_analytics")

_HERE = os.path.dirname(os.path.abspath(__file__))
_STUDENT_STORE = os.path.normpath(
    os.path.join(_HERE, "..", "_cache", "tutor_students.json"))
_COMPETENCY_DIR = os.path.normpath(
    os.path.join(_HERE, "..", "its", "competency"))
_SIM_NODE_MAP_PATH = os.path.join(_COMPETENCY_DIR, "SIM_NODE_MAP.json")

# Same thresholds the tutor engine uses (MASTERY_PASS) plus a weak band.
MASTERY_PASS = 0.75
MASTERY_WEAK = 0.5

_MATCH_RANK = {"exact": 0, "strong": 1, "weak": 2}


# ── read-only loaders (cached: the sources are files, not DB rows) ──────

_concept_meta_cache: Optional[dict[str, dict[str, Any]]] = None
_concept_meta_lock = threading.Lock()
_sims_cache: Optional[dict[str, list[dict[str, Any]]]] = None


def _concept_meta() -> dict[str, dict[str, Any]]:
    """concept_id -> {title, class, subject, chapter, catalog}.

    Reads the competency catalogs the tutor itself loads (catalog_*.json).
    Cached in-process (single-flight lock so concurrent first requests
    don't each scan the directory) — the catalogs are static content.
    A background prewarm thread runs at import so the ~1200-file scan
    overlaps server startup instead of a teacher's first request.
    """
    global _concept_meta_cache
    if _concept_meta_cache is not None:
        return _concept_meta_cache
    with _concept_meta_lock:
        if _concept_meta_cache is not None:
            return _concept_meta_cache
        meta: dict[str, dict[str, Any]] = {}
        try:
            names = sorted(os.listdir(_COMPETENCY_DIR))
        except OSError:
            names = []
        for fname in names:
            if not (fname.startswith("catalog_") and fname.endswith(".json")):
                continue
            try:
                with open(os.path.join(_COMPETENCY_DIR, fname),
                          encoding="utf-8") as fh:
                    cat = json.load(fh)
            except Exception:
                continue
            if not isinstance(cat, dict):
                continue
            for c in cat.get("concepts", []) or []:
                cid = c.get("id") if isinstance(c, dict) else None
                if cid and cid not in meta:
                    meta[str(cid)] = {
                        "title": str(c.get("title", "") or ""),
                        "class": cat.get("class"),
                        "subject": str(cat.get("subject", "") or ""),
                        "chapter": cat.get("chapter"),
                        "catalog": fname,
                    }
        _concept_meta_cache = meta
        return meta


def _sims_by_catalog() -> dict[str, list[dict[str, Any]]]:
    """catalog filename -> sims mapped to it by the node graph.

    SIM_NODE_MAP.json is the node-graph ↔ sim bridge: each entry lists
    the enhanced-graph nodeIds a simulation covers plus the competency
    catalogs (chapters) its content overlaps.  Grouping by catalog lets
    a weak concept resolve to the sims that teach its chapter.
    """
    global _sims_cache
    if _sims_cache is not None:
        return _sims_cache
    out: dict[str, list[dict[str, Any]]] = defaultdict(list)
    try:
        with open(_SIM_NODE_MAP_PATH, encoding="utf-8") as fh:
            entries = json.load(fh)
    except Exception:
        entries = None
    if isinstance(entries, list):
        for e in entries:
            if not isinstance(e, dict) or not e.get("simId"):
                continue
            rec = {
                "sim_id": str(e["simId"]),
                "match_strength": e.get("matchStrength") or "weak",
                "subject": e.get("subject"),
                "chapter": e.get("chapter"),
                "node_ids": [str(n) for n in (e.get("nodeIds") or [])][:12],
            }
            for ref in e.get("catalogRefs") or []:
                cat = (ref or {}).get("catalog")
                if cat:
                    out[str(cat)].append(rec)
        # dedupe + strongest-first
        for cat, sims in out.items():
            seen: set[str] = set()
            uniq: list[dict[str, Any]] = []
            for s in sims:
                if s["sim_id"] in seen:
                    continue
                seen.add(s["sim_id"])
                uniq.append(s)
            uniq.sort(key=lambda s: _MATCH_RANK.get(
                str(s.get("match_strength")), 3))
            out[cat] = uniq[:6]          # top handful is all a teacher needs
    _sims_cache = dict(out)
    return _sims_cache


def _load_students() -> Optional[dict[str, Any]]:
    """Raw per-student state, or None when the store is unavailable."""
    try:
        with open(_STUDENT_STORE, encoding="utf-8") as fh:
            data = json.load(fh)
    except FileNotFoundError:
        return None
    except Exception:
        logger.warning("teacher_analytics: unreadable student store",
                       exc_info=True)
        return None
    return data if isinstance(data, dict) else {}


def _prewarm() -> None:
    """Scan the static metadata files once, in the background, so the
    first teacher request doesn't pay the ~20s catalog scan."""
    try:
        _concept_meta()
        _sims_by_catalog()
    except Exception:
        logger.warning("teacher_analytics: prewarm failed", exc_info=True)


# daemon thread: started at router import (uvicorn imports backend.main
# before binding), so the scan overlaps server startup
threading.Thread(target=_prewarm, daemon=True,
                 name="teacher-analytics-prewarm").start()


# ── aggregation ─────────────────────────────────────────────────────────

def _empty_overview(reason: str) -> dict[str, Any]:
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source": os.path.basename(_STUDENT_STORE),
        "has_data": False,
        "reason": reason,
        "students": {"tracked": 0, "active": 0},
        "cohort": {"avg_mastery": None, "total_attempts": 0,
                   "open_mistakes": 0},
        "classes": [],
        "roster": [],
        "weakest_concepts": [],
    }


@router.get("/overview")
async def overview(
    roster_limit: int = Query(50, ge=1, le=500,
                              description="Max student rows returned"),
    weak_limit: int = Query(8, ge=1, le=25,
                            description="Max weakest-concept rows returned"),
) -> dict[str, Any]:
    """Class mastery overview + cohort gap report.

    Aggregates the tutor's persisted per-student state into per-student
    mastery rows, the weakest concepts across the class (ranked by the
    mistake book — real recorded wrong answers), and, per weak concept,
    the simulations whose node-graph mapping covers its chapter.
    """
    raw = _load_students()
    if raw is None:
        return _empty_overview("student_data_unavailable")
    if not raw:
        return _empty_overview("no_student_data_yet")

    meta = _concept_meta()
    sims_by_cat = _sims_by_catalog()

    roster: list[dict[str, Any]] = []
    concept_stats: dict[str, dict[str, Any]] = defaultdict(
        lambda: {"mastery_sum": 0.0, "mastery_n": 0, "attempts": 0,
                 "mistakes": 0, "students": set()})
    cohort_mastery_sum = 0.0
    cohort_mastery_n = 0
    total_attempts = 0
    total_open_mistakes = 0
    active = 0
    class_buckets: dict[str, dict[str, float]] = defaultdict(
        lambda: {"students": 0.0, "mastery_sum": 0.0, "mastery_n": 0.0,
                 "attempts": 0.0})

    for sid, st in raw.items():
        if not isinstance(st, dict):
            continue
        mastery: dict[str, Any] = st.get("mastery") or {}
        attempts: dict[str, Any] = st.get("attempts") or {}
        mistakes: list[Any] = st.get("mistakes") or []
        if not (mastery or attempts or mistakes):
            continue                       # student never practised
        active += 1

        att_total = sum(int(a) for a in attempts.values()
                        if isinstance(a, (int, float)))
        mastered = sum(1 for m in mastery.values()
                       if isinstance(m, (int, float)) and m >= MASTERY_PASS)
        weak_n = sum(1 for m in mastery.values()
                     if isinstance(m, (int, float)) and m < MASTERY_WEAK)
        avg_m = (round(sum(mastery.values()) / len(mastery), 4)
                 if mastery else None)

        # dominant class level = the class most of this student's touched
        # concepts belong to (the store carries no roster of its own)
        level_votes: dict[str, int] = defaultdict(int)
        for cid in mastery:
            m = meta.get(cid)
            if m and m.get("class") is not None:
                level_votes[str(m["class"])] += 1
        level = (sorted(level_votes.items(), key=lambda kv: -kv[1])[0][0]
                 if level_votes else None)

        roster.append({
            "student_id": sid,
            "class_level": level,
            "attempts": att_total,
            "concepts_touched": len(mastery),
            "avg_mastery": avg_m,
            "mastered": mastered,
            "weak_concepts": weak_n,
            "open_mistakes": len(mistakes),
        })

        if avg_m is not None:
            cohort_mastery_sum += avg_m
            cohort_mastery_n += 1
        total_attempts += att_total
        total_open_mistakes += len(mistakes)

        if level is not None:
            b = class_buckets[level]
            b["students"] += 1
            if avg_m is not None:
                b["mastery_sum"] += avg_m
                b["mastery_n"] += 1
            b["attempts"] += att_total

        for cid, m in mastery.items():
            s = concept_stats[cid]
            if isinstance(m, (int, float)):
                s["mastery_sum"] += m
                s["mastery_n"] += 1
            s["attempts"] += int(attempts.get(cid, 0) or 0)
        for mk in mistakes:
            if isinstance(mk, dict) and mk.get("concept_id"):
                s = concept_stats[str(mk["concept_id"])]
                s["mistakes"] += 1
                s["students"].add(sid)

    roster.sort(key=lambda r: (
        -(r["open_mistakes"]),
        -(r["attempts"]),
    ))

    def _weakness_key(cid: str, s: dict[str, Any]) -> tuple:
        avg = (s["mastery_sum"] / s["mastery_n"]) if s["mastery_n"] else None
        # most recorded wrong answers first, then lowest mastery,
        # then most students hit
        return (-s["mistakes"], avg if avg is not None else 2.0,
                -len(s["students"]))

    weakest: list[dict[str, Any]] = []
    for cid, s in sorted(concept_stats.items(), key=lambda kv: _weakness_key(*kv)):
        if len(weakest) >= weak_limit:
            break
        m = meta.get(cid) or {}
        sims = sims_by_cat.get(str(m.get("catalog")), []) if m else []
        avg = (round(s["mastery_sum"] / s["mastery_n"], 4)
               if s["mastery_n"] else None)
        weakest.append({
            "concept_id": cid,
            "title": m.get("title") or cid,
            "class": m.get("class"),
            "subject": m.get("subject"),
            "chapter": m.get("chapter"),
            "students_count": len(s["students"]),
            "avg_mastery": avg,
            "attempts": s["attempts"],
            "mistake_count": s["mistakes"],
            "sims": [
                {
                    "sim_id": sm["sim_id"],
                    "match_strength": sm["match_strength"],
                    "subject": sm.get("subject"),
                    "sim_url": f"/simulations/{sm['sim_id']}",
                }
                for sm in sims
            ],
        })

    classes = []
    for level, b in sorted(class_buckets.items(),
                           key=lambda kv: float(kv[0]) if kv[0].replace(
                               ".", "", 1).isdigit() else 99):
        classes.append({
            "class_level": level,
            "students": int(b["students"]),
            "avg_mastery": (round(b["mastery_sum"] / b["mastery_n"], 4)
                            if b["mastery_n"] else None),
            "attempts": int(b["attempts"]),
        })

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source": os.path.basename(_STUDENT_STORE),
        "has_data": active > 0,
        "reason": None if active > 0 else "no_active_students",
        "students": {"tracked": len(raw), "active": active},
        "cohort": {
            "avg_mastery": (round(cohort_mastery_sum / cohort_mastery_n, 4)
                            if cohort_mastery_n else None),
            "total_attempts": total_attempts,
            "open_mistakes": total_open_mistakes,
        },
        "classes": classes,
        "roster": roster[:roster_limit],
        "weakest_concepts": weakest,
    }
