"""
Question Generator for ICSE Class 10 Geography
Nodes: c10_geo_001, c10_geo_002, c10_geo_003
"""

import random
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
import json

from geo.class10_geo_solver import (
    Scale, solve_scale_conversion, solve_grid_reference,
    solve_distance_measurement, solve_bearing, solve_fore_back_bearing,
    solve_contour_landform, solve_cross_section, solve_intervisibility,
    solve_india_location, solve_india_direction,
    solve_contour_cross_section_simple, generate_synthetic_topomap,
    verify_grid_reference, verify_contour_answer,
    INDIA_PHYSICAL_FEATURES, INDIA_POLITICAL_FEATURES,
    INDIA_INDUSTRIAL_CENTRES, INDIA_FEATURES,
    RIVER_DATA, LandformType
)


# ─── Question Data Structures ───────────────────────────────────────────────

@dataclass
class Question:
    id: str
    node_id: str
    question_type: str  # mcq, fill_blank, short_answer, long_answer, numerical
    difficulty: str     # Easy, Medium, Hard
    competency_level: str
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: str = ""
    explanation: str = ""
    marks: int = 1
    topic_tags: List[str] = field(default_factory=list)
    params: Dict = field(default_factory=dict)  # parameters for regeneration

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "node_id": self.node_id,
            "type": self.question_type,
            "difficulty": self.difficulty,
            "competency": self.competency_level,
            "question": self.question_text,
            "options": self.options,
            "answer": self.correct_answer,
            "explanation": self.explanation,
            "marks": self.marks,
            "topics": self.topic_tags
        }


@dataclass
class QuestionSet:
    node_id: str
    questions: List[Question]
    total_marks: int
    metadata: Dict = field(default_factory=dict)

    def to_dict(self) -> Dict:
        return {
            "node_id": self.node_id,
            "total_questions": len(self.questions),
            "total_marks": self.total_marks,
            "questions": [q.to_dict() for q in self.questions]
        }


# ─── Deterministic Seeded RNG ────────────────────────────────────────────────

class SeededQuestionBank:
    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self._counter = 0

    def next_id(self, prefix: str = "Q") -> str:
        self._counter += 1
        return f"{prefix}_{self._counter:04d}"

    def choice(self, items: list):
        return self.rng.choice(items)

    def shuffle(self, items: list) -> list:
        result = items[:]
        self.rng.shuffle(result)
        return result

    def randint(self, a: int, b: int) -> int:
        return self.rng.randint(a, b)

    def uniform(self, a: float, b: float) -> float:
        return self.rng.uniform(a, b)


# ─── Question Generators ─────────────────────────────────────────────────────

# ── NODE c10_geo_001: Topographical Maps ─────────────────────────────────────

def gen_grid_reference_mcq(bank: SeededQuestionBank) -> Question:
    """MCQ on 4-figure and 6-figure grid references."""
    precision = bank.choice(["4-figure", "6-figure"])
    e = bank.randint(10, 99)
    n = bank.randint(10, 99)

    from geo.class10_geo_solver import solve_grid_reference

    correct = solve_grid_reference(e, n, 6 if "6" in precision else 4)

    all_digits = f"{e:02d}{n:02d}"
    distractors = set()
    while len(distractors) < 3:
        d = list(all_digits)
        pos = bank.randint(0, len(d) - 1)
        d[pos] = str((int(d[pos]) + bank.randint(1, 9)) % 10)
        distractors.add("".join(d))

    options = [correct["grid_reference"]] + list(distractors)
    options = bank.shuffle(options)

    q_text = (
        f"A point on a 1:50,000 toposheet has Easting {e} and Northing {n}. "
        f"What is the {precision} grid reference?"
    )

    return Question(
        id=bank.next_id("GRID"),
        node_id="c10_geo_001",
        question_type="mcq",
        difficulty="Medium",
        competency_level="Board",
        question_text=q_text,
        options=options,
        correct_answer=correct["grid_reference"],
        explanation=(
            f"{precision} grid reference uses first {'2' if '4' in precision else '3'} digits "
            f"of Easting and first {'2' if '4' in precision else '3'} digits of Northing. "
            f"Eastings run horizontally (left to right), Northings run vertically (bottom to top)."
        ),
        marks=1,
        topic_tags=["grid_reference", "eastings_northings", "topo_map"],
        params={"easting": e, "northing": n, "precision": precision}
    )


