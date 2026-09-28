"""
Practice API Router — K-12 Learning Platform (CISCE/ICSE/ISC)
============================================================

Complete practice session lifecycle with IRT-based question selection,
real-time mastery tracking via BKT/IRT/AFM, and spaced-repetition review.

Endpoints:
  POST /api/practice/start              → Create session + first question
  POST /api/practice/{id}/submit        → Submit answer → feedback + next question
  GET  /api/practice/{id}               → Current session state
  POST /api/practice/{id}/end           → End session + summary
  GET  /api/practice/{id}/summary       → Summary for completed session
  POST /api/practice/{id}/skip          → Skip question, get next
  GET  /api/practice/review/{student_id} → Spaced-repetition review items
"""

from __future__ import annotations

import logging
import re
import uuid
from datetime import datetime, timezone
from typing import Any, Optional, Literal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from backend.security import decode_access_token
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from database import get_db, Student, PracticeSession, Attempt, Mastery
from services.practice_service import PracticeService
from services.question_selector import QuestionSelector
from services.mastery_sync import MasterySyncService, get_shared_service
from services.analytics_service import AnalyticsService


logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/practice", tags=["Practice"])


# ═══════════════════════════════════════════════════════════════
#  Session meta helpers — session_meta JSONB stores dynamic state
# ═══════════════════════════════════════════════════════════════

def _meta_get(session: PracticeSession, key: str, default: Any = None) -> Any:
    """Read a key from session_meta JSONB."""
    meta = session.session_meta or {}
    return meta.get(key, default)

def _meta_set(session: PracticeSession, key: str, value: Any) -> None:
    """Write a key to session_meta JSONB.

    Assigns a fresh dict: mutating the existing mapping in place (or
    re-assigning the same object) is invisible to SQLAlchemy's change
    detection, so the UPDATE would be skipped and every post-create
    meta write (issued questions, answers, status) silently lost."""
    meta = dict(session.session_meta or {})
    meta[key] = value
    session.session_meta = meta

def _meta_inc(session: PracticeSession, key: str, by: int = 1) -> int:
    """Increment a counter in session_meta, return new value."""
    cur = _meta_get(session, key, 0) or 0
    new = cur + by
    _meta_set(session, key, new)
    return new


# ═══════════════════════════════════════════════════════════════
#  Session store round-trip support
#
#  Questions come from the IRT selector as plain dicts (generated,
#  not rows in a questions table), so the session row itself must
#  carry them: session_meta["questions"] maps question_id -> question
#  dict.  GET /{id} and /submit resolve the issued question_id from
#  that store; a process-local dict covers the no-DB demo mode so
#  start -> get -> submit -> summary always round-trips.
# ═══════════════════════════════════════════════════════════════

_MEM_SESSIONS: dict[str, dict] = {}

# Cross-student access control: sessions started by an authenticated
# caller stamp the token's auth user id; any OTHER authenticated caller
# is rejected (B07). Anonymous/demo callers keep legacy behavior.
_opt_bearer = HTTPBearer(auto_error=False)


async def _caller_sub(
    creds: HTTPAuthorizationCredentials | None = Depends(_opt_bearer),
) -> Optional[str]:
    """Auth-sub of the caller, or None for anonymous callers."""
    if creds is None:
        return None
    payload = decode_access_token(creds.credentials)
    if not payload:
        return None
    sub = str(payload.get("sub") or "").strip()
    return sub or None


async def _caller_class_level(db: AsyncSession, sub: Optional[str]) -> Optional[int]:
    """Class level of the authenticated user (users.class_level → int), or None.

    Used to keep the question pool class-appropriate when the session's
    student row has no numeric class (e.g. the shared demo row)."""
    if db is None or not sub:
        return None
    try:
        from backend.models.user import User
        row = (await db.execute(
            select(User.class_level).where(User.id == sub))).scalar_one_or_none()
        if row is None:
            return None
        m = re.search(r"\d+", str(row))
        return int(m.group()) if m else None
    except Exception:
        return None


def _enforce_session_owner(session: Any, caller_sub: Optional[str]) -> None:
    """Reject authenticated access to another student's session (403).

    Ownerless (anonymous/demo-created or legacy pre-owner-stamp)
    sessions keep their previous visibility."""
    if caller_sub is None:
        return
    try:
        owner = _meta_get(session, "auth_user_id", None)
    except Exception:
        owner = None
    if owner and str(owner) != str(caller_sub):
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            detail="This practice session belongs to another student.",
        )

# Sentinel name for the shared demo student row. The `students` table
# has no email column — lookups must key on name + student_class.
_DEMO_STUDENT_NAME = "Practice Demo (shared)"


def _q_attr(question: Any, name: str, default: Any = None) -> Any:
    """Read a field off a question that may be a dict (selector
    output) or an ORM-like object."""
    if isinstance(question, dict):
        return question.get(name, default)
    return getattr(question, name, default)


_NODE_ID_RE = re.compile(r"c\d{1,2}_[a-z0-9_]+?_\d{1,2}_\d{1,3}")


async def _fetch_remediation(
    db: AsyncSession, question: Any
) -> tuple[Optional[str], Optional[str], list[dict[str, str]]]:
    """Misconception-aware remediation for a WRONG answer.

    The question's source node carries authored pedagogy in
    enrichment_content: `common_misconception` (what the typical wrong
    answer reveals) and `on_failure` (stepped remediation scripts). A
    question-level `misconception`/`misconception_if_wrong` field (the
    corpus diagnostic answers embed one) wins when present.

    Authored remediation text can embed raw corpus node ids
    ("revisit c12_phy_cbse_02_001") — those are internal identifiers and
    are rewritten to the referenced node's title before reaching the
    student. Review topics are also returned as {title, slug} dicts so
    the client can render links without ever seeing an id.
    """
    if db is None:
        return None, None, []
    # 1) question-level misconception wins (most specific to this answer)
    miscon = (
        _q_attr(question, "misconception_if_wrong")
        or _q_attr(question, "misconception")
        or None
    )
    remediation: Optional[str] = None
    review_ids: list[str] = []
    node_id = _q_attr(question, "node_id")
    if not node_id:
        return miscon, None, []
    try:
        from backend.models.enrichment import EnrichmentContent

        ec = (
            await db.execute(
                select(EnrichmentContent).where(
                    EnrichmentContent.node_id == str(node_id)
                )
            )
        ).scalar_one_or_none()
    except Exception:
        return miscon, None, []
    if ec is None:
        return miscon, None, []
    if not miscon:
        miscon = ec.common_misconception
    steps = ec.on_failure or []
    if isinstance(steps, list):
        for step in steps:
            if isinstance(step, dict) and step.get("remediation_text"):
                remediation = step["remediation_text"]
                review_ids = list(step.get("review_node_ids") or [])
                break
    # Resolve every referenced node (text-embedded ids + review ids) once.
    all_ids = list(dict.fromkeys(
        review_ids + _NODE_ID_RE.findall(remediation or "")
    ))
    review_topics: list[dict[str, str]] = []
    titles: dict[str, str] = {}
    if all_ids:
        try:
            from backend.models.enrichment import EnrichmentContent as _EC

            rows = (
                await db.execute(
                    select(_EC.node_id, _EC.title, _EC.slug).where(
                        _EC.node_id.in_(all_ids)
                    )
                )
            ).all()
            for r in rows:
                if r.title:
                    titles[r.node_id] = r.title
                if r.node_id in review_ids and r.title and r.slug:
                    review_topics.append({"title": r.title, "slug": r.slug})
        except Exception:
            pass
    if remediation:
        for nid, title in titles.items():
            remediation = remediation.replace(nid, f"'{title}'")
    return miscon, remediation, review_topics


async def _resolve_student_async(db: AsyncSession, requested: str) -> Optional[str]:
    """Async resolution of the requested student_id to a students-row
    UUID (see module notes: sessions must persist under the returned
    id even for demo/guest/free-text students)."""
    if db is None:
        return None
    rid = str(requested or "").strip()
    if rid:
        try:
            uuid.UUID(rid)
        except (ValueError, AttributeError, TypeError):
            rid = ""
        else:
            try:
                res = await db.execute(
                    select(Student).where(Student.id == rid))
                if res.scalar_one_or_none() is not None:
                    return rid
            except Exception:
                return None
            # a users.id with no students row yet -> mirror it via the
            # canonical bridge instead of dumping attempts on the demo row
            try:
                from backend.services.identity_bridge import ensure_student_row
                row = await ensure_student_row(db, rid)
                return str(row.id)
            except Exception:
                pass
    # non-UUID or missing student -> shared demo student (find or create).
    # students has no email column — key on the sentinel name + class tag.
    try:
        res = await db.execute(
            select(Student).where(
                Student.name == _DEMO_STUDENT_NAME,
                Student.student_class == "demo",
            ))
        demo = res.scalar_one_or_none()
        if demo is not None:
            return str(demo.id)
        demo = Student(
            name=_DEMO_STUDENT_NAME,
            student_class="demo",
        )
        db.add(demo)
        await db.flush()
        return str(demo.id)
    except Exception:
        return None


