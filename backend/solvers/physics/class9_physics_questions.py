"""
Class 9 Physics Question Generator
Nodes: c9_phy_001 (SI/cgs/fps), c9_phy_002 (Least Count), c9_phy_003 (Vernier)
Deterministic — seeded RNG. 50% Indian textbook style, 50% standard.
"""

import random
import textwrap
from dataclasses import dataclass, field
from typing import List, Optional

from class9_physics_solver import (
    # Node 001
    convert_quantity,
    LENGTH_CONVERSIONS, MASS_CONVERSIONS, TIME_CONVERSIONS, SPEED_CONVERSIONS,
    LENGTH_UNITS_BY_SYSTEM, MASS_UNITS_BY_SYSTEM, TIME_UNITS_BY_SYSTEM,
    SYSTEM_LABELS, _guess_system,
    # Node 002
    compute_lc, generate_lc_scenario, solve_node002,
    # Node 003
    generate_vernier_problem, read_vernier, VernierProblem,
    solve_zero_error, explain_zero_error_type,
)

SEED_DEFAULT = 2026


# =====================================================================
# Data structures
# =====================================================================

@dataclass
class Question:
    node: str
    id: str
    difficulty: str          # Easy | Medium | Hard
    cognitive: str           # Remember | Understand | Apply
    style: str               # indian | standard
    prompt: str
    options: Optional[List[str]] = None     # for MCQ
    answer: str = ""
    explanation: str = ""
    marks: int = 1
    tags: List[str] = field(default_factory=list)
    # Solver output attached for verification
    solver_output: Optional[dict] = None


@dataclass
class Worksheet:
    title: str
    questions: List[Question]
    total_marks: int
    seed_used: int


# =====================================================================
# Helpers
# =====================================================================

def _rng(seed: int) -> random.Random:
    return random.Random(seed)


def _pick(rng: random.Random, seq):
    return seq[rng.randint(0, len(seq) - 1)]


def _shuffle(rng: random.Random, lst: list) -> list:
    out = list(lst)
    rng.shuffle(out)
    return out


def _round_nice(value: float, sig: int = 3) -> float:
    """Round to a textbook-friendly value."""
    if value == 0:
        return 0.0
    from math import floor, log10
    d = sig - 1 - int(floor(log10(abs(value))))
    return round(value, max(d, 0))


# =====================================================================
# NODE 1 — c9_phy_001: SI / cgs / fps Questions
# =====================================================================

LENGTH_PAIRS = [
    ("m", "cm"),  ("m", "mm"),  ("m", "km"),   ("m", "ft"),
    ("cm", "m"),  ("cm", "mm"), ("cm", "ft"),
    ("ft", "m"),  ("ft", "cm"), ("ft", "mm"),
    ("mm", "cm"), ("mm", "m"),
    ("km", "m"),  ("km", "cm"),
]
MASS_PAIRS = [
    ("kg", "g"),  ("kg", "mg"), ("kg", "lb"),
    ("g",  "kg"), ("g",  "mg"), ("g",  "lb"),
    ("lb", "kg"), ("lb", "g"),
]
TIME_PAIRS = [
    ("s", "min"), ("s", "h"),    ("s", "day"),  ("s", "ms"),
    ("min", "s"), ("min", "h"),
    ("h",   "s"), ("h",   "min"),
]
SPEED_PAIRS = [
    ("m/s", "km/h"), ("km/h", "m/s"), ("m/s", "cm/s"),
]


def _generate_conversion_values(rng, from_u, to_u, category):
    """
    Return a (value, exact_answer) pair chosen to give a clean textbook number.
    """
    tables = {
        "length": LENGTH_CONVERSIONS,
        "mass":   MASS_CONVERSIONS,
        "time":   TIME_CONVERSIONS,
        "speed":  SPEED_CONVERSIONS,
    }
    table = tables[category]
    key = (from_u, to_u)
    if key not in table:
        key = (to_u, from_u)
        flip = True
    else:
        flip = False
    factor = table[key]

    # Choose a value that gives a nice answer
    nice_from = [1, 2, 5, 10, 25, 50, 100, 500, 1000]
    choice = rng.choice(nice_from)
    if flip:
        raw = choice / factor
        answer = choice
    else:
        raw = choice * factor
        answer = raw

    # Round nicely
    val = _round_nice(raw, 4)
    ans = _round_nice(answer, 4)
    return val, ans


