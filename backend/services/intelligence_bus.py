r"""Intelligence Event Bus — closes the learning loop.

THE GAP THIS FIXES: The app collects data (wrong answers, hints,
misconceptions) but nothing READS it. The self-evolving loop writes
reports that no one consumes. The loop is open — data flows in,
nothing flows back out.

THE FIX: An in-memory event bus with subscriber callbacks.

    emit("wrong_answer", {...})  →  loop records it
                                  →  misconception counter updates
                                  →  remediation queue updates
                                  →  content gap counter updates

    At any time:
    intelligence.needs_remediation(student_id)  → [concept_ids]
    intelligence.concept_gaps()                 → [(concept, severity)]
    intelligence.best_strategy(concept)         → strategy_name

DESIGN:
  - In-memory (no Redis dependency — works offline, low traffic)
  - Append-only event log (JSONL file, survives restarts)
  - Subscribers registered at startup; failures are isolated
    (a broken subscriber NEVER breaks the main solve path)
  - Thread-safe
"""

from __future__ import annotations

import json
import os
import threading
import time
from collections import defaultdict, deque
from dataclasses import dataclass, field
from typing import Any, Callable

from backend.contracts import SolutionResult


# ═══════════════════════════════════════════════════════════════════
# Event Bus Core
# ═══════════════════════════════════════════════════════════════════

class IntelligenceBus:
    """Thread-safe in-memory event bus with append-only persistence."""

    def __init__(self, log_path: str = ""):
        self._lock = threading.RLock()
        self._subscribers: dict[str, list[Callable]] = defaultdict(list)
        self._events: deque = deque(maxlen=5000)  # in-memory recent events
        self._log_path = log_path
        if log_path:
            os.makedirs(os.path.dirname(log_path), exist_ok=True)

    # ── Publish ──────────────────────────────────────────────────
    def emit(self, event_type: str, payload: dict) -> None:
        """Emit an event. NEVER raises — subscriber failures are isolated."""
        event = {
            "type": event_type,
            "payload": payload,
            "ts": time.time(),
        }
        with self._lock:
            self._events.append(event)
            self._persist(event)
            subscribers = list(self._subscribers.get(event_type, []))
            subscribers += self._subscribers.get("*", [])  # wildcard

        # Call subscribers OUTSIDE the lock (they may be slow)
        for sub in subscribers:
            try:
                sub(event)
            except Exception:
                pass  # a broken subscriber never breaks the solve path

    def _persist(self, event: dict) -> None:
        """Append to JSONL log (best-effort, never raises)."""
        if not self._log_path:
            return
        try:
            with open(self._log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps(event, ensure_ascii=False) + "\n")
        except OSError:
            pass

    # ── Subscribe ────────────────────────────────────────────────
    def subscribe(self, event_type: str, callback: Callable) -> None:
        """Subscribe to events. Use '*' for all events."""
        with self._lock:
            self._subscribers[event_type].append(callback)

    # ── Query ────────────────────────────────────────────────────
    def recent_events(self, event_type: str = "", limit: int = 100) -> list[dict]:
        with self._lock:
            events = list(self._events)
        if event_type:
            events = [e for e in events if e["type"] == event_type]
        return events[-limit:]


# ═══════════════════════════════════════════════════════════════════
# The Intelligence State — what the bus feeds
# ═══════════════════════════════════════════════════════════════════

@dataclass
class ConceptStats:
    """Running stats per concept (problem type / node)."""
    attempts: int = 0
    correct: int = 0
    hint_requests: int = 0
    rung4_used: int = 0                # full-solution requests = struggling
    misconceptions: dict[str, int] = field(default_factory=dict)
    avg_time_ms: float = 0.0

    @property
    def error_rate(self) -> float:
        return 1.0 - (self.correct / self.attempts) if self.attempts else 0.0

    @property
    def struggling_score(self) -> float:
        """0-1: how much this concept is a problem for students."""
        if not self.attempts:
            return 0.0
        # High error rate + high full-solution usage = struggling
        return min(1.0, self.error_rate * 0.6 + (self.rung4_used / max(1, self.attempts)) * 0.4)