_Q_STORE_FIELDS = (
    "question_id", "text", "options", "correct_answer", "difficulty",
    "topic", "subtopic", "question_type", "marks", "explanation",
    "hints_available", "tolerance", "display_format",
    "node_id", "marking_scheme",  # server-side only — never sent to client
)


def _q_as_store_dict(q: Any) -> dict:
    """Normalized, JSON-storable form of a question (selector dicts and
    ORM-like objects both map onto this)."""
    out: dict[str, Any] = {}
    for f in _Q_STORE_FIELDS:
        val = _q_attr(q, f, None)
        if val is not None:
            out[f] = val
    if not out.get("question_id"):
        out["question_id"] = str(_q_attr(q, "id", "") or "")
    return out


def _safe_difficulty(question: Any) -> float:
    """The answered question's difficulty on the selector's (0.1, 1.0]
    scale — the signal the adaptive context steps from.  Anything
    unreadable degrades to the mid starting point, never an exception."""
    try:
        return max(0.1, min(1.0, float(_q_attr(question, "difficulty", 0.5)
                                  or 0.5)))
    except (TypeError, ValueError):
        return 0.5


async def _select_adaptive_next(
    db: AsyncSession,
    session: Any,
    previous_correct: bool,
    previous_difficulty: float,
    exclude_ids: Optional[set] = None,
    max_tries: int = 12,
) -> Any:
    """ADAPT: ask the QuestionSelector for the next question with a REAL
    correctness signal (up after correct, down after wrong).

    Re-selects when the selector returns a question this session already
    issued (the selector's own repeat-guard keys on Attempt.seed_hash,
    which corpus rows don't populate) so a session never shows the same
    question twice.  Returns None only when the pool is exhausted."""
    selector = QuestionSelector(db)
    seen_ids = {str(i) for i in (exclude_ids or set())}
    seen_ids |= set((_meta_get(session, "questions", {}) or {}).keys())
    seen_ids.discard("")
    last: Any = None
    for _ in range(max_tries):
        nxt = await selector.select_next(
            session_id=str(session.id),
            student_id=str(session.student_id),
            subject=_meta_get(session, "subject", "general"),
            previous_correct=previous_correct,
            previous_difficulty=previous_difficulty,
            class_level=_meta_get(session, "class_level", None),
            topic_ids=_meta_get(session, "topic_ids", []) or [],
            exclude_question_ids=seen_ids,
        )
        if nxt is None:
            return None
        nqid = str(_q_attr(nxt, "question_id", "") or "")
        if nqid and nqid not in seen_ids:
            return nxt
        last = last or nxt  # keep the first pick as an honest last resort
    return last


class _MemSession:
    """Attribute-view over an in-memory demo session — mirrors the
    PracticeSession ORM surface the endpoints read (id, student_id,
    session_meta, created_at, ended_at)."""

    def __init__(self, rec: dict):
        self._rec = rec

    @property
    def id(self) -> str:
        return self._rec["id"]

    @property
    def student_id(self) -> str:
        return self._rec["student_id"]

    @property
    def session_meta(self) -> dict:
        return self._rec["session_meta"]

    @session_meta.setter
    def session_meta(self, value) -> None:
        self._rec["session_meta"] = value

    @property
    def created_at(self):
        return self._rec["created_at"]

    @property
    def ended_at(self):
        return self._rec["ended_at"]

    @ended_at.setter
    def ended_at(self, value) -> None:
        self._rec["ended_at"] = value


# ═══════════════════════════════════════════════════════════════
#  Pydantic v2 Schemas
# ═══════════════════════════════════════════════════════════════


class StartSessionRequest(BaseModel):
    """Request to spin up a new practice session."""

    student_id: str | None = Field(default=None, description="Student unique identifier")
    subject: str = Field(..., min_length=1, description="Subject slug (e.g. 'mathematics')")
    topic_ids: list[str] | None = Field(
        default=None, description="Specific topic IDs to focus on"
    )
    num_questions: int = Field(default=5, ge=1, le=20, description="Questions in this session")
    class_level: int | None = Field(
        default=None,
        description="Student's class (6-12). Falls back to the authenticated user's class; "
        "keeps the question pool class-appropriate.",
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "student_id": "stu_ICSE_001",
                "subject": "mathematics",
                "topic_ids": ["algebra_linear_equations", "quadratics"],
                "num_questions": 5,
            }
        }
    )


class SubmitAnswerRequest(BaseModel):
    """Submit a student's answer for the current question.

    Accepts both this API's canonical shape (answer/time_ms) and the web
    client's shape (selected_option + time_taken_seconds + hints_used).
    ``question_id`` is optional: when omitted, the session's CURRENT
    question (the one /start or the previous submit issued) is assumed,
    so the round-trip always accepts the question_id it issued.
    """

    question_id: str | None = Field(
        default=None,
        description="ID of question being answered; defaults to the "
                    "session's current question",
    )
    answer: str | None = Field(
        default=None,
        description="Student's answer (string or numeric); may be omitted "
                    "when selected_option is provided",
    )
    time_ms: int = Field(
        default=0, ge=0, le=3_600_000,
        description="Time spent on this question in milliseconds"
    )
    idempotency_key: str | None = Field(
        default=None,
        description="Client-generated key to safely retry (offline-replay support)",
    )
    # Web client compat fields.
    selected_option: int | None = Field(
        default=None, ge=0, le=9,
        description="MCQ option index chosen by the student (web client)",
    )
    time_taken_seconds: int | None = Field(
        default=None, ge=0, le=3_600,
        description="Time spent in seconds (web client)",
    )
    hints_used: int | None = Field(default=None, ge=0)

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "question_id": "gen_alg_3x_plus_7_22",
                "answer": "5",
                "time_ms": 4523,
            }
        }
    )


class SkipRequest(BaseModel):
    """Skip current question — optional reason for analytics."""

    reason: str | None = Field(default=None, max_length=200)


# ── Competency-badge lookup ──────────────────────────────

COMPETENCY_BADGES: dict[str, str] = {
    # Maths
    "algebra": "Algebraic Thinker",
    "geometry": "Geometry Explorer",
    "trigonometry": "Trigonometry Pro",
    "calculus": "Calculus Master",
    "statistics": "Data Detective",
    "probability": "Probability Analyst",
    "coordinate_geometry": "Graphing Guru",
    "mensuration": "Measurement Expert",
    "arithmetic": "Number Wizard",
    "matrices": "Matrix Maestro",
    # Physics
    "mechanics": "Physics Investigator",
    "electricity": "Circuit Wizard",
    "optics": "Light & Lens Expert",
    "heat": "Thermodynamics Explorer",
    "modern_physics": "Quantum Explorer",
    "sound": "Wave Explorer",
    # Chemistry
    "organic_chemistry": "Organic Chemist",
    "physical_chemistry": "Physical Chemist",
    "inorganic_chemistry": "Inorganic Chemist",
    # Biology
    "cell_biology": "Cell Biologist",
    "genetics": "Genetics Analyst",
    "ecology": "Eco Explorer",
    "human_physiology": "Body Systems Expert",
    # Humanities
    "literature": "Literature Scholar",
    "grammar": "Grammarian",
    "writing": "Writing Craftsperson",
    "history_ancient": "Ancient Historian",
    "history_medieval": "Medieval Scholar",
    "history_modern": "Modern Historian",
    "geography_physical": "Physical Geographer",
    "geography_human": "Human Geographer",
    # CS
    "programming": "Code Wizard",
    "data_structures": "Data Architect",
    "algorithms": "Algorithm Thinker",
}


class QuestionResponse(BaseModel):
    """A single question rendered for the student.

    Frontend uses `input_type` to decide the widget (text-input, numeric-keypad,
    MCQ radio group, etc.).  `options` is only populated for MCQ-style questions.
    """

    question_id: str
    text: str
    question_type: Literal["mcq", "numeric", "true_false", "fill_blank", "text"]
    options: list[str] | None = None
    input_type: Literal["text", "number", "select"] = "text"
    marks: int = 1
    difficulty: Literal["easy", "medium", "hard"] = "medium"
    competency_badge: str = "Curious Learner"
    topic: str
    subtopic: str | None = None
    hints_available: bool = False
    # Provenance: the source paper's year when the row is a real past-paper
    # question; absent for node-derived items (the chip hides then).
    year: Optional[str] = None
    # The backing node's internal id — fetch param only (hint lookups);
    # never rendered as student-facing text.
    node_id: Optional[str] = None


