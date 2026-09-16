"""competency_tutor.py -- deterministic tutor loop API.

Serves the competency-graph tutor built on backend/its/solver/tutor.py:
adaptive concept selection over the live catalog corpus, worked-example
question pool, numeric grading, hint ladder, mistake book.  Self-
contained (in-memory student store) so the app runs without the
database stack.
"""
from __future__ import annotations

import logging
import os
import re
import threading
import time
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

from backend.its.solver.tutor import TutorEngine
from backend.its.solver.misconception_catalog import MisconceptionCatalog
from backend.its.solver.id_resolution import resolve_concept_id, resolve_node_id
from backend.security import decode_access_token
from backend.services import simple_explainer as _explainer

try:  # Tier 1/2 teaching modules — fail-open to today's behavior
    from backend.its.tutoring.worked_example_fading import (
        FadingState, WorkedExampleFading)
    _FADER = WorkedExampleFading()
except Exception:  # pragma: no cover
    _FADER = None
try:
    from backend.its.tutoring.personalized_pathing import (
        GraphNavigator, StruggleMonitor, TeachingCheck, Interleaver)
    _STRUGGLE = StruggleMonitor()
    _TEACHER = TeachingCheck()
    _INTERLEAVER = Interleaver()
except Exception:  # pragma: no cover
    _STRUGGLE = _TEACHER = _INTERLEAVER = None
try:
    from backend.its.tutoring.personalized_pathing import GraphNavigator as _GraphNav
except Exception:  # pragma: no cover
    _GraphNav = None
_LAST_SERVE = {}
from backend.services.tutor_voice import (
    get_voice,
    render_serve_voice,
    render_submit_voice,
)

router = APIRouter(prefix="/api/tutor-graph", tags=["tutor-graph"])

logger = logging.getLogger(__name__)

# Bearer-token reader (never raises on a missing/invalid header): the
# same HTTPBearer(auto_error=False) pattern the other routers depend on.
_bearer = HTTPBearer(auto_error=False)


def _bound_student_id(
    supplied: str,
    credentials: Optional[HTTPAuthorizationCredentials],
) -> str:
    """The student identity for this request.

    When an Authorization bearer token is present and decodes, the
    authenticated user's id (the JWT ``sub`` claim) ALWAYS overrides the
    supplied student_id -- a signed-in client cannot serve, submit or
    read progress under someone else's student_id.  Anonymous requests
    keep the supplied id, defaulting to "guest".
    """
    if credentials is not None:
        payload = decode_access_token(credentials.credentials)
        if payload and payload.get("sub"):
            return str(payload["sub"])
    return supplied or "guest"

_CATALOG_DIR = os.path.normpath(os.path.join(
    os.path.dirname(__file__), "..", "its", "competency"))

# Student-model store: the tutor's mastery, mistake book and serve state
# persist per student after every serve/submit so /api/tutor-graph/progress
# survives backend restarts.  Postgres is authoritative (one row per
# student — concurrent replicas can't clobber a shared file); the legacy
# cbse_data/tutor_students.json path remains as the fallback when the DB
# is unreachable.  Overridable via TUTOR_STORE env.
_TUTOR_STORE = os.environ.get(
    "TUTOR_STORE",
    os.path.normpath(os.path.join(
        os.path.dirname(__file__), "..", "..", "cbse_data",
        "tutor_students.json")))

_engine: Optional[TutorEngine] = None
_lock = threading.Lock()
_misconceptions: Optional[MisconceptionCatalog] = None

# Question-phrasing triggers for misconception-catalog entries whose
# built-in detector_pattern was authored for *error* text rather than
# free questions.  Matched in addition to the catalog's own pattern;
# the WHY-lane's computational guard still applies to both.
_MISCONCEPTION_TRIGGERS = {
    "formula_selection":
        r"which\s+formula|formula\s+(should|shall|to)\s+(i\s+)?use|"
        r"kaunsa\s+formula|kon\s+sa\s+formula",
    "factorisation_incomplete":
        r"factoris\w*\s+further|fully\s+factor|factorisation\s+"
        r"(complete|incomplete)",
    "trig_ratio_swap":
        r"\bdifference\s+between\s+(sin|sine)\b|when\s+to\s+use\s+"
        r"(sin|cos|tan)\b|sin\s+cos\s+ka",
    "geometry_theorem_misapply":
        r"which\s+theorem|when\s+to\s+use\s+\w*\s*theorem|kaunsa\s+theorem",
    "energy_conservation_gap":
        r"conservation\s+of\s+energy|energy\s+conserv",
    "equilibrium_direction":
        r"le\s*chatelier|equilibrium\s+(shift|direction|kis)|"
        r"which\s+way\s+equilibrium",
    "cause_effect_swap":
        r"cause\s+and\s+effect|difference\s+between\s+cause",
    "map_scale_error":
        r"map\s+scale|representative\s+fraction",
    "supply_demand_curve":
        r"supply\s+curve|slope\s+of\s+(the\s+)?(demand|supply)",
}


