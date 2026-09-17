"""Intelligence API router — exposes the full intelligence pipeline.

Endpoints:
  POST /api/intelligence/tutor          — Full Socratic pipeline v3
  POST /api/intelligence/solve          — JEE/NEET problem solver
  POST /api/intelligence/state          — Build 4D student state
  GET  /api/intelligence/context/{node} — Get teaching context for a node
  POST /api/intelligence/confidence     — Record confidence rating
  GET  /api/intelligence/confidence/{student} — Get calibration
  POST /api/intelligence/interaction    — Log an interaction
  POST /api/intelligence/meta-brain     — Run meta-brain jobs
  GET  /api/intelligence/agents         — List specialized agents
  GET  /api/intelligence/rules          — List orchestrator rules
  POST /api/intelligence/rules          — Add/update a rule
  GET  /api/intelligence/health         — System health check
  POST /api/intelligence/generate       — Self-play problem generation
"""

from __future__ import annotations

import logging
import time
import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/intelligence", tags=["intelligence"])

# ---------------------------------------------------------------------------
# Lazy-loaded singletons — import only when first request arrives
# ---------------------------------------------------------------------------

_pipeline = None
_solver = None
_traverser = None
_calibrator = None
_capture = None
_state_builder = None
_orchestrator = None
_ensemble = None
_renderer = None
_meta_brain = None
_ab_tester = None
_self_play = None

def _get_pipeline():
    global _pipeline
    if _pipeline is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.socratic_pipeline_v3 import SocraticPipelineV3
            _pipeline = SocraticPipelineV3()
            logger.info("SocraticPipelineV3 initialized")
        except Exception as e:
            logger.exception("Failed to init SocraticPipelineV3: %s", e)
            raise
    return _pipeline

def _get_solver():
    global _solver
    if _solver is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.jee_neet_solver import JEENEETSolver
            _solver = JEENEETSolver()
            logger.info("JEENEETSolver initialized")
        except Exception as e:
            logger.exception("Failed to init JEENEETSolver: %s", e)
            raise
    return _solver

def _get_traverser():
    global _traverser
    if _traverser is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.concept_graph_traverser import ConceptGraphTraverser
            nodes_dir = os.environ.get(
                "NODES_DIR",
                os.path.join(
                    os.path.dirname(os.path.dirname(os.path.dirname(
                        os.path.abspath(__file__)))),
                    "cbse_data", "nodes"))
            enrich_path = os.environ.get(
                "ENRICH_PATH",
                os.path.join(
                    os.path.dirname(os.path.dirname(os.path.dirname(
                        os.path.abspath(__file__)))),
                    "cbse_data", "enrichment_parsed.json"))
            _traverser = ConceptGraphTraverser(nodes_dir, enrich_path)
            logger.info("ConceptGraphTraverser initialized")
        except Exception as e:
            logger.exception("Failed to init ConceptGraphTraverser: %s", e)
            raise
    return _traverser

def _get_calibrator():
    global _calibrator
    if _calibrator is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.confidence_calibrator import ConfidenceCalibrator
            _calibrator = ConfidenceCalibrator()
            logger.info("ConfidenceCalibrator initialized")
        except Exception as e:
            logger.exception("Failed to init ConfidenceCalibrator: %s", e)
            raise
    return _calibrator

def _get_capture():
    global _capture
    if _capture is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.interaction_capture import SimpleInteractionCapture
            _capture = SimpleInteractionCapture()
            logger.info("InteractionCapture initialized")
        except Exception as e:
            logger.exception("Failed to init InteractionCapture: %s", e)
            raise
    return _capture

def _get_state_builder():
    global _state_builder
    if _state_builder is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.state_4d_builder import State4DBuilder
            _state_builder = State4DBuilder()
            logger.info("State4DBuilder initialized")
        except Exception as e:
            logger.exception("Failed to init State4DBuilder: %s", e)
            raise
    return _state_builder

