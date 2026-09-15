"""
Class 1 Geography Solver
========================
Tracks mastery across 4 prerequisite-chained nodes.

Node topology:
    c1_geo_001 (Earth) ──► c1_geo_002 (Sun) ──► c1_geo_003 (Day/Night) ──► c1_geo_004 (Sky)

No LLM in computation. Pure Python + SymPy for symbolic verification.
"""

from __future__ import annotations

import hashlib
import json
import math
import random
import re
import unicodedata
from dataclasses import dataclass, field, asdict
from enum import Enum
from typing import Any

# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

class NodeID:
    c1_geo_001 = "c1_geo_001"
    c1_geo_002 = "c1_geo_002"
    c1_geo_003 = "c1_geo_003"
    c1_geo_004 = "c1_geo_004"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"


class ExamRelevance(Enum):
    SCHOOL = "School_Only"


class CognitiveLevel(Enum):
    REMEMBER = "Remember"
    UNDERSTAND = "Understand"


# ── question bank (hard-coded from node metadata, no external LLM) ────────

NODE_META: dict[str, dict] = {
    NodeID.c1_geo_001: {
        "label": "Earth is our home",
        "section": "The World Around Me (EVS Theme 14)",
        "cognitive": "Remember",
        "difficulty": "Easy",
        "vocabulary": ["earth", "home", "land", "water", "air",
                       "plants", "animals", "surroundings", "litter",
                       "take care"],
        "scope_teach": [
            "Earth as our home",
            "land and water on Earth",
            "air to breathe",
            "plants and animals",
            "caring for Earth (no littering, planting trees)",
            "immediate surroundings (home, school, garden)",
        ],
        "scope_avoid": [
            "continents", "oceans", "countries", "maps",
            "rotation/revolution", "solar system",
        ],
        "prereq": None,
        "is_root": True,
        "spiral_topic": "earth-introduction",
    },
    NodeID.c1_geo_002: {
        "label": "Sun as source of light",
        "section": "The World Around Me (EVS Theme 14)",
        "cognitive": "Remember",
        "difficulty": "Easy",
        "vocabulary": ["sun", "light", "heat", "warmth", "sky",
                       "day", "grow", "bright", "far", "big"],
        "scope_teach": [
            "Sun as source of light and heat",
            "Sun in the sky during day",
            "Sun helps plants grow",
            "Sun gives warmth",
            "Do not look directly at sun",
            "Simple observation of sun at morning/noon/evening",
        ],
        "scope_avoid": [
            "sun as a star", "solar system", "nuclear fusion",
            "distance in kilometres", "rotation causing day-night",
        ],
        "prereq": NodeID.c1_geo_001,
        "is_root": False,
        "spiral_topic": "sun-and-light",
    },
    NodeID.c1_geo_003: {
        "label": "Day and night",
        "section": "The World Around Me (EVS Theme 14)",
        "cognitive": "Understand",
        "difficulty": "Easy",
        "vocabulary": ["day", "night", "bright", "dark", "sun",
                       "moon", "stars", "morning", "afternoon",
                       "evening", "rise", "set"],
        "scope_teach": [
            "Day = sun visible (bright), Night = sun not visible (dark)",
            "Moon and stars visible at night",
            "Day activities (school, play)",
            "Night activities (sleep, rest)",
            "Sun rises morning, sets evening",
            "Time words: morning, afternoon, evening, night",
        ],
        "scope_avoid": [
            "Earth rotation", "time zones", "24-hour cycle",
            "axis", "hemisphere",
        ],
        "prereq": NodeID.c1_geo_002,
        "is_root": False,
        "spiral_topic": "day-night-cycle",
    },
    NodeID.c1_geo_004: {
        "label": "Sky at different times",
        "section": "The World Around Me (EVS Theme 14)",
        "cognitive": "Understand",
        "difficulty": "Easy",
        "vocabulary": ["sky", "morning", "noon", "evening",
                       "sun", "clouds", "stars", "moon",
                       "blue", "orange", "dark", "bright"],
        "scope_teach": [
            "Sky looks different at different times",
            "Sky is blue/bright during day",
            "Sky has orange/red at sunrise and sunset",
            "Sky becomes dark at night with stars",
            "Clouds in the sky",
        ],
        "scope_avoid": [
            "atmospheric scattering", "weather systems",
            "constellations", "planets",
        ],
        "prereq": NodeID.c1_geo_003,
        "is_root": False,
        "spiral_topic": "sky-observation",
    },
}

