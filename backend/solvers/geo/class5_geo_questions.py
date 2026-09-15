"""
Class 5 Geography – Question Generator
CISCE Primary Curriculum | Geography | Class 5
Nodes: c5_geo_001 (Latitudes), c5_geo_002 (Longitudes), c5_geo_003 (Geographic Grid)
"""

from __future__ import annotations
import random
import string
from dataclasses import dataclass, field
from typing import List, Optional
from class5_geo_solver import (
    MAIN_LATITUDES, MAIN_LONGITUDES, CITIES,
    get_latitude, get_longitude, latitude_hemisphere, longitude_hemisphere,
    lat_distance, lon_distance, angular_to_km, classify_latitude_line,
    classify_longitude_line, identify_city, get_city_info,
    get_all_latitude_names, get_all_longitude_names,
    solve_lat_distance, solve_hemisphere_check, solve_lon_hemisphere_check,
)

# ─────────────────────────────────────────────────────────────────────────────
# DATA STRUCTURES
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class Question:
    id: int
    node_id: str
    topic: str          # 'latitudes' | 'longitudes' | 'geographic_grid'
    difficulty: str     # 'Easy' | 'Medium' | 'Hard'
    qtype: str          # 'mcq' | 'fib'
    prompt: str
    options: List[str]  # MCQ options A-D (empty for FIB)
    answer: str         # MCQ: 'A'/'B'/'C'/'D';  FIB: raw answer text
    explanation: str
    seed_used: int

@dataclass
class QuizResult:
    total: int
    correct: int
    details: List[dict]

# ─────────────────────────────────────────────────────────────────────────────
# INTERNAL HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def _rng(seed: int) -> random.Random:
    return random.Random(seed)

def _shuffle_options(rng: random.Random, options: list[tuple]) -> tuple:
    """Shuffle option tuples, return (shuffled_list, correct_letter)."""
    pairs = list(enumerate(options))        # (0, (text, is_correct))
    rng.shuffle(pairs)
    letters = list("ABCD")
    result = []
    correct_letter = None
    for i, (_, (text, is_correct)) in enumerate(pairs):
        result.append(f"{letters[i]}) {text}")
        if is_correct:
            correct_letter = letters[i]
    return result, correct_letter

def _make_mcq(
    seed: int, qid: int, node: str, topic: str, diff: str,
    prompt: str, options: list[tuple], explanation: str,
) -> Question:
    rng = _rng(seed)
    shuffled, correct = _shuffle_options(rng, options)
    return Question(
        id=qid, node_id=node, topic=topic, difficulty=diff, qtype="mcq",
        prompt=prompt, options=shuffled, answer=correct, explanation=explanation,
        seed_used=seed,
    )

def _make_fib(
    seed: int, qid: int, node: str, topic: str, diff: str,
    prompt: str, answer: str, explanation: str, acceptable: list[str] | None = None,
) -> Question:
    return Question(
        id=qid, node_id=node, topic=topic, difficulty=diff, qtype="fib",
        prompt=prompt, options=[], answer=answer,
        explanation=explanation, seed_used=seed,
    )

# ─────────────────────────────────────────────────────────────────────────────
# LATITUDE QUESTION GENERATORS
# ─────────────────────────────────────────────────────────────────────────────

