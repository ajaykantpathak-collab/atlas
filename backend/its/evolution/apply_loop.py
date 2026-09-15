"""apply_loop.py — turns MetaBrain reports into live orchestrator changes.

MetaBrain (its/agents/meta_brain.py) is intentionally read-only: it mines
AttemptLog and returns a MetaBrainReport full of recommendations. Nothing
consumes that report today — this module is the consumer.

The apply loop runs after MetaBrain's nightly jobs and, for each finding
class, performs a gated write:

    proposed_rules        -> OrchestratorRule rows (is_active=False,
                             source="metabrain") + an ABTest via
                             services/rule_ab_tester.py
    novel_misconceptions  -> handed to misconception_writer for LLM
                             classification before catalog insert
    flagged_concepts      -> content-gap queue for regeneration
    calibration_updates   -> ConfidenceCalibration rows per student

Safety gates (non-negotiable):
  * MAX_RULES_PER_NIGHT cap so a bad mining night can't flood the rules table
  * Rules go in is_active=False + enrolled in an ABTest — never directly live
  * MIN_T_STAT re-checked here even though MetaBrain already filtered
  * Every write is logged to _cache/apply_loop_log.json for audit/rollback
"""

from __future__ import annotations

import json
import logging
import os
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional

logger = logging.getLogger(__name__)

_CACHE_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "_cache")
_APPLY_LOG = os.path.join(_CACHE_DIR, "apply_loop_log.json")

# Gates — deliberately conservative; loosen only after the loop proves itself
MAX_RULES_PER_NIGHT = 10
MIN_T_STAT = 1.96            # Welch t threshold, same as MetaBrain uses
MIN_IMPROVEMENT_RATIO = 1.05 # winner must beat loser by >=5%


# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------

@dataclass
class ApplyAction:
    """One concrete mutation the apply loop decided to make."""
    action_type: str          # create_rule | enroll_ab | flag_content | update_calibration
    payload: dict[str, Any]
    reason: str
    applied: bool = False
    blocked_reason: str = ""


@dataclass
class ApplyResult:
    actions: list[ApplyAction] = field(default_factory=list)
    report_id: str = ""
    applied_count: int = 0
    blocked_count: int = 0

    def summary(self) -> str:
        return (f"ApplyLoop {self.report_id}: {self.applied_count} applied, "
                f"{self.blocked_count} blocked, {len(self.actions)} total actions")


# ---------------------------------------------------------------------------
# Core loop
# ---------------------------------------------------------------------------