def _get_engine() -> TutorEngine:
    global _engine
    with _lock:
        if _engine is None:
            if not os.path.isdir(_CATALOG_DIR):
                raise HTTPException(503, "competency catalog dir missing")
            from backend.services.tutor_store import build_store
            _engine = TutorEngine(_CATALOG_DIR, persist_path=_TUTOR_STORE,
                                  store=build_store(_TUTOR_STORE))
            # spiral-review feed: graded wrong answers booked into the
            # tutor's mistake book are also scheduled in the SM-2
            # review queue (best-effort; grading never depends on it)
            try:
                from backend.its.tutoring.spiral_service import (
                    schedule_tutor_mistake)
                _engine.review_hook = schedule_tutor_mistake
            except Exception:
                pass              # spacing stays optional
    return _engine


def _get_misconceptions() -> MisconceptionCatalog:
    global _misconceptions
    with _lock:
        if _misconceptions is None:
            _misconceptions = MisconceptionCatalog()
    return _misconceptions


def _regex_search(pattern: str, text: str) -> bool:
    try:
        return bool(re.search(pattern, text, re.I))
    except re.error:
        return False


def _teaching_node_count() -> int:
    """Size of the enhanced-node teaching corpus (0 when unavailable).

    Best-effort on purpose: /stats must stay green even when the
    pedagogy md_cache is not deployed on this machine.
    """
    try:
        from backend.services.enhanced_nodes import teaching_node_count
        return int(teaching_node_count())
    except Exception:
        return 0


class SubmitBody(BaseModel):
    student_id: str
    question_id: str
    answer: str


def _attach_serve_voice(out: dict, student_id: str) -> dict:
    """Natural-voice framing of the served question.

    The tutor-brain decides the framing (intent-appropriate to what is
    being asked); the variant is a deterministic hash of
    (student_id, turn), so identical requests get identical voice."""
    try:
        try:
            turn = int(str(out.get("question_id", "")).rsplit(":", 1)[-1])
        except ValueError:
            turn = 0
        out["voice"] = render_serve_voice(
            get_voice(), student_id, turn,
            str(out.get("concept_title") or ""),
            str(out.get("question") or ""),
            retreated_from=str(out.get("retreated_from") or ""))
    except Exception:
        pass                      # verified content never blocks on voice
    return out


def _attach_submit_voice(out: dict, student_id: str, answer: str,
                         concept_title: str) -> dict:
    """The "voice" field for a graded submit: celebrate on correct,
    name-the-likely-slip-and-encourage on wrong, warm support on
    lets_learn / ungraded / self_check."""
    if "outcome" not in out:
        return out
    try:
        out["voice"] = render_submit_voice(
            get_voice(), student_id,
            int(out.get("attempts") or 0), str(out["outcome"]),
            concept_title=concept_title,
            expected=str(out.get("expected")
                         or out.get("worked_solution") or ""),
            got=str(answer or ""),
            worked_solution=str(out.get("worked_solution") or ""),
            student_text=str(answer or ""))
    except Exception:
        pass                      # verified content never blocks on voice
    return out


