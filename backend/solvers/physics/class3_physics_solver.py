# -*- coding: utf-8 -*-
"""
Class 3 Physics Solver – Nodes: c3_phy_001, c3_phy_002, c3_phy_003
Topics: Float/Sink, Why objects float/sink, Sun as energy source
"""
import random, re
from dataclasses import dataclass, field
from typing import Optional, List, Dict

# ─── data structures ──────────────────────────────────────────────────────────
@dataclass
class FloatSinkRecord:
    object: str
    behaviour: str   # "float" or "sink"
    reason: str = "" # simple explanation

@dataclass
class Result:
    correct: bool
    score: float
    explanation: str
    feedback: str = ""
    mastery_note: str = ""

# ─── canonical knowledge base ─────────────────────────────────────────────────
FLOAT_SINK_FACTS: Dict[str, FloatSinkRecord] = {
    "leaf":        FloatSinkRecord("leaf",        "float",  "Light and hollow, like a boat."),
    "wood":        FloatSinkRecord("wood",        "float",  "Light and not very heavy."),
    "plastic_ball":FloatSinkRecord("plastic ball","float",  "Light plastic filled with air."),
    "plastic_bottle":FloatSinkRecord("plastic bottle","float","Hollow with air inside keeps it up."),
    "sponge":      FloatSinkRecord("sponge",      "float",  "Light and has air pockets, but sinks when water-filled."),
    "coconut":     FloatSinkRecord("coconut",     "float",  "Light and fibrous outside."),
    "coin":        FloatSinkRecord("coin",        "sink",   "Heavy and solid metal."),
    "stone":       FloatSinkRecord("stone",       "sink",   "Heavy and solid rock."),
    "metal_spoon": FloatSinkRecord("metal spoon", "sink",   "Heavy solid metal."),
    "nail":        FloatSinkRecord("nail",        "sink",   "Small but heavy solid metal."),
    "key":         FloatSinkRecord("key",         "sink",   "Small heavy metal object."),
    "rice_grain":  FloatSinkRecord("rice grain",  "sink",   "Small but heavy enough to go down."),
    "paper_dry":   FloatSinkRecord("dry paper",   "float",  "Light and flat at first."),
    "paper_wet":   FloatSinkRecord("wet paper",   "sink",   "Water makes it heavy and heavy."),
    "balloon":     FloatSinkRecord("balloon",     "float",  "Full of air, very light."),
    "rubber_band": FloatSinkRecord("rubber band", "sink",   "Small and heavy for its size."),
    "eraser":      FloatSinkRecord("eraser",      "sink",   "Solid rubber is heavier than water."),
    "bangle":      FloatSinkRecord("bangle",      "sink",   "Solid metal is heavy."),
    "matchbox":    FloatSinkRecord("matchbox",    "float",  "Hollow cardboard box with air inside."),
    "clay_ball":   FloatSinkRecord("clay ball",   "sink",   "Heavy and solid, like wet mud."),
}

# Indian-context specific additions (flagged separately)
INDIA_FLOAT_SINK: Dict[str, FloatSinkRecord] = {
    "diya":        FloatSinkRecord("diya (clay lamp)","float","Usually made of light clay or floats if hollow."),
    "lota":        FloatSinkRecord("lota",            "sink", "Metal lota is solid and heavy."),
    "plastic_lota":FloatSinkRecord("plastic lota",    "float","Light plastic hollow lota floats."),
    "steel_glass": FloatSinkRecord("steel glass",     "sink", "Solid metal, heavy for its size."),
    "bangle_gold": FloatSinkRecord("gold bangle",     "sink", "Solid metal is heavy."),
    "marigold":    FloatSinkRecord("marigold flower", "float","Very light flower."),
    "bel_leaf":    FloatSinkRecord("bel leaf",        "float","Light leaf floats on water – used in puja."),
}

FULL_FACTS = {**FLOAT_SINK_FACTS, **INDIA_FLOAT_SINK}

SUN_FACTS = {
    "light":    "The sun gives us light so we can see.",
    "heat":     "The sun gives us heat / warmth.",
    "energy":   "Light and heat are forms of energy from the sun.",
    "plants":   "Plants use sunlight to make food (photosynthesis).",
    "day":      "Without the sun there would be no daytime.",
    "warmth":   "We feel warm when we stand in sunlight.",
    "shadow":   "The sun's light makes shadows.",
    "dry":      "The sun's heat dries clothes.",
    "rain":     "The sun's heat causes water to evaporate and make rain.",
    "life":     "All life on Earth needs the sun.",
}

