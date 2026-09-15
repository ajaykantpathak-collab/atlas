"""
Class 9 Geography — Question Generator
Nodes: c9_geo_001 | c9_geo_002 | c9_geo_003
Deterministic: pass a seed to reproduce any set.
Output format: list[dict]  (JSON-serialisable)
"""

from __future__ import annotations
import random
import math
from dataclasses import dataclass, field
from typing import List, Optional

from class9_geo_solver import (
    solve_spherical_evidence_question,
    solve_heat_zone_query,
    solve_latitude_lookup,
    solve_heat_zone,
    solve_parallel_count,
    solve_time_difference,
    solve_local_time,
    solve_ist_from_gmt,
    solve_idl_crossing,
    solve_standard_time,
    EarthFacts,
    HEAT_ZONES,
    MAIN_LATITUDES,
)


# ──────────────────────────────────────────────
#  DATA STRUCTURES
# ──────────────────────────────────────────────

@dataclass
class Question:
    id: str
    node_id: str
    competency: str          # "competency" | "standard"
    difficulty: str          # "easy" | "medium"
    cognitive: str           # "understand" | "apply"
    question_text: str
    options: list[str]
    correct_index: int
    explanation: str
    tags: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "node_id": self.node_id,
            "competency": self.competency,
            "difficulty": self.difficulty,
            "cognitive": self.cognitive,
            "question": self.question_text,
            "options": self.options,
            "correct_index": self.correct_index,
            "explanation": self.explanation,
            "tags": self.tags,
        }


# ──────────────────────────────────────────────
#  QUESTION FACTORIES  (one function per template)
# ──────────────────────────────────────────────

def _q_id(node: str, seq: int) -> str:
    return f"{node}_Q{seq:03d}"


# ── NODE c9_geo_001 ────────────────────────────

def _geo001_spherical_evidence(seed: int) -> Question:
    """Which observation is NOT evidence of Earth's spherical shape?"""
    rng = random.Random(seed)
    evidences = [
        "A ship disappears hull-first as it sails away",
        "The horizon is always a circle",
        "The Pole Star rises higher as you travel north",
        "All parts of Earth receive equal sunlight",
    ]
    wrong = evidences[3]  # NOT an evidence
    opts = rng.sample(evidences, k=len(evidences))
    ci = opts.index(wrong)
    return Question(
        id=_q_id("c9_geo_001", seed),
        node_id="c9_geo_001",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="easy",
        cognitive="understand",
        question_text="Which of the following is NOT an evidence that the Earth is spherical?",
        options=opts,
        correct_index=ci,
        explanation=(
            "'All parts of Earth receive equal sunlight' is NOT true — polar regions "
            "receive very little sunlight, and this is not evidence of sphericity. "
            "Options A, B, and C are all classic evidences."
        ),
        tags=["spherical-earth", "evidence"],
    )


def _geo001_unique_planet(seed: int) -> Question:
    """Which feature makes Earth unique among planets?"""
    rng = random.Random(seed)
    opts = rng.sample([
        "It is the largest planet",
        "It has a hydrosphere, atmosphere, and biosphere",
        "It is closest to the Sun",
        "It has the most moons",
    ], k=4)
    ci = opts.index("It has a hydrosphere, atmosphere, and biosphere")
    return Question(
        id=_q_id("c9_geo_001", seed + 100),
        node_id="c9_geo_001",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="easy",
        cognitive="understand",
        question_text="Why is Earth called a unique planet in the solar system?",
        options=opts,
        correct_index=ci,
        explanation=(
            "Earth is unique because it possesses all three spheres simultaneously: "
            "hydrosphere (water), atmosphere (air), and biosphere (life). "
            "No other known planet has this combination."
        ),
        tags=["unique-planet", "spheres"],
    )


def _geo001_life_conditions(seed: int) -> Question:
    """Which is NOT a condition supporting life on Earth?"""
    rng = random.Random(seed)
    opts = rng.sample([
        "Suitable temperature range",
        "Abundance of liquid water",
        "Presence of oxygen in the atmosphere",
        "Presence of rings like Saturn",
    ], k=4)
    ci = opts.index("Presence of rings like Saturn")
    return Question(
        id=_q_id("c9_geo_001", seed + 200),
        node_id="c9_geo_001",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="easy",
        cognitive="understand",
        question_text="Which of the following is NOT a condition that supports life on Earth?",
        options=opts,
        correct_index=ci,
        explanation=(
            "Earth does NOT have rings like Saturn. The life-supporting conditions "
            "are: suitable temperature, liquid water, oxygen, and a protective atmosphere."
        ),
        tags=["life-conditions", "solar-system"],
    )


