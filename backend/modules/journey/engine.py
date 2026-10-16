#!/usr/bin/env python3
"""modules/journey/engine.py — the per-subject student-flow STATE MACHINE.

Every subject's teaching flow (its solver lane, its teach payload, its
practice selector) already exists per-subject.  This engine ORCHESTRATES
them into one journey per student-per-topic:

  PROBE     one diagnostic-grade question; BKT decides the landing state
  TEACH     the node's authored teaching (competency tutor / node content);
            exits on a correct mini-check
  PRACTICE  IRT-targeted practice (QuestionSelector); misconception events
            divert to REMEDIATE; streaks + BKT promote to CHALLENGE
  REMEDIATE the misconception corrector's targeted correction + follow-up;
            2 failed remediations drop back to TEACH — but a session that
            has already served its repair budget (pedagogy #2, the REPAIR
            CAP) patches FORWARD instead: next topic at reduced difficulty,
            this concept flagged "revisit tomorrow"
  CHALLENGE an IRT-hard item (theta + 1); correct -> MASTERED
  MASTERED  terminal; spaced re-probe is scheduled by the worker tier

All mastery updates go THROUGH mastery_sync's BKTModel (BKT math in one
place — the journey never forks the mastery math).  The journey row's
``bkt_p`` column is the PERSISTED knowledge state: each answer seeds the
BKT update from the stored p (not a fresh prior), so the trajectory
accumulates exactly as BKT predicts and survives restarts.

Write-path integrity: every read-modify-write runs in ONE transaction
with ``SELECT ... FOR UPDATE`` on the journey row, so parallel answer
submissions for the same student+topic serialize (no lost BKT updates,
no torn streaks).
"""
from __future__ import annotations

import re
from datetime import datetime, timezone
from typing import Any, Dict, Optional

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from backend.database import get_sync_engine
from backend.modules.journey.models import JourneyState

STATES = ("PROBE", "TEACH", "PRACTICE", "REMEDIATE", "CHALLENGE", "MASTERED")
MASTER_P = 0.85
PROMOTE_P = 0.75
STRONG_WRONG_P = 0.40
# The journey's own BKT prior for a never-seen topic (JourneyState.bkt_p
# default).  Guess/slip/transit stay mastery_sync's (0.2 / 0.1 / 0.1).
INITIAL_P = 0.3

# ── REPAIR CAP (pedagogy #2) ─────────────────────────────────────────────
# A 35% student parked on a 40-topic prerequisite chain quits before the
# first bridge: the 0.85 unlock gate means weeks of repair, nothing new.
# The cap makes repair a SEASONING, never the meal — at most ~25% of any
# session's questions may be remediation; the rest is forward progress.
#: REMEDIATE questions a session tolerates before the next failed
#: remediation patches the student FORWARD instead of deeper into repair.
REMEDIATE_SESSION_CAP = 3
#: action served when the cap fires: next topic of the same chapter at
#: reduced difficulty, this concept flagged "revisit tomorrow".
PATCH_FORWARD = "serve_patched_forward"


def _now():
    return datetime.now(timezone.utc)


def _subject_of(node_id: str) -> str:
    m = re.match(r"c\d+_([a-z]+)_", node_id or "")
    return m.group(1) if m else "general"


def _session() -> Session:
    # expire_on_commit=False: attributes stay readable after the tx ends
    # (the router returns plain values off the row).
    return Session(get_sync_engine(), expire_on_commit=False)


def _ensure_tables() -> None:
    from backend.database import Base
    Base.metadata.create_all(get_sync_engine(),
                             tables=[JourneyState.__table__])


def _select_row(sx: Session, student_id: str, node_id: str,
                for_update: bool = False) -> Optional[JourneyState]:
    q = select(JourneyState).where(
        JourneyState.student_id == student_id,
        JourneyState.node_id == node_id)
    if for_update:
        q = q.with_for_update()
    return sx.execute(q).scalars().first()


def _new_row(student_id: str, node_id: str) -> JourneyState:
    return JourneyState(student_id=student_id, node_id=node_id,
                        subject=_subject_of(node_id), state="PROBE",
                        bkt_p=INITIAL_P, history=[])


def list_states(student_id: str, subject: str) -> list[JourneyState]:
    """Every topic's journey row for a student+subject (the /map view)."""
    _ensure_tables()
    with _session() as sx, sx.begin():
        return list(sx.execute(
            select(JourneyState).where(
                JourneyState.student_id == student_id,
                JourneyState.subject == subject)).scalars().all())