# ─── helper utilities ─────────────────────────────────────────────────────────
def _normalise(s: str) -> str:
    return re.sub(r"[^a-z0_9]", "", s.lower().strip())

def _token_set(s: str) -> set:
    return set(re.findall(r"[a-z]+", s.lower()))

# ─── c3_phy_001 solvers ────────────────────────────────────────────────────────
def solve_float_or_sink(object_name: str, student_answer: str) -> Result:
    """
    Q: Does <object_name> float or sink in water?
    Valid answers: 'float' or 'sink' (case-insensitive)
    """
    obj = _normalise(object_name)
    ans = _normalise(student_answer)
    if obj not in FULL_FACTS:
        return Result(False, 0.0,
            f"'{object_name}' is not in the known objects list. "
            "Please check the spelling.",
            mastery_note="Revise the list of float/sink objects from your textbook.")
    expected = FULL_FACTS[obj].behaviour
    correct = (ans == expected)
    record = FULL_FACTS[obj]
    expl = (f"✅ Correct! {record.reason}"
            if correct else
            f"❌ Not quite. {record.object} {record.behaviour}s in water. {record.reason}")
    return Result(correct, 1.0 if correct else 0.0, expl,
        feedback=f"Remember: {record.reason}")

def solve_sort_objects(objects_list: str, float_group: str, sink_group: str) -> Result:
    """
    Q: Sort these objects into float and sink groups.
    objects_list : comma-separated object names
    float_group  : comma-separated objects the student says float
    sink_group   : comma-separated objects the student says sink
    """
    objs = [_normalise(o) for o in objects_list.split(",")]
    predicted_float = [_normalise(o) for o in float_group.split(",")]
    predicted_sink  = [_normalise(o) for o in sink_group.split(",")]
    unknown = [o for o in objs if o not in FULL_FACTS]
    if unknown:
        return Result(False, 0.0,
            f"Unknown object(s): {unknown}. Check spelling.",
            mastery_note="Use only objects from your textbook list.")
    correct_float = [o for o in objs if FULL_FACTS[o].behaviour == "float"]
    correct_sink  = [o for o in objs if FULL_FACTS[o].behaviour == "sink"]
    pf_set = set(predicted_float)
    ps_set = set(predicted_sink)
    cf_set = set(correct_float)
    cs_set = set(correct_sink)
    float_hits = len(pf_set & cf_set)
    sink_hits  = len(ps_set & cs_set)
    total_correct = float_hits + sink_hits
    total = len(objs)
    score = total_correct / total if total else 0.0
    correct_flag = (score == 1.0)
    wrong_float = pf_set - cf_set
    wrong_sink  = ps_set - cs_set
    parts = []
    if correct_flag:
        parts.append("✅ All objects sorted correctly!")
    else:
        if wrong_float:
            parts.append(f"These were put in float but actually sink: {list(wrong_float)}")
        if wrong_sink:
            parts.append(f"These were put in sink but actually float: {list(wrong_sink)}")
        missing_float = cf_set - pf_set
        missing_sink  = cs_set - ps_set
        if missing_float:
            parts.append(f"Missing from float: {list(missing_float)}")
        if missing_sink:
            parts.append(f"Missing from sink: {list(missing_sink)}")
    expl = "; ".join(parts)
    feedback = (f"Floating objects are light/hollow (e.g. {', '.join(correct_float[:3])}). "
                f"Sinking objects are heavy/solid (e.g. {', '.join(correct_sink[:3])}).")
    return Result(correct_flag, score, expl, feedback=feedback)

def solve_predict_then_test(object_name: str, prediction: str) -> Result:
    """
    Q: Predict – will <object_name> float or sink? (No testing done yet – just the prediction)
    The solver checks if the prediction matches the known fact.
    """
    return solve_float_or_sink(object_name, prediction)