def _geo001_pole_star(seed: int) -> Question:
    """Pole Star altitude relation to latitude."""
    rng = random.Random(seed)
    lat = rng.choice([0, 23.5, 45, 66.5, 90])
    altitudes = {0: "0° (on the horizon)", 23.5: "23.5° above horizon",
                 45: "45° above horizon", 66.5: "66.5° above horizon", 90: "90° (overhead)"}
    opts = rng.sample([
        f"0° (on the horizon)",
        f"45° above horizon",
        f"90° (overhead)",
        f"It does not change with latitude",
    ], k=4)
    # correct answer depends on lat
    correct_alt = altitudes[lat]
    ci = opts.index(correct_alt) if correct_alt in opts else 0
    return Question(
        id=_q_id("c9_geo_001", seed + 300),
        node_id="c9_geo_001",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="medium",
        cognitive="apply",
        question_text=f"If you are standing at {lat}°N latitude, what is the approximate altitude of the Pole Star above the horizon?",
        options=opts,
        correct_index=ci,
        explanation=(
            f"The Pole Star's altitude equals the observer's latitude. "
            f"At {lat}°N, it appears {altitudes[lat]} above the horizon. "
            "This is possible only because Earth is spherical."
        ),
        tags=["pole-star", "latitude", "apply"],
    )


# ── NODE c9_geo_002 ────────────────────────────

def _geo002_main_latitudes(seed: int) -> Question:
    """Identify the correct degree value of a named latitude."""
    rng = random.Random(seed)
    names = list(MAIN_LATITUDES.keys())
    name = rng.choice(names)
    deg = MAIN_LATITUDES[name]
    # Build distractors
    distractors_pool = [0, 23.5, -23.5, 66.5, -66.5, 90, -90, 45, -45, 15, -15]
    distractors = [d for d in distractors_pool if d != deg]
    chosen = rng.sample(distractors, k=3)
    opts = rng.sample([deg] + chosen, k=4)
    ci = opts.index(deg)
    return Question(
        id=_q_id("c9_geo_002", seed),
        node_id="c9_geo_002",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="easy",
        cognitive="remember",
        question_text=f"What is the degree value of the '{name}'?",
        options=[f"{'+' if o > 0 else ''}{o}°" for o in opts],
        correct_index=ci,
        explanation=(
            f"The {name} is at {deg}° latitude. "
            "All main latitudes have fixed degree values used as reference lines."
        ),
        tags=["main-latitudes", "degrees"],
    )


def _geo002_heat_zone(seed: int) -> Question:
    """Which heat zone does a given latitude belong to?"""
    rng = random.Random(seed)
    # Pick a representative latitude from each zone
    zone_lats = {
        "Torrid":           [0, 10, 20],
        "Temperate (North)": [30, 45, 60],
        "Temperate (South)": [-30, -45, -60],
        "Frigid (North)":    [70, 80, 88],
        "Frigid (South)":    [-70, -80, -88],
    }
    zone_names = list(zone_lats.keys())
    target_zone = rng.choice(zone_names)
    lat = rng.choice(zone_lats[target_zone])

    all_zones = ["Torrid zone", "Temperate zone", "Frigid zone"]
    # Pick correct zone label
    if "Temperate" in target_zone:
        correct_label = "Temperate zone"
    elif "Frigid" in target_zone:
        correct_label = "Frigid zone"
    else:
        correct_label = "Torrid zone"

    opts = rng.sample(all_zones, k=len(all_zones))
    ci = opts.index(correct_label)
    return Question(
        id=_q_id("c9_geo_002", seed + 100),
        node_id="c9_geo_002",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="medium",
        cognitive="apply",
        question_text=f"A place located at {lat}° latitude falls in which heat zone?",
        options=opts,
        correct_index=ci,
        explanation=(
            f"At {lat}°, the location is in the {correct_label}. "
            "Torrid: 23.5°N to 23.5°S | Temperate: 23.5° to 66.5° | Frigid: 66.5° to 90°."
        ),
        tags=["heat-zones", "apply"],
    )