def gen_scale_conversion_mcq(bank: SeededQuestionBank) -> Question:
    """MCQ on scale type conversions."""
    from geo.class10_geo_solver import solve_scale_conversion

    scales = ["1:50000", "1:25000", "1:100000", "1:250000"]
    scale = bank.choice(scales)
    denom = int(scale.split(":")[1])
    answer_km = round(denom / 100000, 2)

    question_type = bank.choice(["rf_to_statement", "statement_to_rf", "scale_distance"])

    if question_type == "rf_to_statement":
        q_text = f"Convert the scale 1:{denom:,} to statement scale."
        options = bank.shuffle([
            f"1 cm = {denom/100:.0f} m",
            f"1 cm = {denom/100000:.2f} km",
            f"1 cm = {denom/10:.0f} m",
            f"1 cm = {denom/1000000:.4f} km"
        ])
        correct = f"1 cm = {denom/100:.0f} m"

    elif question_type == "scale_distance":
        map_cm = bank.randint(2, 10)
        real_cm = map_cm * denom
        real_km = real_cm / 100000
        q_text = f"On a map of scale {scale}, a straight road measures {map_cm} cm. What is its real length?"
        options = bank.shuffle([
            f"{real_km:.2f} km",
            f"{real_km * 10:.1f} km",
            f"{real_km / 10:.3f} km",
            f"{real_km * 100:.0f} km"
        ])
        correct = f"{real_km:.2f} km"
    else:
        # statement to RF
            map_dist = bank.choice([1, 2])
            ground_m = bank.choice([500, 1000, 2000, 5000])
            ground_cm = ground_m * 100
            rf = int(ground_cm / map_dist)
            q_text = f"The statement scale is {map_dist} cm = {ground_m} m. What is the RF?"
            options = bank.shuffle([
                f"1:{rf}",
                f"1:{rf//10}",
                f"1:{rf*10}",
                f"1:{rf*100}"
            ])
            correct = f"1:{rf}"

    return Question(
        id=bank.next_id("SCALE"),
        node_id="c10_geo_001",
        question_type="mcq",
        difficulty="Medium",
        competency_level="Board",
        question_text=q_text,
        options=options,
        correct_answer=correct,
        explanation=(
            f"Scale conversion: 1 cm on map represents {denom} cm on ground. "
            f"Remember: 1 km = 100,000 cm, 1 m = 100 cm."
        ),
        marks=1,
        topic_tags=["scale", "rf", "statement_scale", "distance"],
        params={"scale": scale}
    )


def gen_bearing_question(bank: SeededQuestionBank) -> Question:
    """Question on bearings — fore/back bearing or quadrant bearing."""
    from geo.class10_geo_solver import solve_bearing, solve_fore_back_bearing

    q_type = bank.choice(["fore_back", "quadrant"])

    if q_type == "fore_back":
        fb = bank.choice([45, 90, 120, 135, 180, 225, 270, 315, 330])
        result = solve_fore_back_bearing(fb)
        q_text = (
            f"The fore bearing of a line is {fb}°. "
            f"What is its back bearing?"
        )
        correct = result["back_bearing"]
        explanation = (
            f"Back Bearing = (Fore Bearing ± 180°) mod 360. "
            f"({fb}° + 180°) mod 360 = {correct}"
        )
    else:
        angle = bank.randint(10, 350)
        result = solve_bearing(angle)
        q_text = f"Express a bearing of {angle}° as a quadrant bearing."
        correct = result["quadrant_bearing"]
        explanation = (
            f"Quadrant bearing is measured from N or S towards E or W. "
            f"{angle}° clockwise from North = {correct}"
        )

    return Question(
        id=bank.next_id("BEAR"),
        node_id="c10_geo_001",
        question_type="fill_blank",
        difficulty="Medium",
        competency_level="Board",
        question_text=q_text,
        correct_answer=correct,
        explanation=explanation,
        marks=1,
        topic_tags=["bearing", "fore_bearing", "back_bearing", "direction"],
        params={"type": q_type}
    )