def _get_orchestrator():
    global _orchestrator
    if _orchestrator is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.deterministic_orchestrator import DeterministicOrchestrator
            _orchestrator = DeterministicOrchestrator()
            logger.info("DeterministicOrchestrator initialized")
        except Exception as e:
            logger.exception("Failed to init DeterministicOrchestrator: %s", e)
            raise
    return _orchestrator

def _get_ensemble():
    global _ensemble
    if _ensemble is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.specialized_agents import AgentEnsemble, create_ensemble
            _ensemble = create_ensemble()
            logger.info("AgentEnsemble initialized")
        except Exception as e:
            logger.exception("Failed to init AgentEnsemble: %s", e)
            raise
    return _ensemble

def _get_renderer():
    global _renderer
    if _renderer is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            # Gemma 4 (Gemini API key) preferred; Claude/Fable proxy fallback.
            try:
                from backend.its.agents.gemma_renderer import GemmaRenderer
                _g = GemmaRenderer()
                if _g.available:
                    _renderer = _g
                    logger.info("GemmaRenderer initialized (Gemma 4)")
                    return _renderer
            except Exception as _ge:
                logger.warning("GemmaRenderer init failed, falling back: %s", _ge)
            from services.claude_renderer import ClaudeRenderer
            _renderer = ClaudeRenderer()
            logger.info("ClaudeRenderer initialized")
        except Exception as e:
            logger.exception("Failed to init renderer: %s", e)
            raise
    return _renderer

def _get_meta_brain():
    global _meta_brain
    if _meta_brain is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.meta_brain import MetaBrain
            _meta_brain = MetaBrain()
            logger.info("MetaBrain initialized")
        except Exception as e:
            logger.exception("Failed to init MetaBrain: %s", e)
            raise
    return _meta_brain

def _get_ab_tester():
    global _ab_tester
    if _ab_tester is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.rule_ab_tester import RuleABTester
            _ab_tester = RuleABTester()
            logger.info("RuleABTester initialized")
        except Exception as e:
            logger.exception("Failed to init RuleABTester: %s", e)
            raise
    return _ab_tester

def _get_self_play():
    global _self_play
    if _self_play is None:
        try:
            import sys, os
            svc_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "services")
            if svc_dir not in sys.path:
                sys.path.insert(0, svc_dir)
            from services.self_play_generator import SelfPlayGenerator
            _self_play = SelfPlayGenerator()
            logger.info("SelfPlayGenerator initialized")
        except Exception as e:
            logger.exception("Failed to init SelfPlayGenerator: %s", e)
            raise
    return _self_play


# ---------------------------------------------------------------------------
# Request / Response Schemas
# ---------------------------------------------------------------------------

class TutorRequest(BaseModel):
    student_id: str = Field(..., description="Student identifier")
    query: str = Field(..., description="Student's question or response")
    node_id: str = Field(..., description="Current concept node ID")
    mastery_map: dict[str, float] = Field(default_factory=dict, description="Concept -> mastery 0-1")
    interaction_history: list[dict] = Field(default_factory=list, description="Previous interactions")
    language: str = Field(default="en", description="Response language")


class TutorResponse(BaseModel):
    text: str
    action_type: str
    agent_used: str
    rule_used: str
    mastery_before: float
    mastery_after: float
    misconceptions_addressed: list[str]
    hint_level: int
    confidence_nudge: str
    latency_ms: int
    claude_called: bool
    tokens_used: int


class SolveRequest(BaseModel):
    problem_text: str = Field(..., description="JEE/NEET problem text")
    subject: Optional[str] = Field(None, description="physics/chemistry/math/biology")
    exam_type: Optional[str] = Field(None, description="jee_main/jee_advanced/neet")
    student_state: Optional[dict] = Field(None, description="4D student state for calibration")