# ── prerequisite graph ─────────────────────────────────────────────────────

PREREQ_GRAPH: dict[str, str | None] = {
    NodeID.c1_geo_001: None,
    NodeID.c1_geo_002: NodeID.c1_geo_001,
    NodeID.c1_geo_003: NodeID.c1_geo_002,
    NodeID.c1_geo_004: NodeID.c1_geo_003,
}


# ── answer-key definitions per node ─────────────────────────────────────────

# Each key: canonical answer tokens.  Exact-match, case-insensitive, ASCII-folded.
# MCQ options are embedded in the question text; solver only validates the selected index.

ANSWER_KEYS: dict[str, dict[str, set[str]]] = {
    # ── c1_geo_001 ─────────────────────────────────────────────────────────
    NodeID.c1_geo_001: {
        "earth_home": {"earth", "our home", "home", "planet earth"},
        "earth_land": {"land"},
        "earth_water": {"water", "rivers", "ponds", "sea"},
        "earth_air": {"air", "breathe", "breathe air"},
        "earth_plants_animals": {"plants", "animals"},
        "earth_surroundings": {"home", "school", "garden", "playground"},
        "earth_care_1": {"not litter", "no litter", "dont litter",
                         "do not litter", "keep clean", "clean"},
        "earth_care_2": {"plant trees", "planting trees", "trees"},
        "earth_care_3": {"keep clean", "clean surroundings"},
    },
    # ── c1_geo_002 ─────────────────────────────────────────────────────────
    NodeID.c1_geo_002: {
        "sun_light": {"light"},
        "sun_heat": {"heat", "warmth", "warm"},
        "sun_sky_day": {"sky", "day", "daytime"},
        "sun_grow": {"grow", "plants grow", "helps grow"},
        "sun_morning": {"morning"},
        "sun_noon": {"noon", "midday"},
        "sun_evening": {"evening"},
        "sun_no_look": {"no", "dont", "do not", "never", "not look"},
    },
    # ── c1_geo_003 ─────────────────────────────────────────────────────────
    NodeID.c1_geo_003: {
        "day_sun": {"sun", "sunshine", "bright"},
        "night_dark": {"dark", "no sun", "sun not visible"},
        "night_moon": {"moon"},
        "night_stars": {"stars"},
        "activity_day_school": {"school", "go to school"},
        "activity_day_play": {"play", "playing"},
        "activity_night_sleep": {"sleep", "sleeping"},
        "activity_night_rest": {"rest", "resting"},
        "time_morning": {"morning"},
        "time_afternoon": {"afternoon"},
        "time_evening": {"evening"},
        "time_night": {"night"},
        "sequence_1": {"morning", "sunrise"},
        "sequence_2": {"afternoon", "noon"},
        "sequence_3": {"evening", "sunset"},
        "sequence_4": {"night"},
    },
    # ── c1_geo_004 ─────────────────────────────────────────────────────────
    NodeID.c1_geo_004: {
        "sky_day_blue": {"blue", "light blue"},
        "sky_sunrise": {"orange", "red", "pink", "orange red"},
        "sky_sunset": {"orange", "red", "pink"},
        "sky_night_dark": {"dark", "black"},
        "sky_night_stars": {"stars"},
        "sky_clouds": {"clouds", "cloud"},
        "sky_morning": {"bright", "light blue", "blue"},
        "sky_evening": {"dark", "orange", "red"},
    },
}