def _attach_discussion(out: dict, eng: TutorEngine) -> dict:
    """Optional coach-vs-skeptic warm-up debate on the served concept
    (backend/its/tutoring/discussion_moments.py, "Addition 3").

    Built deterministically from the concept's COMMON_MISCONCEPTION
    teaching content: the enhanced-node corpus is title-matched to the
    concept (same class, scored, strict threshold) and the misconception
    section is parsed into {claimA, claimB, correctIndex, reveal}.  The
    key is ABSENT when no misconception is available -- fully optional
    and backward-compatible; it never touches grading (marks come only
    from /submit)."""
    try:
        from backend.its.tutoring.discussion_moments import (
            build_discussion_object, common_misconception_section)
        concept = eng.concepts.get(str(out.get("concept_id") or ""))
        title = str(out.get("concept_title") or "").strip()
        if concept is None or not title:
            return out
        from backend.services.enhanced_nodes import load_index
        index = load_index()
        hits = index.search(title, cls=int(concept.order_key[0]), limit=3)
        if not hits or float(hits[0].get("score") or 0.0) < 6.0:
            return out
        node = index.get(hits[0]["node_id"])
        if node is None:
            return out
        discussion = build_discussion_object(
            {
                "node_id": node.get("node_id"),
                "title": title,
                "definition": node.get("definition") or "",
                "common_misconception": common_misconception_section(node),
            },
            seed=str(out.get("concept_id") or ""),
        )
        if discussion:
            out["discussion"] = discussion
    except Exception:
        pass                      # the debate is a warm-up extra; the
                                  # serve loop never depends on it
    return out


@router.get("/stats")
async def stats():
    eng = _get_engine()
    subjects: dict = {}
    for c in eng.concepts.values():
        s = subjects.setdefault(c.order_key[1], 0)
        subjects[c.order_key[1]] = s + 1
    return {"concepts": len(eng.concepts), "subjects": subjects,
            "generated_questions": int(getattr(eng,
                                               "generated_questions", 0)),
            "teaching_nodes": _teaching_node_count()}


@router.get("/teach")
async def teach(
    concept_id: str = Query(None),
    node_id: str = Query(None),
):
    """The tutor's "teach me" card for one concept: the pedagogy
    walkthrough plus the first diagnostic question (with its answer and
    the wrong-answer misconception analysis).  ``concept_id`` and
    ``node_id`` are aliases; node ids look like
    ``c10_bio_cbse_01_001``."""
    key = (node_id or concept_id or "").strip()
    if not key:
        raise HTTPException(400, "provide node_id or concept_id")
    try:
        from backend.services.enhanced_nodes import load_index
        index = load_index()
    except RuntimeError as exc:
        raise HTTPException(503, f"teaching content unavailable: {exc}")
    node = index.get(key)
    if node is None:
        raise HTTPException(404, f"no teaching node for {key!r}")
    diagnostics = node.get("diagnostics") or []
    first = diagnostics[0] if diagnostics else None
    return {
        "node_id": node["node_id"],
        "concept_id": concept_id,
        "class": node["class"],
        "subject": node["subject"],
        "chapter": node["chapter"],
        "cognitive_level": node["cognitive_level"],
        "definition": node["definition"],
        "walkthrough": node["walkthrough"],
        "diagnostic": ({
            "index": first["index"],
            "question": first["q"],
            "answer": first["a"],
            "misconception": first["misconception"],
        } if first else None),
    }


@router.get("/serve")
async def serve(
    student_id: str = Query("guest"),
    subject: str = Query(None),
    class_level: Optional[int] = Query(None, ge=1, le=12),
    self_check: bool = Query(
        False, description="explicitly request a self_check item "
                           "(bypasses graded-first serving)"),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
):
    sid = _bound_student_id(student_id, credentials)
    eng = _get_engine()
    out = eng.serve(sid, subject, class_level,
                    request_self_check=self_check)
    if out is None:
        raise HTTPException(404, "no concepts available")
    # ── Tier 1: worked-example fading view (fail-open) ──
    try:
        qid = str(out.get("question_id") or "")
        cid = re.split(r"::|#", qid)[0]
        eng = _get_engine()
        st = eng.students.get(sid)
        item = None
        if "::drill" in qid:
            # generated numerical drill: its item lives in the student's
            # gen_pending map, not the concept pool (the id carries a
            # drill counter, not a pool index)
            item = ((st or {}).get("gen_pending") or {}).get(qid)
        if item is None:
            item = _pool_item(eng, qid)
        _sep = chr(10) + ";"
        raw_steps = list((item or {}).get("steps") or [])
        if len(raw_steps) < 2 and item is not None:
            raw_steps = [s.strip() for s in re.split("[" + _sep + "]+", str(item.get("a") or "")) if s.strip()]
        steps = [str(s).strip() for s in raw_steps if str(s).strip()]
        if st is not None and _FADER is not None and item is not None and len(steps) >= 2:
            fstate = st.setdefault("fading", {}).setdefault(
                cid, FadingState(student_id=sid, node_id=cid))
            p_known = float(st.get("mastery", {}).get(cid, 0.30))
            fstate.level = _FADER.choose_level(p_known, fstate)
            teaching = steps[:-1]          # the answer-bearing step stays hidden
            view = _FADER.render(teaching, fstate)
            out["fading"] = {"level": view.level,
                             "visible_steps": view.visible_steps,
                             "blanked_steps": len(view.blanked_steps),
                             "total_steps": len(steps),
                             "prompt": view.prompt}
    except Exception:
        pass
    _LAST_SERVE[sid] = time.time()
    return _attach_serve_voice(_attach_discussion(out, eng), sid)