def q_001_conversion(rng, style: str = "indian") -> Question:
    """Unit conversion question."""
    category = rng.choice(["length", "mass", "time", "speed"])

    pair_sets = {
        "length": LENGTH_PAIRS,
        "mass":   MASS_PAIRS,
        "time":   TIME_PAIRS,
        "speed":  SPEED_PAARS if False else SPEED_PAIRS,
    }
    pair = _pick(rng, pair_sets[category])
    from_u, to_u = pair

    val, ans = _generate_conversion_values(rng, from_u, to_u, category)

    sys_from = _guess_system(from_u)
    sys_to   = _guess_system(to_u)

    if style == "indian":
        prompts = [
            f"Convert {val} {from_u} into {to_u}.",
            f"Express {val} {from_u} in the unit of {to_u}.",
            f"How many {to_u} are there in {val} {from_u}?",
            f"Change {val} {from_u} into {to_u}.",
            f"Convert {val} {from_u} to {to_u}. Give your answer correct to two decimal places.",
        ]
        explanations = [
            f"1 {from_u} = {round(val/ans, 6)} {to_u}. Therefore, {val} {from_u} "
            f"= {val} × {round(val/ans, 6)} {to_u} = {ans} {to_u}.",
            f"Using the conversion 1 {from_u} = {round(val/ans, 6)} {to_u}, "
            f"multiply {val} by {round(val/ans, 6)} to get {ans} {to_u}.",
        ]
    else:
        prompts = [
            f"Express {val} {from_u} in {to_u}.",
            f"Convert {val} {from_u} to {to_u}.",
        ]
        explanations = [
            f"1 {from_u} = {round(val/ans, 6)} {to_u}, so {val} {from_u} = {ans} {to_u}.",
        ]

    prompt = _pick(rng, prompts)
    explanation = _pick(rng, explanations)

    # Build MCQ options
    correct_str = f"{ans}"
    wrong_choices = _generate_wrong_options(rng, ans, category, to_u, n=3)
    options = _shuffle(rng, [correct_str] + wrong_choices)
    option_labels = ["A", "B", "C", "D"]
    options_str = "\n".join(f"({lbl}) {opt}" for lbl, opt in zip(option_labels, options))
    correct_label = option_labels[options.index(correct_str)]

    return Question(
        node="c9_phy_001",
        id=f"q001_conv_{from_u}_{to_u}",
        difficulty="Medium",
        cognitive="Understand",
        style=style,
        prompt=f"{prompt}\n\nOptions:\n{options_str}",
        options=[f"({lbl}) {opt}" for lbl, opt in zip(option_labels, options)],
        answer=f"({correct_label}) {correct_str}",
        explanation=explanation + f"\n\nCorrect option: ({correct_label})",
        marks=1,
        tags=["unit-conversion", category, sys_from, sys_to],
    )


def _generate_wrong_options(rng, correct: float, category: str, unit: str, n: int = 3) -> List[str]:
    """Generate plausible wrong MCQ options."""
    wrongs = set()
    attempts = 0
    while len(wrongs) < n and attempts < 50:
        attempts += 1
        # Vary by ±10%, ±50%, factor-of-10 errors
        factor = rng.choice([0.1, 0.5, 2, 5, 10, 100, 1000])
        if rng.random() < 0.5:
            factor = 1.0 / factor
        w = round(correct * factor, 4)
        if w != correct and w > 0:
            wrongs.add(f"{w}")
    # fallback
    for i in range(1, 10):
        if len(wrongs) >= n:
            break
        wrongs.add(f"{correct + i * abs(correct) * 0.1}")
    return list(wrongs)[:n]


