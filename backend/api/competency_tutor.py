"""competency_tutor.py -- deterministic tutor loop API.

Serves the competency-graph tutor built on backend/its/solver/tutor.py:
adaptive concept selection over the live catalog corpus, worked-example
question pool, numeric grading, hint ladder, mistake book.  Self-
contained (in-memory student store) so the app runs without the
database stack.
"""
from __future__ import annotations

import asyncio
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
from database import get_db

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


# discussion payloads are deterministic per concept (seed = concept id),
# but building one ran a full enhanced-nodes haystack search per serve;
# memoise by concept id (None = no usable misconception, also cached).
_DISC_CACHE: dict = {}
_DISC_MISS = object()
_disc_lock = threading.Lock()


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
        ckey = str(out.get("concept_id") or "")
        if concept is None or not title:
            return out
        cached = _DISC_CACHE.get(ckey, _DISC_MISS)
        if cached is not _DISC_MISS:
            if cached:
                out["discussion"] = cached
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
        with _disc_lock:
            _DISC_CACHE[ckey] = discussion or None
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
    _t0 = time.perf_counter()
    eng = _get_engine()
    out = eng.serve(sid, subject, class_level,
                    request_self_check=self_check)
    _t_eng = time.perf_counter()
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
    _t_fade = time.perf_counter()
    out = _attach_serve_voice(_attach_discussion(out, eng), sid)
    _t_end = time.perf_counter()
    eng_ms = (_t_eng - _t0) * 1000
    fade_ms = (_t_fade - _t_eng) * 1000
    attach_ms = (_t_end - _t_fade) * 1000
    if eng_ms > 500 or fade_ms > 500 or attach_ms > 500:
        # warning-level: gunicorn's default root level drops INFO
        logger.warning("serve slow: eng=%.0fms fade=%.0fms attach=%.0fms sid=%s",
                    eng_ms, fade_ms, attach_ms, sid)
    _LAST_SERVE[sid] = time.time()
    return out


@router.post("/submit")
async def submit(
    body: SubmitBody,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
    db=Depends(get_db),
):
    sid = _bound_student_id(body.student_id, credentials)
    eng = _get_engine()
    with _lock:
        out = eng.submit(sid, body.question_id, body.answer)
    if "error" in out:
        # Corpus fallback — questions served by
        # /api/content/nodes/{id}/questions are BoardQuestion rows, not
        # engine pool items. Resolve + grade them here so the learn
        # quiz flow works end-to-end on one submit endpoint.
        out = await _submit_corpus(db, body.question_id, body.answer)
        if out is None:
            raise HTTPException(404, "unknown question_id")
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


