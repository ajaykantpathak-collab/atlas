"""meta_brain.py — Nightly self-improvement engine for a K-12 learning platform."""

from __future__ import annotations

import math
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Any


# ---------------------------------------------------------------------------
# Statistical helpers (pure Python)
# ---------------------------------------------------------------------------

def _mean(values: list[float]) -> float:
    return sum(values) / len(values) if values else 0.0


def _std(values: list[float]) -> float:
    n = len(values)
    if n < 2:
        return 0.0
    m = _mean(values)
    return math.sqrt(sum((v - m) ** 2 for v in values) / n)


def _correlation(xs: list[float], ys: list[float]) -> float:
    n = len(xs)
    if n < 3:
        return 0.0
    mx, my = _mean(xs), _mean(ys)
    sx, sy = _std(xs), _std(ys)
    if sx == 0 or sy == 0:
        return 0.0
    return sum((xi - mx) * (yi - my) for xi, yi in zip(xs, ys)) / (n * sx * sy)


def _ttest_ind(a: list[float], b: list[float]) -> float:
    """Two-sample Welch's t-test (unequal variance).  Returns the |t| statistic."""
    na, nb = len(a), len(b)
    if na < 2 or nb < 2:
        return 0.0
    ma, mb = _mean(a), _mean(b)
    va = sum((x - ma) ** 2 for x in a) / (na - 1)
    vb = sum((x - mb) ** 2 for x in b) / (nb - 1)
    se = math.sqrt(va / na + vb / nb)
    if se == 0:
        return 0.0
    return abs(ma - mb) / se          # |t|; two-tailed p < 0.05 when |t| > ~1.96


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class JobResult:
    job_name: str
    findings: list[dict[str, Any]]
    updates_made: list[str]
    tokens_used: int = 0


@dataclass
class MetaBrainReport:
    job_results: list[JobResult]
    total_findings: int = 0
    rules_proposed: int = 0
    misconceptions_discovered: int = 0
    content_gaps_found: int = 0
    strategy_updates: int = 0
    summary: str = ""

    def __post_init__(self) -> None:
        self.total_findings = sum(len(r.findings) for r in self.job_results)
        self.rules_proposed = sum(
            len(f.get("proposed_rules", [])) for r in self.job_results for f in r.findings
        )
        self.misconceptions_discovered = sum(
            f.get("new_misconceptions_count", 0) for r in self.job_results for f in r.findings
        )
        self.content_gaps_found = sum(
            len(f.get("flagged_concepts", [])) for r in self.job_results for f in r.findings
        )
        self.strategy_updates = sum(
            len(f.get("recommended_changes", [])) for r in self.job_results for f in r.findings
        )
        if not self.summary:
            self._build_summary()

    def _build_summary(self) -> None:
        parts = [
            f"MetaBrain nightly run complete — {len(self.job_results)} jobs executed.",
            f"{self.total_findings} total findings across all jobs.",
        ]
        if self.strategy_updates:
            parts.append(f"{self.strategy_updates} strategy updates recommended.")
        if self.rules_proposed:
            parts.append(f"{self.rules_proposed} orchestrator rules proposed for A/B testing.")
        if self.misconceptions_discovered:
            parts.append(f"{self.misconceptions_discovered} new misconceptions discovered.")
        if self.content_gaps_found:
            parts.append(f"{self.content_gaps_found} content gaps flagged.")
        self.summary = "  ".join(parts)


# ---------------------------------------------------------------------------
# Core engine
# ---------------------------------------------------------------------------

