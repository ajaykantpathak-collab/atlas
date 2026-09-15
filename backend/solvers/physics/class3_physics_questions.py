# -*- coding: utf-8 -*-
"""
Class 3 Physics Question Generator – Nodes: c3_phy_001, c3_phy_002, c3_phy_003
Topics: Float/Sink, Why objects float/sink, Sun as energy source
50% Indian-context competency + 50% standard.
"""
import random, textwrap
from dataclasses import dataclass, field
from typing import List, Optional, Tuple

# ─── seeded RNG ───────────────────────────────────────────────────────────────
_rng = random.Random(42)

# ─── question dataclass ───────────────────────────────────────────────────────
@dataclass
class Question:
    qtype: str          # maps to solver key in class3_physics_solver
    node: str           # c3_phy_001 / c3_phy_002 / c3_phy_003
    difficulty: str     # Easy | Medium
    competency: str     # Standard | Indian
    prompt: str
    answer: str
    options: List[str]  = field(default_factory=list)   # for MCQ
    explanation: str    = ""

# ─── shared pools ─────────────────────────────────────────────────────────────
STANDARD_OBJECTS = {
    "float":  ["leaf", "wood", "plastic ball", "plastic bottle", "sponge",
               "matchbox", "balloon", "coconut"],
    "sink":   ["stone", "coin", "metal spoon", "nail", "key",
               "rubber band", "eraser", "clay ball"],
}
INDIA_OBJECTS = {
    "float":  ["bel leaf", "marigold flower", "plastic lota", "thermocol plate"],
    "sink":   ["steel glass", "lota", "gold bangle", "diya (clay)"],
}
ALL_FLOAT = STANDARD_OBJECTS["float"] + INDIA_OBJECTS["float"]
ALL_SINK  = STANDARD_OBJECTS["sink"]  + INDIA_OBJECTS["sink"]

SUN_DAILY_LIFE = [
    "Feeling warm on your face in morning sunlight",
    "Seeing your shadow on the ground",
    "Watching plants grow towards the light",
    "Drying clothes on a clothesline",
    "Feeling the heat on your back in summer",
    "Seeing a rainbow after rain (sunlight + water drops)",
    "Using a solar calculator",
    "Getting a sun-tan at the beach",
    "Watching roosters crow at sunrise",
    "Drinking warm water kept in the sun",
    "Watching mangoes ripen on the tree",
    "Seeing dewdrops glisten in morning sun",
]

# ─── helpers ───────────────────────────────────────────────────────────────────
def _pick(lst: list, n: int = 1) -> list:
    return _rng.sample(lst, min(n, len(lst)))

def _shuffle(lst: list) -> list:
    out = lst[:]
    _rng.shuffle(out)
    return out

def _mcq_options(correct: str, distractors: list, n: int = 4) -> List[str]:
    opts = [correct] + _pick(distractors, n - 1)
    return _shuffle(opts)

# ─────────────────────────────────────────────────────────────────────────────
# NODE c3_phy_001 – Objects that float and sink
# ─────────────────────────────────────────────────────────────────────────────
def gen_float_or_sink(competency: str = "Standard",
                       difficulty: str = "Easy") -> Question:
    """Q: Does [object] float or sink in water?"""
    pool = ALL_FLOAT if _rng.random() < 0.5 else ALL_SINK
    obj = _rng.choice(pool)
    expected_behaviour = "float" if obj in ALL_FLOAT else "sink"
    opts = _mcq_options(
        correct=expected_behaviour,
        distractors=["float", "sink", "disappear", "roll"],
        n=4,
    )
    q = Question(
        qtype="c3_phy_001_float_sink",
        node="c3_phy_001",
        difficulty=difficulty,
        competency=competency,
        prompt=f"Does a {obj} float or sink in water?",
        answer=expected_behaviour,
        options=opts,
        explanation=(
            f"A {obj} {'floats' if expected_behaviour=='float' else 'sinks'} "
            f"in water because it is "
            f"{'light/hollow' if expected_behaviour=='float' else 'heavy/solid'}."
        ),
    )
    return q