def solve_name_floats_and_sinks(num_floats: int, num_sinks: int,
                                 given_objects: str = "") -> Result:
    """
    Q: Name {num_floats} objects that float and {num_sinks} that sink in water.
    given_objects: comma-separated list of student's answers
    """
    given = [_normalise(o) for o in given_objects.split(",") if o.strip()]
    float_ok = [o for o in given if o in FULL_FACTS and FULL_FACTS[o].behaviour == "float"]
    sink_ok  = [o for o in given if o in FULL_FACTS and FULL_FACTS[o].behaviour == "sink"]
    total_needed = num_floats + num_sinks
    correct_count = len(float_ok) + len(sink_ok)
    score = min(correct_count / total_needed, 1.0)
    correct = (len(float_ok) >= num_floats and len(sink_ok) >= num_sinks)
    wrong = [o for o in given if o not in FULL_FACTS]
    expl_parts = []
    if correct:
        expl_parts.append(f"✅ You named enough correct objects!")
    else:
        expl_parts.append(f"❌ You need {num_floats} floaters and {num_sinks} sinkers.")
    if wrong:
        expl_parts.append(f"Unknown objects: {wrong}")
    expl_parts.append(f"Floats you named: {float_ok} | Sinks you named: {sink_ok}")
    feedback = ("Examples of floaters: leaf, wood, plastic ball, sponge, matchbox. "
                "Examples of sinkers: stone, coin, metal spoon, nail, key.")
    return Result(correct, score, "; ".join(expl_parts), feedback=feedback)

# ─── c3_phy_002 solvers ────────────────────────────────────────────────────────
def solve_why_float_or_sink(object_name: str, reason_text: str) -> Result:
    """
    Q: Why does <object_name> float / sink?
    Checks whether the student mentions the correct concept keyword:
      FLOAT → light / hollow / air
      SINK  → heavy / solid
    """
    obj = _normalise(object_name)
    if obj not in FULL_FACTS:
        return Result(False, 0.0,
            f"'{object_name}' not recognised.", mastery_note="Check the object name.")
    behaviour = FULL_FACTS[obj].behaviour
    tokens = _token_set(reason_text)
    if behaviour == "float":
        keywords = {"light", "hollow", "air", "lessheavy", "notheavy"}
        expected_concept = "light or hollow (air inside)"
    else:
        keywords = {"heavy", "solid", "weight", "dense"}
        expected_concept = "heavy and solid"
    hit = bool(tokens & keywords)
    if hit:
        correct = True
        expl = (f"✅ Good! {FULL_FACTS[obj].object} {behaviour}s because it is {expected_concept}. "
                f"{FULL_FACTS[obj].reason}")
    else:
        correct = False
        expl = (f"❌ Not quite. {FULL_FACTS[obj].object} {behaviour}s. "
                f"It is {expected_concept}. {FULL_FACTS[obj].reason}")
    score = 1.0 if correct else 0.0
    feedback = ("Key idea: light/hollow objects float, heavy/solid objects sink."
                if behaviour == "float" else
                "Key idea: heavy solid objects sink; light or hollow objects float.")
    return Result(correct, score, expl, feedback=feedback)

def solve_compare_float(obj_a: str, obj_b: str, prediction: str) -> Result:
    """
    Q: Which will float – <obj_a> or <obj_b>? (Student predicts one)
    prediction: name of the object the student thinks will float
    """
    a = _normalise(obj_a)
    b = _normalise(obj_b)
    pred = _normalise(prediction)
    if a not in FULL_FACTS or b not in FULL_FACTS:
        return Result(False, 0.0,
            "One or both objects not recognised.", mastery_note="Check spelling.")
    floats_a = FULL_FACTS[a].behaviour == "float"
    floats_b = FULL_FACTS[b].behaviour == "float"
    neither_float = (not floats_a and not floats_b)
    if neither_float:
        return Result(False, 0.0,
            f"Both {obj_a} and {obj_b} sink! Neither floats.",
            feedback="Try comparing a floating object (leaf/wood) with a sinking one (stone/coin).")
    correct = (pred == a and floats_a) or (pred == b and floats_b)
    expl_parts = []
    if floats_a and floats_b:
        expl_parts.append("Actually both float! Any of them is a valid answer.")
        correct = True
    else:
        floater = obj_a if floats_a else obj_b
        expl_parts.append(f"✅ {floater} floats! "
                          f"{FULL_FACTS[_normalise(floater)].reason}")
    if not correct:
        expl_parts.append("Your prediction was not correct.")
    return Result(correct, 1.0 if correct else 0.0, " ".join(expl_parts),
        feedback=("Light/hollow things float, heavy/solid things sink. "
                  "Try predicting before testing!"))

