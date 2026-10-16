"""graph_edges.py — the ONE hard/soft prerequisite-edge classifier (D11).

OWNER DECISION D11 (2026-09-30, learnpath-v2 audit DESIGN.md §1):
  The corpus ``PREREQUISITE_NODE_IDS`` header mixes two semantics:
    * HARD  — real cross-class/cross-subject gates (a class-11 topic that
      stands on a class-10 topic; a civics topic that stands on an
      economics topic).  Measured on the live corpus: ~23.8k edges.
    * SOFT  — same-class sibling order inside each chapter.  These form a
      MUTUAL mesh (``c10_bio_cbse_01_001`` lists ``..._002`` AND
      ``..._002`` lists ``..._001``) — cyclic by construction, so strict
      gating on them is UNSATISFIABLE: a fresh student has zero
      prereq-met nodes and nothing ever unlocks.
  Plus a handful of upward edges (data noise — a "prereq" in a LATER
  class) which are soft by the same rule.

THE RULE (the single definition every gating consumer shares):

    An edge A→B — B listed in A's ``PREREQUISITE_NODE_IDS``, i.e.
    "A requires B" (the same direction the Neo4j importer writes
    ``(:A)-[:PREREQUISITE_OF]->(:B)``) — is a

        HARD GATE  iff  B.class < A.class   OR   B.subject != A.subject
                        (both coordinates known)

    Everything else is SOFT: same-class same-subject siblings, upward
    noise, and any edge whose coordinates cannot be resolved (never gate
    on unknowns — a gate must be provable).

  The hard subgraph is acyclic by construction (class strictly decreases
  along every class-edge; cross-subject edges strictly widen the
  requirement set), so repair walks and unlock BFS terminate.

CONSUMERS (all gate through this module — do NOT re-derive the rule):
  - services/learnpath.py        (_hard_prereqs → hard_prereq_ids)
  - services/next_best_lesson.py (ready/repair recommendation gating)
  - services/graph_service.py    (/api/graph/gaps + /api/graph/path
                                  hard-only filtering; router routers/graph.py)
  - tools/load_graph_neo4j.py    (stamps ``kind`` hard|soft on every
                                  PREREQUISITE_OF edge at load time)

Import-light at module scope (stdlib only) so every consumer — including
test harnesses that load modules by path — can import it freely.
"""

from __future__ import annotations

from typing import Any, Callable, Dict, List, Mapping, Optional

HARD = "hard"
SOFT = "soft"

# Long-form / short-form twins measured in the live corpus (46 distinct
# subject codes, 2026-09-30): the same subject drifts between a legacy
# long code and the short code (e.g. ``c10_engl_*`` vs ``c6_english_*``,
# ``phy`` vs ``physics``).  Folded before comparison so a spelling drift
# can never fake a cross-subject gate.  Variants NOT listed here are
# genuinely different BOOKS by design (eng_w/eng_h/eng_k… English
# electives, hin_a/hin_v/hin_ga… Hindi electives, bs vs acc, ip vs cs…) —
# an edge across those is a real cross-subject gate.
_SUBJECT_FOLD = {
    "mathematics": "math",
    "maths": "math",
    "biology": "bio",
    "physics": "phy",
    "chemistry": "chem",
    "history": "hist",
    "geography": "geo",
    "civics": "civ",
    "economics": "eco",
    "english": "engl",
}


def _norm_class(value: Any) -> Optional[int]:
    """Class coordinate as int, or None when unknown/unparseable."""
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def _norm_subject(value: Any) -> str:
    """Subject code folded to its canonical lowercase form ('' if absent)."""
    s = str(value or "").strip().lower()
    return _SUBJECT_FOLD.get(s, s)


def classify(node_a: Mapping[str, Any], prereq_b: Mapping[str, Any]) -> str:
    """Classify one prerequisite edge.

    Args:
        node_a:  the REQUIRING node (its header lists ``prereq_b``).
        prereq_b: the REQUIRED node (the prerequisite).

    Returns HARD when prereq_b's class is strictly below node_a's class
    OR prereq_b's subject differs from node_a's subject (both coordinates
    known); SOFT otherwise — same-class siblings, upward noise, and any
    edge whose coordinates cannot be resolved (never gate on unknowns).
    """
    a_cls = _norm_class(node_a.get("class"))
    b_cls = _norm_class(prereq_b.get("class"))
    if a_cls is not None and b_cls is not None and b_cls < a_cls:
        return HARD
    a_sub = _norm_subject(node_a.get("subject"))
    b_sub = _norm_subject(prereq_b.get("subject"))
    if a_sub and b_sub and a_sub != b_sub:
        return HARD
    return SOFT


def is_hard(node_a: Mapping[str, Any], prereq_b: Mapping[str, Any]) -> bool:
    """True when the A→B edge is a HARD gate (see :func:`classify`)."""
    return classify(node_a, prereq_b) == HARD


# --------------------------------------------------------------------------- #
# corpus helpers (the canonical index is dict-shaped: node["prereq_ids"])
# --------------------------------------------------------------------------- #