class SolveResponse(BaseModel):
    solved: bool
    final_answer: str
    confidence: float
    explanation: Optional[dict]
    concepts_tested: list[str]
    strategies_used: list[str]
    solving_time_ms: int
    error: Optional[str] = None


class StateRequest(BaseModel):
    student_id: str
    interaction_history: list[dict] = Field(default_factory=list)


class ConfidenceRequest(BaseModel):
    student_id: str
    concept: str
    confidence_rating: int = Field(..., ge=1, le=5)
    is_correct: bool


class InteractionLogRequest(BaseModel):
    student_id: str
    node_id: str
    question: str
    response: str
    is_correct: bool
    time_spent_ms: int = 0
    hints_used: int = 0
    action_taken: str = ""
    mastery_before: float = 0.0
    mastery_after: float = 0.0
    session_id: Optional[str] = None


class MetaBrainRequest(BaseModel):
    interactions: list[dict] = Field(default_factory=list)
    enrichment_data: dict = Field(default_factory=dict)


class RuleRequest(BaseModel):
    rule_name: str
    condition: dict
    action: dict
    priority: int = 100
    source: str = "manual"


class GenerateRequest(BaseModel):
    subject: str = "physics"
    difficulty: str = "medium"
    count: int = Field(default=5, ge=1, le=50)


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/tutor", response_model=TutorResponse)
async def tutor(req: TutorRequest):
    """Full Socratic pipeline v3 — 4D state + graph + agents + orchestrator + renderer."""
    try:
        pipeline = _get_pipeline()
        t0 = time.perf_counter()
        result = pipeline.process_interaction(
            student_id=req.student_id,
            query=req.query,
            node_id=req.node_id,
            mastery_map=req.mastery_map,
            interaction_history=req.interaction_history,
            language=req.language,
        )
        elapsed_ms = int((time.perf_counter() - t0) * 1000)
        # Handle dict or object response
        if isinstance(result, dict):
            result.setdefault("latency_ms", elapsed_ms)
            # Coerce types to match TutorResponse schema
            _conf = result.get("confidence_nudge", "")
            _lat = result.get("latency_ms", elapsed_ms)
            return TutorResponse(
                text=str(result.get("text", "")),
                action_type=str(result.get("action_type", "tutor")),
                agent_used=str(result.get("agent_used", "TutorBot")),
                rule_used=str(result.get("rule_used", "default_tutor")),
                mastery_before=float(result.get("mastery_before", 0.0)),
                mastery_after=float(result.get("mastery_after", 0.0)),
                misconceptions_addressed=result.get("misconceptions_addressed", []),
                hint_level=int(result.get("hint_level", 0)),
                confidence_nudge=str(_conf) if _conf else "",
                latency_ms=int(_lat),
                claude_called=bool(result.get("claude_called", False)),
                tokens_used=int(result.get("tokens_used", 0)),
            )
        # Object with attributes
        return TutorResponse(
            text=getattr(result, "text", str(result)),
            action_type=getattr(result, "action_type", "tutor"),
            agent_used=getattr(result, "agent_used", "TutorBot"),
            rule_used=getattr(result, "rule_used", "default_tutor"),
            mastery_before=getattr(result, "mastery_before", 0.0),
            mastery_after=getattr(result, "mastery_after", 0.0),
            misconceptions_addressed=getattr(result, "misconceptions_addressed", []),
            hint_level=getattr(result, "hint_level", 0),
            confidence_nudge=getattr(result, "confidence_nudge", ""),
            latency_ms=elapsed_ms,
            claude_called=getattr(result, "claude_called", False),
            tokens_used=getattr(result, "tokens_used", 0),
        )
    except Exception as e:
        logger.exception("Tutor pipeline error")
        raise HTTPException(status_code=500, detail=f"Tutor error: {str(e)[:200]}")