@dataclass
class StudentState:
    """Running state per student."""
    attempts: int = 0
    correct: int = 0
    misconceptions: dict[str, int] = field(default_factory=dict)  # key → count
    concepts_struggling: dict[str, float] = field(default_factory=dict)
    last_active: float = 0.0
    needs_remediation: list[str] = field(default_factory=list)


class IntelligenceState:
    """Aggregated state — THIS is what closes the loop.

    Query it at any time:
      state.needs_remediation(student_id) → concepts
      state.concept_gaps(min_attempts)    → [(concept, score, stats)]
      state.top_misconceptions()          → [(key, count)]
    """

    def __init__(self):
        self._lock = threading.RLock()
        self.concepts: dict[str, ConceptStats] = defaultdict(ConceptStats)
        self.students: dict[str, StudentState] = defaultdict(StudentState)
        self.strategy_wins: dict[str, int] = defaultdict(int)

    # ── Event handlers (subscribed to the bus) ───────────────────
    def on_solve(self, event: dict) -> None:
        """Solver-side events — track usage/time, NOT student correctness."""
        p = event["payload"]
        concept = p.get("problem_type_id", "")
        elapsed = p.get("elapsed_ms", 0)

        with self._lock:
            c = self.concepts[concept]
            c.avg_time_ms = (c.avg_time_ms * max(1, c.attempts) + elapsed) / (c.attempts + 1)

    def on_student_answer(self, event: dict) -> None:
        """Student-side events — track correctness and struggling.

        This is the event that matters for remediation/gaps.
        Emitted by the tutor/quiz flow when a student answers.
        """
        p = event["payload"]
        concept = p.get("problem_type_id", "")
        student = p.get("student_id", "")
        correct = bool(p.get("correct"))

        with self._lock:
            c = self.concepts[concept]
            c.attempts += 1
            if correct:
                c.correct += 1

            if student:
                s = self.students[student]
                s.attempts += 1
                if correct:
                    s.correct += 1
                s.last_active = time.time()
                # Track struggling per concept per student (EMA)
                prev = s.concepts_struggling.get(concept, 0.0)
                s.concepts_struggling[concept] = prev * 0.7 + (0.0 if correct else 1.0) * 0.3

    def on_hint(self, event: dict) -> None:
        p = event["payload"]
        concept = p.get("problem_type_id", "")
        student = p.get("student_id", "")
        rung = p.get("rung", 1)
        misconception = p.get("misconception", "")

        with self._lock:
            c = self.concepts[concept]
            c.hint_requests += 1
            if rung >= 4:
                c.rung4_used += 1
            if misconception:
                c.misconceptions[misconception] = c.misconceptions.get(misconception, 0) + 1

            if student:
                s = self.students[student]
                if misconception:
                    s.misconceptions[misconception] = s.misconceptions.get(misconception, 0) + 1

    # ── Queries (the feedback the app consumes) ──────────────────
    def needs_remediation(self, student_id: str, threshold: float = 0.6) -> list[str]:
        """Concepts where this student is struggling (EMA ≥ threshold)."""
        with self._lock:
            s = self.students.get(student_id)
            if not s:
                return []
            concepts = [
                c for c, score in s.concepts_struggling.items()
                if score >= threshold and s.attempts >= 3
            ]
            # Update the flag
            s.needs_remediation = concepts
            return sorted(concepts)

    def concept_gaps(self, min_attempts: int = 5, min_score: float = 0.5) -> list[dict]:
        """Concepts where students collectively struggle → content gaps."""
        with self._lock:
            gaps = []
            for concept, c in self.concepts.items():
                if c.attempts >= min_attempts and c.struggling_score >= min_score:
                    gaps.append({
                        "concept": concept,
                        "struggling_score": round(c.struggling_score, 2),
                        "error_rate": round(c.error_rate, 2),
                        "attempts": c.attempts,
                        "full_solution_rate": round(c.rung4_used / max(1, c.attempts), 2),
                        "top_misconception": max(c.misconceptions, key=c.misconceptions.get, default=""),
                    })
            return sorted(gaps, key=lambda g: g["struggling_score"], reverse=True)

    def top_misconceptions(self, limit: int = 10) -> list[tuple[str, int]]:
        """Most common misconceptions across all concepts."""
        with self._lock:
            counts: dict[str, int] = defaultdict(int)
            for c in self.concepts.values():
                for key, n in c.misconceptions.items():
                    counts[key] += n
            return sorted(counts.items(), key=lambda x: x[1], reverse=True)[:limit]

    def snapshot(self) -> dict:
        """Full state snapshot for the /v2/intelligence endpoint."""
        with self._lock:
            return {
                "concepts_tracked": len(self.concepts),
                "students_tracked": len(self.students),
                "total_attempts": sum(c.attempts for c in self.concepts.values()),
                "concept_gaps": self.concept_gaps(),
                "top_misconceptions": self.top_misconceptions(),
            }