def gen_distance_measurement_q(bank: SeededQuestionBank) -> Question:
    """Question on measuring distances from topo maps."""
    from geo.class10_geo_solver import solve_distance_measurement

    scale = bank.choice(["1:50000", "1:25000"])
    denom = int(scale.split(":")[1])
    map_cm = bank.randint(3, 15)
    curved = bank.choice([False, False, True])  # 33% chance of curved path

    result = solve_distance_measurement(map_cm, denom, curved_correction=1.12 if curved else 1.0)

    if curved:
        q_text = (
            f"A meandering river on a {scale} toposheet measures {map_cm} cm "
            f"when traced with a thread. If the path is curved (add 12% for meanders), "
            f"what is the approximate real length in km?"
        )
    else:
        q_text = (
            f"On a {scale} toposheet, the straight-line distance between two villages "
            f"measures {map_cm} cm. What is the real distance in km?"
        )

    correct = f"{result['corrected_distance_km']:.2f} km"
    explanation = (
        f"Real distance = Map distance × RF denominator. "
        f"{map_cm} cm × {denom} = {result['real_distance_cm']:.0f} cm = {result['real_distance_km']:.3f} km. "
        f"For curved paths, add ~10-15% extra."
        if not curved else
        f"Real distance (straight) = {result['real_distance_km']:.3f} km. "
        f"With 12% meander correction: {result['corrected_distance_km']:.2f} km."
    )

    return Question(
        id=bank.next_id("DIST"),
        node_id="c10_geo_001",
        question_type="numerical",
        difficulty="Medium",
        competency_level="Board",
        question_text=q_text,
        correct_answer=correct,
        explanation=explanation,
        marks=2,
        topic_tags=["distance_measurement", "scale", "topo_map", "rf"],
        params={"scale": scale, "map_cm": map_cm, "curved": curved}
    )


# ── NODE c10_geo_002: Contours and Landforms ─────────────────────────────────

def gen_landform_identification_mcq(bank: SeededQuestionBank) -> Question:
    """MCQ: Identify landform from contour description."""
    from geo.class10_geo_solver import solve_contour_landform

    patterns = [
        ("concentric_closed", "increasing", "Hill / Peak",
         "Concentric closed contours with increasing elevation towards centre = HILL"),
        ("concentric_closed", "decreasing", "Depression",
         "Concentric closed contours with decreasing elevation = DEPRESSION (hachure marks)"),
        ("V_shaped", "increasing", "Valley (River Valley)",
         "V-shaped contours pointing UPHILL = VALLEY (V opens downhill, water flows downhill)"),
        ("U_shaped", "increasing", "Ridge",
         "U-shaped contours pointing DOWNHILL = RIDGE (water divides on either side)"),
        ("U_shaped", "decreasing", "Valley",
         "U-shaped contours pointing UPHILL = VALLEY"),
        ("merging", "increasing", "Cliff",
         "Contours merging together = CLIFF (vertical or near-vertical drop)"),
        ("bench_like", "increasing", "Terraced Slope",
         "Step-like/bench-like contours = TERRACED slope"),
        ("concave", "increasing", "Concave Slope",
         "Contours widely spaced at top, closely at bottom = CONCAVE slope (slope gets steeper going down)"),
        ("convex", "increasing", "Convex Slope",
         "Contours closely spaced at top, widely at bottom = CONVEX slope (slope gets gentler going down)"),
        ("parallel_wide", "increasing", "Uniform Slope",
         "Evenly and widely spaced contours = UNIFORM slope"),
    ]

    idx = bank.randint(0, len(patterns) - 1)
    pattern, trend, correct_name, explanation_text = patterns[idx]

    result = solve_contour_landform(pattern, trend)
    correct = result["landform"]

    all_answers = [
        "Hill / Peak", "Valley (River Valley)", "Ridge", "Spur",
        "Cliff", "Plateau", "Concave Slope", "Convex Slope",
        "Uniform Slope", "Terraced Slope", "Depression"
    ]
    distractors = [a for a in all_answers if a != correct]
    distractors = bank.shuffle(distractors)[:3]

    options = bank.shuffle([correct] + distractors)

    q_text = (
        f"On a topographical map, you observe: {explanation_text}. "
        f"What landform does this pattern represent?"
    )

    return Question(
        id=bank.next_id("LAND"),
        node_id="c10_geo_002",
        question_type="mcq",
        difficulty="Hard",
        competency_level="Board",
        question_text=q_text,
        options=options,
        correct_answer=correct,
        explanation=explanation_text,
        marks=1,
        topic_tags=["contours", "landform_identification", "topo_map"],
        params={"pattern": pattern, "trend": trend}
    )


