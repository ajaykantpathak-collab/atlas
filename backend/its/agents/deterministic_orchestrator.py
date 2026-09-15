from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any


# ------------------------------------------------------------------ #
#  Data classes                                                       #
# ------------------------------------------------------------------ #

@dataclass
class AgentAction:
    """A concrete action produced by the orchestrator for execution.

    The first four fields are the classic decision payload. The remaining
    fields are the *render surface*: ``SocraticPipelineV3._render`` and the
    LLM renderers read them straight off ``action.__dict__`` / via
    ``action.get(...)`` on the dict produced from it, so the winning
    proposal's text/agent/confidence survive arbitration end to end.
    """
    agent_name: str
    action_type: str
    parameters: dict[str, Any] = field(default_factory=dict)
    reasoning: str = ""
    # -- render surface (kept in sync with agent_name by the builder) --
    agent: str = ""
    text: str = ""
    rule_used: str = ""
    confidence: float = 0.0
    misconceptions: list[str] = field(default_factory=list)
    content_payload: dict[str, Any] = field(default_factory=dict)


@dataclass
class OrchestratorRule:
    """A single routing rule in the deterministic decision engine."""
    rule_name: str
    condition: dict[str, Any]
    action: dict[str, Any]
    priority: int
    is_active: bool = True
    source: str = "default"
    _effectiveness_scores: list[float] = field(default_factory=list, repr=False, compare=False)

    # -- effectiveness helpers -----------------------------------------

    @property
    def avg_effectiveness(self) -> float | None:
        if not self._effectiveness_scores:
            return None
        return sum(self._effectiveness_scores) / len(self._effectiveness_scores)

    @property
    def invocation_count(self) -> int:
        return len(self._effectiveness_scores)

    def record_outcome(self, score: float) -> None:
        """Append an outcome score (0.0–1.0) from a recent invocation."""
        self._effectiveness_scores.append(score)


# ------------------------------------------------------------------ #
#  Rule → proposal-score adjustments                                  #
# ------------------------------------------------------------------ #
#
# When a rule matches, its adjustments are applied to every proposal's
# score before arbitration. Matching is by action-type *fragment*
# (substring), so "scaffold" also hits "scaffold_level_2".
#
#   block    — hard-blocked fragments (score 0 → ineligible)
#   penalize — fragment → multiplicative factor (<1 discourages)
#   boost    — fragments whose presence multiplies the score by 1.5

_RULE_ADJUSTMENTS: dict[str, dict[str, Any]] = {
    # Ethics-first: no hint-like help until the student has attempted.
    "ethics_first": {
        "block": ("hint", "scaffold", "assess", "feedback"),
    },
    # Hint cap reached: discourage further hinting, favour redirects.
    "hint_cap": {
        "penalize": {"hint": 0.3, "scaffold": 0.6},
        "boost": ("redirect", "prerequisite", "prereq", "review"),
    },
    # Prerequisite mastery gap: favour prerequisite redirects / scaffolds.
    "prerequisite_gap": {
        "boost": ("redirect", "prerequisite", "prereq", "review", "scaffold"),
        "penalize": {"assess": 0.5},
    },
    # High frustration: favour empathetic support, block challenge/assess.
    "high_frustration": {
        "boost": ("motivate", "encourage", "empathy", "feedback"),
        "penalize": {"assess": 0.4, "challenge": 0.3},
    },
    # Boredom: favour harder material.
    "boredom_detected": {
        "boost": ("challenge", "assess"),
    },
}


# ------------------------------------------------------------------ #
#  Orchestrator                                                       #
# ------------------------------------------------------------------ #