class SubmitAnswerResponse(BaseModel):
    """Feedback + next question in one payload — minimises round-trips.

    Frontend shows the feedback panel (correct/incorrect + explanation),
then reveals `next_question` (or a 'session complete' card).
    """

    is_correct: bool
    correct_answer: str
    explanation: str
    marks_awarded: int
    mastery_change: dict[str, Any]
    question_number: int
    total_questions: int
    is_complete: bool = False
    next_question: Optional[QuestionResponse] = None
    session_stats: dict[str, Any]
    # Misconception-aware remediation (wrong answers only): the node's
    # authored common_misconception + first on_failure remediation step.
    misconception: Optional[str] = None
    remediation: Optional[str] = None
    # Topics the remediation script suggests revisiting ({title, slug}).
    review_topics: list[dict[str, str]] = Field(default_factory=list)
    # Marking-scheme coaching (board questions): per-step marks breakdown.
    marking_feedback: Optional[dict[str, Any]] = None
    # Web client compat: it reads data.feedback.{is_correct,explanation,...}
    feedback: dict[str, Any] | None = None


class SessionStateResponse(BaseModel):
    """Live snapshot of an in-progress session."""

    session_id: str
    student_id: str
    subject: str
    topic_ids: list[str]
    status: Literal["active", "completed", "abandoned"]
    question_number: int
    total_questions: int
    current_question: QuestionResponse | None = None
    answered_count: int
    correct_count: int
    skipped_count: int
    time_spent_ms: int
    started_at: str
    elapsed_ms: int


class TopicPerformance(BaseModel):
    topic: str
    attempted: int
    correct: int
    mastery_before: float
    mastery_after: float
    avg_time_ms: int


class SessionSummaryResponse(BaseModel):
    """Post-session analytics with per-topic mastery delta and recommendations."""

    session_id: str
    student_id: str
    subject: str
    total_questions: int
    attempted: int
    skipped: int
    correct_count: int
    accuracy: float  # percentage 0-100
    total_time_ms: int
    mastery_changes: dict[str, Any]
    topic_performance: list[TopicPerformance]
    started_at: str
    ended_at: str
    recommended_next: list[str]


class ReviewItem(BaseModel):
    """A question flagged for spaced-repetition review."""

    question_id: str
    topic: str
    subtopic: str | None = None
    last_attempted_at: str
    days_since: int
    mastery_level: float
    urgency: Literal["overdue", "due_soon", "fresh"]


class ReviewResponse(BaseModel):
    student_id: str
    reviews: list[ReviewItem]
    total_due: int


# Resolve forward references for Pydantic v2
for _cls in [QuestionResponse, SubmitAnswerResponse, SessionStateResponse, SessionSummaryResponse]:
    try:
        _cls.model_rebuild()
    except Exception:
        pass


# ═══════════════════════════════════════════════════════════════
#  Endpoints
# ═══════════════════════════════════════════════════════════════


@router.get("/health", response_model=dict)
async def practice_health():
    """Health check for the practice service."""
    return {"status": "ok", "service": "practice"}


@router.post(
    "/start",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Start practice session",
    description="Creates a PracticeSession record, selects the first question via IRT-based selector, and returns both.",
)
async def start_session(
    req: StartSessionRequest,
    db: AsyncSession = Depends(get_db),
    caller_sub: Optional[str] = Depends(_caller_sub),
) -> dict:
    """Create a new practice session.

    1. Validates the student exists.
    2. Creates a ``PracticeSession`` DB row.
    3. Asks the ``question_selector`` for the first question.
    4. Returns session metadata + first question.

    Target: < 200 ms.
    """

    # Anonymous callers (no Authorization header AND no student_id) must
    # not silently mint demo-attributed sessions — B12/B20 regression.
    if not str(req.student_id or "").strip() and not caller_sub:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Sign in or pass an explicit student_id to start practice.",
        )

    # ── Verify student (lenient — allow demo/guest) ──
    # NOTE: signups create rows in the USERS table, not STUDENTS; a
    # signed-up student's UUID has no students row here, so an unknown
    # id is resolved onto the shared demo student by
    # _resolve_student_async instead of 404ing — the session must
    # persist under the returned id either way.
    db_available = True
    if db is not None and Student is not None:
        rid = str(req.student_id or "").strip()
        try:
            uuid.UUID(rid)
            is_uuid = True
        except (ValueError, AttributeError, TypeError):
            is_uuid = False
        if is_uuid:
            try:
                res = await db.execute(select(Student).where(Student.id == rid))
                if res.scalar_one_or_none() is None and db is not None:
                    # not a students row: mapped to the demo student
                    # below (same treatment as demo/guest/free text)
                    pass
            except HTTPException:
                raise
            except Exception:
                db_available = False  # DB not available — proceed with demo mode
        # non-UUID ids ("demo"/"guest"/free text) skip the existence
        # check: _resolve_student_async maps them onto a demo student
        # row so the session still persists

    # Resolve the student FIRST so the selector's mastery/attempt lookups
    # get a real UUID — a raw 'demo' string makes those queries throw.
    resolved_sid: Optional[str] = None
    if db_available and db is not None:
        resolved_sid = await _resolve_student_async(db, req.student_id)

    # Class pin for the question pool: explicit request → auth user's class.
    # Without it, sessions under the shared demo row (no numeric class) leak
    # off-class corpus questions into the pool.
    session_class: Optional[int] = None
    if req.class_level is not None:
        try:
            session_class = int(req.class_level)
        except (TypeError, ValueError):
            session_class = None
    if session_class is None:
        session_class = await _caller_class_level(db, caller_sub)

    # ── Select first question (do this before DB write so it works without DB) ──
    first_q = None
    selector = None
    try:
        selector = QuestionSelector(db if db_available else None)
        first_q = await selector.select_next(
            session_id="demo",
            student_id=resolved_sid or "demo",
            subject=req.subject or "general",
            class_level=session_class,
            topic_ids=req.topic_ids or [],
        )
    except Exception as exc:
        logger.warning("QuestionSelector failed during session start: %s", exc)

    if first_q is None:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="No questions available for this subject/topic combination.",
        )

    # ── Pre-generate the full session set (web client maps
    #    session.questions[]; each is stored server-side for grading) ──
    planned: list[Any] = [first_q]
    if selector is not None and req.num_questions > 1:
        seen = {str(_q_attr(first_q, "question_id", "") or "")}
        for _ in range(req.num_questions - 1):
            try:
                nq = await selector.select_next(
                    session_id="demo",
                    student_id=resolved_sid or "demo",
                    subject=req.subject or "general",
                    class_level=session_class,
                    topic_ids=req.topic_ids or [],
                    # chapter-gated pools are small and deterministic — the
                    # selector must skip what this session already issued
                    # instead of the loop breaking at the first repeat.
                    exclude_question_ids=seen,
                )
            except Exception:
                break
            nqid = str(_q_attr(nq, "question_id", "") or "")
            if not nqid or nqid in seen:
                break
            seen.add(nqid)
            planned.append(nq)
        # ADAPT: honest buffer — no fabricated correctness signal.  Order
        # the pre-generated set as a mid-out difficulty ladder so a client
        # that never splices the live next_question still walks a sensible
        # progression; the REAL steering happens in /submit.
        def _diff_of(q: Any) -> float:
            try:
                return float(_q_attr(q, "difficulty", 0.5) or 0.5)
            except (TypeError, ValueError):
                return 0.5
        if len(planned) > 2:
            rest = sorted(planned[1:], key=_diff_of)
            ladder: list[Any] = []
            lo, hi = 0, len(rest) - 1
            take_hi = True
            while lo <= hi:
                ladder.append(rest[hi] if take_hi else rest[lo])
                if take_hi:
                    hi -= 1
                else:
                    lo += 1
                take_hi = not take_hi
            planned = [planned[0]] + ladder

    # ── Build session record (only if DB available) ──
    db_session_id: Optional[str] = None
    if db_available and db is not None:
        try:
            if resolved_sid is None:
                raise RuntimeError("student resolution failed")
            session = PracticeSession(
                student_id=resolved_sid,
                questions_answered=0,
                started_at=datetime.now(timezone.utc),
                session_meta={
                    "subject": req.subject,
                    "topic_ids": req.topic_ids or [],
                    "requested_student_id": str(req.student_id),
                    "auth_user_id": caller_sub,
                    "class_level": session_class,
                    "class_level": session_class,
                    "num_questions": req.num_questions,
                    "current_index": 0,
                    "answered_count": 0,
                    "correct_count": 0,
                    "skipped_count": 0,
                    "status": "active",
                    "questions": {},     # question_id -> question dict
                },
            )
            db.add(session)
            await db.flush()

            qid = (_q_attr(first_q, "question_id", None)
                   or _q_attr(first_q, "id", ""))
            session.current_question_id = str(qid)
            _meta_set(session, "current_question_id", session.current_question_id)
            # persist the issued questions on the session: /submit and
            # GET /{id} resolve them from here (no questions table)
            _q_store = dict(_meta_get(session, "questions") or {})
            for pq in planned:
                _q_store[str(_q_attr(pq, "question_id", "") or "")] = _q_as_store_dict(pq)
            _meta_set(session, "questions", _q_store)
            await db.commit()
            await db.refresh(session)

            db_session_id = str(session.id)
            session_id = db_session_id
            started = session.created_at or datetime.now(timezone.utc)
        except Exception as exc:
            logger.warning("DB session creation failed, using demo mode: %s", exc)
            db_available = False

    if not db_available:
        import uuid as _uuid
        session_id = str(_uuid.uuid4())
        started = datetime.now(timezone.utc)
        # in-memory session: same fields the endpoints read, so the
        # start -> get -> submit -> summary round-trip still resolves
        _MEM_SESSIONS[session_id] = {
            "id": session_id,
            "student_id": str(req.student_id),
            "questions_answered": 0,
            "created_at": started,
            "ended_at": None,
            "session_meta": {
                "subject": req.subject,
                "topic_ids": req.topic_ids or [],
                "requested_student_id": str(req.student_id),
                "auth_user_id": caller_sub,
                "num_questions": req.num_questions,
                "current_index": 0,
                "answered_count": 0,
                "correct_count": 0,
                "skipped_count": 0,
                "status": "active",
                "current_question_id": str(_q_attr(first_q, "question_id", "") or ""),
                "questions": {
                    str(_q_attr(pq, "question_id", "") or ""): _q_as_store_dict(pq)
                    for pq in planned
                },
            },
        }

    first_q_resp = _format_question(first_q)
    # Web client compat: it maps session.questions[] and session.id.
    planned_dicts = []
    for pq in planned:
        d = _format_question(pq).model_dump()
        d["id"] = d.get("question_id", "")
        # web client expects options + correct_option index for MCQs.
        # GUARD: only real string lists qualify — some generator adapters
        # emit options as a dict, and dict.index 500s the whole start.
        pq_opts = _q_attr(pq, "options", None)
        if isinstance(pq_opts, list) and pq_opts and \
                all(isinstance(o, str) for o in pq_opts):
            d["options"] = pq_opts
            ca = str(_q_attr(pq, "correct_answer", "") or "")
            d["correct_option"] = (
                pq_opts.index(ca) if ca in pq_opts else 0)
        planned_dicts.append(d)
    return {
        "id": str(session_id),
        "session_id": str(session_id),
        "subject": req.subject,
        "question_number": 1,
        "total_questions": req.num_questions,
        "current_question": first_q_resp,
        "questions": planned_dicts,
        "status": "active",
        "started_at": started.isoformat(),
    }


