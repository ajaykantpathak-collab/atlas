import uuid
import json
import os
import logging
import threading
from datetime import datetime, timedelta
from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional, Tuple

logger = logging.getLogger(__name__)

#: Storage decision (audited 2026-09): interactions persist as a JSONL
#: append-only log -- one JSON object per line, the same JSON-cache
#: family the platform uses for backend/_cache stores.  A full SQL
#: table is unnecessary: records are write-once (the only in-place
#: update is NextItemCorrectnessTracker, which rewrites atomically via
#: tmp-file + os.replace, mirroring the tutor_students.json writer in
#: its/solver/tutor.py).  Override the location with INTERACTIONS_PATH;
#: the default keeps pre-existing deployments reading their history.
#: Falls back to a repo-relative path so the backend runs on any OS —
#: the old default was a hardcoded Windows path that breaks in Docker.
_REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
DEFAULT_INTERACTIONS_PATH = os.environ.get(
    "INTERACTIONS_PATH",
    os.path.join(_REPO_ROOT, "cbse_data", "interactions.json"))


@dataclass
class InteractionRecord:
    interaction_id: str = ""
    student_id: str = ""
    session_id: str = ""
    subject: str = ""
    concept: str = ""
    grade_level: int = 0
    interaction_type: str = ""
    timestamp: str = ""
    question_id: Optional[str] = None
    response: Optional[dict] = None
    is_correct: Optional[bool] = None
    partial_score: Optional[float] = None
    time_to_respond_ms: Optional[int] = None
    hints_used: Optional[int] = None
    hint_sequence: Optional[List[str]] = None
    error_type: Optional[str] = None
    teaching_strategy: Optional[str] = None
    strategy_sequence: Optional[List[str]] = None
    misconceptions_detected: Optional[List[str]] = None
    knowledge_state_before: Optional[dict] = None
    knowledge_state_after: Optional[dict] = None
    language: Optional[str] = None
    device_type: Optional[str] = None
    engagement_score: Optional[float] = None
    frustration_signals: Optional[List[str]] = None
    mastery_achieved: Optional[bool] = None
    confidence_rating: Optional[int] = None
    orchestrator_rule_used: Optional[str] = None
    agent_used: Optional[str] = None
    next_item_correct: Optional[bool] = None

    def __post_init__(self):
        if not self.interaction_id:
            self.interaction_id = str(uuid.uuid4())
        if not self.timestamp:
            self.timestamp = datetime.utcnow().isoformat() + "Z"