def q_001_identify_system(rng, style: str = "indian") -> Question:
    """Identify which unit system a unit belongs to."""
    systems = {
        "SI":  ["m", "kg", "s", "K", "A", "mol", "cd", "N", "J", "W", "Pa", "Hz", "C", "V", "Ω"],
        "cgs": ["cm", "g", "s", "dyne", "erg"],
        "fps": ["ft", "lb", "s", "poundal"],
    }
    sys = rng.choice(["SI", "cgs", "fps"])
    unit = _pick(rng, systems[sys])

    if style == "indian":
        prompt = f"The unit '{unit}' belongs to which system of units?"
        options_map = {"SI": "(A) SI", "cgs": "(B) cgs", "fps": "(C) fps"}
        distractors = [s for s in ["SI", "cgs", "fps"] if s != sys]
    else:
        prompt = f"Which system of units does '{unit}' belong to?"
        options_map = {"SI": "(A) MKS/SI", "cgs": "(B) CGS", "fps": "(C) FPS"}
        distractors = [s for s in ["MKS/SI", "CGS", "FPS"] if s != sys.replace("fps","FPS").replace("cgs","CGS").replace("SI","MKS/SI")]

    options = [options_map[sys]] + [options_map.get(d, f"({chr(65+i+1)}) {d}") for i, d in enumerate(distractors[:2])]
    # Fix labels
    labels = ["(A)", "(B)", "(C)"]
    opts = [f"{labels[i]} {opt.split(') ')[1]}" for i, opt in enumerate(options)]
    correct_letter = labels[options.index(options_map[sys])]

    return Question(
        node="c9_phy_001",
        id=f"q001_sys_{sys}_{unit}",
        difficulty="Easy",
        cognitive="Remember",
        style=style,
        prompt=prompt + "\n\nOptions:\n" + "\n".join(opts),
        options=opts,
        answer=f"{correct_letter}) {options_map[sys].split(') ')[1]}",
        explanation=f"'{unit}' is a unit in the {SYSTEM_LABELS[sys]} system.",
        marks=1,
        tags=["system-identification", sys],
    )


def q_001_three_systems_table(rng, style: str = "indian") -> Question:
    """Fill-in-the-blank for base units across three systems."""
    quantity = rng.choice(["length", "mass", "time"])
    systems_order = _shuffle(rng, ["SI", "cgs", "fps"])

    base = {
        "length": {"SI": ("m", "metre"),   "cgs": ("cm", "centimetre"), "fps": ("ft", "foot")},
        "mass":   {"SI": ("kg", "kilogram"), "cgs": ("g", "gram"),        "fps": ("lb", "pound")},
        "time":   {"SI": ("s", "second"),    "cgs": ("s", "second"),      "fps": ("s", "second")},
    }

    units_str = "  |  ".join(f"{sys}: {base[quantity][sys][1]} ({base[quantity][sys][0]})" for sys in systems_order)
    systems_str = ", ".join(systems_order)

    prompt = (
        f"Fill in the base units for {quantity} in the three systems of units "
        f"({systems_str}):\n\n{units_str}"
    )
    answer_parts = [f"{sys}: {base[quantity][sys][0]}" for sys in systems_order]
    explanation = (
        f"In the SI system, the base unit for {quantity} is the {base[quantity]['SI'][1]} "
        f"({base[quantity]['SI'][0]}). In the cgs system, it is the "
        f"{base[quantity]['cgs'][1]} ({base[quantity]['cgs'][0]}). "
        f"In the fps system, it is the {base[quantity]['fps'][1]} ({base[quantity]['fps'][0]})."
    )

    return Question(
        node="c9_phy_001",
        id=f"q001_tbl_{quantity}",
        difficulty="Medium",
        cognitive="Understand",
        style=style,
        prompt=prompt,
        answer=" | ".join(answer_parts),
        explanation=explanation,
        marks=2,
        tags=["three-systems", quantity, "fill-blank"],
    )


# =====================================================================
# NODE 2 — c9_phy_002: Least Count Questions
# =====================================================================

