"""
state_4d_builder.py

Builds a 4-dimensional student state vector (Cognitive + Affective + Behavioral + Temporal)
from interaction history for intelligent tutoring systems.

Based on 2026 research on 4D personalization.
"""

import logging
import math
import random
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Any, Optional

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Dataclasses
# ---------------------------------------------------------------------------


@dataclass
class StudentState4D:
    student_id: str
    concept: str
    generated_at: str

    # Cognitive
    mastery_probability: float = 0.5
    ability_theta: float = 0.0
    knowledge_gaps: list[str] = field(default_factory=list)
    strong_concepts: list[str] = field(default_factory=list)
    prerequisite_gaps: list[str] = field(default_factory=list)
    transfer_ability: float = 0.5
    mastery_bucket: str = "medium"

    # Affective
    frustration_level: float = 0.0
    confidence_level: float = 0.5
    motivation_level: float = 0.5
    confusion_level: float = 0.0
    boredom_level: float = 0.0
    affective_bucket: str = "neutral"

    # Behavioral
    hint_dependency: float = 0.0
    attempt_pattern: str = "persistent"
    avg_response_time_ms: float = 30000.0
    error_pattern_tendency: dict[str, float] = field(default_factory=dict)
    learning_speed: float = 0.0
    preferred_difficulty: float = 0.5
    hint_dependency_bucket: str = "independent"

    # Temporal
    time_of_day_performance: dict[int, float] = field(default_factory=dict)
    session_length_preference: float = 15.0
    spacing_effectiveness: float = 0.5
    fatigue_factor: float = 0.0
    days_since_last_interaction: int = 0
    optimal_review_time: str = ""
    temporal_bucket: str = "stale"


@dataclass
class CalibrationResult:
    calibration_score: float  # 0=perfect, 1=worst
    bias: str  # "overconfident", "underconfident", "well_calibrated"
    bias_magnitude: float


@dataclass
class FrustrationResult:
    rapid_wrong: int = 0
    hint_abuse: int = 0
    pause_then_wrong: int = 0
    repeated_attempts: int = 0
    score: float = 0.0


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _safe_div(numerator: float, denominator: float, default: float = 0.0) -> float:
    return numerator / denominator if denominator != 0 else default


def _clamp(value: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, value))


def _parse_ts(ts_val: Any) -> Optional[datetime]:
    if ts_val is None:
        return None
    if isinstance(ts_val, datetime):
        return ts_val
    for fmt in ("%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d"):
        try:
            return datetime.strptime(str(ts_val), fmt)
        except ValueError:
            continue
    return None


def _mastery_to_prob(record: dict) -> float:
    if "mastery_achieved" in record and record["mastery_achieved"] is not None:
        return 1.0 if record["mastery_achieved"] else 0.0
    if "partial_score" in record and record["partial_score"] is not None:
        return float(record["partial_score"])
    return 1.0 if record.get("is_correct") else 0.0


def _linear_slope(values: list[float]) -> float:
    n = len(values)
    if n < 2:
        return 0.0
    mean_x = (n - 1) / 2.0
    mean_y = sum(values) / n
    num = sum((i - mean_x) * (v - mean_y) for i, v in enumerate(values))
    den = sum((i - mean_x) ** 2 for i in range(n))
    return num / den if den != 0 else 0.0


# ---------------------------------------------------------------------------
# IRT (1-Parameter Logistic)
# ---------------------------------------------------------------------------


def _irt_estimate_theta(
    responses: list[float], difficulties: list[float], max_iter: int = 100
) -> float:
    """Estimate student ability theta using 1-PL IRT via Newton-Raphson."""
    if not responses:
        return 0.0
    if len(responses) != len(difficulties):
        difficulties = [0.0] * len(responses)
    theta = 0.0
    for _ in range(max_iter):
        p = [1.0 / (1.0 + math.exp(-(theta - d))) for d in difficulties]
        p = [_clamp(pi) for pi in p]
        num = sum((r - pi) * pi * (1 - pi) for r, pi in zip(responses, p))
        den = sum(pi * (1 - pi) for pi in p) + 1e-9
        delta = num / den
        theta += delta
        theta = _clamp(theta, -4.0, 4.0)
        if abs(delta) < 1e-6:
            break
    return theta


