"""
socratic_pipeline_v3.py — Integrated Socratic tutoring pipeline.

Wires together:
  state_4d_builder, concept_graph_traverser, specialized_agents,
  deterministic_orchestrator, claude_renderer, interaction_capture,
  tutor_brain (merged per-node patterns/misconceptions)
"""

import time
import logging
import os
import re
import json
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

# ── tutor brain loader ───────────────────────────────────────────────────────

_TUTOR_BRAIN_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "tutor_brain", "tutor_brain.json",
)

_tutor_brain_cache: Optional[Dict[str, Any]] = None


def _load_tutor_brain() -> Dict[str, Any]:
    """Load and cache the merged tutor brain JSON."""
    global _tutor_brain_cache
    if _tutor_brain_cache is not None:
        return _tutor_brain_cache
    try:
        if os.path.exists(_TUTOR_BRAIN_PATH):
            with open(_TUTOR_BRAIN_PATH, "r", encoding="utf-8") as f:
                _tutor_brain_cache = json.load(f)
            logger.info(
                "Tutor brain loaded: %d entries from %s",
                _tutor_brain_cache.get("total_entries", 0),
                _TUTOR_BRAIN_PATH,
            )
        else:
            logger.warning("Tutor brain file not found: %s", _TUTOR_BRAIN_PATH)
            _tutor_brain_cache = {"entries": [], "index_by_node": {}}
    except Exception as exc:
        logger.error("Failed to load tutor brain: %s", exc)
        _tutor_brain_cache = {"entries": [], "index_by_node": {}}
    return _tutor_brain_cache

# ── lazy-import helper ──────────────────────────────────────────────────────

def _lazy_import(module_path: str, class_name: str):
    """Return the class or None on failure. Tries bare, services-, and agents-prefixed paths."""
    import importlib
    for path in (module_path, f"services.{module_path}", f"its.agents.{module_path}"):
        try:
            mod = importlib.import_module(path)
            return getattr(mod, class_name)
        except Exception:
            continue
    logger.warning("Lazy import failed: %s.%s", module_path, class_name)
    return None


# ── component singletons (resolved on first access) ─────────────────────────

def _component(module_path: str, class_name: str):
    cls = _lazy_import(module_path, class_name)
    return cls() if cls else None


# ── answer-leak patterns ────────────────────────────────────────────────────

_ANSWER_RE = re.compile(
    r"\b(the\s+answer\s+is|the\s+solution\s+is|equals\s+\d|=\s*\d+|result:\s*\d)\b",
    re.IGNORECASE,
)


# ── template fallbacks ──────────────────────────────────────────────────────

_TMPL_CONTEXT = (
    "It's helpful to first explore what you already know about this topic. "
    "What do you think is happening here?"
)
_TMPL_HINT = (
    "Let's take it step by step. Think about what we covered — "
    "can you identify the key concept at play?"
)
_TMPL_FULL = (
    "Good thinking so far. Let's refine your approach — "
    "consider how these pieces connect and what assumption you might be making."
)

# Intent → action_type mapping for tutor brain patterns
_INTENT_TO_ACTION = {
    "question": "question",
    "request_walkthrough": "scaffold",
    "request_simplify": "scaffold",
    "request_hint": "hint",
    "request_example": "scaffold",
    "request_test": "question",
    "misconception": "correction",
    "confusion": "scaffold",
    "frustration": "encouragement",
}


# ── SocraticPipelineV3 ──────────────────────────────────────────────────────