def hard_prereq_ids(node: Mapping[str, Any],
                    coords_of: Callable[[str], Optional[Mapping[str, Any]]],
                    ) -> List[str]:
    """The prerequisite ids of ``node`` that are HARD gates.

    ``coords_of(prereq_id)`` resolves a prereq id to a coordinate mapping
    (``{"class": ..., "subject": ...}``) or None when unknown.  Unknown
    prereqs never gate (soft by rule).
    """
    out: List[str] = []
    for pid in (node.get("prereq_ids") or []):
        pre = coords_of(pid)
        if pre is not None and is_hard(node, pre):
            out.append(pid)
    return out


def hard_unmet(node: Mapping[str, Any],
               coords_of: Callable[[str], Optional[Mapping[str, Any]]],
               mastery: Mapping[str, float],
               floor: float = 0.85,
               ) -> List[str]:
    """Hard gates of ``node`` not yet mastered (missing row == unmet)."""
    return [pid for pid in hard_prereq_ids(node, coords_of)
            if mastery.get(pid, 0.0) < floor]


# --------------------------------------------------------------------------- #
# graph-service row helpers (rows carry "class_level" int|str + "subject")
# --------------------------------------------------------------------------- #

def _row_coords(row: Mapping[str, Any]) -> Dict[str, Any]:
    return {"class": row.get("class_level", row.get("class")),
            "subject": row.get("subject")}


def filter_hard_rows(rows: List[Mapping[str, Any]],
                     target: Optional[Mapping[str, Any]],
                     ) -> List[Mapping[str, Any]]:
    """Keep only prerequisite ROWS that are HARD gates of ``target``.

    Shapes served by graph_service (Neo4j + SQLite fallback):
    ``{"node_id", "subject", "class_level", ...}``.  When the target's
    coordinates are unknown nothing can be proven hard, so nothing gates:
    the empty list is returned (fail-closed for a GATING endpoint).
    """
    if target is None:
        return []
    t = _row_coords(target)
    return [r for r in (rows or []) if is_hard(t, _row_coords(r))]


# --------------------------------------------------------------------------- #
# corpus-wide measurement (used by tests / audits to pin the split)
# --------------------------------------------------------------------------- #

def edge_stats(nodes: Mapping[str, Mapping[str, Any]]) -> Dict[str, Any]:
    """Classify every prereq ref across a corpus-shaped ``{id: node}`` map.

    Returns totals + per-bucket counts + one real example id-pair per
    bucket: ``{"refs", "broken", "self", "hard": {...}, "soft": {...},
    "examples": {bucket: (a_id, b_id)}}``.  Buckets:
      hard.cross_class_down          (b.class <  a.class, same subject)
      hard.cross_subject_down        (b.class <  a.class, subject differs)
      hard.cross_subject_same_class  (b.class == a.class, subject differs)
      soft.same_class_sibling        (b.class == a.class, same subject)
      soft.upward_noise              (b.class >  a.class)
      soft.unknown_coords            (prereq id not in the corpus map)
    """
    counts: Dict[str, int] = {
        "refs": 0, "self": 0,
        "hard.cross_class_down": 0,
        "hard.cross_subject_down": 0,
        "hard.cross_subject_same_class": 0,
        "soft.same_class_sibling": 0,
        "soft.upward_noise": 0,
        "soft.unknown_coords": 0,
    }
    examples: Dict[str, tuple] = {}
    hard_total = soft_total = 0

    def _note(bucket: str, a_id: str, b_id: str) -> None:
        examples.setdefault(bucket, (a_id, b_id))

    for a_id, node in nodes.items():
        for pid in (node.get("prereq_ids") or []):
            counts["refs"] += 1
            if pid == a_id:
                counts["self"] += 1
                continue
            pre = nodes.get(pid)
            if pre is None:
                counts["soft.unknown_coords"] += 1
                soft_total += 1
                _note("soft.unknown_coords", a_id, pid)
                continue
            a_cls = _norm_class(node.get("class"))
            b_cls = _norm_class(pre.get("class"))
            a_sub = _norm_subject(node.get("subject"))
            b_sub = _norm_subject(pre.get("subject"))
            if b_cls is not None and a_cls is not None and b_cls < a_cls:
                bucket = ("hard.cross_subject_down" if a_sub and b_sub
                          and a_sub != b_sub else "hard.cross_class_down")
                hard_total += 1
            elif a_sub and b_sub and a_sub != b_sub:
                bucket = "hard.cross_subject_same_class"
                hard_total += 1
            elif b_cls is not None and a_cls is not None and b_cls > a_cls:
                bucket = "soft.upward_noise"
                soft_total += 1
            else:
                bucket = "soft.same_class_sibling"
                soft_total += 1
            counts[bucket] += 1
            _note(bucket, a_id, pid)

    return {
        "nodes": len(nodes),
        "refs": counts["refs"],
        "self": counts["self"],
        "edges": hard_total + soft_total,
        "hard": {
            "total": hard_total,
            "cross_class_down": counts["hard.cross_class_down"],
            "cross_subject_down": counts["hard.cross_subject_down"],
            "cross_subject_same_class": counts["hard.cross_subject_same_class"],
        },
        "soft": {
            "total": soft_total,
            "same_class_sibling": counts["soft.same_class_sibling"],
            "upward_noise": counts["soft.upward_noise"],
            "unknown_coords": counts["soft.unknown_coords"],
        },
        "examples": examples,
    }