def q_002_find_lc(rng, style: str = "indian") -> Question:
    """Calculate least count from MSD and n."""
    scenario = generate_lc_scenario(rng.randint(0, 9999))
    msd, n, lc = scenario.main_scale_division, scenario.vernier_divisions, scenario.lc

    units = {"mm": "mm", "s": "s", "°C": "°C", "A": "A", "V": "V", "cm": "cm"}
    unit = units.get(_guess_lc_unit(msd), "mm")

    if style == "indian":
        prompt = (
            f"The main scale of an instrument is graduated in {msd} {unit} divisions. "
            f"The vernier scale has {n} divisions that coincide with {n-1} main scale divisions. "
            f"Calculate the least count of the instrument."
        )
        answer_str = f"LC = {msd}/{n} = {lc} {unit}"
        explanation = (
            f"LC = Value of 1 MSD / Number of vernier divisions\n"
            f"LC = {msd} {unit} / {n} = {lc} {unit}"
        )
    else:
        prompt = (
            f"A measuring instrument has {n} vernier divisions spanning {n-1} main scale divisions. "
            f"Each main scale division is {msd} {unit}. Find the least count."
        )
        answer_str = f"LC = {lc} {unit}"
        explanation = f"LC = {msd}/{n} = {lc} {unit}"

    # MCQ
    correct_str = f"{lc} {unit}"
    wrongs = {f"{lc*10} {unit}", f"{lc*100} {unit}", f"{round(lc/10, 8)} {unit}"}
    options = _shuffle(rng, [correct_str] + list(wrongs))
    labels = ["(A)", "(B)", "(C)", "(D)"]
    opts_str = "\n".join(f"{lbl} {o}" for lbl, o in zip(labels, options))
    correct_lbl = labels[options.index(correct_str)]

    return Question(
        node="c9_phy_002",
        id=f"q002_lc_{rng.randint(1000,9999)}",
        difficulty="Medium",
        cognitive="Apply",
        style=style,
        prompt=prompt + "\n\nOptions:\n" + opts_str,
        options=[f"{lbl} {o}" for lbl, o in zip(labels, options)],
        answer=f"{correct_lbl}) {correct_str}",
        explanation=explanation + f"\n\nCorrect: ({correct_lbl})",
        marks=1,
        tags=["least-count", "calculation"],
    )


def _guess_lc_unit(msd: float) -> str:
    if msd < 1:
        return "s"
    return "mm"


def q_002_lc_accuracy(rng, style: str = "indian") -> Question:
    """Conceptual: why smaller LC means higher accuracy."""
    if style == "indian":
        prompt = (
            "State the relationship between least count and accuracy of a measuring instrument.\n"
            "Give one example to illustrate your answer."
        )
        answer = (
            "Accuracy is inversely proportional to least count. "
            "A smaller least count means the instrument can measure smaller differences, "
            "hence it is more accurate. "
            "Example: A screw gauge (LC = 0.01 mm) is more accurate than a ruler (LC = 1 mm)."
        )
        explanation = (
            "Least Count = smallest measurable value. "
            "If LC is small → finer measurements → higher accuracy. "
            "Conversely, larger LC → coarser measurements → lower accuracy."
        )
    else:
        prompt = (
            "Explain why a measuring instrument with a smaller least count "
            "provides more accurate measurements."
        )
        answer = (
            "Accuracy ∝ 1/LC. A smaller LC means the instrument resolves "
            "smaller differences between readings, capturing finer detail. "
            "Example: A digital caliper with LC = 0.01 mm vs a ruler with LC = 1 mm."
        )
        explanation = (
            "LC defines the minimum detectable change. "
            "Smaller LC → more gradations per unit length → more precise readings."
        )

    return Question(
        node="c9_phy_002",
        id=f"q002_acc_{rng.randint(1000,9999)}",
        difficulty="Medium",
        cognitive="Understand",
        style=style,
        prompt=prompt,
        answer=answer,
        explanation=explanation,
        marks=2,
        tags=["least-count", "accuracy", "conceptual"],
    )