# ── MCQ option pools (used by the question generator, not the solver) ────────

MCQ_OPTIONS: dict[str, dict[str, list[str]]] = {
    NodeID.c1_geo_001: {
        "earth_home": {
            "correct": "Earth",
            "distractors": ["Moon", "Sun", "Mars"],
        },
        "earth_water": {
            "correct": "Water",
            "distractors": ["Sand", "Stone", "Grass"],
        },
        "earth_land": {
            "correct": "Land",
            "distractors": ["Water", "Sky", "Air"],
        },
        "earth_care": {
            "correct": "Plant trees",
            "distractors": ["Throw litter", "Waste water", "Break plants"],
        },
        "earth_surroundings": {
            "correct": "Garden",
            "distractors": ["Ocean", "Mountain", "Cloud"],
        },
    },
    NodeID.c1_geo_002: {
        "sun_gives": {
            "correct": "Light and heat",
            "distractors": ["Sound", "Water", "Wind"],
        },
        "sun_sky": {
            "correct": "Day",
            "distractors": ["Night", "Evening only", "Never"],
        },
        "sun_helps": {
            "correct": "Plants grow",
            "distractors": ["Animals sleep", "Rocks melt", "Waves form"],
        },
        "sun_safe": {
            "correct": "No, never look directly at the sun",
            "distractors": ["Yes, always", "Only at noon", "Only with one eye"],
        },
        "sun_time": {
            "correct": "Morning, noon, and evening",
            "distractors": ["Only at night", "Only in winter", "Never seen"],
        },
    },
    NodeID.c1_geo_003: {
        "day_night_define": {
            "correct": "Day is when the sun is in the sky",
            "distractors": [
                "Day is when the moon is out",
                "Day is when it rains",
                "Day is when stars are visible",
            ],
        },
        "night_see": {
            "correct": "Moon and stars",
            "distractors": ["Sun and clouds", "Rainbow", "Birds only"],
        },
        "activity_day": {
            "correct": "Going to school",
            "distractors": ["Sleeping", "Dreaming", "Wearing pyjamas"],
        },
        "activity_night": {
            "correct": "Sleeping",
            "distractors": ["Going to school", "Playing cricket", "Eating lunch"],
        },
        "sun_movement": {
            "correct": "Rises in the morning and sets in the evening",
            "distractors": [
                "Stays in one place all day",
                "Moves from west to east",
                "Comes out only at night",
            ],
        },
        "time_order": {
            "correct": "Morning → Afternoon → Evening → Night",
            "distractors": [
                "Night → Evening → Afternoon → Morning",
                "Afternoon → Morning → Night → Evening",
                "Evening → Morning → Night → Afternoon",
            ],
        },
    },
    NodeID.c1_geo_004: {
        "sky_day": {
            "correct": "Blue and bright",
            "distractors": ["Dark with stars", "Red and orange", "Green and yellow"],
        },
        "sky_sunrise": {
            "correct": "Orange and red",
            "distractors": ["Dark blue", "Green", "Purple and white"],
        },
        "sky_night": {
            "correct": "Dark with stars and moon",
            "distractors": ["Bright blue", "Orange and red", "Green"],
        },
        "sky_clouds": {
            "correct": "White fluffy clouds",
            "distractors": ["Black holes", "Green leaves", "Red balls"],
        },
        "sky_evening": {
            "correct": "It becomes darker",
            "distractors": [
                "It becomes brighter than noon",
                "It turns green",
                "Nothing changes",
            ],
        },
    },
}


# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------

def _normalise(text: str) -> str:
    """Lower-case, strip accents/punctuation, collapse whitespace."""
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r"[^a-z0-9\s]", " ", text.lower())
    return " ".join(text.split())


def _tokens(text: str) -> set[str]:
    return set(_normalise(text).split())


def _seed_rng(seed: int | None) -> random.Random:
    """Return a Random instance bound to seed."""
    return random.Random(seed)


# ---------------------------------------------------------------------------
# Mastery tracker
# ---------------------------------------------------------------------------