@router.post(
    "/{session_id}/submit",
    response_model=SubmitAnswerResponse,
    summary="Submit answer and receive feedback + next question",
    description="""
The primary interaction endpoint.

1. Validates session & question.
2. Checks answer correctness (numeric tolerance + string match).
3. Updates mastery via BKT/IRT model (knowledge_tracing + mastery_sync).
4. Persists Attempt.
5. Selects next question (excludes already-attempted IDs).
6. Returns feedback + next question in ONE response.

Target round-trip: < 200 ms.
    """,
)
async def submit_answer(
    session_id: str,
    req: SubmitAnswerRequest,
    db: AsyncSession = Depends(get_db),
    caller_sub: Optional[str] = Depends(_caller_sub),
) -> SubmitAnswerResponse:
    """Submit an answer, get correctness feedback, explanation, and next question."""

    # ── Idempotency guard (offline replay support) ──
    if req.idempotency_key:
        try:
            existing = await db.execute(
                select(Attempt).where(
                    Attempt.session_id == session_id,
                    Attempt.question_id == req.question_id,
                )
            )
            prev = existing.scalar_one_or_none()
            if prev and prev.answer == str(req.answer):
                logger.debug("Idempotent replay for session=%s q=%s", session_id, req.question_id)
        except Exception:
            pass  # DB unavailable — non-fatal

    # ── Validate session ──
    session = await _get_active_session(session_id, db)
    _enforce_session_owner(session, caller_sub)

    # ── Resolve the question: an explicit question_id wins; otherwise
    #    the session's CURRENT question (the one /start or the previous
    #    submit issued) — so the endpoint accepts the question_id the
    #    session issued even when the client omits it. ──
    qid_requested = str(req.question_id or "").strip() or str(
        _meta_get(session, "current_question_id", "") or "")
    question = await _get_question(qid_requested, db, session)
    if question is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=f"Question '{qid_requested}' not found.",
        )

    # ── Resolve the answer (web client may send selected_option instead) ──
    answer = req.answer
    if (answer is None or str(answer).strip() == "") and req.selected_option is not None:
        opts = _q_attr(question, "options", None) or []
        idx = req.selected_option
        answer = str(opts[idx]) if 0 <= idx < len(opts) else str(idx)
    time_ms = req.time_ms or (req.time_taken_seconds or 0) * 1000

    # ── Evaluate answer ──
    is_correct = await _evaluate_answer(question, str(answer))
    marks = (_q_attr(question, "marks", 1) or 1) if is_correct else 0

    # ── Update mastery via BKT/IRT model ──
    mastery_delta: dict[str, Any] = {}
    try:
        sync = await get_shared_service()
        result = await sync.update_on_attempt(
            student_id=str(session.student_id),
            topic_id=_q_attr(question, "node_id", None)
                     or _q_attr(question, "topic", "") or qid_requested,
            correct=is_correct,
            time_ms=time_ms,
            subject=_meta_get(session, "subject", "general"),
        )
        mastery_delta = result if isinstance(result, dict) else {"mastery_before": 0.0, "mastery_after": 0.0}
    except Exception as exc:
        logger.warning("MasterySyncService.update_on_attempt failed: %s", exc)
        mastery_delta = {"error": str(exc), "mastery_before": 0.0, "mastery_after": 0.0}

    # ── Record attempt ──
    # Skip persistence entirely when the session's student_id isn't a UUID
    # (in-memory demo session): attempts.student_id is a UUID FK and a bad
    # cast at flush poisons the whole transaction (PendingRollbackError 500).
    _sid_ok = True
    try:
        uuid.UUID(str(session.student_id))
        uuid.UUID(str(session.id))
    except (ValueError, AttributeError, TypeError):
        _sid_ok = False
    if _sid_ok:
        try:
            attempt = Attempt(
                session_id=session.id,
                question_seed=qid_requested,
                student_id=session.student_id,
                answer={"value": str(answer), "question_id": qid_requested},
                correct=is_correct,
                marks_awarded=marks,
                time_ms=time_ms,
                created_at=datetime.now(timezone.utc),
            )
            db.add(attempt)
        except Exception as exc:
            logger.warning("Attempt persistence failed: %s", exc)

        # ── Propagate progress: XP, streak, activity log ──
        # Practice answers are real quiz activity; without this the users row
        # (XP/level/streak read by login, dashboards, parent view) never moves.
        # XP amounts mirror the assessment quiz path (10 correct / 2 wrong).
        try:
            from backend.services.progress_service import ProgressService
            _uid = str(session.student_id)
            await ProgressService.award_xp(db, _uid, 10 if is_correct else 2)
            await ProgressService.update_streak(db, _uid)
            await ProgressService.log_activity(
                db,
                _uid,
                activity_type="quiz",
                title=f"Practice: {str(_q_attr(question, 'question_text', None) or _q_attr(question, 'text', '') or '')[:60]}",
                subject=_meta_get(session, "subject", "general"),
                score="correct" if is_correct else "incorrect",
                metadata={
                    "question_id": qid_requested,
                    "session_id": str(session.id),
                    "is_correct": is_correct,
                    "time_taken_seconds": time_ms // 1000,
                },
            )
        except Exception as exc:
            logger.warning(
                "Progress propagation failed for student %s: %s",
                session.student_id, exc,
            )

    # ── Emit analytics event to ClickHouse ──
    try:
        analytics = AnalyticsService()
        analytics.emit_question_answered(
            user_id=str(session.student_id),
            question_id=qid_requested,
            node_id=_q_attr(question, "node_id", None)
                    or _q_attr(question, "topic", ""),
            subject=_meta_get(session, "subject", "general"),
            class_level=0,
            is_correct=is_correct,
            marks_awarded=float(marks),
            max_marks=_q_attr(question, "marks", 1) or 1,
            time_spent_seconds=req.time_ms // 1000,
            question_type=_q_attr(question, "question_type", "text"),
            mastery_before=mastery_delta.get("mastery_before", 0.0) if isinstance(mastery_delta, dict) else 0.0,
            mastery_after=mastery_delta.get("mastery_after", 0.0) if isinstance(mastery_delta, dict) else 0.0,
        )
    except Exception as exc:
        logger.debug("Analytics emission failed: %s", exc)

    # ── Emit to intelligence bus — drives remediation + concept gaps ──
    try:
        from backend.services.intelligence_bus import (
            emit_student_answer, emit_hint,
        )
        emit_student_answer(
            problem_type_id=_q_attr(question, "topic", "") or qid_requested,
            correct=is_correct,
            student_id=str(session.student_id),
        )
        for _ in range(req.hints_used or 0):
            emit_hint(
                problem_type_id=_q_attr(question, "topic", "") or qid_requested,
                rung=1,
                student_id=str(session.student_id),
            )
    except Exception as exc:
        logger.debug("Intelligence bus emission failed: %s", exc)

    # ── Update session counters (stored in session_meta) ──
    answered = _meta_inc(session, "answered_count")
    if is_correct:
        _meta_inc(session, "correct_count")
    current_index = _meta_inc(session, "current_index")

    display_q_num = current_index  # next display number (1-indexed)

    # ── Complete or advance ──
    num_questions = _meta_get(session, "num_questions", 5)
    is_complete = answered >= num_questions
    next_q_resp: QuestionResponse | None = None

    if not is_complete:
        try:
            attempted_ids = await _get_attempted_ids(session.id, db)
        except Exception:
            attempted_ids = set()
        attempted_ids.add(qid_requested)
        try:
            # ADAPT: real ability steering — the selector's adaptive context
            # steps difficulty UP after a correct answer and DOWN after a
            # wrong one, targeting the student's estimated level.
            nxt = await _select_adaptive_next(
                db, session,
                previous_correct=is_correct,
                previous_difficulty=_safe_difficulty(question),
                exclude_ids=attempted_ids,
            )
            if nxt is not None:
                next_q_resp = _format_question(nxt)
                qid = (_q_attr(nxt, "question_id", None)
                       or _q_attr(nxt, "id", None))
                _meta_set(session, "current_question_id", str(qid) if qid is not None else None)
                _q_store = dict(_meta_get(session, "questions") or {})
                _q_store[str(qid)] = _q_as_store_dict(nxt)
                _meta_set(session, "questions", _q_store)
            else:
                is_complete = True  # exhausted question bank
        except Exception as exc:
            logger.error("QuestionSelector failed during submit: %s", exc)
            is_complete = True

    if is_complete:
        _meta_set(session, "status", "completed")
        try:
            session.ended_at = datetime.now(timezone.utc)
        except Exception:
            pass

    try:
        await db.commit()
    except Exception as exc:
        logger.warning("Session commit failed (demo mode?): %s", exc)

    # ── SM-2 review scheduling (post-commit — a review-item failure must
    #    never poison the attempt record). Wrong answers resurface
    #    tomorrow; correct ones follow the SM-2 interval schedule.
    #    review_items.user_id FKs to users.id → use the JWT caller, not
    #    session.student_id (a students-row id).
    try:
        from backend.services.progress_service import ProgressService as _PS

        _review_node = _q_attr(question, "node_id") or ""
        _review_uid = str(caller_sub) if caller_sub else None
        if _review_node and _review_uid:
            _concept = str(
                _q_attr(question, "subtopic")
                or _q_attr(question, "topic")
                or _review_node
            )
            await _PS.schedule_practice_review(
                db, _review_uid, str(_review_node), _concept, is_correct
            )
            await db.commit()
    except Exception as exc:
        logger.warning("Review scheduling failed: %s", exc)
        try:
            await db.rollback()
        except Exception:
            pass

    correct_display = _format_correct_answer(question)

    explanation_text = _q_attr(question, "explanation", "") or ""
    misconception_text, remediation_text, review_topics = (None, None, [])
    if not is_correct:
        (
            misconception_text,
            remediation_text,
            review_topics,
        ) = await _fetch_remediation(db, question)

    # ── Marking-scheme coaching ──
    # Board questions (marks > 1, free-text answers) get a per-step rubric
    # breakdown: which marking points the answer covered and which it
    # missed. Skipped for option-picks (selected_option came through).
    marking_feedback: Optional[dict[str, Any]] = None
    try:
        _scheme = _q_attr(question, "marking_scheme") or ""
        _qmarks = _q_attr(question, "marks", 0) or 0
        if (
            _scheme
            and int(_qmarks) > 1
            and req.selected_option is None
            and str(answer).strip()
        ):
            from backend.services.marking_coach import evaluate_against_scheme

            marking_feedback = await evaluate_against_scheme(
                str(answer), str(_scheme), int(_qmarks)
            )
    except Exception as exc:
        logger.debug("Marking coach skipped: %s", exc)
    return SubmitAnswerResponse(
        is_correct=is_correct,
        correct_answer=correct_display,
        explanation=explanation_text,
        marks_awarded=marks,
        mastery_change=mastery_delta,
        question_number=display_q_num + 1,
        total_questions=_meta_get(session, "num_questions", 5),
        is_complete=is_complete,
        next_question=next_q_resp,
        misconception=misconception_text,
        remediation=remediation_text,
        review_topics=review_topics,
        marking_feedback=marking_feedback,
        feedback={
            "is_correct": is_correct,
            "explanation": explanation_text,
            "misconception": misconception_text,
            "remediation": remediation_text,
            "review_topics": review_topics,
            "marking_feedback": marking_feedback,
            "points_earned": marks,
            "mastery_after": mastery_delta.get("mastery_after", 0.0)
            if isinstance(mastery_delta, dict)
            else 0.0,
            "question_id": qid_requested,
        },
        session_stats={
            "answered": _meta_get(session, "answered_count", 0),
            "correct": _meta_get(session, "correct_count", 0),
            "accuracy_pct": round(
                _meta_get(session, "correct_count", 0) / max(_meta_get(session, "answered_count", 1), 1) * 100, 1
            ),
        },
    )


