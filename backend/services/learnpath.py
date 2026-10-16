"""learnpath.py — the ONE composer for the unified adaptive journey.

Owner mission (2026-09-30): "Diagnose → Path → Learn (10-beat node loop) →
Practice → Remediate → Unlock → Revise, composed from ledger + graph +
mastery criteria."  Every surface re-derived its own "next" (Today via
next_best_lesson's stale JSON graph, the dashboard via round-robin
recommendations, the orchestrator via a different band model) and none of
them talked to each other.  This service is the single ordering brain that
/api/learnpath/* serves; surfaces stay free to render it their way.

PRIORITY ORDER (see _cisce_build/learnpath_v2/DESIGN.md §2.2)
  1. revise     — SM-2 items due today (review_scheduler.due_queue)
  2. remediate  — wrong-after-last-correct in its_attempt_log, ranked ABOVE
                  plain continue-learning; suppresses unlock celebrations
                  downstream of an open wrong
  3. repair     — learn the deepest unmet HARD prerequisite of an
                  in-progress node before the node itself
  4. learn      — in-progress first (highest mastery), then untouched nodes,
                  syllabus order as tiebreak; cold start (no ledger rows) →
                  honest diagnose + syllabus-head start
  5. practice   — mastery in the consolidation band, family practice mix
  6. unlock     — a freshly-mastered node's first forward unlock

PREREQ EDGE SEMANTICS (audit finding D11, 2026-09-30; shared classifier
in services/graph_edges.py — the ONE definition, also used by
next_best_lesson and the /api/graph/gaps + /path endpoints)
  The corpus PREREQUISITE_NODE_IDS header mixes two things: strictly-
  downward cross-class/cross-subject edges (REAL prerequisites: a
  class-10 topic requires the class-9 topic; a civics topic requires the
  economics topic) and same-class edges that form a mutual sibling mesh
  inside each chapter (cyclic — node 001 lists 002..007 AND 002 lists
  001,003..).  Gating on ALL edges is unsatisfiable (a cold student has
  zero fresh, prereq-met nodes — measured on the live corpus), so this
  service gates ONLY on hard edges: an edge A→B (A requires B) is HARD
  iff B's class is strictly below A's OR B's subject differs from A's.
  Same-class edges are ordering hints only; upward edges (45, data
  noise) and unresolvable prereq ids are soft by the same rule.  The
  hard subgraph is acyclic by construction.

DATA SOURCES (all existing — nothing new is invented):
  - mastery_records ORM rows           (the galaxy's server truth)
  - review_items via review_scheduler  (SM-2 due queue)
  - its_attempt_log                    (remediation signal; the log IS the
                                        state — recomputed per request)
  - enhanced_nodes.load_index()        (canonical corpus: PREREQUISITE_NODE_IDS
                                        edges, MASTERY_CRITERIA, class/subject
                                        coords — the same edges the Neo4j
                                        graph was seeded from; in-memory so
                                        no graph hop per request)
  - subject_pedagogy profiles          (per-family ordering + voiced reasons)
  - user.class_level                   (class filter)

HONESTY RULES
  - every action carries ``reason`` + ``evidence`` derived from the data
    above; no "recommended for you" hand-waving
  - a new student gets an honest diagnose action, never fabricated progress
  - node ids travel as opaque fetch keys only (owner decision 2026-09-29);
    display strings carry titles/friendly text, never ids

Import-light at module scope (stdlib only) so tests can load this file by
path without dragging the solver stack — same contract as mastery_ledger.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional, Tuple

logger = logging.getLogger(__name__)

# ── bands (orchestrator-compatible, stated in ONE place now) ──────────────
MASTERED_FLOOR = 0.85     # ledger bar for "mastered"
TEACH_BELOW = 0.45        # below this: learn, not practice
PRACTICE_BELOW = 0.85     # below this: consolidation still pays
ATTEMPTS_FOR_MASTERY = 3  # minimum evidence before the mastered claim
REMEDIATION_WINDOW = 40   # recent attempts inspected for unresolved wrongs
REPAIR_DEPTH = 4          # how far down the hard chain a repair may walk
_LEDGER_SOURCE = "mastery_records (mastery_ledger one-record rule)"


# ─────────────────────────────────────────────────────────────────────────
# corpus helpers (in-memory, canonical)
# ─────────────────────────────────────────────────────────────────────────

def _corpus_index():
    """The enrichment singleton index, or None when the corpus is absent
    (degrades to review/remediation-only paths — never raises)."""
    try:
        from backend.services.enhanced_nodes import load_index

        return load_index()
    except Exception as exc:  # corpus not mounted / cold container
        logger.warning("learnpath: corpus index unavailable: %s", exc)
        return None


def _derive_title(node: Optional[Dict[str, Any]]) -> str:
    """Human title: the corpus's definition-head trick, prettified id last.
    The prettified form keeps the id OUT of prose (spaces, not underscores)
    while staying truthful."""
    if not node:
        return "this topic"
    try:
        from backend.services.enhanced_nodes import _derive_title as _dt

        t = _dt(node)
        if t and t.strip() and t.strip() != node.get("node_id"):
            return str(t).strip()
    except Exception:
        pass
    raw = str(node.get("node_id") or "")
    return raw.replace("_", " ").strip()[:80]


def _chapter_label(node: Dict[str, Any]) -> str:
    ch = node.get("chapter")
    return f"chapter {ch}" if ch not in (None, "") else "this chapter"


def _class_of(index, node_id: str) -> Optional[int]:
    node = index.nodes.get(node_id) if index else None
    if node is None:
        return None
    try:
        return int(node.get("class"))
    except (TypeError, ValueError):
        return None


def _syllabus_key(node: Dict[str, Any]) -> Tuple[int, int]:
    """(chapter, node_num) sort key — syllabus-earliest first."""
    def _int(v) -> int:
        try:
            return int(v)
        except (TypeError, ValueError):
            return 1 << 30
    return (_int(node.get("chapter")), _int(node.get("node_num")))


def _subject_nodes(index, subject: Optional[str], class_level: Optional[int],
                   limit_per_subject: int = 4000) -> Dict[str, Dict[str, Any]]:
    """Teaching nodes for the subject (or a small all-subject slice),
    optionally scoped to the student's class (falls back to adjacent years
    when the class has no rows — CISCE splits some subjects oddly)."""
    if index is None:
        return {}
    # O(scope) via the (class, subject) index instead of a full-corpus scan
    def _pick(cls: int) -> Dict[str, Dict[str, Any]]:
        out: Dict[str, Dict[str, Any]] = {}
        for (c, s), nids in index._by_cs.items():
            if c != cls:
                continue
            if subject and s.lower() != subject.lower():
                continue
            for nid in nids:
                out[nid] = index.nodes[nid]
                if len(out) >= limit_per_subject:
                    return out
        return out

    if class_level is None:
        out = {nid: n for nid, n in index.nodes.items()
               if not subject or str(n.get("subject") or "").lower() == subject.lower()}
        return dict(list(out.items())[:limit_per_subject])
    out = _pick(int(class_level))
    if out:
        return out
    # class empty → nearest year that has this subject (honest adjacency)
    for delta in (1, -1, 2, -2):
        alt = int(class_level) + delta
        if alt < 6 or alt > 12:
            continue
        out = _pick(alt)
        if out:
            return out
    return out


def _forward_edges(nodes: Dict[str, Dict[str, Any]]) -> Dict[str, List[str]]:
    """prereq_id → [node ids it feeds] within the scoped node set.
    Used as ORDERING hints (same-class edges are a sibling mesh — see the
    docstring), never as gates."""
    fwd: Dict[str, List[str]] = {}
    for nid, node in nodes.items():
        for p in (node.get("prereq_ids") or []):
            fwd.setdefault(p, []).append(nid)
    return fwd


def _hard_prereqs(index, node: Dict[str, Any]) -> List[str]:
    """Prereq ids that are HARD gates under the shared D11 classifier
    (services/graph_edges.classify): the prereq's class is strictly below
    the node's, OR the prereq's subject differs.  Same-class rows are
    sibling mesh, upward rows are noise, unresolvable ids never gate —
    all stay out of gating."""
    if index is None:
        return []
    from backend.services import graph_edges  # stdlib-only, lazy per contract

    return graph_edges.hard_prereq_ids(node, index.nodes.get)


def _hard_unmet(index, node: Dict[str, Any], mastery: Dict[str, float]
                ) -> List[str]:
    """Hard prereqs not yet mastered (no ledger row counts as unmet)."""
    return [p for p in _hard_prereqs(index, node)
            if mastery.get(p, 0.0) < MASTERED_FLOOR]


def _repair_target(index, node_id: str, mastery: Dict[str, float]
                   ) -> Tuple[Optional[str], List[str]]:
    """Walk DOWN the hard-prereq chain to the deepest unmet root: the one
    node whose mastery unblocks the chain. Bounded by REPAIR_DEPTH (the
    hard graph is acyclic — class strictly decreases — so this ends).
    Returns (target_id, chain_of_unmet_ids)."""
    chain: List[str] = []
    cur = node_id
    for _ in range(REPAIR_DEPTH):
        node = index.nodes.get(cur) if index else None
        if node is None:
            break
        unmet = _hard_unmet(index, node, mastery)
        if not unmet:
            break
        unmet.sort(key=lambda p: _syllabus_key(index.nodes.get(p) or {}))
        cur = unmet[0]
        chain.append(cur)
    if not chain:
        return None, []
    return cur, chain


def _prereq_titles(index, prereq_ids: List[str], cap: int = 2) -> str:
    names = [_derive_title(index.nodes.get(p)) for p in prereq_ids[:cap]]
    names = [n for n in names if n]
    if not names:
        return ""
    line = " and ".join(names)
    more = len(prereq_ids) - len(names)
    return f"{line} (and {more} more)" if more > 0 else line


# ─────────────────────────────────────────────────────────────────────────
# store reads (all lazy imports; every reader degrades independently)
# ─────────────────────────────────────────────────────────────────────────

async def _ledger(db, user_id: str) -> Dict[str, Dict[str, float]]:
    """{node_id: {mastery, attempts}} from mastery_records (best row per
    node — the table can hold repeats)."""
    out: Dict[str, Dict[str, float]] = {}
    if db is None:
        return out
    try:
        from sqlalchemy import select as sa_select

        from backend.models.progress import MasteryRecord

        rows = (await db.execute(
            sa_select(MasteryRecord).where(MasteryRecord.user_id == user_id)
        )).scalars().all()
        for r in rows:
            cur = out.get(r.node_id)
            p = float(r.mastery_probability or 0.0)
            if cur is None or p > cur["mastery"]:
                out[r.node_id] = {
                    "mastery": p,
                    "attempts": int(r.attempts or 0),
                }
    except Exception as exc:
        logger.warning("learnpath: ledger read failed: %s", exc)
    return out


async def _due_reviews(db, user_id: str, limit: int = 3) -> List[Dict[str, Any]]:
    """SM-2 items due today, most overdue first (review_scheduler's order)."""
    if db is None:
        return []
    try:
        from backend.services.review_scheduler import due_queue

        dq = await due_queue(db, user_id, limit=limit * 4)
        items = dq.get("items") or []
        due_count = int(dq.get("due_count") or 0)
        out = []
        for it in items[:limit]:
            it = dict(it)
            it["due_count"] = due_count
            out.append(it)
        return out
    except Exception as exc:
        logger.warning("learnpath: review queue read failed: %s", exc)
        return []


async def _remediations(db, user_id: str, scoped: Dict[str, Dict[str, Any]]
                        ) -> Dict[str, Dict[str, Any]]:
    """Unresolved wrongs from its_attempt_log: per node, a wrong attempt
    with NO later correct one. The log is the state — nothing else to
    persist. Only nodes inside the scoped subject set are returned."""
    if db is None:
        return {}
    try:
        from sqlalchemy import select as sa_select

        from backend.models.telemetry import AttemptLog

        since = datetime.now(timezone.utc).replace(tzinfo=None) - timedelta(days=45)
        rows = (await db.execute(
            sa_select(AttemptLog.node_id, AttemptLog.is_correct,
                      AttemptLog.misconception_id, AttemptLog.created_at)
            .where(AttemptLog.student_id == user_id)
            .where(AttemptLog.created_at >= since)
            .order_by(AttemptLog.created_at.desc())
            .limit(REMEDIATION_WINDOW)
        )).all()
        # fold CHRONOLOGICALLY (oldest first): a later correct must clear an
        # earlier wrong; the window arrived newest-first, so reverse it.
        open_wrongs: Dict[str, Dict[str, Any]] = {}
        for node_id, is_correct, miscon, _ts in reversed(rows):
            if node_id not in scoped:
                continue
            if is_correct:
                open_wrongs.pop(node_id, None)  # recovered since
            elif node_id not in open_wrongs:
                open_wrongs[node_id] = {
                    "wrong_attempts": 1,
                    "misconception_ids": [m for m in [miscon] if m],
                }
            else:
                entry = open_wrongs[node_id]
                entry["wrong_attempts"] += 1
                if miscon and miscon not in entry["misconception_ids"]:
                    entry["misconception_ids"].append(miscon)
        return open_wrongs
    except Exception as exc:
        logger.warning("learnpath: attempt log read failed: %s", exc)
        return {}


async def _class_level(db, user_id: str) -> Optional[int]:
    if db is None:
        return None
    try:
        from sqlalchemy import select as sa_select

        from backend.models.user import User

        row = (await db.execute(
            sa_select(User.class_level).where(User.id == user_id)
        )).first()
        n = row[0] if row else None
        try:
            return int(n) if n is not None else None
        except (TypeError, ValueError):
            return None
    except Exception:
        return None


# ─────────────────────────────────────────────────────────────────────────
# action builders
# ─────────────────────────────────────────────────────────────────────────

def _action(type_: str, node_id: Optional[str], node: Optional[Dict[str, Any]],
            reason: str, evidence: Dict[str, Any], anchor: Optional[str] = None
            ) -> Dict[str, Any]:
    title = _derive_title(node) if node else None
    link = None
    if node_id and type_ == "practice":
        link = f"/practice?node={node_id}"
    elif node_id:
        link = f"/learn/{node_id}"
        if anchor and type_ == "learn":
            link += f"#{anchor}"
    elif type_ == "diagnose":
        link = "/diagnostic"
    elif type_ == "revise":
        link = "/review"
    return {
        "type": type_,
        "node_id": node_id,
        "title": title,
        "link": link,
        "reason": reason,
        "evidence": evidence,
    }


def learn_anchor(sp, subject: Optional[str]) -> str:
    return sp.learn_anchor_for(subject)


def _phase(cold: bool, in_progress: Dict, remed: Dict, mastered: set) -> str:
    if cold and not remed:
        return "diagnose"
    if remed:
        return "remediate"
    if in_progress:
        return "learn"
    if mastered:
        return "revise"
    return "learn"


# ─────────────────────────────────────────────────────────────────────────
# the composer
# ─────────────────────────────────────────────────────────────────────────

async def next_actions(db, user_id: str, subject: Optional[str] = None,
                       limit: int = 6) -> Dict[str, Any]:
    """The ordered path for one student (+optional subject filter).

    Returns {subject, subject_family, phase, actions:[...], generated_at} —
    every action with its data-derived why."""
    from backend.services import subject_pedagogy as sp

    family, _profile = sp.family_for(subject)
    actions: List[Dict[str, Any]] = []

    index = _corpus_index()
    class_level = await _class_level(db, user_id)
    ledger = await _ledger(db, user_id)

    scoped = _subject_nodes(index, subject, class_level)
    mastery = {nid: v["mastery"] for nid, v in ledger.items()}
    fwd = _forward_edges(scoped)
    remed = await _remediations(db, user_id, scoped)

    in_scope_ledger = {k: v for k, v in ledger.items() if k in scoped}
    mastered = {nid for nid, v in in_scope_ledger.items()
                if v["mastery"] >= MASTERED_FLOOR
                and v["attempts"] >= ATTEMPTS_FOR_MASTERY}
    in_progress = {nid: v for nid, v in in_scope_ledger.items()
                   if nid not in mastered}
    cold = len(in_scope_ledger) == 0
    anchor = learn_anchor(sp, subject)

    # ── 1. revise — SM-2 due items lead the strip ─────────────────────────
    for it in await _due_reviews(db, user_id):
        nid = it.get("node_id")
        if subject and nid not in scoped:
            continue
        node = scoped.get(nid) or (index.nodes.get(nid) if index else None)
        overdue = int(it.get("overdue_days") or 0)
        when = f", {overdue}d overdue" if overdue > 0 else ""
        ev: Dict[str, Any] = {
            "due_reviews": int(it.get("due_count") or 0),
            "overdue_days": overdue,
            "repetitions": it.get("repetitions"),
        }
        actions.append(_action(
            "revise", nid, node,
            f"Spaced review is due{when} — recall now keeps it owned for the exam window.",
            ev))

    # ── 2. remediate — open wrongs rank above new learning ────────────────
    for nid, info in remed.items():
        if len(actions) >= limit:
            break
        m = mastery.get(nid)
        node = scoped.get(nid)
        miscon = info.get("misconception_ids") or []
        mis_bit = f" ({miscon[0]})" if miscon else ""
        ev = {
            "recent_wrong_attempts": info.get("wrong_attempts", 0),
            "mastery_probability": round(m, 3) if m is not None else None,
            "misconception_ids": miscon[:3],
        }
        actions.append(_action(
            "remediate", nid, node,
            sp.reason("repair", subject,
                      f"Your last attempt here missed the key idea{mis_bit} — "
                      "fix it before it hardens into a habit."),
            ev, anchor=anchor))

    # downstream suppression: no unlock celebration above an open wrong
    def _suppressed(nid: str) -> bool:
        seen: set = set()
        frontier = [nid]
        while frontier:
            cur = frontier.pop()
            for child in fwd.get(cur, []):
                if child in seen:
                    continue
                seen.add(child)
                frontier.append(child)
                if child in remed:
                    return True
        return False

    # ── 3+4. learn — repair-first, continue, or cold start ────────────────
    learn_added = 0

    # 3. repair-first: an in-progress node whose HARD prereqs are unmet —
    #    offer the deepest unmet root (may sit in an earlier class; the
    #    chain, not the year, decides the order).
    if not cold and index is not None:
        offered: set = set()
        for nid, v in _sorted_inprogress(in_progress, scoped):
            if learn_added >= max(1, limit // 2) or len(actions) >= limit:
                break
            node = scoped.get(nid)
            if node is None:
                continue
            unmet = _hard_unmet(index, node, mastery)
            if not unmet:
                continue
            target, chain = _repair_target(index, nid, mastery)
            if target is None or target in offered or target in remed:
                continue
            offered.add(target)
            learn_added += 1
            target_node = index.nodes.get(target) or {}
            tcls = _class_of(index, target)
            where = f" from Class {tcls}" if (tcls and class_level and tcls < class_level) else ""
            prereq_line = _prereq_titles(index, chain)
            ev = {
                "mastery_probability": round(v["mastery"], 3),
                "attempts": v["attempts"],
                "unmet_prereqs": chain[:4],
            }
            actions.append(_action(
                "learn", target, target_node,
                f"{_derive_title(node)} stands on {prereq_line}{where} — "
                "foundations first: the graph says this chain unlocks the rest.",
                ev, anchor=anchor))

    def _hard_ok(nid: str) -> bool:
        node = scoped.get(nid)
        if node is None or index is None:
            return True
        return not _hard_unmet(index, node, mastery)

    # 4a. continue: in-progress nodes with hard prereqs met
    if not cold:
        for nid, v in _sorted_inprogress(in_progress, scoped):
            if learn_added >= limit or len(actions) >= limit:
                break
            node = scoped.get(nid)
            if node is None or nid in remed:
                continue
            if not _hard_ok(nid):
                continue  # those went through repair-first above
            learn_added += 1
            ev = {
                "mastery_probability": round(v["mastery"], 3),
                "attempts": v["attempts"],
            }
            actions.append(_action(
                "learn", nid, node,
                sp.reason("learn", subject,
                          f"You're {round(v['mastery'] * 100)}% into this — "
                          f"{_chapter_label(node)} isn't finished with you yet."),
                ev, anchor=anchor))

    # 4b. untouched nodes — syllabus order; at cold start the hard gates
    #     can't be evaluated (no data), so the syllabus head IS the honest
    #     start and the diagnose probe precedes it.
    if learn_added < limit and len(actions) < limit and scoped:
        fresh = [nid for nid in scoped
                 if nid not in ledger and nid not in remed
                 and (cold or _hard_ok(nid))]
        fresh.sort(key=lambda n: _syllabus_key(scoped[n]))
        for nid in fresh:
            if learn_added >= limit or len(actions) >= limit:
                break
            node = scoped[nid]
            learn_added += 1
            ev = {
                "mastery_probability": None,
                "attempts": 0,
                "unlocks_count": len(fwd.get(nid, [])),
            }
            if cold:
                # honesty beats family voice on day one: the diagnostic
                # genuinely precedes any prereq-aware claim
                why = ("A starting point in the syllabus — run the diagnostic "
                       "first and the path will re-check every prerequisite "
                       "against real data.")
            else:
                why = sp.reason(
                    "learn", subject,
                    "Next in the syllabus and every prerequisite is already yours.")
            actions.append(_action("learn", nid, node, why, ev, anchor=anchor))

    # 4c. cold start diagnose — honest day-one probe
    if cold and subject:
        actions.insert(1 if actions else 0, _action(
            "diagnose", None, None,
            f"New to {sp.display_subject(subject)}? A 5-minute diagnostic maps what "
            "you already carry — every recommendation after it fits you, not the average.",
            {"ledger_rows": 0}))

    # ── 5. practice — consolidation band, family mix ──────────────────────
    if not cold:
        mix_line = sp.practice_mix_line(subject)
        for nid, v in _sorted_inprogress(in_progress, scoped):
            if len(actions) >= limit + 2:
                break
            node = scoped.get(nid)
            if node is None or nid in remed:
                continue
            if not (TEACH_BELOW <= v["mastery"] < PRACTICE_BELOW
                    and v["attempts"] >= 1):
                continue
            ev = {
                "mastery_probability": round(v["mastery"], 3),
                "attempts": v["attempts"],
            }
            extra = f" Mix: {mix_line}." if mix_line else ""
            actions.append(_action(
                "practice", nid, node,
                sp.reason("practice", subject,
                          f"Concept forming ({round(v['mastery'] * 100)}%) — "
                          "consolidate before it fades.") + extra,
                ev))

    # ── 6. unlock — forward celebration from fresh mastery ────────────────
    if index is not None:
        for nid in _sorted_mastered(mastered, scoped):
            if len(actions) >= limit + 3:
                break
            if _suppressed(nid):
                continue
            unlocks = [u for u in fwd.get(nid, []) if u not in mastered]
            if not unlocks:
                continue
            unlocks.sort(key=lambda u: _syllabus_key(scoped.get(u, {})))
            target = unlocks[0]
            if any(a["node_id"] == target for a in actions):
                continue
            node = scoped.get(target) or {}
            ev = {
                "mastery_probability": mastery.get(nid),
                "attempts": ledger.get(nid, {}).get("attempts", 0),
                "unlocks_count": len(unlocks),
            }
            actions.append(_action(
                "learn", target, node,
                f"{_derive_title(scoped.get(nid))} is locked in — "
                f"{_derive_title(node)} opens next on the graph.",
                ev, anchor=anchor))

    return {
        "subject": subject,
        "subject_family": family,
        "subject_name": sp.display_subject(subject),
        "phase": _phase(cold, in_progress, remed, mastered),
        "actions": actions[: max(limit, 3)],
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }


def _sorted_inprogress(in_progress: Dict[str, Dict[str, float]],
                       scoped: Dict[str, Dict[str, Any]]):
    """Highest mastery first, syllabus order as tiebreak."""
    def key(kv):
        nid, v = kv
        node = scoped.get(nid)
        return (-(v["mastery"] if node else -1.0),
                _syllabus_key(node) if node else (0, 0))
    return sorted(in_progress.items(), key=key)


def _sorted_mastered(mastered: set, scoped: Dict[str, Dict[str, Any]]):
    return sorted((n for n in mastered if n in scoped),
                  key=lambda n: _syllabus_key(scoped[n]))


async def subject_status(db, user_id: str, subject: Optional[str] = None
                         ) -> Dict[str, Any]:
    """The one-glance state line for a subject: counts + the next milestone
    (with its why). Powers the My Galaxy path strip header."""
    from backend.services import subject_pedagogy as sp

    family, _profile = sp.family_for(subject)
    index = _corpus_index()
    class_level = await _class_level(db, user_id)
    ledger = await _ledger(db, user_id)
    scoped = _subject_nodes(index, subject, class_level)
    in_scope = {k: v for k, v in ledger.items() if k in scoped}
    mastery = {k: v["mastery"] for k, v in ledger.items()}
    mastered = {n for n, v in in_scope.items()
                if v["mastery"] >= MASTERED_FLOOR
                and v["attempts"] >= ATTEMPTS_FOR_MASTERY}
    in_progress = {n: v for n, v in in_scope.items() if n not in mastered}
    remed = await _remediations(db, user_id, scoped)
    due = await _due_reviews(db, user_id, limit=50)

    milestone: Optional[Dict[str, Any]] = None
    criteria_note: Optional[str] = None
    if scoped:
        pool = _sorted_inprogress(in_progress, scoped)
        if pool:
            nid, v = pool[0]
            node = scoped.get(nid) or {}
            unmet = _hard_unmet(index, node, mastery) if index else []
            milestone = {
                "node_id": nid,
                "title": _derive_title(node),
                "mastery": round(v["mastery"], 3),
                "why": (f"prerequisites open: {_prereq_titles(index, unmet)}"
                        if unmet else
                        f"{round(v['mastery'] * 100)}% — keep the evidence streak going"),
            }
        else:
            starts = sorted(
                (n for n in scoped if n not in ledger),
                key=lambda n: _syllabus_key(scoped[n]))
            if starts:
                nid = starts[0]
                milestone = {
                    "node_id": nid,
                    "title": _derive_title(scoped[nid]),
                    "mastery": None,
                    "why": "next in the syllabus — the honest starting line",
                }
        if milestone and milestone.get("node_id") in scoped:
            mc = (scoped[milestone["node_id"]].get("mastery_criteria") or "").strip()
            if mc:
                first = [ln.strip(" -*•") for ln in mc.splitlines() if ln.strip()]
                criteria_note = first[0][:140] if first else None

    return {
        "subject": subject,
        "subject_family": family,
        "subject_name": sp.display_subject(subject),
        "phase": _phase(len(in_scope) == 0, in_progress, remed, mastered),
        "mastered": len(mastered),
        "in_progress": len(in_progress),
        "corpus_nodes": len(scoped),
        "due_reviews": len(due),
        "open_remediations": len(remed),
        "next_milestone": milestone,
        "mastery_criteria_note": criteria_note,
        "ledger_source": _LEDGER_SOURCE,
    }