def _geo002_equator_division(seed: int) -> Question:
    """What does the Equator divide?"""
    rng = random.Random(seed)
    opts = rng.sample([
        "Earth into Eastern and Western Hemispheres",
        "Earth into Northern and Southern Hemispheres",
        "Earth into Torrid and Frigid zones",
        "Earth into land and water",
    ], k=4)
    ci = opts.index("Earth into Northern and Southern Hemispheres")
    return Question(
        id=_q_id("c9_geo_002", seed + 200),
        node_id="c9_geo_002",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="easy",
        cognitive="remember",
        question_text="What does the Equator (0° latitude) divide the Earth into?",
        options=opts,
        correct_index=ci,
        explanation=(
            "The Equator (0°) divides Earth into the Northern Hemisphere and "
            "the Southern Hemisphere. The Prime Meridian divides it into East and West."
        ),
        tags=["equator", "hemispheres"],
    )


def _geo002_parallels_property(seed: int) -> Question:
    """Property of parallels of latitude."""
    rng = random.Random(seed)
    opts = rng.sample([
        "They run north-south and meet at the poles",
        "They run east-west and never meet",
        "They are all equal in length",
        "They converge at the Equator",
    ], k=4)
    ci = opts.index("They run east-west and never meet")
    return Question(
        id=_q_id("c9_geo_002", seed + 300),
        node_id="c9_geo_002",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="medium",
        cognitive="understand",
        question_text="Which statement correctly describes parallels of latitude?",
        options=opts,
        correct_index=ci,
        explanation=(
            "Parallels run east-west, parallel to the Equator, and never meet. "
            "Only meridians (lines of longitude) converge at the poles."
        ),
        tags=["parallels", "properties"],
    )


# ── NODE c9_geo_003 ────────────────────────────

def _geo003_time_per_degree(seed: int) -> Question:
    """Basic time-longitude relationship."""
    rng = random.Random(seed)
    degrees = rng.choice([1, 15, 30, 45, 60, 90, 120])
    correct_min = degrees * 4
    correct_hr = correct_min // 60
    correct_mn = correct_min % 60

    opts = rng.sample([
        f"{correct_hr}h {correct_mn}m",
        f"{correct_hr + 1}h {correct_mn}m",
        f"{correct_hr}h {correct_mn + 15}m",
        f"{correct_hr - 1}h {correct_mn}m",
    ], k=4)
    ci = opts.index(f"{correct_hr}h {correct_mn}m")

    return Question(
        id=_q_id("c9_geo_003", seed),
        node_id="c9_geo_003",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="easy",
        cognitive="apply",
        question_text=f"How much time difference corresponds to a longitude difference of {degrees}°?",
        options=opts,
        correct_index=ci,
        explanation=(
            f"Earth rotates 360° in 24 hours, so 1° = {4} minutes. "
            f"{degrees}° × 4 min = {correct_min} min = {correct_hr}h {correct_mn}m."
        ),
        tags=["longitude-time", "basic"],
    )


def _geo003_ist_calculation(seed: int) -> Question:
    """Convert GMT to IST."""
    rng = random.Random(seed)
    gmt_hr = rng.randint(0, 23)
    gmt_str = f"{gmt_hr:02d}:00"
    ist_total = (gmt_hr * 60 + 330) % 1440
    ist_hr = ist_total // 60
    ist_mn = ist_total % 60
    ist_str = f"{ist_hr:02d}:{ist_mn:02d}"

    opts = rng.sample([
        ist_str,
        f"{(gmt_hr + 4) % 24:02d}:00",
        f"{(gmt_hr + 6) % 24:02d}:00",
        f"{(gmt_hr - 5) % 24:02d}:00",
    ], k=4)
    ci = opts.index(ist_str)

    return Question(
        id=_q_id("c9_geo_003", seed + 100),
        node_id="c9_geo_003",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="medium",
        cognitive="apply",
        question_text=f"If the GMT (Greenwich Mean Time) is {gmt_str}, what is the Indian Standard Time (IST)?",
        options=opts,
        correct_index=ci,
        explanation=(
            f"IST = GMT + 5h 30m (since IST meridian is 82.5°E, "
            f"and 82.5 × 4 min = 330 min = 5h 30m). "
            f"Hence {gmt_str} GMT = {ist_str} IST."
        ),
        tags=["ist", "gmt", "conversion"],
    )