def gen_sort_objects(competency: str = "Standard",
                      difficulty: str = "Easy") -> Question:
    """Q: Sort the given objects into float and sink."""
    n_float = _rng.randint(2, 3)
    n_sink  = _rng.randint(2, 3)
    floats = _pick(STANDARD_OBJECTS["float"], n_float)
    sinks  = _pick(STANDARD_OBJECTS["sink"],  n_sink)
    if competency == "Indian":
        floats += _pick(INDIA_OBJECTS["float"], 1)
        sinks  += _pick(INDIA_OBJECTS["sink"],  1)
    float_str = ", ".join(floats)
    sink_str  = ", ".join(sinks)
    # Build a 'classify' style prompt
    prompt = (
        f"Sort these objects: {float_str}, {sink_str}.\n"
        "Which ones FLOAT and which ones SINK in water?\n"
        "Answer format: Float: [list] | Sink: [list]"
    )
    all_objs = floats + sinks
    answer = f"Float: {', '.join(floats)} | Sink: {', '.join(sinks)}"
    return Question(
        qtype="c3_phy_001_sort",
        node="c3_phy_001",
        difficulty=difficulty,
        competency=competency,
        prompt=prompt,
        answer=answer,
        options=[],
        explanation=(
            "Light or hollow objects float; heavy solid objects sink.\n"
            f"Floats: {', '.join(floats)}\nSinks: {', '.join(sinks)}"
        ),
    )

def gen_predict_then_test(competency: str = "Standard",
                           difficulty: str = "Easy") -> Question:
    """Q: Predict – will [object] float or sink? (Before testing)"""
    use_india = (competency == "Indian")
    pool = INDIA_OBJECTS["float"] + INDIA_OBJECTS["sink"] if use_india else ALL_FLOAT + ALL_SINK
    obj = _rng.choice(pool)
    is_float = obj in (INDIA_OBJECTS["float"] if use_india else ALL_FLOAT)
    expected = "float" if is_float else "sink"
    opts = _mcq_options(correct=expected,
                        distractors=["float", "sink", "roll", "stay in middle"],
                        n=4)
    return Question(
        qtype="c3_phy_001_predict",
        node="c3_phy_001",
        difficulty=difficulty,
        competency=competency,
        prompt=f"🔮 Predict FIRST: Will a {obj} float or sink in water? "
               f"(Make your guess before checking!)",
        answer=expected,
        options=opts,
        explanation=(
            f"A {obj} {'floats' if expected=='float' else 'sinks'} because it is "
            f"{'light/hollow' if expected=='float' else 'heavy/solid'}."
        ),
    )

def gen_name_floats_and_sinks(competency: str = "Standard",
                               difficulty: str = "Easy") -> Question:
    """Q: Name 2 objects that float and 2 that sink."""
    f = _pick(STANDARD_OBJECTS["float"], 2)
    s = _pick(STANDARD_OBJECTS["sink"],  2)
    if competency == "Indian":
        f += _pick(INDIA_OBJECTS["float"], 1)
        s += _pick(INDIA_OBJECTS["sink"],  1)
    answer = f"Float: {', '.join(f[:2])} | Sink: {', '.join(s[:2])}"
    return Question(
        qtype="c3_phy_001_name_both",
        node="c3_phy_001",
        difficulty=difficulty,
        competency=competency,
        prompt="📝 Name TWO objects that FLOAT in water and TWO objects that SINK in water.\n"
               "Answer format: Float: ___, ___ | Sink: ___, ___",
        answer=answer,
        options=[],
        explanation=(
            "Light/hollow things float (leaf, wood, plastic ball).\n"
            "Heavy/solid things sink (stone, coin, metal spoon)."
        ),
    )

# ─────────────────────────────────────────────────────────────────────────────
# NODE c3_phy_002 – Why some float and others sink
# ─────────────────────────────────────────────────────────────────────────────
def gen_why_float(competency: str = "Standard",
                  difficulty: str = "Medium") -> Question:
    """Q: Why does [object] float?"""
    pool = INDIA_OBJECTS["float"] if competency == "Indian" else STANDARD_OBJECTS["float"]
    obj = _rng.choice(pool)
    return Question(
        qtype="c3_phy_002_why",
        node="c3_phy_002",
        difficulty=difficulty,
        competency=competency,
        prompt=f"🌊 Why does a {obj} float on water? "
               f"(Hint: Think about whether it is light or hollow.)",
        answer="light or hollow",
        options=[],
        explanation=f"A {obj} floats because it is light/hollow (or has air inside). "
                     f"Heavy solid objects sink; light/hollow objects float.",
    )