def gen_contour_interval_q(bank: SeededQuestionBank) -> Question:
    """Question on contour interval and calculation."""
    min_elev = bank.choice([100, 200, 300, 400, 500])
    ci = bank.choice([10, 20, 50])
    num_contours = bank.randint(3, 8)
    max_elev = min_elev + ci * num_contours

    q_type = bank.choice(["count_contours", "find_elevation", "find_interval"])

    if q_type == "count_contours":
        q_text = (
            f"A topographical map has a contour interval of {ci} m. "
            f"If the elevation ranges from {min_elev} m to {max_elev} m, "
            f"how many contour lines are shown?"
        )
        correct = str(num_contours + 1)  # inclusive
        explanation = (
            f"Number of contour lines = (max_elev - min_elev) / interval + 1 = "
            f"({max_elev} - {min_elev}) / {ci} + 1 = {num_contours} + 1 = {correct}"
        )

    elif q_type == "find_elevation":
        which = bank.randint(1, num_contours)
        elev = min_elev + which * ci
        q_text = (
            f"A topographical map has a contour interval of {ci} m. "
            f"If the first contour is at {min_elev} m, "
            f"what is the elevation of the {which}{'st' if which==1 else ('nd' if which==2 else ('rd' if which==3 else 'th'))} contour?"
        )
        correct = f"{elev} m"
        explanation = f"Elevation = base + (contour number × interval) = {min_elev} + ({which} × {ci}) = {elev} m"

    else:
        n = bank.randint(5, 10)
        elev_range = bank.choice([100, 200, 300, 500])
        ci_calc = elev_range // (n - 1)
        q_text = (
            f"A topographical map shows {n} contour lines spanning {elev_range} m. "
            f"What is the contour interval?"
        )
        correct = f"{ci_calc} m"
        explanation = f"Contour interval = Total elevation range / (number of intervals) = {elev_range} / {n-1} = {ci_calc} m"

    return Question(
        id=bank.next_id("CI"),
        node_id="c10_geo_002",
        question_type="numerical" if q_type != "count_contours" else "fill_blank",
        difficulty="Medium",
        competency_level="Board",
        question_text=q_text,
        correct_answer=correct,
        explanation=explanation,
        marks=1,
        topic_tags=["contour_interval", "contour_lines", "elevation"],
        params={"type": q_type}
    )


def gen_cross_section_question(bank: SeededQuestionBank) -> Question:
    """Question on drawing cross-sections from contour maps."""
    from geo.class10_geo_solver import solve_contour_cross_section_simple

    patterns = ["uniform", "hill", "valley", "convex", "concave"]
    pattern = bank.choice(patterns)
    start_elev = bank.choice([100, 200, 300, 400])
    end_elev = bank.choice([100, 200, 300, 400])
    distance = bank.choice([2, 3, 4, 5])
    ci = bank.choice([10, 20, 50])

    profile = solve_contour_cross_section_simple(
        start_elev, end_elev, distance, 8, ci, pattern
    )

    max_elev = max(e for _, e in profile)
    min_elev = min(e for _, e in profile)

    q_text = (
        f"A cross-section is drawn from point A (elevation {start_elev} m) to point B "
        f"(elevation {end_elev} m) across a terrain of pattern '{pattern}'. "
        f"The distance between A and B is {distance} km. "
        f"What is the maximum elevation along this cross-section?"
    )

    return Question(
        id=bank.next_id("XSECT"),
        node_id="c10_geo_002",
        question_type="short_answer",
        difficulty="Hard",
        competency_level="Board",
        question_text=q_text,
        correct_answer=f"Approximately {max_elev:.0f} m",
        explanation=(
            f"The cross-section profile shows elevation ranging from {min_elev:.0f} m to {max_elev:.0f} m. "
            f"On graph paper, plot distance (x-axis) vs elevation (y-axis) and join the points."
        ),
        marks=2,
        topic_tags=["cross_section", "contour_map", "landform"],
        params={"pattern": pattern, "start_elev": start_elev, "end_elev": end_elev, "distance": distance},
        cross_section_data=profile
    )