class MetaBrain:
    """Nightly self-improvement engine.  All jobs are read-only; they produce
    recommendations and never mutate existing data."""

    def run_all_jobs(
        self,
        interactions: list[dict[str, Any]],
        enrichment_data: dict[str, Any],
    ) -> MetaBrainReport:
        jobs = [
            self.mine_strategy_effectiveness(interactions),
            self.calibrate_agents(interactions),
            self.discover_misconceptions(interactions, enrichment_data),
            self.discover_rules(interactions),
            self.discover_cross_subject_dependencies(interactions),
            self.detect_content_gaps(interactions),
            self.update_confidence_calibration(interactions),
        ]
        return MetaBrainReport(job_results=jobs)

    # ------------------------------------------------------------------
    # Job 1 — Strategy effectiveness mining
    # ------------------------------------------------------------------

    def mine_strategy_effectiveness(
        self, interactions: list[dict[str, Any]]
    ) -> JobResult:
        groups: dict[tuple, list[dict]] = defaultdict(list)
        for ev in interactions:
            key = (ev.get("teaching_strategy"), ev.get("concept"))
            groups[key].append(ev)

        strategy_rankings: dict[str, dict[str, float]] = {}
        for (strategy, concept), evts in groups.items():
            gains = [e["mastery_gain"] for e in evts if _is_num(e.get("mastery_gain"))]
            nicr = [e["next_item_correctness"] for e in evts
                    if _is_num(e.get("next_item_correctness"))]
            eng  = [e["engagement_score"] for e in evts
                    if _is_num(e.get("engagement_score"))]
            if not gains:
                continue
            strategy_rankings.setdefault(concept, {})[strategy] = (
                _mean(gains) * 0.5
                + _mean(nicr) * 0.3
                + (_mean(eng) / 100.0) * 0.2
            )

        recommended: list[dict] = []
        for concept, rankings in strategy_rankings.items():
            if len(rankings) < 2:
                continue
            best = max(rankings, key=rankings.get)
            worst = min(rankings, key=rankings.get)
            if rankings[best] > rankings[worst] * 1.05:
                recommended.append({
                    "concept": concept,
                    "recommended_strategy": best,
                    "score": round(rankings[best], 4),
                    "replaced_strategy": worst,
                    "replaced_score": round(rankings[worst], 4),
                })

        return JobResult(
            job_name="mine_strategy_effectiveness",
            findings=[{"recommended_changes": recommended}],
            updates_made=[
                f"Ranked {len(strategy_rankings)} concept-strategy pairs; "
                f"{len(recommended)} strategy changes recommended"
            ],
        )

    # ------------------------------------------------------------------
    # Job 2 — Agent calibration
    # ------------------------------------------------------------------

    def calibrate_agents(
        self, interactions: list[dict[str, Any]]
    ) -> JobResult:
        agents: dict[str, list[dict]] = defaultdict(list)
        for ev in interactions:
            agent = ev.get("agent", "unknown")
            agents[agent].append(ev)

        scaffold = _calibrate_scaffold(agents.get("ScaffoldBot", []))
        assess   = _calibrate_assessment(agents.get("AssessmentBot", []))
        feedback = _calibrate_feedback(agents.get("FeedbackBot", []))

        return JobResult(
            job_name="calibrate_agents",
            findings=[
                {"scaffold_bot": scaffold},
                {"assessment_bot": assess},
                {"feedback_bot": feedback},
            ],
            updates_made=[
                "ScaffoldBot hint-level calibration complete",
                "AssessmentBot discrimination analysis complete",
                "FeedbackBot mastery-correlation analysis complete",
            ],
        )

    # ------------------------------------------------------------------
    # Job 3 — Misconception discovery
    # ------------------------------------------------------------------

    def discover_misconceptions(
        self,
        interactions: list[dict[str, Any]],
        enrichment_data: dict[str, Any],
    ) -> JobResult:
        existing: set[str] = set()
        for m in enrichment_data.get("misconceptions", []):
            if isinstance(m, dict):
                key = (m.get("concept"), m.get("error_type"), m.get("response_pattern"))
                if all(key):
                    existing.add(key)

        clusters: dict[tuple, dict] = defaultdict(lambda: {
            "students": set(), "events": []
        })
        for ev in interactions:
            if ev.get("is_correct"):
                continue
            concept    = ev.get("concept")
            error_type = ev.get("error_type")
            pattern    = ev.get("response_pattern")
            if not all((concept, error_type, pattern)):
                continue
            key = (concept, error_type, pattern)
            clusters[key]["students"].add(ev.get("student_id", ""))
            clusters[key]["events"].append(ev)

        novel:   list[dict] = []
        confirmed: list[dict] = []
        for key, data in clusters.items():
            if len(data["students"]) < 3:
                continue
            concept, error_type, pattern = key
            entry = {
                "concept": concept,
                "error_type": error_type,
                "response_pattern": pattern,
                "affected_students": len(data["students"]),
                "sample_events": len(data["events"]),
            }
            if key in existing:
                confirmed.append(entry)
            else:
                novel.append({**entry, "flagged_for_classification": True})

        return JobResult(
            job_name="discover_misconceptions",
            findings=[
                {"new_misconceptions_count": len(novel), "novel_patterns": novel},
                {"existing_confirmed_count": len(confirmed), "confirmed_patterns": confirmed},
            ],
            updates_made=[
                f"{len(novel)} new misconception patterns flagged for Claude review",
                f"{len(confirmed)} existing misconception patterns confirmed by data",
            ],
        )

    # ------------------------------------------------------------------
    # Job 4 — Rule discovery (condition → strategy)
    # ------------------------------------------------------------------

    def discover_rules(
        self, interactions: list[dict[str, Any]]
    ) -> JobResult:
        buckets: dict[tuple, dict[str, list[dict]]] = defaultdict(
            lambda: defaultdict(list)
        )
        for ev in interactions:
            if not ev.get("teaching_strategy"):
                continue
            condition = (
                ev.get("concept"),
                ev.get("subject"),
                ev.get("student_grade"),
                ev.get("prior_mastery"),
            )
            if not all(condition):
                continue
            buckets[condition][ev["teaching_strategy"]].append(ev)

        proposed: list[dict] = []
        for condition, by_strat in buckets.items():
            strats = list(by_strat.keys())
            if len(strats) < 2:
                continue
            for i in range(len(strats)):
                for j in range(i + 1, len(strats)):
                    sa, sb = strats[i], strats[j]
                    ga = [e["mastery_gain"] for e in by_strat[sa]
                          if _is_num(e.get("mastery_gain"))]
                    gb = [e["mastery_gain"] for e in by_strat[sb]
                          if _is_num(e.get("mastery_gain"))]
                    if len(ga) < 3 or len(gb) < 3:
                        continue
                    t = _ttest_ind(ga, gb)
                    if t > 1.96:
                        winner = sa if _mean(ga) > _mean(gb) else sb
                        loser  = sb if winner == sa else sa
                        proposed.append({
                            "condition": {
                                "concept": condition[0],
                                "subject": condition[1],
                                "grade": condition[2],
                                "prior_mastery_bin": condition[3],
                            },
                            "recommended_strategy": winner,
                            "avg_gain_winner": round(_mean(
                                [e["mastery_gain"] for e in by_strat[winner]
                                 if _is_num(e.get("mastery_gain"))]
                            ), 4),
                            "rejected_strategy": loser,
                            "avg_gain_loser": round(_mean(
                                [e["mastery_gain"] for e in by_strat[loser]
                                 if _is_num(e.get("mastery_gain"))]
                            ), 4),
                            "t_statistic": round(t, 4),
                        })

        return JobResult(
            job_name="discover_rules",
            findings=[{"proposed_rules": proposed}],
            updates_made=[
                f"{len(proposed)} orchestrator rules proposed for A/B testing"
            ],
        )

    # ------------------------------------------------------------------
    # Job 5 — Cross-subject dependency discovery
    # ------------------------------------------------------------------

    def discover_cross_subject_dependencies(
        self, interactions: list[dict[str, Any]]
    ) -> JobResult:
        student_concepts: dict[str, dict[tuple, list[float]]] = defaultdict(
            lambda: defaultdict(list)
        )
        for ev in interactions:
            sid  = ev.get("student_id", "")
            subj = ev.get("subject", "")
            conc = ev.get("concept", "")
            if not all((sid, subj, conc)):
                continue
            if ev.get("is_correct"):
                student_concepts[sid][(subj, conc)].append(1.0)
            else:
                student_concepts[sid][(subj, conc)].append(0.0)

        stu_acc: dict[str, dict[tuple, float]] = {}
        for sid, cc in student_concepts.items():
            stu_acc[sid] = {k: _mean(v) for k, v in cc.items()}

        pair_counts: dict[tuple, list[float]] = defaultdict(list)
        for acc in stu_acc.values():
            subjects = {s for s, _ in acc}
            for s1 in subjects:
                for s2 in subjects:
                    if s1 >= s2:
                        continue
                    for (_, c1), a1 in acc.items():
                        for (_, c2), a2 in acc.items():
                            if c1 >= c2:
                                continue
                            pair_counts[(s1, c1, s2, c2)].append(a1)
                            pair_counts[(s1, c1, s2, c2)].append(a2)

        pair_accuracy: dict[tuple, dict[str, float]] = {}
        for pair, vals in pair_counts.items():
            n = len(vals)
            if n < 10:
                continue
            mid = n // 2
            a = vals[:mid]
            b = vals[mid:]
            r = _correlation(a, b)
            pair_accuracy[pair] = {
                "correlation": round(r, 4),
                "sample_size": n,
            }

        proposed_deps = [
            {
                "subject_a": p[0],
                "concept_a": p[1],
                "subject_b": p[2],
                "concept_b": p[3],
                **stats,
            }
            for p, stats in pair_accuracy.items()
            if stats["correlation"] > 0.5
        ]
        proposed_deps.sort(key=lambda d: d["correlation"], reverse=True)

        return JobResult(
            job_name="discover_cross_subject_dependencies",
            findings=[{"proposed_dependencies": proposed_deps}],
            updates_made=[
                f"{len(proposed_deps)} cross-subject dependencies proposed"
            ],
        )

    # ------------------------------------------------------------------
    # Job 6 — Content gap detection
    # ------------------------------------------------------------------

    def detect_content_gaps(
        self, interactions: list[dict[str, Any]]
    ) -> JobResult:
        concept_stats: dict[str, dict[str, Any]] = defaultdict(
            lambda: {"total": 0, "incorrect": 0, "students": set()}
        )
        for ev in interactions:
            conc = ev.get("concept", "")
            if not conc:
                continue
            concept_stats[conc]["total"] += 1
            concept_stats[conc]["students"].add(ev.get("student_id", ""))
            if not ev.get("is_correct", True):
                concept_stats[conc]["incorrect"] += 1

        flagged: list[dict] = []
        for concept, stats in concept_stats.items():
            if stats["total"] < 5:
                continue
            rate = stats["incorrect"] / stats["total"]
            if rate > 0.7:
                gap_type = self._classify_gap(concept, rate, len(stats["students"]))
                flagged.append({
                    "concept": concept,
                    "failure_rate": round(rate, 4),
                    "students_affected": len(stats["students"]),
                    "gap_type": gap_type,
                    "severity": "critical" if rate > 0.85 else "high",
                })

        flagged.sort(key=lambda d: d["failure_rate"], reverse=True)

        return JobResult(
            job_name="detect_content_gaps",
            findings=[{"flagged_concepts": flagged}],
            updates_made=[f"{len(flagged)} content gaps flagged for review"],
        )

    def _classify_gap(
        self, concept: str, failure_rate: float, student_count: int
    ) -> str:
        if failure_rate > 0.9 and student_count >= 10:
            return "missing_content"
        if 0.75 < failure_rate <= 0.9:
            return "insufficient_practice"
        if student_count < 5:
            return "prerequisite_gap"
        return "poor_explanation"

    # ------------------------------------------------------------------
    # Job 7 — Confidence calibration
    # ------------------------------------------------------------------

    def update_confidence_calibration(
        self, interactions: list[dict[str, Any]]
    ) -> JobResult:
        stu_conf: dict[str, list[tuple[float, bool]]] = defaultdict(list)
        for ev in interactions:
            sid = ev.get("student_id", "")
            conf = ev.get("confidence_rating")
            if sid and _is_num(conf) and "is_correct" in ev:
                stu_conf[sid].append((float(conf), bool(ev["is_correct"])))

        updates: list[dict] = []
        for sid, ratings in stu_conf.items():
            if len(ratings) < 5:
                continue
            conf_vals  = [r[0] for r in ratings]
            acc_vals   = [float(r[1]) for r in ratings]
            avg_conf   = _mean(conf_vals)
            avg_acc    = _mean(acc_vals)
            gap        = avg_conf - avg_acc
            if gap > 0.15:
                pattern = "systematic_overconfidence"
            elif gap < -0.15:
                pattern = "systematic_underconfidence"
            else:
                pattern = "well_calibrated"
            updates.append({
                "student_id": sid,
                "pattern": pattern,
                "avg_confidence": round(avg_conf, 4),
                "avg_accuracy": round(avg_acc, 4),
                "calibration_gap": round(gap, 4),
                "sample_size": len(ratings),
            })

        return JobResult(
            job_name="update_confidence_calibration",
            findings=[{"calibration_updates": updates}],
            updates_made=[
                f"Calibration updated for {len(updates)} students "
                f"({sum(1 for u in updates if u['pattern'] != 'well_calibrated')} "
                f"flagged for adjustment)"
            ],
        )


