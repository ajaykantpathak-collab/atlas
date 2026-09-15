"""
class1_bio_solver.py
Solver for Class 1 Biology — 4 Nodes: Personal details, Body parts,
Sense organs, Daily food.
No external LLM; uses regex / keyword matching + exact comparison.
"""

import re
import random

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

PERSONAL_KEYWORDS = {
    "name":       {"name", "full name", "my name"},
    "parent":     {"mother", "father", "mummy", "papa", "mom", "dad", "parent"},
    "birthday":   {"birthday", "born", "dob", "date of birth"},
    "address":    {"address", "home", "house", "street"},
    "phone":      {"phone", "number", "contact"},
}

BODY_PARTS = [
    "head", "chest", "legs", "hands", "shoulders", "elbow", "wrists",
    "fingers", "face", "cheeks", "eyes", "nose", "ears", "mouth",
    "arms", "knees", "feet", "toes", "neck",
]

SENSE_ORGANS = {
    "eyes":   {"see", "sight", "look", "watch"},
    "ears":   {"hear", "hearing", "listen", "sound"},
    "nose":   {"smell", "smelling", "sniff"},
    "tongue": {"taste", "tasting"},
    "skin":   {"touch", "feeling", "feel"},
}

FOOD_CATEGORIES = {
    "breakfast": {"roti", "paratha", "bread", "rice", "dosa", "idli",
                  "upma", "poha", "chappati", "curd", "milk", "egg"},
    "lunch":     {"rice", "dal", "roti", "sabzi", "curry", "chicken",
                  "fish", "chapati", "pulao", "khichdi"},
    "dinner":    {"rice", "dal", "roti", "soup", "khichdi", "milk"},
    "fruits":    {"apple", "banana", "mango", "orange", "grapes",
                  "papaya", "watermelon", "pomegranate"},
    "vegetables":{"carrot", "potato", "tomato", "onion", "cabbage",
                  "spinach", "peas", "brinjal", "ladyfinger"},
    "drinks":    {"water", "milk", "juice", "lassi", "buttermilk"},
}


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def _norm(text: str) -> str:
    """Lower-case and strip punctuation for loose matching."""
    return re.sub(r"[^\w\s]", "", text.lower()).strip()


def _keyword_hit(text: str, keywords: set) -> bool:
    """Return True if any keyword appears in normalised text."""
    n = _norm(text)
    return any(kw in n for kw in keywords)


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def solve_node_001(answers: dict) -> dict:
    """
    Validate personal-detail answers.
    answers keys: name, parent_name, birthday (optional), address (optional)
    Returns dict with per-key pass/fail and overall status.
    """
    result = {}
    checks = {
        "name":        ("name",        PERSONAL_KEYWORDS["name"]),
        "parent_name": ("parent",      PERSONAL_KEYWORDS["parent"]),
        "birthday":    ("birthday",    PERSONAL_KEYWORDS["birthday"]),
        "address":     ("address",     PERSONAL_KEYWORDS["address"]),
    }
    for key, (_, kws) in checks.items():
        raw = answers.get(key, "")
        result[key] = _keyword_hit(str(raw), kws)

    mandatory_ok = result.get("name", False) and result.get("parent_name", False)
    result["overall_pass"] = mandatory_ok
    result["mastery_criteria_met"] = mandatory_ok
    result["mastery_detail"] = (
        "All 3 mandatory criteria met." if mandatory_ok
        else "Need: full name AND at least one parent's name."
    )
    return result