#: states that mean "the student has an open topic here" — MASTERED is
#: proven (the worker tier owns re-probes) and a PROBE row with no
#: answered question is an untouched stub, never a continuation.
INFLIGHT_STATES = ("TEACH", "PRACTICE", "REMEDIATE", "CHALLENGE")

#: journey state → the next-step action vocabulary the orchestrator and
#: the client already speak (review/remediate/teach/practice/explore).
JOURNEY_ACTION = {
    "TEACH": "teach",
    "PRACTICE": "practice",
    "REMEDIATE": "remediate",
    "CHALLENGE": "practice",
}


def _inflight_query(sx, student_id: str, limit: int = 1):
    return sx.execute(
        select(JourneyState)
        .where(JourneyState.student_id == student_id,
               JourneyState.state.in_(INFLIGHT_STATES))
        .order_by(JourneyState.updated_at.desc())
        .limit(limit)).scalars().all()


def latest_inflight(student_id: str) -> Optional[Dict[str, Any]]:
    """The most recently touched OPEN topic of a student, as a plain dict
    (readable after the session closes) — the dashboard's "continue where
    you left off" pick.  None when nothing is open.

    Read path for /api/progress/next-step: the mastery-ledger orchestrator
    only sees mastery_records/attempts/review rows, so a student mid-lesson
    in the journey used to fall through to the "explore" fallback.
    """
    _ensure_tables()
    with _session() as sx, sx.begin():
        rows = _inflight_query(sx, student_id)
        if not rows:
            return None
        r = rows[0]
        return {"node_id": r.node_id, "state": r.state,
                "subject": r.subject or _subject_of(r.node_id),
                "bkt_p": round(float(r.bkt_p or 0.0), 3)}


def states_map(student_id: str) -> Dict[str, str]:
    """{node_id: journey state} for EVERY row of a student, most recently
    touched first — the read path for mission options (never re-offer a
    MASTERED topic; surface an open one as a continue pick)."""
    _ensure_tables()
    with _session() as sx, sx.begin():
        rows = sx.execute(
            select(JourneyState)
            .where(JourneyState.student_id == student_id)
            .order_by(JourneyState.updated_at.desc())).scalars().all()
        return {r.node_id: r.state for r in rows}


def reset_topic(student_id: str, node_id: str) -> bool:
    """Reset one topic's journey to PROBE/prior.  Row-locked."""
    _ensure_tables()
    with _session() as sx, sx.begin():
        row = _select_row(sx, student_id, node_id, for_update=True)
        if row is None:
            return False
        row.state = "PROBE"
        row.bkt_p = INITIAL_P
        row.streak_correct = row.streak_wrong = 0
        row.remediation_count = 0
        row.history = []
    return True


def get_or_create(student_id: str, node_id: str) -> JourneyState:
    """Read path for /next.  Creates the row on first touch.

    Two concurrent first-touches are safe: the uq_journey_student_node
    unique constraint backs the race; the loser re-reads the winner's row.
    """
    _ensure_tables()
    for attempt in (0, 1):
        try:
            with _session() as sx, sx.begin():
                row = _select_row(sx, student_id, node_id)
                if row is None:
                    row = _new_row(student_id, node_id)
                    sx.add(row)
                    sx.flush()
                return row
        except IntegrityError:
            if attempt:
                raise
            continue          # concurrent create won — second pass reads it
    raise RuntimeError("unreachable")   # pragma: no cover


# ── Per-subject journey tuning (LEARNING_DESIGN V2) ──────────────────────
# Languages and humanities are acquired by more exposure reps before a
# challenge feels fair; maths/physics promote fast (skill ladder).
# Values override the shared constants for those subject clusters.
#
# KEYED BY THE REAL CORPUS CODES (segment 2 of the node id — c10_hin_…,
# c6_eng_…, c9_engl_…): the original map spelled the clusters
# "english"/"hindi"/"history", which no corpus node id carries (the corpus
# uses eng/engl/gram, hin, hist), so the tuned lane silently never fired
# for the 5,700+ language/humanities nodes it was written for.
_TUNING_VALUES = {"promote_streak": 3, "promote_p_add": 0.02}
_SUBJECT_TUNING = {
    code: dict(_TUNING_VALUES)
    for _group in (
        ("english", "eng", "engl", "gram"),   # English books
        ("hindi", "hin"),                     # Hindi books
        ("history", "hist"),                  # History
        ("civ",), ("soc",), ("leg",),         # Humanities
        ("ps", "psy"),                        # Psychology
        ("geo",),                             # Geography
    )
    for code in _group
}