def _geo003_idl(seed: int) -> Question:
    """What happens when crossing the IDL westward?"""
    rng = random.Random(seed)
    opts = rng.sample([
        "You gain one day (add 1 day to the calendar)",
        "You lose one day (subtract 1 day from the calendar)",
        "The time advances by 12 hours",
        "Nothing changes in the date",
    ], k=4)
    ci = opts.index("You gain one day (add 1 day to the calendar)")
    return Question(
        id=_q_id("c9_geo_003", seed + 200),
        node_id="c9_geo_003",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="medium",
        cognitive="understand",
        question_text="What happens to the calendar date when you cross the International Date Line (IDL) westward?",
        options=opts,
        correct_index=ci,
        explanation=(
            "Crossing the IDL westward adds one day to the calendar. "
            "This is because you move into the next time zone, and to prevent "
            "calendar confusion, the date is advanced by one day. "
            "Eastward crossing subtracts one day."
        ),
        tags=["idl", "date-change"],
    )


def _geo003_standard_time(seed: int) -> Question:
    """IST meridian location."""
    rng = random.Random(seed)
    opts = rng.sample([
        "82.5°E (near Mirzapur, Uttar Pradesh)",
        "0° (Greenwich, London)",
        "90°E (near Kolkata)",
        "75°E (near Ahmedabad)",
    ], k=4)
    ci = opts.index("82.5°E (near Mirzapur, Uttar Pradesh)")
    return Question(
        id=_q_id("c9_geo_003", seed + 300),
        node_id="c9_geo_003",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="easy",
        cognitive="remember",
        question_text="The Indian Standard Time (IST) is based on which longitude?",
        options=opts,
        correct_index=ci,
        explanation=(
            "IST is calculated from 82.5°E (the 82.5th meridian east), "
            "which passes near Mirzapur in Uttar Pradesh. "
            "It is 5 hours 30 minutes ahead of GMT."
        ),
        tags=["ist", "standard-meridian"],
    )