def q_002_lc_instrument(rng, style: str = "indian") -> Question:
    """Identify LC of common instruments."""
    instruments = [
        ("a standard ruler graduated in millimetres", "1 mm"),
        ("a standard stopwatch with 0.1 s graduations", "0.1 s"),
        ("a digital stopwatch with 0.01 s precision", "0.01 s"),
        ("a laboratory thermometer graduated in 0.1 °C", "0.1 °C"),
        ("an ordinary thermometer graduated in 1 °C", "1 °C"),
        ("a vernier caliper with 10 vernier divisions", "0.1 mm"),
        ("a screw gauge with 50 thimble divisions", "0.01 mm"),
    ]
    desc, correct_lc = _pick(rng, instruments)

    if style == "indian":
        prompt = f"What is the least count of {desc}?"
    else:
        prompt = f"State the least count of {desc}."

    # MCQ
    unit = correct_lc.split()[1]
    val = float(correct_lc.split()[0])
    wrongs_vals = [val*10, val*100, val/10 if val/10 > 0 else val*2]
    wrongs = [f"{_round_nice(w, 4)} {unit}" for w in wrongs_vals]
    options = _shuffle(rng, [correct_lc] + wrongs)
    labels = ["(A)", "(B)", "(C)", "(D)"]
    opts_str = "\n".join(f"{lbl} {o}" for lbl, o in zip(labels, options))
    correct_lbl = labels[options.index(correct_lc)]

    return Question(
        node="c9_phy_002",
        id=f"q002_inst_{rng.randint(1000,9999)}",
        difficulty="Easy",
        cognitive="Remember",
        style=style,
        prompt=prompt + "\n\nOptions:\n" + opts_str,
        options=[f"{lbl} {o}" for lbl, o in zip(labels, options)],
        answer=f"{correct_lbl}) {correct_lc}",
        explanation=f"The least count is the smallest division on the instrument, which is {correct_lc}.\nCorrect: ({correct_lbl})",
        marks=1,
        tags=["least-count", "instrument", "recall"],
    )


# =====================================================================
# NODE 3 — c9_phy_003: Vernier Callipers Questions
# =====================================================================

def q_003_reading(rng, style: str = "indian") -> Question:
    """Read a Vernier caliper measurement."""
    vp = generate_vernier_problem(rng.randint(0, 99999))
    result = read_vernier(vp)
    lc = vp.lc
    msd = vp.msd
    msr = vp.ms_reading
    vc  = vp.vc
    ze  = vp.zero_error

    unit = "mm"

    # ---- MCQ ----
    observed_str = f"{result['observed_reading']} {unit}"
    # Generate wrong options
    wrongs = set()
    attempts = 0
    while len(wrongs) < 3 and attempts < 30:
        attempts += 1
        candidates = [
            msr * msd,                              # MSR only (no VC)
            msr * msd + (vc + rng.randint(1, 5)) * lc,  # wrong VC
            msr * msd + vc * lc + rng.choice([-1, 1]) * lc,  # off by one LC
            round((msr + rng.randint(-1, 1)) * msd + vc * lc, 4),  # wrong MSR
        ]
        w = _round_nice(rng.choice(candidates), 4)
        if w != result['observed_reading'] and w > 0:
            wrongs.add(f"{w} {unit}")

    # Fill if needed
    fallback = [result['observed_reading'] + i * lc for i in [-2, -1, 1, 2]]
    for f in fallback:
        if len(wrongs) >= 3:
            break
        wrongs.add(f"{_round_nice(f, 4)} {unit}")

    options = _shuffle(rng, [observed_str] + list(wrongs)[:3])
    labels = ["(A)", "(B)", "(C)", "(D)"]
    opts_str = "\n".join(f"{lbl} {o}" for lbl, o in zip(labels, options))
    correct_lbl = labels[options.index(observed_str)]

    if style == "indian":
        ze_note = f" (zero error = {ze} {unit})" if ze is not None else " (no zero error)"
        prompt = (
            f"In a vernier caliper, the main scale has {msd} {unit} as the value of one division. "
            f"There are {vp.n} vernier divisions. "
            f"The main scale reading (MSR) is {msr * msd} {unit} and the {vc}th vernier division "
            f"coincides with a main scale division.{ze_note} "
            f"Find the true reading of the instrument."
        )
    else:
        ze_note = f" Zero error = {ze} {unit}" if ze is not None else " No zero error."
        prompt = (
            f"A vernier caliper has MSD = {msd} {unit} and {vp.n} vernier divisions. "
            f"The observed reading is MSR = {msr * msd} {unit} with vernier coincidence at division #{vc}.{ze_note} "
            f"What is the final (corrected) reading?"
        )

    true_str = f"{result['true_reading']} {unit}"
    # Add true reading as the answer but options only show observed (or add note)
    # For MCQ, show options for the TRUE reading
    true_wrongs = set()
    attempts = 0
    while len(true_wrongs) < 3 and attempts < 30:
        attempts += 1
        candidates = [
            result['observed_reading'],   # no zero error correction
            round(result['true_reading'] + rng.choice([-1, 1, 2]) * lc, 4),
            round(result['true_reading'] * rng.choice([0.1, 2, 10]), 4),
            round(result['true_reading'] + vc * lc, 4),  # MSR + VC*LC (i.e., double-counting)
        ]
        w = _round_nice(rng.choice(candidates), 4)
        if w != result['true_reading'] and w > 0:
            true_wrongs.add(f"{w} {unit}")

    fallback2 = [result['true_reading'] + i * lc for i in [-2, -1, 1, 2]]
    for f in fallback2:
        if len(true_wrongs) >= 3:
            break
        true_wrongs.add(f"{_round_nice(f, 4)} {unit}")

    true_options = _shuffle(rng, [true_str] + list(true_wrongs)[:3])
    true_labels = ["(A)", "(B)", "(C)", "(D)"]
    true_opts_str = "\n".join(f"{lbl} {o}" for lbl, o in zip(true_labels, true_options))
    true_correct_lbl = true_labels[true_options.index(true_str)]

    full_prompt = prompt + "\n\nOptions (final corrected reading):\n" + true_opts_str

    ze_note_expl = ""
    if ze is not None:
        ze_note_expl = f"\nZero Error = {ze} {unit}. Subtract it from observed reading."
    explanation = (
        f"LC = MSD / n = {msd}/{vp.n} = {lc} {unit}\n"
        f"Observed Reading = MSR + (VC × LC) = {msr * msd} + ({vc} × {lc}) = {result['observed_reading']} {unit}"
        f"{ze_note_expl}\n"
        f"True Reading = {result['observed_reading']} − ({ze}) = {result['true_reading']} {unit}"
        if ze is not None else
        f"\nTrue Reading = Observed Reading = {result['true_reading']} {unit}"
    )

    return Question(
        node="c9_phy_003",
        id=f"q003_read_{rng.randint(100000,999999)}",
        difficulty="Hard",
        cognitive="Apply",
        style=style,
        prompt=full_prompt,
        options=[f"{lbl} {o}" for lbl, o in zip(true_labels, true_options)],
        answer=f"{true_correct_lbl}) {true_str}",
        explanation=explanation + f"\n\nCorrect option: ({true_correct_lbl})",
        marks=2,
        tags=["vernier-calliper", "reading", "zero-error"],
    )