@router.post("/submit")
async def submit(
    body: SubmitBody,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
):
    sid = _bound_student_id(body.student_id, credentials)
    eng = _get_engine()
    with _lock:
        out = eng.submit(sid, body.question_id, body.answer)
    if "error" in out:
        raise HTTPException(404, out["error"])
    cid = re.split(r"::|#", str(body.question_id))[0]
    concept = eng.concepts.get(cid)
    title = concept.title if concept is not None else ""

    # ── Tier 1/2 post-grade enrichment (fail-open, additive keys only) ──
    correct = out.get("outcome") in ("correct", "micro_win")
    st = eng.students.get(sid) or {}
    fstate = (st.get("fading") or {}).get(cid)
    if _FADER is not None and fstate is not None:
        _FADER.record_outcome(fstate, correct)
        out["fading"] = {"level": fstate.level,
                         "total_attempts": fstate.total_attempts}
    if _STRUGGLE is not None:
        recent = st.get("recent") or []      # newest-first (tutor.py)
        hints_used = st.get("hints_used") or 0
        sig = _STRUGGLE.classify(recent[:5], hints_used)
        out["struggle"] = {"state": sig.state,
                           "recommended_action": sig.recommended_action,
                           "evidence": sig.evidence}
        if sig.state == "flailing":
            out["intervention"] = ("stop_and_scaffold_now")
    if _TEACHER is not None and correct:
        m = float(st.get("mastery", {}).get(cid, 0.0))
        node = {"topic": title or cid,
                "top_misconception": (st.get("mistakes") or [{}])[-1]
                if st.get("mistakes") else None}
        task = _TEACHER.build(node, m)
        if task is not None:
            out["teach_task"] = {"kind": task.kind, "prompt": task.prompt,
                                 "rubric": task.rubric}
    return _attach_submit_voice(out, sid, body.answer, title)


def _pool_question(eng: TutorEngine, question_id: str) -> Optional[str]:
    """The served question text behind a question_id (for keyword
    matching).  Mirrors the engine's own id -> pool-item arithmetic."""
    parts = re.split(r"::|#", str(question_id))
    c = eng.concepts.get(parts[0])
    if c is None or not c.pool:
        return None
    try:
        idx = (int(parts[1]) - 1) % max(len(c.pool), 1)
    except (ValueError, IndexError):
        idx = 0
    return str(c.pool[idx].get("q") or "")


def _pool_item(eng: TutorEngine, question_id: str):
    """The served pool item (dict) behind a question_id, same arithmetic."""
    parts = re.split(r"::|#", str(question_id))
    c = eng.concepts.get(parts[0])
    if c is None or not c.pool:
        return None
    try:
        idx = (int(parts[1]) - 1) % max(len(c.pool), 1)
    except (ValueError, IndexError):
        idx = 0
    return c.pool[idx]


def _simple_hint(eng: TutorEngine, question_id: str) -> Optional[dict]:
    """Level-1 hint upgrade from the authored simple-explainer table.

    Keyword-matches the served question against the 40 classic confusion
    topics; on a hit the simple (or Hinglish) explanation PREFERRED over
    the generic concept+formula line.  Best-effort: any failure keeps
    the standard ladder."""
    try:
        q = _pool_question(eng, question_id)
        if not q:
            return None
        m = _explainer.find_explanation(q)
        if m is None:
            return None
        cid = re.split(r"::|#", str(question_id))[0]
        return {
            "level": 1,
            "hint": m["text"],
            "concept_id": cid,
            "simple_hint": True,
            "topic_id": m["id"],
            "topic": m["topic"],
            "style": m["style"],
            "styles": m["styles"],
        }
    except Exception:
        return None