def _gen_lat_questions(seed: int, node: str, count: int = 5) -> list[Question]:
    """Generate a mix of Easy / Medium / Hard latitude questions."""
    rng = _rng(seed)
    lat_names = get_all_latitude_names()

    def pick_lat(exclude: str = "") -> dict:
        pool = [l for l in MAIN_LATITUDES if l["name"] != exclude]
        return rng.choice(pool)

    def pick_two_distinct(exclude: str = "") -> tuple:
        pool = [l for l in MAIN_LATITUDES if l["name"] != exclude]
        a, b = rng.sample(pool, 2)
        return a, b

    questions: list[Question] = []
    qid = 0

    # ── Easy (3 questions) ──────────────────────────────────────────────────
    # 1. The largest latitude
    lat = pick_lat()
    q = _make_mcq(
        seed + 1, qid, node, "latitudes", "Easy",
        "Which of the following is the largest imaginary circle running around the Earth?",
        [
            ("The Equator", True),
            ("The Tropic of Cancer", False),
            ("The Arctic Circle", False),
            ("The South Pole", False),
        ],
        "The Equator (0°) is the largest latitude circle — it runs around the "
        "middle of the Earth, dividing it into two equal halves called hemispheres.",
    )
    questions.append(q); qid += 1

    # 2. Identify the Equator
    q = _make_mcq(
        seed + 2, qid, node, "latitudes", "Easy",
        "What is the special value (in degrees) of the Equator?",
        [
            ("0°", True),
            ("23.5°", False),
            ("66.5°", False),
            ("90°", False),
        ],
        "The Equator is assigned 0° latitude. It is the reference line from which "
        "all other latitudes are measured.",
    )
    questions.append(q); qid += 1

    # 3. Hemisphere division by the Equator
    q = _make_mcq(
        seed + 3, qid, node, "latitudes", "Easy",
        "The Equator divides the Earth into which two halves?",
        [
            ("Northern and Southern Hemispheres", True),
            ("Eastern and Western Hemispheres", False),
            ("Temperate and Tropical Zones", False),
            ("Upper and Lower halves", False),
        ],
        "The Equator (0°) divides Earth into the Northern Hemisphere (above/up) "
        "and the Southern Hemisphere (below/down).",
    )
    questions.append(q); qid += 1

    # ── Medium (2 questions) ────────────────────────────────────────────────
    # 4. Identify a named latitude
    lat = pick_lat()
    options = [(lat["name"], True)]
    distractors = [l["name"] for l in MAIN_LATITUDES if l["name"] != lat["name"]]
    rng2 = _rng(seed + 40)
    rng2.shuffle(distractors)
    options.extend([(d, False) for d in distractors[:3]])
    rng3 = _rng(seed + 41)
    rng3.shuffle(options)
    q = _make_mcq(
        seed + 4, qid, node, "latitudes", "Medium",
        f"Which latitude line is at {lat['degrees']}° {'North' if lat['north'] else 'South'}?",
        options,
        f"{lat['name']} is the latitude at {lat['degrees']}° "
        f"{'North' if lat['north'] else 'South'}.",
    )
    questions.append(q); qid += 1

    # 5. Distance between two latitudes
    la, lb = pick_two_distinct()
    dist_deg = lat_distance(la["degrees"], lb["degrees"])
    dist_km = int(angular_to_km(dist_deg))
    ans_km = rng.choice([dist_km, dist_km + 111, dist_km - 55, dist_km + 222])
    q = _make_mcq(
        seed + 5, qid, node, "latitudes", "Medium",
        f"What is the approximate distance in kilometres between "
        f"the {la['name']} ({la['degrees']}°) and the {lb['name']} ({lb['degrees']}°)? "
        f"(1° of latitude ≈ 111 km)",
        [
            (f"{dist_km} km", True),
            (f"{ans_km} km", False),
            (f"{dist_km + 50} km", False),
            (f"{dist_km - 60} km", False),
        ],
        f"Difference = |{la['degrees']} − {lb['degrees']}| = {dist_deg}°. "
        f"Distance = {dist_deg} × 111 ≈ {dist_km} km.",
    )
    questions.append(q); qid += 1

    # ── FIB: Fill in the blanks ─────────────────────────────────────────────
    # FIB 1 — Equator value
    questions.append(_make_fib(
        seed + 60, qid, node, "latitudes", "Easy",
        "The Equator is at ____° latitude.",
        "0",
        "The Equator is the reference line at 0° latitude.",
        acceptable=["0", "zero"],
    )); qid += 1

    # FIB 2 — Tropic value
    questions.append(_make_fib(
        seed + 61, qid, node, "latitudes", "Medium",
        "The Tropic of Cancer is at ____°N and the Tropic of Capricorn is at ____°S.",
        "23.5 and 23.5",
        "Both Tropics are at 23.5° — one north and one south of the Equator.",
        acceptable=["23.5 and 23.5", "23.5"],
    )); qid += 1

    return questions

# ─────────────────────────────────────────────────────────────────────────────
# LONGITUDE QUESTION GENERATORS
# ─────────────────────────────────────────────────────────────────────────────