def q_003_lc_formula(rng, style: str = "indian") -> Question:
    """MCQ: formula for least count of vernier calipers."""
    if style == "indian":
        prompt = (
            "The formula for the least count of a vernier caliper is:\n"
            "Where MSD = value of one main scale division, n = number of vernier divisions."
        )
        options = [
            "(A) LC = n × MSD",
            "(B) LC = MSD / n",
            "(C) LC = (n-1) × MSD",
            "(D) LC = MSD / (n-1)",
        ]
        answer = "(B) LC = MSD / n"
        explanation = (
            "Least Count (LC) = Value of 1 Main Scale Division (MSD) / Number of Vernier Divisions (n). "
            "This is because n vernier divisions span (n-1) main scale divisions, so 1 vernier division "
            "= (n-1)/n × MSD. The difference between 1 MSD and 1 VSD is MSD - (n-1)/n·MSD = MSD/n."
        )
    else:
        prompt = "What is the formula for the least count of a vernier caliper?"
        options = [
            "(A) LC = n × MSD",
            "(B) LC = MSD / n",
            "(C) LC = (n - 1) / n × MSD",
            "(D) LC = MSD − (n−1)/n × MSD",
        ]
        answer = "(B) LC = MSD / n"
        explanation = (
            "LC = MSD / n. "
            "Since n vernier divisions = (n-1) main scale divisions, "
            "1 VSD = (n-1)/n × MSD. "
            "LC = MSD − 1 VSD = MSD − (n-1)/n·MSD = MSD/n."
        )

    return Question(
        node="c9_phy_003",
        id=f"q003_formula_{rng.randint(1000,9999)}",
        difficulty="Medium",
        cognitive="Understand",
        style=style,
        prompt=prompt + "\n\nOptions:\n" + "\n".join(options),
        options=options,
        answer=answer,
        explanation=explanation,
        marks=1,
        tags=["vernier-calliper", "formula", "least-count"],
    )


