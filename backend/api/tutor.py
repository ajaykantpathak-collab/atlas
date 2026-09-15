"""ITS tutor API router — the deterministic ITS engine surface.

This router owns the ITS engine routes only. The generic tutor contract
(/api/tutor/sessions, /ask, /hint, /explain-step, /quick-question …) lives
in ``backend/routers/tutor.py`` and is untouched — the two routers share no
paths because this one is mounted under the DISTINCT prefix
``/api/tutor/its``.

Endpoints:
  GET  /api/tutor/its/health        — Health check for the ITS service
  POST /api/tutor/its/start         — Start a deterministic ITS session
  POST /api/tutor/its/input         — Advance an ITS session (state + answer)
  POST /api/tutor/its/reply         — Session Socratic reply with orchestrator
                                      intelligence (renamed out of the
                                      colliding /sessions/{id}/reply path)
  POST /api/tutor/its/route         — Route a free-form question to a node
  POST /api/tutor/its/quick-question— Enrichment-based quick answer
  WS   /api/tutor/its/ws            — WebSocket for real-time tutoring
"""

import logging
import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field
from datetime import datetime, timezone

from backend.its.tutoring.unified_socratic_engine import (  # noqa: F401
    response_to_dict,
    state_from_dict,
    state_to_dict,
)

try:
    from services.tutor_service_v2 import TutorServiceV2
    from services.llm_client import get_llm_client
except ImportError:  # package-mode import (backend.* on sys.path)
    from backend.services.tutor_service_v2 import TutorServiceV2
    from backend.services.llm_client import get_llm_client

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/tutor/its", tags=["tutor-its"])

# Heavy singletons are built lazily so importing this router (at app
# startup, from backend.main) can never fail or slow the boot path.
_tutor: Optional[TutorServiceV2] = None
_llm = None


def _get_tutor() -> TutorServiceV2:
    global _tutor
    if _tutor is None:
        _tutor = TutorServiceV2()
    return _tutor


def _get_llm():
    global _llm
    if _llm is None:
        _llm = get_llm_client()
    return _llm


# --- ITS unified engine (Layer 3+4 wiring) -----------------------------------
_UNIFIED_ENGINE = None


def _get_unified_engine():
    """Lazy singleton for the unified Socratic engine (deterministic ITS)."""
    global _UNIFIED_ENGINE
    if _UNIFIED_ENGINE is None:
        from backend.its.tutoring.unified_socratic_engine import (
            UnifiedSocraticEngine,
        )
        # OFF_SCRIPT lane (the 5% fallback) gets the LLM voice: Gemma 4
        # preferred, deterministic templates remain the fallback.
        _renderer = None
        try:
            from backend.its.agents.gemma_renderer import GemmaRenderer
            _g = GemmaRenderer()
            if _g.available:
                _renderer = _g
        except Exception:
            _renderer = None
        if _renderer is None:
            try:
                from backend.its.agents.claude_renderer import ClaudeRenderer
                import os as _os
                _key = (_os.environ.get("ANTHROPIC_API_KEY")
                        or _os.environ.get("CLAUDE_API_KEY") or "")
                if _key:
                    _renderer = ClaudeRenderer(api_key=_key)
            except Exception:
                _renderer = None
        _UNIFIED_ENGINE = UnifiedSocraticEngine(claude_renderer=_renderer)
    return _UNIFIED_ENGINE


# In-memory session metadata store for /reply (replace with DB in production)
_session_meta: dict[str, dict] = {}


# ── Session reply schemas ────────────────────────────────────────────────────

class TutorReplyRequest(BaseModel):
    sessionId: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)
    # Used to auto-create the session on the first reply (there is no
    # separate session-create route under this ITS prefix).
    nodeId: Optional[str] = None
    topic: Optional[str] = None


class TutorMessageSchema(BaseModel):
    role: str = "tutor"
    content: str = ""
    type: Optional[str] = None
    misconceptionDetected: Optional[str] = None
    prerequisiteGap: Optional[str] = None


class TutorReplyResponse(BaseModel):
    sessionId: str = ""
    reply: TutorMessageSchema = TutorMessageSchema()
    updatedMastery: Optional[float] = None


# ── Question routing schemas ─────────────────────────────────────────────────

class RouteRequest(BaseModel):
    """Request for routing a free-form question to a curriculum node."""
    query: str = Field(..., min_length=1, max_length=2000)
    subject: Optional[str] = None
    class_level: Optional[int] = Field(default=None, ge=1, le=12)
    board: Optional[str] = None  # "CBSE" or "CISCE"
    current_node_id: Optional[str] = None