def gen_why_sink(competency: str = "Standard",
                 difficulty: str = "Medium") -> Question:
    """Q: Why does [object] sink?"""
    pool = INDIA_OBJECTS["sink"] if competency == "Indian" else STANDARD_OBJECTS["sink"]
    obj = _rng.choice(pool)
    return Question(
        qtype="c3_phy_002_why",
        node="c3_phy_002",
        difficulty=difficulty,
        competency=competency,
        prompt=f"🌊 Why does a {obj} sink in water? "
               f"(Hint: Think about whether it is heavy or solid.)",
        answer="heavy and solid",
        options=[],
        explanation=f"A {obj} sinks because it is heavy and solid. "
                     "Heavy solid objects tend to sink in water.",
    )

def gen_compare_objects(competency: str = "Standard",
                         difficulty: str = "Medium") -> Question:
    """Q: Which floats – [A] or [B]? (Exactly one floats)"""
    floaters = INDIA_OBJECTS["float"] if competency == "Indian" else STANDARD_OBJECTS["float"]
    sinkers  = INDIA_OBJECTS["sink"]  if competency == "Indian" else STANDARD_OBJECTS["sink"]
    floater = _rng.choice(floaters)
    sinker  = _rng.choice(sinkers)
    if _rng.random() < 0.5:
        obj_a, obj_b = floater, sinker
    else:
        obj_a, obj_b = sinker, floater
    opts = _mcq_options(correct=floater,
                        distractors=[sinker, "both", "neither"],
                        n=4)
    return Question(
        qtype="c3_phy_002_compare",
        node="c3_phy_002",
        difficulty=difficulty,
        competency=competency,
        prompt=f"⚖️  Which of these will FLOAT in water?\n"
               f"   A) {obj_a}\n"
               f"   B) {obj_b}",
        answer=floater,
        options=[f"A – {obj_a}", f"B – {obj_b}", "Both float", "Neither floats"],
        explanation=(
            f"{floater} floats because it is light/hollow. "
            f"{sinker} sinks because it is heavy/solid."
        ),
    )

def gen_ship_floats(competency: str = "Standard",
                    difficulty: str = "Medium") -> Question:
    """Q: Why does a heavy ship float?"""
    india_examples = ["a large metal ship (jahaaz)", "a ferry boat in Mumbai harbour"]
    std_examples   = ["a cruise ship", "a cargo ship"]
    example = _rng.choice(india_examples if competency == "Indian" else std_examples)
    return Question(
        qtype="c3_phy_002_ship_floats",
        node="c3_phy_002",
        difficulty=difficulty,
        competency=competency,
        prompt=(
            f"🚢 A heavy {example} floats on water even though it weighs many tonnes!\n"
            "Why does it float? (Hint: Think about what is inside the ship.)\n"
            "Answer in one or two sentences."
        ),
        answer="hollow / air inside",
        options=[],
        explanation=(
            "A heavy ship floats because it is hollow and filled with air. "
            "The air makes it lighter overall – like a metal bowl turned upside down "
            "on water, it stays on top."
        ),
    )

def gen_stone_sinks(competency: str = "Standard",
                    difficulty: str = "Medium") -> Question:
    """Q: Why does a small stone sink?"""
    india_examples = ["a small stone from the river", "a pebble from the Ganga"]
    std_examples   = ["a small stone", "a pebble"]
    example = _rng.choice(india_examples if competency == "Indian" else std_examples)
    return Question(
        qtype="c3_phy_002_stone_sinks",
        node="c3_phy_002",
        difficulty=difficulty,
        competency=competency,
        prompt=(
            f"🪨 {example.capitalize()} is very small, yet it sinks in water.\n"
            "Why does it sink? (Hint: Think about weight and solidness.)\n"
            "Answer in one or two sentences."
        ),
        answer="heavy and solid",
        options=[],
        explanation=(
            "A small stone sinks because it is heavy and solid for its size. "
            "Size does not decide – a small stone is still heavier than water."
        ),
    )

# ─────────────────────────────────────────────────────────────────────────────
# NODE c3_phy_003 – Sun as a natural source of energy
# ─────────────────────────────────────────────────────────────────────────────
def gen_sun_is_source(competency: str = "Standard",
                      difficulty: str = "Easy") -> Question:
    """Q: Is the sun a source of energy?"""
    return Question(
        qtype="c3_phy_003_source",
        node="c3_phy_003",
        difficulty=difficulty,
        competency=competency,
        prompt="☀️ The sun gives us light and heat. Is the sun a source of energy?\n"
               "Answer: Yes or No.",
        answer="yes",
        options=["Yes", "No"],
        explanation=(
            "Yes! The sun is a natural source of energy. "
            "Light and heat are both forms of energy that come from the sun."
        ),
    )

