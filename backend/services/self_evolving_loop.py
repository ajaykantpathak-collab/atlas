r"""Self-evolving intelligence loop.

Processes synthetic (and real) interaction data to:
1. Update strategy effectiveness scores
2. Discover and verify misconceptions
3. Update learning style profiles
4. Flag content gaps
5. Calibrate orchestrator rules

This is the "meta-learning" layer — the system learns FROM student data
how to teach better.

Output: NEW files in D:\platform\cbse_data\intelligence_updates\
Does NOT modify any existing data files.
"""
import json, os, time
from collections import defaultdict
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field

_CBSE_DATA = os.environ.get("CBSE_DATA_DIR", r"D:\platform\cbse_data")
OUT_DIR = os.environ.get(
    "INTEL_OUT_DIR", os.path.join(_CBSE_DATA, "intelligence_updates"))
os.makedirs(OUT_DIR, exist_ok=True)

INTERACTIONS_PATH = os.environ.get(
    "INTEL_INTERACTIONS_PATH",
    os.path.join(_CBSE_DATA, "synthetic_students", "interactions.json"))
STUDENTS_PATH = os.environ.get(
    "INTEL_STUDENTS_PATH",
    os.path.join(_CBSE_DATA, "synthetic_students", "students.json"))


@dataclass
class StrategyEffectivenessUpdate:
    """Effectiveness score update for a teaching strategy."""
    strategy_name: str
    subject: str
    student_count: int
    total_interactions: int
    avg_knowledge_gain: float
    mastery_rate: float
    engagement_score: float
    lift_vs_baseline: float
    confidence: float
    is_significant: bool


@dataclass
class MisconceptionDiscovery:
    """A discovered misconception pattern."""
    misconception_key: str
    subject: str
    concept: str
    error_pattern: str
    occurrence_count: int
    student_count: int
    confidence: float
    recommended_strategy: str


@dataclass
class ContentGapUpdate:
    """A flagged content gap."""
    subject: str
    concept: str
    grade_level: int
    avg_error_rate: float
    affected_student_count: int
    severity: str
    gap_type: str
    recommended_action: str


@dataclass
class ProfileUpdate:
    """Learning style profile update for a student."""
    student_id: str
    strategy_effectiveness: Dict[str, float]
    best_strategies: List[str]
    worst_strategies: List[str]
    total_interactions: int
    profile_confidence: float