@router.get("/{session_id}", response_model=SessionStateResponse)
async def get_session(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    caller_sub: Optional[str] = Depends(_caller_sub),
) -> SessionStateResponse:
    """Get the current state of a practice session.

    For active sessions, the current question is included so the frontend
    can restore the exact UI state after a page-refresh.
    """
    session = await _get_session_any(session_id, db)
    _enforce_session_owner(session, caller_sub)

    current_q: QuestionResponse | None = None
    status_val = _meta_get(session, "status", "active")
    current_qid = _meta_get(session, "current_question_id")
    if status_val == "active" and current_qid:
        q = await _get_question(str(current_qid), db, session)
        if q is not None:
            current_q = _format_question(q)

    started = session.created_at or datetime.now(timezone.utc)
    elapsed = int((datetime.now(timezone.utc) - started).total_seconds() * 1000)

    return SessionStateResponse(
        session_id=str(session.id),
        student_id=str(session.student_id),
        subject=_meta_get(session, "subject", ""),
        topic_ids=_meta_get(session, "topic_ids", []),
        status=status_val,
        question_number=(_meta_get(session, "current_index", 0) or 0) + 1,
        total_questions=_meta_get(session, "num_questions", 5),
        current_question=current_q,
        answered_count=_meta_get(session, "answered_count", 0) or 0,
        correct_count=_meta_get(session, "correct_count", 0) or 0,
        skipped_count=_meta_get(session, "skipped_count", 0) or 0,
        time_spent_ms=elapsed,
        started_at=started.isoformat(),
        elapsed_ms=elapsed,
    )


@router.post(
    "/{session_id}/end",
    response_model=SessionSummaryResponse,
    summary="End session and return summary",
)
async def end_session(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    caller_sub: Optional[str] = Depends(_caller_sub),
) -> SessionSummaryResponse:
    """Manually end an active session and compute the full summary."""
    session = await _get_session_any(session_id, db)
    _enforce_session_owner(session, caller_sub)

    # Idempotent: a second /end (flaky retry, double-tap, remount) returns
    # the stored summary instead of 400ing the student.
    if _meta_get(session, "status", "active") == "completed":
        return await _build_summary(session, db)

    _meta_set(session, "status", "completed")
    try:
        session.ended_at = datetime.now(timezone.utc)
    except Exception:
        pass
    try:
        await db.commit()
    except Exception as exc:
        logger.warning("Session commit failed (demo mode?): %s", exc)
    try:
        await db.refresh(session)
    except Exception:
        pass

    return await _build_summary(session, db)


@router.get("/{session_id}/summary", response_model=SessionSummaryResponse)
async def get_session_summary(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    caller_sub: Optional[str] = Depends(_caller_sub),
) -> SessionSummaryResponse:
    """Retrieve the summary for a completed session.

    Frontend calls this after POST /end (or on summary-page navigation).
    """
    session = await _get_session_any(session_id, db)
    _enforce_session_owner(session, caller_sub)

    if _meta_get(session, "status", "active") != "completed":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Session is still active. Call POST /end first.",
        )

    return await _build_summary(session, db)