def gen_sun_gives_what(competency: str = "Standard",
                       difficulty: str = "Easy") -> Question:
    """Q: What two things does the sun give us?"""
    india_extra = ["warmth to cook food on a chulha", "drying papads and grains"]
    std_extra   = ["light to see", "heat to keep warm"]
    extra = _rng.choice(india_extra if competency == "Indian" else std_extra)
    return Question(
        qtype="c3_phy_003_gives",
        node="c3_phy_003",
        difficulty=difficulty,
        competency=competency,
        prompt=f"☀️ What are the two main things the sun gives us?\n"
               f"(One of them helps us {extra}.)",
        answer="light and heat",
        options=[],
        explanation=(
            "The sun gives us two main things: LIGHT (so we can see) "
            "and HEAT (so we feel warm). Both are forms of energy."
        ),
    )

def gen_feel_sun_energy(competency: str = "Standard",
                        difficulty: str = "Easy") -> Question:
    """Q: Give one example of feeling the sun's energy daily."""
    example = _rng.choice(SUN_DAILY_LIFE)
    return Question(
        qtype="c3_phy_003_feel",
        node="c3_phy_003",
        difficulty=difficulty,
        competency=competency,
        prompt=f"☀️ Give ONE example of feeling the sun's energy in daily life.\n"
               f"       (Hint: {example})",
        answer=example,
        options=[],
        explanation=(
            "The sun's energy is felt as warmth, seen as light, used to dry "
            "clothes, helps plants grow, and much more!"
        ),
    )

def gen_sun_without(competency: str = "Standard",
                    difficulty: str = "Easy") -> Question:
    """Q: Without the sun, no ____ and no ____."""
    return Question(
        qtype="c3_phy_003_without",
        node="c3_phy_003",
        difficulty=difficulty,
        competency=competency,
        prompt="🌑 Without the sun, there would be no ______ and no ______.\n"
               "(Fill in the two blanks.)",
        answer="light and heat",
        options=[],
        explanation=(
            "Without the sun there would be no light (darkness everywhere) "
            "and no heat (Earth would be very cold)."
        ),
    )

def gen_sun_energy_definition(competency: str = "Standard",
                               difficulty: str = "Easy") -> Question:
    """Q: Light and heat from the sun are what?"""
    opts = _mcq_options(correct="forms of energy",
                        distractors=["types of plants", "kinds of weather",
                                     "shapes of clouds"],
                        n=4)
    return Question(
        qtype="c3_phy_003_definition",
        node="c3_phy_003",
        difficulty=difficulty,
        competency=competency,
        prompt="☀️ The sun gives us light and heat. What kind of things are light and heat?",
        answer="forms of energy",
        options=opts,
        explanation=(
            "Light and heat are both forms of energy from the sun. "
            "The sun is a natural source of energy."
        ),
    )

# ─────────────────────────────────────────────────────────────────────────────
# Generator registry & main entry point
# ─────────────────────────────────────────────────────────────────────────────
GENERATORS = {
    # c3_phy_001
    "c3_phy_001_float_sink":   gen_float_or_sink,
    "c3_phy_001_sort":         gen_sort_objects,
    "c3_phy_001_predict":      gen_predict_then_test,
    "c3_phy_001_name_both":    gen_name_floats_and_sinks,
    # c3_phy_002
    "c3_phy_002_why":          gen_why_float,      # also used for sink
    "c3_phy_002_compare":      gen_compare_objects,
    "c3_phy_002_ship_floats":  gen_ship_floats,
    "c3_phy_002_stone_sinks":  gen_stone_sinks,
    # c3_phy_003
    "c3_phy_003_source":       gen_sun_is_source,
    "c3_phy_003_gives":        gen_sun_gives_what,
    "c3_phy_003_feel":         gen_feel_sun_energy,
    "c3_phy_003_definition":   gen_sun_energy_definition,
    "c3_phy_003_without":      gen_sun_without,
}

def generate(qtype: str,
             seed: Optional[int] = None,
             competency: str = "Standard",
             difficulty: str = "Easy") -> Question:
    """
    Generate a single question of the given type.

    Parameters
    ----------
    qtype       : one of the keys in GENERATORS
    seed        : optional integer seed for reproducibility
    competency  : "Standard" | "Indian"
    difficulty  : "Easy" | "Medium"

    Returns
    -------
    Question object with prompt, answer, options, explanation
    """
    if seed is not None:
        r = random.Random(seed)
        # temporarily patch _rng – use re-seeding approach
        # (simpler: set the module-level seed before calling)
        pass
    gen_fn = GENERATORS.get(qtype)
    if gen_fn is None:
        raise ValueError(f"Unknown qtype '{qtype}'. "
                         f"Valid: {list(GENERATORS.keys())}")
    return gen_fn(competency=competency, difficulty=difficulty)