def _gen_lon_questions(seed: int, node: str, count: int = 5) -> list[Question]:
    """Generate a mix of Easy / Medium / Hard longitude questions."""
    rng = _rng(seed)

    questions: list[Question] = []
    qid = 0

    # ── Easy (3 questions) ──────────────────────────────────────────────────
    # 1. Direction of longitude lines
    q = _make_mcq(
        seed + 1, qid, node, "longitudes", "Easy",
        "Longitude lines (meridians) run in which direction?",
        [
            ("From the North Pole to the South Pole", True),
            ("From east to west (parallel to the Equator)", False),
            ("In a circular path around the Equator", False),
            ("From west to east only", False),
        ],
        "Longitudes (meridians) run from the North Pole to the South Pole — "
        "like the vertical rails of a ladder.",
    )
    questions.append(q); qid += 1

    # 2. Prime Meridian value
    q = _make_mcq(
        seed + 2, qid, node, "longitudes", "Easy",
        "What is the value (in degrees) of the Prime Meridian?",
        [
            ("0°", True),
            ("23.5°", False),
            ("90°", False),
            ("180°", False),
        ],
        "The Prime Meridian is at 0° longitude. It runs through Greenwich, England.",
    )
    questions.append(q); qid += 1

    # 3. Hemisphere division by Prime Meridian
    q = _make_mcq(
        seed + 3, qid, node, "longitudes", "Easy",
        "The Prime Meridian (0°) divides the Earth into which two hemispheres?",
        [
            ("Eastern and Western Hemispheres", True),
            ("Northern and Southern Hemispheres", False),
            ("Tropical and Polar Regions", False),
            ("Upper and Lower halves", False),
        ],
        "The Prime Meridian divides Earth into the Eastern Hemisphere (east/right "
        "of Greenwich) and the Western Hemisphere (west/left).",
    )
    questions.append(q); qid += 1

    # ── Medium (2 questions) ────────────────────────────────────────────────
    # 4. International Date Line
    q = _make_mcq(
        seed + 4, qid, node, "longitudes", "Medium",
        "Where do the 180° East and 180° West meridians meet?",
        [
            ("At the International Date Line", True),
            ("At the Equator", False),
            ("At the North Pole", False),
            ("At the Prime Meridian", False),
        ],
        "The 180°E and 180°W meridians converge at the International Date Line, "
        "which runs roughly along the 180° meridian in the Pacific Ocean.",
    )
    questions.append(q); qid += 1

    # 5. Eastern/Western hemisphere check (deterministic city)
    city = rng.choice(CITIES)
    q = _make_mcq(
        seed + 5, qid, node, "longitudes", "Medium",
        f"{city['name']} is at {abs(city['lon'])}°{'E' if city['lon'] > 0 else 'W'}. "
        f"In which hemisphere is it?",
        [
            ("Eastern Hemisphere" if city["lon"] > 0 else "Western Hemisphere", True),
            ("Western Hemisphere" if city["lon"] > 0 else "Eastern Hemisphere", False),
            ("Northern Hemisphere", False),
            ("Southern Hemisphere", False),
        ],
        f"{city['name']} is at {abs(city['lon'])}°{'E' if city['lon'] > 0 else 'W'}, "
        f"so it lies in the {'Eastern' if city['lon'] > 0 else 'Western'} Hemisphere.",
    )
    questions.append(q); qid += 1

    # ── FIB ─────────────────────────────────────────────────────────────────
    questions.append(_make_fib(
        seed + 60, qid, node, "longitudes", "Easy",
        "The Prime Meridian is at ____° longitude and passes through Greenwich, ____.",
        "0, England",
        "The Prime Meridian is 0° longitude and passes through Greenwich, England.",
        acceptable=["0, england", "0, greenwich", "0"],
    )); qid += 1

    questions.append(_make_fib(
        seed + 61, qid, node, "longitudes", "Medium",
        "Longitude lines are also called ____.",
        "meridians",
        "Lines of longitude are also called meridians.",
        acceptable=["meridians", "meridian"],
    )); qid += 1

    return questions

# ─────────────────────────────────────────────────────────────────────────────
# GEOGRAPHIC GRID QUESTION GENERATORS
# ─────────────────────────────────────────────────────────────────────────────