@router.get("/hint")
async def hint(
    student_id: str = Query("guest"),
    question_id: str = Query(...),
    level: int = Query(1, ge=1, le=3),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
):
    sid = _bound_student_id(student_id, credentials)
    eng = _get_engine()
    out = eng.hint(sid, question_id, level)
    if out is None:
        raise HTTPException(404, "unknown question_id")
    st_hint = eng.students.get(sid)
    if st_hint is not None:
        st_hint["hints_used"] = st_hint.get("hints_used", 0) + 1
    if int(level) == 1:
        simple = _simple_hint(eng, question_id)
        if simple is not None:
            return simple          # the simple version is preferred
    return out


@router.get("/progress")
async def progress(
    student_id: str = Query("guest"),
    subject: str = Query(None),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
):
    sid = _bound_student_id(student_id, credentials)
    return _get_engine().progress(sid, subject)


class AskBody(BaseModel):
    student_id: str = "guest"
    question: str


def _teach_response(source: str, answer: str, **extra) -> dict:
    """Uniform teach-style /ask response.

    Teach content is authored text (explainer table, misconception
    remediation, enhanced-node pedagogy) -- it is never machine-verified
    numerics: verified stays False and no numeric is attached."""
    out = {
        "teach": True,
        "verified": False,
        "label": "TEACH",
        "answer": answer,
        "steps": [],
        "refusal_reason": None,
        "socratic": None,
        "source": source,
    }
    out.update(extra)
    return out


def _teach_lane(question: str) -> Optional[dict]:
    """The WHY-lane: authored teaching answers before the solver.

    Priority: (1) the simple-explainer table of 40 classic confusions,
    (2) the misconception catalog (detector pattern or question trigger),
    (3) the enhanced-nodes teaching corpus (best-effort full-text search).
    Computational questions never enter this lane -- they belong to the
    verified solver."""
    # computational questions always fall through to the solver
    if _explainer.looks_computational(question):
        return None

    # 1. classic-confusion table (authored in simple_explainer)
    m = _explainer.find_explanation(question)
    if m is not None:
        return _teach_response(
            "simple_explainer", m["text"],
            topic_id=m["id"], topic=m["topic"],
            style=m["style"], styles=m["styles"])

    # 2. misconception catalog: description + authored remediation
    raw = str(question or "")
    cat = _get_misconceptions()
    for entry in cat.entries():
        trig = _MISCONCEPTION_TRIGGERS.get(entry["id"])
        if ((_regex_search(entry.get("detector_pattern") or "", raw))
                or (trig and _regex_search(trig, raw))):
            desc = str(entry.get("description") or entry["id"]).rstrip(".")
            rem = str(entry.get("remediation") or "").rstrip()
            answer = f"Common mix-up: {desc}. How to fix it: {rem}"
            return _teach_response("misconception_catalog", answer,
                                   topic_id=entry["id"], topic=desc)

    # 3. enhanced-nodes teaching corpus (best-effort; empty when the
    #    pedagogy md_cache is not deployed on this machine).  Search runs
    #    on the informative terms only -- generic words score pure noise
    #    -- and the top node's definition must actually contain one of
    #    them, so "23 x 47" can never fish out a "teaching" answer.
    # MATH-EXPRESSION GUARD: a question carrying an equation or
    # algebraic expression ('x^2+5x+6=0', '2x + 5 = 17') is
    # computational even when phrased as a 'why' -- its keywords
    # ('roots', ...) match biology nodes, so the corpus search must
    # never teach it; it belongs to the deterministic solver.
    if re.search(r"[a-z]\s*\^|\d\s*[a-z]\s*[\+\-\*/^]|[a-z]\s*[\+\-*/]=|[a-z]\s*=\s*-?\d",
                 raw, re.I):
        return None
    try:
        from backend.services.enhanced_nodes import load_index
        index = load_index()
        terms = _explainer.informative_terms(question)
        hits = index.search(" ".join(terms), limit=3) if terms else []
    except Exception:
        return None
    if hits and float(hits[0].get("score") or 0.0) >= 4.0:
        node = index.get(hits[0]["node_id"])
        definition = str((node or {}).get("definition") or "").strip()
        if node is not None and definition:
            if not any(t in definition.lower() for t in terms):
                return None
            walkthrough = str(node.get("walkthrough") or "").strip()
            if len(walkthrough) > 900:
                walkthrough = walkthrough[:900].rstrip() + " ..."
            answer = definition + (("\n\n" + walkthrough)
                                   if walkthrough else "")
            return _teach_response("enhanced_nodes", answer,
                                   node_id=node["node_id"],
                                   topic=definition[:120])
    return None


