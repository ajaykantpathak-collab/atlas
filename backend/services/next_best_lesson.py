"""next_best_lesson.py — the adaptive "what should I learn next" engine.

Inputs (all existing):
  - mastery_records: per-user BKT mastery per node
  - corpus prereq graph: PREREQUISITE_NODE_IDS chains (loaded from the
    frontend's NODE_GRAPH.json export, or inferred from mastery rows)
  - optional exam horizon for prioritisation

Rule: a node is RECOMMENDED when its prerequisites are (mostly) mastered,
the node itself is not yet mastered (p_known < 0.85), and it is the
lowest-hanging unmastered node in its chain. Weak-prereq nodes surface as
"repair first".
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List, Optional

from sqlalchemy import select as sa_select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.progress import MasteryRecord

MASTERED = 0.85
GRAPH_PATH = Path("D:/platform/deploy/frontend/components/sims_v2/NODE_GRAPH.json")

_graph_cache: Optional[Dict[str, List[str]]] = None


def _load_graph() -> Dict[str, List[str]]:
    """node_id -> prerequisite node_ids. Loaded once from the shipped
    NODE_GRAPH.json export; empty graph if unavailable (recommendations
    then lean on mastery alone)."""
    global _graph_cache
    if _graph_cache is not None:
        return _graph_cache
    graph: Dict[str, List[str]] = {}
    try:
        raw = json.loads(GRAPH_PATH.read_text(encoding="utf-8"))
        # NODE_GRAPH.json shape varies; accept {node: [prereqs]} directly or
        # {nodes: {node: {prereq_ids: [...]}}}
        if isinstance(raw, dict):
            nodes = raw.get("nodes")
            if isinstance(nodes, dict):
                for nid, meta in nodes.items():
                    if isinstance(meta, dict):
                        graph[nid] = list(meta.get("prereq_ids") or meta.get("prerequisites") or [])
            elif isinstance(nodes, list):
                for meta in nodes:
                    nid = meta.get("id")
                    if nid:
                        graph[nid] = list(meta.get("prereq_ids") or [])
            else:
                for k, v in raw.items():
                    if isinstance(v, list):
                        graph[k] = [str(x) for x in v]
    except Exception:
        graph = {}
    _graph_cache = graph
    return graph


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

    graph = _load_graph()
    repair: List[Dict[str, Any]] = []
    ready: List[Dict[str, Any]] = []

    seen: set = set()

    def prereqs_of(nid: str) -> List[str]:
        return graph.get(nid, [])

    def is_mastered(nid: str) -> bool:
        return mastery.get(nid, 0.0) >= mastery_floor

    # walk every known node; classify by prereq state
    candidates = set(mastery.keys())
    for nid in graph:
        candidates.add(nid)
    # nodes the user has touched plus graph nodes reachable from them
    frontier = set(mastery.keys())
    expanded = True
    while expanded and graph:
        expanded = False
        for nid, prereqs in graph.items():
            if nid in frontier:
                continue
            if any(p in frontier for p in prereqs):
                frontier.add(nid)
                expanded = True

    for nid in sorted(frontier):
        m = mastery.get(nid, 0.0)
        if m >= mastery_floor:
            continue
        prereqs = prereqs_of(nid)
        unmet = [p for p in prereqs if not is_mastered(p)]
        entry = {
            "node_id": nid,
            "mastery": round(m, 3),
            "attempts": attempts.get(nid, 0),
        }
        if nid not in seen:
            seen.add(nid)
            if unmet:
                if len(repair) < limit:
                    entry["unmet_prereqs"] = unmet[:4]
                    entry["reason"] = "repair first — prerequisites not mastered"
                    repair.append(entry)
            else:
                if len(ready) < limit:
                    entry["reason"] = "prerequisites mastered — ready to learn"
                    ready.append(entry)

    return {
        "user_id": user_id,
        "mastered_floor": mastery_floor,
        "ready_to_learn": ready[:limit],
        "repair_first": repair[:limit],
        "graph_size": len(graph),
    }
