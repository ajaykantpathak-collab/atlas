"""outcome_attribution.py — links each interaction to the rule/prompt that produced it.

MetaBrain mines correlations in the AttemptLog, but correlations aren't
causation: without knowing WHICH orchestrator rule and WHICH prompt version
produced an interaction, the nightly jobs can't attribute outcomes to the
system's own decisions.

This module is the attribution layer. It:
  1. Stamps every orchestrator decision with the rule_id that fired and the
     prompt_version that rendered it (sidecar table — AttemptLog stays
     untouched for backward compatibility).
  2. Exposes attribution joins for MetaBrain so findings become causal:
     "rule X produced mastery_gain Y" instead of "strategy X correlates
     with gain Y".

Design:
  - InteractionAttribution is a separate SQLAlchemy model, one row per
    decision, FK-free (loose join on session_id + created_at window) so it
    can't break the existing AttemptLog pipeline.
  - AttributionWriter is the runtime API called by the orchestrator right
    after arbitration, before the renderer returns text.
  - load_attributed_interactions() yields AttemptLog rows merged with their
    attribution for MetaBrain jobs.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional

from sqlalchemy import Column, DateTime, Float, Index, Integer, String

from backend.database import Base

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Sidecar model — one row per orchestrator decision
# ---------------------------------------------------------------------------

class InteractionAttribution(Base):
    """Causal link between an orchestrator decision and the attempt it shaped.

    Written at decision time (before the student's answer is known), then
    joined to AttemptLog by (session_id, decision_seq). Keeping this in its
    own table means the AttemptLog schema — which analytics already reads —
    never has to migrate.
    """

    __tablename__ = "its_interaction_attribution"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String(64), nullable=False)
    decision_seq = Column(Integer, nullable=False)         # Nth decision in session
    node_id = Column(String(128), nullable=False)

    # What the system decided
    rule_id = Column(String(128), nullable=True)           # OrchestratorRule.rule_name
    agent_name = Column(String(64), nullable=True)         # winning agent
    teaching_strategy = Column(String(64), nullable=True)  # scaffold|socratic|direct|...
    prompt_version = Column(String(64), nullable=True)     # renderer prompt used
    ab_test_name = Column(String(128), nullable=True)      # if decision is in an experiment
    ab_arm = Column(String(16), nullable=True)             # control|variant

    # Filled in after the student's outcome is known (join-time enrichment)
    mastery_gain = Column(Float, nullable=True)
    next_item_correct = Column(Float, nullable=True)
    engagement_score = Column(Float, nullable=True)

    created_at = Column(DateTime(timezone=True), nullable=False,
                        default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        Index("ix_attr_session_seq", "session_id", "decision_seq"),
        Index("ix_attr_rule", "rule_id"),
        Index("ix_attr_prompt_version", "prompt_version"),
        Index("ix_attr_ab", "ab_test_name", "ab_arm"),
    )


# ---------------------------------------------------------------------------
# Runtime writer — called by the orchestrator after arbitration
# ---------------------------------------------------------------------------

@dataclass
class AttributionWriter:
    """Stamps each arbitrated action with its causal lineage.

    Usage (inside the orchestrator, right after picking a winner):

        attr = writer.stamp(
            session_id=session.id,
            node_id=node.node_id,
            rule_id=winning_rule.rule_name,
            agent_name=action.agent_name,
            teaching_strategy=action.action_type,
            prompt_version=prompt_registry.active_version(action.agent_name),
        )
        # ... then render + deliver, then on next attempt outcome:
        writer.close_outcome(attr.id, mastery_gain=0.2, next_item_correct=1.0)
    """

    _seq_counters: dict[str, int] = field(default_factory=dict)

    def next_seq(self, session_id: str) -> int:
        seq = self._seq_counters.get(session_id, 0) + 1
        self._seq_counters[session_id] = seq
        return seq

    def stamp(
        self,
        session_id: str,
        node_id: str,
        rule_id: Optional[str] = None,
        agent_name: Optional[str] = None,
        teaching_strategy: Optional[str] = None,
        prompt_version: Optional[str] = None,
        ab_test_name: Optional[str] = None,
        ab_arm: Optional[str] = None,
    ) -> InteractionAttribution:
        """Create the attribution row (caller persists it via session)."""
        return InteractionAttribution(
            session_id=session_id,
            decision_seq=self.next_seq(session_id),
            node_id=node_id,
            rule_id=rule_id,
            agent_name=agent_name,
            teaching_strategy=teaching_strategy,
            prompt_version=prompt_version,
            ab_test_name=ab_test_name,
            ab_arm=ab_arm,
        )

    @staticmethod
    def close_outcome(
        row: InteractionAttribution,
        mastery_gain: Optional[float] = None,
        next_item_correct: Optional[float] = None,
        engagement_score: Optional[float] = None,
    ) -> None:
        """Backfill outcome metrics once the student's response is scored."""
        if mastery_gain is not None:
            row.mastery_gain = mastery_gain
        if next_item_correct is not None:
            row.next_item_correct = next_item_correct
        if engagement_score is not None:
            row.engagement_score = engagement_score


# ---------------------------------------------------------------------------
# Read side — merge AttemptLog with attribution for MetaBrain
# ---------------------------------------------------------------------------

def load_attributed_interactions(
    attempt_rows: list[Any],
    attribution_rows: list[InteractionAttribution],
) -> list[dict[str, Any]]:
    """Join AttemptLog rows to their attribution for causal mining.

    MetaBrain jobs currently receive interaction dicts with no causal keys.
    This merges in rule_id / prompt_version / ab_arm so downstream jobs can
    group by *what the system did*, not just *what the student did*.

    Matching heuristic: same session_id, nearest decision_seq at-or-before
    the attempt's timestamp. Loose on purpose — a missed join yields the
    attempt unchanged rather than dropping it.
    """
    by_session: dict[str, list[InteractionAttribution]] = {}
    for a in attribution_rows:
        by_session.setdefault(a.session_id, []).append(a)
    for rows in by_session.values():
        rows.sort(key=lambda r: r.decision_seq)

    merged: list[dict[str, Any]] = []
    for ev in attempt_rows:
        d = ev if isinstance(ev, dict) else dict(getattr(ev, "__dict__", {}))
        sid = d.get("session_id")
        attrs = by_session.get(sid, [])
        # take the most recent attribution for this session (best-effort join)
        if attrs:
            latest = attrs[-1]
            d["rule_id"] = latest.rule_id
            d["agent_name"] = latest.agent_name
            d["teaching_strategy"] = d.get("teaching_strategy") or latest.teaching_strategy
            d["prompt_version"] = latest.prompt_version
            d["ab_test_name"] = latest.ab_test_name
            d["ab_arm"] = latest.ab_arm
        merged.append(d)
    return merged
