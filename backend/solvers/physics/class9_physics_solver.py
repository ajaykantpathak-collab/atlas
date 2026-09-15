"""
Class 9 Physics Solver
Topics: SI/cgs/fps units, Least Count, Vernier Callipers
Deterministic — no LLM calls. Uses math, random (seeded).
"""

import math
import random
from dataclasses import dataclass
from typing import Optional
from fractions import Fraction


# =====================================================================
# =====================================================================

LENGTH_CONVERSIONS = {
    # key = (from, to), value = multiplier to go from -> to
    ("m", "cm"):   100.0,
    ("m", "mm"):   1000.0,
    ("m", "km"):   0.001,
    ("m", "ft"):   3.28084,
    ("m", "in"):   39.3701,
    ("cm", "m"):   0.01,
    ("cm", "mm"):  10.0,
    ("cm", "ft"):  0.0328084,
    ("cm", "in"):  0.393701,
    ("mm", "m"):   0.001,
    ("mm", "cm"):  0.1,
    ("ft", "m"):   1.0 / 3.28084,
    ("ft", "cm"):  1.0 / 0.0328084,
    ("ft", "mm"):  (1.0 / 3.28084) * 1000,
    ("in", "cm"):  1.0 / 0.393701,
    ("in", "m"):   1.0 / 39.3701,
    ("km", "m"):   1000.0,
}

MASS_CONVERSIONS = {
    ("kg", "g"):     1000.0,
    ("kg", "mg"):    1_000_000.0,
    ("kg", "lb"):     2.20462,
    ("kg", "oz"):     35.274,
    ("g", "kg"):      0.001,
    ("g", "mg"):      1000.0,
    ("g", "lb"):      0.00220462,
    ("lb", "kg"):     1.0 / 2.20462,
    ("lb", "g"):      (1.0 / 2.20462) * 1000,
    ("oz", "g"):      28.3495,
}

TIME_CONVERSIONS = {
    ("s", "min"):   1.0 / 60.0,
    ("s", "h"):     1.0 / 3600.0,
    ("s", "ms"):    1000.0,
    ("s", "day"):   1.0 / 86400.0,
    ("min", "s"):    60.0,
    ("min", "h"):    1.0 / 60.0,
    ("h", "s"):      3600.0,
    ("h", "min"):    60.0,
    ("day", "s"):    86400.0,
    ("ms", "s"):     0.001,
}

SPEED_CONVERSIONS = {
    ("m/s", "km/h"):   3.6,
    ("m/s", "cm/s"):   100.0,
    ("m/s", "ft/s"):   3.28084,
    ("km/h", "m/s"):   1.0 / 3.6,
    ("km/h", "cm/s"):  100.0 / 3.6,
    ("cm/s", "m/s"):   0.01,
    ("ft/s", "m/s"):   1.0 / 3.28084,
}

SYSTEM_LABELS = {
    "SI":  "SI (MKS)",
    "cgs": "cgs",
    "fps": "fps (foot-pound-second)",
}

LENGTH_UNITS_BY_SYSTEM = {
    "SI":  ["m", "cm", "mm", "km"],
    "cgs": ["cm", "mm", "m"],
    "fps": ["ft", "m"],
}

MASS_UNITS_BY_SYSTEM = {
    "SI":  ["kg", "g", "mg"],
    "cgs": ["g", "mg", "kg"],
    "fps": ["lb", "kg", "g"],
}

TIME_UNITS_BY_SYSTEM = {
    "SI":  ["s", "min", "h", "day", "ms"],
    "cgs": ["s", "min", "h"],
    "fps": ["s", "min", "h"],
}


def convert_quantity(value: float, from_unit: str, to_unit: str,
                     category: str = "length") -> float:
    """
    Convert a physical quantity between units.
    category: 'length', 'mass', 'time', or 'speed'
    Returns the converted value (float).
    """
    tables = {
        "length": LENGTH_CONVERSIONS,
        "mass":   MASS_CONVERSIONS,
        "time":   TIME_CONVERSIONS,
        "speed":  SPEED_CONVERSIONS,
    }
    table = tables.get(category)
    if table is None:
        raise ValueError(f"Unknown category: {category}")

    key = (from_unit, to_unit)
    if key in table:
        return round(value * table[key], 10)
    rev = (to_unit, from_unit)
    if rev in table:
        return round(value / table[rev], 10)
    raise KeyError(f"No conversion path {from_unit} -> {to_unit} for {category}")