@router.post("/solve", response_model=SolveResponse)
async def solve(req: SolveRequest):
    """JEE/NEET problem solver — decomposition + symbolic + verification."""
    try:
        solver = _get_solver()
        t0 = time.perf_counter()
        result = solver.solve(
            problem_text=req.problem_text,
            subject=req.subject,
            exam_type=req.exam_type,
            student_state=req.student_state,
        )
        elapsed_ms = int((time.perf_counter() - t0) * 1000)
        if isinstance(result, dict):
            return SolveResponse(
                solved=result.get("solved", False),
                final_answer=result.get("final_answer", ""),
                confidence=result.get("confidence", 0.0),
                explanation=result.get("explanation"),
                concepts_tested=result.get("concepts_tested", []),
                strategies_used=result.get("strategies_used", []),
                solving_time_ms=result.get("solving_time_ms", elapsed_ms),
                error=result.get("error"),
            )
        return SolveResponse(
            solved=getattr(result, "solved", False),
            final_answer=getattr(result, "final_answer", ""),
            confidence=getattr(result, "confidence", 0.0),
            explanation=getattr(result, "explanation", None),
            concepts_tested=getattr(result, "concepts_tested", []),
            strategies_used=getattr(result, "strategies_used", []),
            solving_time_ms=elapsed_ms,
            error=getattr(result, "error", None),
        )
    except Exception as e:
        logger.exception("Solver error")
        raise HTTPException(status_code=500, detail=f"Solver error: {str(e)[:200]}")


@router.post("/state")
async def build_state(req: StateRequest):
    """Build 4D student state (cognitive + affective + behavioral + temporal)."""
    try:
        builder = _get_state_builder()
        # Extract concept from first interaction or use default
        concept = "unknown"
        if req.interaction_history:
            concept = req.interaction_history[0].get("node_id", "unknown")
        state = builder.build_state(
            student_id=req.student_id,
            concept=concept,
            interactions=req.interaction_history,
        )
        if isinstance(state, dict):
            return state
        # Convert dataclass to dict
        if hasattr(state, "__dict__"):
            return state.__dict__
        if hasattr(state, "to_dict"):
            return state.to_dict()
        return {"state": str(state)}
    except Exception as e:
        logger.exception("State builder error")
        raise HTTPException(status_code=500, detail=f"State error: {str(e)[:200]}")


@router.get("/context/{node_id}")
async def get_teaching_context(node_id: str, mastery_map: Optional[str] = None):
    """Get teaching context for a node — prerequisites, misconceptions, cross-subject."""
    try:
        traverser = _get_traverser()
        m_map = {}
        if mastery_map:
            import json
            m_map = json.loads(mastery_map)
        ctx = traverser.get_teaching_context(node_id, m_map if m_map else None)
        if isinstance(ctx, dict):
            return ctx
        if hasattr(ctx, "__dict__"):
            return ctx.__dict__
        if hasattr(ctx, "to_dict"):
            return ctx.to_dict()
        return {"context": str(ctx)}
    except Exception as e:
        logger.exception("Context error")
        raise HTTPException(status_code=500, detail=f"Context error: {str(e)[:200]}")


@router.post("/confidence")
async def record_confidence(req: ConfidenceRequest):
    """Record a student's confidence rating for calibration."""
    try:
        cal = _get_calibrator()
        cal.record_confidence(
            student_id=req.student_id,
            concept=req.concept,
            confidence_rating=req.confidence_rating,
            is_correct=req.is_correct,
        )
        return {"status": "recorded"}
    except Exception as e:
        logger.exception("Confidence error")
        raise HTTPException(status_code=500, detail=f"Confidence error: {str(e)[:200]}")


@router.get("/confidence/{student_id}")
async def get_calibration(student_id: str):
    """Get confidence calibration for a student."""
    try:
        cal = _get_calibrator()
        result = cal.get_calibration(student_id)
        if isinstance(result, dict):
            return result
        if hasattr(result, "__dict__"):
            return result.__dict__
        return {"calibration": str(result)}
    except Exception as e:
        logger.exception("Calibration error")
        raise HTTPException(status_code=500, detail=f"Calibration error: {str(e)[:200]}")