def solve_heavy_ship_floats(student_answer: str) -> Result:
    """
    Q: A heavy metal ship floats on water. Why?
    Expects mention of: hollow, air, or 'big and hollow'
    """
    tokens = _token_set(student_answer)
    keywords = {"hollow", "air", "inside", "big", "large", "hollowness"}
    hit = bool(tokens & keywords)
    if hit:
        return Result(True, 1.0,
            "✅ Correct! The ship is hollow and has air inside, which keeps it floating.",
            feedback="Even though a ship is very heavy, it floats because it has air inside, like a big bowl turned upside down on water.")
    return Result(False, 0.0,
        "❌ Think again. A heavy ship floats because it is hollow and contains air.",
        feedback="A ship is like a hollow metal bowl – the air inside helps it stay on top of the water.")

def solve_small_stone_sinks(student_answer: str) -> Result:
    """
    Q: Why does a small stone sink in water?
    Expects: heavy, solid, small and heavy
    """
    tokens = _token_set(student_answer)
    keywords = {"heavy", "solid", "small", "hard", "dense"}
    hit = bool(tokens & keywords)
    if hit:
        return Result(True, 1.0,
            "✅ Correct! The stone sinks because it is heavy and solid for its size.",
            feedback="Small doesn't always mean light – a small stone is heavier than water.")
    return Result(False, 0.0,
        "❌ The stone sinks because it is heavy and solid.",
        feedback="Size doesn't decide – weight and being solid matter. A tiny stone is still heavier than water.")

# ─── c3_phy_003 solvers ────────────────────────────────────────────────────────
def solve_sun_is_source_of_energy(student_answer: str) -> Result:
    """
    Q: Is the sun a source of energy? (Yes/No)
    """
    ans = _normalise(student_answer)
    if ans in ("yes", "true", "y"):
        return Result(True, 1.0,
            "✅ Yes! The sun is a natural source of energy.",
            feedback="The sun gives us light and heat, which are both forms of energy.")
    if ans in ("no", "false", "n"):
        return Result(False, 0.0,
            "❌ Actually, the sun IS a source of energy. It gives us light and heat.",
            feedback="Think of the sun as a giant power station in the sky!")
    return Result(False, 0.0,
        "Please answer with Yes or No.",
        mastery_note="Revise: The sun is a natural source of energy.")

def solve_sun_gives_what(student_answer: str) -> Result:
    """
    Q: What two things does the sun give us?
    Accepts any combination mentioning light and/or heat.
    """
    tokens = _token_set(student_answer)
    has_light = bool(tokens & {"light", "bright", "sunlight"})
    has_heat  = bool(tokens & {"heat", "warm", "warmth", "hot", "energy"})
    count = sum([has_light, has_heat])
    if count == 2:
        return Result(True, 1.0,
            "✅ Correct! The sun gives us light and heat (both are energy from the sun).",
            feedback="Light helps us see; heat keeps us warm. Both come from the sun!")
    if count == 1:
        which = "light" if has_light else "heat/warmth"
        return Result(False, 0.5,
            f"✅ You got one right! The sun gives us {which}. "
            f"The other thing it gives us is {'heat' if has_light else 'light'}.",
            feedback=f"Think about daytime: you see because of {'heat' if has_light else 'light'}, "
                     f"and you feel warm because of {'light' if has_light else 'heat'}.")
    return Result(False, 0.0,
        "❌ Think of two things: light (so we can see) and heat/warmth (so we feel warm).",
        feedback="Stand in sunlight – you feel warmth (heat) and you can see because of light. Both come from the sun!")

def solve_feel_sun_energy(student_answer: str) -> Result:
    """
    Q: Give one example of feeling the sun's energy in daily life.
    Accepts any daily-life example mentioning warmth, heat, drying, light, growing.
    """
    tokens = _token_set(student_answer)
    keywords = {"warm", "warmth", "heat", "sunlight", "light", "dry",
                "clothes", "grow", "plant", "shadow", "bright", "hot"}
    hit = bool(tokens & keywords)
    if hit:
        return Result(True, 1.0,
            "✅ Good example! You feel the sun's energy every day.",
            feedback="The sun's energy is all around us – warmth on skin, light in eyes, drying clothes, growing plants.")
    return Result(False, 0.0,
        "❌ Think of daily life: feeling warm in sunlight, seeing sunlight, drying clothes in sun, etc.",
        feedback="Stand outside in the morning – the warmth on your face is the sun's energy!")

def solve_sun_energy_definition(student_answer: str) -> Result:
    """
    Q: The sun gives us light and heat. What are light and heat?
    Accepts: forms of energy / types of energy
    """
    tokens = _token_set(student_answer)
    keywords = {"energy", "power", "form"}
    hit = bool(tokens & keywords)
    if hit:
        return Result(True, 1.0,
            "✅ Correct! Light and heat are forms of energy from the sun.",
            feedback="The sun is like a giant natural power station sending energy to Earth.")
    return Result(False, 0.0,
        "❌ Light and heat are both forms of energy from the sun.",
        feedback="The sun is a natural source of energy. Light and heat are two types of that energy.")

