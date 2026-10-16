"""next_best_lesson.py — the adaptive "what should I learn next" engine.

Inputs (all live):
  - mastery_records: per-user BKT mastery per node
  - the CANONICAL corpus index (enhanced_nodes.load_index): the same
    PREREQUISITE_NODE_IDS edges the Neo4j graph was seeded from, with
    class/subject coordinates — read in-memory, never a graph hop
  - optional user.class_level for scoping

Rewrite (gate-hard-edges agent, 2026-09-30 — audit findings D1/D2/D11):
  - D1 fixed: prereqs now come from the live corpus index.  The old code
    read a STALE shipped export (deploy/frontend/components/sims_v2/
    NODE_GRAPH.json — a CBSE-era snapshot without the CISCE nodes); that
    dependency is gone.
  - D11 fixed: gating uses HARD EDGES ONLY via the shared classifier
    (services/graph_edges.classify).  A prerequisite gates iff its class
    is strictly BELOW the node's OR its subject differs.  Same-class
    sibling mesh never gates (it is cyclic — strict gating on it left a
    fresh student with zero prereq-met nodes), upward noise and
    unresolvable prereqs never gate either.
  - D2 fixed: the candidate frontier is the student's CLASS SCOPE from
    the corpus, not the mastery-derived closure, so a fresh student (no
    ledger rows) gets real, gated recommendations on day one instead of
    an empty feed.

Rule: a node is RECOMMENDED (ready_to_learn) when every HARD gate is
mastered and the node itself is not (p_known < mastery_floor) — that
includes untouched nodes, so a fresh student gets honest starting
points.  Nodes the student has STARTED whose hard gates are still open
surface as repair_first with the missing ids; untouched gated nodes are
simply suppressed (a topic whose foundations are missing is not yet the
student's to repair — it enters repair_first when they reach it).
"""
from __future__ import annotations

import logging
from typing import Any, Dict, List, Optional, Tuple

from sqlalchemy import select as sa_select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.progress import MasteryRecord
from backend.services import graph_edges

logger = logging.getLogger(__name__)

MASTERED = 0.85


def _corpus_index():
    """The enrichment singleton index, or None when the corpus is absent
    (degrades to an honest empty result — never raises, never falls back
    to a stale export)."""
    try:
        from backend.services.enhanced_nodes import load_index

        return load_index()
    except Exception as exc:  # corpus not mounted / cold container
        logger.warning("next_best_lesson: corpus index unavailable: %s", exc)
        return None


def _syllabus_key(node: Dict[str, Any]) -> Tuple[int, int]:
    """(chapter, node_num) sort key — syllabus-earliest first."""
    def _int(v) -> int:
        try:
            return int(v)
        except (TypeError, ValueError):
            return 1 << 30
    return (_int(node.get("chapter")), _int(node.get("node_num")))


def _scoped_nodes(index, class_level: Optional[int]) -> Dict[str, Dict[str, Any]]:
    """Teaching nodes in the student's class (all classes when no class
    is on record — honest widest scope, syllabus-ordered)."""
    if class_level is None:
        return dict(index.nodes)
    # O(scope) via the (class, subject) index instead of a full-corpus scan
    out: Dict[str, Dict[str, Any]] = {}
    for (cls, _subj), nids in index._by_cs.items():
        if cls != int(class_level):
            continue
        for nid in nids:
            out[nid] = index.nodes[nid]
    return out


async def _user_class(db: AsyncSession, user_id: str) -> Optional[int]:
    """The student's class_level from the users table, when present."""
    if db is None:
        return None
    try:
        from backend.models.user import User

        row = (await db.execute(
            sa_select(User.class_level).where(User.id == user_id)
        )).first()
        try:
            return int(row[0]) if row and row[0] is not None else None
        except (TypeError, ValueError):
            return None
    except Exception as exc:
        logger.warning("next_best_lesson: class read failed: %s", exc)
        return None


async def next_best(
    db: AsyncSession, user_id: str, limit: int = 5, mastery_floor: float = MASTERED,
) -> Dict[str, Any]:
    rows = (await db.execute(
        sa_select(MasteryRecord)
        .where(MasteryRecord.user_id == user_id)
    )).scalars().all()

    mastery: Dict[str, float] = {}
    attempts: Dict[str, int] = {}
    for r in rows:
        mastery[r.node_id] = r.mastery_probability
        attempts[r.node_id] = r.attempts

    out: Dict[str, Any] = {
        "user_id": user_id,
        "mastered_floor": mastery_floor,
        "ready_to_learn": [],
        "repair_first": [],
        "graph_size": 0,
    }

    index = _corpus_index()
    if index is None:
        out["source"] = "unavailable (corpus index not mounted)"
        return out

    class_level = await _user_class(db, user_id)
    scoped = _scoped_nodes(index, class_level)
    coords_of = index.nodes.get

    repair: List[Dict[str, Any]] = []
    ready: List[Dict[str, Any]] = []

    # Titles for display (zero-ids law: raw node ids never render).  DB
    # titles first (authored), definition-head derivation as fallback.
    titles: Dict[str, str] = {}
    try:
        from sqlalchemy import select as _sel
        from backend.models.enrichment import EnrichmentContent as _EC
        # the lookup is scoped-set-wide (dict keys = node ids); the served
        # lists are ≤limit each, so this stays a single bounded query
        _rows = (await db.execute(
            _sel(_EC.node_id, _EC.title).where(_EC.node_id.in_(list(scoped)))
        )).all()
        titles = {r.node_id: r.title for r in _rows if r.title}
    except Exception as exc:
        logger.warning("next_best_lesson: title lookup failed: %s", exc)

    def _title_of(nid: str, node: Dict[str, Any]) -> str:
        if titles.get(nid):
            return titles[nid]
        try:
            from backend.services.learnpath_builder import derive_title
            return derive_title(node.get("definition") or "", nid)
        except Exception:
            return ""
    # syllabus order — the honest "next", gated by hard prereqs only
    for nid in sorted(scoped, key=lambda n: _syllabus_key(scoped[n])):
        if len(ready) >= limit and len(repair) >= limit:
            break
        node = scoped[nid]
        m = mastery.get(nid, 0.0)
        if m >= mastery_floor:
            continue
        entry = {
            "node_id": nid,
            "title": _title_of(nid, node),
            "mastery": round(m, 3),
            "attempts": attempts.get(nid, 0),
        }
        unmet = graph_edges.hard_unmet(node, coords_of, mastery,
                                       floor=mastery_floor)
        if unmet:
            entry["unmet_titles"] = [
                titles.get(u, "") for u in unmet[:4]]
            # repair-first is for STARTED nodes: evidence the student is
            # working here while its foundations are open.  Untouched
            # gated nodes stay suppressed (they surface as ready only
            # once their hard gates are met).
            started = attempts.get(nid, 0) > 0 or m > 0.0
            if started and len(repair) < limit:
                entry["unmet_prereqs"] = unmet[:4]
                entry["reason"] = ("repair first — an earlier foundation "
                                   "(earlier class or other subject) is "
                                   "still open")
                repair.append(entry)
        else:
            if len(ready) < limit:
                entry["reason"] = "prerequisites met — ready to learn"
                ready.append(entry)

    out.update({
        "ready_to_learn": ready,
        "repair_first": repair,
        "graph_size": len(scoped),
        "scoped_class": class_level,
        "source": "corpus_index (live PREREQUISITE_NODE_IDS, hard gates only)",
    })
    return out