class SocraticPipelineV3:
    """End-to-end Socratic tutoring pipeline."""

    def __init__(
        self,
        enrichment_data: Optional[Dict[str, Any]] = None,
        nodes_data: Optional[List[Dict[str, Any]]] = None,
    ):
        self.enrichment_data = enrichment_data or {}
        self.nodes_data = nodes_data or []

        State4D      = _lazy_import("state_4d_builder",         "State4DBuilder")
        Traverser    = _lazy_import("concept_graph_traverser",   "ConceptGraphTraverser")
        Agents       = _lazy_import("specialized_agents",        "AgentEnsemble")
        Orchestrator = _lazy_import("deterministic_orchestrator","DeterministicOrchestrator")
        Claude       = _lazy_import("claude_renderer",           "ClaudeRenderer")
        Capture      = _lazy_import("interaction_capture",       "SimpleInteractionCapture")

        self._state4d      = State4D() if State4D else None
        self._traverser    = None
        if Traverser:
            try:
                # ConceptGraphTraverser needs nodes_dir; use default if available
                import os as _os
                _default_nodes = r"D:\platform\cbse_data\nodes\by_subject"
                if _os.path.isdir(_default_nodes):
                    self._traverser = Traverser(nodes_dir=_default_nodes)
            except Exception as _e:
                logger.debug(f"ConceptGraphTraverser init failed (non-critical): {_e}")
        self._agents       = None
        if Agents:
            try:
                self._agents = Agents()
            except Exception as _e:
                logger.debug(f"AgentEnsemble init failed (non-critical): {_e}")
        self._orchestrator = Orchestrator() if Orchestrator else None
        # Renderer selection: Gemma 4 (Gemini API key) preferred, Fable/Claude
        # fallback. Both expose the same render() contract and template
        # fallbacks, so the tutor loop never depends on the LLM being up.
        self._claude       = None
        Gemma              = _lazy_import("gemma_renderer",           "GemmaRenderer")
        if Gemma:
            try:
                _gemma = Gemma()
                if _gemma.available:
                    self._claude = _gemma
                    logger.info(f"Renderer: Gemma 4 ({getattr(_gemma, '_fast_model', '?')})")
            except Exception as _e:
                logger.warning(f"GemmaRenderer init failed (non-critical): {_e}")
        if self._claude is None and Claude:
            import os as _os
            _key = _os.environ.get("ANTHROPIC_API_KEY") or _os.environ.get("CLAUDE_API_KEY") or _os.environ.get("FABLE_API_KEY") or ""
            if _key:
                try:
                    # Use the Fable/Claude proxy URL that matches the key
                    _url = _os.environ.get("CLAUDE_API_URL", "https://api.claudeopus.pro/v1/messages")
                    self._claude = Claude(api_key=_key, api_url=_url)
                except Exception as _e:
                    logger.warning(f"ClaudeRenderer init failed (non-critical): {_e}")
            else:
                logger.info("No LLM renderer: no GEMINI_API_KEY / ANTHROPIC_API_KEY set")
        self._capture      = Capture() if Capture else None

        # Load tutor brain for per-node pattern matching
        self._tutor_brain = _load_tutor_brain()
        self._tutor_brain_index = self._tutor_brain.get("index_by_node", {})

    # ── public API ────────────────────────────────────────────────────────

    def process_interaction(
        self,
        student_id: str,
        query: str,
        node_id: str,
        mastery_map: Dict[str, float],
        interaction_history: List[Dict[str, Any]],
        language: str = "en",
    ) -> Dict[str, Any]:
        """Run the full pipeline for one student turn."""

        t_start = time.perf_counter()
        tokens_used = 0
        claude_called = False

        # (a) 4-D student state
        state4d = self._build_state4d(student_id, node_id, interaction_history)

        # (b) concept-graph context
        context = self._get_context(node_id, mastery_map)

        # (b-b) tutor brain lookup — per-node patterns and misconceptions
        brain_match = self._lookup_tutor_brain(node_id, query)
        if brain_match:
            context["tutor_brain"] = brain_match

        # mastery snapshots
        mastery_before = float(mastery_map.get(node_id, 0.0))
        hint_level = self._pcr_tier(mastery_before)

        # (c) run specialized agents
        proposed = self._run_agents(query, node_id, mastery_before,
                                    state4d, context)

        # (d) orchestrator decides
        winning = self._orchestrate(proposed, mastery_before)

        # (e) render to natural language
        (text,
         action_type,
         rule_used,
         agent_used,
         claude_called,
         tokens_used) = self._render(winning, query, node_id,
                                     mastery_before, hint_level, brain_match)

        # (e-b) answer-leak prevention
        text, leak_stripped = self._strip_answer_leak(text, mastery_before)
        if leak_stripped:
            claude_called = False
            tokens_used = 0

        # mastery after interaction
        mastery_after = self._update_mastery(mastery_before, winning, query)
        mastery_map[node_id] = mastery_after

        # (f) log
        misconceptions = self._extract_misconceptions(winning, interaction_history)
        confidence_nudge = round(mastery_after - mastery_before, 4)

        self._log_interaction(
            student_id=student_id, query=query, node_id=node_id,
            mastery_before=mastery_before, mastery_after=mastery_after,
            action_type=action_type, agent_used=agent_used,
            rule_used=rule_used, hint_level=hint_level,
            confidence_nudge=confidence_nudge, rendered_text=text,
        )

        # (g) response dict
        latency_ms = round((time.perf_counter() - t_start) * 1000, 2)

        return {
            "text":                   text,
            "action_type":            action_type,
            "agent_used":             agent_used,
            "rule_used":              rule_used,
            "mastery_before":         mastery_before,
            "mastery_after":          mastery_after,
            "misconceptions_addressed": misconceptions,
            "hint_level":             hint_level,
            "confidence_nudge":       confidence_nudge,
            "latency_ms":             latency_ms,
            "claude_called":          claude_called,
            "tokens_used":            tokens_used,
        }

    # ── tutor brain lookup ──────────────────────────────────────────────

    def _lookup_tutor_brain(self, node_id: str, query: str) -> Dict[str, Any]:
        """Look up node-specific patterns and misconceptions from the tutor brain."""
        entry = self._tutor_brain_index.get(node_id)
        if not entry:
            return {}

        query_lower = query.lower().strip()
        query_words = set(query_lower.split())

        # Match classification patterns (substring or keyword overlap)
        matched_patterns = []
        for pat in entry.get("classification_patterns", []):
            pattern_text = pat.get("pattern", "").lower()
            if not pattern_text:
                continue
            # Exact substring match
            if pattern_text in query_lower:
                matched_patterns.append(pat)
                continue
            # Keyword overlap match (>= 60% of pattern words in query)
            pat_words = set(pattern_text.split())
            if pat_words:
                overlap = len(pat_words & query_words) / len(pat_words)
                if overlap >= 0.6:
                    matched_patterns.append(pat)

        # Match misconception signatures (keyword overlap with student_says)
        matched_misconceptions = []
        for mc in entry.get("misconception_signatures", []):
            for student_says in mc.get("student_says", []):
                says_lower = student_says.lower()
                # Exact substring match
                if says_lower in query_lower:
                    matched_misconceptions.append(mc)
                    break
                # Keyword overlap match (>= 50% of student_says words in query)
                says_words = set(says_lower.split())
                if says_words:
                    overlap = len(says_words & query_words) / len(says_words)
                    if overlap >= 0.5:
                        matched_misconceptions.append(mc)
                        break

        # Emotional triggers
        emotional_triggered = []
        for trigger in entry.get("emotional_triggers", []):
            if trigger.lower() in query_lower:
                emotional_triggered.append(trigger)

        return {
            "node_entry": entry,
            "matched_patterns": matched_patterns,
            "matched_misconceptions": matched_misconceptions,
            "emotional_triggered": emotional_triggered,
            "recommended_flow": entry.get("recommended_flow", []),
        }

    # ── internal helpers ──────────────────────────────────────────────────

    def _build_state4d(
        self, student_id: str, node_id: str, history: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        if self._state4d and hasattr(self._state4d, "build_state"):
            try:
                return self._state4d.build_state(
                    student_id, node_id or "", history or [])
            except Exception as exc:
                logger.error("State4D.build_state failed: %s", exc)
        return self._default_state4d(history)

    @staticmethod
    def _default_state4d(history: List[Dict[str, Any]]) -> Dict[str, Any]:
        recent = history[-5:] if history else []
        correct = sum(1 for h in recent if h.get("correct"))
        return {
            "engagement":             0.5,
            "recent_accuracy":        correct / len(recent) if recent else 0.5,
            "response_time_trend":    0.0,
            "help_seeking_frequency": 0.0,
        }

    def _get_context(
        self, node_id: str, mastery_map: Dict[str, float]
    ) -> Dict[str, Any]:
        if self._traverser and hasattr(self._traverser, "get_teaching_context"):
            try:
                return self._traverser.get_teaching_context(node_id, mastery_map)
            except Exception as exc:
                logger.error("Traverser.get_context failed: %s", exc)
        return {"node_id": node_id, "prerequisites": [], "related_concepts": []}

    def _run_agents(
        self,
        query: str, node_id: str, mastery: float,
        state4d: Dict[str, Any], context: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        if self._agents is not None:
            # Preferred path: run the full six-agent ensemble so the
            # orchestrator can genuinely arbitrate its proposals against
            # the active rules (see deterministic_orchestrator.decide).
            run_all = getattr(self._agents, "run_all_agents", None)
            if callable(run_all):
                try:
                    actions = run_all(
                        student_state=state4d if isinstance(state4d, dict) else {},
                        teaching_context=context if isinstance(context, dict) else {},
                        interaction_history=[],
                    )
                    actions = [a for a in (actions or []) if a is not None]
                    if actions:
                        return actions
                except Exception as exc:
                    logger.error("AgentEnsemble.run_all_agents failed: %s", exc)

        # Legacy path: probe named agent methods (custom ensembles only).
        AGENT_NAMES = [
            "socratic_questioner",
            "hint_generator",
            "misconception_detector",
            "scaffold_provider",
            "encouragement_agent",
            "concept_linker",
        ]
        actions: List[Dict[str, Any]] = []
        for name in AGENT_NAMES:
            method = getattr(self._agents, name, None)
            if method and callable(method):
                try:
                    result = method(
                        query=query, node_id=node_id,
                        mastery=mastery, state=state4d, context=context,
                    )
                    if isinstance(result, dict):
                        actions.append(result)
                except Exception as exc:
                    logger.error("Agent %s failed: %s", name, exc)
        return actions or [self._fallback_action(query, node_id, mastery)]

    def _fallback_action(self, query: str, node_id: str, mastery: float) -> Dict[str, Any]:
        """Generate a fallback action, enriched by tutor brain if available."""
        # Try tutor brain first for a node-specific response
        brain_match = self._lookup_tutor_brain(node_id, query)
        if brain_match:
            mcs = brain_match.get("matched_misconceptions", [])
            patterns = brain_match.get("matched_patterns", [])

            # Misconceptions first (most specific)
            if mcs:
                mc = mcs[0]
                text = mc.get("why_wrong", _TMPL_HINT)
                return {
                    "agent": "tutor_brain",
                    "action_type": "correction",
                    "text": text,
                    "rule_used": "tutor_brain:misconception",
                    "confidence": 0.9,
                    "misconceptions": [mc.get("id", "") for mc in mcs],
                }

            # Emotional support
            if brain_match.get("emotional_triggered"):
                return {
                    "agent": "tutor_brain",
                    "action_type": "encouragement",
                    "text": "I understand this can feel challenging. Let's take it one step at a time — what part feels most confusing?",
                    "rule_used": "tutor_brain:emotional_support",
                    "confidence": 0.85,
                }

            # Pattern-based response
            if patterns:
                best_pat = max(patterns, key=lambda p: p.get("confidence", 0))
                template_id = best_pat.get("template_id", "")
                intent = best_pat.get("intent", "question")
                action_type = _INTENT_TO_ACTION.get(intent, "question")
                return {
                    "agent": "tutor_brain",
                    "action_type": action_type,
                    "text": "Let's explore this together. Think about what you already know about this topic.",
                    "rule_used": f"tutor_brain:{template_id}",
                    "confidence": best_pat.get("confidence", 0.7),
                }

        tpl = _TMPL_CONTEXT if mastery < 0.4 else _TMPL_HINT
        return {
            "agent":        "fallback",
            "action_type":  "question",
            "text":         tpl,
            "rule_used":    "default_template",
            "confidence":   0.5,
        }

    def _orchestrate(
        self, proposed: List[Dict[str, Any]], mastery: float,
    ) -> Dict[str, Any]:
        if self._orchestrator and hasattr(self._orchestrator, "decide"):
            try:
                # DeterministicOrchestrator.decide(student_state, teaching_context, interaction_history, proposed_actions)
                student_state = {"mastery": mastery}
                result = self._orchestrator.decide(
                    student_state=student_state,
                    proposed_actions=proposed,
                )
                # Convert AgentAction to dict if needed
                if hasattr(result, '__dict__'):
                    return {k: v for k, v in result.__dict__.items() if not k.startswith('_')}
                return result
            except Exception as exc:
                logger.error("Orchestrator.decide failed: %s", exc)
        return max(proposed, key=lambda a: a.get("confidence", 0)) if proposed \
               else self._fallback_action("", "", mastery)

    def _render(
        self,
        action: Dict[str, Any],
        query: str, node_id: str,
        mastery: float, hint_level: int,
        brain_match: Optional[Dict[str, Any]] = None,
    ):
        text         = action.get("text", "")
        action_type  = action.get("action_type", "question")
        rule_used    = action.get("rule_used", "default")
        agent_used   = action.get("agent", "unknown")
        claude_called = False
        tokens_used   = 0

        if self._claude and hasattr(self._claude, "render"):
            try:
                # ClaudeRenderer.render(agent_action, student_state, teaching_context, language)
                # Include tutor brain context so Claude can use node-specific patterns
                teaching_ctx = {"concept_title": node_id, "query": query, "hint_level": hint_level}
                if brain_match:
                    teaching_ctx["tutor_brain_patterns"] = brain_match.get("matched_patterns", [])
                    teaching_ctx["tutor_brain_misconceptions"] = brain_match.get("matched_misconceptions", [])
                    teaching_ctx["recommended_flow"] = brain_match.get("recommended_flow", [])
                rendered = self._claude.render(
                    agent_action=action,
                    student_state={"mastery_bucket": "low" if mastery < 0.4 else "developing" if mastery < 0.7 else "high"},
                    teaching_context=teaching_ctx,
                )
                if isinstance(rendered, dict):
                    rendered_text = rendered.get("text", text)
                    tokens_used = rendered.get("tokens_used", 0)
                    # Detect invalid API key response — don't use it
                    if "Invalid API key" not in rendered_text:
                        text = rendered_text
                        claude_called = True
                elif isinstance(rendered, str) and rendered.strip():
                    # Detect invalid API key response — don't use it
                    if "Invalid API key" not in rendered:
                        text = rendered
                        claude_called = True
            except Exception as exc:
                logger.error("ClaudeRenderer.render failed: %s", exc)

        # Use tutor brain to enrich/override when it has more specific data
        if brain_match:
            mcs = brain_match.get("matched_misconceptions", [])
            patterns = brain_match.get("matched_patterns", [])
            # Misconceptions override everything — most specific response
            if mcs:
                text = mcs[0].get("why_wrong", text)
                action_type = "correction"
                rule_used = "tutor_brain:misconception"
            # Emotional triggers override generic agent text
            elif brain_match.get("emotional_triggered"):
                text = "I understand this can feel challenging. Let's take it one step at a time — what part feels most confusing?"
                action_type = "encouragement"
                rule_used = "tutor_brain:emotional_support"
            # If agent text is empty/generic, use pattern-based response
            elif not text.strip() and patterns:
                best_pat = max(patterns, key=lambda p: p.get("confidence", 0))
                template_id = best_pat.get("template_id", "")
                intent = best_pat.get("intent", "question")
                if intent == "frustration":
                    text = "I understand this can feel challenging. Let's take it one step at a time — what part feels most confusing?"
                    action_type = "encouragement"
                else:
                    text = "Let's explore this together. Think about what you already know about this topic."
                    action_type = _INTENT_TO_ACTION.get(intent, "question")
                rule_used = f"tutor_brain:{template_id}"

        # Final fallback to templates if still empty
        if not text.strip():
            text = _TMPL_CONTEXT if mastery < 0.4 else _TMPL_HINT
            rule_used = "default_template"

        return text, action_type, rule_used, agent_used, claude_called, tokens_used

    def _strip_answer_leak(self, text: str, mastery: float):
        """Return (sanitized_text, fallback_triggered)."""
        if mastery >= 0.7:
            return text, False
        if _ANSWER_RE.search(text):
            tpl = _TMPL_CONTEXT if mastery < 0.4 else _TMPL_HINT
            return tpl, True
        return text, False

    @staticmethod
    def _pcr_tier(mastery: float) -> int:
        """Return hint level 1-3 from mastery."""
        if mastery < 0.4:
            return 1          # context only
        if mastery < 0.7:
            return 2          # hints / partial
        return 3              # full Socratic

    @staticmethod
    def _update_mastery(
        mastery_before: float, action: Dict[str, Any], query: str,
    ) -> float:
        nudge = {
            "question":    0.01,
            "hint":        0.03,
            "scaffold":    0.05,
            "confirmation":0.02,
            "correction":  -0.05,
        }.get(action.get("action_type", ""), 0.0)

        if len(query.strip()) > 200:
            nudge -= 0.02

        return round(max(0.0, min(1.0, mastery_before + nudge)), 4)

    @staticmethod
    def _extract_misconceptions(
        action: Dict[str, Any], history: List[Dict[str, Any]],
    ) -> List[str]:
        mcs = action.get("misconceptions", [])
        if isinstance(mcs, list):
            return [str(m) for m in mcs]
        detected: List[str] = []
        for entry in history[-3:]:
            mc = entry.get("misconception")
            if mc:
                detected.append(str(mc))
        return detected

    def _log_interaction(self, **kwargs: Any) -> None:
        if self._capture and hasattr(self._capture, "capture"):
            try:
                sid = str(kwargs.get("student_id", "unknown"))
                self._capture.capture(
                    student_id=sid,
                    session_id=str(kwargs.get("session_id", sid)),
                    subject=str(kwargs.get("subject", "general")),
                    concept=str(kwargs.get("concept",
                                           kwargs.get("node_id", ""))),
                    grade_level=int(kwargs.get("grade_level", 0) or 0),
                    interaction_type=str(kwargs.get("interaction_type",
                                                    "tutor_turn")),
                    **{k: v for k, v in kwargs.items()
                       if k not in {"student_id", "session_id", "subject",
                                    "concept", "grade_level",
                                    "interaction_type"}},
                )
            except Exception as exc:
                logger.debug("InteractionCapture.capture failed: %s", exc)

    # ── batch helper ──────────────────────────────────────────────────────

    def process_batch(
        self, interactions: List[Dict[str, Any]],
    ) -> List[Dict[str, Any]]:
        results: List[Dict[str, Any]] = []
        for spec in interactions:
            try:
                r = self.process_interaction(
                    student_id=spec["student_id"],
                    query=spec["query"],
                    node_id=spec["node_id"],
                    mastery_map=spec["mastery_map"],
                    interaction_history=spec.get("interaction_history", []),
                    language=spec.get("language", "en"),
                )
            except Exception as exc:
                logger.error("process_interaction batch item failed: %s", exc)
                r = {
                    "text": _TMPL_CONTEXT,
                    "action_type": "fallback",
                    "agent_used": "pipeline",
                    "rule_used": "batch_error",
                    "mastery_before": 0.0,
                    "mastery_after": 0.0,
                    "misconceptions_addressed": [],
                    "hint_level": 1,
                    "confidence_nudge": 0.0,
                    "latency_ms": 0.0,
                    "claude_called": False,
                    "tokens_used": 0,
                }
            results.append(r)
        return results

    # ── observability ─────────────────────────────────────────────────────

    def health_check(self) -> Dict[str, bool]:
        return {
            "state_4d_builder":         self._state4d is not None,
            "concept_graph_traverser":  self._traverser is not None,
            "specialized_agents":       self._agents is not None,
            "deterministic_orchestrator": self._orchestrator is not None,
            "claude_renderer":          self._claude is not None,
            "interaction_capture":      self._capture is not None,
        }