def q_003_zero_error(rng, style: str = "indian") -> Question:
    """Question about zero error type and correction."""
    vp = generate_vernier_problem(rng.randint(0, 99999))
    ze = vp.zero_error if vp.zero_error is not None else rng.choice([-0.02, 0.02, -0.01, 0.01])

    sign = "positive" if ze > 0 else "negative"
    direction_right = "to the right" if ze > 0 else "to the left"

    if style == "indian":
        prompt = (
            f"When the jaws of a vernier caliper are closed, the zero of the vernier scale "
            f"lies {direction_right} of the main scale zero. This is called a {sign} zero error "
            f"of {abs(ze)} mm. "
            f"If the observed reading is {_round_nice(vp.ms_reading * vp.msd + vp.vc * vp.lc, 4)} mm, "
            f"what is the true length?"
        )
    else:
        prompt = (
            f"A vernier caliper has a {sign} zero error of {abs(ze)} mm. "
            f"The observed reading is {_round_nice(vp.ms_reading * vp.msd + vp.vc * vp.lc, 4)} mm. "
            f"Find the true length."
        )

    observed = vp.ms_reading * vp.msd + vp.vc * vp.lc
    true = solve_zero_error(observed, ze)

    explanation = explain_zero_error_type(
        VernierProblem(vp.msd, vp.n, vp.lc, vp.ms_reading, vp.vc, ze)
    )
    explanation += (
        f"\nTrue Reading = Observed Reading − Zero Error = {observed} − ({ze}) = {true} mm."
    )

    # MCQ options around true value
    wrongs = set()
    for offset in [-ze, ze, lc*2, -lc*2, lc, -lc]:
        w = round(true + offset, 4)
        if w != true and w > 0:
            wrongs.add(f"{w} mm")
    if len(wrongs) < 3:
        for i in range(1, 6):
            wrongs.add(f"{round(true + i * 0.1, 4)} mm")
            if len(wrongs) >= 3:
                break

    options = _shuffle(rng, [f"{true} mm"] + list(wrongs)[:3])
    labels = ["(A)", "(B)", "(C)", "(D)"]
    opts_str = "\n".join(f"{lbl} {o}" for lbl, o in zip(labels, options))
    correct_lbl = labels[options.index(f"{true} mm")]

    return Question(
        node="c9_phy_003",
        id=f"q003_ze_{rng.randint(100000,999999)}",
        difficulty="Hard",
        cognitive="Apply",
        style=style,
        prompt=prompt + "\n\nOptions:\n" + opts_str,
        options=[f"{lbl} {o}" for lbl, o in zip(labels, options)],
        answer=f"{correct_lbl}) {true} mm",
        explanation=explanation + f"\n\nCorrect option: ({correct_lbl})",
        marks=2,
        tags=["vernier-calliper", "zero-error", "correction"],
    )


# =====================================================================
# WORKSHEET BUILDER
# =====================================================================

def generate_worksheet(
    title: str = "Class 9 Physics — Measurements & Experimentation",
    seed: int = SEED_DEFAULT,
    per_node: dict = None,
) -> Worksheet:
    """
    Build a balanced worksheet.

    per_node: how many questions of each node, e.g.
      {"c9_phy_001": 4, "c9_phy_002": 3, "c9_phy_003": 3}
    Defaults: 4 / 3 / 3 (10 total)
    """
    if per_node is None:
        per_node = {"c9_phy_001": 4, "c9_phy_002": 3, "c9_phy_003": 3}

    rng = _rng(seed)
    questions: List[Question] = []

    # --- Node 001 ---
    n001 = per_node.get("c9_phy_001", 4)
    for i in range(n001):
        style = "indian" if i % 2 == 0 else "standard"
        if i % 3 == 0:
            q = q_001_identify_system(rng, style)
        elif i % 3 == 1:
            q = q_001_conversion(rng, style)
        else:
            q = q_001_three_systems_table(rng, style)
        # Seed solver output for verification
        from class9_physics_solver import solve_node001
        if q.node == "c9_phy_001" and "convert" in q.id:
            # Parse from prompt for solver
            import re
            m = re.search(r"Convert ([\d.]+) (\w+) into (\w+)", q.prompt)
            if m:
                val, fu, tu = float(m.group(1)), m.group(2), m.group(3)
                cat = "length"
                for c, pairs in [("length", LENGTH_PAIRS), ("mass", MASS_PAIRS),
                                  ("time", TIME_PAIRS), ("speed", SPEED_PAIRS)]:
                    if (fu, tu) in pairs or (tu, fu) in pairs:
                        cat = c
                        break
                q.solver_output = solve_node001("convert", val, fu, tu, cat)
        questions.append(q)

    # --- Node 002 ---
    n002 = per_node.get("c9_phy_002", 3)
    for i in range(n002):
        style = "indian" if i % 2 == 0 else "standard"
        if i % 3 == 0:
            q = q_002_find_lc(rng, style)
        elif i % 3 == 1:
            q = q_002_lc_accuracy(rng, style)
        else:
            q = q_002_lc_instrument(rng, style)
        questions.append(q)

    # --- Node 003 ---
    n003 = per_node.get("c9_phy_003", 3)
    for i in range(n003):
        style = "indian" if i % 2 == 0 else "standard"
        if i % 3 == 0:
            q = q_003_reading(rng, style)
        elif i % 3 == 1:
            q = q_003_lc_formula(rng, style)
        else:
            q = q_003_zero_error(rng, style)
        questions.append(q)

    total_marks = sum(q.marks for q in questions)
    return Worksheet(title=title, questions=questions,
                     total_marks=total_marks, seed_used=seed)


