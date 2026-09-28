"""Tutor router for the DREAM_APP educational platform.

Exposes endpoints for starting AI tutor sessions, sending messages,
retrieving session history, ending sessions, requesting hints, and
asking quick free-text questions.
"""

import logging
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import AliasChoices, BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user, get_current_user_optional
from backend.models.user import User
from backend.schemas.tutor import (
    TutorMessage,
    TutorReplyRequest,
    TutorReplyResponse,
    TutorSessionRequest,
)
from backend.services.tutor_service import TutorService

router = APIRouter(prefix="/api/tutor", tags=["tutor"])


# --------------------------------------------------------------------------- #
# Lightweight response schemas (not in the schemas module)
# --------------------------------------------------------------------------- #
class TutorSessionResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)
    """Response returned when a new tutor session is created."""

    session_id: str
    node_id: str
    topic: Optional[str] = None
    messages: List[TutorMessage] = []
    status: str = "active"
    # Web client compat fields.
    first_question: Optional[str] = None
    socratic_level: int = 1


class QuickQuestionRequest(BaseModel):
    """Request body for the quick-question endpoint.

    The web /tutor page sends ``user_query`` (plus mastery/language_pref
    extras); accept both spellings.
    """

    message: str = Field(
        ...,
        validation_alias=AliasChoices("message", "user_query", "query", "question"),
    )
    subject: Optional[str] = None
    class_level: Optional[int] = None


class QuickQuestionResponse(BaseModel):
    """Response for the quick-question endpoint.

    Includes the field names the web /tutor page reads
    (text/intent/mastery_level/hint_level/quality_score).
    """

    question: str
    answer: str
    node_id: Optional[str] = None
    node_title: Optional[str] = None
    subject: Optional[str] = None
    class_level: Optional[int] = None
    type: str = "definition"
    confidence: float = 0.0
    method: str = "fallback"
    # Web client compat fields.
    text: str = ""
    intent: str = "answer"
    mastery_level: float = 0.0
    hint_level: int = 0
    quality_score: float = 0.0
    feedback: Optional[str] = None


class TutorHintResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)
    """Response returned when a hint is requested."""

    session_id: str
    hint: str
    hint_type: Optional[str] = None


class TutorSessionDetailResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)
    """Detailed view of a tutor session including message history."""

    session_id: str
    node_id: Optional[str] = None
    topic: Optional[str] = None
    status: str = "active"
    messages: List[TutorMessage] = []
    started_at: Optional[str] = None
    ended_at: Optional[str] = None


class TutorEndSessionResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)
    """Response returned when a session is ended."""

    session_id: str
    status: str = "ended"
    summary: Optional[str] = None


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #
@router.post("/sessions", response_model=TutorSessionResponse, status_code=status.HTTP_201_CREATED)
async def start_session(
    payload: TutorSessionRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Start a new AI tutor session for a knowledge node."""
    try:
        session = await TutorService.start_session(
            db,
            user_id=str(user.id),
            node_id=payload.node_id,
            topic=payload.topic,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(session, dict):
        return TutorSessionResponse(**session)
    return TutorSessionResponse(
        session_id=str(session.get("session_id", session.get("id", ""))),
        node_id=session.get("node_id", payload.node_id),
        topic=session.get("topic", payload.topic),
        messages=[
            TutorMessage(**m) if isinstance(m, dict) else TutorMessage.model_validate(m)
            for m in session.get("messages", [])
        ],
        status=session.get("status", "active"),
    )


@router.post("/sessions/{session_id}/reply", response_model=TutorReplyResponse)
async def reply_to_session(
    session_id: str,
    payload: TutorReplyRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Send a message to an active tutor session and receive a reply."""
    # Use the path parameter as the authoritative session id
    message = payload.message if payload.session_id == session_id else payload.message

    try:
        result = await TutorService.reply(
            db,
            user_id=str(user.id),
            session_id=session_id,
            message=message,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    except Exception as exc:
        import logging
        logging.getLogger(__name__).error(f"Tutor error: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal error: {str(exc)[:200]}",
        )

    if isinstance(result, dict):
        # result["reply"] is a dict — convert to TutorMessage
        reply_data = result.get("reply", {})
        if isinstance(reply_data, dict):
            reply_msg = TutorMessage(**reply_data)
        else:
            reply_msg = TutorMessage.model_validate(reply_data)
        return TutorReplyResponse(
            session_id=result.get("session_id", session_id),
            reply=reply_msg,
            updated_mastery=result.get("updated_mastery"),
        )
    return result


@router.get("/sessions/{session_id}", response_model=TutorSessionDetailResponse)
async def get_session(
    session_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve a single tutor session with its message history."""
    try:
        session = await TutorService.get_session(
            db, user_id=str(user.id), session_id=session_id
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(session, dict):
        return TutorSessionDetailResponse(**session)
    return TutorSessionDetailResponse(
        session_id=str(getattr(session, "session_id", getattr(session, "id", session_id))),
        node_id=getattr(session, "node_id", ""),
        topic=getattr(session, "topic", None),
        status=getattr(session, "status", "active"),
        messages=[
            TutorMessage.model_validate(m) for m in getattr(session, "messages", [])
        ],
        started_at=str(getattr(session, "started_at", None)) if getattr(session, "started_at", None) else None,
        ended_at=str(getattr(session, "ended_at", None)) if getattr(session, "ended_at", None) else None,
    )


@router.get("/sessions", response_model=List[TutorSessionDetailResponse])
async def list_sessions(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List all tutor sessions for the authenticated user."""
    sessions = await TutorService.get_user_sessions(db, user_id=str(user.id))

    results: List[TutorSessionDetailResponse] = []
    for sess in sessions:
        if isinstance(sess, dict):
            results.append(TutorSessionDetailResponse(**sess))
        else:
            results.append(
                TutorSessionDetailResponse(
                    session_id=str(getattr(sess, "session_id", getattr(sess, "id", ""))),
                    node_id=getattr(sess, "node_id", ""),
                    topic=getattr(sess, "topic", None),
                    status=getattr(sess, "status", "active"),
                    messages=[
                        TutorMessage.model_validate(m)
                        for m in getattr(sess, "messages", [])
                    ],
                    started_at=str(getattr(sess, "started_at", None)) if getattr(sess, "started_at", None) else None,
                    ended_at=str(getattr(sess, "ended_at", None)) if getattr(sess, "ended_at", None) else None,
                )
            )
    return results


@router.post("/sessions/{session_id}/end", response_model=TutorEndSessionResponse)
async def end_session(
    session_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """End an active tutor session."""
    try:
        result = await TutorService.end_session(
            db, user_id=str(user.id), session_id=session_id
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(result, dict):
        return TutorEndSessionResponse(**result)
    return TutorEndSessionResponse(
        session_id=session_id,
        status=getattr(result, "status", "ended"),
        summary=getattr(result, "summary", None),
    )


@router.post("/sessions/{session_id}/hint", response_model=TutorHintResponse)
async def get_hint(
    session_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Request a hint within an active tutor session."""
    try:
        result = await TutorService.get_hint(
            db, user_id=str(user.id), session_id=session_id
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(result, dict):
        return TutorHintResponse(**result)
    return TutorHintResponse(
        session_id=session_id,
        hint=getattr(result, "hint", str(result)),
        hint_type=getattr(result, "hint_type", None),
    )


# --------------------------------------------------------------------------- #
# Session export — download study notes summary
# --------------------------------------------------------------------------- #
@router.get("/sessions/{session_id}/export")
async def export_session(
    session_id: str,
    format: str = "text",
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Export the session as downloadable study notes.

    Returns a structured summary of everything the student learned:
    - Topic and definition
    - Key concepts from the walkthrough
    - Diagnostic results and scores
    - Failed questions and what was learned from them
    - Flashcard quiz results
    - XP earned and learning gain

    Format: 'text' (plain text) or 'markdown' (markdown).
    """
    from fastapi.responses import PlainTextResponse

    try:
        session = await TutorService.get_session(db, session_id, user_id=str(user.id))
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    meta = session.get("metadata", session)
    messages = meta.get("messages", [])
    topic = meta.get("topic", "Unknown Topic")
    node_id = meta.get("node_id", "")
    xp_earned = meta.get("xp_earned", 0)

    # Build export content
    lines = []
    if format == "markdown":
        lines.append(f"# Study Notes: {topic}")
        lines.append(f"\n**Date:** {messages[0]['timestamp'][:10] if messages else 'N/A'}")
        lines.append(f"**XP Earned:** {xp_earned}")
        lines.append("\n---\n")
        lines.append("## Session Conversation\n")
        for msg in messages:
            role = "Student" if msg.get("role") == "user" else "Tutor"
            content = msg.get("content", "")
            lines.append(f"**{role}:** {content}\n")
        # Diagnostic results
        diag_results = meta.get("diag_results", {})
        if diag_results:
            lines.append("\n---\n")
            lines.append("## Diagnostic Results\n")
            for q_num, res in diag_results.items():
                # NOTE: do not name this local `status` — it shadows the
                # fastapi `status` import used by the 404 handler above.
                mark = "✓ Correct" if res.get("correct") else "✗ Incorrect"
                lines.append(f"- **Q{q_num}** ({res.get('cognitive_type', '')}): {mark} — Score: {res.get('score', 0):.0%}")
        # Learning gain
        pre_scores = meta.get("diag_pre_remediation_scores", {})
        if pre_scores:
            lines.append("\n---\n")
            lines.append("## Learning Gain\n")
            for q_num, pre_score in pre_scores.items():
                post = diag_results.get(q_num, {}).get("score", 0)
                lines.append(f"- **Q{q_num}:** Before remediation: {pre_score:.0%} → After: {post:.0%}")
    else:
        lines.append(f"Study Notes: {topic}")
        lines.append(f"Date: {messages[0]['timestamp'][:10] if messages else 'N/A'}")
        lines.append(f"XP Earned: {xp_earned}")
        lines.append("")
        lines.append("Session Conversation:")
        lines.append("-" * 40)
        for msg in messages:
            role = "Student" if msg.get("role") == "user" else "Tutor"
            content = msg.get("content", "")
            lines.append(f"\n{role}: {content}")
        diag_results = meta.get("diag_results", {})
        if diag_results:
            lines.append("\n" + "=" * 40)
            lines.append("Diagnostic Results:")
            for q_num, res in diag_results.items():
                mark = "Correct" if res.get("correct") else "Incorrect"
                lines.append(f"  Q{q_num} ({res.get('cognitive_type', '')}): {mark} — Score: {res.get('score', 0):.0%}")

    content = "\n".join(lines)
    filename = f"study_notes_{node_id}_{session_id[:8]}.{'md' if format == 'markdown' else 'txt'}"
    return PlainTextResponse(
        content=content,
        media_type="text/plain",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


# --------------------------------------------------------------------------- #
# Quick question — no session required
# --------------------------------------------------------------------------- #
@router.post("/ask", response_model=QuickQuestionResponse)
async def quick_question(
    payload: QuickQuestionRequest,
    db: AsyncSession = Depends(get_db),
):
    """Answer a free-text question without requiring a tutor session.

    This is the "ask anything" box on the dashboard.  It routes the
    question to the best matching enrichment node and serves the
    appropriate field.  No authentication required — this is a public
    content endpoint so even logged-out users can ask questions.
    """
    try:
        # Bounded: psy/cs lookups were hanging 49-120s on cold/qdrant-slow
        # paths and nginx 504'd the worker (B12). Degrade in <10s.
        import asyncio as _asyncio
        result = await _asyncio.wait_for(
            TutorService.quick_question(
                db,
                message=payload.message,
                subject=payload.subject,
                class_level=payload.class_level,
            ),
            timeout=10.0,
        )
    except _asyncio.TimeoutError:
        import logging
        logging.getLogger(__name__).warning(
            "quick_question timed out (10s) — serving fallback")
        result = {
            "question": payload.message,
            "answer": (
                "That question is taking longer than usual — here's the "
                "short version: check the concept in your syllabus notes and "
                "ask me again in a moment for a deeper explanation."
            ),
            "node_id": None, "node_title": None,
            "subject": payload.subject,
            "class_level": payload.class_level,
            "type": "timeout", "confidence": 0.0, "method": "fallback",
        }
    except Exception as exc:
        # The ask box must never hard-fail: degrade to a deterministic
        # fallback answer (optional services like the LLM/qdrant may be
        # unreachable, and raw provider errors were previously returned
        # as 500s here).
        import logging
        logging.getLogger(__name__).warning(f"quick_question degraded: {exc}")
        result = {
            "question": payload.message,
            "answer": (
                "I'm having trouble reaching my teaching services right now. "
                "Please try again in a moment — meanwhile, try asking a question "
                "about a specific topic from your syllabus."
            ),
            "node_id": None,
            "node_title": None,
            "subject": payload.subject,
            "class_level": payload.class_level,
            "type": "service_unavailable",
            "confidence": 0.0,
            "method": "fallback",
        }

    resp = QuickQuestionResponse(**result)
    # Populate the field names the web /tutor page reads.
    resp.text = resp.answer
    resp.intent = resp.type or "answer"
    resp.quality_score = resp.confidence

    # ---- Funnel telemetry -------------------------------------------------
    # `method` is already set by every one of the six deterministic layers in
    # TutorService.quick_question (pattern_solver, compute, template,
    # multistep, routing, fallback) and it is the ONLY signal that tells you
    # what fraction of student questions reach an LLM. Without it logged, LLM
    # spend cannot be attributed to a layer, so it cannot be reduced.
    #
    # Emitted as a structured `extra` so it survives into JSON logs (see
    # backend/observability.py JsonLogFormatter) and can be aggregated by
    # scripts/tutor_funnel_report.py.
    try:
        logging.getLogger("tutor.funnel").info(
            "question_routed",
            extra={
                "tutor_method": resp.method,
                "tutor_type": resp.type,
                "tutor_confidence": resp.confidence,
                "tutor_node_id": result.get("node_id"),
                "tutor_class_level": payload.class_level,
            },
        )
    except Exception:  # telemetry must never break an answer
        pass
    return resp


# --------------------------------------------------------------------------- #
# Standalone hint — used by the web /tutor page's "Request a hint" button
# --------------------------------------------------------------------------- #
class TutorHintRequest(BaseModel):
    """Request body for the standalone hint endpoint."""

    user_id: Optional[str] = None
    node_id: Optional[str] = None
    context: str = Field(..., min_length=1)
    hint_level: int = 1
    mastery: Optional[float] = None
    language_pref: Optional[str] = None


@router.post("/hint")
async def standalone_hint(payload: TutorHintRequest):
    """Return a level-escalating hint for the tutor message on screen.

    Tries the LLM first (if configured) and always falls back to a
    deterministic, level-appropriate hint derived from the context so the
    endpoint never fails hard.
    """
    hint = await _llm_hint(payload.context, payload.hint_level, payload.language_pref)
    if not hint:
        hint = _fallback_hint(payload.context, payload.hint_level)
    return {"hint": hint, "hint_level": payload.hint_level}


async def _llm_hint(context: str, level: int, language_pref: Optional[str]) -> Optional[str]:
    """Best-effort LLM hint; returns None when no LLM is configured/available."""
    try:
        from backend.services.llm_client import LLMClient

        client = LLMClient(timeout=12)
        level_guide = {
            1: "Nudge the student toward the first idea without giving anything away.",
            2: "Break the problem into the next concrete step; still no final answer.",
            3: "Give a near-complete hint; the final step may remain for the student.",
        }
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a supportive Indian-school tutor. Reply in the same "
                    "language style as the student (English/Hinglish). "
                    + level_guide.get(max(1, min(level, 3)), level_guide[1])
                    + " Keep it to 1-2 sentences."
                ),
            },
            {
                "role": "user",
                "content": f"Here is the tutor explanation the student is stuck on:\n{context}\n\nGive the hint now:",
            },
        ]
        text = await client.chat(messages, temperature=0.2, max_tokens=150)
        # LLMClient signals failure with strings like "[LLM error — ...]".
        if text and "LLM error" not in text and not text.lstrip().startswith("["):
            return text.strip()
    except Exception:
        pass
    return None


def _fallback_hint(context: str, level: int) -> str:
    """Deterministic level-appropriate hint built from the context text."""
    clean = (context or "").strip()
    # Strip markdown emphasis for length estimation.
    plain = clean.replace("**", "").replace("*", "")
    first_sentence = plain.split(". ")[0][:220]
    if len(plain) > 160:
        first_sentence = first_sentence[:200].rsplit(" ", 1)[0] + "…"
    if level <= 1:
        return (
            "Focus on what is being asked: "
            + first_sentence
            + " Which given value connects to it?"
        )
    if level == 2:
        return (
            "Let's break it down — re-read this part: "
            + first_sentence
            + " Write down the formula or rule that links the given values, "
            "then substitute step by step."
        )
    return (
        "Almost there! Work through it line by line: "
        + first_sentence
        + " Substitute the values, simplify one operation at a time, and "
        "check your units at the end."
    )


# --------------------------------------------------------------------------- #
# Explain-step-simpler — used by the web /tutor page's "Explain simpler" button
# --------------------------------------------------------------------------- #
class ExplainStepRequest(BaseModel):
    """Request body for the explain-step endpoint."""

    step_rule: str = ""
    step_formula: str = ""
    step_explanation: str = ""
    student_level: Optional[int] = None
    user_id: Optional[str] = None
    language_pref: Optional[str] = None
    subject: Optional[str] = None


@router.post("/explain-step")
async def explain_step(payload: ExplainStepRequest):
    """Re-explain a tutor step in simpler terms; returns {simplified}."""
    base = payload.step_explanation or payload.step_rule or ""
    simplified: Optional[str] = None
    try:
        from backend.services.llm_client import LLMClient

        client = LLMClient(timeout=15)
        level = payload.student_level or 8
        simplified = await client.explain_step_simpler(
            payload.step_rule or base,
            payload.step_formula or "",
            base,
            student_level=f"Class {level}",
        )
        # LLMClient signals failure with strings like "[LLM error — ...]".
        if simplified and ("LLM error" in simplified or simplified.lstrip().startswith("[")):
            simplified = None
    except Exception:
        simplified = None

    if not simplified:
        # Deterministic fallback: restate the step as a short, plain sentence.
        plain = (base or "this step").replace("**", "").replace("*", "").strip()
        first = plain.split(". ")[0][:240]
        simplified = (
            f"In simple words: {first}. "
            "Take the values you know, put them into the rule shown above, "
            "and solve one small step at a time."
        )
    return {"simplified": simplified}