def solve_node001(question_type: str, value: float, from_u: str, to_u: str,
                  category: str = "length") -> dict:
    """
    Solve a node-001 (SI/cgs/fps conversion) problem.
    Returns dict with answer, steps, explanation.
    """
    category = category.lower()
    result = convert_quantity(value, from_u, to_u, category)

    sys_from = _guess_system(from_u)
    sys_to   = _guess_system(to_u)

    factor_key = (from_u, to_u)
    tables = {
        "length": LENGTH_CONVERSIONS,
        "mass":   MASS_CONVERSIONS,
        "time":   TIME_CONVERSIONS,
        "speed":  SPEED_CONVERSIONS,
    }
    factor = tables[category].get(factor_key)
    if factor is None:
        factor = 1.0 / tables[category][(to_u, from_u)]

    steps = [
        f"Given: {value} {from_u}",
        f"Conversion factor: 1 {from_u} = {factor} {to_u}",
        f"{value} {from_u} × {factor} {to_u}/{from_u} = {result} {to_u}",
    ]
    explanation = (
        f"Both {from_u} and {to_u} measure {category}. "
        f"The {sys_from} system uses {from_u} while the {sys_to} system "
        f"uses {to_u}. By multiplying by the standard conversion factor "
        f"({factor}), we get the equivalent measurement."
    )
    return {
        "node": "c9_phy_001",
        "answer": result,
        "unit": to_u,
        "steps": steps,
        "explanation": explanation,
        "category": category,
        "from_system": sys_from,
        "to_system": sys_to,
    }


def _guess_system(unit: str) -> str:
    if unit in ["m", "cm", "mm", "km"]:
        return "SI" if unit == "m" else ("cgs" if unit == "cm" else "SI")
    if unit in ["kg", "g", "mg"]:
        return "SI"
    if unit in ["s", "min", "h", "ms", "day"]:
        return "SI"
    if unit == "ft":
        return "fps"
    if unit == "lb":
        return "fps"
    if unit == "cm":
        return "cgs"
    if unit == "g":
        return "cgs"
    return "SI"


# =====================================================================
# =====================================================================

@dataclass
class LCProblem:
    """Holds all data for a least-count problem."""
    instrument: str
    main_scale_division: float   # value of 1 main-scale division (in instrument units)
    vernier_divisions: int        # number of divisions on the vernier/thimble scale
    lc: float                     # least count
    given_msd: bool = True        # whether msd is given or must be derived
    given_n: bool = True          # whether n is given or must be derived


def compute_lc(main_scale_division: float, vernier_divisions: int) -> float:
    """Least Count = MSD / n"""
    return round(main_scale_division / vernier_divisions, 8)


def generate_lc_scenario(seed: int) -> LCProblem:
    """
    Generate a deterministic least-count scenario using a seeded RNG.
    """
    rng = random.Random(seed)
    instruments = [
        ("Ruler",        1.0,   10,    "mm"),   # 1 mm main scale div, 10 vernier divs
        ("Ruler",        1.0,   20,    "mm"),   # finer ruler
        ("Stopwatch",    1.0,   10,    "s"),     # LC = 0.1 s
        ("Stopwatch",    0.1,   10,    "s"),     # LC = 0.01 s
        ("Thermometer",  1.0,   10,    "°C"),    # LC = 0.1 °C
        ("Ammeter",      0.1,   10,    "A"),     # LC = 0.01 A
        ("Voltmeter",    0.5,   10,    "V"),     # LC = 0.05 V
        ("Vernier Scale (demo)", 0.1, 10,  "cm"),  # LC = 0.01 cm = 0.1 mm
        ("Screw Gauge",  0.5,   50,    "mm"),    # LC = 0.01 mm
        ("Screw Gauge",  0.5,  100,    "mm"),    # LC = 0.005 mm
    ]
    idx = rng.randint(0, len(instruments) - 1)
    name, msd, n, unit = instruments[idx]
    lc = compute_lc(msd, n)
    return LCProblem(
        instrument=name,
        main_scale_division=msd,
        vernier_divisions=n,
        lc=lc,
    )