def solve_sun_without_energy(student_answer: str) -> Result:
    """
    Q: Without the sun, there would be no _____ and no _____.
    Accepts: light & heat (in any order)
    """
    tokens = _token_set(student_answer)
    has_light = bool(tokens & {"light", "bright", "sunlight"})
    has_heat  = bool(tokens & {"heat", "warm", "warmth", "hot"})
    if has_light and has_heat:
        return Result(True, 1.0,
            "✅ Correct! Without the sun there would be no light and no heat.",
            feedback="No sun = no daytime, no warmth, no life as we know it!")
    if has_light or has_heat:
        return Result(False, 0.5,
            f"✅ Partially correct. Without the sun there would be no "
            f"{'light' if has_light else 'heat/warmth'}. The other thing missing is "
            f"{'heat/warmth' if has_light else 'light'}.",
            feedback="Think of a dark cold night – that's what Earth would be like without the sun.")
    return Result(False, 0.0,
        "❌ Without the sun there would be no light and no heat.",
        feedback="The sun gives us two main things: light and heat. Without it, Earth would be dark and cold.")

# ─── unified solver entry point ───────────────────────────────────────────────
SOLVER_MAP = {
    "c3_phy_001_float_sink":      solve_float_or_sink,
    "c3_phy_001_sort":            solve_sort_objects,
    "c3_phy_001_predict":         solve_predict_then_test,
    "c3_phy_001_name_both":       solve_name_floats_and_sinks,
    "c3_phy_002_why":             solve_why_float_or_sink,
    "c3_phy_002_compare":         solve_compare_float,
    "c3_phy_002_ship_floats":     solve_heavy_ship_floats,
    "c3_phy_002_stone_sinks":     solve_small_stone_sinks,
    "c3_phy_003_source":          solve_sun_is_source_of_energy,
    "c3_phy_003_gives":           solve_sun_gives_what,
    "c3_phy_003_feel":            solve_feel_sun_energy,
    "c3_phy_003_definition":      solve_sun_energy_definition,
    "c3_phy_003_without":         solve_sun_without_energy,
}

def solve(question_type: str, *args, **kwargs) -> Result:
    """
    Unified solver entry point.
    Usage: solve("c3_phy_001_float_sink", "stone", "sink")
    """
    fn = SOLVER_MAP.get(question_type)
    if fn is None:
        return Result(False, 0.0,
            f"Unknown question type: '{question_type}'. "
            f"Valid types: {list(SOLVER_MAP.keys())}")
    try:
        return fn(*args, **kwargs)
    except TypeError as e:
        return Result(False, 0.0, f"Argument error: {e}",
            mastery_note="Check the solver signature for required arguments.")

# ─── batch verification ───────────────────────────────────────────────────────
def verify_batch(records: List[Dict]) -> List[Result]:
    """
    records: list of dicts with keys 'qtype' + solver-specific fields + 'answer'
    Returns list of Result objects.
    """
    results = []
    for rec in records:
        qtype = rec.pop("qtype")
        answer = rec.pop("answer")
        try:
            res = solve(qtype, **rec)
        except Exception as e:
            res = Result(False, 0.0, f"Error: {e}")
        results.append(res)
    return results


# ─── quick self-test when run directly ────────────────────────────────────────
if __name__ == "__main__":
    tests = [
        ("c3_phy_001_float_sink",    "leaf",        "float"),
        ("c3_phy_001_float_sink",    "stone",       "sink"),
        ("c3_phy_001_float_sink",    "plastic_ball","float"),
        ("c3_phy_001_sort",          "stone,coin,leaf,wood", "leaf,wood", "stone,coin"),
        ("c3_phy_002_why",           "sponge",      "it is light"),
        ("c3_phy_002_ship_floats",   "because it is hollow and has air"),
        ("c3_phy_002_stone_sinks",   "it is heavy and solid"),
        ("c3_phy_003_source",        "yes"),
        ("c3_phy_003_gives",         "light and heat"),
        ("c3_phy_003_without",       "light and warmth"),
        ("c3_phy_003_feel",          "I feel warm in sunlight"),
    ]
    for t in tests:
        r = solve(*t)
        print(f"[{r.score:.0%}] {t[0]}: {r.explanation[:80]}...")