def solve_node_002(answers: dict) -> dict:
    """
    Validate body-part identification.
    answers: list of body-part names the child can point to / name.
    """
    named = [_norm(str(p)) for p in answers.get("body_parts", [])]
    valid = [p for p in named if p in BODY_PARTS]
    face_parts  = {"eyes", "nose", "mouth", "ears", "cheeks"}
    hand_parts  = {"palm", "fingers", "thumb", "wrist"}

    criteria = {
        "at_least_5":     len(valid) >= 5,
        "face_parts_ok":  bool(valid & face_parts),
        "hand_parts_ok":  bool(valid & hand_parts),
    }
    overall = all(criteria.values())
    return {
        "valid_count":   len(valid),
        "criteria":      criteria,
        "overall_pass":  overall,
        "mastery_criteria_met": overall,
        "mastery_detail": (
            "All 3 criteria met — child can name ≥5 body parts, "
            "face parts, and hand parts."
            if overall else
            f"Need ≥5 body parts. Found {len(valid)} valid."
        ),
    }


def solve_node_003(answers: dict) -> dict:
    """
    Validate sense-organ + function matching.
    answers: dict  {organ_name: example_or_function_string, ...}
    """
    criteria = {}
    for organ, kws in SENSE_ORGANS.items():
        raw = answers.get(organ, "")
        criteria[organ] = _keyword_hit(str(raw), kws)

    overall = all(criteria.values())
    return {
        "criteria":      criteria,
        "overall_pass":  overall,
        "mastery_criteria_met": overall,
        "mastery_detail": (
            "All 5 sense organs matched correctly."
            if overall else
            "Need all 5 organs matched. Check: "
            + ", ".join(o for o, ok in criteria.items() if not ok)
        ),
    }


def solve_node_004(answers: dict) -> dict:
    """
    Validate food-knowledge answers.
    answers: dict  {meal: [food_items], food_group: [items], favourite: str}
    """
    result = {}
    for meal in ("breakfast", "lunch", "dinner"):
        items = [_norm(f) for f in answers.get(meal, [])]
        valid = [i for i in items
                 if any(i in _norm(v) for v in FOOD_CATEGORIES.values())]
        result[meal] = {
            "provided": items,
            "valid_count": len(valid),
            "pass": len(valid) >= 1,
        }

    fav = _norm(answers.get("favourite", ""))
    fav_pass = bool(fav)  # any non-empty string
    result["favourite"] = {"answer": fav, "pass": fav_pass}

    meal_pass = all(v["pass"] for v in result.values()
                    if isinstance(v, dict) and "pass" in v)
    overall = meal_pass and fav_pass
    return {
        "criteria":      result,
        "overall_pass":  overall,
        "mastery_criteria_met": overall,
        "mastery_detail": (
            "Child can name daily food items and favourite food."
            if overall else
            "Need at least 1 food item for each meal + favourite food."
        ),
    }


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

SOLVER_MAP = {
    "c1_bio_001": solve_node_001,
    "c1_bio_002": solve_node_002,
    "c1_bio_003": solve_node_003,
    "c1_bio_004": solve_node_004,
}


def solve(node_id: str, answers: dict, seed: int = 42) -> dict:
    """
    Dispatch to the correct solver.
    seed  — kept for deterministic reproducibility (used in scoring jitter).
    """
    if node_id not in SOLVER_MAP:
        return {"error": f"Unknown node: {node_id}",
                "valid_nodes": list(SOLVER_MAP)}
    return SOLVER_MAP[node_id](answers)


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

if __name__ == "__main__":
    random.seed(42)

    print("=" * 60)
    print("NODE 001 — Personal details")
    r = solve_node_001({"name": "Aarav", "parent_name": "Priya",
                        "birthday": "10 May", "address": "Mumbai"})
    print(r)

    print("\nNODE 002 — Body parts")
    r = solve_node_002({"body_parts": ["head", "eyes", "nose",
                                       "fingers", "elbow", "hair"]})
    print(r)

    print("\nNODE 003 — Sense organs")
    r = solve_node_003({"eyes": "I see flowers", "ears": "I hear music",
                        "nose": "smell food", "tongue": "taste sweet",
                        "skin": "feel soft cloth"})
    print(r)

    print("\nNODE 004 — Daily food")
    r = solve_node_004({"breakfast": ["roti"], "lunch": ["rice", "dal"],
                        "dinner": ["soup"], "favourite": "mango"})
    print(r)