def _tuning_for(node_id: str) -> dict:
    sub = node_id.split("_", 2)[1] if node_id.count("_") >= 1 else ""
    return _SUBJECT_TUNING.get(sub, {})


def record_answer(student_id: str, node_id: str, correct: bool,
                  misconception_id: str | None = None,
                  question_id: str | None = None,
                  question_text: str | None = None) -> Dict[str, Any]:
    """Apply one answer to the state machine.  Returns the new state and
    the action the product should serve next."""
    _ensure_tables()
    for attempt in (0, 1):
        try:
            return _record_answer_locked(
                student_id, node_id, correct, misconception_id,
                question_id, question_text)
        except IntegrityError:
            if attempt:
                raise
            continue          # row was created concurrently — retry locked
    raise RuntimeError("unreachable")   # pragma: no cover


def _record_answer_locked(student_id: str, node_id: str, correct: bool,
                          misconception_id: str | None,
                          question_id: str | None,
                          question_text: str | None) -> Dict[str, Any]:
    from backend.services.mastery_sync import BKTModel, MasteryState

    with _session() as sx, sx.begin():
        # Lock the row for the whole read-modify-write: parallel answers
        # for the same student+topic queue up here instead of racing.
        row = _select_row(sx, student_id, node_id, for_update=True)
        if row is None:
            row = _new_row(student_id, node_id)
            sx.add(row)
            sx.flush()        # row now exists and is locked by this tx

        # BKT — seed from the PERSISTED knowledge state, update through
        # mastery_sync's model, write back.  Never start from a fresh
        # prior here: that reset made MASTERED mathematically unreachable.
        st = MasteryState(student_id=student_id, topic_id=node_id,
                          subject=row.subject or _subject_of(node_id))
        st.bkt_p_know = float(row.bkt_p
                              if row.bkt_p is not None else INITIAL_P)
        p_after = BKTModel.update(st, bool(correct))
        row.bkt_p = float(p_after)
        p = row.bkt_p

        if correct:
            row.streak_correct += 1
            row.streak_wrong = 0
        else:
            row.streak_wrong += 1
            row.streak_correct = 0

        prev = row.state
        nxt, action = _transition(prev, p, row, correct, misconception_id)
        row.state = nxt
        patched_forward = action == PATCH_FORWARD and nxt == "PRACTICE"
        if question_id:
            row.last_question_id = question_id
        hist = list(row.history or [])
        hist.append({"at": _now().isoformat(), "from": prev, "to": nxt,
                     "correct": bool(correct), "p": round(p, 3),
                     "misconception": misconception_id or None,
                     "patched_forward": patched_forward or None,
                     "q": (question_text or "")[:500] or None})
        row.history = hist[-40:]
        sx.flush()
    out = {"state": nxt, "action": action, "bkt_p": round(p, 3),
           "bkt_p_precise": round(p, 6),
           "streak_correct": row.streak_correct,
           "streak_wrong": row.streak_wrong,
           "remediation_count": row.remediation_count,
           "patched_forward": patched_forward}
    if patched_forward:
        # the forward path is resolved OUTSIDE the row lock (corpus read)
        out["patch_forward"] = patched_forward_payload(node_id)
    return out


def _remediate_questions_served(row: JourneyState) -> int:
    """REMEDIATE questions already answered this session (persisted via the
    journey history — each answered repair question leaves one entry whose
    ``from`` is REMEDIATE).  Survives restarts; bounded by the 40-entry
    history window, which is far above the cap itself."""
    return sum(1 for h in (row.history or [])
               if isinstance(h, dict) and h.get("from") == "REMEDIATE")