def _gen_grid_questions(seed: int, node: str, count: int = 5) -> list[Question]:
    """Generate a mix of Easy / Medium / Hard geographic grid questions."""
    rng = _rng(seed)

    questions: list[Question] = []
    qid = 0

    # ── Easy (2 questions) ──────────────────────────────────────────────────
    # 1. What does the first number represent?
    q = _make_mcq(
        seed + 1, qid, node, "geographic_grid", "Easy",
        "In the coordinate pair (28.6°N, 77.2°E) for Delhi, what does the "
        "first number (28.6°N) tell us?",
        [
            ("How far north or south Delhi is from the Equator", True),
            ("How far east or west Delhi is from the Prime Meridian", False),
            ("The temperature of Delhi", False),
            ("The distance from Delhi to the North Pole", False),
        ],
        "The first number is the latitude — it tells us how far north (N) or "
        "south (S) a place is from the Equator.",
    )
    questions.append(q); qid += 1

    # 2. Identify city from coordinates (easy — large gap)
    city = rng.choice(CITIES)
    q = _make_mcq(
        seed + 2, qid, node, "geographic_grid", "Easy",
        f"A city is located at ({city['lat']}°{city['lat_dir']}, "
        f"{abs(city['lon'])}°{city['lon_dir']}). Which city is it?",
        [
            (city["name"], True),
        ] + [
            (c["name"], False)
            for c in rng.sample([x for x in CITIES if x["name"] != city["name"]], 3)
        ],
        f"The coordinates ({city['lat']}°{city['lat_dir']}, "
        f"{abs(city['lon'])}°{city['lon_dir']}) correspond to {city['name']}.",
    )
    questions.append(q); qid += 1

    # ── Medium (2 questions) ────────────────────────────────────────────────
    # 3. Nearest to Equator (lowest |latitude|)
    rng2 = _rng(seed + 10)
    pool = rng2.sample(CITIES, 4)
    pool_sorted = sorted(pool, key=lambda c: abs(c["lat"]))
    nearest = pool_sorted[0]
    rng3 = _rng(seed + 11)
    rng3.shuffle(pool)
    opts = [(c["name"], c["name"] == nearest["name"]) for c in pool]
    q = _make_mcq(
        seed + 3, qid, node, "geographic_grid", "Medium",
        f"Which of these cities is closest to the Equator?\n"
        + "\n".join(
            f"  {c['name']}: {c['lat']}°{c['lat_dir']}" for c in pool
        ),
        [opt for opt in opts],
        f"{nearest['name']} is at {nearest['lat']}°{nearest['lat_dir']}, "
        f"which has the smallest absolute latitude — closest to 0° (the Equator).",
    )
    questions.append(q); qid += 1

    # 4. Distance between two cities (N-S)
    ca, cb = rng.sample(CITIES, 2)
    dist_deg = lat_distance(ca["lat"], cb["lat"])
    dist_km = int(angular_to_km(dist_deg))
    q = _make_mcq(
        seed + 4, qid, node, "geographic_grid", "Medium",
        f"Approximately how many kilometres north or south is {cb['name']} "
        f"from {ca['name']}? "
        f"({ca['name']}: {ca['lat']}°{ca['lat_dir']}, "
        f"{cb['name']}: {cb['lat']}°{cb['lat_dir']})",
        [
            (f"{dist_km} km", True),
            (f"{dist_km + 111} km", False),
            (f"{abs(dist_km - 333)} km", False),
            (f"{dist_km + 222} km", False),
        ],
        f"Latitude difference = |{ca['lat']} − {cb['lat']}| = {dist_deg}°. "
        f"Distance = {dist_deg}° × 111 km/° ≈ {dist_km} km.",
    )
    questions.append(q); qid += 1

    # ── FIB ─────────────────────────────────────────────────────────────────
    # FIB 1
    questions.append(_make_fib(
        seed + 60, qid, node, "geographic_grid", "Easy",
        "The intersection of latitude and longitude lines on the Earth is called a "
        "____. Together they form the ____.",
        "point, geographic grid",
        "A single intersection is a point; all lines together form the geographic grid.",
        acceptable=["point, geographic grid", "geographic grid"],
    )); qid += 1

    return questions