# ---------------------------------------------------------------------------
# Session Utilities
# ---------------------------------------------------------------------------


class _SessionGrouper:
    """Split interaction records into sessions (30-min gap = new session)."""

    @staticmethod
    def split_into_sessions(interactions: list[dict]) -> list[list[dict]]:
        sorted_ints = sorted(
            [i for i in interactions if _parse_ts(i.get("timestamp")) is not None],
            key=lambda x: _parse_ts(x["timestamp"]),
        )
        if not sorted_ints:
            return [interactions]

        sessions: list[list[dict]] = [[sorted_ints[0]]]
        for rec in sorted_ints[1:]:
            last_ts = _parse_ts(sessions[-1][-1].get("timestamp"))
            cur_ts = _parse_ts(rec.get("timestamp"))
            if last_ts and cur_ts and (cur_ts - last_ts) > timedelta(minutes=30):
                sessions.append([rec])
            else:
                sessions[-1].append(rec)
        return sessions if sessions else [interactions]

    @staticmethod
    def split_session_into_quarters(session: list[dict]) -> list[list[dict]]:
        if len(session) < 4:
            return [session] * 4
        q = len(session) // 4
        return [
            session[0:q],
            session[q : 2 * q],
            session[2 * q : 3 * q],
            session[3 * q :],
        ]


# ---------------------------------------------------------------------------
# Main Builder
# ---------------------------------------------------------------------------