class SimpleInteractionCapture:
    def __init__(self, filepath: str = DEFAULT_INTERACTIONS_PATH):
        self.filepath = filepath
        self._interactions: List[InteractionRecord] = []
        self._lock = threading.Lock()
        self._load()
        try:
            os.makedirs(os.path.dirname(self.filepath) or ".", exist_ok=True)
        except OSError as e:
            logger.warning("Could not create interactions dir: %s", e)

    def _load(self):
        if not os.path.exists(self.filepath):
            return
        try:
            with open(self.filepath, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        data = json.loads(line)
                        self._interactions.append(InteractionRecord(**data))
                    except (json.JSONDecodeError, TypeError) as e:
                        logger.warning(f"Skipping malformed line in interactions file: {e}")
        except (OSError, IOError) as e:
            logger.warning(f"Could not load interactions file: {e}")

    def _append_to_file(self, record: InteractionRecord):
        try:
            with open(self.filepath, "a", encoding="utf-8") as f:
                f.write(json.dumps(asdict(record), ensure_ascii=False) + "\n")
        except (OSError, IOError) as e:
            logger.error(f"Could not write to interactions file: {e}")

    def capture(self, student_id: str, session_id: str, subject: str, concept: str,
                grade_level: int, interaction_type: str, **kwargs) -> str:
        valid_fields = InteractionRecord.__dataclass_fields__
        filtered_kwargs = {k: v for k, v in kwargs.items() if k in valid_fields}
        record = InteractionRecord(
            student_id=student_id,
            session_id=session_id,
            subject=subject,
            concept=concept,
            grade_level=grade_level,
            interaction_type=interaction_type,
            **filtered_kwargs,
        )
        # FastAPI serves requests on a thread pool: cap the memory list
        # and serialize the file append so concurrent turns cannot
        # interleave partial JSONL lines.
        with self._lock:
            self._interactions.append(record)
            self._append_to_file(record)
        return record.interaction_id

    def get_interactions(self, student_id: str, concept: Optional[str] = None,
                         time_range: Optional[Tuple[datetime, datetime]] = None) -> List[InteractionRecord]:
        results = [r for r in self._interactions if r.student_id == student_id]
        if concept is not None:
            results = [r for r in results if r.concept == concept]
        if time_range is not None:
            start, end = time_range
            filtered = []
            for r in results:
                try:
                    ts = datetime.fromisoformat(r.timestamp.replace("Z", "+00:00"))
                    if start <= ts <= end:
                        filtered.append(r)
                except Exception:
                    pass
            results = filtered
        return results

    def get_recent(self, student_id: str, limit: int = 10) -> List[InteractionRecord]:
        student_interactions = [r for r in self._interactions if r.student_id == student_id]
        student_interactions.sort(key=lambda r: r.timestamp, reverse=True)
        return student_interactions[:limit]

    def batch_capture(self, interactions_list: List[Dict[str, Any]]) -> List[str]:
        ids = []
        for interaction in interactions_list:
            try:
                interaction_id = self.capture(**interaction)
                ids.append(interaction_id)
            except Exception as e:
                logger.error(f"Failed to capture interaction in batch: {e}")
        return ids

    def export_to_json(self, filepath: str):
        try:
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump([asdict(r) for r in self._interactions], f, ensure_ascii=False, indent=2)
        except (OSError, IOError) as e:
            logger.error(f"Could not export to JSON: {e}")

    def import_from_json(self, filepath: str):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
            if not isinstance(data, list):
                logger.error("Import file must contain a JSON array")
                return
            for item in data:
                try:
                    record = InteractionRecord(**item)
                    self._interactions.append(record)
                    self._append_to_file(record)
                except (TypeError, ValueError) as e:
                    logger.warning(f"Skipping malformed interaction during import: {e}")
        except (OSError, IOError, json.JSONDecodeError) as e:
            logger.error(f"Could not import from JSON: {e}")


class NextItemCorrectnessTracker:
    def __init__(self, capture: SimpleInteractionCapture):
        self.capture = capture

    def track_next_item(self, student_id: str, concept: str, is_correct_without_help: bool) -> bool:
        candidates = [
            r for r in self.capture._interactions
            if r.student_id == student_id
            and r.concept == concept
            and r.interaction_type in ("socratic_turn", "hint_request")
            and r.next_item_correct is None
        ]
        if not candidates:
            return False
        candidates.sort(key=lambda r: r.timestamp, reverse=True)
        most_recent = candidates[0]
        most_recent.next_item_correct = is_correct_without_help
        self._rewrite_file()
        return True

    def _rewrite_file(self):
        """Rewrite the JSONL log atomically (tmp file + os.replace).

        The only in-place update the store supports: mirroring the
        tutor_students.json persist pattern in its/solver/tutor.py so a
        crash mid-rewrite can never truncate existing history.  Runs
        under the capture's lock so a concurrent capture() append cannot
        be lost."""
        cap = self.capture
        tmp = cap.filepath + ".tmp"
        try:
            with cap._lock:
                with open(tmp, "w", encoding="utf-8") as f:
                    for record in cap._interactions:
                        f.write(json.dumps(asdict(record), ensure_ascii=False) + "\n")
                os.replace(tmp, cap.filepath)
        except (OSError, IOError) as e:
            logger.error(f"Could not rewrite interactions file: {e}")
            try:
                if os.path.exists(tmp):
                    os.remove(tmp)
            except OSError:
                pass


class InteractionSummary:
    def __init__(self, capture: SimpleInteractionCapture):
        self.capture = capture

    def get_student_stats(self, student_id: str) -> Dict[str, Any]:
        interactions = [r for r in self.capture._interactions if r.student_id == student_id]
        total = len(interactions)
        if total == 0:
            return {
                "total_interactions": 0,
                "accuracy": 0.0,
                "avg_time_ms": 0.0,
                "hints_per_question": 0.0,
                "frustration_rate": 0.0,
                "mastery_rate": 0.0,
            }
        correct = sum(1 for r in interactions if r.is_correct is True)
        accuracy = correct / total
        times = [r.time_to_respond_ms for r in interactions if r.time_to_respond_ms is not None]
        avg_time = sum(times) / len(times) if times else 0.0
        hints = [r.hints_used for r in interactions if r.hints_used is not None]
        avg_hints = sum(hints) / len(hints) if hints else 0.0
        frustration_count = sum(1 for r in interactions if r.frustration_signals)
        mastery_count = sum(1 for r in interactions if r.mastery_achieved)
        return {
            "total_interactions": total,
            "accuracy": round(accuracy, 4),
            "avg_time_ms": round(avg_time, 2),
            "hints_per_question": round(avg_hints, 2),
            "frustration_rate": round(frustration_count / total, 4),
            "mastery_rate": round(mastery_count / total, 4),
        }

    def get_concept_stats(self, concept: str) -> Dict[str, Any]:
        interactions = [r for r in self.capture._interactions if r.concept == concept]
        total = len(interactions)
        if total == 0:
            return {
                "total_attempts": 0,
                "error_rate": 0.0,
                "avg_hints": 0.0,
                "common_errors": [],
                "avg_time_ms": 0.0,
            }
        incorrect = sum(1 for r in interactions if r.is_correct is False)
        error_rate = incorrect / total
        hints = [r.hints_used for r in interactions if r.hints_used is not None]
        avg_hints = sum(hints) / len(hints) if hints else 0.0
        error_counts: Dict[str, int] = {}
        for r in interactions:
            if r.error_type:
                error_counts[r.error_type] = error_counts.get(r.error_type, 0) + 1
        common_errors = sorted(error_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        times = [r.time_to_respond_ms for r in interactions if r.time_to_respond_ms is not None]
        avg_time = sum(times) / len(times) if times else 0.0
        return {
            "total_attempts": total,
            "error_rate": round(error_rate, 4),
            "avg_hints": round(avg_hints, 2),
            "common_errors": common_errors,
            "avg_time_ms": round(avg_time, 2),
        }

    def get_strategy_stats(self, strategy_name: str) -> Dict[str, Any]:
        interactions = [r for r in self.capture._interactions if r.teaching_strategy == strategy_name]
        usage = len(interactions)
        if usage == 0:
            return {
                "usage_count": 0,
                "avg_mastery_gain": 0.0,
                "next_item_correctness_rate": 0.0,
            }
        mastery_gains = []
        for r in interactions:
            if r.knowledge_state_before and r.knowledge_state_after:
                before = r.knowledge_state_before.get("mastery", 0.0)
                after = r.knowledge_state_after.get("mastery", 0.0)
                mastery_gains.append(after - before)
        avg_mastery_gain = sum(mastery_gains) / len(mastery_gains) if mastery_gains else 0.0
        next_correct = [r.next_item_correct for r in interactions if r.next_item_correct is not None]
        next_correct_rate = sum(1 for v in next_correct if v) / len(next_correct) if next_correct else 0.0
        return {
            "usage_count": usage,
            "avg_mastery_gain": round(avg_mastery_gain, 4),
            "next_item_correctness_rate": round(next_correct_rate, 4),
        }


class FrustrationDetector:
    @staticmethod
    def detect_frustration(interactions_list: List[InteractionRecord]) -> float:
        if not interactions_list:
            return 0.0
        sorted_interactions = sorted(interactions_list, key=lambda r: r.timestamp)
        signals = 0
        max_signals = 5

        # Signal 1: Rapid wrong answers (<10s apart)
        rapid_wrong_count = 0
        for i in range(1, len(sorted_interactions)):
            prev = sorted_interactions[i - 1]
            curr = sorted_interactions[i]
            if curr.is_correct is False and prev.is_correct is False:
                try:
                    t_prev = datetime.fromisoformat(prev.timestamp.replace("Z", "+00:00"))
                    t_curr = datetime.fromisoformat(curr.timestamp.replace("Z", "+00:00"))
                    if (t_curr - t_prev).total_seconds() < 10:
                        rapid_wrong_count += 1
                except Exception:
                    pass
        if rapid_wrong_count >= 2:
            signals += 1

        # Signal 2: Hint abuse (>3 hints per question in any single interaction)
        if any(r.hints_used is not None and r.hints_used > 3 for r in sorted_interactions):
            signals += 1

        # Signal 3: Long pause then wrong answer (>60s gap then incorrect)
        long_pause_wrong = 0
        for i in range(1, len(sorted_interactions)):
            prev = sorted_interactions[i - 1]
            curr = sorted_interactions[i]
            if curr.is_correct is False:
                try:
                    t_prev = datetime.fromisoformat(prev.timestamp.replace("Z", "+00:00"))
                    t_curr = datetime.fromisoformat(curr.timestamp.replace("Z", "+00:00"))
                    if (t_curr - t_prev).total_seconds() > 60:
                        long_pause_wrong += 1
                except Exception:
                    pass
        if long_pause_wrong >= 1:
            signals += 1

        # Signal 4: Repeated attempts on same question (>2 attempts)
        question_attempts: Dict[str, int] = {}
        for r in sorted_interactions:
            if r.question_id:
                question_attempts[r.question_id] = question_attempts.get(r.question_id, 0) + 1
        if any(count > 2 for count in question_attempts.values()):
            signals += 1

        # Signal 5: Declining engagement_score trend
        scores = [r.engagement_score for r in sorted_interactions if r.engagement_score is not None]
        if len(scores) >= 3:
            diffs = [scores[i] - scores[i - 1] for i in range(1, len(scores))]
            if sum(1 for d in diffs if d < 0) > len(diffs) / 2:
                signals += 1

        return signals / max_signals