def solve_node002(msd: Optional[float] = None, n: Optional[int] = None,
                   lc_given: Optional[float] = None,
                   question_type: str = "find_lc") -> dict:
    """
    Solve a least-count problem.

    question_type:
      'find_lc'        — given MSD and n, find LC
      'find_msd'       — given LC and n, find MSD
      'find_n'         — given LC and MSD, find n
      'verify_accuracy' — explain why smaller LC → higher accuracy
    """
    if question_type == "find_lc":
        if msd is None or n is None:
            raise ValueError("msd and n required for find_lc")
        lc = compute_lc(msd, n)
        steps = [
            f"Formula: Least Count (LC) = Value of 1 Main Scale Division (MSD) / Number of Vernier Divisions (n)",
            f"Given: MSD = {msd}, n = {n}",
            f"LC = {msd} / {n} = {lc}",
        ]
        explanation = (
            f"The least count is {lc}. This means the instrument can reliably "
            f"distinguish measurements differing by at least {lc} units. "
            f"A smaller least count means higher precision."
        )
        return {"node": "c9_phy_002", "lc": lc, "msd": msd, "n": n,
                "steps": steps, "explanation": explanation,
                "question_type": question_type}

    elif question_type == "find_msd":
        if lc_given is None or n is None:
            raise ValueError("lc_given and n required for find_msd")
        msd = round(lc_given * n, 10)
        steps = [
            f"Formula: MSD = LC × n",
            f"Given: LC = {lc_given}, n = {n}",
            f"MSD = {lc_given} × {n} = {msd}",
        ]
        return {"node": "c9_phy_002", "lc": lc_given, "msd": msd, "n": n,
                "steps": steps, "question_type": question_type}

    elif question_type == "find_n":
        if lc_given is None or msd is None:
            raise ValueError("lc_given and msd required for find_n")
        n = int(round(msd / lc_given))
        steps = [
            f"Formula: n = MSD / LC",
            f"Given: MSD = {msd}, LC = {lc_given}",
            f"n = {msd} / {lc_given} = {n}",
        ]
        return {"node": "c9_phy_002", "lc": lc_given, "msd": msd, "n": n,
                "steps": steps, "question_type": question_type}

    elif question_type == "verify_accuracy":
        return {
            "node": "c9_phy_002",
            "question_type": "verify_accuracy",
            "answer": (
                "A smaller least count means the instrument can resolve "
                "smaller differences between measurements. "
                "If Instrument A has LC = 0.1 mm and Instrument B has LC = 1 mm, "
                "then A can measure to one-tenth the precision of B. "
                "Therefore, decreasing LC → increasing accuracy/precision."
            ),
            "steps": [
                "LC = smallest measurable difference",
                "Smaller LC → finer gradations → instrument captures more detail",
                "More detail captured = higher accuracy",
            ],
        }
    else:
        raise ValueError(f"Unknown question_type: {question_type}")


# =====================================================================
# =====================================================================

@dataclass
class VernierProblem:
    """
    A Vernier caliper reading problem.

    MSD  = value of 1 main scale division (in mm)
    n    = number of vernier divisions that span (n-1) MSD
    LC   = MSD / n
    ms_reading = the main-scale reading (left edge of vernier zero, in MSD units)
    vc         = vernier coincidence (which vernier division aligns)
    zero_error = zero error reading (None if no zero error)
    """
    msd: float
    n: int
    lc: float
    ms_reading: int          # in units of MSD
    vc: int                  # 0..n-1
    zero_error: Optional[float]  # positive or negative, in MSD units


def generate_vernier_problem(seed: int) -> VernierProblem:
    """
    Deterministically generate a Vernier caliper reading problem.
    """
    rng = random.Random(seed)

    msd = rng.choice([0.5, 1.0])  # 0.5 mm or 1.0 mm main scale division
    n   = rng.choice([10, 20])     # 10 or 20 vernier divisions

    lc = compute_lc(msd, n)

    ms_reading = rng.randint(2, 15)

    vc = rng.randint(0, n - 1)

    zero_error = None
    if rng.random() < 0.4:
        ze_lc = rng.choice([-2, -1, 1, 2])
        zero_error = round(ze_lc * lc, 8)

    return VernierProblem(
        msd=msd, n=n, lc=lc,
        ms_reading=ms_reading, vc=vc, zero_error=zero_error
    )


def read_vernier(vp: VernierProblem) -> dict:
    """
    Compute the true reading from a Vernier caliper problem.
    Formula: Observed Reading = MSR + (VC × LC)
    True Reading   = Observed Reading − Zero Error
    (positive zero error → subtract; negative zero error → add)
    """
    observed = vp.ms_reading * vp.msd + vp.vc * vp.lc
    if vp.zero_error is not None:
        true_reading = round(observed - vp.zero_error, 8)
    else:
        true_reading = observed

    steps = [
        f"Step 1 – Least Count: LC = MSD / n = {vp.msd} / {vp.n} = {vp.lc} {_unit_for_msd(vp.msd)}",
        f"Step 2 – Main Scale Reading (MSR): {vp.ms_reading} × {vp.msd} = {vp.ms_reading * vp.msd} {_unit_for_msd(vp.msd)}",
        f"Step 3 – Vernier Coincidence (VC): vernier division #{vp.vc} aligns with a main-scale mark",
        f"Step 4 – Vernier contribution: VC × LC = {vp.vc} × {vp.lc} = {round(vp.vc * vp.lc, 8)} {_unit_for_msd(vp.msd)}",
        f"Step 5 – Observed Reading = MSR + (VC × LC) = {vp.ms_reading * vp.msd} + {round(vp.vc * vp.lc, 8)} = {observed} {_unit_for_msd(vp.msd)}",
    ]
    if vp.zero_error is not None:
        sign = "positive" if vp.zero_error > 0 else "negative"
        steps.append(
            f"Step 6 – Zero Error: {sign} zero error = {vp.zero_error} {_unit_for_msd(vp.msd)}; "
            f"True Reading = Observed − Zero Error = {observed} − ({vp.zero_error}) = {true_reading}"
        )
    else:
        steps.append("Step 6 – Zero Error: None → True Reading = Observed Reading")

    explanation = (
        f"The vernier caliper has LC = {vp.lc} {_unit_for_msd(vp.msd)}. "
        f"With {vp.n} vernier divisions, each vernier division is "
        f"{(vp.n - 1) * vp.msd / vp.n} {_unit_for_msd(vp.msd)} long. "
        f"The difference between 1 MSD and 1 VSD is exactly the least count."
    )
    return {
        "node": "c9_phy_003",
        "observed_reading": observed,
        "true_reading": true_reading,
        "lc": vp.lc,
        "zero_error": vp.zero_error,
        "steps": steps,
        "explanation": explanation,
        "unit": _unit_for_msd(vp.msd),
    }