class ApplyLoop:
    """Consumes a MetaBrainReport and emits gated write actions.

    The loop does NOT talk to the DB itself — it returns ApplyAction objects.
    The caller (a nightly task runner) executes them inside a transaction.
    This keeps the loop pure, testable, and impossible to half-apply.
    """

    def __init__(self, ab_tester: Any = None):
        # rule_ab_tester.RuleABTester instance (duck-typed to avoid import
        # cycles — the service module lazily imports DB deps)
        self.ab_tester = ab_tester
        self._log = self._load_log()

    # -- public entry ---------------------------------------------------

    def plan(self, report: Any) -> ApplyResult:
        """Convert a MetaBrainReport into a list of gated ApplyActions."""
        result = ApplyResult(report_id=self._report_id())

        for job in getattr(report, "job_results", []):
            for finding in getattr(job, "findings", []):
                if "proposed_rules" in finding:
                    self._plan_rules(finding["proposed_rules"], result)
                if "novel_patterns" in finding:
                    self._plan_misconceptions(finding["novel_patterns"], result)
                if "flagged_concepts" in finding:
                    self._plan_content_gaps(finding["flagged_concepts"], result)
                if "calibration_updates" in finding:
                    self._plan_calibration(finding["calibration_updates"], result)
                if "proposed_dependencies" in finding:
                    self._plan_graph_edges(finding["proposed_dependencies"], result)

        result.applied_count = sum(1 for a in result.actions if a.applied)
        result.blocked_count = sum(1 for a in result.actions if not a.applied)
        self._append_log(result)
        return result

    # -- rule proposals -> OrchestratorRule + A/B test ------------------

    def _plan_rules(self, proposed: list[dict], result: ApplyResult) -> None:
        admitted = 0
        for rule in proposed:
            if admitted >= MAX_RULES_PER_NIGHT:
                result.actions.append(ApplyAction(
                    action_type="create_rule",
                    payload=rule,
                    reason="nightly cap reached",
                    blocked_reason=f"over MAX_RULES_PER_NIGHT={MAX_RULES_PER_NIGHT}",
                ))
                continue

            t = rule.get("t_statistic", 0.0)
            w, l = rule.get("avg_gain_winner", 0.0), rule.get("avg_gain_loser", 0.0)
            if t < MIN_T_STAT or (l > 0 and w / l < MIN_IMPROVEMENT_RATIO):
                result.actions.append(ApplyAction(
                    action_type="create_rule",
                    payload=rule,
                    reason="below evidence threshold",
                    blocked_reason=f"t={t} < {MIN_T_STAT} or ratio {w}/{l} too small",
                ))
                continue

            action = ApplyAction(
                action_type="create_rule",
                payload={
                    "rule_name": f"mb_{rule['condition']['concept']}_{rule['recommended_strategy']}",
                    "condition": rule["condition"],
                    "action": {"teaching_strategy": rule["recommended_strategy"]},
                    "priority": 50,          # below hand-tuned rules, above defaults
                    "is_active": False,      # gated: must win its A/B test first
                    "source": "metabrain",
                },
                reason=f"metabrain rule, t={t}, gain {w} vs {l}",
                applied=True,
            )
            result.actions.append(action)
            admitted += 1

            # companion action: enroll in A/B test so it can earn activation
            result.actions.append(ApplyAction(
                action_type="enroll_ab",
                payload={
                    "test_name": f"ab_{action.payload['rule_name']}",
                    "control_rule": rule["rejected_strategy"],
                    "variant_rule": action.payload["rule_name"],
                },
                reason="new metabrain rules start shadowed in an A/B test",
                applied=True,
            ))

    # -- misconception clusters -> writer queue --------------------------

    def _plan_misconceptions(self, novel: list[dict], result: ApplyResult) -> None:
        for pat in novel:
            if pat.get("affected_students", 0) < 3:
                result.actions.append(ApplyAction(
                    action_type="write_misconception",
                    payload=pat,
                    reason="cluster too small",
                    blocked_reason="affected_students < 3",
                ))
                continue
            result.actions.append(ApplyAction(
                action_type="write_misconception",
                payload=pat,
                reason="novel cluster, queued for LLM classification",
                applied=True,
            ))

    # -- content gaps -----------------------------------------------------

    def _plan_content_gaps(self, flagged: list[dict], result: ApplyResult) -> None:
        for gap in flagged:
            result.actions.append(ApplyAction(
                action_type="flag_content",
                payload={
                    "concept": gap["concept"],
                    "failure_rate": gap["failure_rate"],
                    "gap_type": gap["gap_type"],
                    "severity": gap["severity"],
                    "queue": "content_regen",
                },
                reason=f"{gap['severity']} gap ({gap['failure_rate']:.0%} failure)",
                applied=True,
            ))

    # -- confidence calibration -------------------------------------------

    def _plan_calibration(self, updates: list[dict], result: ApplyResult) -> None:
        for u in updates:
            if u.get("pattern") == "well_calibrated":
                continue
            result.actions.append(ApplyAction(
                action_type="update_calibration",
                payload={
                    "student_id": u["student_id"],
                    "pattern": u["pattern"],
                    "calibration_gap": u["calibration_gap"],
                },
                reason=f"student {u['pattern']}, gap {u['calibration_gap']:+.2f}",
                applied=True,
            ))

    # -- cross-subject graph edges ----------------------------------------

    def _plan_graph_edges(self, deps: list[dict], result: ApplyResult) -> None:
        for dep in deps:
            if dep.get("correlation", 0.0) < 0.6 or dep.get("sample_size", 0) < 20:
                result.actions.append(ApplyAction(
                    action_type="graph_edge",
                    payload=dep,
                    reason="weak evidence",
                    blocked_reason="correlation < 0.6 or n < 20",
                ))
                continue
            result.actions.append(ApplyAction(
                action_type="graph_edge",
                payload={
                    "from": f"{dep['subject_a']}:{dep['concept_a']}",
                    "to": f"{dep['subject_b']}:{dep['concept_b']}",
                    "correlation": dep["correlation"],
                    "status": "proposed",   # human/LLM review before activation
                },
                reason=f"cross-subject corr {dep['correlation']:.2f} (n={dep['sample_size']})",
                applied=True,
            ))

    # -- audit log ----------------------------------------------------------

    @staticmethod
    def _report_id() -> str:
        return datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")

    @staticmethod
    def _load_log() -> list[dict]:
        try:
            with open(_APPLY_LOG, encoding="utf-8") as f:
                return json.load(f)
        except (OSError, json.JSONDecodeError):
            return []

    def _append_log(self, result: ApplyResult) -> None:
        self._log.append({
            "report_id": result.report_id,
            "applied": result.applied_count,
            "blocked": result.blocked_count,
            "actions": [
                {"type": a.action_type, "applied": a.applied, "reason": a.reason}
                for a in result.actions
            ],
        })
        os.makedirs(_CACHE_DIR, exist_ok=True)
        try:
            with open(_APPLY_LOG, "w", encoding="utf-8") as f:
                json.dump(self._log[-200:], f, indent=2)   # keep last 200 runs
        except OSError:
            logger.warning("apply_loop: could not write audit log")