# ═══════════════════════════════════════════════════════════════════
# Wiring — the singleton that ties it together
# ═══════════════════════════════════════════════════════════════════

_bus: IntelligenceBus | None = None
_state: IntelligenceState | None = None
_wired = False
_wire_lock = threading.Lock()


def get_intelligence() -> tuple[IntelligenceBus, IntelligenceState]:
    """Get the wired bus + state. Subscribes state handlers once."""
    global _bus, _state, _wired
    with _wire_lock:
        if _bus is None:
            log_path = os.path.join(
                os.environ.get("DREAM_DATA", r"D:\platform\cbse_data"),
                "intelligence_updates", "events.jsonl",
            )
            _bus = IntelligenceBus(log_path=log_path)
        if _state is None:
            _state = IntelligenceState()
        if not _wired:
            _bus.subscribe("solve_attempt", _state.on_solve)
            _bus.subscribe("solve_success", _state.on_solve)
            _bus.subscribe("student_answer", _state.on_student_answer)
            _bus.subscribe("hint_request", _state.on_hint)
            _wired = True
    return _bus, _state


def emit_solve(result: SolutionResult, student_id: str = "") -> None:
    """Convenience: emit a SOLVER event from a facade result.

    Note: this tracks solver usage/time, NOT student correctness.
    Use emit_student_answer() for student outcomes.
    """
    bus, _ = get_intelligence()
    bus.emit("solve_attempt" if not result.success else "solve_success", {
        "student_id": student_id,
        "problem_type_id": result.problem_type_id,
        "success": result.success,
        "verified": result.verified,
        "elapsed_ms": result.elapsed_ms,
        "solver_tier": result.solver_tier.value,
        "error_code": result.error_code,
        "misconceptions": result.misconceptions_detected,
    })


def emit_student_answer(problem_type_id: str, correct: bool,
                         student_id: str = "") -> None:
    """Convenience: emit a STUDENT answer event.

    This is what drives remediation and gap detection.
    The tutor/quiz flow calls this after grading a student's answer.
    """
    bus, _ = get_intelligence()
    bus.emit("student_answer", {
        "student_id": student_id,
        "problem_type_id": problem_type_id,
        "correct": correct,
    })


def emit_hint(problem_type_id: str, rung: int, misconception: str = "",
              student_id: str = "") -> None:
    """Convenience: emit a hint event from the hint ladder."""
    bus, _ = get_intelligence()
    bus.emit("hint_request", {
        "student_id": student_id,
        "problem_type_id": problem_type_id,
        "rung": rung,
        "misconception": misconception,
    })