@router.post("/{session_id}/skip", response_model=dict)
async def skip_question(
    session_id: str,
    req: SkipRequest | None = None,
    db: AsyncSession = Depends(get_db),
    caller_sub: Optional[str] = Depends(_caller_sub),
) -> dict:
    """Skip the current question without answering.

    - Increments ``skipped_count`` (tracked for analytics).
    - Does NOT update mastery.
    - Advances to next question or ends session.
    """
    session = await _get_active_session(session_id, db)
    _enforce_session_owner(session, caller_sub)

    _meta_inc(session, "skipped_count")
    current_index = _meta_inc(session, "current_index")

    num_questions = _meta_get(session, "num_questions", 5)
    is_complete = current_index >= num_questions
    next_q_resp: QuestionResponse | None = None

    if not is_complete:
        try:
            attempted_ids = await _get_attempted_ids(session.id, db)
        except Exception:
            attempted_ids = set()
        current_qid = _meta_get(session, "current_question_id")
        if current_qid:
            attempted_ids.add(current_qid)
        try:
            # ADAPT: a skip is "stuck here" — treat it as a wrong answer so
            # the next question steps DOWN in difficulty, and keep the pool
            # free of already-issued questions.
            nxt = await _select_adaptive_next(
                db, session,
                previous_correct=False,
                previous_difficulty=_safe_difficulty(
                    await _get_question(str(current_qid or ""), db, session)
                ),
                exclude_ids=attempted_ids,
            )
            if nxt is not None:
                next_q_resp = _format_question(nxt)
                qid = (_q_attr(nxt, "question_id", None)
                       or _q_attr(nxt, "id", None))
                _meta_set(session, "current_question_id", str(qid) if qid is not None else None)
                _q_store = dict(_meta_get(session, "questions") or {})
                _q_store[str(qid)] = _q_as_store_dict(nxt)
                _meta_set(session, "questions", _q_store)
        except Exception as exc:
            logger.warning("Skip → question selection failed: %s", exc)

    if is_complete:
        _meta_set(session, "status", "completed")
        try:
            session.ended_at = datetime.now(timezone.utc)
        except Exception:
            pass

    try:
        await db.commit()
    except Exception as exc:
        logger.warning("Session commit failed (demo mode?): %s", exc)

    return {
        "skipped": True,
        "question_number": (_meta_get(session, "current_index", 0) or 0) + 1,
        "total_questions": _meta_get(session, "num_questions", 5),
        "next_question": next_q_resp,
        "is_complete": is_complete,
    }


class MarkingEvaluateRequest(BaseModel):
    """Free-text answer to score against a question's marking scheme."""

    question_id: str
    answer: str = Field(..., min_length=1)


@router.post(
    "/marking-evaluate",
    summary="Score a free-text answer against the CBSE marking scheme",
    description="""
Loads the question's authored marking_scheme (rubric steps) and marks,
then scores the student's answer step-by-step. Board-style coaching:
students see exactly which marking points they hit and missed.
    """,
)
async def marking_evaluate(
    req: MarkingEvaluateRequest,
    db: AsyncSession = Depends(get_db),
):
    question = await _get_question(req.question_id, db)
    if question is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=f"Question '{req.question_id}' not found.",
        )
    scheme = _q_attr(question, "marking_scheme") or ""
    marks = int(_q_attr(question, "marks", 0) or 0)
    if not scheme or marks < 1:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Question has no marking scheme.",
        )
    from backend.services.marking_coach import evaluate_against_scheme

    result = await evaluate_against_scheme(req.answer, str(scheme), marks)
    if result is None:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Marking evaluation unavailable right now.",
        )
    result["question_id"] = req.question_id
    return result


class GradeAnswerRequest(BaseModel):
    """Free question text + student attempt — rubric grading without a
    bank question_id (doubt-box answers, pasted questions)."""

    question: str = Field(..., min_length=5)
    answer: str = Field(..., min_length=5)
    class_level: int | None = None
    subject: str | None = None


@router.post(
    "/grade-answer",
    summary="Grade a free-text answer against authored marking points",
    description="""
Routes the question to its chapter/node rubric (generated model answers
or authored diagnostic points), then scores the attempt: marking-point
coverage, misconception signals, and class-band format.  Never generates
the answer — evaluates only.  Returns RUBRIC_FEEDBACK or 422 when no
rubric exists for the question.
    """,
)
async def grade_answer_endpoint(req: GradeAnswerRequest):
    from backend.services.enhanced_nodes import grade_answer
    import asyncio as _aio
    result = await _aio.to_thread(
        grade_answer, req.question, req.answer, req.class_level,
        req.subject)
    if result is None:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No rubric found for this question — it may be outside "
                   "the covered syllabus or need rephrasing.",
        )
    return result


@router.get(
    "/review/{student_id}",
    response_model=ReviewResponse,
    summary="Get spaced-repetition review items",
    description="""
Returns topics the student should review based on spaced repetition
scheduling: low mastery, or not practised recently.
Sorted by urgency (overdue → due_soon → fresh).
    """,
)
async def get_due_reviews(
    student_id: str,
    subject: str | None = Query(default=None, description="Filter by subject slug"),
    limit: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
) -> ReviewResponse:
    """Get questions due for spaced-repetition review."""

    res = await db.execute(select(Student).where(Student.id == student_id))
    if res.scalar_one_or_none() is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found.",
        )

    # PLUMB (C7 audit [STUDENT-C7][P2 SLOW-REVIEW], 155s -> <1s): no
    # shared-service detour any more — reviews come from ONE indexed read
    # on mastery_state over this request's own session (see
    # _compute_reviews). No second asyncpg pool, no Redis, no doomed
    # subject='' probe on the hot path.
    reviews = await _compute_reviews(student_id, subject, limit, db)

    return ReviewResponse(
        student_id=student_id,
        reviews=reviews[:limit],
        total_due=len(reviews),
    )


# ═══════════════════════════════════════════════════════════════
#  Private helpers
# ═══════════════════════════════════════════════════════════════

async def _get_active_session(session_id: str, db: AsyncSession) -> PracticeSession:
    """Fetch session and assert it is active (raise 400 otherwise)."""
    session = await _get_session_any(session_id, db)
    status_val = _meta_get(session, "status", "active")
    if status_val != "active":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail=f"Session '{session_id}' is {status_val}. Cannot perform this action.",
        )
    return session


async def _get_session_any(session_id: str, db: AsyncSession) -> PracticeSession:
    """Fetch session regardless of status (raise 404 if missing).

    DB rows are checked first; the process-local demo store backs the
    no-DB mode so a session started there still resolves."""
    try:
        res = await db.execute(
            select(PracticeSession).where(PracticeSession.id == session_id)
        )
        session = res.scalar_one_or_none()
        if session is not None:
            return session
    except Exception:
        pass  # DB unavailable or id not a UUID — try the demo store
    rec = _MEM_SESSIONS.get(session_id)
    if rec is not None:
        return _MemSession(rec)
    raise HTTPException(
        status.HTTP_404_NOT_FOUND,
        detail=f"Session '{session_id}' not found.",
    )


async def _get_question(question_id: str, db: AsyncSession, session=None):
    """Fetch a question by id.

    Resolution order: a DB questions table (when a Question model even
    exists), then the SESSION's question store — /start persists every
    issued question (selector output is generated, not table rows) in
    session_meta["questions"], so GET /{id} and /submit always resolve
    the question_id the session issued."""
    qid = str(question_id or "").strip()
    if not qid:
        return None
    try:
        from database import Question as QuestionModel
        res = await db.execute(
            select(QuestionModel).where(QuestionModel.id == qid)
        )
        row = res.scalar_one_or_none()
        if row is not None:
            return row
    except Exception:
        pass
    if session is not None:
        store = _meta_get(session, "questions", None)
        if isinstance(store, dict):
            q = store.get(qid)
            if q is not None:
                return q
    # Standalone corpus ids ("corpus:<uuid>") — no session context needed;
    # resolve straight from board_questions so endpoints like
    # /marking-evaluate work outside a session.
    if qid.startswith("corpus:"):
        try:
            import uuid as _uuid
            from backend.models.enrichment import BoardQuestion

            rid = _uuid.UUID(qid.replace("corpus:", ""))
            row = (
                await db.execute(
                    select(BoardQuestion).where(BoardQuestion.id == rid)
                )
            ).scalar_one_or_none()
            if row is not None:
                return {
                    "id": qid,
                    "question_id": qid,
                    "text": row.question_text,
                    "options": row.options or [],
                    "correct_answer": row.correct_answer,
                    "marking_scheme": row.marking_scheme,
                    "explanation": row.explanation or row.model_answer or "",
                    "marks": row.marks or 1,
                    "node_id": (row.node_tags or [None])[0],
                }
        except Exception:
            pass
    return None