def _unit_for_msd(msd: float) -> str:
    if msd >= 1:
        return "mm"
    return "mm"  # always mm for textbook problems


def solve_zero_error(ze_observed: float, zero_error: float) -> float:
    """
    Correct a measurement given a zero error.
    Positive zero error → subtract it from the observed reading.
    Negative zero error → add its magnitude (i.e., subtract the negative value).
    """
    return round(ze_observed - zero_error, 8)


def explain_zero_error_type(vp: VernierProblem) -> str:
    if vp.zero_error is None:
        return "No zero error — vernier zero coincides with main-scale zero."
    sign = "positive" if vp.zero_error > 0 else "negative"
    direction = ("to the right of" if vp.zero_error > 0 else "to the left of")
    return (
        f"This is a {sign} zero error of {abs(vp.zero_error)} {_unit_for_msd(vp.msd)}. "
        f"When jaws are closed, the vernier zero sits {direction} the main-scale zero."
    )


# =====================================================================
# =====================================================================

def _run_self_tests():
    """Deterministic self-verification — runs on import."""
    errors = []

    # --- Node 001 ---
    r = convert_quantity(1, "m", "cm", "length")
    if abs(r - 100.0) > 1e-6:
        errors.append(f"1 m = {r} cm, expected 100")

    r = convert_quantity(1, "kg", "g", "mass")
    if abs(r - 1000.0) > 1e-6:
        errors.append(f"1 kg = {r} g, expected 1000")

    r = convert_quantity(1, "h", "s", "time")
    if abs(r - 3600.0) > 1e-6:
        errors.append(f"1 h = {r} s, expected 3600")

    r = convert_quantity(36, "km/h", "m/s", "speed")
    if abs(r - 10.0) > 1e-4:
        errors.append(f"36 km/h = {r} m/s, expected 10")

    r = convert_quantity(1, "ft", "m", "length")
    if abs(r - 1/3.28084) > 1e-4:
        errors.append(f"1 ft conversion failed")

    r = convert_quantity(2.205, "lb", "kg", "mass")
    if abs(r - 1.0) > 1e-2:
        errors.append(f"2.205 lb = {r} kg, expected ~1.0")

    # --- Node 002 ---
    sol = solve_node002(msd=1.0, n=10, question_type="find_lc")
    if abs(sol["lc"] - 0.1) > 1e-8:
        errors.append(f"LC calc: got {sol['lc']}, expected 0.1")

    sol = solve_node002(msd=0.5, n=50, question_type="find_lc")
    if abs(sol["lc"] - 0.01) > 1e-8:
        errors.append(f"LC calc (screw gauge): got {sol['lc']}, expected 0.01")

    sol = solve_node002(lc_given=0.1, n=10, question_type="find_msd")
    if abs(sol["msd"] - 1.0) > 1e-8:
        errors.append(f"MSD calc: got {sol['msd']}, expected 1.0")

    sol = solve_node002(lc_given=0.05, msd=0.5, question_type="find_n")
    if sol["n"] != 10:
        errors.append(f"n calc: got {sol['n']}, expected 10")

    # --- Node 003 ---
    rng = random.Random(42)
    for _ in range(5):
        vp = generate_vernier_problem(rng.randint(0, 999))
        result = read_vernier(vp)
        if result["lc"] != compute_lc(vp.msd, vp.n):
            errors.append("LC mismatch in vernier")
        expected_obs = vp.ms_reading * vp.msd + vp.vc * vp.lc
        if abs(result["observed_reading"] - expected_obs) > 1e-8:
            errors.append(f"Observed reading mismatch: {result['observed_reading']} vs {expected_obs}")

    if errors:
        print("[SELF-TEST FAILURES]")
        for e in errors:
            print("  ✗", e)
    else:
        print("[Self-test passed — all 3 nodes OK]")


_run_self_tests()