# ---------------------------------------------------------------------------
# Internal calibration helpers (read-only)
# ---------------------------------------------------------------------------

def _calibrate_scaffold(
    events: list[dict[str, Any]]
) -> dict[str, Any]:
    hint_groups: dict[Any, list[dict]] = defaultdict(list)
    for e in events:
        lvl = e.get("hint_level")
        if lvl is not None:
            hint_groups[lvl].append(e)

    hint_scores: dict[Any, float] = {}
    for lvl, evts in hint_groups.items():
        gains = [e["mastery_gain"] for e in evts if _is_num(e.get("mastery_gain"))]
        if gains:
            hint_scores[lvl] = _mean(gains)

    recommended = None
    if hint_scores:
        best_hint = max(hint_scores, key=hint_scores.get)
        recommended = {
            "optimal_hint_level": best_hint,
            "score": round(hint_scores[best_hint], 4),
            "all_level_scores": {str(k): round(v, 4) for k, v in hint_scores.items()},
        }
    return {"hint_level_analysis": recommended}


def _calibrate_assessment(
    events: list[dict[str, Any]]
) -> dict[str, Any]:
    qt_groups: dict[Any, list[dict]] = defaultdict(list)
    for e in events:
        qt = e.get("question_type")
        if qt:
            qt_groups[qt].append(e)

    qt_scores: dict[Any, float] = {}
    for qt, evts in qt_groups.items():
        nicr = [e["next_item_correctness"] for e in evts
                if _is_num(e.get("next_item_correctness"))]
        if nicr:
            qt_scores[qt] = _mean(nicr)

    recommended = None
    if qt_scores:
        best_qt = max(qt_scores, key=qt_scores.get)
        recommended = {
            "best_question_type": best_qt,
            "discrimination_score": round(qt_scores[best_qt], 4),
            "all_type_scores": {str(k): round(v, 4) for k, v in qt_scores.items()},
        }
    return {"discrimination_analysis": recommended}


def _calibrate_feedback(
    events: list[dict[str, Any]]
) -> dict[str, Any]:
    fb_groups: dict[Any, list[dict]] = defaultdict(list)
    for e in events:
        ft = e.get("feedback_type")
        if ft:
            fb_groups[ft].append(e)

    fb_scores: dict[Any, float] = {}
    for ft, evts in fb_groups.items():
        gains = [e["mastery_gain"] for e in evts if _is_num(e.get("mastery_gain"))]
        if gains:
            fb_scores[ft] = _mean(gains)

    recommended = None
    if fb_scores:
        best_fb = max(fb_scores, key=fb_scores.get)
        recommended = {
            "best_feedback_type": best_fb,
            "avg_mastery_gain": round(fb_scores[best_fb], 4),
            "all_type_scores": {str(k): round(v, 4) for k, v in fb_scores.items()},
        }
    return {"feedback_analysis": recommended}


# ---------------------------------------------------------------------------
# Utility
# ---------------------------------------------------------------------------

def _is_num(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)