class State4DBuilder:
    """Build 4-dimensional student state vectors from interaction history."""

    # ------------------------------------------------------------------ #
    #  Public API
    # ------------------------------------------------------------------ #

    def build_state(
        self,
        student_id: str,
        concept: str,
        interactions: list[dict],
        mastery_map: dict[str, float] | None = None,
    ) -> StudentState4D:
        try:
            return self._build_state_inner(student_id, concept, interactions, mastery_map)
        except Exception as exc:
            logger.error("build_state failed: %s", exc, exc_info=True)
            return self._default_state(student_id, concept)

    # ------------------------------------------------------------------ #
    #  Internal pipeline
    # ------------------------------------------------------------------ #

    def _build_state_inner(
        self,
        student_id: str,
        concept: str,
        interactions: list[dict],
        mastery_map: dict[str, float] | None,
    ) -> StudentState4D:
        mastery_map = mastery_map or {}
        relevant = [i for i in interactions if i.get("concept") == concept]
        all_ints = interactions

        cog = self._cognitive(relevant, mastery_map)
        aff = self._affective(relevant)
        beh = self._behavioral(relevant)
        tmp = self._temporal(all_ints, relevant, student_id)

        state = StudentState4D(
            student_id=student_id,
            concept=concept,
            generated_at=datetime.utcnow().isoformat(),
            **cog,
            **aff,
            **beh,
            **tmp,
        )
        logger.debug("Built 4D state for %s on %s", student_id, concept)
        return state

    def _default_state(self, student_id: str, concept: str) -> StudentState4D:
        return StudentState4D(
            student_id=student_id,
            concept=concept,
            generated_at=datetime.utcnow().isoformat(),
        )

    # ------------------------------------------------------------------ #
    #  Cognitive
    # ------------------------------------------------------------------ #

    def _cognitive(
        self, interactions: list[dict], mastery_map: dict[str, float]
    ) -> dict[str, Any]:
        if not interactions:
            return dict(
                mastery_probability=0.5,
                ability_theta=0.0,
                knowledge_gaps=[],
                strong_concepts=[],
                prerequisite_gaps=[],
                transfer_ability=0.5,
                mastery_bucket="medium",
            )

        probs = [_mastery_to_prob(i) for i in interactions]
        mastery = sum(probs) / len(probs)
        difficulties = [float(i.get("difficulty", 0.5)) for i in interactions]
        theta = _irt_estimate_theta(probs, difficulties)

        all_concepts = set(mastery_map.keys())
        gaps = [c for c in all_concepts if mastery_map.get(c, 0.5) < 0.4]
        strong = [c for c in all_concepts if mastery_map.get(c, 0.5) > 0.7]

        prereqs = self._detect_prereq_gaps(interactions, mastery_map)

        transfer = self._estimate_transfer(interactions, mastery_map)

        bucket = "low" if mastery < 0.4 else ("high" if mastery > 0.7 else "medium")

        return dict(
            mastery_probability=round(mastery, 4),
            ability_theta=round(theta, 4),
            knowledge_gaps=gaps,
            strong_concepts=strong,
            prerequisite_gaps=prereqs,
            transfer_ability=round(transfer, 4),
            mastery_bucket=bucket,
        )

    def _detect_prereq_gaps(
        self, interactions: list[dict], mastery_map: dict[str, float]
    ) -> list[str]:
        prereqs: set[str] = set()
        for i in interactions:
            prereqs_list = i.get("prerequisites", [])
            if prereqs_list:
                prereqs.update(prereqs_list)
        return [p for p in prereqs if mastery_map.get(p, 0.5) < 0.4]

    def _estimate_transfer(
        self, interactions: list[dict], mastery_map: dict[str, float]
    ) -> float:
        concepts = list({i.get("concept") for i in interactions if i.get("concept")})
        if len(concepts) < 2:
            return 0.5
        per_concept: dict[str, list[float]] = {}
        for i in interactions:
            c = i.get("concept")
            if c:
                per_concept.setdefault(c, []).append(_mastery_to_prob(i))
        cors = []
        concept_list = list(per_concept.keys())
        for idx_a in range(len(concept_list)):
            for idx_b in range(idx_a + 1, len(concept_list)):
                ma = sum(per_concept[concept_list[idx_a]]) / len(
                    per_concept[concept_list[idx_a]]
                )
                mb = sum(per_concept[concept_list[idx_b]]) / len(
                    per_concept[concept_list[idx_b]]
                )
                cors.append(abs(ma - mb))
        if not cors:
            return 0.5
        avg_diff = sum(cors) / len(cors)
        return round(_clamp(1.0 - avg_diff), 4)

    # ------------------------------------------------------------------ #
    #  Affective
    # ------------------------------------------------------------------ #

    def _affective(self, interactions: list[dict]) -> dict[str, Any]:
        if not interactions:
            return dict(
                frustration_level=0.0,
                confidence_level=0.5,
                motivation_level=0.5,
                confusion_level=0.0,
                boredom_level=0.0,
                affective_bucket="neutral",
            )

        f_res = self.frustration_detector(interactions)
        frustration = f_res.score

        confidence_vals = [
            float(i["confidence_rating"]) for i in interactions if i.get("confidence_rating") is not None
        ]
        confidence = (
            sum(confidence_vals) / len(confidence_vals) / 5.0
            if confidence_vals
            else 0.5
        )

        motivation = self._motivation(interactions)
        confusion = self._confusion(interactions)
        boredom = self._boredom(interactions)

        if frustration > 0.6 or confusion > 0.6:
            bucket = "negative"
        elif frustration > 0.3 or motivation < 0.3:
            bucket = "neutral"
        else:
            bucket = "positive"

        return dict(
            frustration_level=round(frustration, 4),
            confidence_level=round(confidence, 4),
            motivation_level=round(motivation, 4),
            confusion_level=round(confusion, 4),
            boredom_level=round(boredom, 4),
            affective_bucket=bucket,
        )

    def frustration_detector(self, interactions: list[dict]) -> FrustrationResult:
        """Detect frustration signals from interaction history."""
        result = FrustrationResult()

        sorted_ints = sorted(
            interactions,
            key=lambda x: _parse_ts(x.get("timestamp")) or datetime.min,
        )

        # rapid_wrong: 3+ wrong answers in <30s each within 90s window
        recent: list[tuple[datetime, bool]] = []
        rapid_count = 0
        for i in sorted_ints:
            ts = _parse_ts(i.get("timestamp"))
            is_wrong = not i.get("is_correct", False)
            rt = i.get("time_to_respond_ms")
            if ts and is_wrong and rt is not None and rt < 30000:
                recent.append((ts, True))
            else:
                recent.append((ts, False))
            window_start = ts - timedelta(seconds=90) if ts else None
            if window_start:
                recent = [(t, v) for t, v in recent if t >= window_start]
            wrongs = [v for _, v in recent if v]
            if len(wrongs) >= 3:
                rapid_count += 1
        result.rapid_wrong = min(rapid_count, 3)

        # hint_abuse: >3 hints per question on 2+ questions
        hint_counts: dict[Any, int] = {}
        for i in interactions:
            qid = i.get("question_id", i.get("timestamp"))
            hint_counts[qid] = hint_counts.get(qid, 0) + (i.get("hints_used") or 0)
        result.hint_abuse = sum(1 for c in hint_counts.values() if c > 3)
        result.hint_abuse = min(result.hint_abuse // 2, 2)

        # pause_then_wrong: >60s RT followed by wrong answer
        result.pause_then_wrong = sum(
            1
            for i in interactions
            if (i.get("time_to_respond_ms") or 0) > 60000 and not i.get("is_correct", False)
        )

        # repeated_attempts: 4+ attempts on same question
        q_attempts: dict[Any, int] = {}
        for i in interactions:
            qid = i.get("question_id", i.get("timestamp"))
            q_attempts[qid] = q_attempts.get(qid, 0) + 1
        result.repeated_attempts = sum(1 for c in q_attempts.values() if c >= 4)
        result.repeated_attempts = min(result.repeated_attempts, 2)

        # weighted score, clamped 0-1
        score = (
            result.rapid_wrong * 0.3
            + result.hint_abuse * 0.25
            + result.pause_then_wrong * 0.15
            + result.repeated_attempts * 0.3
        )
        result.score = _clamp(score / 4.0)
        return result

    def _motivation(self, interactions: list[dict]) -> float:
        if not interactions:
            return 0.5
        eng_scores = [i.get("engagement_score") for i in interactions if i.get("engagement_score") is not None]
        eng = sum(eng_scores) / len(eng_scores) / 5.0 if eng_scores else 0.5

        accs = [_mastery_to_prob(i) for i in interactions]
        trend = _linear_slope(accs)
        trend_score = _clamp((trend + 0.1) / 0.2)

        return _clamp(eng * 0.7 + trend_score * 0.3)

    def _confusion(self, interactions: list[dict]) -> float:
        if not interactions:
            return 0.0
        total_hints = sum(i.get("hints_used", 0) for i in interactions)
        avg_hints = total_hints / len(interactions)
        hints_w = _clamp(avg_hints / 5.0)

        long_rt_wrong = sum(
            1
            for i in interactions
            if (i.get("time_to_respond_ms") or 0) > 60000 and not i.get("is_correct", False)
        )
        rt_w = _clamp(long_rt_wrong / max(len(interactions), 1))

        next_wrong = sum(
            1
            for i in interactions
            if not i.get("next_item_correct", True)
        )
        next_w = _clamp(next_wrong / max(len(interactions), 1))

        return _clamp(hints_w * 0.4 + rt_w * 0.35 + next_w * 0.25)

    def _boredom(self, interactions: list[dict]) -> float:
        if not interactions:
            return 0.0
        fast_correct = sum(
            1
            for i in interactions
            if (i.get("time_to_respond_ms") or float("inf")) < 5000
            and i.get("is_correct", False)
        )
        fast_correct_ratio = fast_correct / len(interactions)

        accs = [_mastery_to_prob(i) for i in interactions]
        if len(accs) >= 3:
            first = sum(accs[: len(accs) // 2]) / (len(accs) // 2)
            last = sum(accs[len(accs) // 2 :]) / (len(accs) - len(accs) // 2)
            decl_score = _clamp(first - last)
        else:
            decl_score = 0.0

        return _clamp(fast_correct_ratio * 0.65 + decl_score * 0.35)

    # ------------------------------------------------------------------ #
    #  Behavioral
    # ------------------------------------------------------------------ #

    def _behavioral(self, interactions: list[dict]) -> dict[str, Any]:
        if not interactions:
            return dict(
                hint_dependency=0.0,
                attempt_pattern="persistent",
                avg_response_time_ms=30000.0,
                error_pattern_tendency={},
                learning_speed=0.0,
                preferred_difficulty=0.5,
                hint_dependency_bucket="independent",
            )

        total_hints = sum(i.get("hints_used", 0) for i in interactions)
        hint_dep = _clamp((total_hints / len(interactions)) * 0.4
                          + (total_hints / max(len(interactions), 1)) * 0.6)

        pattern = self._attempt_pattern(interactions)

        rts = [i.get("time_to_respond_ms") for i in interactions if i.get("time_to_respond_ms") is not None]
        avg_rt = sum(rts) / len(rts) if rts else 30000.0

        errors = [i.get("error_type") for i in interactions if i.get("error_type")]
        error_tend: dict[str, float] = {}
        if errors:
            from collections import Counter
            counts = Counter(errors)
            total_e = len(errors)
            error_tend = {k: round(v / total_e, 4) for k, v in counts.most_common()}

        learning_speed = self._learning_speed(interactions)

        diffs = [i.get("difficulty") for i in interactions if i.get("difficulty") is not None]
        preferred_diff = sum(diffs) / len(diffs) if diffs else 0.5

        bucket = (
            "independent" if hint_dep < 0.3 else ("moderate" if hint_dep < 0.6 else "dependent")
        )

        return dict(
            hint_dependency=round(hint_dep, 4),
            attempt_pattern=pattern,
            avg_response_time_ms=round(avg_rt, 2),
            error_pattern_tendency=error_tend,
            learning_speed=round(learning_speed, 4),
            preferred_difficulty=round(preferred_diff, 4),
            hint_dependency_bucket=bucket,
        )

    def _attempt_pattern(self, interactions: list[dict]) -> str:
        if not interactions:
            return "persistent"
        avg_hints = sum(i.get("hints_used", 0) for i in interactions) / len(interactions)
        avg_attempts = sum(i.get("attempts", 1) for i in interactions) / len(interactions)
        correctness = sum(1 for i in interactions if i.get("is_correct", False)) / len(interactions)

        if avg_hints >= 2:
            return "strategic"
        if avg_attempts < 3 and correctness > 0.6:
            return "quick_giver"
        return "persistent"

    def _learning_speed(self, interactions: list[dict]) -> float:
        masteries = [_mastery_to_prob(i) for i in interactions]
        if len(masteries) < 2:
            return 0.0
        diffs = [masteries[i + 1] - masteries[i] for i in range(len(masteries) - 1)]
        avg_improvement = sum(diffs) / len(diffs)
        return _clamp(avg_improvement * 10)

    # ------------------------------------------------------------------ #
    #  Temporal
    # ------------------------------------------------------------------ #

    def _temporal(
        self, all_interactions: list[dict], relevant: list[dict], student_id: str
    ) -> dict[str, Any]:
        if not all_interactions:
            return dict(
                time_of_day_performance={},
                session_length_preference=15.0,
                spacing_effectiveness=0.5,
                fatigue_factor=0.0,
                days_since_last_interaction=0,
                optimal_review_time="",
                temporal_bucket="stale",
            )

        tod = self._time_of_day(all_interactions)
        session_len = self._session_length_pref(all_interactions)
        spacing = self._spacing_effectiveness(all_interactions)
        fatigue = self._fatigue_factor(all_interactions)
        days_since = self._days_since(all_interactions)
        optimal = self._optimal_review_time(all_interactions)

        if days_since <= 1:
            t_bucket = "fresh"
        elif days_since <= 7:
            t_bucket = "recent"
        else:
            t_bucket = "stale"

        return dict(
            time_of_day_performance=tod,
            session_length_preference=round(session_len, 2),
            spacing_effectiveness=round(spacing, 4),
            fatigue_factor=round(fatigue, 4),
            days_since_last_interaction=days_since,
            optimal_review_time=optimal,
            temporal_bucket=t_bucket,
        )

    def _time_of_day(self, interactions: list[dict]) -> dict[int, float]:
        hourly: dict[int, list[float]] = {}
        for i in interactions:
            ts = _parse_ts(i.get("timestamp"))
            if ts:
                hour = ts.hour
                hourly.setdefault(hour, []).append(_mastery_to_prob(i))
        return {h: round(sum(v) / len(v), 4) for h, v in hourly.items() if v}

    def _session_length_pref(self, interactions: list[dict]) -> float:
        sessions = _SessionGrouper.split_into_sessions(interactions)
        if not sessions:
            return 15.0
        lengths = []
        for sess in sessions:
            times = [_parse_ts(i.get("timestamp")) for i in sess]
            times = [t for t in times if t is not None]
            if len(times) >= 2:
                lengths.append((max(times) - min(times)).total_seconds() / 60.0)
        if not lengths:
            return 15.0
        # Weight more recent sessions more heavily
        weights = [0.5 + 0.5 * (i / max(len(lengths) - 1, 1)) for i in range(len(lengths))]
        return _clamp(sum(l * w for l, w in zip(lengths, weights)) / sum(weights), 1.0, 120.0)

    def _spacing_effectiveness(self, interactions: list[dict]) -> float:
        sessions = _SessionGrouper.split_into_sessions(interactions)
        if len(sessions) < 2:
            return 0.5
        gains = []
        for idx in range(1, len(sessions)):
            prev_masteries = [_mastery_to_prob(i) for i in sessions[idx - 1]]
            curr_masteries = [_mastery_to_prob(i) for i in sessions[idx]]
            if prev_masteries and curr_masteries:
                gains.append(
                    (sum(curr_masteries) / len(curr_masteries))
                    - (sum(prev_masteries) / len(prev_masteries))
                )
        if not gains:
            return 0.5
        avg_gain = sum(gains) / len(gains)
        return _clamp(avg_gain * 5)

    def _fatigue_factor(self, interactions: list[dict]) -> float:
        sessions = _SessionGrouper.split_into_sessions(interactions)
        if not sessions:
            return 0.0
        fatigue_values = []
        for sess in sessions:
            quarters = _SessionGrouper.split_session_into_quarters(sess)
            accuracies = []
            for q in quarters:
                if q:
                    accuracies.append(
                        sum(1 for i in q if i.get("is_correct", False)) / len(q)
                    )
            if len(accuracies) == 4 and accuracies[0] > 0:
                fatigue = 1.0 - (accuracies[-1] / accuracies[0])
                fatigue_values.append(_clamp(fatigue))
        if not fatigue_values:
            return 0.0
        return sum(fatigue_values) / len(fatigue_values)

    def _days_since(self, interactions: list[dict]) -> int:
        timestamps = [_parse_ts(i.get("timestamp")) for i in interactions]
        timestamps = [t for t in timestamps if t is not None]
        if not timestamps:
            return 0
        most_recent = max(timestamps)
        return (datetime.utcnow() - most_recent).days

    def _optimal_review_time(self, interactions: list[dict]) -> str:
        mastery_vals = [_mastery_to_prob(i) for i in interactions]
        avg_mastery = sum(mastery_vals) / len(mastery_vals) if mastery_vals else 0.5
        # Exponential decay: review when estimated mastery drops below 0.4
        half_life = 3 if avg_mastery > 0.7 else (1 if avg_mastery > 0.4 else 0.5)
        days_until_decay = half_life * math.log(0.4 / max(avg_mastery, 0.01))
        days_until_decay = max(0.0, days_until_decay)
        optimal_dt = datetime.utcnow() + timedelta(days=days_until_decay)
        return optimal_dt.isoformat()

    # ------------------------------------------------------------------ #
    #  Calibration
    # ------------------------------------------------------------------ #

    def compute_calibration(
        self, interactions: list[dict]
    ) -> CalibrationResult:
        """
        Expected Calibration Error (ECE).

        Groups predictions into bins; ECE = mean(|accuracy_in_bin - avg_confidence_in_bin|).
        calibration_score: 0 = perfectly calibrated, 1 = completely miscalibrated.
        """
        if not interactions:
            return CalibrationResult(calibration_score=0.0, bias="well_calibrated", bias_magnitude=0.0)

        bins: list[tuple[list[float], list[float]]] = [[] for _ in range(10)]
        for i in interactions:
            pred = _mastery_to_prob(i)
            conf = _clamp(i.get("confidence_rating", 3) / 5.0)
            b = min(int(pred * 10), 9)
            bins[b].append((pred, conf))

        filled_bins = [(p, c) for b in bins for p, c in b if b]
        if not filled_bins:
            return CalibrationResult(0.0, "well_calibrated", 0.0)

        ece = sum(abs(p - c) for p, c in filled_bins) / len(filled_bins)
        avg_pred = sum(p for p, _ in filled_bins) / len(filled_bins)
        avg_conf = sum(c for _, c in filled_bins) / len(filled_bins)

        if avg_pred - avg_conf > 0.05:
            bias = "overconfident"
        elif avg_conf - avg_pred > 0.05:
            bias = "underconfident"
        else:
            bias = "well_calibrated"

        return CalibrationResult(
            calibration_score=round(_clamp(ece * 5), 4),
            bias=bias,
            bias_magnitude=round(abs(avg_pred - avg_conf), 4),
        )

    # ------------------------------------------------------------------ #
    #  Strategy Hint
    # ------------------------------------------------------------------ #

    def get_state_summary(self, state: StudentState4D) -> dict[str, Any]:
        hint = self._strategy_hint(state)
        return dict(
            mastery_bucket=state.mastery_bucket,
            affective_bucket=state.affective_bucket,
            hint_dependency_bucket=state.hint_dependency_bucket,
            temporal_bucket=state.temporal_bucket,
            optimal_strategy_hint=hint,
        )

    def _strategy_hint(self, s: StudentState4D) -> str:
        m = s.mastery_bucket
        a = s.affective_bucket
        h = s.hint_dependency_bucket

        if m == "low" and a == "negative":
            return "support_and_scaffold"
        if m == "low" and h == "dependent":
            return "prerequisite_review"
        if m == "low" and a == "neutral":
            return "foundation_building"
        if m == "high" and a == "positive":
            return "challenge"
        if m == "high" and a == "negative":
            return "reduce_pressure"
        if m == "medium" and s.frustration_level > 0.5:
            return "scaffold"
        if m == "medium" and s.confidence_level > 0.7:
            return "advance"
        if m == "high" and h == "dependent":
            return "encourage_independence"
        return "maintain_and_monitor"


# ---------------------------------------------------------------------------
# Convenience function
# ---------------------------------------------------------------------------


def build_student_state(
    student_id: str,
    concept: str,
    interactions: list[dict],
    mastery_map: dict[str, float] | None = None,
) -> StudentState4D:
    """Module-level convenience wrapper."""
    return State4DBuilder().build_state(student_id, concept, interactions, mastery_map)