class RouteResponse(BaseModel):
    """Response with the routed node and alternatives."""
    node_id: str = ""
    node_title: str = ""
    intent: str = ""
    confidence: float = 0.0
    method: str = ""
    board: str = ""
    subject: str = ""
    class_level: int = 0
    candidates: list[str] = Field(default_factory=list)
    fallback_used: bool = False


# ── Quick question schemas ───────────────────────────────────────────────────

class QuickQuestionRequest(BaseModel):
    """Request body for the quick-question endpoint."""
    message: str
    subject: Optional[str] = None
    class_level: Optional[int] = None


class QuickQuestionResponse(BaseModel):
    """Response for the quick-question endpoint."""
    question: str
    answer: str
    node_id: Optional[str] = None
    node_title: Optional[str] = None
    subject: Optional[str] = None
    class_level: Optional[int] = None
    type: str = "definition"
    confidence: float = 0.0
    method: str = "fallback"


# ── ITS engine request schemas ───────────────────────────────────────────────

class ItsStartRequest(BaseModel):
    student_id: str = Field(default="guest")
    node_id: str


class ItsInputRequest(BaseModel):
    state: dict = Field(default_factory=dict)
    input: str = Field(min_length=1, max_length=4000)


# ── Endpoints ────────────────────────────────────────────────────────────────

@router.get("/health", response_model=dict)
async def tutor_its_health():
    """Health check for the ITS tutor service."""
    return {"status": "ok", "service": "tutor-its"}


@router.post("/route", response_model=RouteResponse)
async def route_question(req: RouteRequest):
    """Route a free-form student question to the best curriculum node.

    Uses Qdrant hybrid search first, falls back to keyword matching
    over CBSE/CISCE node files when Qdrant is unavailable.

    Returns the best matching node with confidence and alternatives.
    """
    try:
        from services.routing_service_v2 import RoutingServiceV2
    except ImportError:  # package-mode import (backend.* on sys.path)
        from backend.services.routing_service_v2 import RoutingServiceV2

    # Try RoutingServiceV2 (Qdrant + keyword fallback)
    result = await RoutingServiceV2.route(
        db=None,  # Not needed for keyword fallback
        message=req.query,
        current_node_id=req.current_node_id,
        subject_filter=req.subject,
        class_filter=req.class_level,
        board=req.board,
    )

    if result is None:
        return RouteResponse(
            node_id="",
            node_title="",
            confidence=0.0,
            method="no_match",
            candidates=[],
        )

    is_fallback = "fallback" in result.method or "keyword" in result.method

    return RouteResponse(
        node_id=result.node_id,
        node_title=result.node_title,
        intent=result.field,
        confidence=result.confidence,
        method=result.method,
        board=result.board,
        subject=result.subject,
        class_level=result.class_level,
        candidates=result.candidates,
        fallback_used=is_fallback,
    )


# ── Quick question — no session, no auth, enrichment-based ──────────────────