@router.post("/interaction")
async def log_interaction(req: InteractionLogRequest):
    """Log a student interaction for the meta-brain."""
    try:
        cap = _get_capture()
        record = cap.capture(
            student_id=req.student_id,
            session_id=req.session_id or str(uuid.uuid4()),
            subject=req.node_id.split("_")[1] if "_" in req.node_id else "unknown",
            concept=req.node_id,
            grade_level=int(req.node_id[1:3]) if req.node_id[1:3].isdigit() else 0,
            interaction_type="answer",
            node_id=req.node_id,
            question=req.question,
            response=req.response,
            is_correct=req.is_correct,
            time_spent_ms=req.time_spent_ms,
            hints_used=req.hints_used,
            action_taken=req.action_taken,
            mastery_before=req.mastery_before,
            mastery_after=req.mastery_after,
        )
        # Feed the intelligence bus so InteractionOutcome/misconception
        # persistence + remediation actually fire — the JSONL capture above
        # is a side-channel, this is the real data path.
        try:
            from backend.services.intelligence_bus import (
                emit_student_answer, emit_hint,
            )
            emit_student_answer(
                problem_type_id=req.node_id,
                correct=bool(req.is_correct),
                student_id=str(req.student_id),
            )
            for _ in range(req.hints_used or 0):
                emit_hint(
                    problem_type_id=req.node_id,
                    rung=1,
                    student_id=str(req.student_id),
                )
        except Exception:
            pass  # telemetry must never break the interaction log
        return {"status": "logged", "record_id": getattr(record, "id", str(uuid.uuid4()))}
    except Exception as e:
        logger.exception("Interaction log error")
        raise HTTPException(status_code=500, detail=f"Log error: {str(e)[:200]}")


@router.post("/meta-brain")
async def run_meta_brain(req: MetaBrainRequest):
    """Run meta-brain jobs (nightly self-improvement)."""
    try:
        mb = _get_meta_brain()
        report = mb.run_all_jobs(
            interactions=req.interactions,
            enrichment_data=req.enrichment_data,
        )
        if isinstance(report, dict):
            return report
        if hasattr(report, "__dict__"):
            return report.__dict__
        if hasattr(report, "to_dict"):
            return report.to_dict()
        return {"report": str(report)}
    except Exception as e:
        logger.exception("Meta-brain error")
        raise HTTPException(status_code=500, detail=f"Meta-brain error: {str(e)[:200]}")


@router.get("/agents")
async def list_agents():
    """List all specialized agents and their current parameters."""
    try:
        ensemble = _get_ensemble()
        agents_info = []
        if hasattr(ensemble, "agents"):
            # agents can be a list or dict
            agents_iter = ensemble.agents.items() if isinstance(ensemble.agents, dict) else enumerate(ensemble.agents)
            for name, agent in agents_iter:
                info = {"name": type(agent).__name__, "type": type(agent).__name__}
                if hasattr(agent, "priority"):
                    info["priority"] = agent.priority
                if hasattr(agent, "description"):
                    info["description"] = agent.description
                agents_info.append(info)
        return {"agents": agents_info}
    except Exception as e:
        logger.exception("Agents list error")
        raise HTTPException(status_code=500, detail=f"Agents error: {str(e)[:200]}")


@router.get("/rules")
async def list_rules():
    """List all orchestrator rules."""
    try:
        orch = _get_orchestrator()
        rules = orch.get_active_rules()
        result = []
        for r in rules:
            if isinstance(r, dict):
                result.append(r)
            elif hasattr(r, "__dict__"):
                result.append(r.__dict__)
            else:
                result.append({"rule": str(r)})
        return {"rules": result}
    except Exception as e:
        logger.exception("Rules list error")
        raise HTTPException(status_code=500, detail=f"Rules error: {str(e)[:200]}")