@dataclass
class SessionState:
    """Mutable per-session state persisted across solver calls."""

    node_scores: dict[str, float] = field(default_factory=dict)
    # node_id -> mastery fraction in [0, 1]
    node_attempts: dict[str, int] = field(default_factory=dict)
    unlocked: set[str] = field(default_factory=lambda: {NodeID.c1_geo_001})
    # root is always unlocked

    def mastery(self, node_id: str) -> float:
        return self.node_scores.get(node_id, 0.0)

    def record(self, node_id: str, correct: bool) -> None:
        """Update mastery using exponential moving average."""
        self.node_attempts[node_id] = self.node_attempts.get(node_id, 0) + 1
        reward = 1.0 if correct else 0.0
        prev = self.node_scores.get(node_id, 0.0)
        # EMA with alpha = 0.3 — quick ramp for young learners
        new_score = 0.3 * reward + 0.7 * prev
        self.node_scores[node_id] = new_score
        # unlock next node if current >= 0.6 and prereq unlocked
        if new_score >= 0.6:
            nxt = _next_node(node_id)
            if nxt and _prereq_unlocked(nxt, self):
                self.unlocked.add(nxt)

    def to_dict(self) -> dict:
        return {
            "node_scores": self.node_scores,
            "node_attempts": self.node_attempts,
            "unlocked": sorted(self.unlocked),
        }


def _prereq(node_id: str) -> str | None:
    return PREREQ_GRAPH.get(node_id)


def _next_node(node_id: str) -> str | None:
    """Return the child node (there is at most one)."""
    for child, prereq in PREREQ_GRAPH.items():
        if prereq == node_id:
            return child
    return None


def _prereq_unlocked(node_id: str, state: SessionState) -> bool:
    prereq = _prereq(node_id)
    return prereq is None or prereq in state.unlocked


# ---------------------------------------------------------------------------
# Answer evaluation
# ---------------------------------------------------------------------------

def _mcq_correct(selected_index: int, correct_index: int) -> bool:
    return selected_index == correct_index


def evaluate_answer(
    node_id: str,
    question_id: str,
    user_answer: str | int,
    *,
    state: SessionState | None = None,
) -> dict:
    """
    Evaluate a single answer and return a structured result.

    Parameters
    ----------
    node_id   : which node this question belongs to
    question_id: question sub-type key (must be in ANSWER_KEYS[node_id])
    user_answer: for SAQ — a text string; for MCQ — integer index (0-based)
    state     : optional SessionState to update in place

    Returns
    -------
    dict with keys: correct, score, feedback, mastery_after, unlocked_next
    """
    meta = NODE_META[node_id]
    key_map = ANSWER_KEYS[node_id]

    if question_id not in key_map:
        return {
            "correct": False,
            "score": 0.0,
            "feedback": f"Unknown question_id '{question_id}'. "
                        f"Valid IDs: {sorted(key_map.keys())}",
            "mastery_after": None,
            "unlocked_next": None,
        }

    correct_tokens: set[str] = key_map[question_id]

    # ── MCQ path ───────────────────────────────────────────────────────────
    if isinstance(user_answer, int):
        mcq_pool = MCQ_OPTIONS.get(node_id, {}).get(question_id)
        if mcq_pool is None:
            return _error_result("MCQ options not defined for this question_id.")
        correct_idx = mcq_pool["distractors"].index(
            mcq_pool["correct"]
        )  # position of correct in combined list
        # correct is always index 3 (last) in our convention — verify
        all_opts = mcq_pool["distractors"][:3] + [mcq_pool["correct"]]
        correct_idx = all_opts.index(mcq_pool["correct"])
        is_correct = _mcq_correct(user_answer, correct_idx)
        feedback = (
            "Correct! Well done."
            if is_correct
            else f"Not quite. The right answer is: {mcq_pool['correct']}."
        )
        if state:
            state.record(node_id, is_correct)
        return _build_result(is_correct, feedback, node_id, state)

    # ── SAQ path ───────────────────────────────────────────────────────────
    ans_norm = _normalise(user_answer)
    ans_tokens = _tokens(user_answer)

    # Match: at least one canonical token present in user's tokens
    hit = bool(ans_tokens & correct_tokens)
    # Also accept near-miss: full answer normalised equals any canonical token
    if not hit and ans_norm in correct_tokens:
        hit = True

    is_correct = hit
    feedback = _generate_feedback(node_id, question_id, is_correct, correct_tokens)

    if state:
        state.record(node_id, is_correct)

    return _build_result(is_correct, feedback, node_id, state)