async def _get_attempted_ids(session_id, db: AsyncSession) -> set[str]:
    """Return the set of question IDs already attempted in this session."""
    res = await db.execute(
        select(Attempt.question_seed).where(Attempt.session_id == session_id)
    )
    return set(res.scalars().all())


async def _evaluate_answer(question: Any, answer: str) -> bool:
    """Grade a submitted answer — deterministic first, LLM for prose.

    Corpus questions (enhanced_nodes_md) carry paragraph-length model
    answers that can never exact-match a student's response, so prose
    answers go through the rubric grader (LLMGrader) using the row's
    marking_scheme as criteria.
    """
    correct = _q_attr(question, "correct_answer", "") or ""
    if _check_answer(answer, correct,
                     _q_attr(question, "tolerance", 0.001) or 0.001):
        return True

    # Short/factual answers: deterministic result stands (don't waste LLM)
    if len(str(correct)) < 120 or len(answer.strip()) < 3:
        return False

    # Prose/long answers: rubric grading against the model answer
    try:
        from services.llm_grader import LLMGrader
        scheme = _q_attr(question, "marking_scheme", "") or ""
        rubric = None
        if scheme:
            rubric = [
                {"id": f"c{i+1}", "text": line.strip()}
                for i, line in enumerate(scheme.split("\n"))
                if line.strip() and len(line.strip()) > 10
            ][:6]
        result = await LLMGrader.grade(
            student_answer=answer,
            model_answer=str(correct),
            rubric=rubric,
            max_marks=int(_q_attr(question, "marks", 3) or 3),
        )
        return result.marks_awarded > 0 and result.marks_awarded >= max(
            1, result.max_marks // 2)
    except Exception as exc:
        logger.warning("LLM grading failed, deterministic result stands: %s", exc)
        return False


def _check_answer(student_answer: str, correct_answer: Any, tolerance: float = 0.001) -> bool:
    """Evaluate student answer.

    - Numeric answers: compared with floating-point tolerance.
    - String answers: case-insensitive exact match.
    - True/false: normalised lower-case comparison.
    - Math/science expressions: interpreter loop (symbolic/numerical/unit/chemical).
    """
    sa = str(student_answer).strip()
    ca = str(correct_answer).strip()

    if _is_numeric(sa) and _is_numeric(ca):
        try:
            return abs(float(sa) - float(ca)) <= tolerance
        except (ValueError, TypeError):
            pass

    # Unit/whitespace/punctuation-tolerant numeric fold:
    #   "575" == "575.0" == "575 m²" == "Rs. 1,35,000"
    # Both sides must reduce to exactly ONE number; units must match or be
    # absent on one side ("575 km" vs "575 m" never folds deterministically).
    fold = _fold_numeric_with_unit(sa, ca, tolerance)
    if fold is not None:
        return fold

    # Fast path: exact string match
    if sa.lower() == ca.lower():
        return True

    # Interpreter loop for complex answers (symbolic, numerical, unit, chemical)
    try:
        from services.interpreter_loop import InterpreterLoop
        loop = InterpreterLoop()
        result = loop.verify(
            student_answer=sa,
            model_answer=ca,
        )
        if result.match:
            return True
    except Exception:
        pass

    return sa.lower() == ca.lower()


def _is_numeric(value: str) -> bool:
    try:
        float(value)
        return True
    except (ValueError, TypeError):
        return False


# A single (optionally comma-grouped) number with at most a short unit
# decoration: "575", "575.0", "575 m²", "1,35,000 km", "50%", "Rs. 575"
_PURE_NUM_RE = re.compile(r'^[-+]?[\d,]*\.?\d+$')
_NUM_UNIT_RE = re.compile(
    r'^[-+]?[\d,]*\.?\d+\s*(?:[₹$€£]|rs\.?)?\s*'
    r'(?P<unit>[a-zA-Z°µ%²³/]{1,10})$'
)
_LEAD_CURRENCY_RE = re.compile(r'^[-+]?\s*(?:[₹$€£]|rs\.?)\s*', re.IGNORECASE)


def _fold_numeric_with_unit(sa: str, ca: str, tolerance: float) -> Optional[bool]:
    """Numeric-equivalence fold tolerant of units/whitespace/punctuation.

    Folds "575" / "575.0" / "575 m²" / "Rs. 1,35,000" to the same number.
    Returns:
      True  — both sides carry the same single number and the unit tokens
              match, or either side is a bare number
      False — same unit context but the numbers genuinely differ
      None  — not comparable numerically (no number, 2+ numbers, prose, or
              conflicting units like "575 km" vs "575 m") — caller falls
              through to string/interpreter grading
    """
    def parts(s: str) -> Optional[tuple]:
        t = str(s).strip()
        t = _LEAD_CURRENCY_RE.sub('', t)
        t = t.strip().strip('.,;:!?"\'()').strip()
        t = re.sub(r'\s+', ' ', t)
        unit = ''
        if _PURE_NUM_RE.match(t):
            num = t
        else:
            m = _NUM_UNIT_RE.match(t)
            if not m:
                return None
            num = t[:m.start('unit')].strip()
            unit = m.group('unit').lower()
        try:
            return float(num.replace(',', '')), unit
        except ValueError:
            return None

    pa, pc = parts(sa), parts(ca)
    if pa is None or pc is None:
        return None
    (na, ua), (nc, uc) = pa, pc
    if ua and uc and ua != uc:
        return None  # conflicting units — let the interpreter judge
    return abs(na - nc) <= tolerance


def _format_correct_answer(question: Any) -> str:
    """Human-friendly correct-answer display.

    If the question has a display_format template (e.g. 'x = {}'),
    use it; otherwise show the raw value.
    """
    raw = str(_q_attr(question, "correct_answer", "") or "")
    fmt = _q_attr(question, "display_format", None)
    if fmt:
        try:
            return fmt.format(raw)
        except (IndexError, KeyError):
            pass
    return raw


_Q_TYPE_MAP = {
    "mcq": "mcq",
    "mcq_single": "mcq",
    "mcq_multi": "mcq",
    "multiple_choice": "mcq",
    "numeric": "numeric",
    "numerical": "numeric",
    "number": "numeric",
    "true_false": "true_false",
    "truefalse": "true_false",
    "fill_blank": "fill_blank",
    "fill": "fill_blank",
    "short_answer": "text",
    "long_answer": "text",
    "text": "text",
}


def _format_question(q: Any) -> QuestionResponse:
    """Convert a question object (from DB, the selector's dict output,
    or the session question store) to API response schema."""

    topic = _q_attr(q, "topic", "") or ""
    badge = "Curious Learner"
    for key, val in COMPETENCY_BADGES.items():
        if key in topic.lower():
            badge = val
            break

    raw_type = str(_q_attr(q, "question_type", "mcq") or "mcq")
    q_type = _Q_TYPE_MAP.get(raw_type.strip().lower(), "mcq")
    options = _q_attr(q, "options", None)
    # only real string lists render as choices; dict/iterable options from
    # some generator adapters would render as broken keys -> text question
    if isinstance(options, list):
        if not all(isinstance(o, str) for o in options):
            options = [str(o) for o in options]
    else:
        options = None

    # MCQ → select widget; numeric → number pad; rest → text input
    if q_type == "mcq":
        input_type = "select"
    elif q_type == "numeric":
        input_type = "number"
    else:
        input_type = "text"

    difficulty = str(_q_attr(q, "difficulty", "medium") or "medium")
    if difficulty not in ("easy", "medium", "hard"):
        # selector difficulties are floats in (0, 1]
        try:
            dv = float(difficulty)
            difficulty = "easy" if dv < 0.4 else (
                "hard" if dv > 0.7 else "medium")
        except (TypeError, ValueError):
            difficulty = "medium"

    return QuestionResponse(
        question_id=str(_q_attr(q, "question_id", None)
                         or _q_attr(q, "id", "") or ""),
        text=str(_q_attr(q, "text", "") or ""),
        question_type=q_type,
        options=options,
        input_type=input_type,
        marks=_q_attr(q, "marks", 1) or 1,
        difficulty=difficulty,
        competency_badge=badge,
        topic=topic,
        subtopic=_q_attr(q, "subtopic", None),
        hints_available=bool(_q_attr(q, "hints_available", False)),
        year=_q_attr(q, "year", None) or None,
        node_id=_q_attr(q, "node_id", None) or None,
    )


async def _build_summary(
    session: PracticeSession,
    db: AsyncSession,
) -> SessionSummaryResponse:
    """Aggregate attempts into a rich per-topic summary with mastery deltas."""

    try:
        res = await db.execute(select(Attempt).where(Attempt.session_id == session.id))
        attempts = res.scalars().all()
    except Exception:
        attempts = []

    # Per-topic aggregation (topic stored in answer JSONB or question_seed)
    topic_stats: dict[str, dict[str, Any]] = {}
    for att in attempts:
        ans = att.answer or {}
        t = ans.get("topic") or ans.get("question_id") or "unknown"
        if t not in topic_stats:
            topic_stats[t] = {"attempted": 0, "correct": 0, "times": []}
        topic_stats[t]["attempted"] += 1
        topic_stats[t]["correct"] += 1 if att.correct else 0
        topic_stats[t]["times"].append(att.time_ms or 0)

    topic_performance: list[TopicPerformance] = []
    mastery_changes: dict[str, Any] = {}

    for topic, s in topic_stats.items():
        avg_t = sum(s["times"]) // len(s["times"]) if s["times"] else 0
        mastery_after = s["correct"] / s["attempted"] if s["attempted"] else 0.0
        topic_performance.append(
            TopicPerformance(
                topic=topic,
                attempted=s["attempted"],
                correct=s["correct"],
                mastery_before=0.0,
                mastery_after=round(mastery_after, 3),
                avg_time_ms=avg_t,
            )
        )
        mastery_changes[topic] = {
            "mastery_before": 0.0,
            "mastery_after": round(mastery_after, 3),
            "delta": round(mastery_after, 3),
            "accuracy_pct": round(s["correct"] / s["attempted"] * 100, 1)
            if s["attempted"]
            else 0.0,
        }

    # Recommendations: weakest topics first
    topic_performance.sort(key=lambda t: t.mastery_after)
    recommended = [t.topic for t in topic_performance if t.mastery_after < 0.7][:3]

    total_time = 0
    if session.ended_at and session.created_at:
        total_time = int((session.ended_at - session.created_at).total_seconds() * 1000)

    answered = _meta_get(session, "answered_count", 0) or 0
    correct = _meta_get(session, "correct_count", 0) or 0
    acc = (correct / answered * 100) if answered else 0.0

    started = session.created_at or datetime.now(timezone.utc)
    ended = session.ended_at or datetime.now(timezone.utc)

    return SessionSummaryResponse(
        session_id=str(session.id),
        student_id=str(session.student_id),
        subject=_meta_get(session, "subject", ""),
        total_questions=_meta_get(session, "num_questions", 5),
        attempted=answered,
        skipped=_meta_get(session, "skipped_count", 0) or 0,
        correct_count=correct,
        accuracy=round(acc, 1),
        total_time_ms=total_time,
        mastery_changes=mastery_changes,
        topic_performance=topic_performance,
        started_at=started.isoformat(),
        ended_at=ended.isoformat(),
        recommended_next=recommended,
    )


# mastery_state.subject mixes corpus codes ('math', 'bio') and display
# names ('Mathematics', 'biology') across ingestion generations; resolve
# through the same alias families the practice selector uses.
_MASTERY_SUBJECT_ALIASES: dict[str, frozenset] = {
    "mathematics": frozenset({"math", "maths", "mathematics"}),
    "math": frozenset({"math", "maths", "mathematics"}),
    "maths": frozenset({"math", "maths", "mathematics"}),
    "physics": frozenset({"phy", "physics"}),
    "phy": frozenset({"phy", "physics"}),
    "chemistry": frozenset({"chem", "chemistry"}),
    "chem": frozenset({"chem", "chemistry"}),
    "biology": frozenset({"bio", "biology"}),
    "bio": frozenset({"bio", "biology"}),
    "english": frozenset({"engl", "english", "eng_k", "eng_w", "eng_f",
                          "eng_v", "eng_s", "eng_h"}),
    "engl": frozenset({"engl", "english"}),
    "history": frozenset({"hist", "history"}),
    "hist": frozenset({"hist", "history"}),
    "geography": frozenset({"geo", "geography"}),
    "geo": frozenset({"geo", "geography"}),
    "civics": frozenset({"civ", "civics"}),
    "civ": frozenset({"civ", "civics"}),
    "economics": frozenset({"eco", "economics"}),
    "eco": frozenset({"eco", "economics"}),
    "grammar": frozenset({"gram", "grammar"}),
    "gram": frozenset({"gram", "grammar"}),
    "computer": frozenset({"comp", "cs", "computer"}),
    "computer_science": frozenset({"comp", "cs", "computer"}),
    "science": frozenset({"phy", "physics", "chem", "chemistry",
                          "bio", "biology", "sci", "science"}),
    "social_science": frozenset({"hist", "history", "geo", "geography",
                                 "civ", "civics", "eco", "economics",
                                 "soc", "sst"}),
    "hindi": frozenset({"hin", "hindi", "hin_a", "hin_ar", "hin_al",
                        "hin_v"}),
    "accountancy": frozenset({"acc", "accountancy"}),
    "acc": frozenset({"acc", "accountancy"}),
    "business_studies": frozenset({"bs", "business_studies"}),
    "bs": frozenset({"bs", "business_studies"}),
    "psychology": frozenset({"psy", "psychology"}),
    "biotechnology": frozenset({"biotech", "biotechnology"}),
    "home_science": frozenset({"hs", "home_science"}),
    "physical_education": frozenset({"ps", "physical_education"}),
    "statistics": frozenset({"stat", "statistics"}),
    "applied_maths": frozenset({"applied_maths", "appmath"}),
}


def _mastery_subject_aliases(subject: str) -> frozenset:
    """Alias family for a subject slug, lowercased for DB comparison."""
    base = frozenset({subject.strip().lower()})
    return _MASTERY_SUBJECT_ALIASES.get(subject.strip().lower(), base) | base


async def _compute_reviews(
    student_id: str,
    subject: str | None,
    limit: int,
    db: AsyncSession,
) -> list[ReviewItem]:
    """Compute spaced-repetition review items from mastery_state.

    PLUMB (C7 audit [STUDENT-C7][P2 SLOW-REVIEW]): mastery_state is the
    store practice actually writes (BKT/IRT/SM-2 via mastery_sync) and its
    PK (student_id, topic_id) makes a per-student read an index lookup.
    The old path probed subject='' (matches nothing — the column stores
    real subject codes) and then a dead 0-row ORM table, so a student WITH
    practice history still got reviews:[]. Subject filtering now compares
    the requested slug against mastery_state.subject through the same
    alias families practice uses (the column mixes 'math' and
    'mathematics' spellings across ingestion generations)."""
    reviews: list[ReviewItem] = []
    now = datetime.now(timezone.utc)

    wanted_subjects = _mastery_subject_aliases(subject) if subject else None

    try:
        from sqlalchemy import text as _text

        rows = (await db.execute(
            _text(
                "SELECT topic_id, subject, bkt_p_know, last_review, "
                "next_review FROM mastery_state WHERE student_id = :sid"
            ),
            {"sid": student_id},
        )).mappings.all()
    except Exception as exc:
        logger.warning("mastery_state read failed for %s: %s", student_id, exc)
        rows = []

    mastery_data: dict[str, dict[str, Any]] = {}
    for row in rows:
        if wanted_subjects is not None and                 str(row.get("subject") or "").strip().lower() not in wanted_subjects:
            continue
        last = row.get("last_review")
        if isinstance(last, datetime) and last.tzinfo is None:
            # mastery_state timestamps are naive UTC — make the age math
            # timezone-consistent with `now`.
            last = last.replace(tzinfo=timezone.utc)
        mastery_data[str(row.get("topic_id"))] = {
            "mastery": float(row.get("bkt_p_know") or 0.0),
            "last_attempted": last,
        }

    if not mastery_data:
        # Legacy fallback: the ORM mastery table (kept for deployments that
        # still populate it — empty here, so the honest result stands).
        res = await db.execute(
            select(Mastery).where(Mastery.student_id == student_id))
        for m in res.scalars().all():
            mastery_data[m.topic_id] = {
                "mastery": float(m.mastery_probability or 0.0),
                "last_attempted": m.last_practiced_at,
            }

    for topic_id, data in mastery_data.items():

        mastery_level = float(data.get("mastery", 0.0))
        last = data.get("last_attempted")
        days_since = (now - last).days if last else 999

        # Urgency heuristic
        if mastery_level < 0.5 and days_since > 7:
            urgency: Literal["overdue", "due_soon", "fresh"] = "overdue"
        elif days_since > 3 or mastery_level < 0.7:
            urgency = "due_soon"
        else:
            urgency = "fresh"

        if urgency != "fresh":
            reviews.append(
                ReviewItem(
                    question_id=f"review_{topic_id}",
                    topic=topic_id,
                    subtopic=None,
                    last_attempted_at=last.isoformat() if last else now.isoformat(),
                    days_since=days_since,
                    mastery_level=round(mastery_level, 3),
                    urgency=urgency,
                )
            )

    reviews.sort(
        key=lambda r: ({"overdue": 0, "due_soon": 1, "fresh": 2}[r.urgency], -r.mastery_level)
    )
    return reviews[:limit]