@router.post("/rules")
async def add_rule(req: RuleRequest):
    """Add or update an orchestrator rule."""
    try:
        orch = _get_orchestrator()
        from services.deterministic_orchestrator import OrchestratorRule
        rule = OrchestratorRule(
            rule_name=req.rule_name,
            condition=req.condition,
            action=req.action,
            priority=req.priority,
            is_active=True,
            source=req.source,
        )
        orch.add_rule(rule)
        return {"status": "added", "rule_name": req.rule_name}
    except Exception as e:
        logger.exception("Rule add error")
        raise HTTPException(status_code=500, detail=f"Rule error: {str(e)[:200]}")


@router.post("/generate")
async def generate_problems(req: GenerateRequest):
    """Self-play problem generation."""
    try:
        gen = _get_self_play()
        problems = gen.generate_batch(
            count=req.count,
            subject=req.subject,
            difficulty=req.difficulty,
        )
        result = []
        for p in problems:
            if isinstance(p, dict):
                result.append(p)
            elif hasattr(p, "__dict__"):
                result.append(p.__dict__)
            elif hasattr(p, "to_dict"):
                result.append(p.to_dict())
            else:
                result.append({"problem": str(p)})
        return {"generated": result, "count": len(result)}
    except Exception as e:
        logger.exception("Generate error")
        raise HTTPException(status_code=500, detail=f"Generate error: {str(e)[:200]}")


@router.post("/evolve")
async def evolve_intelligence():
    """Run the self-evolving loop on live data (was an orphaned script).

    Reads interaction_outcome via the DB fallback when the synthetic
    interactions file isn't present, computes strategy effectiveness,
    misconception discovery, content gaps, profile updates, and writes
    a timestamped + latest snapshot under INTEL_OUT_DIR.
    """
    import asyncio
    from backend.services.self_evolving_loop import run_evolution_loop
    try:
        return await asyncio.to_thread(run_evolution_loop)
    except Exception as e:
        logger.exception("Evolve error")
        raise HTTPException(status_code=500, detail=f"Evolve error: {str(e)[:200]}")


@router.post("/warmup")
async def intelligence_warmup():
    """Eagerly initialize all intelligence components."""
    results = {}
    for name, fn in [
        ("pipeline", _get_pipeline),
        ("solver", _get_solver),
        ("traverser", _get_traverser),
        ("calibrator", _get_calibrator),
        ("capture", _get_capture),
        ("state_builder", _get_state_builder),
        ("orchestrator", _get_orchestrator),
        ("ensemble", _get_ensemble),
        ("renderer", _get_renderer),
        ("meta_brain", _get_meta_brain),
        ("ab_tester", _get_ab_tester),
        ("self_play", _get_self_play),
    ]:
        try:
            fn()
            results[name] = "ok"
        except Exception as e:
            results[name] = f"error: {str(e)[:100]}"
    loaded = sum(1 for v in results.values() if v == "ok")
    return {"status": "ok" if loaded == 12 else "partial", "loaded": loaded, "total": 12, "results": results}


@router.get("/health")
async def intelligence_health():
    """Check which intelligence components are loaded and healthy."""
    components = {
        "pipeline": _pipeline is not None,
        "solver": _solver is not None,
        "traverser": _traverser is not None,
        "calibrator": _calibrator is not None,
        "capture": _capture is not None,
        "state_builder": _state_builder is not None,
        "orchestrator": _orchestrator is not None,
        "ensemble": _ensemble is not None,
        "renderer": _renderer is not None,
        "meta_brain": _meta_brain is not None,
        "ab_tester": _ab_tester is not None,
        "self_play": _self_play is not None,
    }
    loaded = sum(1 for v in components.values() if v)
    total = len(components)
    return {
        "status": "ok" if loaded == total else "partial",
        "loaded": loaded,
        "total": total,
        "components": components,
    }