def _generate_feedback(
    node_id: str, question_id: str, correct: bool, correct_tokens: set[str]
) -> str:
    positive = {
        NodeID.c1_geo_001: "Great! Earth truly is our beautiful home.",
        NodeID.c1_geo_002: "Exactly! The sun lights and warms our world.",
        NodeID.c1_geo_003: "Perfect! You know about day and night.",
        NodeID.c1_geo_004: "Wonderful! The sky changes colours throughout the day.",
    }
    negative = {
        NodeID.c1_geo_001: "Think again — what do we call the planet we live on?",
        NodeID.c1_geo_002: "Try to remember — what do we see in the sky that gives us light?",
        NodeID.c1_geo_003: "Recall — what do we see in the sky during the day?",
        NodeID.c1_geo_004: "Look up at the sky — what colour is it during the day?",
    }
    hint = f" Hint: look for words like '{max(correct_tokens, key=len)}'."
    if correct:
        return positive.get(node_id, "Correct!")
    return negative.get(node_id, "Not quite right.") + hint


def _build_result(
    is_correct: bool, feedback: str, node_id: str, state: SessionState | None
) -> dict:
    mastery_after = state.mastery(node_id) if state else None
    nxt = _next_node(node_id)
    unlocked_next = (
        nxt in state.unlocked if (state and nxt) else None
    )
    return {
        "correct": is_correct,
        "score": 1.0 if is_correct else 0.0,
        "feedback": feedback,
        "mastery_after": round(mastery_after, 3) if mastery_after is not None else None,
        "unlocked_next": unlocked_next,
    }


def _error_result(msg: str) -> dict:
    return {
        "correct": False,
        "score": 0.0,
        "feedback": msg,
        "mastery_after": None,
        "unlocked_next": None,
    }


# ---------------------------------------------------------------------------
# Progress report
# ---------------------------------------------------------------------------

def progress_report(state: SessionState) -> dict:
    """Return per-node mastery summary with prerequisite status."""
    nodes = sorted(NODE_META.keys())
    report = {}
    for nid in nodes:
        prereq = PREREQ_GRAPH[nid]
        report[nid] = {
            "label": NODE_META[nid]["label"],
            "mastery": round(state.mastery(nid), 3),
            "attempts": state.node_attempts.get(nid, 0),
            "unlocked": nid in state.unlocked,
            "prerequisite": prereq,
            "prereq_met": prereq is None or prereq in state.unlocked,
            "can_attempt": nid in state.unlocked,
        }
    return report


# ---------------------------------------------------------------------------
# Batch evaluation (deterministic, seeded)
# ---------------------------------------------------------------------------

def evaluate_batch(
    answers: list[dict],
    *,
    seed: int | None = 42,
    state: SessionState | None = None,
) -> dict:
    """
    Evaluate a batch of answers.

    Each element of *answers* is::

        {"node_id": str, "question_id": str, "answer": str | int}

    Returns per-question results + aggregate summary.
    """
    rng = _seed_rng(seed)
    local_state = state or SessionState()

    results = []
    correct_count = 0
    for item in answers:
        node_id = item["node_id"]
        # lock: can only attempt unlocked nodes
        if node_id not in local_state.unlocked:
            results.append({
                "node_id": node_id,
                "question_id": item["question_id"],
                "error": f"Node '{node_id}' is locked. Complete prerequisites first.",
            })
            continue
        r = evaluate_answer(
            node_id,
            item["question_id"],
            item["answer"],
            state=local_state,
        )
        r["node_id"] = node_id
        r["question_id"] = item["question_id"]
        results.append(r)
        if r["correct"]:
            correct_count += 1

    total = len(answers)
    return {
        "results": results,
        "summary": {
            "total": total,
            "correct": correct_count,
            "accuracy": round(correct_count / total, 3) if total else 0.0,
        },
        "progress": progress_report(local_state),
        "state_snapshot": local_state.to_dict(),
    }