def gen_intervisibility_q(bank: SeededQuestionBank) -> Question:
    """Question on intervisibility between two points."""
    from geo.class10_geo_solver import solve_intervisibility

    visible = bank.choice([True, True, False])  # biased towards True

    obs_elev = bank.choice([200, 300, 400, 500])
    tgt_elev = bank.choice([100, 150, 200, 250])
    dist = bank.randint(2, 10)
    hill_elev = bank.choice([300, 400, 500, 600])
    hill_dist = dist // 2

    if visible:
        hill_elev = min(obs_elev, tgt_elev) + bank.randint(-20, 10)

    terrain = [
        (0, 0, obs_elev),
        (hill_dist * 0.5, 0, hill_elev - 20),
        (hill_dist, 0, hill_elev),
        (hill_dist * 1.5, 0, hill_elev - 30),
        (dist, 0, tgt_elev)
    ]

    observer = (0, 0, obs_elev)
    target = (dist, 0, tgt_elev)
    result = solve_intervisibility(observer, target, terrain)

    q_text = (
        f"An observer at point A (elevation {obs_elev} m) wants to see point B "
        f"(elevation {tgt_elev} m) which is {dist} km away. "
        f"A hill of elevation {hill_elev} m is located halfway between them. "
        f"Are A and B intervisible?"
    )

    correct = "Yes, they are intervisible" if result["intervisible"] else "No, the hill blocks the view"

    return Question(
        id=bank.next_id("INTERV"),
        node_id="c10_geo_002",
        question_type="short_answer",
        difficulty="Hard",
        competency_level="Board",
        question_text=q_text,
        correct_answer=correct,
        explanation=(
            f"Line of sight from A ({obs_elev} m) to B ({tgt_elev} m) over {dist} km. "
            f"The hill ({hill_elev} m) is at the midpoint. "
            f"{'The LOS passes above the hill, so they are intervisible.' if result['intervisible'] else 'The hill blocks the line of sight; they are NOT intervisible.'}"
        ),
        marks=2,
        topic_tags=["intervisibility", "cross_section", "line_of_sight", "contour_map"],
        params={"observer_elev": obs_elev, "target_elev": tgt_elev, "distance": dist, "hill_elev": hill_elev}
    )


# ── NODE c10_geo_003: Map of India ───────────────────────────────────────────

def gen_india_location_mcq(bank: SeededQuestionBank) -> Question:
    """MCQ: Locate features on the map of India."""
    all_features = INDIA_PHYSICAL_FEATURES + INDIA_POLITICAL_FEATURES + INDIA_INDUSTRIAL_CENTRES
    correct_feat = bank.choice(all_features)

    same_cat = [f for f in all_features if f.category == correct_feat.category and f.name != correct_feat.name]
    distractors = bank.shuffle(same_cat)[:3]
    if len(distractors) < 3:
        other = [f for f in all_features if f.name != correct_feat.name and f not in distractors]
        distractors += bank.shuffle(other)[:3 - len(distractors)]

    options = bank.shuffle([correct_feat.name] + [d.name for d in distractors])

    q_text = (
        f"On the outline map of India, locate and label: "
        f"{correct_feat.description} — {correct_feat.name}. "
        f"Which of the following options correctly identifies this feature?"
    )

    return Question(
        id=bank.next_id("INDLOC"),
        node_id="c10_geo_003",
        question_type="mcq",
        difficulty="Medium",
        competency_level="Board",
        question_text=q_text,
        options=options,
        correct_answer=correct_feat.name,
        explanation=(
            f"{correct_feat.name} is located at approximately "
            f"{correct_feat.lat:.1f}°N, {correct_feat.lon:.1f}°E."
        ),
        marks=1,
        topic_tags=["india_map", "location", "physical_features", "political_features"],
        params={"feature_name": correct_feat.name, "category": correct_feat.category}
    )


def gen_india_direction_q(bank: SeededQuestionBank) -> Question:
    """Question: Direction between two places on the map of India."""
    cities = [f for f in INDIA_POLITICAL_FEATURES if "capital" in f
]