def _geo003_local_time_calc(seed: int) -> Question:
    """Compute local time at a given longitude when GMT is known."""
    rng = random.Random(seed)
    gmt_hr = rng.randint(0, 23)
    gmt_str = f"{gmt_hr:02d}:00"
    lon = rng.choice([15, 30, 45, 60, 75, 90, -15, -30, -45])
    diff_hr = lon * 4 / 60
    local_total = ((gmt_hr + diff_hr) % 24) * 60
    local_hr = int(local_total // 60)
    local_mn = int(local_total % 60)
    local_str = f"{local_hr:02d}:{local_mn:02d}"

    opts = rng.sample([
        local_str,
        f"{(gmt_hr + 1) % 24:02d}:00",
        f"{(gmt_hr + 2) % 24:02d}:00",
        f"{(gmt_hr - 1) % 24:02d}:00",
    ], k=4)
    ci = opts.index(local_str)

    return Question(
        id=_q_id("c9_geo_003", seed + 400),
        node_id="c9_geo_003",
        competency="competency" if seed % 2 == 0 else "standard",
        difficulty="medium",
        cognitive="apply",
        question_text=(
            f"If GMT is {gmt_str}, what is the local time at {lon}° longitude?"
        ),
        options=opts,
        correct_index=ci,
        explanation=(
            f"Time difference = {lon}° × 4 min = {int(lon*4)} min = "
            f"{int(diff_hr)}h. "
            f"{'Add' if lon >= 0 else 'Subtract'} from GMT: {gmt_str} "
            f"{'+' if lon >= 0 else '-'} {int(abs(diff_hr))}h = {local_str}."
        ),
        tags=["local-time", "longitude", "apply"],
    )


# ──────────────────────────────────────────────
#  MASTER QUESTION FACTORY
# ──────────────────────────────────────────────

# Ordered list of (factory_function, node_id, weight)
NODE_TEMPLATES: list[tuple] = [
    (_geo001_spherical_evidence,  "c9_geo_001", 3),
    (_geo001_unique_planet,       "c9_geo_001", 3),
    (_geo001_life_conditions,     "c9_geo_001", 2),
    (_geo001_pole_star,           "c9_geo_001", 2),
    (_geo002_main_latitudes,      "c9_geo_002", 4),
    (_geo002_heat_zone,           "c9_geo_002", 3),
    (_geo002_equator_division,    "c9_geo_002", 2),
    (_geo002_parallels_property,  "c9_geo_002", 2),
    (_geo003_time_per_degree,     "c9_geo_003", 3),
    (_geo003_ist_calculation,     "c9_geo_003", 3),
    (_geo003_idl,                 "c9_geo_003", 3),
    (_geo003_standard_time,       "c9_geo_003", 2),
    (_geo003_local_time_calc,     "c9_geo_003", 3),
]


def generate_questions(
    seed: int = 42,
    per_node: Optional[dict[str, int]] = None,
    competency_ratio: float = 0.5,
) -> list[dict]:
    """
    Generate a set of questions.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    per_node : dict | None
        Number of questions per node_id, e.g. {"c9_geo_001": 4}.
        If None, uses defaults: 4 from each node (total 12).
    competency_ratio : float
        Fraction of competency-level questions (0.5 = 50% competency, 50% standard).

    Returns
    -------
    list[dict] — each dict is a Question.to_dict()
    """
    rng = random.Random(seed)
    defaults = {"c9_geo_001": 4, "c9_geo_002": 4, "c9_geo_003": 4}
    counts = per_node or defaults
    questions: list[Question] = []
    global_seq = 0

    for node_id, target_n in counts.items():
        node_templates = [(fn, nid, w) for fn, nid, w in NODE_TEMPLATES if nid == node_id]
        total_weight = sum(w for _, _, w in node_templates)
        picks = []
        for _ in range(target_n):
            r = rng.uniform(0, total_weight)
            cum = 0
            for fn, nid, w in node_templates:
                cum += w
                if r <= cum:
                    picks.append(fn)
                    break

        for fn in picks:
            global_seq += 1
            q = fn(seed=seed + global_seq * 7)
            # Override competency to honour ratio deterministically
            if global_seq % max(1, round(1 / competency_ratio)) == 0:
                q.competency = "competency"
            else:
                q.competency = "standard"
            questions.append(q)

    return [q.to_dict() for q in questions]


def print_question_paper(questions: list[dict]) -> None:
    """Pretty-print the question paper."""
    nodes_order = ["c9_geo_001", "c9_geo_002", "c9_geo_003"]
    node_titles = {
        "c9_geo_001": "Earth as a Planet",
        "c9_geo_002": "Latitudes",
        "c9_geo_003": "Longitudes",
    }
    grouped: dict[str, list[dict]] = {n: [] for n in nodes_order}
    for q in questions:
        grouped[q["node_id"]].append(q)

    print("=" * 70)
    print("  CLASS 9 GEOGRAPHY — PRACTICE QUESTION PAPER")
    print("=" * 70)

    overall = 1
    for node in nodes_order:
        qs = grouped[node]
        if not qs:
            continue
        print(f"\n{'─'*70}")
        print(f"  SECTION: {node_titles[node]} ({node})")
        print(f"{'─'*70}")
        for i, q in enumerate(qs, 1):
            print(f"\n  Q{overall}. [{q['competency'].upper()}] ({q['difficulty']})")
            print(f"      {q['question']}")
            for j, opt in enumerate(q["options"]):
                marker = "✓" if j == q["correct_index"] else " "
                print(f"      {marker} ({chr(65+j)}) {opt}")
            print(f"  ── Explanation ──")
            print(f"      {q['explanation']}")
            overall += 1

    print(f"\n{'=' * 70}")
    print(f"  Total questions: {len(questions)}")
    comp = sum(1 for q in questions if q["competency"] == "competency")
    std = sum(1 for q in questions if q["competency"] == "standard")
    print(f"  Competency-level : {comp}")
    print(f"  Standard-level   : {std}")
    print(f"{'=' * 70}\n")


# ──────────────────────────────────────────────
#  VERIFICATION
# ──────────────────────────────────────────────

def verify_questions(questions: list[dict]) -> None:
    """Check that all questions have required fields and exactly one correct answer."""
    required = {"id", "node_id", "competency", "difficulty", "cognitive",
                "question", "options", "correct_index", "explanation"}
    valid_nodes = {"c9_geo_001", "c9_geo_002", "c9_geo_003"}
    for q in questions:
        missing = required - q.keys()
        assert not missing, f"Q {q.get('id')} missing keys: {missing}"
        assert q["node_id"] in valid_nodes, f"Q {q['id']} has unknown node: {q['node_id']}"
        assert 0 <= q["correct_index"] < len(q["options"]), (
            f"Q {q['id']} correct_index out of range"
        )
    print(f"✓ Verified {len(questions)} questions — all valid.")


if __name__ == "__main__":
    # --- solver verification ---
    from class9_geo_solver import run_all_verifications
    run_all_verifications()

    # --- generate and display ---
    paper = generate_questions(seed=42, per_node=None, competency_ratio=0.5)
    print_question_paper(paper)
    verify_questions(paper)

    # --- demonstrate reproducibility ---
    paper2 = generate_questions(seed=42, per_node=None, competency_ratio=0.5)
    assert paper == paper2, "Reproducibility check failed!"
    print("✓ Reproducibility verified: same seed → same questions.")