async def _submit_corpus(db, question_id: str, answer: str) -> Optional[dict]:
    """Grade a submission against a BoardQuestion row (corpus questions
    served by /api/content/nodes/{id}/questions). Returns a submit-shaped
    payload, or None when the id isn't a BoardQuestion UUID."""
    import uuid as _uuid
    try:
        qid = _uuid.UUID(str(question_id))
    except (ValueError, AttributeError, TypeError):
        return None
    from sqlalchemy import select as _sel
    from backend.models.enrichment import BoardQuestion
    q = (await db.execute(
        _sel(BoardQuestion).where(BoardQuestion.id == qid))).scalar_one_or_none()
    if q is None:
        return None
    # Light deterministic match first (number/normalized text), then the
    # LLM rubric grader for prose — same pipeline as /api/practice/submit.
    correct = False
    marks_awarded = None
    feedback = None
    try:
        import re as _re
        def _norm(s: str) -> str:
            return " ".join(_re.sub(r"[^a-z0-9. ]", " ", (s or "").lower()).split())
        sa, ca = _norm(answer), _norm(str(q.correct_answer or ""))
        if sa and ca:
            nums = _re.findall(r"-?\d+\.?\d*", sa)
            cnums = _re.findall(r"-?\d+\.?\d*", ca)
            correct = (sa in ca or ca in sa or
                       (bool(nums) and bool(cnums) and nums == cnums[:len(nums)]))
    except Exception:
        pass
    if not correct:
        try:
            from services.llm_grader import LLMGrader
            scheme = q.marking_scheme or ""
            rubric = [
                {"id": f"c{i+1}", "text": line.strip()}
                for i, line in enumerate(str(scheme).split("\n"))
                if line.strip() and len(line.strip()) > 10
            ][:6] or None
            result = await LLMGrader.grade(
                student_answer=answer or "",
                model_answer=str(q.correct_answer or q.model_answer or ""),
                rubric=rubric,
                max_marks=int(q.marks or 3),
            )
            marks_awarded = result.marks_awarded
            correct = result.marks_awarded >= max(1, result.max_marks // 2)
        except Exception:
            pass
    # LLM offline (no Ollama in deploy): embedding cosine catches correct
    # paraphrases — exact-match-only grading marked them incorrect (B23).
    # Cosine alone is NOT proof of correctness for short answers: an
    # unrelated sentence ("Photosynthesis is how plants make glucose...")
    # scores ~0.69 against a long model answer and plain garbage ~0.70,
    # so anything passed at the old bare-0.62 gate. Require a real
    # content-word overlap (>= 2 shared words AND >= 25% of the answer's
    # content words present in the model answer) BEFORE trusting cosine.
    if not correct and answer and q.correct_answer:
        try:
            _STOP = {
                "that", "this", "with", "from", "have", "they", "will",
                "been", "their", "which", "would", "there", "could",
                "same", "like", "when", "then", "than", "into", "only",
                "also", "because", "about", "them", "your", "each",
            }

            def _content_words(s: str) -> set:
                return {w for w in re.findall(r"[a-z]+", str(s).lower())
                        if len(w) > 3 and w not in _STOP}

            aw = _content_words(answer)
            cw = _content_words(str(q.correct_answer))
            shared = aw & cw
            overlap_ok = (len(shared) >= 2
                          and len(shared) >= 0.25 * max(len(aw), 1))
            if overlap_ok:
                from backend.services.embedding_service import EmbeddingService
                svc = await EmbeddingService.get_instance()
                ea, eb = await asyncio.gather(
                    svc.encode(answer), svc.encode(str(q.correct_answer)))
                import math
                dot = sum(x * y for x, y in zip(ea, eb))
                na = math.sqrt(sum(x * x for x in ea)) or 1.0
                nb = math.sqrt(sum(x * x for x in eb)) or 1.0
                sim = dot / (na * nb)
                if sim >= 0.62:
                    correct = True
                    marks_awarded = int(q.marks or 3)
                    feedback = "Correct — matches the expected concept."
        except Exception:
            pass
    out = {
        "question_id": str(q.id),
        "outcome": "correct" if correct else "incorrect",
        "correct": correct,
        "marks_awarded": marks_awarded,
        "feedback": feedback,
        "correct_answer": q.correct_answer,
        "model_answer": q.model_answer,
        "explanation": q.explanation,
        "title": (q.node_tags or [""])[0],
        "source": "corpus",
    }
    # misconception-targeted remediation: wrong answer -> surface the
    # node's authored misconception + wrong-answer signals so the student
    # sees *why* this specific error happens, not just the right answer
    if not correct:
        for nid in (q.node_tags or []):
            try:
                from backend.services.enhanced_nodes import (
                    misconception_for_node, sims_for_node)
                rem = misconception_for_node(nid)
                sims = sims_for_node(nid)
            except Exception:
                rem, sims = None, []
            if rem:
                out["remediation"] = {
                    "node_misconception": rem.get("misconception"),
                    "wrong_signals": rem.get("wrong_signals"),
                }
            if sims:
                out["sims"] = sims[:3]
            if rem or sims:
                break
    return out


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


#: Domain-neutral question-scaffold words.  They never indicate subject,
#: so they must not become the anchor term ("explain acid vs base" would
#: otherwise anchor on 'explain' and refuse the right explainer entry).
#: Extended (GRADE-MAP P1): the generic phrasing of student doubts
#: ("what is the simplest way to understand X", "give me one exam-style
#: question on this topic") must never drive the corpus search -- those
#: words scored the c12 "Writing Skills" / c11 trigonometry nodes and
#: misrouted Class 6 doubts across class AND subject.
_SCAFFOLD_TERMS = frozenset("""
explain explained explains explaining difference differences different
differentiate between meaning mean means define defined definition
concept concepts example examples important importance describe
described description comparison compare compared versus
simple simplest easy easiest easily best way ways topic topics
exam exams examination style styles question questions
understand understands understanding explanation
""".split())


#: Distinctive subject markers for the anchoring gate.  A question that
#: carries one subject's vocabulary must never be answered by authored
#: content of a DISJOINT subject: "psychosis vs neurosis" (psychology)
#: must not reach an Accountancy BRS entry, and a cash-book/passbook
#: question must not reach Psychology.  Kept deliberately tight -- every
#: marker is unambiguous subject vocabulary (no "conditioning", no
#: "credit" style cross-domain words).
_SUBJECT_MARKERS = {
    "psychology": (
        "psychology", "psychologist", "psychiatry", "psychiatric",
        "neurosis", "neurotic", "psychosis", "psychotic",
        "psychoanalysis", "psychoanalytic", "behaviourism", "behaviorism",
        "gestalt", "hallucination", "delusion", "phobia", "phobic",
        "cognition", "cognitive", "psychometric",
    ),
    "accountancy": (
        "accountancy", "bookkeeping", "journalise", "journalising",
        "journalize", "journalizing", "passbook", "cashbook", "cash book",
        "ledger", "trial balance", "bank reconciliation", "brs",
        "bills payable", "bills receivable", "bill payable",
        "bill receivable", "double entry", "compensating error",
        "trade payables", "trade receivables",
    ),
}

#: Corpus subject codes (enhanced-nodes filenames) mapped to the same
#: marker tags, so the enhanced-nodes lane can gate on the node's OWN
#: metadata instead of sniffing its text.
_NODE_SUBJECT_TAGS = {
    "psy": frozenset({"psychology"}),
    "acc": frozenset({"accountancy"}),
}


def _subject_marker_hits(text: str) -> frozenset:
    """Subject tags whose distinctive markers occur in ``text``."""
    hay = " " + re.sub(r"[^a-z0-9]+", " ", str(text or "").lower()) + " "
    hits = set()
    for tag, markers in _SUBJECT_MARKERS.items():
        for mk in markers:
            if " " in mk:                       # phrase marker
                if f" {mk} " in hay:
                    hits.add(tag)
                    break
            elif f" {mk} " in hay or (len(mk) >= 6 and mk in hay):
                hits.add(tag)
                break
    return frozenset(hits)


def _subject_anchored(question: str, text: str) -> bool:
    """Subject-anchoring gate, same principle as the enhanced-nodes lane:
    the matched authored text must share at least one distinctive
    content word (>= 6 chars, non-scaffold) with the question, so a pure
    science keyword can never be answered by a literature entry (and
    vice versa) on scaffold words alone.  Questions carrying no
    distinctive term (every content word < 6 chars) stay governed by the
    lane's own curated matching -- only distinctive-term collisions are
    gated.

    On top of the term gate, a subject-class gate: when the question
    carries distinctive markers of one subject (psychology, accountancy)
    and the matched text carries markers of a DIFFERENT subject only,
    the match is rejected even if a generic term overlaps ("difference
    between psychosis and neurosis" must not answer from Accountancy).
    """
    terms = [t for t in _explainer.informative_terms(question)
             if t not in _SCAFFOLD_TERMS and len(t) >= 6]
    if not terms:
        return True
    hay = str(text or "").lower()
    flat = hay.replace(" ", "")   # 'per cent' vs 'percent' tokenization
    if not any(t in hay or t.rstrip("s") in hay or t in flat for t in terms):
        return False
    q_tags = _subject_marker_hits(question)
    if q_tags:
        t_tags = _subject_marker_hits(text)
        if t_tags and not (q_tags & t_tags):
            return False
    return True


def _teach_lane(question: str,
                class_level: Optional[int] = None) -> Optional[dict]:
    """The WHY-lane: authored teaching answers before the solver.

    Priority: (1) the simple-explainer table of 40 classic confusions,
    (2) the misconception catalog (detector pattern or question trigger),
    (3) the enhanced-nodes teaching corpus (best-effort full-text search).
    Computational questions never enter this lane -- they belong to the
    verified solver.  Every authored-text lane is subject-anchored: the
    question's longest distinctive term must occur in the matched text.

    GRADE-MAP P1: when the asker's class is known, the corpus search is
    restricted to THAT class.  A Class 6 doubt must never be taught from
    a Class 11 psychology node ("symmetry") or a Class 10 biology node
    ("photosynthesis") -- if the class has no matching node the ask
    honestly falls through to the guided lane instead."""
    # computational questions always fall through to the solver
    if _explainer.looks_computational(question):
        return None

    # 1. classic-confusion table (authored in simple_explainer)
    m = _explainer.find_explanation(question)
    if m is not None and _subject_anchored(question, m["text"]):
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
            if not _subject_anchored(raw, f"{desc} {rem}"):
                continue
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
        # Scaffold words ("difference", "between", "explain", "simplest",
        # "exam-style", ...) must neither score the search nor anchor the
        # match: they occur in nearly every definition, so a
        # scaffold-anchored hit let "psychosis vs neurosis" teach a
        # biology/speciation (and earlier an Accountancy BRS) node.  Only
        # subject-distinctive terms may drive this lane.
        terms = [t for t in _explainer.informative_terms(question)
                 if t not in _SCAFFOLD_TERMS]
        # class gate (GRADE-MAP P1): search the asker's OWN class only --
        # a global search is what routed Class 6 doubts to Class 10-12
        # nodes.  No class known -> search stays global but keeps the
        # anchoring gate below.
        hits = []
        if terms:
            try:
                hits = index.search(" ".join(terms), limit=3,
                                    cls=int(class_level))
            except (TypeError, ValueError):
                hits = []
    except Exception:
        return None
    # Score gate: a focused single-topic ask ("photosynthesis") maxes the
    # searcher at 4.0 (definition 3 + body 1), so the global lane's 6.0
    # bar rejected EVERY focused doubt — the real reason ~40% of asks
    # fell through empty.  Within the asker's OWN class (a curated,
    # on-grade corpus) a definition hit is strong evidence: 4.0 passes.
    # Globally (no class known) the strict 6.0 bar stays.
    score_gate = 4.0 if class_level is not None else 6.0
    if hits and float(hits[0].get("score") or 0.0) >= score_gate:
        node = index.get(hits[0]["node_id"])
        # Subject-class gate from the node's OWN metadata: a question
        # carrying distinctive psychology/accountancy vocabulary is never
        # taught from a node of a disjoint subject.
        q_tags = _subject_marker_hits(question)
        if q_tags:
            n_tags = _NODE_SUBJECT_TAGS.get(
                str((node or {}).get("subject") or "").strip().lower(),
                frozenset())
            if n_tags and not (q_tags & n_tags):
                return None
        definition = str((node or {}).get("definition") or "").strip()
        if node is not None and definition:
            # the question's longest distinctive term must appear in the
            # matched node — topical anchoring, not generic-word noise
            # ('photosynthesis' must be IN the matched node's own text)
            longest = max(terms, key=len) if terms else ''
            # GRADE-MAP P1: inside the asker's own class the anchor floor
            # drops to 4 (the informative-term floor) so short but exact
            # curriculum terms anchor too — "What is a noun?" must reach
            # the Class 6 grammar node.  The global lane keeps >= 6.
            min_anchor = 4 if class_level is not None else 6
            if len(longest) < min_anchor \
                    or longest not in definition.lower():
                return None
            walkthrough = str(node.get("walkthrough") or "").strip()
            if len(walkthrough) > 900:
                walkthrough = walkthrough[:900].rstrip() + " ..."
            answer = definition + (("\n\n" + walkthrough)
                                   if walkthrough else "")
            return _teach_response(
                "enhanced_nodes", answer,
                node_id=node["node_id"],
                # Doubt→Story bridge: the question resolved to a real
                # corpus node, so the answer carries its verified Story
                # Mode deep link (additive field; every other lane --
                # explainer table, misconception catalog, solver --
                # resolves no node and stays exactly as it was).
                story_url=f"/learn/{node['node_id']}/story",
                topic=definition[:120])
    return None


# Deep-lane budget for /ask: the teach lane's corpus search and the
# solver lanes are synchronous and index-backed (~213MB enhanced-nodes
# index; cold load can take minutes).  The budget MUST stay under
# nginx's proxy_read_timeout (120s) so the client always gets a real
# JSON answer instead of a 502, and the work runs in a thread so the
# event loop keeps heartbeating (an inline call got the worker
# SIGKILLed by gunicorn's arbiter mid-request).
_ASK_BUDGET_S = 75
_ASK_SOLVE_SLOTS = asyncio.Semaphore(2)


def _ask_sync(question: str, class_level: Optional[int] = None) -> dict:
    """Teach lane first, then the deterministic solver lanes (sync).

    Runs on a worker thread (see /ask) — never inline in the async
    handler."""
    teach = _teach_lane(question, class_level)
    if teach is not None:
        return teach
    from backend.its.solver.answer_pipeline import answer as _solve
    r = _solve(question)
    # [object Object] guard: socratic here is STUDENT-FACING text.  The
    # pipeline's structured confirm-data objects (multi_hop / multi_part
    # / concept guidance dicts) leaked into replies as "[object Object]"
    # through the renderer's String() coercion -- only genuine strings
    # may ride through.
    socratic = getattr(r, "socratic", None)
    if not isinstance(socratic, str):
        socratic = None
    return {
        "verified": r.label == "VERIFIED",
        "label": r.label,
        "answer": r.answer,
        "steps": [s for s in (r.steps or [])[:8]
                  if isinstance(s, str)],
        "refusal_reason": getattr(r, "refusal_reason", None),
        "socratic": socratic,
    }


def _guided_fallback(refusal_reason: str,
                     route: Optional[list] = None) -> dict:
    """The honest guided fallback (GRADE-MAP P1, empty-answer fix).

    ~40% of /ask calls answered non-computational doubts with a bare
    200 + EMPTY answer field — the child sees nothing.  Every
    unanswerable ask now returns THIS instead: label GUIDED, an
    explicit student-facing guided message in ``answer``, and the
    machine reason in ``refusal_reason``.  Same shape as the
    budget-fallback path that already existed."""
    reason = (refusal_reason or "").strip() or (
        "no verified teaching content matches this question")
    answer = (
        "I could not verify an answer for this from your class material, "
        "so I won't guess one — a wrong shortcut sticks. "
        f"{reason.rstrip('.')}. "
        "Try rephrasing it as one concrete question from a chapter you "
        "are studying, or open the topic in Learn for the full story.")
    return {
        "verified": False,
        "label": "GUIDED",
        "answer": answer,
        "steps": [],
        "refusal_reason": reason,
        "socratic": None,
        "route": route or ["ask:guided_fallback"],
    }


def _ensure_honest_answer(result: dict) -> dict:
    """Post-process a solved /ask payload: guided-tier results (answer
    None/empty) never leave the endpoint as an empty field — they are
    normalised into the honest guided fallback (answer text + reason)."""
    try:
        if result.get("teach"):
            return result
        answer = result.get("answer")
        if isinstance(answer, str) and answer.strip():
            return result
        # non-string answers (defensive) count as empty too
        route = (result.get("route")
                 if isinstance(result.get("route"), list)
                 else []) + ["ask:guided_fallback",
                             "ask:empty_answer_normalized"]
        return _guided_fallback(str(result.get("refusal_reason") or ""),
                                route=route)
    except Exception:
        return result


class AskBody(BaseModel):
    student_id: str = "guest"
    question: str
    #: the asker's class (the signed-in student's class_level, or the
    #: class picked on the atlas hero).  When present, the teach lane
    #: searches ONLY that class's corpus — a Class 6 doubt is never
    #: taught from a Class 10-12 node (GRADE-MAP P1 misroute fix).
    class_level: Optional[int] = None


@router.post("/ask")
async def ask(body: AskBody):
    """Natural-language free-text asking.

    WHY-LANE first: conceptual questions that match an authored teaching
    answer (simple-explainer table, misconception catalog, enhanced-node
    diagnostics) get a teach-style response -- verified content from the
    authored files, labeled "teach": true, never a machine-verified
    numeric.  When the asker's class is known (``class_level``), the
    enhanced-node search is scoped to THAT class, so a Class 6 doubt can
    no longer be taught from a Class 10-12 node (GRADE-MAP P1).
    Everything else falls through to the deterministic solver lanes,
    where VERIFIED answers carry steps and anything unverified leaves as
    the HONEST GUIDED FALLBACK -- a real student-facing message plus the
    machine refusal reason -- never a bare 200 with an empty answer
    field, and never invented content.

    Both lanes are offloaded to a thread with a hard budget: past the
    budget the endpoint answers with the same honest guided fallback."""
    if not body.question.strip():
        raise HTTPException(400, "empty question")

    async def _solve_with_budget():
        async with _ASK_SOLVE_SLOTS:
            return await asyncio.to_thread(_ask_sync, body.question,
                                           body.class_level)

    try:
        result = await asyncio.wait_for(_solve_with_budget(),
                                        timeout=_ASK_BUDGET_S)
    except asyncio.TimeoutError:
        return _guided_fallback(
            "the deep solver did not finish this question within its "
            f"{_ASK_BUDGET_S}s budget. Try rephrasing it as one "
            "concrete computation, or use guided practice.",
            route=["ask:budget_exceeded"])
    return _ensure_honest_answer(result)


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