def load_interactions() -> List[Dict]:
    """Load interaction data — synthetic file if present, else the live DB.

    The synthetic pipeline's interactions.json is a dev artifact; in the
    container it doesn't exist, so we fall back to interaction_outcome —
    the real table every student answer writes to via the intelligence bus.
    """
    if os.path.exists(INTERACTIONS_PATH):
        with open(INTERACTIONS_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("interactions", [])
    return _load_interactions_from_db()


def _load_interactions_from_db(days: int = 90, limit: int = 100_000) -> List[Dict]:
    """Adapt interaction_outcome rows to the synthetic interaction schema."""
    try:
        from backend.database import get_sync_engine
        from backend.services.intelligence_schema import InteractionOutcome
        from sqlalchemy import select
        from sqlalchemy.orm import Session
        from datetime import timedelta
    except Exception:
        return []

    try:
        cutoff = datetime.now(timezone.utc) - timedelta(days=days)
        with Session(get_sync_engine()) as session:
            rows = session.execute(
                select(InteractionOutcome)
                .where(InteractionOutcome.created_at >= cutoff)
                .order_by(InteractionOutcome.created_at).limit(limit)
            ).scalars().all()
    except Exception as e:
        print(f"DB interactions load failed: {e}")
        return []

    out = []
    for r in rows:
        subject = r.subject or ""
        if not subject:
            # concept ids look like c10_bio_001 — second token is the subject
            parts = (r.concept or "").split("_")
            subject = parts[1] if len(parts) > 1 else "unknown"
        out.append({
            "student_id": r.student_id or "",
            "subject": subject,
            "concept": r.concept or "",
            "is_correct": bool(r.is_correct),
            "hints_used": r.hints_used or 0,
            "engagement_score": float(r.engagement_score or 0.5),
            "mastery_delta": float(r.partial_score or 0.0),
            "difficulty": 0.5,
            "misconception": (r.misconceptions_detected or [None])[0],
            "time_ms": r.time_to_respond_ms or 0,
        })
    return out


def load_students() -> List[Dict]:
    """Load student data."""
    if not os.path.exists(STUDENTS_PATH):
        return []
    with open(STUDENTS_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get("students", [])


def compute_strategy_effectiveness(interactions: List[Dict]) -> List[StrategyEffectivenessUpdate]:
    """Analyze which strategies work best for which subjects.

    Since synthetic interactions don't have explicit strategy labels,
    we infer effectiveness from hint patterns and outcomes.
    """
    # Group interactions by subject and hint pattern (proxy for strategy)
    strategy_data = defaultdict(lambda: {
        "correct": 0, "total": 0, "engagement": [],
        "students": set(), "mastery_gains": []
    })

    for inter in interactions:
        subject = inter.get("subject", "unknown")
        hints = inter.get("hints_used", 0)

        # Infer strategy from hint pattern
        if hints == 0:
            strategy = "no_hint_independent"
        elif hints == 1:
            strategy = "single_hint_guided"
        elif hints == 2:
            strategy = "multi_hint_scaffolded"
        else:
            strategy = "heavy_scaffolded"

        key = (strategy, subject)
        strategy_data[key]["total"] += 1
        strategy_data[key]["students"].add(inter.get("student_id", ""))
        strategy_data[key]["engagement"].append(inter.get("engagement_score", 0.5))

        if inter.get("is_correct"):
            strategy_data[key]["correct"] += 1

        mastery_delta = inter.get("mastery_delta", 0)
        strategy_data[key]["mastery_gains"].append(mastery_delta)

    updates = []
    for (strategy, subject), data in strategy_data.items():
        if data["total"] < 5:
            continue

        mastery_rate = data["correct"] / data["total"]
        avg_engagement = sum(data["engagement"]) / len(data["engagement"])
        avg_gain = sum(data["mastery_gains"]) / len(data["mastery_gains"])

        # Baseline: average mastery rate across all strategies for this subject
        subject_total = sum(d["total"] for (s, sub), d in strategy_data.items() if sub == subject)
        subject_correct = sum(d["correct"] for (s, sub), d in strategy_data.items() if sub == subject)
        baseline = subject_correct / max(1, subject_total)

        lift = mastery_rate - baseline
        confidence = min(1.0, data["total"] / 50.0)  # More data = higher confidence
        is_significant = abs(lift) > 0.05 and confidence > 0.3

        updates.append(StrategyEffectivenessUpdate(
            strategy_name=strategy,
            subject=subject,
            student_count=len(data["students"]),
            total_interactions=data["total"],
            avg_knowledge_gain=avg_gain,
            mastery_rate=mastery_rate,
            engagement_score=avg_engagement,
            lift_vs_baseline=lift,
            confidence=confidence,
            is_significant=is_significant,
        ))

    return updates


def discover_misconceptions(interactions: List[Dict]) -> List[MisconceptionDiscovery]:
    """Discover misconception patterns from error clusters.

    A misconception is detected when:
    - Multiple students get the same type of question wrong
    - Even with hints, they still fail
    - The error pattern repeats across students
    """
    # Group errors by subject
    errors_by_subject = defaultdict(list)
    for inter in interactions:
        if not inter.get("is_correct"):
            errors_by_subject[inter.get("subject", "unknown")].append(inter)

    discoveries = []
    for subject, errors in errors_by_subject.items():
        # Count errors by difficulty range
        difficulty_buckets = defaultdict(lambda: {"count": 0, "students": set(), "hints_avg": 0})
        for err in errors:
            diff = err.get("difficulty", 0.5)
            bucket = f"diff_{int(diff * 5) / 5:.1f}"
            difficulty_buckets[bucket]["count"] += 1
            difficulty_buckets[bucket]["students"].add(err.get("student_id", ""))
            difficulty_buckets[bucket]["hints_avg"] += err.get("hints_used", 0)

        for bucket, data in difficulty_buckets.items():
            if data["count"] < 3:
                continue

            avg_hints = data["hints_avg"] / data["count"]
            # High hint usage + still wrong = potential misconception
            if avg_hints >= 1.5 and data["count"] >= 3:
                misconception_key = f"{subject}:{bucket}:high_hint_failure"
                discoveries.append(MisconceptionDiscovery(
                    misconception_key=misconception_key,
                    subject=subject,
                    concept=f"{subject}_{bucket}",
                    error_pattern=f"Students fail even with {avg_hints:.1f} hints at {bucket} difficulty",
                    occurrence_count=data["count"],
                    student_count=len(data["students"]),
                    confidence=min(1.0, data["count"] / 20.0),
                    recommended_strategy="socratic_decomposition" if avg_hints > 2 else "worked_example",
                ))

    return discoveries


def flag_content_gaps(interactions: List[Dict]) -> List[ContentGapUpdate]:
    """Flag content gaps where students consistently struggle."""
    # Group by subject
    subject_stats = defaultdict(lambda: {"correct": 0, "total": 0, "students": set()})
    for inter in interactions:
        subject = inter.get("subject", "unknown")
        subject_stats[subject]["total"] += 1
        subject_stats[subject]["students"].add(inter.get("student_id", ""))
        if inter.get("is_correct"):
            subject_stats[subject]["correct"] += 1

    gaps = []
    for subject, stats in subject_stats.items():
        if stats["total"] < 10:
            continue

        error_rate = 1.0 - (stats["correct"] / stats["total"])

        if error_rate > 0.5:
            severity = "critical"
        elif error_rate > 0.35:
            severity = "high"
        elif error_rate > 0.25:
            severity = "medium"
        else:
            severity = "low"

        if severity in ("critical", "high"):
            gap_type = "insufficient_practice" if error_rate > 0.4 else "poor_explanation"
            action = "Add more practice questions" if gap_type == "insufficient_practice" else "Improve explanation walkthrough"

            gaps.append(ContentGapUpdate(
                subject=subject,
                concept=f"{subject}_general",
                grade_level=0,  # Across all grades
                avg_error_rate=error_rate,
                affected_student_count=len(stats["students"]),
                severity=severity,
                gap_type=gap_type,
                recommended_action=action,
            ))

    return gaps


def update_profiles(students: List[Dict], interactions: List[Dict]) -> List[ProfileUpdate]:
    """Update learning style profiles based on interaction history."""
    # Group interactions by student
    by_student = defaultdict(list)
    for inter in interactions:
        by_student[inter.get("student_id", "")].append(inter)

    updates = []
    for student in students:
        sid = student.get("student_id", "")
        student_interactions = by_student.get(sid, [])

        if len(student_interactions) < 5:
            continue

        # Compute strategy effectiveness for this student
        strategy_scores = defaultdict(lambda: {"correct": 0, "total": 0})
        for inter in student_interactions:
            hints = inter.get("hints_used", 0)
            if hints == 0:
                strategy = "no_hint_independent"
            elif hints == 1:
                strategy = "single_hint_guided"
            elif hints == 2:
                strategy = "multi_hint_scaffolded"
            else:
                strategy = "heavy_scaffolded"

            strategy_scores[strategy]["total"] += 1
            if inter.get("is_correct"):
                strategy_scores[strategy]["correct"] += 1

        effectiveness = {}
        for strategy, scores in strategy_scores.items():
            if scores["total"] > 0:
                effectiveness[strategy] = scores["correct"] / scores["total"]

        # Best and worst strategies
        sorted_strategies = sorted(effectiveness.items(), key=lambda x: x[1], reverse=True)
        best = [s[0] for s in sorted_strategies[:2]]
        worst = [s[0] for s in sorted_strategies[-2:] if s[1] < 0.5]

        # Profile confidence increases with more interactions
        confidence = min(1.0, len(student_interactions) / 50.0)

        updates.append(ProfileUpdate(
            student_id=sid,
            strategy_effectiveness=effectiveness,
            best_strategies=best,
            worst_strategies=worst,
            total_interactions=len(student_interactions),
            profile_confidence=confidence,
        ))

    return updates


def run_evolution_loop():
    """Run the full self-evolving intelligence loop."""
    print("=" * 60)
    print("Self-Evolving Intelligence Loop")
    print("=" * 60)

    # Load data
    print("\nLoading interaction data...")
    interactions = load_interactions()
    students = load_students()
    print(f"  Loaded {len(interactions)} interactions from {len(students)} students")

    if not interactions:
        print("No interaction data found. Run synthetic_student.py first.")
        return {"status": "empty", "reason": "no interaction data"}

    # 1. Strategy effectiveness
    print("\n1. Computing strategy effectiveness...")
    strategy_updates = compute_strategy_effectiveness(interactions)
    print(f"  Found {len(strategy_updates)} strategy-subject combinations")
    for u in sorted(strategy_updates, key=lambda x: x.lift_vs_baseline, reverse=True)[:5]:
        print(f"    {u.strategy_name} ({u.subject}): {u.mastery_rate:.1%} mastery, lift={u.lift_vs_baseline:+.2f}")

    # 2. Misconception discovery
    print("\n2. Discovering misconceptions...")
    misconceptions = discover_misconceptions(interactions)
    print(f"  Found {len(misconceptions)} misconception patterns")
    for m in misconceptions[:5]:
        print(f"    {m.misconception_key}: {m.occurrence_count} occurrences, {m.student_count} students")

    # 3. Content gap flagging
    print("\n3. Flagging content gaps...")
    gaps = flag_content_gaps(interactions)
    print(f"  Found {len(gaps)} content gaps")
    for g in gaps:
        print(f"    {g.subject}: {g.severity} ({g.avg_error_rate:.1%} error rate, {g.affected_student_count} students)")

    # 4. Profile updates
    print("\n4. Updating learning profiles...")
    profile_updates = update_profiles(students, interactions)
    print(f"  Updated {len(profile_updates)} student profiles")

    # Save all updates
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    output = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "input_interactions": len(interactions),
        "input_students": len(students),
        "strategy_effectiveness": [asdict_safe(u) for u in strategy_updates],
        "misconceptions": [asdict_safe(m) for m in misconceptions],
        "content_gaps": [asdict_safe(g) for g in gaps],
        "profile_updates": [asdict_safe(p) for p in profile_updates],
    }

    output_path = os.path.join(OUT_DIR, f"evolution_{timestamp}.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"\nSaved evolution output to {output_path}")

    # Also save a "latest" version
    latest_path = os.path.join(OUT_DIR, "latest.json")
    with open(latest_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"Saved latest snapshot to {latest_path}")

    print("\n" + "=" * 60)
    print("EVOLUTION LOOP COMPLETE")
    print(f"  Strategy updates: {len(strategy_updates)}")
    print(f"  Misconceptions: {len(misconceptions)}")
    print(f"  Content gaps: {len(gaps)}")
    print(f"  Profile updates: {len(profile_updates)}")
    print("=" * 60)
    return output


def asdict_safe(obj):
    """Convert a dataclass to dict safely."""
    if hasattr(obj, "__dict__"):
        return {k: v for k, v in obj.__dict__.items()}
    return str(obj)


if __name__ == "__main__":
    run_evolution_loop()