class DeterministicOrchestrator:
    """Rules-based decision engine for ES-LLMs tutoring architecture.

    * Fully deterministic — no LLM calls during routing.
    * Rules are stored as OrchestratorRule instances.
    * The Meta-Brain can add / deactivate / score rules nightly.
    * First matching rule wins (subsumption-architecture ordering).
    """

    def __init__(self) -> None:
        self._rules: dict[str, OrchestratorRule] = {}
        self._load_default_rules()

    # ================================================================ #
    #  Rule management                                                  #
    # ================================================================ #

    def add_rule(self, rule: OrchestratorRule) -> None:
        """Add or replace a rule (typically pushed by the Meta-Brain)."""
        self._rules[rule.rule_name] = rule

    def deactivate_rule(self, rule_name: str) -> None:
        """Disable a rule by name. Silently ignored if the rule is absent."""
        if rule_name in self._rules:
            self._rules[rule_name].is_active = False

    def activate_rule(self, rule_name: str) -> None:
        """Re-enable a previously disabled rule."""
        if rule_name in self._rules:
            self._rules[rule_name].is_active = True

    def get_rule(self, rule_name: str) -> OrchestratorRule | None:
        return self._rules.get(rule_name)

    def get_active_rules(self) -> list[OrchestratorRule]:
        """Return active rules sorted by priority (ascending = highest first)."""
        return sorted(
            (r for r in self._rules.values() if r.is_active),
            key=lambda r: r.priority,
        )

    def get_all_rules(self) -> list[OrchestratorRule]:
        """Return every rule (active or not), sorted by priority."""
        return sorted(self._rules.values(), key=lambda r: r.priority)

    # ================================================================ #
    #  Effectiveness tracking                                           #
    # ================================================================ #

    def update_rule_effectiveness(self, rule_name: str, outcome_score: float) -> None:
        """Record an outcome score (0.0–1.0) for a specific rule.

        Used by the Meta-Brain to measure rule quality and decide
        which rules to keep, modify, or retire during its nightly pass.
        """
        if rule_name in self._rules:
            self._rules[rule_name].record_outcome(outcome_score)

    def rule_effectiveness_report(self) -> dict[str, dict]:
        """Return a summary of every rule's effectiveness statistics."""
        report: dict[str, dict] = {}
        for name, rule in sorted(self._rules.items()):
            report[name] = {
                "priority": rule.priority,
                "is_active": rule.is_active,
                "source": rule.source,
                "invocations": rule.invocation_count,
                "avg_effectiveness": rule.avg_effectiveness,
            }
        return report

    # ================================================================ #
    #  Core decision logic                                              #
    # ================================================================ #

    def decide(
        self,
        student_state: dict[str, Any],
        teaching_context: dict[str, Any] | None = None,
        interaction_history: list | None = None,
        proposed_actions: list | None = None,
    ) -> AgentAction:
        """Arbitrate the specialised agents' proposals under the active rules.

        Evaluation order
        ----------------
        1. Fetch all *active* rules and sort by ``priority`` (lower number
           → higher priority).
        2. Walk the sorted list; the **first** rule whose condition matches
           wins (subsumption-architecture semantics). If no rule matches,
           fall back to ``default_tutor``.
        3. Normalise every entry in ``proposed_actions`` (dicts, the
           ``specialized_agents.AgentAction`` dataclass, or contract-style
           ``to_dict()`` objects) and score it deterministically:
           ``0.6 * priority_score + 0.4 * confidence`` where
           ``priority_score = (999 - priority) / 998`` (agent priority on the
           ensemble is lower-wins). Ties keep the earliest proposal.
        4. Apply the winning rule's *adjustments* to each score — hint caps
           penalise hint/scaffold proposals, prerequisite redirects boost
           them, high frustration boosts empathetic actions and blocks
           assessments/challenges, and the ethics-first rule hard-blocks any
           hint-like action until the student has made a first attempt.
           Blocked proposals are ineligible; if every proposal is blocked the
           rule's own action is returned instead.
        5. Return the winning proposal as an ``AgentAction`` enriched with
           the matched rule's parameters (messages, ``reduce_difficulty``,
           hint caps, …). With no proposals at all the behaviour is identical
           to the classic first-match-wins rule action.

        Deterministic throughout: no LLM calls, no randomness — same inputs
        always yield the same ``AgentAction``.
        """
        teaching_context = teaching_context or {}
        interaction_history = interaction_history or []
        proposals = list(proposed_actions or [])

        # -- 1/2. first matching active rule (existing semantics) --------
        matched_rule: OrchestratorRule | None = None
        for rule in self.get_active_rules():
            if self.evaluate_condition(rule.condition, student_state, teaching_context):
                matched_rule = rule
                break
        if matched_rule is None:
            matched_rule = self._rules.get("default_tutor")
            if not (matched_rule and matched_rule.is_active):
                raise RuntimeError(
                    "No rule matched and no fallback ('default_tutor') is configured."
                )

        # -- 3/4. arbitrate the ensemble's proposals ---------------------
        adjustments = _RULE_ADJUSTMENTS.get(matched_rule.rule_name, {})
        winner = self._arbitrate(proposals, adjustments)

        # -- 5. build the enriched action --------------------------------
        if winner is not None:
            return self._action_from_proposal(winner, matched_rule)
        # Every proposal was blocked (or there were none) → rule action.
        return self._build_action(matched_rule)

    # -- arbitration internals ------------------------------------------

    @staticmethod
    def _normalize_proposal(proposal: Any) -> dict[str, Any] | None:
        """Coerce a proposal of any supported shape into a plain dict.

        Supported: dicts, objects exposing ``to_dict()``, and dataclass-like
        objects (``specialized_agents.AgentAction``). Returns ``None`` for
        anything unusable.
        """
        if isinstance(proposal, dict):
            out: dict[str, Any] = dict(proposal)
        elif hasattr(proposal, "to_dict") and callable(proposal.to_dict):
            try:
                raw = proposal.to_dict()
                out = dict(raw) if isinstance(raw, dict) else {}
            except Exception:
                out = {}
        elif hasattr(proposal, "__dict__"):
            out = {
                k: v for k, v in vars(proposal).items()
                if not k.startswith("_")
            }
        else:
            return None

        # Normalise enum values (e.g. contracts.ActionType) to plain strings.
        for key in ("action_type",):
            if isinstance(out.get(key), Enum):
                out[key] = out[key].value
        # Unify the agent identity key.
        if "agent" not in out:
            out["agent"] = out.get("agent_name", "")
        return out

    @staticmethod
    def _proposal_text(proposal: dict[str, Any]) -> str:
        """Best-effort natural-language payload from a normalised proposal."""
        for key in ("text", "message"):
            value = proposal.get(key)
            if isinstance(value, str) and value.strip():
                return value
        payload = proposal.get("content_payload") or proposal.get("payload") or {}
        if isinstance(payload, dict):
            for key in ("text", "message", "hint", "question", "feedback"):
                value = payload.get(key)
                if isinstance(value, str) and value.strip():
                    return value
        return ""

    def _proposal_score(
        self,
        proposal: dict[str, Any],
        adjustments: dict[str, Any],
    ) -> float:
        """Deterministically score one normalised proposal in [0, 1].

        ``0.6 * priority_score + 0.4 * confidence`` followed by the matched
        rule's adjustments (block / penalise / boost by action-type fragment).
        """
        try:
            priority = float(proposal.get("priority", 999))
        except (TypeError, ValueError):
            priority = 999.0
        priority_score = max(0.0, min(1.0, (999.0 - max(0.0, priority)) / 998.0))

        confidence = proposal.get("confidence")
        if confidence is None:
            confidence = proposal.get("effectiveness", 0.5)
        try:
            confidence = float(confidence)
        except (TypeError, ValueError):
            confidence = 0.5
        confidence = max(0.0, min(1.0, confidence))

        score = 0.6 * priority_score + 0.4 * confidence

        action_type = str(proposal.get("action_type", "")).lower()

        for fragment in adjustments.get("block", ()):
            if fragment in action_type:
                return 0.0  # hard block (e.g. ethics-first hint gating)

        for fragment, factor in adjustments.get("penalize", {}).items():
            if fragment in action_type:
                score *= float(factor)

        if any(f in action_type for f in adjustments.get("boost", ())):
            score = min(1.0, score * 1.5)

        return max(0.0, score)

    def _arbitrate(
        self,
        proposals: list,
        adjustments: dict[str, Any],
    ) -> dict[str, Any] | None:
        """Return the highest-scoring *eligible* proposal, or ``None``.

        Stable tie-break: the earliest proposal in the list wins, so the
        result is deterministic for a given ensemble ordering. Gate
        proposals (EthicsBot's pass-through ``allow``, failed agents'
        ``none``) never win — they are signals, not tutoring content.
        """
        gate_types = {"allow", "none"}
        best: dict[str, Any] | None = None
        best_score = 0.0
        for raw in proposals:
            proposal = self._normalize_proposal(raw)
            if proposal is None:
                continue
            if proposal.get("skip"):
                continue
            if str(proposal.get("action_type", "")).lower() in gate_types:
                continue
            score = self._proposal_score(proposal, adjustments)
            if score > best_score:
                best, best_score = proposal, score
        return best

    def _action_from_proposal(
        self,
        proposal: dict[str, Any],
        rule: OrchestratorRule,
    ) -> AgentAction:
        """Map the winning proposal onto an ``AgentAction`` enriched with
        the matched rule's adjustments (parameters merged, message kept)."""
        payload = proposal.get("content_payload") or proposal.get("payload") or {}
        params: dict[str, Any] = dict(payload) if isinstance(payload, dict) else {}

        # Surface scalar proposal content for the renderers.
        text = self._proposal_text(proposal)
        for key, value in (("text", text), ("misconceptions", proposal.get("misconceptions"))):
            if value and key not in params:
                params[key] = value

        # Enrich with the matched rule's parameters (rule messages,
        # reduce_difficulty, hint caps, …) without clobbering the proposal.
        rule_params = rule.action.get("parameters") or {}
        for key, value in rule_params.items():
            params.setdefault(key, value)
        params.setdefault("rule", rule.rule_name)

        agent_name = str(proposal.get("agent") or proposal.get("agent_name")
                         or rule.action.get("agent_name", "TutorBot"))
        action_type = str(proposal.get("action_type")
                          or rule.action.get("action_type", "text_explanation"))
        try:
            confidence = float(proposal.get("confidence",
                                            proposal.get("effectiveness", 0.0)))
        except (TypeError, ValueError):
            confidence = 0.0
        misconceptions = proposal.get("misconceptions")
        misconceptions = [str(m) for m in misconceptions] if isinstance(misconceptions, list) else []

        return AgentAction(
            agent_name=agent_name,
            action_type=action_type,
            parameters=params,
            reasoning=(
                f"Arbitrated winning proposal from '{agent_name}' "
                f"({action_type}) under rule '{rule.rule_name}' "
                f"(priority={rule.priority}, source={rule.source})"
            ),
            agent=agent_name,
            text=text,
            rule_used=rule.rule_name,
            confidence=max(0.0, min(1.0, confidence)),
            misconceptions=misconceptions,
            content_payload=params,
        )

    # ================================================================ #
    #  Condition evaluation                                             #
    # ================================================================ #

    def evaluate_condition(
        self,
        condition: dict[str, Any],
        student_state: dict[str, Any],
        teaching_context: dict[str, Any] | None = None,
    ) -> bool:
        """Recursively evaluate a condition dict against the current state.

        Supported operators
        -------------------
        ``<``, ``>``, ``<=``, ``>=``, ``==``, ``!=``
            Compare ``field`` from state against ``value``.
        ``in``, ``not_in``
            Membership test (``value`` must be a list / set / tuple).
        ``and``, ``or``
            Compound: ``conditions`` is a list of sub-condition dicts.
        ``any``
            ``field`` must be iterable; each element is tested against the
            sub-condition in ``check`` (defaults to ``< value``).
        """
        operator = condition.get("operator", "")

        # -- Compound --------------------------------------------------
        if operator in ("and", "or"):
            sub_conditions: list[dict] = condition.get("conditions", [])
            if not sub_conditions:
                return operator == "and"   # vacuous truth / false
            results = [
                self.evaluate_condition(c, student_state, teaching_context)
                for c in sub_conditions
            ]
            return all(results) if operator == "and" else any(results)

        # -- Simple / unary --------------------------------------------
        field_name: str = condition.get("field", "")
        field_value = self._resolve_field(field_name, student_state, teaching_context)
        target_value = condition.get("value")

        if operator == "<":
            return field_value is not None and field_value < target_value  # type: ignore[operator]
        if operator == ">":
            return field_value is not None and field_value > target_value  # type: ignore[operator]
        if operator == "<=":
            return field_value is not None and field_value <= target_value  # type: ignore[operator]
        if operator == ">=":
            return field_value is not None and field_value >= target_value  # type: ignore[operator]
        if operator == "==":
            return field_value == target_value
        if operator == "!=":
            return field_value != target_value
        if operator == "in":
            if isinstance(target_value, (list, tuple, set)):
                return field_value in target_value
            return False
        if operator == "not_in":
            if isinstance(target_value, (list, tuple, set)):
                return field_value not in target_value
            return True
        if operator == "any":
            check_cond: dict = condition.get("check", {"operator": "<", "value": target_value})
            if not isinstance(field_value, (list, tuple)):
                return False
            return any(
                self.evaluate_condition(check_cond, {field_name: v}, teaching_context)
                for v in field_value
            )

        # Unknown operator → no match
        return False

    # ================================================================ #
    #  Private helpers                                                  #
    # ================================================================ #

    @staticmethod
    def _resolve_field(
        field_name: str,
        student_state: dict[str, Any],
        teaching_context: dict[str, Any] | None = None,
    ) -> Any:
        """Look up a field, preferring *teaching_context* over *student_state*."""
        if teaching_context and field_name in teaching_context:
            return teaching_context[field_name]
        return student_state.get(field_name)

    def _build_action(self, rule: OrchestratorRule) -> AgentAction:
        action = rule.action
        params = dict(action.get("parameters", {}))
        agent_name = action.get("agent_name", "TutorBot")
        text = str(params.get("message", ""))
        return AgentAction(
            agent_name=agent_name,
            action_type=action.get("action_type", "text_explanation"),
            parameters=params,
            reasoning=(
                f"Matched rule '{rule.rule_name}' "
                f"(priority={rule.priority}, source={rule.source})"
            ),
            agent=agent_name,
            text=text,
            rule_used=rule.rule_name,
            confidence=1.0,
            misconceptions=[],
            content_payload=dict(params),
        )

    # ================================================================ #
    #  Default rule set  (refined nightly by the Meta-Brain)            #
    # ================================================================ #

    def _load_default_rules(self) -> None:
        """Initialise the hard-coded rule set shipped with the orchestrator."""
        default_specs: list[tuple[str, dict, dict, int, str]] = [
            # ── 1. Ethics-first: block hints until first attempt ────────
            (
                "ethics_first",
                {
                    "operator": "and",
                    "conditions": [
                        {"field": "not_attempted", "operator": "==", "value": True},
                    ],
                },
                {
                    "agent_name": "GuardBot",
                    "action_type": "block_hints",
                    "parameters": {
                        "message": "Please make your first attempt before requesting a hint.",
                    },
                },
                10,
                "default",
            ),
            # ── 2. Hint cap ────────────────────────────────────────────
            (
                "hint_cap",
                {"field": "hints_used", "operator": ">=", "value": 3},
                {
                    "agent_name": "PrereqBot",
                    "action_type": "redirect_prerequisite",
                    "parameters": {
                        "message": "Hint limit reached. Let's review the prerequisites.",
                    },
                },
                15,
                "default",
            ),
            # ── 3. Prerequisite mastery gap ────────────────────────────
            (
                "prerequisite_gap",
                {
                    "operator": "any",
                    "field": "prerequisite_masteries",
                    "check": {"operator": "<", "value": 0.4},
                },
                {
                    "agent_name": "PrereqBot",
                    "action_type": "redirect_prerequisite",
                    "parameters": {
                        "message": "We need to strengthen your foundation first.",
                    },
                },
                20,
                "default",
            ),
            # ── 4. High frustration ────────────────────────────────────
            (
                "high_frustration",
                {"field": "frustration_level", "operator": ">", "value": 0.7},
                {
                    "agent_name": "EmpathyBot",
                    "action_type": "empathy_and_support",
                    "parameters": {
                        "reduce_difficulty": True,
                        "message": "Take a breath — this is tricky, and that's okay.",
                    },
                },
                25,
                "default",
            ),
            # ── 5. Boredom detected ────────────────────────────────────
            (
                "boredom_detected",
                {"field": "boredom_level", "operator": ">", "value": 0.6},
                {
                    "agent_name": "ChallengeBot",
                    "action_type": "increase_challenge",
                    "parameters": {
                        "message": "Ready for something harder? Let's go.",
                    },
                },
                30,
                "default",
            ),
            # ── 6. Overconfident but wrong ─────────────────────────────
            (
                "overconfident_wrong",
                {
                    "operator": "and",
                    "conditions": [
                        {"field": "confidence", "operator": ">", "value": 0.7},
                        {"field": "is_correct", "operator": "==", "value": False},
                    ],
                },
                {
                    "agent_name": "MisconceptionBot",
                    "action_type": "address_misconception",
                    "parameters": {
                        "style": "direct",
                        "message": "Let's look closely at why this answer is off.",
                    },
                },
                35,
                "default",
            ),
            # ── 7. Low mastery + repeated failures ─────────────────────
            (
                "low_mastery_2_failures",
                {
                    "operator": "and",
                    "conditions": [
                        {"field": "mastery", "operator": "<", "value": 0.4},
                        {"field": "failures", "operator": ">=", "value": 2},
                    ],
                },
                {
                    "agent_name": "ScaffoldBot",
                    "action_type": "scaffold_level_2",
                    "parameters": {
                        "level": 2,
                        "message": "Let's try a more guided approach.",
                    },
                },
                40,
                "default",
            ),
            # ── 8. Late-night session + low mastery ────────────────────
            (
                "late_night_support",
                {
                    "operator": "and",
                    "conditions": [
                        {"field": "hour", "operator": ">", "value": 20},
                        {"field": "mastery", "operator": "<", "value": 0.3},
                    ],
                },
                {
                    "agent_name": "TutorBot",
                    "action_type": "increase_scaffolding",
                    "parameters": {
                        "extra_support": True,
                        "message": "It's late — I'll break this into smaller steps.",
                    },
                },
                45,
                "default",
            ),
            # ── 9. Medium mastery → application question ───────────────
            (
                "medium_mastery",
                {
                    "operator": "and",
                    "conditions": [
                        {"field": "mastery", "operator": ">=", "value": 0.4},
                        {"field": "mastery", "operator": "<", "value": 0.7},
                    ],
                },
                {
                    "agent_name": "AssessmentBot",
                    "action_type": "application_question",
                    "parameters": {
                        "message": "You're making progress. Let's apply what you know.",
                    },
                },
                50,
                "default",
            ),
            # ── 10. High mastery → synthesis challenge ─────────────────
            (
                "high_mastery",
                {"field": "mastery", "operator": ">=", "value": 0.7},
                {
                    "agent_name": "ChallengeBot",
                    "action_type": "synthesis_question",
                    "parameters": {
                        "message": "Impressive! Let's push into deeper territory.",
                    },
                },
                60,
                "default",
            ),
            # ── 11. Fallback (always matches) ──────────────────────────
            (
                "default_tutor",
                {"operator": "and", "conditions": []},
                {
                    "agent_name": "TutorBot",
                    "action_type": "text_explanation",
                    "parameters": {
                        "message": "Let me explain this concept step by step.",
                    },
                },
                100,
                "default",
            ),
        ]

        for name, condition, action, priority, source in default_specs:
            self._rules[name] = OrchestratorRule(
                rule_name=name,
                condition=condition,
                action=action,
                priority=priority,
                is_active=True,
                source=source,
            )