@router.post("/ask")
async def ask(body: AskBody):
    """Natural-language free-text asking.

    WHY-LANE first: conceptual questions that match an authored teaching
    answer (simple-explainer table, misconception catalog, enhanced-node
    diagnostics) get a teach-style response -- verified content from the
    authored files, labeled "teach": true, never a machine-verified
    numeric.  Everything else falls through to the deterministic solver
    lanes, where VERIFIED answers carry steps and GUIDED answers carry
    the honest refusal."""
    if not body.question.strip():
        raise HTTPException(400, "empty question")
    teach = _teach_lane(body.question)
    if teach is not None:
        return teach
    from backend.its.solver.answer_pipeline import answer as _solve
    r = _solve(body.question)
    return {
        "verified": r.label == "VERIFIED",
        "label": r.label,
        "answer": r.answer,
        "steps": (r.steps or [])[:8],
        "refusal_reason": getattr(r, "refusal_reason", None),
        "socratic": getattr(r, "socratic", None),
    }


@router.get("/path")
async def path(
    student_id: str = Query("guest"),
    goal: str = Query(..., description="the node/concept id the student wants to reach"),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
):
    """Tier 2: personalized path through the prerequisite graph.

    GraphNavigator computes the unmastered prerequisite chain to the goal
    (BFS backward + Kahn topo, lowest mastery first); the mistake book is
    interleaved for mixed-topic review; a teach-back task attaches when the
    goal is near-mastered (protege effect)."""
    sid = _bound_student_id(student_id, credentials)
    eng = _get_engine()
    # node-id space (c10_bio_cbse_*) vs concept-id space (jemh.*/enh:*):
    # canonical resolution lives in its/solver/id_resolution.py
    goal_cid = resolve_concept_id(goal, eng)
    if goal_cid is not None:
        goal = goal_cid
    if goal not in eng.concepts:
        # last-resort fuzzy match (legacy suffix heuristic); NOT part of
        # the canonical resolver -- it guesses, it never renames
        matches = [c for c in eng.concepts if c.endswith(goal.split("_")[-1]) and goal.split("_")[0] in c]
        if not matches:
            raise HTTPException(404, "unknown goal concept")
        goal = matches[0]
    st = eng.students.get(sid) or {}
    mastery = dict(st.get("mastery", {}))

    out = {"goal": goal, "steps": [], "review_order": []}

    # operate in NODE space (the graph's ids). Concept-space mastery
    # (jemh.*/enh:*) is aliased: enh:<node> mastery counts for <node>.
    edges = {}
    try:
        graph = eng._graph_prereq_map()
        for node, pre in graph.items():
            edges.setdefault(node, []).append(pre)
            edges.setdefault(pre, [])
    except Exception as exc:
        logger.warning("path: prereq graph unavailable: %s", exc)

    def _m_of(node: str) -> float:
        base = resolve_node_id(node)
        return float(mastery.get(base, mastery.get("enh:" + base, 0.0)))

    if goal not in edges:
        edges[goal] = []
        for node, pres in edges.items():
            if goal in pres and node != goal:
                edges[node] = [g for g in pres if g != goal]
                edges.setdefault(goal, [])
                edges[node].append(goal)

    if _GraphNav is not None and edges:
        nav = _GraphNav(edges)
        node_mastery = {n: _m_of(n) for n in edges}
        p = nav.path_to(goal, node_mastery)
        out["steps"] = [{"node_id": s.node_id,
                         "p_known": round(s.p_known, 3),
                         "reason": s.reason} for s in p.steps]
        out["skipped_mastered"] = p.skipped_mastered

    if _INTERLEAVER is not None and st.get("mistakes"):
        items = [{"node_id": m.get("concept_id", "?"), "q": m.get("q", "")}
                 for m in st["mistakes"]]
        out["review_order"] = _INTERLEAVER.interleave(items)[:12]

    if _TEACHER is not None:
        concept = eng.concepts.get(goal)
        concept = eng.concepts.get(goal)
        t_title = concept.title if concept else goal
        task = _TEACHER.build({"topic": t_title},
                              mastery.get(goal, _m_of(goal)))
        if task is not None:
            out["teach_task"] = {"kind": task.kind, "prompt": task.prompt,
                                 "rubric": task.rubric}
    return out