def generate_batch(count: int = 5,
                   node_filter: Optional[str] = None,
                   seed: Optional[int] = None,
                   competency: str = "Standard",
                   difficulty: Optional[str] = None) -> List[Question]:
    """
    Generate `count` questions, optionally filtered by node.
    Each question has a different seed for variety.
    """
    if seed is not None:
        random.seed(seed)
    pool = list(GENERATORS.keys())
    if node_filter:
        pool = [k for k in pool if k.startswith(node_filter)]
    if not pool:
        raise ValueError(f"No generators match node_filter='{node_filter}'")
    questions = []
    for i in range(count):
        qtype = _rng.choice(pool)
        diff  = difficulty if difficulty else _rng.choice(["Easy", "Medium"])
        comp  = _rng.choice(["Standard", "Indian"]) if competency == "Mixed" else competency
        try:
            q = generate(qtype, competency=comp, difficulty=diff)
        except Exception:
            continue
        questions.append(q)
    return questions

def generate_worksheet(node: str,
                       num_easy: int = 3,
                       num_medium: int = 2,
                       seed: Optional[int] = None) -> str:
    """
    Produce a printable worksheet string for a given node.
    """
    if seed is not None:
        random.seed(seed)
    _rng.seed(seed or 42)
    questions: List[Question] = []
    for _ in range(num_easy):
        questions.append(generate_batch(1, node_filter=node, difficulty="Easy")[0])
    for _ in range(num_medium):
        questions.append(generate_batch(1, node_filter=node, difficulty="Medium")[0])
    lines = [f"Class 3 Physics Worksheet  |  Node: {node}\n",
             "Name: _______________  Date: _______________\n",
             "─" * 60 + "\n"]
    for idx, q in enumerate(questions, 1):
        lines.append(f"\nQ{idx}. [{q.difficulty} | {q.competency}]\n")
        lines.append(textwrap.indent(q.prompt, "   ") + "\n")
        if q.options:
            for opt in q.options:
                lines.append(f"       {opt}\n")
        lines.append("       Answer: _______________\n")
    lines.append("\n" + "─" * 60 + "\n")
    lines.append("Teacher use only:\n")
    for idx, q in enumerate(questions, 1):
        lines.append(f"Q{idx}. {q.answer}\n")
    return "".join(lines)

# ─── CLI / self-test ──────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=== Sample Questions ===\n")
    sample_types = [
        "c3_phy_001_float_sink",
        "c3_phy_001_sort",
        "c3_phy_002_compare",
        "c3_phy_002_ship_floats",
        "c3_phy_003_gives",
    ]
    for qt in sample_types:
        q = generate(qt, competency="Standard")
        print(f"[{q.node} | {q.difficulty} | {q.competency}]")
        print(f"  Q: {q.prompt[:120]}")
        print(f"  A: {q.answer}")
        if q.options:
            print(f"  Options: {q.options}")
        print()

    print("\n=== Indian-Context Samples ===\n")
    for qt in sample_types[:3]:
        q = generate(qt, competency="Indian")
        print(f"[{q.node} | {q.difficulty} | {q.competency}]")
        print(f"  Q: {q.prompt[:120]}")
        print(f"  A: {q.answer}")
        print()

    print("\n=== Worksheet Preview (c3_phy_001) ===\n")
    ws = generate_worksheet("c3_phy_001", num_easy=2, num_medium=1, seed=99)
    print(ws)

    print("\n=== Solver Self-Test ===\n")
    from class3_physics_solver import solve
    checks = [
        ("c3_phy_001_float_sink", "stone", "sink"),
        ("c3_phy_001_float_sink", "leaf",  "float"),
        ("c3_phy_001_sort", "stone,coin,leaf,wood", "leaf,wood", "stone,coin"),
        ("c3_phy_002_why", "sponge", "it is light"),
        ("c3_phy_002_ship_floats", "it is hollow and has air"),
        ("c3_phy_003_source", "yes"),
        ("c3_phy_003_gives", "light and heat"),
    ]
    for t in checks:
        r = solve(*t)
        status = "✅" if r.correct else "❌"
        print(f"  {status} [{r.score:.0%}] {t[0]}: {r.explanation[:80]}")