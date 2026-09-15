"""
Class 3 Geography Solver — CISCE Primary Curriculum
Covers: c3_geo_001, c3_geo_002, c3_geo_003
Difficulty: Easy–Medium
"""
import random, math
from dataclasses import dataclass, field
from typing import Optional

# ── Knowledge Base ──────────────────────────────────────────────────────────

CONTINENTS = [
    {"name": "Asia",          "largest": True,  "smallest": False, "ice": False,
     "equator_passes": True,  "size_rank": 1,  "fun_fact": "the largest continent"},
    {"name": "Africa",        "largest": False, "smallest": False, "ice": False,
     "equator_passes": True,  "size_rank": 2,  "fun_fact": "has the Sahara, the largest hot desert"},
    {"name": "North America", "largest": False, "smallest": False, "ice": False,
     "equator_passes": False, "size_rank": 3,  "fun_fact": "has the Mississippi River"},
    {"name": "South America", "largest": False, "smallest": False, "ice": False,
     "equator_passes": True,  "size_rank": 4,  "fun_fact": "home to the Amazon Rainforest"},
    {"name": "Antarctica",    "largest": False, "smallest": False, "ice": True,
     "equator_passes": False, "size_rank": 5,  "fun_fact": "covered in ice and snow all year"},
    {"name": "Europe",        "largest": False, "smallest": False, "ice": False,
     "equator_passes": False, "size_rank": 6,  "fun_fact": "has many small countries"},
    {"name": "Australia",     "largest": False, "smallest": True,  "ice": False,
     "equator_passes": False, "size_rank": 7,  "fun_fact": "the smallest continent; also a country"},
]

CONTINENT_NAME_TO_IDX = {c["name"]: i for i, c in enumerate(CONTINENTS)}

GLOBE_FACTS = {
    "is_model_of_earth":       True,
    "shape":                   "spherical",
    "has_axis":                True,
    "axis_tilted":             True,
    "two_hemispheres":         ["Northern Hemisphere", "Southern Hemisphere"],
    "divided_by":              "equator",
    "shows_true_shape":        True,
    "limitations":             [
        "too small to show all details",
        "cannot show small roads or towns",
    ],
}

EARTH_FACTS = {
    "shape":           "spherical (geoid)",
    "flattened_at":    "poles",
    "bulging_at":      "equator",
    "circumference_km": 40000,
    "diameter_km":     12742,
    "evidence": [
        "ship disappears hull-first over the horizon",
        "Earth's circular shadow on the Moon during a lunar eclipse",
        "photographs of Earth taken from space",
    ],
    "appears_flat_because": "Earth is very large and we are very small compared to it",
}

EQUATOR_CONTINENTS = [c for c in CONTINENTS if c["equator_passes"]]
LARGEST_CONTINENT    = max(CONTINENTS, key=lambda c: c["size_rank"])
SMALLEST_CONTINENT   = min(CONTINENTS, key=lambda c: c["size_rank"])
ICE_CONTINENT        = next(c for c in CONTINENTS if c["ice"])


# ── Data Classes ────────────────────────────────────────────────────────────

@dataclass
class Question:
    id: str
    node_id: str
    difficulty: str
    question_type: str          # mcq | true_false | fill_blank | match | short
    prompt: str
    options: list[str] = field(default_factory=list)
    correct_index: int = -1
    correct_answer: str = ""
    explanation: str = ""
    hint: str = ""

    def is_valid(self) -> bool:
        if self.question_type == "mcq":
            return 0 <= self.correct_index < len(self.options)
        return bool(self.correct_answer)


@dataclass
class SolverResult:
    question: Question
    is_correct: bool
    user_answer: str
    correct_answer: str
    explanation: str
    mastery_note: str = ""


# ── Solver Logic ────────────────────────────────────────────────────────────