# ─────────────────────────────────────────────────────────────────────────────
# MAIN GENERATOR CLASS
# ─────────────────────────────────────────────────────────────────────────────

class GeographyQuestionGenerator:
    """
    Seeded, deterministic question generator for Class 5 Geography.
    """

    NODE_MAP = {
        "c5_geo_001": "latitudes",
        "c5_geo_002": "longitudes",
        "c5_geo_003": "geographic_grid",
    }

    def __init__(self, seed: int = 42):
        self.seed = seed
        self._counter = 0

    def _next_seed(self) -> int:
        s = self.seed + self._counter
        self._counter += 1
        return s

    def generate(self, node_id: str, count: int = 5) -> list[Question]:
        """
        Generate `count` questions for the given node.
        Node IDs: c5_geo_001, c5_geo_002, c5_geo_003.
        """
        topic = self.NODE_MAP.get(node_id)
        if topic is None:
            raise ValueError(
                f"Unknown node '{node_id}'. "
                f"Valid: {list(self.NODE_MAP.keys())}"
            )

        seed = self._next_seed()
        if topic == "latitudes":
            return _gen_lat_questions(seed, node_id, count)
        elif topic == "longitudes":
            return _gen_lon_questions(seed, node_id, count)
        else:  # geographic_grid
            return _gen_grid_questions(seed, node_id, count)

    def generate_mixed(self, count_per_node: int = 2) -> list[Question]:
        """Generate questions across all three nodes."""
        result: list[Question] = []
        for node_id in self.NODE_MAP:
            result.extend(self.generate(node_id, count_per_node))
        return result

    def run_quiz(self, questions: list[Question],
                 student_answers: dict[int, str]) -> QuizResult:
        """
        Grade a quiz.
        student_answers maps question.id → student's answer string.
        Returns QuizResult.
        """
        correct = 0
        details: list[dict] = []

        for q in questions:
            sa = student_answers.get(q.id, "").strip()
            if q.qtype == "mcq":
                is_correct = sa.upper() == q.answer.upper()
            else:  # fib — case-insensitive containment check
                acceptable = [
                    a.strip().lower()
                    for a in _FIB_ANSWERS.get(q.id, [q.answer]).split(",")
                ]
                is_correct = sa.lower() in acceptable
            if is_correct:
                correct += 1
            details.append({
                "qid": q.id,
                "correct": is_correct,
                "your_answer": sa,
                "correct_answer": q.answer,
                "explanation": q.explanation,
            })

        return QuizResult(total=len(questions), correct=correct, details=details)


# ─────────────────────────────────────────────────────────────────────────────
# FIB ACCEPTABLE-ANSWER LOOKUP  (indexed by the seed+qid used above)
# ─────────────────────────────────────────────────────────────────────────────
# Format: composite_seed → comma-separated acceptable answers
_FIB_ANSWERS: dict[int, str] = {
    61:  "0,zero",                          # Equator value
    62:  "23.5 and 23.5,23.5",              # Tropics
    161: "0, england,0,greenwich",          # Prime Meridian
    162: "meridians,meridian",              # Longitude name
    263: "point, geographic grid,geographic grid",  # Grid definitions
}


# ─────────────────────────────────────────────────────────────────────────────
# CLI DEMO
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    gen = GeographyQuestionGenerator(seed=42)

    print("=" * 60)
    print("CLASS 5 GEOGRAPHY — QUESTION GENERATOR DEMO")
    print("=" * 60)

    for node_id in GeographyQuestionGenerator.NODE_MAP:
        print(f"\n{'─' * 60}")
        print(f"NODE: {node_id}  |  TOPIC: {GeographyQuestionGenerator.NODE_MAP[node_id]}")
        print(f"{'─' * 60}")

        questions = gen.generate(node_id, count=4)
        for q in questions:
            print(f"\n  Q{q.id + 1} [{q.difficulty}] [{q.qtype.upper()}]")
            print(f"  {q.prompt}")
            if q.options:
                for opt in q.options:
                    marker = " ◄" if opt.startswith(q.answer + ")") else ""
                    print(f"    {opt}{marker}")
            else:
                print(f"  [Answer: {q.answer}]")
            print(f"  → {q.explanation}")