# ---------------------------------------------------------------------------
# SymPy symbolic verification (for numeric / pattern questions if extended)
# ---------------------------------------------------------------------------

def verify_sequence(sequence: list[int], pattern_type: str) -> dict:
    """
    Verify a numeric sequence using SymPy (placeholder for extensibility).

    For Class 1 Geo this is not directly used, but the solver scaffold
    supports it for cross-disciplinary or extension questions.
    """
    try:
        import sympy as sp  # type: ignore
    except ImportError:
        return {"error": "sympy not installed"}

    x = sp.Symbol("n")
    if pattern_type == "arithmetic":
        d = sequence[1] - sequence[0]
        formula = sequence[0] + d * x
        predicted = [formula.subs(x, i) for i in range(len(sequence))]
    elif pattern_type == "geometric":
        r = sequence[1] / sequence[0]
        formula = sequence[0] * r**x
        predicted = [formula.subs(x, i) for i in range(len(sequence))]
    else:
        return {"error": f"Unknown pattern_type '{pattern_type}'"}

    match = all(
        int(sp.N(predicted[i])) == sequence[i] for i in range(len(sequence))
    )
    return {
        "pattern_type": pattern_type,
        "formula": str(formula),
        "predicted": [int(sp.N(p)) for p in predicted],
        "actual": sequence,
        "match": match,
    }


# ---------------------------------------------------------------------------
# Deterministic hash for reproducibility checks
# ---------------------------------------------------------------------------

def content_hash() -> str:
    """Stable hash of the node metadata for integrity checks."""
    payload = json.dumps(NODE_META, sort_keys=True, default=str)
    return hashlib.sha256(payload.encode()).hexdigest()[:16]


# ---------------------------------------------------------------------------
# CLI self-test
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    state = SessionState()
    print("=== Class 1 Geography Solver — Self-Test ===\n")

    tests = [
        # (node_id, question_id, answer)
        (NodeID.c1_geo_001, "earth_home", "Earth is our home"),
        (NodeID.c1_geo_001, "earth_water", "rivers and ponds"),
        (NodeID.c1_geo_001, "earth_care_1", "do not litter"),
        (NodeID.c1_geo_002, "sun_light", "The sun gives light"),
        (NodeID.c1_geo_002, "sun_grow", "plants grow"),
        (NodeID.c1_geo_002, "sun_no_look", "No, never look at the sun"),
        (NodeID.c1_geo_003, "day_sun", "Day has the sun"),
        (NodeID.c1_geo_003, "night_moon", "We see the moon at night"),
        (NodeID.c1_geo_003, "activity_night_sleep", "We sleep at night"),
        (NodeID.c1_geo_004, "sky_day_blue", "The sky is blue in the day"),
        (NodeID.c1_geo_004, "sky_night_dark", "Dark sky with stars"),
    ]

    for nid, qid, ans in tests:
        r = evaluate_answer(nid, qid, ans, state=state)
        status = "✓" if r["correct"] else "✗"
        print(f"  {status} [{nid}] {qid}: {r['feedback']}")

    print("\n--- Progress Report ---")
    report = progress_report(state)
    for nid, info in report.items():
        print(f"  {nid}: mastery={info['mastery']:.2f}  "
              f"unlocked={info['unlocked']}  can_attempt={info['can_attempt']}")

    print(f"\nContent hash: {content_hash()}")