class Geo3Solver:
    """
    Validates answers against the knowledge base.
    Supports: mcq, true_false, fill_blank, match, short.
    """

    @staticmethod
    def solve(question: Question, user_answer: str) -> SolverResult:
        norm = user_answer.strip().lower()
        correct_str = ""

        if question.question_type == "mcq":
            if not (0 <= question.correct_index < len(question.options)):
                return SolverResult(question, False, user_answer, "",
                                    "Internal error: invalid correct_index.", "")
            correct_str = question.options[question.correct_index]
            is_correct = (norm == correct_str.lower())

        elif question.question_type == "true_false":
            correct_str = question.correct_answer  # "True" / "False"
            is_correct = (norm == correct_str.lower())

        elif question.question_type == "fill_blank":
            correct_str = question.correct_answer
            aliases = _fill_blank_aliases(question.id)
            is_correct = (norm in aliases) or (norm == correct_str.lower())

        elif question.question_type == "match":
            correct_str = question.correct_answer
            is_correct = (norm == correct_str.lower())

        elif question.question_type == "short":
            correct_str = question.correct_answer
            aliases = _short_aliases(question.id)
            is_correct = (norm in aliases) or (norm == correct_str.lower())

        else:
            is_correct = False
            correct_str = "unknown question type"

        note = Geo3Solver._mastery_note(question, is_correct)
        return SolverResult(question, is_correct, user_answer,
                            correct_str, question.explanation, note)

    @staticmethod
    def _mastery_note(q: Question, correct: bool) -> str:
        node_hints = {
            "c3_geo_001": "Tip: The globe is round, just like Earth. The tilted rod is the axis.",
            "c3_geo_002": "Tip: Earth is geoid — round like a ball, but squashed at the top and bottom.",
            "c3_geo_003": "Tip: Asia is #1 (largest), Australia is #7 (smallest). Antarctica is the icy one.",
        }
        if correct:
            return "✓ Great job! " + node_hints.get(q.node_id, "")
        return "✗ Not quite. " + node_hints.get(q.node_id,
               "Try again and remember the key fact.")


# ── Fill-blank / short-answer aliases ───────────────────────────────────────

def _fill_blank_aliases(qid: str) -> set[str]:
    aliases: dict[str, set[str]] = {
        "c3g1_q3":  {"axis"},
        "c3g1_q6":  {"cannot show roads or small towns",
                     "cannot show small roads or towns",
                     "too small to show all details"},
        "c3g2_q3":  {"ship disappears hull first", "ship disappears hull-first",
                     "hull first"},
        "c3g2_q5":  {"circular shadow of earth on the moon during a lunar eclipse",
                     "earth's circular shadow on the moon",
                     "shadow on the moon during a lunar eclipse"},
        "c3g3_q1":  {"7", "seven"},
        "c3g3_q2":  {"asia"},
        "c3g3_q3":  {"australia"},
        "c3g3_q4":  {"antarctica", "the antarctic"},
        "c3g3_q7":  {"asia", "asia (india is in asia)"},
        "c3g3_q9":  {"africa", "south america", "asia"},
    }
    return aliases.get(qid, set())


def _short_aliases(qid: str) -> set[str]:
    aliases: dict[str, set[str]] = {
        "c3g1_q5":  {"it is round / spherical like earth",
                     "earth is round so a globe shows its true shape",
                     "because earth is round"},
        "c3g1_q7":  {"it is too small to show every detail like roads and towns",
                     "too small; cannot show small towns or roads"},
        "c3g2_q7":  {"because earth is very large and we are on a very small part of it",
                     "earth is very large so it looks flat",
                     "because it is so big"},
    }
    return aliases.get(qid, set())


# ── Verification helpers ─────────────────────────────────────────────────────

def verify_all() -> dict[str, bool]:
    """Quick sanity-check on knowledge-base facts."""
    results = {}
    results["7_continents"]     = len(CONTINENTS) == 7
    results["asia_largest"]     = LARGEST_CONTINENT["name"] == "Asia"
    results["australia_small"]  = SMALLEST_CONTINENT["name"] == "Australia"
    results["antarctica_ice"]   = ICE_CONTINENT["name"] == "Antarctica"
    results["3_equator"]        = len(EQUATOR_CONTINENTS) == 3
    results["earth_circ"]       = EARTH_FACTS["circumference_km"] == 40000
    results["earth_diam"]       = EARTH_FACTS["diameter_km"] == 12742
    results["globe_is_model"]   = GLOBE_FACTS["is_model_of_earth"]
    results["two_hemispheres"]  = len(GLOBE_FACTS["two_hemispheres"]) == 2
    results["two_evidence_min"] = len(EARTH_FACTS["evidence"]) >= 2
    results["two_limitations"]  = len(GLOBE_FACTS["limitations"]) >= 2
    return results


if __name__ == "__main__":
    print("=== Knowledge-base verification ===")
    for k, v in verify_all().items():
        print(f"  {'✓' if v else '✗'} {k}")