def _transition(state: str, p: float, row: JourneyState, correct: bool,
                misconception_id: str | None):
    if state == "PROBE":
        if p >= MASTER_P:
            return "CHALLENGE", ACTION["CHALLENGE"]
        if p < STRONG_WRONG_P:
            return "TEACH", ACTION["TEACH"]
        return "PRACTICE", ACTION["PRACTICE"]

    if state == "TEACH":
        if correct:
            return "PRACTICE", ACTION["PRACTICE"]
        return "TEACH", ACTION["TEACH"]          # stay until the mini-check passes

    if state == "PRACTICE":
        if misconception_id:
            # A detected misconception diverts to REMEDIATE.  The counter
            # tracks FAILED remediations of the current visit only.
            row.remediation_count = 0
            return "REMEDIATE", ACTION["REMEDIATE"]
        _tun = _tuning_for(row.node_id or "")
        if correct and row.streak_correct >= _tun.get("promote_streak", 2)                 and p >= PROMOTE_P + _tun.get("promote_p_add", 0.0):
            return "CHALLENGE", ACTION["CHALLENGE"]
        if row.streak_wrong >= 3 or p < STRONG_WRONG_P:
            return "TEACH", ACTION["TEACH"]
        return "PRACTICE", ACTION["PRACTICE"]

    if state == "REMEDIATE":
        if correct:
            row.remediation_count = 0
            return "PRACTICE", ACTION["PRACTICE"]
        # 2 failed remediations drop back to TEACH (docstring contract) —
        # UNLESS the session has already spent its repair budget, in which
        # case the student patches FORWARD (pedagogy #2): next topic of the
        # chapter at reduced difficulty, this concept flagged "revisit
        # tomorrow".  Repair is capped at ~25% of any session; a 35%
        # student must never face weeks of remediation before anything new.
        row.remediation_count += 1
        if row.remediation_count >= 2:
            row.remediation_count = 0
            # prior REMEDIATE answers + THIS one = total repair questions
            # spent in the session (the current answer is not in history
            # yet at decision time)
            if _remediate_questions_served(row) + 1 > REMEDIATE_SESSION_CAP:
                return "PRACTICE", PATCH_FORWARD
            return "TEACH", ACTION["TEACH"]
        return "REMEDIATE", ACTION["REMEDIATE"]

    if state == "CHALLENGE":
        if correct and p >= MASTER_P:
            return "MASTERED", ACTION["MASTERED"]
        return "PRACTICE", ACTION["PRACTICE"]

    if state == "MASTERED":
        return "MASTERED", ACTION["MASTERED"]

    return "PROBE", ACTION["PROBE"]


ACTION = {
    "PROBE": "serve_probe_question",
    "TEACH": "serve_teaching",
    "PRACTICE": "serve_practice_question",
    "REMEDIATE": "serve_misconception_correction",
    "CHALLENGE": "serve_challenge_question",
    "MASTERED": "topic_mastered",
}


def teach_payload(node_id: str) -> Dict[str, Any]:
    """The TEACH action's payload — the node's own authored content."""
    try:
        from backend.services.enhanced_nodes import load_index
        rec = load_index().nodes.get(node_id)
        if isinstance(rec, dict):
            return {"title": rec.get("title"),
                    "definition": rec.get("definition"),
                    "walkthrough": rec.get("walkthrough"),
                    "eli5": rec.get("eli5")}
    except Exception:
        pass
    return {}


def remediation_payload(node_id: str, question_text: str) -> Dict[str, Any]:
    try:
        from backend.services.misconception_corrector import correction_for
        return correction_for(node_id, question_text)
    except Exception:
        return {}


def patched_forward_payload(node_id: str) -> Dict[str, Any]:
    """The PATCH_FORWARD payload — the chapter's NEXT topic at reduced
    difficulty, with the stranded repair concept flagged "revisit tomorrow"
    (the spaced-repetition tier owns the actual revisit scheduling).

    Honest absence: an unresolvable node (index cold, end of chapter)
    returns {} and the product simply serves normal practice.
    """
    try:
        from backend.services.enhanced_nodes import load_index, _derive_title
        idx = load_index()
        rec = idx.nodes.get(node_id)
        if not isinstance(rec, dict):
            return {}
        nxt_id = min(
            (nid for nid, n in idx.nodes.items()
             if isinstance(n, dict)
             and n.get("class") == rec.get("class")
             and n.get("subject") == rec.get("subject")
             and n.get("chapter") == rec.get("chapter")
             and isinstance(n.get("node_num"), int)
             and isinstance(rec.get("node_num"), int)
             and n["node_num"] > rec["node_num"]),
            key=lambda nid: idx.nodes[nid]["node_num"],
            default=None)
        out: Dict[str, Any] = {
            "revisit": {"node_id": node_id,             # fetch key only
                        "title": _derive_title(rec),
                        "when": "tomorrow"},
            "tier": "novice",
        }
        if nxt_id:
            out["next_node_id"] = nxt_id                # fetch key only
            out["next_title"] = _derive_title(idx.nodes[nxt_id])
        return out
    except Exception:
        return {}