# =====================================================================
# MARKDOWN OUTPUT
# =====================================================================

def worksheet_to_markdown(ws: Worksheet, show_answers: bool = False) -> str:
    """Render a worksheet as Markdown."""
    lines = [
        f"# {ws.title}",
        f"",
        f"> Seed used: `{ws.seed_used}`  |  Total marks: **{ws.total_marks}**  |  Questions: **{len(ws.questions)}**",
        "",
        "---",
        "",
    ]

    current_node = None
    qnum = 0
    for q in ws.questions:
        if q.node != current_node:
            current_node = q.node
            node_titles = {
                "c9_phy_001": "📐 Node 1 — SI / cgs / fps Unit Systems",
                "c9_phy_002": "🔬 Node 2 — Least Count of Measuring Instruments",
                "c9_phy_003": "📏 Node 3 — Vernier Callipers",
            }
            lines.append(f"## {node_titles.get(current_node, current_node)}")
            lines.append("")

        qnum += 1
        diff_icon = {"Easy": "🟢", "Medium": "🟡", "Hard": "🔴"}.get(q.difficulty, "")
        lines.append(f"**Q{qnum}.** [{q.cognitive}] {diff_icon} {q.difficulty}  [{q.style}] ({q.marks} mark{'s' if q.marks > 1 else ''})")
        lines.append("")
        lines.append(q.prompt)
        lines.append("")

        if show_answers:
            lines.append(f"> **Answer:** {q.answer}")
            lines.append("")
            lines.append(f"> **Explanation:**")
            for expl_line in q.explanation.split("\n"):
                lines.append(f"> {expl_line}")
            lines.append("")

        lines.append("---")
        lines.append("")

    if not show_answers:
        lines.append("## ✅ Answer Key")
        lines.append("")
        qnum = 0
        current_node = None
        for q in ws.questions:
            if q.node != current_node:
                current_node = q.node
                lines.append(f"### {current_node}")
                lines.append("")
            qnum += 1
            lines.append(f"**Q{qnum}.** {q.answer}")
            lines.append("")
            lines.append(f"*Explanation:* {q.explanation[:200]}{'...' if len(q.explanation) > 200 else ''}")
            lines.append("")

    return "\n".join(lines)


# =====================================================================
# CLI
# =====================================================================

if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        seed = int(sys.argv[1])
    else:
        seed = SEED_DEFAULT

    print(f"Generating worksheet with seed={seed} ...")
    ws = generate_worksheet(seed=seed)

    # Print worksheet (questions only)
    md = worksheet_to_markdown(ws, show_answers=False)
    print(md)

    print("\n\n" + "=" * 60)
    print("ANSWER KEY")
    print("=" * 60 + "\n")
    key_md = worksheet_to_markdown(ws, show_answers=True)
    # Print just the answer key section
    in_key = False
    for line in key_md.split("\n"):
        if "## ✅ Answer Key" in line:
            in_key = True
        if in_key:
            print(line)