@router.post("/quick-question", response_model=QuickQuestionResponse)
async def quick_question(payload: QuickQuestionRequest):
    """Answer a free-text question without requiring a tutor session.

    Routes the question to the best matching enrichment node and serves
    the appropriate field. No session, no LLM — purely deterministic.
    """
    try:
        import sys
        if "D:\\platform" not in sys.path:
            sys.path.insert(0, "D:\\platform")
        from backend.services.tutor_service import TutorService
        from backend.database import async_session

        async with async_session() as db:
            result = await TutorService.quick_question(
                db,
                message=payload.message,
                subject=payload.subject,
                class_level=payload.class_level,
            )
        return QuickQuestionResponse(**result)
    except Exception as exc:
        logger.exception(f"Quick question error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))


# ── ITS session reply (with deterministic orchestrator intelligence) ─────────

def _ensure_session(session_id: str, node_id: Optional[str], topic: Optional[str]) -> dict:
    """Return the session metadata, creating a minimal session on demand."""
    meta = _session_meta.get(session_id)
    if meta is None:
        if not node_id:
            raise HTTPException(
                status_code=404,
                detail=f"Session '{session_id}' not found",
            )
        now = datetime.now(timezone.utc).isoformat()
        meta = {
            "sessionId": session_id,
            "nodeId": node_id,
            "topic": topic or node_id,
            "messages": [],
            "socraticLevel": 1,
            "startedAt": now,
        }
        _session_meta[session_id] = meta
    return meta


@router.post("/reply", response_model=TutorReplyResponse)
async def reply_to_tutor_session(req: TutorReplyRequest):
    """Reply to a tutor session and get the next Socratic response.

    Runs the Socratic pipeline, then lets the deterministic orchestrator
    arbitrate the reply as a proposal under the active rules (scaffolding
    hints appended, assessment re-typing).
    """
    meta = _ensure_session(req.sessionId, req.nodeId, req.topic)
    node_id = meta["nodeId"]

    # Store student message
    meta["messages"].append({"role": "student", "content": req.message, "type": "answer"})

    # ── Intelligence layer: Try Socratic pipeline v3 first ──
    reply_content = None
    reply_type = "question"
    misconception = None
    prereq_gap = None

    try:
        try:
            from services.socratic_pipeline_v3 import SocraticPipelineV3
        except ImportError:  # package-mode import (backend.* on sys.path)
            from backend.services.socratic_pipeline_v3 import SocraticPipelineV3
        socratic = SocraticPipelineV3()
        # Build mastery map from session meta
        mastery_map = {node_id: meta.get("mastery", 0.3)}
        # Build interaction history from messages
        interaction_history = [
            {"role": m["role"], "content": m["content"], "type": m.get("type", "")}
            for m in meta["messages"][-10:]  # Last 10 messages
        ]
        result = socratic.process_interaction(
            student_id="session_" + req.sessionId,
            query=req.message,
            node_id=node_id,
            mastery_map=mastery_map,
            interaction_history=interaction_history,
        )
        if result and result.get("response"):
            reply_content = result["response"]
            reply_type = result.get("type", "question")
            misconception = result.get("misconception")
            prereq_gap = result.get("prerequisite_gap")
    except Exception as e:
        logger.debug(f"Socratic pipeline v3 failed, falling back to basic tutor: {e}")

    # ── Fallback: Use basic tutor if Socratic pipeline didn't produce a response ──
    if not reply_content:
        try:
            response = await _get_tutor().handle_query(
                user_query=req.message,
                user_id="session_" + req.sessionId,
                node_id=node_id,
                mastery=0.3,
            )
            reply_content = response.text
            reply_type = "question"
            misconception = None
            prereq_gap = None
        except Exception as e:
            logger.warning("Tutor reply error: %s", e)
            reply_content = "Can you tell me more about your reasoning?"
            reply_type = "question"
            misconception = None
            prereq_gap = None

    # ── Intelligence layer: deterministic orchestrator arbitrates the reply ──
    try:
        from backend.its.agents.deterministic_orchestrator import (
            DeterministicOrchestrator,
        )
        orchestrator = DeterministicOrchestrator()
        # Build a simple state for the orchestrator
        state = {
            "frustration_level": meta.get("frustration", 0),
            "mastery": meta.get("mastery", 0.3),
            "socratic_level": meta.get("socraticLevel", 1),
            "hints_given": meta.get("hintsGiven", 0),
        }
        # The reply itself is a proposal; the orchestrator scores it under
        # the active rules and may return an adjusted action instead.
        decision = orchestrator.decide(
            state,
            proposed_actions=[{
                "agent": "reply_tutor",
                "action_type": reply_type,
                "text": reply_content,
                "confidence": 0.6,
            }],
        )
        # AgentAction is a dataclass — use getattr, never .get().
        action_type = str(getattr(decision, "action_type", "") or "")
        params = getattr(decision, "parameters", None) or {}
        message = str(getattr(decision, "text", "") or params.get("message", ""))
        if "scaffold" in action_type and message:
            # Append scaffolding hint to the response
            reply_content += f"\n\n💡 Hint: {message}"
        elif "assess" in action_type:
            # Change type to assessment
            reply_type = "assessment"
    except Exception:
        pass  # Orchestrator is non-critical

    tutor_msg = {"role": "tutor", "content": reply_content, "type": reply_type}
    if misconception:
        tutor_msg["misconceptionDetected"] = misconception
    if prereq_gap:
        tutor_msg["prerequisiteGap"] = prereq_gap
    meta["messages"].append(tutor_msg)
    meta["socraticLevel"] = min(meta["socraticLevel"] + 1, 5)

    return TutorReplyResponse(
        sessionId=req.sessionId,
        reply=TutorMessageSchema(
            role="tutor",
            content=reply_content,
            type=reply_type,
            misconceptionDetected=misconception,
            prerequisiteGap=prereq_gap,
        ),
        updatedMastery=0.5,
    )


# ── ITS unified engine REST surface (for non-WS clients) ────────────────────

@router.post("/start")
async def its_start(body: ItsStartRequest):
    """Start a deterministic ITS session for a node (free serving path).

    Returns ``state_snapshot`` — the client-held state to echo back into
    ``/its/input`` — alongside the engine response.
    """
    engine = _get_unified_engine()
    resp = engine.start_session(student_id=body.student_id, node_id=body.node_id)
    # Mirror the engine's initial StudentState so non-WS clients can
    # round-trip: /its/start -> state_snapshot -> /its/input(state=...).
    init_state = state_from_dict({
        "student_id": body.student_id,
        "current_node_id": body.node_id,
        "current_state": "introduce",
        "per_node_mastery": {body.node_id: 0.1},
    })
    return {
        **response_to_dict(resp),
        "state_snapshot": state_to_dict(init_state),
    }


@router.post("/input")
async def its_input(body: ItsInputRequest):
    """Advance an ITS session: state + student answer -> next tutoring turn."""
    engine = _get_unified_engine()
    state = state_from_dict(body.state)
    resp = engine.process_input(state, body.input)
    # ``state_snapshot`` (dict) is kept separate from response_to_dict's
    # string ``state`` so the client can always recover the full snapshot.
    return {
        **response_to_dict(resp),
        "state_snapshot": state_to_dict(state),
    }


# ── WebSocket ────────────────────────────────────────────────────────────────

@router.websocket("/ws")
async def tutor_websocket(websocket: WebSocket):
    """WebSocket for real-time tutoring.

    Message format: {"type": "ask"|"hint"|"explain_step"|"its_*", ...}
    """
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()

            if data.get("type") == "ask":
                response = await _get_tutor().handle_query(
                    user_query=data.get("query", ""),
                    user_id=data.get("user_id", "guest"),
                    node_id=data.get("node_id"),
                    mastery=data.get("mastery", 0.0),
                )
                await websocket.send_json({
                    "type": "tutor_response",
                    "text": response.text,
                    "hint": response.hint,
                    "feedback": response.feedback,
                    "intent": response.intent,
                    "mastery_level": response.mastery_level,
                    "hint_level": response.hint_level,
                })

            elif data.get("type") == "hint":
                hint = await _get_tutor().socratic_engine.get_hint(
                    user_query=data.get("query", ""),
                    user_id=data.get("user_id", "guest"),
                    node_id=data.get("node_id"),
                    mastery=data.get("mastery", 0.0),
                    hint_level=data.get("hint_level"),
                )
                await websocket.send_json({
                    "type": "hint_response",
                    "hint": hint,
                })

            elif data.get("type") == "explain_step":
                explanation = await _get_llm().explain_step_simpler(
                    step_rule=data.get("step_rule", ""),
                    step_formula=data.get("step_formula", ""),
                    step_explanation=data.get("step_explanation", ""),
                    student_level=data.get("student_level", "Class 11"),
                )
                await websocket.send_json({
                    "type": "explain_step_response",
                    "explanation": explanation,
                })

            elif data.get("type") == "its_start":
                engine = _get_unified_engine()
                resp = engine.start_session(
                    student_id=data.get("student_id", "guest"),
                    node_id=data.get("node_id", ""),
                )
                await websocket.send_json({
                    "type": "its_response",
                    **response_to_dict(resp),
                })

            elif data.get("type") == "its_input":
                engine = _get_unified_engine()
                state = state_from_dict(data.get("state", {}))
                resp = engine.process_input(state, data.get("input", ""))
                await websocket.send_json({
                    "type": "its_response",
                    "state": state_to_dict(state),
                    **response_to_dict(resp),
                })

            elif data.get("type") == "its_report":
                engine = _get_unified_engine()
                state = state_from_dict(data.get("state", {}))
                await websocket.send_json({
                    "type": "its_report",
                    "report": engine.get_session_report(state),
                })

            else:
                await websocket.send_json({
                    "type": "error",
                    "message": f"Unknown message type: {data.get('type')}",
                })

    except WebSocketDisconnect:
        logger.info("Tutor WebSocket disconnected")
    except Exception as e:
        logger.error(f"Tutor WebSocket error: {e}")
        try:
            await websocket.send_json({"type": "error", "message": str(e)})
        except Exception:
            pass
